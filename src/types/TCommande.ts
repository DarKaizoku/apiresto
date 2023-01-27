import { Menus } from '../entity/Menus';
import { Restos } from '../entity/Restos';
import { Users } from '../entity/Users';

export type TCommande = {
        commande: number;
        user: Users;
        resto: Restos;
        menus: Menus;
};
