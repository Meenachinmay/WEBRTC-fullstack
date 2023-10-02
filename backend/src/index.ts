import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import { v4 as uuidv4 } from "uuid";

const port = 8080;
const app = express();

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "UPDATE", "PATCH", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log(`A new websocket connection is connected. On a ID ${socket.id}`);

  // receiving event for new room join request
  // before creating a new room just get an id for a room and then send back that to client
  socket.on("create-room", () => {
    const roomID = uuidv4();
    socket.join(roomID);
    socket.emit("room-created", { roomID });
    console.log(
      `User created the room with the connction id ${socket.id}. RoomID: ${roomID} sent back to user.`
    );
  });
  socket.on("disconnect", () => {
    console.log(`connection is disconnect with ID ${socket.id}`);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
