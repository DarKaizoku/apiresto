import { Router } from 'express';
import { MenuController } from '../controllers/menusController';
import { verifAdmin } from '../middleware/admin';
import { verifyToken } from '../middleware/auth';

const menusRouter = Router();
const menusController = new MenuController();

menusRouter.get('/', menusController.getAllMenus);
menusRouter.get('/nom/', menusController.getMenuByName);
<<<<<<< HEAD
menusRouter.post('/', menusController.createMenu);
menusRouter.put('/:id', menusController.updateMenu);
menusRouter.delete('/:id', menusController.deleteMenu);
=======
menusRouter.post('/', verifyToken, verifAdmin, menusController.createMenu);
menusRouter.put('/:id', verifyToken, verifAdmin, menusController.updateMenu);
menusRouter.delete('/:id', verifyToken, verifAdmin, menusController.deleteMenu);
>>>>>>> 01a32ace7645d0ecc43424d61163099efc00eafb

export default menusRouter;
