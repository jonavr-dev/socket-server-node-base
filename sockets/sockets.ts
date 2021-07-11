
import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import {UserList} from "../models/user-list";
import {User} from "../models/user";

export const connectedUsers = new UserList();
export let messages = {};

export const connectUser = (client: Socket) => {
    const user = new User(client.id);
    console.log('User connected:    ', client.id);
    connectedUsers.addUser(user);
};

export const disconnected = (client: Socket, io: socketIO.Server) => {
    client.on('disconnect', () => {
        console.log('User disconnected: ', client.id);
        connectedUsers.deleteUser(client.id);

        io.emit('active-users', connectedUsers.getList());
    });
}

export const message = (client: Socket, io: socketIO.Server) => {
    client.on('message', (payload: {from: string, body: string}) => {
        console.log('Received message  >| ', payload.body);

        io.emit('new-message', payload);
    });
}

export const getUsers = (client: Socket, io: socketIO.Server) => {
    client.on('get-users', () => {
        io.to(client.id).emit('active-users', connectedUsers.getList());
    });
};
