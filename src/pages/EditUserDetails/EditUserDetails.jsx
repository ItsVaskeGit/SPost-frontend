import {useContext, useEffect, useState} from "react";
import "./style.css";
import axios from "axios";
import {UserContext} from "../../context/UserContext.jsx";
import {useNavigate} from "react-router";

export default function EditUserDetails() {

    const navigate = useNavigate();

    const {user} = useContext(UserContext);

    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [confirm, setConfirm] = useState("");

    const [error, setError] = useState(null);

    async function handleOnSubmit(event) {
        event.preventDefault();
        if(confirm === formData.password) {
            await axios.put("http://localhost:8000/user/update", {
                username: formData.username,
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                password: formData.password
            }, { headers: { Authorization: "Bearer " + user } })
                .then(() => { navigate("/profile") }).catch((error) => { setError(error.toString()) })
        }else {
            setError("Passwords do not match.")
        }
    }

    function handleChange(event) {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    function handleConfirm(event) {
        setConfirm(event.target.value);
    }

    useEffect(() => {
        async function autoFillForm() {
            await axios.get("http://localhost:8000/user/update", { headers: { Authorization: "Bearer " + user } })
                .then((response) => {
                    setFormData({
                        username: response.data.user.username,
                        firstName: response.data.user.first_name,
                        lastName: response.data.user.last_name,
                        email: response.data.user.email
                    })
                })
        }
        autoFillForm();
    },  [])

    return <div className="edit-user-container">
        <form onSubmit={handleOnSubmit}>

            <label htmlFor="username">Username: </label>

            <input type="text" name="username" value={formData.username} onChange={handleChange}/>

            <label htmlFor="firstName">First name: </label>

            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}/>

            <label htmlFor="lastName">Last name: </label>

            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}/>

            <label htmlFor="email">Email: </label>

            <input type="text" name="email" value={formData.email} onChange={handleChange}/>

            <label htmlFor="password">Password: </label>

            <input type="password" name="password" onChange={handleChange}/>

            <label htmlFor="confirm">Confirm password: </label>

            <input type="password" name="confirm" onChange={handleConfirm}/>

            <button type="submit">Submit</button>

        </form>

        {error ? <div className="error">
            <h3 className="error-label">{error}</h3>
        </div>: <></>}
    </div>
}