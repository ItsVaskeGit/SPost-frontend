import {useNavigate, useParams} from "react-router";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {UserContext} from "../../context/UserContext.jsx";
import Post from "../../components/Post/Post.jsx";
import Comment from "../../components/Comment/Comment.jsx";

export default function Discussion() {

    const navigate = useNavigate();

    const {postId} = useParams();

    const [post, setPost] = useState([]);

    const {user} = useContext(UserContext);

    function handlePostNewComment() {
        navigate('/new-comment/' + postId);
    }

    useEffect(() => {
        async function getPost() {
            await axios.get("http://localhost:8000/comments/" + postId, { headers: { Authorization: "Bearer " + user} })
                .then((response) => {
                    setPost(response.data)
                    console.log(response.data)
                }).catch((error) => {
                    console.log(error)
                });
        }
        getPost();
    }, [])

    if(post.comments) {
        return <div className="discussion-container">
            <Post authorName={post.post.author} postedAt={post.post.posted_at} data={post.post.data} own={false}/>
            {post.comments.map((entry) =>
                <Comment data={entry.data} postedAt={entry.posted_at} author={entry.author}/>)}
            <div onClick={handlePostNewComment} className="action">Post New Comment</div>
        </div>
    }else {
        return <></>
    }
}