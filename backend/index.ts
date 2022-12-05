import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import UsersRouter from "./routes/userRouter";
import RacketsRouter from "./routes/racketRouter";
import connectDB from "./config/db";
import authenticateToken from "./middlewares/authenticate";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/users", UsersRouter);
app.use("/api/rackets", RacketsRouter);

app.get("/", authenticateToken, (req: Request, res: Response) => {
  res.send("Node + TypeScript + Express + MongoDB server is running");
});

app.listen(port, () => {
  console.log(`⚡️ [server]: Server is running at https://localhost:${port}`);
});
