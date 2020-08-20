let express = require('express');
let socket = require('socket.io');
let path = require('path');

let exec = require('child_process').exec;
let fs = require('fs');

let app = express();
let port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

let server = app.listen(port, console.log(`listening on port ${port}`));
let io = socket(server);

io.on('connection', socket => {
   console.log('connected to client');

   socket.on('code', code => {
      let result = "";
      let goPath = "./exec/go/main.go";

      fs.writeFileSync(goPath, code);

      let child = exec(`go run ${goPath}`);

      child.stdout.on('data', data => {
         result += data;

         socket.emit('result', result);
      })

      child.on('close', ()=>{
         console.log('finished executing');
      })
   })
})