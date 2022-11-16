import React from "react";
import CreateDirectory from "./Directory/CreateDirectory";
import { Routes, Route } from "react-router-dom";
import Directory from "./Directory/Directory";
function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CreateDirectory />} />
      <Route path="/directory/:id" element={<Directory />} />
    </Routes>
  );
}

export default MainRoutes;
