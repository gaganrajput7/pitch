import React, { useState } from "react";
import AllTodo from "../Todo/AllTodo";
import CreateTodo from "../Todo/CreateTodo";

function Directory() {
  const [toggle, setToggle] = useState<any>(false);

  return (
    <div>
      <CreateTodo setToggle={setToggle}/>
      <AllTodo toggle={toggle} setToggle={setToggle}/>
    </div>
  );
}

export default Directory;
