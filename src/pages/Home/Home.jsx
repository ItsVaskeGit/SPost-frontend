import Post from "../../components/Post/Post.jsx";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {UserContext} from "../../context/UserContext.jsx";
import "./style.css";
import {useNavigate} from "react-router";

export default function Home() {

    const navigate = useNavigate();

    const {user} = useContext(UserContext)

    const [posts, setPosts] = useState([]);

    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadPosts() {
            axios.get("http://localhost:8000/", {headers : { Authorization: "Bearer " + user}})
                .then((response) => {
                    setPosts(response.data.posts);
                }).catch((error) => {
                    setError(error.toString());
            })
        }
        loadPosts();
    }, []);

    function handleNewPost() {
        navigate("/new-post")
    }


    return <div className="posts-container">
        {posts.map((post) => (
            <Post data={post.data} authorName={post.author} postedAt={post.posted_at} own={false}/>
        ))}

        <div onClick={handleNewPost} className="action">New Post</div>

        {error ? <div className="error-box">{error}</div> : <></>}
    </div>
}