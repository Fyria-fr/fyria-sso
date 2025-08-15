import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { CacheStorage } from '../../../shared/ports/cache-storage';
import { getSessionStorageKey, SESSION_TTL_MS } from './storage';
import { Session } from '../../../types/session';

export async function createSession(
  cache: CacheStorage,
  sessionId: string,
  user: Session['user'],
) {
  await cache.set(getSessionStorageKey(sessionId), user, SESSION_TTL_MS);
}

export function generateSessionId(): string {
  return uuidv4();
}

export function comparePasswords(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
