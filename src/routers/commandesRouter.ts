import { Router } from 'express';
import { CommandesController } from '../controllers/commandesController';
import { verifyToken } from '../middleware/auth';

const commandesRouter = Router();

const commandesController = new CommandesController();

commandesRouter.get('/', verifyToken, commandesController.getAllCommandes);

commandesRouter.post('/', verifyToken, commandesController.addCommande);

export default commandesRouter;
