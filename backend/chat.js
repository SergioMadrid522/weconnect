import { Server } from "socket.io";

export function chatServer(server) {
  const io = new Server(server, {
    cors: {
      origin: ["http://192.168.0.2:5173", "http://localhost:5173"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  //const onlineUsers = new Set();
  io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("send-message", (username, msg) => {
      io.emit("receive-message", username, msg); //send the msg to everyone including me
      //socket.broadcast.emit("receive-message", storedName, msg); // send the messsage to all sockets active excepting me
      console.log(username, msg);
    });

    /*  socket.on("online", (username) => {
      onlineUsers.add(username);
      io.emit("online-users", Array.from(onlineUsers));
    }); */
  });
}
