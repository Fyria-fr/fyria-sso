import { Request } from 'express';
import { Session } from './session';

export interface AuthenticatedRequest extends Request {
  session: {
    id: string;
    user: Session['user'];
  };
}
