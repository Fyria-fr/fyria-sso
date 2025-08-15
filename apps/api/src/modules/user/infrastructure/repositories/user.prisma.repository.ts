import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { PrismaService } from '../../../../shared/infrastructure/prisma.service';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      include: {
        UserRole: true,
      },
    });
    return users.map((u) => ({
      id: u.id,
      firstname: u.firstname,
      lastname: u.lastname ?? '',
      email: u.email,
      password: u.password,
      role: u.UserRole.map((ur) => ({
        role: ur.role,
        appName: ur.appName,
      })),
      isActive: u.isActive,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt ?? undefined,
    }));
  }

  async create(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname || null,
        email: user.email,
        password: user.password,
        isActive: user.isActive,
        UserRole: {
          create: user.role.map((ur) => ({
            role: ur.role,
            appName: ur.appName,
          })),
        },
      },
      include: {
        UserRole: true,
      },
    });

    return {
      id: createdUser.id,
      firstname: createdUser.firstname,
      lastname: createdUser.lastname ?? '',
      email: createdUser.email,
      password: createdUser.password,
      role: createdUser.UserRole.map((ur) => ({
        role: ur.role,
        appName: ur.appName,
      })),
      isActive: createdUser.isActive,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt ?? undefined,
    };
  }

  async update(user: User): Promise<User> {
    await this.prisma.userAppRole.deleteMany({
      where: { userId: user.id },
    });

    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        firstname: user.firstname,
        lastname: user.lastname || null,
        email: user.email,
        password: user.password,
        isActive: user.isActive,
        UserRole: {
          create: user.role.map((ur) => ({
            role: ur.role,
            appName: ur.appName,
          })),
        },
      },
      include: {
        UserRole: true,
      },
    });

    return {
      id: updatedUser.id,
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname ?? '',
      email: updatedUser.email,
      password: updatedUser.password,
      role: updatedUser.UserRole.map((ur) => ({
        role: ur.role,
        appName: ur.appName,
      })),
      isActive: updatedUser.isActive,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt ?? undefined,
    };
  }

  async delete(id: string): Promise<User> {
    await this.prisma.userAppRole.deleteMany({ where: { userId: id } });

    const deletedUser = await this.prisma.user.delete({
      where: { id },
      include: { UserRole: true },
    });

    return {
      id: deletedUser.id,
      email: deletedUser.email,
      password: deletedUser.password,
      firstname: deletedUser.firstname,
      lastname: deletedUser.lastname,
      role: deletedUser.UserRole.map((ur) => ({
        role: ur.role,
        appName: ur.appName,
      })),
      isActive: deletedUser.isActive,
      createdAt: deletedUser.createdAt,
      updatedAt: deletedUser.updatedAt ?? undefined,
    };
  }
}
