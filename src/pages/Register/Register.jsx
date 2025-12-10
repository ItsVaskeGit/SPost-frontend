import {useState} from "react";
import axios from "axios";
import "./style.css"
import {useNavigate} from "react-router";

export default function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [confirm, setConfirm] = useState('');

    const [error, setError] = useState(null);

    async function handleOnSubmit(event) {
        event.preventDefault();
        if(formData.password === confirm) {
            await axios.post("http://localhost:8000/register", {
                username: formData.username,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password
            }).then(() => {
                navigate("/")
            }).catch((error) => {
                setError(error.data.message)
            })
        }else {
            setError('Passwords do not match.')
        }
    }

    function handleConfirm(event) {
        setConfirm(event.target.value)
    }

    function handleChange(event) {
        setFormData({...formData, [event.target.name]: event.target.value});
    }

    return <div className="register-form">

        <form onSubmit={handleOnSubmit}>

            <label htmlFor="username">Username: </label>

            <input type="text" name="username" onChange={handleChange}/>

            <label htmlFor="firstName">First name: </label>

            <input type="text" name="firstName" onChange={handleChange}/>

            <label htmlFor="lastName">Last name: </label>

            <input type="text" name="lastName" onChange={handleChange}/>

            <label htmlFor="email">Email: </label>

            <input type="text" name="email" onChange={handleChange}/>

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