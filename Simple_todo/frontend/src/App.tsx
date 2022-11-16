import React, { lazy, Suspense } from "react";
import logo from "./logo.svg";
import "./App.css";

const MainRoutes = lazy(() => import("./components/MainRoutes"));
function App() {
  return (
    <div className="App">
      <Suspense fallback={<h1>Loading........</h1>}>
        <MainRoutes />
      </Suspense>
    </div>
  );
}

export default App;
