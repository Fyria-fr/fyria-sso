import { Global, Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/prisma.service';
import { CacheStorage } from './ports/cache-storage';
import { RedisCacheStorage } from './infrastructure/adapters/redis-cache-storage';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        timeout: 5000,
        maxRedirects: 5,
        baseURL: configService.get('API_URL'),
        headers: {
          Authorization: `${configService.get('API_TOKEN')}`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    PrismaService,
    {
      provide: CacheStorage,
      useFactory: (configService: ConfigService) => {
        const redisUrl = configService.get<string>('REDIS_URL');
        if (!redisUrl) {
          throw new Error('REDIS_URL is not set');
        }
        return new RedisCacheStorage(redisUrl);
      },
      inject: [ConfigService],
    },
  ],
  exports: [PrismaService, CacheStorage, HttpModule],
})
export class SharedModule {}
