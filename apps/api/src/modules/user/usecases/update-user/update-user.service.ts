import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { UpdateUserDto } from './update-user.dto';
import { Session } from '../../../../types/session';
import { hashPassword } from '../../../../shared/utils/hashPassword';
import { comparePasswords } from '../../../auth/config/sessions';

@Injectable()
export class UpdateUserService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: UpdateUserDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { id: data.id },
    });

    if (!existingUser) {
      throw new ConflictException("L'utilisateur n'existe pas");
    }

    const updateData: any = {
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      isActive: data.isActive,
    };

    if (
      data.password &&
      !(await comparePasswords(data.password, existingUser.password))
    ) {
      updateData.password = await hashPassword(data.password);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: data.id },
      data: updateData,
    });

    return { user: updatedUser };
  }
}
