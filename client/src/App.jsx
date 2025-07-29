import React from "react";
import Home from "./pages/HomePage";
import { Routes, Route } from "react-router";
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App;
