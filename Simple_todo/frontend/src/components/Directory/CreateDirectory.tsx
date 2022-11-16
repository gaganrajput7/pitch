import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import AllDirectorys from "./AllDirectorys";
import styles from "./directory.module.css";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
function CreateDirectory() {
  const [toggle, setToggle] = useState(true);
  const [directory, setDirectory] = useState<any>();
  const nameRef: any = useRef();
  console.log(nameRef);
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const payload = {
      name: nameRef.current.value,
    };
    axios
      .post("http://localhost:8080/directory/create", payload)
      .then((res) => getData())
      .catch((err) => console.log(err));
    nameRef.current.value = "";
    setToggle((pre) => !pre);
  };

  const getData = async () => {
    await axios
      .get("http://localhost:8080/directory/list")
      .then(({ data }) => setDirectory([...data]));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (id: any) => {
    console.log(id);
    axios
      .delete(`http://localhost:8080/directory/remove/${id}`)
      .then(() => getData())
      .catch();
  };
  return (
    <div className={styles.formDiv}>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          id="name"
          required
          ref={nameRef}
          placeholder="Create Directory"
        />
        <input type="submit" value="create" name="" id="" />
      </form>
      <br />
      <h1>Directorys</h1>
      <br />
      {directory &&
        directory.map((elem: any) => (
          <div className={styles.container} key={elem._id}>
            <Link to={`/directory/${elem._id}`}>
              <AllDirectorys elem={elem} />
            </Link>
            <p onClick={() => handleDelete(elem._id)}>
              <AiOutlineDelete />
            </p>
          </div>
        ))}
    </div>
  );
}

export default CreateDirectory;
