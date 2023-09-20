const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

require("dotenv").config();
const port = process.env.PORT

app.use(express.json(),express.urlencoded({ extended: true }),
    cors({ origin: "http://localhost:3000", credentials: true }), cookieParser());


require("./config/mongoose.config")

require("./routes/doners.routes")(app)
require("./routes/volunteers.routes")(app)
require("./routes/adresses.routes")(app)
require("./routes/givenFood.routes")(app)


const server = app.listen(port, ()=>console.log(`Server up on ${port}`))

const io = require('socket.io')(server, { cors: true });

// Event to listen for new connections
io.on('connection', (socket) => {
    console.log('New client connected');
  
    // Event to listen for newGivenFood data from the client
    socket.on('newGivenFood', (newGivenFood) => {
      console.log('New given food received:', newGivenFood);
  
      // Broadcast the newGivenFood data to all connected clients (excluding the sender)
      socket.broadcast.emit('newGivenFood', newGivenFood);
    });
  
    // Clean up the socket connection on client disconnect
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });