import { Request, Response } from 'express';
import { EMessageStatus, EStatus } from '../constants/enum';
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
        async getCommandeById(req: Request, res: Response) {
                const id = parseInt(req.params.id);

                if (!id || typeof id !== 'number') {
                        return res.status(400).json({
                                status: EStatus.FAIL,
                                message: EMessageStatus.checkData,
                                data: '==> id <==',
                        });
                }
                try {
                        const commandes = await commandesServices.commandeId(
                                id
                        );

                        if (commandes === undefined) {
                                res.status(404).json({
                                        status: EStatus.FAIL,
                                        message: 'Aucune commande trouvée',
                                        data: null,
                                });
                        } else {
                                res.status(200).json({
                                        satus: EStatus.OK,
                                        message: 'Voici la commande',
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

        async updateCommande(req: Request, res: Response) {
                const id = parseInt(req.params.id);

                const ville = req.body.ville;
                const menu = req.body.menu;

                if (
                        !ville ||
                        !menu ||
                        typeof ville !== 'string' ||
                        typeof menu !== 'number'
                ) {
                        return res.status(400).json({
                                status: EStatus.FAIL,
                                message: EMessageStatus.checkData,
                        });
                }

                try {
                        const modCommande = await commandesServices.upCommande(
                                id,
                                ville,
                                menu
                        );
                        if (modCommande) {
                                return res.status(200).json({
                                        status: EStatus.OK,
                                        message: EMessageStatus.updateOK,
                                        data: modCommande,
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
        async deleteCommandebyId(req: Request, res: Response) {
                const commande_id: number = parseInt(req.params.id);

                if (!Number.isFinite(commande_id)) {
                        return res.status(404).json({
                                status: EStatus.FAIL,
                                message: EMessageStatus.checkData,
                                data: null,
                        });
                }
                try {
                        const dataCheck = await commandesServices.getAll();

                        const check = dataCheck.filter(
                                (data) => data.commande_id === commande_id
                        );
                        if (!check[0]) {
                                return res.status(404).json({
                                        status: EStatus.FAIL,
                                        message:
                                                EMessageStatus.Unknown +
                                                `n° de Commande => ${commande_id}`,
                                });
                        }
                        const dataDeleted =
                                await commandesServices.deleteCommande(
                                        commande_id
                                );

                        res.status(200).json({
                                status: EStatus.OK,
                                message: EMessageStatus.DeletedOK,
                                save: dataDeleted,
                        });
                } catch (error) {
                        console.log(error);
                        res.status(500).json({
                                status: EStatus.ERROR,
                                message: EMessageStatus.m500,
                        });
                }
        }
}
