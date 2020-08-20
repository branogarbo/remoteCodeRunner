let express = require('express');
let socket = require('socket.io');
let path = require('path');
let { exec } = require('child_process');

let app = express();
let port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

let server = app.listen(port, console.log(`listening on port ${port}`));
let io = socket(server);

io.on('connection', socket => {
   console.log('connected to client');

   socket.on('command', command => {
      exec(command, (error, stdout, stderr) => {
         // weird error behavior

         socket.emit('data', stdout);
      });
   });
});