
import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import {UserList} from "../models/user-list";
import {User} from "../models/user";

export const connectedUsers = new UserList();
export let messages = {};

// export const connectUser = (client: Socket, io: socketIO.Server) => {
//     const user = new User(client.id);
//     connectedUsers.addUser(user);
// };

export const connected = (client: Socket, io: socketIO.Server) => {
    client.on('connect', () => {
        console.log('User connected |X|');
        connectedUsers.addUser(new User(client.id));

        io.emit('active-users', connectedUsers.getList());
    });
}

export const disconnected = (client: Socket, io: socketIO.Server) => {
    client.on('disconnect', () => {
        console.log('User disconnected |X|');
        connectedUsers.deleteUser(client.id);

        io.emit('active-users', connectedUsers.getList());
    });
}

export const message = (client: Socket, socketIO: socketIO.Server) => {
    client.on('message', (payload: {de: string, body: string}) => {
        console.log('Received message  |>| ', payload.body);
        socketIO.emit('new-message', payload);
    });
}

export const getUsers = (client: Socket, io: socketIO.Server) => {
    client.on('get-users', () => {
        io.to(client.id).emit('active-users', connectedUsers.getList());
    });
};
