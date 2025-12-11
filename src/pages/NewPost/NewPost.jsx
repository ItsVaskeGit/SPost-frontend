import "./style.css";
import {useContext, useState} from "react";
import axios from "axios";
import {UserContext} from "../../context/UserContext.jsx";
import {useNavigate} from "react-router";

export default function NewPost() {

    const {user} = useContext(UserContext);

    const [post, setPost] = useState("");

    const navigate = useNavigate();

    async function handleOnSubmit(event) {
        event.preventDefault();
        await axios.post("http://localhost:8000/new", { data: post }, { headers: { Authorization: "Bearer " + user} })
            .then(() => { navigate("/"); })
    }

    function handleOnChange(event) {
        setPost(event.target.value);
    }

    return <div className="new-post-container">
        <form onSubmit={handleOnSubmit}>

            <textarea name="post" placeholder="New post goes here..." onChange={handleOnChange}></textarea>

            <button type="submit">Submit</button>
        </form>
    </div>
}