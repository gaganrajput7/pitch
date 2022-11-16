import React, { useEffect, useState } from "react";
import styles from "./directory.module.css";
import axios from "axios";
function AllDirectorys({ elem }: any) {
  return <div className={styles.folderDiv}>{elem.name}</div>;
}

export default AllDirectorys;
