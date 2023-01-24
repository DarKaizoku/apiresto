import { Request, Response } from 'express';
import { EMessageStatus, EStatus } from '../constants/enum';
import { RestaurantsServices } from '../services/restaurantsServices';

const restaurantsServices = new RestaurantsServices();
export class RestaurantsController {
        async getAllRestaurants(req: Request, res: Response) {
                try {
                        const restaurants =
                                await restaurantsServices.allRestaurants();

                        if (restaurants === undefined) {
                                res.status(404).json({
                                        status: EStatus.FAIL,
                                        message: EMessageStatus.Unknown,
                                        data: null,
                                });
                        } else {
                                res.status(200).json({
                                        status: EStatus.OK,
                                        message: `Voici l'ensemble des restaurants :`,
                                        data: restaurants,
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

        async postNewRestaurant(req: Request, res: Response) {
                //const id = req.body.id;
                const ville = req.body.resto_ville;

                if (ville === undefined) {
                        return res.status(404).json({
                                status: EStatus.FAIL,
                                message: EMessageStatus.checkData,
                                data: null,
                        });
                }
                try {
                        const dataCheck =
                                await restaurantsServices.allRestaurants();
                        const check = dataCheck.filter(
                                (data) => (data.resto_ville = ville)
                        )
                                ? true
                                : false;

                        if (check) {
                                return res.status(400).json({
                                        status: EStatus.FAIL,
                                        message: EMessageStatus.x2,
                                        data: ville,
                                });
                        }
                        const dataNew = await restaurantsServices.addRestaurant(
                                ville
                        );

                        if (dataNew) {
                                res.status(200).json({
                                        status: EStatus.OK,
                                        message: EMessageStatus.dataOK,
                                        data: dataNew,
                                });
                        } else {
                                res.status(400).json({
                                        status: EStatus.FAIL,
                                        message: EMessageStatus.dataKO,
                                        data: ville,
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

        async updateRestaurant(req: Request, res: Response) {
                const id = req.body.id;
                const oldVille = req.body.oldVille;
                const newVille = req.body.newVille;

                if (newVille === undefined || oldVille === undefined) {
                        return res.status(404).json({
                                status: EStatus.FAIL,
                                message: EMessageStatus.checkData,
                                data: null,
                        });
                }
                try {
                        const dataCheck =
                                await restaurantsServices.allRestaurants();
                        const checkOld = dataCheck.filter(
                                (data) => (data.resto_ville = oldVille)
                        )
                                ? true
                                : false;
                        if (!checkOld) {
                                return res.status(400).json({
                                        status: EStatus.FAIL,
                                        message: EMessageStatus.Unknown,
                                        data: oldVille,
                                });
                        }
                        const checkNew = dataCheck.filter(
                                (data) => (data.resto_ville = newVille)
                        )
                                ? true
                                : false;

                        if (checkNew) {
                                return res.status(400).json({
                                        status: EStatus.FAIL,
                                        message: EMessageStatus.x2,
                                        data: newVille,
                                });
                        }
                        const dataUpdated =
                                await restaurantsServices.updateRestaurant(
                                        oldVille,
                                        newVille
                                );
                        if (!dataUpdated) {
                                return res.status(404).json({
                                        status: EStatus.FAIL,
                                        message: EMessageStatus.updateKO,
                                });
                        } else {
                                res.status(200).json({
                                        status: EStatus.OK,
                                        message: EMessageStatus.updateOK,
                                        data: dataUpdated,
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
