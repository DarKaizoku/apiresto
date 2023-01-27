import { Request, Response } from 'express';
import { EMessageStatus, EStatus } from '../constants/enum';
import { v2Admin, verifAdmin } from '../middleware/admin';
import { CommandesServices } from '../services/commandesServices';

const commandesServices = new CommandesServices();

export class CommandesController {
        async getAllCommandes(req: Request, res: Response, next) {
                const admin = req.body.admin;
                try {
                        const commandes = await commandesServices.getAll();

                        //verifAdmin(req, res, next);
                        //const verif = v2Admin(admin, next);

                        if (commandes === undefined) {
                                res.status(404).json({
                                        status: EStatus.FAIL,
                                        message: 'Aucune commande trouvée',
                                        data: null,
                                });
                        } else {
                                res.status(200).json({
                                        satus: EStatus.OK,
                                        message: 'Voici les commandes',
                                        data: commandes,
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

        async addCommande(req: Request, res: Response) {
                const user = req.body.idToken;
                const resto: string = req.body.ville;
                const menu: number = req.body.menu;

                if (
                        !resto ||
                        !menu ||
                        typeof resto !== 'string' ||
                        typeof menu !== 'number'
                ) {
                        return res.status(400).json({
                                status: EStatus.FAIL,
                                message: EMessageStatus.checkData,
                        });
                }

                try {
                        const dataCheck =
                                await commandesServices.getDataExist();
                        const restoCheck = dataCheck.listR.filter(
                                (data) => data === resto
                        );

                        if (!restoCheck[0]) {
                                return res.status(400).json({
                                        status: EStatus.FAIL,
                                        message: EMessageStatus.Unknown,
                                        data: resto,
                                });
                        }
                        const menuCheck = dataCheck.idMenus.filter(
                                (data) => data === menu
                        );

                        if (!menuCheck[0]) {
                                return res.status(400).json({
                                        status: EStatus.FAIL,
                                        message: EMessageStatus.Unknown,
                                        data: menu,
                                });
                        }
                        const data = await commandesServices.addCommande(
                                user,
                                resto,
                                menu
                        );

                        if (!data) {
                                res.status(400).json({
                                        status: EStatus.FAIL,
                                        message: EMessageStatus.dataKO,
                                        data: null,
                                });
                        } else {
                                res.status(200).json({
                                        status: EStatus.OK,
                                        message: EMessageStatus.dataOK,
                                        data: data,
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
