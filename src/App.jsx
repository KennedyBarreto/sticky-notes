/* eslint-disable no-unused-vars */
import React from "react";
import NotesPage from "./pages/NotesPage";
import NoteProvider from "./context/NoteContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./utils/AuthContext";
const App = () => {
  return (
    <div id="app">
      <BrowserRouter>
        <AuthProvider>
          <NoteProvider>
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route path="/" element={<NotesPage />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </NoteProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
