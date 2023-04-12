const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app); // express app object passed inside http.createServer() --> so all the middleware , static files are also getting connected to the server object . Thats how it is getting connected with the frontend.
const io = socketio(server);

// This middleware --> actually maps that where are our static assets . For ex-> inside public all the static html files
app.use("/", express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  console.log("a user connected ", socket.id);

  // now we want to listen the event "from_client"
  // socket.on("from_client", () => {
  //   console.log("Event coming from Client");
  // });

  // setInterval(() => {
  //   // server is sending event "from_server" to the client
  //   socket.emit("from_server");
  // }, 2000);

  // listenner -->
  socket.on("msg_send", (data) => {
    console.log(data);
    // emmitter -->

    // io.emit("msg_rcvd", data);  // io.emit() --> is for all the clients connected to the web server

    // socket.emit("msg_rcvd", data); // socket.emit() --> is for the same client which send the event will only listen to it .

    socket.broadcast.emit("msg_rcvd", data); // except the original one(the one who emits) other two clients will receive the event. 
  });
});

// instead of using express app server , now use http module server
// http://localhost:3000/socket.io/socket.io.js --> if you go on to this you will find the socket.io js script
server.listen(3000, () => {
  console.log("Server started ");
});
