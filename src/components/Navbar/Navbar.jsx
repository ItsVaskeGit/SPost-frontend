import { Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import "./style.css";

export default function NavBar() {

    const user = useContext(UserContext);

    return <div className="navbar-container">
        <nav>
            <Link className="link" to="/">Home</Link>
            <Link className="link" to="/profile">Profile</Link>
            { user ? <Link className="link" to="/login">Log in</Link> : <Link className="link" to="/register">Register</Link> }
        </nav>
    </div>
}