import React, { useEffect, useState } from "react";
import axios from "axios";
function AllTodo() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/todo-item/list")
      .then(({ data }) => setTodos(data))
      .catch((err) => console.log(err));
  }, []);
  return <div>AllTodo</div>;
}

export default AllTodo;
