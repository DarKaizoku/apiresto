import { AppDataSource } from './data-source';
import { Commandes } from './entity/Commandes';
import { Menus } from './entity/Menus';
import { Users } from './entity/Users';
import { TCommande } from './types/TCommande';

AppDataSource.initialize()
        .then(async () => {
                /* const commande1 = new Commandes();

                commande1.user = 1;
                commande1.resto = 3;
                commande1.menus = 1;

                await AppDataSource.manager.save(commande1); */
                const commande = await AppDataSource.manager.findOneBy({
                        menu_id: 1,
                });

                console.log(commande);
        })
        .catch((error) => console.log(error));
