import { Users } from '../entity/Users';

export class UsersServices {
        async AllUsers(): Promise<Users[] | undefined> {
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
        async addUser(
                name: string,
                password: string
        ): Promise<Users | undefined> {
                const newUser = new Users();
                newUser.username = name;
                newUser.password = password;

                await Users.save(newUser);

                const newOK = await Users.findOneBy({
                        username: name,
                });

                if (newOK) {
                        return newOK;
                }
                return undefined;
        }
}
