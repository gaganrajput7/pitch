import axios from "axios";
import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import style from "./Todo.module.css";
function CreateTodo({ setToggle }: any) {
  const todoRef = useRef<any>();
  const { id } = useParams();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const payload = {
      id,
      todo: todoRef.current.value,
    };
    axios
      .post("http://localhost:8080/todo-item/create", payload)
      .then((res) => setToggle((pre: any) => !pre))
      .catch((err) => console.log(err));
    todoRef.current.value = "";
  };
  return (
    <div className={style.container}>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          ref={todoRef}
          placeholder="Add Todo"
          id="todo"
          required
        />
        <input type="submit" name="" value="Add Todo" id={style.todoBtn} />
      </form>
    </div>
  );
}

export default CreateTodo;
