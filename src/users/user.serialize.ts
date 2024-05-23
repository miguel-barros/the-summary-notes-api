import { User } from '@prisma/client';
import { Record } from '@prisma/client/runtime/library';

type userWithoutPassword = Omit<User, 'password'>;
type userWithoutPasswordAndRefreshToken = Omit<
  userWithoutPassword,
  'refreshToken'
>;

const userSerialize: Record<keyof userWithoutPasswordAndRefreshToken, boolean> =
  {
    id: true,
    name: true,
    email: true,
    createdAt: true,
    updatedAt: true,
  };

export { userSerialize };
