import { Server } from "socket.io";

const io = new Server(3001, {
  cors: {
    origin: ["http://127.0.0.1:5500"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("send-message", (username, msg) => {
    io.emit("receive-message", username, msg); //send the msg to everyone including me
    //socket.broadcast.emit("receive-message", storedName, msg); // send the messsage to all sockets active excepting me
    console.log(username, msg);
  });
});

//chatServer();
