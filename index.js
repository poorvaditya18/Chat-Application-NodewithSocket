const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const connect = require("./config/database-config");
const Chat = require("./models/chat");

const app = express();
const server = http.createServer(app); // express app object passed inside http.createServer() --> so all the middleware , static files are also getting connected to the server object . Thats how it is getting connected with the frontend.
const io = socketio(server);

// setting app engine as ejs -->
app.set("view engine", "ejs");

// This middleware --> actually maps that where are our static assets . For ex-> inside public all the static html files
app.use("/", express.static(__dirname + "/public"));

// room id will be in url params -->
app.get("/chat/:roomid", async (req, res) => {
  const chats = await Chat.find({
    roomId: req.params.roomid,
  }).select("content user");
  console.log(chats);
  // sending data -->
  res.render("index", {
    name: "Sanket",
    id: req.params.roomid,
    chats: chats,
  });
});

io.on("connection", (socket) => {
  // listener ->
  socket.on("join_room", (data) => {
    console.log("joining a room ", data.roomId);
    // join to the particular roomId
    socket.join(data.roomId);
  });

  // now we want to listen the event "from_client"
  // socket.on("from_client", () => {
  //   console.log("Event coming from Client");
  // });

  // setInterval(() => {
  //   // server is sending event "from_server" to the client
  //   socket.emit("from_server");
  // }, 2000);

  // listenner -->
  socket.on("msg_send", async (data) => {
    console.log(data);
    // emmitter -->

    // io.emit("msg_rcvd", data);  // io.emit() --> is for all the clients connected to the web server

    // socket.emit("msg_rcvd", data); // socket.emit() --> is for the same client which send the event will only listen to it .

    // socket.broadcast.emit("msg_rcvd", data); // except the original one(the one who emits) other two clients will receive the event.

    //db
    const chat = await Chat.create({
      roomId: data.roomId,
      user: data.username,
      content: data.msg,
    });

    // this msg will be populated to only those which are connected to the particular mail id
    io.to(data.roomId).emit("msg_rcvd", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.to(data.roomid).emit("someone_typing");
  });
});

// instead of using express app server , now use http module server
// http://localhost:3000/socket.io/socket.io.js --> if you go on to this you will find the socket.io js script
server.listen(3000, async () => {
  console.log("Server started ");
  await connect();
  console.log("Mongo db connected");
});
