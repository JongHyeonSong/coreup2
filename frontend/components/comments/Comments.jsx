import React, { useContext } from 'react'
import { countryContext } from '../All'
import './Comments.css';
import { FaBeer } from 'react-icons/fa';

const Comment = ({ comment }) => {

    // console.log(comment)

    return (
    <>
    <div className="d-flex ">
        <div className="col-6 container" >
            <div className="card ">
                <div className="" >
                    <img className="card-img-top comment-img" src={comment.image || "static/images/coroan.png"} alt="Card image" />
                </div>
                <div className="card-body bg-light">
                    <FaBeer />
                    할말: {comment.comment}<br/>
                    
                    이거 쓴사람: {comment.comment_username}<br/>
                    생성일자: {comment.created_at}<br/>
                    좋아요: {comment.likes_count}<br/>
                    싫어요: {comment.unlikes_count}<br/>

                </div>

            </div>
        </div>

    </div>
        <br/>
    </>
    )
}


const Comments = () => {
    const { country, dispatch, comments } = useContext(countryContext)
    return (
        <>
            <hr />
            { country ? comments.map((comment, i) => <Comment comment={comment} key={i} />)
            : <img src="/static/images/global_img.jpg" alt="global img"/> }
        </>
    )
}
export default Comments;