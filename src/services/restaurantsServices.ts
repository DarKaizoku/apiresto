import { AppDataSource } from '../data-source';
import { Restos } from '../entity/Restos';

export class RestaurantsServices {
        async allRestaurants(): Promise<Restos[] | undefined> {
                const data = await Restos.find();
                if (data[0]) {
                        return data;
                }
                return undefined;
        }

        async addRestaurant(ville: string): Promise<Restos | undefined> {
                const newRestaurant = new Restos();
                newRestaurant.resto_ville = ville;
                console.log(newRestaurant);

                await Restos.save(newRestaurant);

                const newRestaurantOK = await Restos.findOneBy({
                        resto_ville: ville,
                });
                if (newRestaurantOK) {
                        return newRestaurantOK;
                }
                return undefined;
        }

        async updateRestaurant(
                oldVille: string,
                newVille: string
        ): Promise<Restos | undefined> {
                const oldData = await Restos.findOneBy({
                        resto_ville: oldVille,
                });
                oldData.resto_ville = newVille;
                const dataUpdated = await Restos.save(oldData);

                if (dataUpdated) {
                        return dataUpdated;
                }
                return undefined;
        }

        async deleteRestaurant(id: number): Promise<Restos | undefined> {
                const dataCheck = await Restos.findOneBy({ resto_id: id });

                await Restos.remove(dataCheck);

                const dataDeleted = await Restos.findBy({
                        resto_id: id,
                });

                if (dataDeleted) {
                        return dataCheck;
                }
                return undefined;
        }
}
