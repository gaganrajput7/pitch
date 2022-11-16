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
directoryRouter.get("/list", async (req, res) => {
  const directoryList = await directory.find();

  if (!directoryList) {
    res.status(404).send("Not available");
  }
  res.status(200).send(directoryList);
});

directoryRouter.delete("/remove/:id", async (req, res) => {
  const { id } = req.params;

  await directory.findOneAndDelete({ _id: id });
  await simpleTodo.deleteMany({ userId: id });
  return res.status(202).send("Deleted Sucess");
});

//all todo list
todoRouter.get("/list/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const todos = await simpleTodo.find({ userId: id });
  res.status(200).send(todos);
});
//create todo
todoRouter.post("/create", async (req: Request, res: Response) => {
  const { id, todo } = req.body;

  if (!todo) return res.status(400).send("Please Add Todo");
  const save_todo = new simpleTodo({
    todo,
    status: false,
    userId: id,
  });

  const check = await save_todo.save();

  await directory.findOneAndUpdate(
    { _id: id },
    { $push: { todos: check._id } }
  );

  res.status(201).send("Todo Added");
});
//remove todo
todoRouter.delete("/remove/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await simpleTodo.findOneAndDelete({ _id: id });
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
