import "./style.css"

export default function Comment({data, author}) {
    return <div className="comment">
        <div className="title">Comment</div>
        <div className="detail">Author: {author}</div>
        <div className="data">{data}</div>
    </div>
}