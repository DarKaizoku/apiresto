import { Router } from 'express';
import { CommandesController } from '../controllers/commandesController';
import { verifAdmin } from '../middleware/admin';
import { verifyToken } from '../middleware/auth';

const commandesRouter = Router();

const commandesController = new CommandesController();

commandesRouter.get(
        '/',
        verifyToken,
        verifAdmin,
        commandesController.getAllCommandes
);

commandesRouter.post('/', verifyToken, commandesController.addCommande);

export default commandesRouter;
