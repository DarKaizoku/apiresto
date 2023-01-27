import * as express from 'express';
import { AppDataSource } from './data-source';
import restaurantsRouter from './routers/restaurantsRouter';
import menusRouter from './routers/menusRouter';
import * as path from 'path';

import usersRouter from './routers/usersRouter';
import commandesRouter from './routers/commandesRouter';

AppDataSource.initialize()
        .then(async () => {
                const app = express();
                const port = 8080;

                app.use(express.json());

                app.use('/', express.static(path.join(__dirname, '../public')));
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
                app.use('/api/restaurants', restaurantsRouter);
                app.use('/api/menus', menusRouter);
                app.use('/api/commandes', commandesRouter);

                app.listen(port, () => {
                        console.log(
                                `Express server has started on port ${port}. Open http://localhost:${port} to see results`
                        );
                });
        })
        .catch((error) => console.log(error));
