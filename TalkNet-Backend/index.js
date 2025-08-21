import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import UserRouter from "./routes/UserRoute.js";
import MessageRoute from "./routes/MessageRoute.js";
import ContactRoute from "./routes/ContactRoute.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

dotenv.config();
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    method: ["POST", "PUT", "GET", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/user", UserRouter);
app.use("/message", MessageRoute);
app.use("/friend", ContactRoute);

io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);

  socket.on("join", (userId) => {
    socket.join(userId);
    console.log("user joioned room", userId);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected: ", socket.id);
  });
  socket.on("typing", ({ senderId, receiverId }) => {
    io.to(receiverId).emit("typing", { senderId });
  });
  socket.on("stopTyping", ({ senderId, receiverId }) => {
    io.to(receiverId).emit("stopTyping", { senderId });
  });
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Connections to DB Successful.");
  app.listen(process.env.PORT, () => {
    console.log("Server Started at Port : ", process.env.PORT);
  });
});
