import { Request, Response } from 'express';
import { EMessageStatus, EStatus } from '../constants/enum';

export function verifAdmin(req: Request, res: Response, next) {
        const admin: boolean = req.body.admin;
        if (admin === true) {
                console.log('ADMIN OK');

                next();
        } else {
                res.status(403).json({
                        status: EStatus.ERROR,
                        message: EMessageStatus.forbidden,
                });
        }
}

export function v2Admin(data, next) {
        if (data === true) {
                console.log('ADMIN OK');

                return true;
        }
        return false;
}
