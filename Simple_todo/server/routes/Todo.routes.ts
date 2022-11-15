import { Router, Request, Response } from "express";
import { simpleTodo, directory } from "../model/TodoModel";
const todoRouter = Router();
const directoryRouter = Router();

//directory create
directoryRouter.post("/create", async (req, res) => {
  const { name } = req.body;
  const unique = await directory.find({ name: name });
  if (!name) return res.status(400).send("Plese Enter Name");
  if (unique.length > 0) return res.status(400).send("Directory Alredy Exists");
  const createDirectory = new directory({
    name: name,
  });
  await createDirectory.save();
  return res.status(201).send(createDirectory);
});

//all directory
directoryRouter.get("/list", (req, res) => {
  const directoryList = directory.find({});
  if (!directoryList) {
    res.status(404).send("Not available");
  }
  res.status(200).send(directoryList);
});

//all todo list
todoRouter.get("/list", async (req: Request, res: Response) => {
  const allTodo = simpleTodo.find({});
  if (!allTodo) {
    res.status(404).send({ message: "Not Found" });
  }
  res.status(200).send(allTodo);
});
//create todo
todoRouter.post("/create", async (req: Request, res: Response) => {
  const { todo } = req.body;
  if (!todo) return res.status(400).send("Please Add Todo");
  const save_todo = new simpleTodo({
    todo,
    status: false,
  });
  await save_todo.save();
  res.status(201).send(simpleTodo);
});
//remove todo
todoRouter.delete("/remove", async (req: Request, res: Response) => {
  const { id } = req.params;
  await simpleTodo.findOneAndDelete({ id: id });
  res.send({ message: "Deleted" });
});

//completed todos
todoRouter.get("/mark-as-done", async (req: Request, res: Response) => {
  const completed = await simpleTodo.find({ status: true });
  res.send(completed);
});

//pending todos
todoRouter.get("/mark-as-not-done", async (req: Request, res: Response) => {
  const completed = await simpleTodo.find({ status: false });
  res.send(completed);
});

export { todoRouter, directoryRouter };
