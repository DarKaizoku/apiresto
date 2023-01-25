import { Router } from 'express';
import { MenuController } from '../controllers/menusController';
import { verifyToken } from '../middleware/auth';

const menusRouter = Router();
const menusController = new MenuController();

<<<<<<< HEAD
menusRouter.get('/', menusController.getAllMenus);
menusRouter.get('/nom/', menusController.getMenuByName);
menusRouter.post('/', menusController.createMenu);
menusRouter.put('/:id', menusController.updateMenu);
menusRouter.delete('/:id', menusController.deleteMenu);
=======
menusRouter.get('/',verifyToken, menusController.getAllMenus);
menusRouter.get('/nom/' ,menusController.getMenuByName);
menusRouter.post('/' , menusController.createMenu);
menusRouter.put('/:id' ,menusController.updateMenu);
menusRouter.delete('/:id' ,menusController.deleteMenu);
>>>>>>> 7add75dc37029cb3e2b1dbb29c48bbcc6e688a37

export default menusRouter;
