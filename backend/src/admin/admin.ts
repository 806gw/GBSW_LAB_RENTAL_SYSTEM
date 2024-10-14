/*import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LabInformationEntity } from 'src/entities/lab-info.entity';
import { LabEntity, approvalStatus } from 'src/entities/lab.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(LabEntity)
    private readonly labRepository: Repository<LabEntity>,
    @InjectRepository(LabInformationEntity)
    private readonly labInformationRepository: Repository<LabInformationEntity>,
  ) {}
  async cancelRentalLab(userId: string) {
    const cancelResult = await this.labRepository.delete({
      userId: userId,
    });

    return { affected: cancelResult?.affected };
  }

  async permitRentalLab(userId: string) {
    const lab = await this.labRepository.findOne({
      where: { userId: userId },
    });

    if (!lab) {
      throw new NotFoundException('대여를 허용할 수 없습니다.');
    }

    const permitResult = await this.labRepository.update(
      { userId: userId },
      { approvalStatus: approvalStatus.APPROVED },
    );

    const labResult = await this.labInformationRepository.findOne({
      where: { labName: lab.hopeLab },
    });

    if (labResult) {
      labResult.Available = false;
      await this.labInformationRepository.save(labResult);
    }

    return { affected: permitResult?.affected, labResult };
  }
}*/
