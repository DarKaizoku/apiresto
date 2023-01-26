import { Router } from 'express';
import { UsersController } from '../controllers/usersController';
import { verifAdmin } from '../middleware/admin';
import { verifyToken } from '../middleware/auth';

const usersRouter = Router();

const usersController = new UsersController();

<<<<<<< HEAD
usersRouter.get('/', verifyToken, usersController.getUsers);
=======
usersRouter.get('/', verifyToken, verifAdmin, usersController.getUsers);
>>>>>>> 01a32ace7645d0ecc43424d61163099efc00eafb

usersRouter.post('/register', usersController.register);

usersRouter.post('/login', usersController.login);

export default usersRouter;
