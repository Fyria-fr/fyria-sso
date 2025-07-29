import 'express';
import { Multer as MulterNamed } from 'multer';
import { Session } from './session';

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface Multer extends MulterNamed {}
  }
}

declare module 'express' {
  interface Request {
    session?: Session;
  }
}
