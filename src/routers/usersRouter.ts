import { Router } from 'express';
import { UsersController } from '../controllers/usersController';
import { verifAdmin } from '../middleware/admin';
import { verifyToken } from '../middleware/auth';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.get('/', verifyToken, verifAdmin, usersController.getUsers);

usersRouter.post('/register', usersController.register);

usersRouter.post('/login', usersController.login);

export default usersRouter;
