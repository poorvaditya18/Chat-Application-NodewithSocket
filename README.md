## CHAT APP Using Nodejs

### Important Points about SOCKETS :

- Socket is the full duplex connection : From Client can send the data to server and without client intervention we can send data from server to client.

- Every socket connection have `unique socket id`.

- We are getting the `io` object in the frontend because of the `<script src="/socket.io/socket.io.js></script>`. We need to include this library in the frontend.

- To check you can console `io` in the browser .

- script.js : to setup the connection pipeline (socket connection ) between two services .

- How to get the socket object ? `var socket = io()`; this is required to establish connection .

- In the backend : we will listen to the emmitting event
- `io.on("connection", (socket) => { console.log("a user connected ", socket.id);});`

- Therefore we have setup the socket in the frontend as well . It is emmiting the `connection` which is getting tackled in the express server through `io.on('connection',(socket)=>{})`.

- `NOTE:`So here we are just rendering he the static file content. If suppose you want to connect your react app with the express server then for that you need to setup the corresponding socket connection . Its not like that you will trigger the similar situation everytime .

