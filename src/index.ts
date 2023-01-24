import * as express from 'express';
import { Request, Response } from 'express';
import { AppDataSource } from './data-source';
import { Menus } from './entity/Menus';
import menusRouter from './routers/menusRouter';

import usersRouter from './routers/usersRouter';

AppDataSource.initialize()
        .then(async () => {
                console.log('Data Source has been initialized!');

                const app = express();
                const port = 8080;

                app.use(express.json());
                app.use(function (req, res, next) {
                        res.setHeader('authorization', '');
                        // Website you wish to allow to connect
                        res.setHeader(
                                'Access-Control-Allow-Origin',
                                'http://localhost:3000'
                        );

                        // Request methods you wish to allow
                        res.setHeader(
                                'Access-Control-Allow-Methods',
                                'GET, POST, OPTIONS, PUT, PATCH, DELETE'
                        );

                        // Request headers you wish to allow
                        res.setHeader(
                                'Access-Control-Allow-Headers',
                                'Origin, X-Requested-With, Content-Type, Accept, Authorization'
                        );

                        // Pass to next layer of middleware
                        next();
                });

                app.use('/api/users', usersRouter);

                app.get('/api/menus', async (req: Request, res: Response) => {
                        console.log('test');

                        try {
                                const data = await Menus.find();
                                console.log(data);
                                res.json(data);
                        } catch (error) {
                                console.log(error);
                        }
                });

                app.listen(port, () => {
                        console.log(
                                `Express server has started on port ${port}. Open http://localhost:${port} to see results`
                        );
                });
        })
        .catch((error) => console.log(error));
