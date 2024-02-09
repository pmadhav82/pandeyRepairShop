import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Welcome from "./components/Welcome";
import Login from "./features/auth/Login";
import Header from "./components/Navbar";
import DashLayout from "./components/DashLayout";
import UserWelcome from "./features/auth/UserWelcome";
import NotesList from "./features/notes/NotesList";
import UsersList from "./features/users/UsersList";
import EditUser from "./features/users/EditUser";
import EditNote from "./features/notes/EditNote";
import NewUserForm from "./features/users/NewUserForm";
import NewNoteForm from "./features/notes/NewNoteForm";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route>
          <Route path="/" element={<Layout />} />
          <Route index element={<Welcome />} />
          <Route path="/login" element={<Login />} />

          <Route path="/dash" element={<DashLayout />}>
            <Route index element={<UserWelcome />} />
            <Route path="notes">
              <Route index element={<NotesList />} />
              <Route path=":noteId" element={<EditNote />} />{" "}
              <Route path="new" element={<NewNoteForm />} />
            </Route>
            <Route path="users">
              <Route index element={<UsersList />} />
              <Route path=":userId" element={<EditUser />} />{" "}
              <Route path="new" element={<NewUserForm />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
