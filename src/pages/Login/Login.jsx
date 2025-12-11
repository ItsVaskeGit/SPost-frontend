import {useNavigate} from "react-router";
import {useContext, useState} from "react";
import {UserContext} from "../../context/UserContext.jsx";
import axios from "axios";

export default function Login() {

    const navigate = useNavigate();

    const {setUser} = useContext(UserContext);

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [error, setError] = useState(null);

    async function handleOnSubmit(event) {
        event.preventDefault();
        await axios.post("http://localhost:8000/login", {
            username: formData.username,
            password: formData.password
        }).then((response) => {
            setUser(response.data.token);
            navigate("/")
        }).catch((error) => {
            setError(error.data.message)
        })
    }

    function handleChange(event) {
        setFormData({...formData, [event.target.name]: event.target.value});
    }

    return <div className="login-form">

        <form onSubmit={handleOnSubmit}>

            <label htmlFor="username">Username: </label>

            <input type="text" name="username" onChange={handleChange}/>

            <label htmlFor="password">Password: </label>

            <input type="password" name="password" onChange={handleChange}/>

            <button type="submit">Submit</button>

        </form>

        {error ? <div className="error">
            <h3 className="error-label">{error}</h3>
        </div> : <></>}

    </div>
}