// inbuilt modules;
let path = require('path');
let http = require('http');

// installed modules;
let express = require('express');
let cors = require('cors')
let bodyParser = require('body-parser');
let socketIO = require('socket.io');

// configuration;
require('module-alias/register'); // initializing setting alias;
require('dotenv').config(); // initializing env vars;
let { PORT, BASE_URL, PUBLIC_HTML } = require('@configs/server.js');

// custom modules;
let registerRoutes = require('@utils/registerRoutes/index.js');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
app.io = io;

io.on('connection',socket=> { // on ws connection establish;
    socket.on('disconnect',()=> { // on disconnect ws connection;
    });
});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

server.listen(PORT, ()=> {
  console.log(`Server is up and running on port ${PORT};`);
});

registerRoutes({ app, BASE_URL }); // registering routes;

// setting up public dir;
app.use(express.static(path.join(__dirname, `../${PUBLIC_HTML}`)));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, `../${PUBLIC_HTML}`, 'index.html'));
});