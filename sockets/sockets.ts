
import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import {UserList} from "../models/user-list";
import {User} from "../models/user";

export const connectedUsers = new UserList();
export let messages = {};
let numberUser = 0;

export const connectUser = (client: Socket, io: socketIO.Server) => {
    numberUser++;
    const user = new User(client.id, 'user-' + numberUser);
    console.log('User connected:    ' + user.name + ' -> ' + client.id);
    connectedUsers.addUser(user);

    io.emit('active-users', connectedUsers.getList());
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
