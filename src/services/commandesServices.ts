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
                }
                return undefined;
        }
}
