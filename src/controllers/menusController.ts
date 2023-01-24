import { Request, Response } from "express";
import { EMessageStatus, EStatus } from "../constants/enum";
import { MenusService } from "../services/menusServices";

const menuService = new MenusService();

export class MenuController {
    async getAllMenus(req: Request, res: Response) {
        try {
            const menus = await menuService.AllMenus();

            if (menus === undefined) {
                res.status(404).json({
                    status: 'FAIL',
                    message: 'Aucun menu trouvé',
                    data: null,
                });
            } else {
                res.status(200).json({
                    satus: 'SUCCESS',
                    message: 'Voici les menus',
                    data: menus,
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: EStatus.ERROR,
                message: EMessageStatus.m500,
            });
        }

    }

    async getMenuByName(req: Request, res: Response) {
        const name = req.body.menu_nom;

        if (name === undefined) {
            return res.status(400).json({
                status: EStatus.FAIL,
                message: EMessageStatus.checkData
            });
        }
        try {
            const nameMenu = await menuService.menuName(
                name
            );

            if (nameMenu) {
                return res.status(200).json({
                    status: EStatus.OK,
                    message: 'Voici le menu demandé :',
                    data: nameMenu
                })
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                status: EStatus.ERROR,
                message: EMessageStatus.m500,
            });
        }
    }

    async createMenu(req: Request, res: Response) {
        const nom = req.body.nom;
        const prix = req.body.prix;

        if (nom === undefined || prix === null) {
            return res.status(400).json({
                status: EStatus.FAIL,
                message: EMessageStatus.checkData
            });
        }
        try {
            const menuAdd = await menuService.addMenu(
                nom, prix
            );
            if (menuAdd) {
                return res.status(200).json({
                    status: EStatus.OK,
                    message: 'Voici le nouveau menu :',
                    data: menuAdd
                })
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                status: EStatus.ERROR,
                message: EMessageStatus.m500,
            });
        }
    }
    async updateMenu(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const nom = req.body.nom;
        const prix = req.body.prix;
        console.log(id);
        

        if (nom === undefined && prix === null) {
            return res.status(400).json({
                status: EStatus.FAIL,
                message: EMessageStatus.checkData
            });
        }
        try {
            const modMenu = await menuService.upMenu(
                id ,nom, prix,
            );
            if (modMenu) {
                return res.status(200).json({
                    status: EStatus.OK,
                    message: 'Menu modifié',
                    data: modMenu
                })
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                status: EStatus.ERROR,
                message: EMessageStatus.m500,
            });
        }
    }
}