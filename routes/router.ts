
import {Router, Request, Response} from 'express';
import Server from "../main/server";
import {messages, connectedUsers} from "../sockets/sockets";

const router = Router();

// Get messages
router.get('/messages', (req: Request, res: Response) => {
    res.json({
        ok:true,
        messages
    });
});

// Send public message
router.post('/messages', (req: Request, res: Response) => {
    const body = req.body.data;
    const from = req.body.from;

    const payload = {
        from,
        body
    };

    const server = Server.instance;
    server.io.emit('new-message', payload);

    res.json({
        ok: true,
        body,
        from
    });
});

// Get users from Socket
router.get('/users', (req: Request, res: Response) => {
    const server = Server.instance;

    server.io.allSockets()
        .then((clients) => {
            res.json({
                ok:true,
                clients: Array.from(clients)
            });
        })
        .catch((err) => {
            res.json({
                ok:false,
                err
            });
        });
});

// Get users from memory
router.get('/user-list', (req: Request, res: Response) => {
    res.json({
        ok:true,
        users: connectedUsers
    });
});

export default router;
