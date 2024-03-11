
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Welcome from "./components/Welcome";
import Login from "./features/auth/Login";
import Header from "./components/Navbar";
import DashLayout from "./components/DashLayout";
import UserWelcome from "./features/auth/UserWelcome";
import NotesList from "./features/notes/NotesList";
import UsersList from "./features/users/UsersList";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import NewUserForm from "./features/users/NewUserForm";
import { ROLES } from "./config/roles";
import ViewNote from "./features/notes/ViewNote";
import NewNote from "./features/notes/NewNote";
import RequiredPermission from "./features/auth/RequiredPermission";
function App() {



  return (
    <>
 
      <Header />
      <Routes>
        <Route>
          <Route path="/" element={<Layout />} />
          <Route index element={<Welcome />} />
          <Route path="/login" element={<Login />} />

          <Route  element = {<ProtectedRoute/>}>

            <Route path="/dash" element={<DashLayout />}>
              <Route index element={<UserWelcome />} />
              <Route path="notes">
                <Route index element={<NotesList />} />

                <Route path=":noteId" element={<ViewNote />} />
                <Route path="new" element={<NewNote/>} />

               
              </Route>
              <Route path="users">
                <Route index element={<UsersList />} />

                <Route element = {<RequiredPermission allowedRoles={[ROLES.Admin, ROLES.Manager]}/>}>
                <Route path="new" element={<NewUserForm />} />
</Route>
              </Route>
            </Route>

          </Route>



          </Route>
      
      </Routes>
      
<ToastContainer/>
    </>
  );
}

export default App;
