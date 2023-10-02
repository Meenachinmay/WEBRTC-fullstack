import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const port = 8080;
const app = express()

app.use(cors())

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "UPDATE", "PATCH", "DELETE"]
    }
});

io.on("connection", (socket) => {
    console.log(`A new websocket connection is connected. On a ID ${socket.id}`)

    socket.on("disconnect", () => {
        console.log(`connection is disconnect with ID ${socket.id}`)
    })
})

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
