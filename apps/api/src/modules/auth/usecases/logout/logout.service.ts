import { Injectable } from '@nestjs/common';
import { getSessionStorageKey } from '../../config/storage';
import { CacheStorage } from '../../../../shared/ports/cache-storage';

@Injectable()
export class LogoutService {
  constructor(private readonly cache: CacheStorage) {}

  async logout(sessionId: string) {
    await this.cache.del(getSessionStorageKey(sessionId));
  }
}
