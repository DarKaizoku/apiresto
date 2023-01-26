import { Router } from 'express';
import { MenuController } from '../controllers/menusController';
import { verifAdmin } from '../middleware/admin';
import { verifyToken } from '../middleware/auth';

const menusRouter = Router();
const menusController = new MenuController();

menusRouter.get('/', menusController.getAllMenus);
menusRouter.get('/nom/', menusController.getMenuByName);
menusRouter.post('/', verifyToken, verifAdmin, menusController.createMenu);
menusRouter.put('/:id', verifyToken, verifAdmin, menusController.updateMenu);
menusRouter.delete('/:id', verifyToken, verifAdmin, menusController.deleteMenu);

export default menusRouter;
