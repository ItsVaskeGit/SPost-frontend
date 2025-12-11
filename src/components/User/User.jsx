import "./style.css"

export default function User({username, firstName, lastName, email, pictureUrl}) {

    const url = pictureUrl;

    return <div className="user-container">
        <div className="image"><img width="200px" height="200px" src={url} alt="User image."/></div>
        <div className="details">
            <div className="detail">Username: {username}</div>
            <div className="detail">First name: {firstName}</div>
            <div className="detail">Last name: {lastName}</div>
            <div className="detail">Email: {email}</div>
        </div>
    </div>
}