/* eslint-disable no-unused-vars */
import React from "react";
import NotesPage from "./pages/NotesPage";
import NoteProvider from "./context/NoteContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div id="app">
      <BrowserRouter>
        <NoteProvider>
          <Routes>
            <Route path="/" element={<NotesPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </NoteProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
