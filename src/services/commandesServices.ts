import { Commandes } from '../entity/Commandes';
import { Menus } from '../entity/Menus';
import { Restos } from '../entity/Restos';

export class CommandesServices {
        async getAll(): Promise<Commandes[] | undefined> {
                const data = await Commandes.find({
                        /* relations: {
                                //resto: true, //trouver la solution pour cacher le password ou autre donnée !!
                        }, */
                });
                console.log(data);

                if (data) {
                        return data;
                }
                return undefined;
        }

        async commandeId(id: number) {
                const data = await Commandes.findBy({ commande_id: id });
                if (data[0]) {
                        return data[0];
                }
                return undefined;
        }
        async getDataExist() {
                const dataRestos: Restos[] = await Restos.find();
                const dataMenus: Menus[] = await Menus.find();

                const listRestos = dataRestos.map((data) => data.resto_ville);
                const listMenusId = dataMenus.map((data) => data.menu_id);

                const newData = {
                        listR: listRestos,
                        idMenus: listMenusId,
                };

                if (newData) {
                        return newData;
                }
                return undefined;
        }

        async addCommande(
                user_id: number,
                resto: string,
                menu: number
        ): Promise<Commandes | undefined> {
                let newCommande = new Commandes();
                newCommande.user_id = user_id;
                newCommande.resto = resto;
                newCommande.menu = menu;

                await Commandes.save(newCommande);

                const listCommandesUser = await Commandes.find();
                const lastCommande: Commandes =
                        listCommandesUser[listCommandesUser.length - 1];
                if (lastCommande) {
                        return lastCommande;
                        return undefined;
                }
        }
        async upCommande(
                user_id: number,
                resto_ville: string,
                menu_id: number
        ) {
                const oldCommande = await Commandes.findOneBy({
                        commande_id: user_id,
                });

                oldCommande.resto = resto_ville;
                oldCommande.menu = menu_id;

                const menuChanged = await Commandes.save(oldCommande);
                if (menuChanged) {
                        return menuChanged;
                }
                return undefined;
        }

        async deleteRestaurant(id: number): Promise<Commandes | undefined> {
                const dataCheck = await Commandes.findOneBy({
                        commande_id: id,
                });

                await Commandes.remove(dataCheck);

                const dataDeleted = await Commandes.findBy({
                        commande_id: id,
                });

                if (dataDeleted) {
                        return dataCheck;
                }
        }
}
