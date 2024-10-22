import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LabInformationEntity } from 'src/entities/lab-info.entity';
import { LabEntity, ApprovalStatus } from 'src/entities/lab.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

@Injectable()
export class LabService {
  constructor(
    @InjectRepository(LabEntity)
    private readonly labRepository: Repository<LabEntity>,
    @InjectRepository(LabInformationEntity)
    private readonly LabInformationEntity: Repository<LabInformationEntity>,
  ) {
    dotenv.config();
  }
  async rentalRequest(
    rentalDate: Date,
    rentalStartTime: string,
    rentalPurpose: string,
    hopeLab: string,
    rentalUser: string,
    rentalUsers: string,
    userId: number,
  ) {

    const existingUserRequest = await this.labRepository.findOne({
      where: {
        userId,
        approvalStatus: ApprovalStatus.APPROVALWAITING,
      },
    });

    if(existingUserRequest) {
        throw new ConflictException('하나의 실험실 대여 요청만 보낼 수 있습니다.');
    }

    const existingLab = await this.labRepository.findOne({
      where: { hopeLab, rentalStartTime, rentalDate },
    });

    if (existingLab) {
      throw new ConflictException('이미 해당 시간에 예약된 실험실이 있습니다.');
    }

    const newRental = this.labRepository.create({
      rentalDate,
      rentalStartTime,
      rentalPurpose,
      hopeLab,
      rentalUser,
      rentalUsers,
      userId,
      approvalStatus: ApprovalStatus.APPROVALWAITING,
    });

    const savedRequest = await this.labRepository.save(newRental);

    return savedRequest;
  }

  async cancelRequest(userId: number) {
    const req = await this.labRepository.findOne({ where: { userId } });

    if (!req) {
      throw new Error('해당 사용자의 대여 요청을 찾을 수 없습니다.');
    }

    if(req.approvalStatus == ApprovalStatus.APPROVALWAITING) {
      throw new BadRequestException('요청 대기 상태에서는 취소 요청을 보낼 수 없습니다')
    }

    if (req.approvalStatus === ApprovalStatus.DELETIONWAITING) {
      throw new BadRequestException('이미 삭제 대기 상태입니다.');
    }
    
    req.approvalStatus = ApprovalStatus.DELETIONWAITING;

    const savedRequest = await this.labRepository.save(req);

    const req2 = await this.LabInformationEntity.findOne({
      where: { userId },
    });

    if (!req2) {
      throw new Error('해당 사용자의 LabInformation을 찾을 수 없습니다.');
    }

    req2.deletionRental = true;

    const savedRequest2 = await this.LabInformationEntity.save(req2);

    return { savedRequest, savedRequest2 };
  }

  async getAllLabs(): Promise<LabInformationEntity[]> {
    return await this.LabInformationEntity.find({
      where: {},
    });
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (err) {
      throw new Error('Invalid token');
    }
  }
}
