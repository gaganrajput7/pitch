import axios from "axios";
import React, { useRef } from "react";
import style from "./directory.module.css";
function CreateDirectory() {
  const nameRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(nameRef.current.value);
    const payload = {
      name: nameRef.current.value,
    };
    axios
      .post("http://localhost:5000/directory/create", payload)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className={style.formDiv}>
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
    </div>
  );
}

export default CreateDirectory;
