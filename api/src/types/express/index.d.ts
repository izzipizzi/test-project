import { UserResponseDto } from 'shared';

declare global {
  namespace Express {
    interface Request {
      user?: UserResponseDto;
    }
  }
}
