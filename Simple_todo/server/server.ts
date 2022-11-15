import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, { Response, Request } from "express";
import { connection } from "./database/DataBase";
import { todoRouter, directoryRouter } from "./routes/Todo.routes";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8080;
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Running With Typescript",
  });
});
app.use("/directory", directoryRouter);
app.use("/todo-item", todoRouter);
app.listen(PORT, async () => {
  await connection;
  console.log(`Server running on ${PORT}.`);
});
