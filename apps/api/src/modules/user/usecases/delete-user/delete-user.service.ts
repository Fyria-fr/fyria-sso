import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DeleteUserDto } from './delete-user.dto';
import { Session } from '../../../../types/session';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class DeleteUserService {
  constructor(private readonly userReporitory: UserRepository) {}

  async execute(data: DeleteUserDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }
    const userRow = await this.userReporitory.delete(data.id);

    if (!userRow) {
      return { message: "L'utilisateur n'a pas pu être supprimé." };
    }
    return { message: "L'utilisateur a bien été supprimé." };
  }

  private comparePasswords(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
