import './App.css'
import {BrowserRouter, Route, Routes} from "react-router";
import NavBar from "./components/Navbar/Navbar.jsx";
import Home from "./pages/Home/Home.jsx";
import EditUser from "./pages/EditUser/EditUser.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";

function App() {

  return (
    <BrowserRouter>
        <h1 className="heading">Welcome to SPost</h1>
        <NavBar className="navbar"/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/profile" element={<EditUser/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
