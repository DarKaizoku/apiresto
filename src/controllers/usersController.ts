import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Users } from '../entity/Users';
import { AppDataSource } from '../data-source';
import { UsersServices } from '../services/usersServices';
import { EMessageStatus, EStatus } from '../constants/enum';

const secreToken = process.env.secreToken!;

const usersServices = new UsersServices();

export class UsersController {
        async getUsers(req: Request, res: Response) {
                try {
                        const users = await usersServices.AllUsers();

                        if (users === undefined) {
                                res.status(404).json({
                                        status: EStatus.FAIL,
                                        message: EMessageStatus.checkData,
                                        data: null,
                                });
                        } else {
                                res.status(200).json({
                                        status: EStatus.OK,
                                        message: 'Voici tous les users :',
                                        data: users,
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

        async register(req: Request, res: Response) {
                const name: string = req.body.name;
                const password: string = req.body.password;

                if (name === undefined || password === undefined) {
                        return res.status(400).json({
                                status: EStatus.FAIL,
                                message: EMessageStatus.checkData,
                        });
                }
                try {
                        const dataUser = await usersServices.getDataUserbyName(
                                name
                        );

                        if (dataUser) {
                                return res.status(400).json({
                                        status: EStatus.FAIL,
                                        message:
                                                EMessageStatus.x2 +
                                                ` => ${dataUser.username} <=`,
                                });
                        }
                        bcrypt.hash(password, 10, async (err, hash) => {
                                const registerOK = await usersServices.addUser(
                                        name,
                                        hash
                                );

                                if (registerOK) {
                                        return res.status(200).json({
                                                status: EStatus.OK,
                                                message: `Le compte de ${name} a bien été créé !`,
                                                data: registerOK,
                                        });
                                }
                        });
                } catch (error) {
                        console.log(error);
                        res.status(500).json({
                                status: EStatus.ERROR,
                                message: EMessageStatus.m500,
                        });
                }
        }

        async login(req: Request, res: Response) {
                const name: string = req.body.name;
                const password: string = req.body.password;

                if (!name || !password) {
                        return res.status(400).json({
                                status: EStatus.FAIL,
                                message: EMessageStatus.checkData,
                        });
                }
                try {
                        const dataUser = await usersServices.getDataUserbyName(
                                name
                        );
                        if (!dataUser) {
                                return res.status(400).json({
                                        status: EStatus.FAIL,
                                        message:
                                                EMessageStatus.Unknown +
                                                `${name}`,
                                });
                        }
                        const hash = dataUser.password;
                        bcrypt.compare(password, hash, async (err, result) => {
                                const id = dataUser.user_id;
                                const token = jwt.sign(
                                        { id, password },
                                        secreToken
                                );

                                if (result) {
                                        res.status(200).json({
                                                status: EStatus.OK,
                                                message: EMessageStatus.Connected,
                                                token: token,
                                        });
                                } else {
                                        res.status(401).json({
                                                status: EStatus.FAIL,
                                                message: EMessageStatus.passwordKO,
                                        });
                                }
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
