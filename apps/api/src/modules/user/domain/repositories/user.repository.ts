import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export abstract class UserRepository {
  abstract create(user: User): Promise<User>;
  abstract update(user: User): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract delete(id: string): Promise<User>;
}
