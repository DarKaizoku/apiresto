import { Request, Response } from 'express';
import { EMessageStatus, EStatus } from '../constants/enum';
import { MenusService } from '../services/menusServices';

const menuService = new MenusService();

export class MenuController {
        async getAllMenus(req: Request, res: Response) {
                try {
                        const menus = await menuService.AllMenus();

                        if (menus === undefined) {
                                res.status(404).json({
                                        status: EStatus.FAIL,
                                        message: 'Aucun menu trouvé',
                                        data: null,
                                });
                        } else {
                                res.status(200).json({
                                        satus: EStatus.OK,
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
                const nom = req.body.nom;

                if (nom === undefined) {
                        return res.status(400).json({
                                status: EStatus.FAIL,
                                message: EMessageStatus.checkData,
                        });
                }
                try {
                        const nameMenu = await menuService.menuName(nom);

                        if (nameMenu) {
                                return res.status(200).json({
                                        status: EStatus.OK,
                                        message: 'Voici le menu demandé :',
                                        data: nameMenu,
                                });
                        } else {
                                res.status(404).json({
                                        status: EStatus.FAIL,
                                        message: 'Aucun menu trouvé',
                                        data: null,
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

        async createMenu(req: Request, res: Response) {
                const nom = req.body.nom;
                const prix = req.body.prix;

                if (!nom || !prix || typeof prix !== 'number') {
                        return res.status(400).json({
                                status: EStatus.FAIL,
                                message: EMessageStatus.checkData,
                        });
                }

                const dataCheck = await menuService.AllMenus();
                const menucheck = dataCheck.filter(
                        (data) => data.menu_nom === nom
                );
                if (menucheck[0]) {
                        return res.status(400).json({
                                status: EStatus.FAIL,
                                message: EMessageStatus.x2,
                                data: nom,
                        });
                }

                try {
                        const menuAdd = await menuService.addMenu(nom, prix);
                        if (menuAdd) {
                                return res.status(200).json({
                                        status: EStatus.OK,
                                        message: 'Voici le nouveau menu :',
                                        data: menuAdd,
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
        async updateMenu(req: Request, res: Response) {
                const id = parseInt(req.params.id);

                const nom = req.body.nom;
                const prix = req.body.prix;

                if (!nom || !prix || typeof prix !== 'number') {
                        return res.status(400).json({
                                status: EStatus.FAIL,
                                message: EMessageStatus.checkData,
                        });
                }

                try {
                        /*const dataCheck =
                await menuService.AllMenus();
        const menucheck = dataCheck.filter(
                //(data) => ((data.menu_nom === nom) && (data.menu_prix === prix))
                data => data.menu_nom === nom && data.menu_prix === prix
        )
        console.log(menucheck);

        if (!menucheck[0]) {
                return res.status(400).json({
                status: EStatus.FAIL,
                message: EMessageStatus.x2,
                data: nom, prix
                });
        }*/

                        const modMenu = await menuService.upMenu(id, nom, prix);
                        if (modMenu) {
                                return res.status(200).json({
                                        status: EStatus.OK,
                                        message: 'Menu modifié',
                                        data: modMenu,
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

        async deleteMenu(req: Request, res: Response) {
                const id = parseInt(req.params.id);

                if (!id) {
                        return res.status(400).json({
                                status: EStatus.FAIL,
                                message: EMessageStatus.checkData,
                        });
                }

                try {
                        /*const menuCheck = menuService.AllMenus();
        console.log('test');
        
        console.log(menuCheck);
        
        if (!menuCheck[0]) {
                return res.status(404).json({
                status: EStatus.FAIL,
                message:
                        EMessageStatus.Unknown +
                        `n° menu => ${id}`,
                });
        }*/
                        const byeMenu = await menuService.suppMenu(id);
                        if (byeMenu) {
                                return res.status(200).json({
                                        status: EStatus.OK,
                                        message: 'Menu supprimé',
                                        data: byeMenu,
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
}
