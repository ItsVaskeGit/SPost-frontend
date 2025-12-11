import {useParams} from "react-router";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {UserContext} from "../../context/UserContext.jsx";
import Post from "../../components/Post/Post.jsx";
import Comment from "../../components/Comment/Comment.jsx";

export default function Discussion() {

    const {postId} = useParams();

    const [postAndComments, setPostAndComments] = useState({});

    const {user} = useContext(UserContext);

    useEffect(() => {
        async function getPostAndComments() {
            await axios.all([
                axios.get("http://localhost:8000/post/" + postId, { headers: { Authorization: "Bearer " + user} })
                    .then((response) => {
                        setPostAndComments({
                            ['post']: response.data
                        });
                    }),
                axios.get("http://localhost:8000/comments/" + postId, { headers: { Authorization: "Bearers " + user} })
                    .then((response) => {
                        setPostAndComments({
                            ...postAndComments,
                            ['comments']: response.data
                        })
                    })
            ])
        }
        getPostAndComments();
    })

    return <div className="discussion-container">
        <Post own={false} authorName={postAndComments.post.author} postedAt={postAndComments.post.posted_at} data={postAndComments.post.data}/>
        {postAndComments.comments.map((entry) => {
            <Comment data={entry.data} postedAt={entry.posted_at} author={entry.author}></Comment>
        })};
        <div className="action">Post New Comment</div>
    </div>
}