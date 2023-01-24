import { Router } from "express";
import { MenuController } from "../controllers/menusController";

const menusRouter = Router();
const menusController = new MenuController();

menusRouter.get('/', menusController.getAllMenus);
menusRouter.get('/nom/' ,menusController.getMenuByName);
menusRouter.post('/' , menusController.createMenu);
menusRouter.put('/:id' ,menusController.updateMenu);
//menusRouter.delete('/:id' ,menusController.deleteMenu);

export default menusRouter;