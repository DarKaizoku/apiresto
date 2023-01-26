import { Commandes } from '../entity/Commandes';
import { TCommande } from '../types/TCommande';

export class CommandesServices {
        async getAll(): Promise<Commandes[] | undefined> {
                const data = await Commandes.find();

                if (data) {
                        return data;
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
                newCommande.menus = menu_id;

                await Commandes.save(newCommande);

                const newData = await Commandes.findOneBy({ user_id });

                if (newData) {
                        return newData;
                }
                return undefined;
        }
}
