
# Socket Server

Install dependencies
```
npm install
```

### Run project in local (develop mode)

Generate dist/ using typescript compiler:
######-w option: compiler is keeping watching changes
```
tsc -w
```

And in other console run server in develop mode using:
```
nodemon dist/
```

## Endpoints REST
Get messages
```
GET   http://localhost:5000/messages
```

Post a public message
```
POST  http://localhost:5000/messages
```

```
Body
x-www-form-urlencoded

KEY   VALUE
data: message_content
from: client_id
```

Get connected users from socket
```
GET   http://localhost:5000/users
```

Get connected users from memory list
```
GET   http://localhost:5000/user-list
```
