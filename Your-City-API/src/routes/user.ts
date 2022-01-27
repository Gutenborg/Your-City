import { Router } from 'express';
import {
  loginUser,
  getUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser,
  verifyUser,
  verifyRefreshToken,
  logoutUser,
} from '../controller/user';

const userRouter = Router();

userRouter.get('/', verifyUser('admin'), getUsers);

userRouter.get('/:id', verifyUser(['admin', 'user']), getUserById);

userRouter.post('/', verifyUser('admin'), createUser);

userRouter.put('/:id', verifyUser(['admin', 'user']), editUser);

userRouter.delete('/:id', verifyUser(['admin', 'user']), deleteUser);

userRouter.post('/login', verifyUser(), loginUser);

userRouter.post('/token', verifyUser(), verifyRefreshToken);

userRouter.post('/logout', verifyUser(), logoutUser);

export default userRouter;
