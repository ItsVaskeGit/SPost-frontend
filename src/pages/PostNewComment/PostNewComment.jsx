import {useContext, useState} from "react";
import "./style.css";
import {UserContext} from "../../context/UserContext.jsx";
import {useNavigate, useParams} from "react-router";
import axios from "axios";

export default function PostNewComment() {

    const {postId} = useParams();

    const {user} = useContext(UserContext);

    const navigate = useNavigate();

    const [comment, setComment] = useState("");

    function handleOnSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost:8000/comment/new", {
            data: comment,
            post_id: postId
        }, { headers: { Authorization: "Bearer " + user } })
            .catch(() => {
                navigate('/')
            })
    }

    async function handleOnChange(event) {
        setComment(event.target.value)
    }

    return <div className="new-comment-container">
        <form onSubmit={handleOnSubmit}>

            <textarea name="post" placeholder="New comment goes here..." onChange={handleOnChange}></textarea>

            <button type="submit">Submit</button>
        </form>
    </div>
}