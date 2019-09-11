// inbuilt modules;
let path = require('path');
let http = require('http');

// installed modules;
let express = require('express');
let cors = require('cors')
let bodyParser = require('body-parser');
let socketIO = require('socket.io');

// configuration;
require('module-alias/register');
require('dotenv').config();
let { PORT, BASE_URL, PUBLIC_HTML } = require('@configs/server');

// custom modules;
let { registerRoutes } = require('@utils/registerRoutes');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
app.io = io;

console.log('Express app is create;');

io.on('connection',(socket)=> {
    console.log('io connection');
    socket.on('disconnect',()=> {
        console.log('io disconnect');
    });
});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

server.listen(PORT, ()=> {
  console.log(`Server is up and running on port ${PORT};`);
});

// routes registered;
registerRoutes({ app, BASE_URL });

app.use(express.static(path.join(__dirname, `../${PUBLIC_HTML}`)));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, `../${PUBLIC_HTML}`, 'index.html'));
});