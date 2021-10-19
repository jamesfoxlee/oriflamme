const path = require('path');
const http = require('http');
const express = require('express');
const siServer = require('socket.io').Server;

const router = require('./routes');

require('dotenv').config();
const port = process.env.PORT || 3000;
const staticPath = path.join(__dirname, './public');

// 1. create Express app instance, configure static assets & routes
const expressApp = express();
expressApp.use((req, res, next) => {
  console.log(`${req.method} received for URL: ${req.url}`);
  next();
});
expressApp.use(express.static(staticPath));
expressApp.use(express.json());
expressApp.use('/', router);

// 2. create Node HTTP server and pass it the Express instance
const httpServer = http.createServer(expressApp);

// 3.create socket.io server, and pass it the HTTP server
const socketIoServer = new siServer(httpServer);

// 4. declare socket listeners
socketIoServer.on('connection', (socket) => {
	// ...do socket things
  console.log(`connection, socket.id: ${socket.id}`)
  socket.on('disconnect', (socket) => {
    console.log(`disconnection, socket.id (should be undefined): ${socket.id}`)
  })
});

// 5. listen to the HTTP server, NOT the Express app
httpServer.listen(port, () => console.log(`HTTP server started on port:${port}`));

