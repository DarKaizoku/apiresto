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
}
