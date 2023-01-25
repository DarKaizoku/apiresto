import { AppDataSource } from "../data-source";
import { Menus } from "../entity/Menus";

const dbManager = AppDataSource.manager;

export class MenusService {
    async AllMenus() {
        const menus: Menus[] | undefined = await Menus.find();

        if (menus[0]) {
            return menus;
        }
        return undefined;
    }
    async menuName(nom: string): Promise<Menus | undefined> {
        const data = await Menus.findBy({ menu_nom: nom });
        if (data[0]) {
            return data[0];
        }
        return undefined;
    }
    async addMenu(nom: string, prix: number) {
        const newMenu = new Menus();
        newMenu.menu_nom = nom;
        newMenu.menu_prix = prix;

        await dbManager.save(newMenu);
        const menuOk = await Menus.findOneBy({
            menu_nom: nom,
        })

        if (menuOk) {
            return menuOk;
        }
        return undefined;
    }
    async upMenu(id: number, nom: string, prix: number) {
        const oldMenu = await Menus.findOneBy({ menu_id: id });

        oldMenu.menu_nom = nom;
        oldMenu.menu_prix = prix;

        const menuChanged = await Menus.save(
            oldMenu
        )
        if (menuChanged) {
            return menuChanged;
        } 
        return undefined;
    }
    async suppMenu(id: number){
        const idMenu = await Menus.findOneBy({menu_id : id});
        idMenu.menu_id = id;

        const menuSupp = await Menus.remove(idMenu);

        if (menuSupp) {
            return menuSupp;
        }
        return undefined;

    }
}
