import React, { useContext } from 'react'
import { countryContext, IP_ADDRESS } from '../All'
import './Comments.css';
import { FaBeer, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const Comment = ({ comment }) => {
    const { country, dispatch, userProfile, reGetCountry, nextUrl } = useContext(countryContext)

    let nowDate = new Date()
    let atDate = new Date(comment.created_at)
    let timesince = Math.floor((nowDate.getTime() - atDate.getTime()) / (1000 * 60))
    timesince = timesince > 60 ? `${Math.floor(timesince / 60)} 시간전` : `${timesince} 분전`


    const clickThumbUp = (e) => {
        e.preventDefault()
        // const comment = {id:71}
        console.log('ㅈ좋아요 ㄱㄱ', comment.id)
        const url = `http://${IP_ADDRESS}:8000/thumbUP/${comment.id}/`
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({ "comment": comment.comment }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                reGetCountry(country, dispatch)
            })
            .catch(err => console.log(err))
    }

    const clickThumbDown = (e) => {
        e.preventDefault()
        // const comment = {id:71}
        console.log('ㅈ싫어요 ㄱㄱ', comment.id)
        const url = `http://${IP_ADDRESS}:8000/thumbDown/${comment.id}/`
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({ "comment": comment.comment }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                reGetCountry(country, dispatch)
            })
            .catch(err => console.log(err))
    }

    const clickDeleteBtn =(e)=>{
        e.preventDefault()
        console.log("삭제 ㄱㄱ")
        const url = `http://${IP_ADDRESS}:8000/delete-comment/${comment.id}/`
        fetch(url,{
            method: 'DELETE',
            headers: {
              'Content-type': 'application/json',
              'X-CSRFToken':   getCookie('csrftoken'),
            },
          })
        .then(res=>{
            console.log(res)
            reGetCountry(country, dispatch)
        })
        .catch(err=>console.log(err))
    }

    return (
        <>
            <div className="d-flex ">
                <div className="col-6 container" >
                    <div className="card ">
                        <div className="" >
                            <img className="card-img-top comment-img" src={comment.image || "static/images/coroan.png"} alt="Card image" />
                        </div>
                        <div className="card-body bg-light p-1">
                            <div className="row">
                                <div className="col-7">

                                <FaBeer />작성자:  {comment.comment_username} {timesince} <br />
                                </div>
                                { userProfile.id 
                                ? <div className="col-2 d-flex ">
                                    <FaThumbsUp  onClick={clickThumbUp} /><span>{comment.likes_count}</span>
                                    {" "}
                                    <FaThumbsDown  onClick={clickThumbDown} /><span>{comment.unlikes_count}</span>
                                </div>
                                : <p>not logedin</p>}

                                { userProfile.id == comment.user_profile &&
                                <div className="col-2"><button onClick={clickDeleteBtn}className="btn btn-sm btn-outline-danger">삭제</button></div>
                                }
                            </div>
                    <div className="card card-body">
                    {comment.comment}
                    </div>
                        </div>

                    </div>
                </div>

            </div>
            <br />
        </>
    )
}


const Comments = () => {
    const { country, dispatch, comments , reGetCountry} = useContext(countryContext)


    // const clickNextUrl = (e)=>{
    //     e.preventDefault()
    //     reGetCountry(country, dispatch,nextUrl)
    // }
    return (
        <>
            <hr />
            
            {country ? comments.map((comment, i) => <Comment comment={comment} key={i} />)
                : <img src="/static/images/global_img.jpg" alt="global img" />}
                <div className="text-center">
                {/* { nextUrl 
                ? <button onClick={clickNextUrl} className="btn btn-success">더보기</button>
                : <h2>감사합니다</h2>
                } */}
                </div>
            <br/>
            <br/>
           
        </>
    )
}
export default Comments;