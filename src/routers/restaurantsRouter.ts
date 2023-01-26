import { Router } from 'express';
import { RestaurantsController } from '../controllers/restaurantsController';
import { verifAdmin } from '../middleware/admin';
import { verifyToken } from '../middleware/auth';

const restaurantsRouter = Router();

const restaurantsController = new RestaurantsController();

restaurantsRouter.get('/', restaurantsController.getAllRestaurants);

restaurantsRouter.post(
        '/',
        verifyToken, verifAdmin,
        restaurantsController.postNewRestaurant
);

restaurantsRouter.put(
        '/',
        verifyToken, verifAdmin,
        restaurantsController.updateRestaurantbyName
);

restaurantsRouter.delete(
        '/:id',
        verifyToken, verifAdmin,
        restaurantsController.deleteRestaurantbyId
);

export default restaurantsRouter;
