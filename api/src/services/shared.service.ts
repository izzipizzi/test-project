import { UserResponseDto, UserRole } from 'shared';

export const haveAccess = (resourceId: string, user: UserResponseDto) => {
  return resourceId === user._id || user.role === UserRole.ADMIN;
};
