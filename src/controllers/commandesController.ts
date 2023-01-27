import { Request, Response } from 'express';
import { EMessageStatus, EStatus } from '../constants/enum';
import { CommandesServices } from '../services/commandesServices';
const commandesServices = new CommandesServices();

export class CommandesController {
        async getAllCommandes(req: Request, res: Response) {
                try {
                        const commandes = await commandesServices.getAll();

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
                        typeof menu !== 'string' ||
                        typeof menu !== 'number'
                ) {
                        return res.status(400).json({
                                status: EStatus.FAIL,
                                message: EMessageStatus.checkData,
                        });
                }

                try {
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

                if (!ville || !menu) {
                        return res.status(400).json({
                                status: EStatus.FAIL,
                                message: EMessageStatus.checkData,
                        });
                }

                try {
                        const modCommande = await commandesServices.upCommande(id, ville, menu);
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
                        const dataCheck =
                                await commandesServices.getAll();
                        if (!dataCheck[0]) {
                                return res.status(404).json({
                                        status: EStatus.FAIL,
                                        message:
                                                EMessageStatus.Unknown +
                                                `n° de Commande => ${commande_id}`,
                                });
                        }
                        const dataDeleted =
                                await commandesServices.deleteRestaurant(
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
