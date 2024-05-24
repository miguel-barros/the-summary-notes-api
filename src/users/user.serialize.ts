import { Record } from '@prisma/client/runtime/library';
import { UserInterface } from 'src/types/user';

type userWithoutPassword = Omit<UserInterface, 'password'>;
type userWithoutPasswordAndRefreshToken = Omit<
  userWithoutPassword,
  'refreshToken'
>;

const userSerialize: Record<keyof userWithoutPasswordAndRefreshToken, boolean> =
  {
    id: true,
    email: true,
    createdAt: true,
    updatedAt: true,
  };

export { userSerialize };
