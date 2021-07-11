import {User} from "./user";

export class UserList {
    private list: User[] = [];

    constructor() {
    }

    public addUser(user: User): User {
        this.list.push(user);
        return user;
    }

    public deleteUser(id: string) {
        const tempUser = this.getUser(id);
        this.list = this.list.filter(user => user.id !== id);

        return tempUser;
    }

    public getUser(id: string) {
        return this.list.find(user => user.id === id);
    }

    public getList() {
        return this.list;
    }
}
