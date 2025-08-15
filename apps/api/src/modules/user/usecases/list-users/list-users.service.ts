import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class ListUsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute() {
    return this.userRepository.findAll();
  }
}
