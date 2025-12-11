import "./style.css";
import axios from "axios";
import {useContext} from "react";
import {UserContext} from "../../context/UserContext.jsx";
import {useNavigate} from "react-router";

export default function Post({id, data, authorName, postedAt, own}) {

    const {user} = useContext(UserContext)

    const navigate = useNavigate();

    async function handleDelete() {
       await axios.delete("http://localhost:8000/post/delete/" + id, {headers: {Authorization: "Bearer " + user}})
            .then(() => { navigate("/profile") });
    }

    function handlePostClick() {
        navigate("/discussion/" + id);
    }

    return <div onClick={handlePostClick} className="post-container">
        <div className="title">Post</div>
        <div className="metadata">
            <div className="author">Author: {authorName}</div>
            <div className="posted-at">Posted:  {postedAt}</div>
        </div>
        <div className="data">{data}</div>
        {own ? <div className="actions">
            <div onClick={handleDelete} className="action">Delete</div>
            </div> : <></>}
    </div>
}