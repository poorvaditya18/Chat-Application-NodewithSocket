// frontend

// for socket connection -->

// create socket object
var socket = io();

// let btn = document.getElementById("btn");
// btn.onclick = function exec() {
//     // so moment we click the  button it will emit the "from_client" event .
//   socket.emit("from_client");
// };

// // client is listening to the event: 'from_server'
// socket.on("from_server", () => {
//   console.log("collected a new event from the server");
//   const div = document.createElement("div");
//   div.innerText = "New event from the server";
//   document.body.appendChild(div);
// });

let btn = document.getElementById("btn");
let inputMsg = document.getElementById("newmsg");
let msgList = document.getElementById("msglist");

btn.onclick = function exec() {
  // emmitter -->
  socket.emit("msg_send", {
    msg: inputMsg.value,
  });
};

// listenner -->
socket.on("msg_rcvd", (data) => {
  let limsg = document.createElement("li");
  limsg.innerText = data.msg;
  msgList.appendChild(limsg);
});
