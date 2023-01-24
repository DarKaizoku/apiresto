import { Router } from 'express';
import { UsersController } from '../controllers/usersController';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.get('/', usersController.getUsers);

usersRouter.post('/register', usersController.register);

usersRouter.post('/login', usersController.login);

export default usersRouter;
