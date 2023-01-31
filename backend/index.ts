import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import UsersRouter from "./routes/userRouter";
import RacketsRouter from "./routes/racketRouter";
import ChatRouter from "./routes/chatRouter";
import RacketRatingsRouter from "./routes/racketRatingRouter";
import UserRatingsRouter from "./routes/userRatingRouter";
import AdvertsRouter from "./routes/advertRouter";
import connectDB from "./config/db";
import authenticateToken from "./middlewares/authenticate";

const fileUpload = require("express-fileupload");
const path = require("path");
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

connectDB();

app.use(fileUpload());
app.use(cors());
app.use(express.json());

app.use("/api/users", UsersRouter);
app.use("/api/rackets", RacketsRouter);
app.use("/api/racketratings", RacketRatingsRouter);
app.use("/api/userratings", UserRatingsRouter);
app.use("/api/adverts", AdvertsRouter);
app.use("/api/chat", ChatRouter);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", authenticateToken, (req: Request, res: Response) => {
  res.send("Node + TypeScript + Express + MongoDB server is running");
});

const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origins: ["http://localhost:4200"],
  },
});

io.on("connection", (socket: any) => {
  socket.on("join", function (data: any) {
    socket.join(data.room);
    console.log(data.user + "joined the room : " + data.room);

    socket.to(data.room).emit("new user joined", {
      user: data.user,
      message: "has joined this room",
    });
  });

  socket.on("leave", function (data: any) {
    socket.leave(data.room);
    console.log(data.user + "joined the room : " + data.room);
    socket.to(data.room).emit("user left", socket.id);
  });

  socket.on("message", function (data: any) {
    io.in(data.room).emit("new message", {
      user: data.user,
      message: data.message,
    });
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});

app.listen(port, () => {
  console.log(`⚡️ [server]: Server is running at https://localhost:${port}`);
});
