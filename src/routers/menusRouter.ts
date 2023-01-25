import { Router } from 'express';
import { MenuController } from '../controllers/menusController';
import { verifyToken } from '../middleware/auth';

const menusRouter = Router();
const menusController = new MenuController();

menusRouter.get('/',verifyToken, menusController.getAllMenus);
menusRouter.get('/nom/' ,menusController.getMenuByName);
menusRouter.post('/' , menusController.createMenu);
menusRouter.put('/:id' ,menusController.updateMenu);
menusRouter.delete('/:id' ,menusController.deleteMenu);

export default menusRouter;
