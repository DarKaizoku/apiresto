import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const secreToken = process.env.secreToken!;

//fonction de vérification du token, lors de l'authentification des users.
export function verifyToken(req: Request, res: Response, next) {
        const authHeader = req.headers.authorization!;
        const token: string = authHeader.split(' ')[1]; // permet de supprimer "Bearer" de authorization !!
        if (!token) {
                res.send('Token Manquant !!');
        } else {
                jwt.verify(token, secreToken, (err: any, decoded: any) => {
                        if (err) {
                                console.log(err);
                                res.json({
                                        auth: false,
                                        message: 'Authentification échouée !!',
                                });
                        } else {
                                req.body.idToken = decoded.id;
                                req.body.nameToken = decoded.name;
                                next();
                        }
                });
        }
}
