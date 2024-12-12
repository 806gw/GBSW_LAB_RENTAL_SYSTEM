import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { LoginDto } from "./dto/Login.dto";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly userService: UserService
  ) {}

  public async signToken(
    userId: number,
    refreshToken: boolean
  ): Promise<string> {
    const payload = {
      id: userId,
      type: refreshToken ? "refresh" : "access",
    };

    return await this.jwt.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: refreshToken ? "30d" : "40m",
    });
  }

  public async loginUser(userId: number): Promise<{
    success: boolean;
    accessToken?: string;
    refreshToken?: string;
  }> {
    return {
      success: true,
      accessToken: await this.signToken(userId, false),
      refreshToken: await this.signToken(userId, true),
    };
  }

  public async loginWithUsername(
    user: Pick<LoginDto, "login" | "password">
  ): Promise<{
    success: boolean;
    accessToken?: string;
    refreshToken?: string;
  }> {
    const existingUser = await this.checkUser(user);

    return this.loginUser(existingUser);
  }

  public async checkUser(
    dto: Pick<LoginDto, "login" | "password">
  ): Promise<number> {
    const user = await this.userService.findUserByLogin(dto.login, true);

    if (!user || undefined) {
      throw new UnauthorizedException({
        success: false,
        message: "User or Password Invalid",
      });
    }

    const isPasswordValidated = await bcrypt.compare(
      dto.password,
      user.password
    );

    if (!isPasswordValidated || undefined) {
      throw new UnauthorizedException({
        success: false,
        message: `Invalid password`,
      });
    }
    return user.id;
  }

  public async verifyToken(
    token: string
  ): Promise<{ id: number; type: "access" | "refresh" }> {
    const decoded = (await this.jwt.verifyAsync(token)) as {
      id: number;
      type: "access" | "refresh";
    };

    return decoded;
  }

  public async rotateToken(
    token: string,
    refreshToken: boolean
  ): Promise<{
    success: boolean;
    message: string;
    token: { newAccessToken: string };
  }> {
    const decoded = await this.jwt.verify(token, {
      secret: process.env.JWT_SECRET,
    });

    if (decoded.type !== "refresh") {
      throw new NotAcceptableException({
        success: false,
        message: `토큰 재 발급은 Refresh 토큰으로만 가능합니다`,
      });
    }

    const newAccessToken = await this.signToken(decoded.id, refreshToken);

    return {
      success: true,
      message: `토큰 재 발급에 성공했습니다`,
      token: { newAccessToken },
    };
  }
}
