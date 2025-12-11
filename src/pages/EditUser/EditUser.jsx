import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {UserContext} from "../../context/UserContext.jsx";
import User from "../../components/User/User.jsx";
import Post from "../../components/Post/Post.jsx";
import "./style.css";
import {useNavigate} from "react-router";

export default function EditUser() {

    const {user} = useContext(UserContext);

    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        picture: ''
    });

    const [posts, setPosts] = useState([]);

    const [error, setError] = useState(null);

    useEffect(() => {
        async function getProfileData() {
            axios.get("http://localhost:8000/user/update", {headers: {Authorization: "Bearer " + user}})
                .then((response) => {
                    setProfile({
                        ['username']: response.data.user.username,
                        ['firstName']: response.data.user.first_name,
                        ['lastName']: response.data.user.last_name,
                        ['email']: response.data.user.email,
                        ['picture']: response.data.picture.url
                    });
                }).catch((error) => {
                    setError(error.toString());
            })
        }
        getProfileData();
    }, []);


    useEffect(() => {
        async function getProfilePosts() {
            axios.get("http://localhost:8000/profile", {headers: {Authorization: "Bearer " + user}})
                .then((response) => {
                    setPosts(response.data.posts)
                }).catch((error) => {
                    setError(error.toString());
            })
        }
        getProfilePosts();
    }, []);

    function handleEditUserDetails() {
        navigate("/user-edit");
    }

    return <div className="profile-area">
        <User firstName={profile.firstName} username={profile.username} lastName={profile.lastName} email={profile.email} pictureUrl={profile.picture}></User>
        <div onClick={handleEditUserDetails} className="edit-button">Edit</div>
        {posts.map((post) =>
            <Post id={post.id} postedAt={post.posted_at} authorName={post.author} data={post.data} own={true}/>
        )}

        {error ? <div className="error-box">{error}</div> : <></>}
    </div>
}