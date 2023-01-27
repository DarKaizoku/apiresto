import { Commandes } from '../entity/Commandes';
import { TCommande } from '../types/TCommande';
import { TUser } from '../types/TUser';

export class CommandesServices {
        async getAll(): Promise<Commandes[] | undefined> {
                const data = await Commandes.find({
                        relations: {
                                //resto: true, //trouver la solution pour cacher le password ou autre donnée !!
                        },
                });
                console.log(data);

                if (data) {
                        return data;
                }
                return undefined;
        }

        async commandeId(id : number){
                const data = await Commandes.findBy({ commande_id: id });
                if (data[0]) {
                        return data[0];
                }
                return undefined;
        }
        

        async addCommande(
                user_id: number,
                resto_ville: string,
                menu_id: number
        ): Promise<Commandes | undefined> {
                let newCommande = new Commandes();
                newCommande.user_id = user_id;
                newCommande.resto = resto_ville;
                newCommande.menu = menu_id;

                await Commandes.save(newCommande);

                const newData = await Commandes.findOneBy({ user_id });

                if (newData) {
                        return newData;
                }
                return undefined;
        }

        async upCommande(id: number, resto_ville: string, menu_id: number) {
                const oldCommande = await Commandes.findOneBy({ commande_id: id });

                oldCommande.resto = resto_ville;
                oldCommande.menu = menu_id;

                const menuChanged = await Commandes.save(
                        oldCommande
                )
                if (menuChanged) {
                        const data = await Commandes.findBy({ commande_id:id });
                        return data
                }
                return undefined;
        }

        async deleteCommande(id: number): Promise<Commandes | undefined> {
                const dataCheck = await Commandes.findOneBy({ commande_id: id });

                await Commandes.remove(dataCheck);

                const dataDeleted = await Commandes.findBy({
                        commande_id: id,
                });

                if (dataDeleted) {
                        return dataCheck;
                }
                return undefined;
        }
}
