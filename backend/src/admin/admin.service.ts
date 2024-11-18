import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LabInformationEntity } from 'src/entities/lab-info.entity';
import { LabEntity, ApprovalStatus } from 'src/entities/lab.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(LabEntity)
    private readonly labRepository: Repository<LabEntity>,
    @InjectRepository(LabInformationEntity)
    private readonly labInformationRepository: Repository<LabInformationEntity>,
  ) {}

  async cancelRentalLab(userId: number) {
    const lab = await this.labRepository.findOne({ where: { userId } });

    if (!lab) {
      throw new NotFoundException(`Rental lab with userId ${userId} not found`);
    }

    const labInfo = await this.labInformationRepository.findOne({
      where: { labName: lab.hopeLab },
    });

    if (labInfo) {
      await this.labInformationRepository.remove(labInfo);
    }

    const deleteLab = await this.labRepository.delete({ userId });

    return { affected: deleteLab.affected, labInfo };
  }

  async checkConflict(checkRequest: {
    labName: string;
    rentalDate: string;
    rentalStartTime: string;
  }) {
    const { labName, rentalDate, rentalStartTime } = checkRequest;

    const conflictingLab = await this.labInformationRepository.findOne({
      where: {
        labName,
        rentalDate: new Date(rentalDate),
        rentalStartTime,
      },
    });

    return { isConflict: !!conflictingLab };
  }

  async permitRentalLab(userId: number) {
    const lab = await this.labRepository.findOne({ where: { userId } });

    if (!lab) {
      throw new NotFoundException(`Rental lab with userId ${userId} not found`);
    }

    if (!lab.hopeLab) {
      throw new InternalServerErrorException(
        `hopeLab is null for rental request with userId ${userId}`,
      );
    }

    const conflictingLab = await this.labInformationRepository.findOne({
      where: {
        labName: lab.hopeLab,
        rentalDate: lab.rentalDate,
        rentalStartTime: lab.rentalStartTime,
      },
    });

    if (conflictingLab) {
      throw new ConflictException(
        `The lab "${lab.hopeLab}" is already booked on ${lab.rentalDate}.`,
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

    return { affected: permitResult.affected, saveInfo };
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

  async changeLab(changeLabDto: {
    userId: number;
    newLabName: string;
  }): Promise<string> {
    const { userId, newLabName } = changeLabDto;

    const isConflict = await this.labInformationRepository.findOne({
      where: {
        labName: newLabName,
      },
    });

    if (isConflict) {
      throw new ConflictException(`${newLabName}is already.`);
    }

    const updateResult = await this.labRepository.update(
      { userId },
      { hopeLab: newLabName },
    );

    if (updateResult.affected === 0) {
      throw new NotFoundException('User not found.');
    }

    return 'Lab has been successfully updated.';
  }
}
