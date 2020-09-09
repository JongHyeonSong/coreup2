import React, { useContext } from 'react'
import { countryContext } from '../All'
import './Comments.css';
import { FaBeer } from 'react-icons/fa';

const Comment = ({ comment }) => {
    return (
    <>
    <div className="d-flex ">
        <div className="col-4 container" >
            <div className="card ">
                <div className="comment-img" >
                    <img className="card-img-top" src={comment.image || "static/images/coroan.png"} alt="Card image" />
                </div>
                <div className="card-body bg-light">
                    {comment.comment}
                    <FaBeer />
                    {/* {comment.image || 'no url'} */}
                </div>

            </div>
        </div>

    </div>

    </>
    )
}


const Comments = () => {
    const { country, dispatch, comments } = useContext(countryContext)
    return (
        <>
            <hr />
            {comments.map((comment, i) => <Comment comment={comment} key={i} />)}
        </>
    )
}
export default Comments;