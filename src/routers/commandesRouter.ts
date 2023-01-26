import { Router } from 'express';
import { CommandesController } from '../controllers/commandesController';

const commandesRouter = Router();

const commandesController = new CommandesController();

commandesRouter.get('/', commandesController.getAllCommandes);

commandesRouter.post;

export default commandesRouter;
