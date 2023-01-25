import { Router } from 'express';
import { UsersController } from '../controllers/usersController';
import { verifyToken } from '../middleware/auth';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.get('/',verifyToken, usersController.getUsers);

usersRouter.post('/register', usersController.register);

usersRouter.post('/login', usersController.login);

export default usersRouter;
