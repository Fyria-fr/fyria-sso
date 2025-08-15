import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AppName } from 'src/shared/utils/appname';
import { Role } from 'src/shared/utils/role';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { Session } from '../../../../types/session';
import { hashPassword } from '../../../../shared/utils/hashPassword';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class CreateUserService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: CreateUserDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }

    if (user.role.includes(Role.USER)) {
      throw new ConflictException(
        "Le rôle 'USER' n'est pas autorisé pour la création d'utilisateur",
      );
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException("L'utilisateur existe déjà");
    }

    const hashedPassword = await hashPassword(data.password);
    const newUser = await this.prisma.user.create({
      data: {
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        isActive: data.isActive,
        password: hashedPassword,
      },
    });

    await this.prisma.userAppRole.create({
      data: {
        userId: newUser.id,
        appName: AppName.ALL,
        role: Role.USER,
      },
    });

    return { user: newUser };
  }
}
