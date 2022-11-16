import { Schema, model } from "mongoose";

type todo = {
  todo: string;
  status: boolean;
  userId: string;
};

type directory = {
  name: string;
  todos: string[];
};

const todoSchema = new Schema(
  {
    todo: { type: String, require: true },
    status: { type: Boolean, default: false },
    userId: { type: "ObjectId", ref: "directory" },
  },
  { timestamps: true }
);

const directorySchema = new Schema({
  name: { type: String, required: true },
  todos: [{ type: "ObjectId", ref: "simpleTodo" }],
});

const simpleTodo = model<todo>("simpleTodo", todoSchema);
const directory = model<directory>("directory", directorySchema);
export { simpleTodo, directory };
