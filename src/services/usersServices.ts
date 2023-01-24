import { QueryResult } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Users } from '../entity/Users';

const dbManager = AppDataSource.manager;
export class UsersServices {
        async AllUsers() {
                const users: Users[] | undefined = await Users.find();

                if (users[0]) {
                        return users;
                }
                return undefined;
        }
        async getDataUserbyName(name: string): Promise<Users | undefined> {
                const data = await Users.findBy({ username: name });

                if (data[0]) {
                        return data[0];
                }
                return undefined;
        }
        async addUser(name: string, password: string) {
                const newUser = new Users();
                newUser.username = name;
                newUser.password = password;

                await dbManager.save(newUser);

                const newOK = await Users.findOneBy({
                        username: name,
                });

                if (newOK) {
                        return newOK;
                }
                return undefined;
        }
}
