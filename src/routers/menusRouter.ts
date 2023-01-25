import { Router } from 'express';
import { MenuController } from '../controllers/menusController';
import { verifyToken } from '../middleware/auth';

const menusRouter = Router();
const menusController = new MenuController();

<<<<<<< HEAD
menusRouter.get('/', menusController.getAllMenus);
menusRouter.get('/nom/' ,menusController.getMenuByName);
menusRouter.post('/' , menusController.createMenu);
menusRouter.put('/:id' ,menusController.updateMenu);
menusRouter.delete('/:id' ,menusController.deleteMenu);
=======
menusRouter.get('/', verifyToken, menusController.getAllMenus);
menusRouter.get('/nom/', menusController.getMenuByName);
menusRouter.post('/', menusController.createMenu);
menusRouter.put('/:id', menusController.updateMenu);
//menusRouter.delete('/:id' ,menusController.deleteMenu);
>>>>>>> de1e76cdfff784c46780abf9f17346e366b92e93

export default menusRouter;
