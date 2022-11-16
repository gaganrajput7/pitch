import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import styles from "./Todo.module.css";
function AllTodo({ toggle, setToggle }: any) {
  const [todos, setTodos] = useState([]);
  const { id }: any = useParams();

  useEffect(() => {
    console.log("Mounted");
    axios
      .get(`http://localhost:8080/todo-item/list/${id}`)
      .then(({ data }) => setTodos(data))
      .catch((err) => console.log(err));
  }, [toggle]);

  const handleDelete = (id: any) => {
    axios
      .delete(`http://localhost:8080/todo-item/remove/${id}`)
      .then(() => setToggle((pre: any) => !pre));
  };
  return (
    <div>
      <table className={styles.table}>
        <tr>
          <th>Todo</th>
          <th>Status</th>
          <th>Delete</th>
        </tr>

        {todos.map((elem: any) => {
          return (
            <tr>
              <td>{elem.todo}</td>
              <td>{elem.status ? "true" : "false"}</td>
              <td onClick={() => handleDelete(elem._id)}>
                <RiDeleteBin6Line />
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default AllTodo;
