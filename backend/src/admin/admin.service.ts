import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LabInformationEntity } from 'src/entities/lab-info.entity';
import { LabEntity, ApprovalStatus } from 'src/entities/lab.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(LabEntity)
    private readonly labRepository: Repository<LabEntity>,
    @InjectRepository(LabInformationEntity)
    private readonly labInformationRepository: Repository<LabInformationEntity>,
  ) {}

  async cancelRentalLab(userId: number) {
    const lab = await this.labRepository.findOne({
      where: { userId },
    });

    if (!lab) {
      throw new NotFoundException(`Rental lab with userId ${userId} not found`);
    } else {
      console.log(lab);
    }

    const labInfo = await this.labInformationRepository.findOne({
      where: { labName: lab.hopeLab },
    });

    // 실습실 정보가 있을 때만 삭제 시도
    if (labInfo) {
      await this.labInformationRepository.remove(labInfo);
    }

    const deleteLab = await this.labRepository.delete({
      userId,
    });

    return { affected: deleteLab?.affected, labInfo };
  }

  async permitRentalLab(userId: number) {
    const lab = await this.labRepository.findOne({
      where: { userId },
    });

    if (!lab) {
      throw new NotFoundException(`Rental lab with userId ${userId} not found`);
    } else {
      console.log(lab);
    }

    if (!lab.hopeLab) {
      throw new InternalServerErrorException(
        `hopeLab is null for rental request with userId ${userId}`,
      );
    }

    const permitResult = await this.labRepository.update(
      { userId },
      { approvalStatus: ApprovalStatus.APPROVED },
    );

    const labInfo = this.labInformationRepository.create({
      labName: lab.hopeLab,
      Available: 1,
      userId: lab.userId,
      rentalUser: lab.rentalUser,
      rentalUsers: lab.rentalUsers,
      rentalPurpose: lab.rentalPurpose,
      rentalStartTime: lab.rentalStartTime,
      rentalDate: lab.rentalDate,
    });

    const saveInfo = await this.labInformationRepository.save(labInfo);

    // return { affected: permitResult?.affected, saveInfo };
    return { affected: permitResult?.affected, saveInfo };
  }

  async getApprovalRequest(): Promise<LabEntity[]> {
    return this.labRepository.find({
      where: {
        approvalStatus: ApprovalStatus.APPROVALWAITING,
      },
    });
  }

  async getDeletionRequest(): Promise<LabEntity[]> {
    return this.labRepository.find({
      where: {
        approvalStatus: ApprovalStatus.DELETIONWAITING,
      },
    });
  }
}
