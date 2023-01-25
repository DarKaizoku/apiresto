import { Router } from 'express';
import { RestaurantsController } from '../controllers/restaurantsController';
import { verifyToken } from '../middleware/auth';

const restaurantsRouter = Router();

const restaurantsController = new RestaurantsController();

restaurantsRouter.get('/', restaurantsController.getAllRestaurants);

restaurantsRouter.post(
        '/',
        verifyToken,
        restaurantsController.postNewRestaurant
);

restaurantsRouter.put(
        '/',
        verifyToken,
        restaurantsController.updateRestaurantbyName
);

restaurantsRouter.delete(
        '/:id',
        verifyToken,
        restaurantsController.deleteRestaurantbyId
);

export default restaurantsRouter;
