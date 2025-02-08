import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ValidationPipe,
  UseGuards,
  NotFoundException,
  Delete,
  Headers,
} from "@nestjs/common";
import { LabService } from "./lab.service";
import { CreateLabDto } from "./dto/create-lab.dto";
import { UpdateLabDto } from "./dto/update-lab.dto";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/guard/auth.guard";
import { RolesGuard } from "src/auth/guard/role.guard";
import { Roles } from "src/util/decorator/roles.decorator";
import { RolesEnum } from "src/util/enum/roles.enum";
import { UserService } from "src/user/user.service";
import { Lab } from "./entities/lab.entity";

@ApiTags("Lab")
@Controller("lab")
export class LabController {
  constructor(
    private readonly labService: LabService,
    private readonly userService: UserService
  ) {}

  @ApiOperation({
    summary: "랩실 대여",
    description: "랩실 대여를 요청합니다.",
  })
  @Roles(RolesEnum.user)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBody({ type: CreateLabDto })
  @Post()
  public async createLab(
    @Headers("authorization") token: string,
    @Body(ValidationPipe) dto: CreateLabDto
  ): Promise<{ success: boolean; ID: number }> {
    token = token.replace("Bearer ", "");
    const lab = await this.labService.createLab(dto, token);

    return {
      success: true,
      ID: lab.id,
    };
  }

  @ApiOperation({
    summary: "랩실 삭제",
    description: "랩실 삭제를 요청합니다.",
  })
  @Roles(RolesEnum.user)
  @ApiBody({ type: CreateLabDto })
  @Post(":id")
  public async deletionRequestLab(
    @Param("id") id: number
  ): Promise<{ success: boolean }> {
    const targetlab = await this.labService.findOneLab(id);

    const updatedLabData = {
      ...targetlab,
      deletionRental: true,
    };

    await this.labService.update(id, updatedLabData);

    return {
      success: true,
    };
  }

  @ApiOperation({
    summary: "모든 대여 요청 조회",
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  public async findAll(): Promise<{ success: boolean; body: Lab[] }> {
    const labs = await this.labService.findAll();

    return {
      success: true,
      body: labs,
    };
  }

  @ApiOperation({
    summary: "승인 요청중인 대여 요청 모두 조회",
  })
  @Roles(RolesEnum.admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Get("approved")
  public async findApprovalRental(): Promise<{
    success: boolean;
    body: Lab[];
  }> {
    const labs = await this.labService.findApprovalRental();

    return {
      success: true,
      body: labs,
    };
  }

  @ApiOperation({
    summary: "삭제 요청중인 대여 요청 모두 조회",
  })
  @Roles(RolesEnum.admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Get("deletion")
  public async findDeletionRental(): Promise<{
    success: boolean;
    body: Lab[];
  }> {
    const labs = await this.labService.findDeletionRental();

    return {
      success: true,
      body: labs,
    };
  }

  @ApiOperation({
    summary: "대여 요청 하나만 조회",
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(":id")
  public async findOne(
    @Param("id") id: number
  ): Promise<{ success: boolean; body: Lab }> {
    const lab = await this.labService.findOneLab(id);

    if (!lab) {
      throw new NotFoundException({
        success: false,
        message: `${id}를 가진 대여 요청을 찾지 못했습니다`,
      });
    }

    return {
      success: true,
      body: lab,
    };
  }

  @ApiOperation({
    summary: "유저별 작성한 대여 요청 조회",
  })
  @ApiBearerAuth()
  @Get("user/:id")
  @UseGuards(AuthGuard)
  public async findAllUserLab(@Param("id") id: number): Promise<Lab[]> {
    const userId = await this.userService.getOneUser(id);

    if (!userId) {
      throw new NotFoundException({
        success: false,
        message: `${id}를 가진 유저를 찾지 못했습니다`,
      });
    }

    return await this.labService.findAllUserLab(id);
  }

  @ApiOperation({
    summary: "삭제 혹은 대여 완료 요청 승인, 랩실 배정",
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(":id")
  public async update(
    @Param("id") id: number,
    @Body(ValidationPipe) dto: UpdateLabDto
  ): Promise<{ success: boolean }> {
    const lab = await this.labService.findOneLab(id);

    if (!lab) {
      throw new NotFoundException({
        success: false,
        message: `${id}를 가진 요청을 찾지 못했습니다`,
      });
    }
    await this.labService.update(id, dto);

    return {
      success: true,
    };
  }

  @ApiOperation({
    summary: "모든 랩실 데여 요청 삭제",
  })
  @Roles(RolesEnum.admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Delete()
  public async allDelete() {
    await this.labService.allDelete();

    return {
      success: true,
    };
  }
}
