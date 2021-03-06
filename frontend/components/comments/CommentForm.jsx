import React, { useState, useContext, useRef } from 'react'
import { countryContext, ADD_COMMENT, IP_ADDRESS } from '../All'

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

const CommentForm = ()=>{
    const {country, dispatch, userProfile, reGetCountry} = useContext(countryContext)
    const [text, setText] = useState('')
    const [image, setImage] = useState(null)
    const textRef = useRef()

    const handleOnSubmit =(e)=>{
        e.preventDefault()

        if(!country){ alert('응원댓글을 남길 국가를 선택해주세요'); return;}
        if(!image){alert("이미지를 넣어주세요"); return;}
        console.log("submit.....")

        const url = `http://${IP_ADDRESS}/api/comment/`
        const uploadData = new FormData();
        uploadData.append('comment', text)
        uploadData.append('image', image, image.name )
        uploadData.append('comment_country',country ) 

        fetch(url,{
            method:"POST",
            headers:{
                "X-CSRFToken": getCookie("csrftoken"),
            },
            body:uploadData,
        })
        .then(res=>{
            console.log(res)
            resetForm()
            reGetCountry(country, dispatch)
        })
        .catch(err=>console.log(err))
    }

    const resetForm = ()=>{
        setText("")
        textRef.current.focus()
    }
    return(
        <>
        
        <div className="d-flex flex-justify-center ">
        <div className="container col-8 card bg-light" >
        { userProfile.id ?
            <form onSubmit={handleOnSubmit} className="d-flex">
                <input  ref={textRef} type="text" onChange={(e)=>setText(e.target.value)} value={text}/>
                <div>

                    <input  type="file"  onChange={(e)=>setImage(e.target.files[0])} />

                    <button className="btn btn-success">응원 메세지 남기기</button>
                </div>
            </form>
             : <h1>로그인해서 응원댓글 남기기</h1>}
        </div>
        </div>
        </>
    )
}
export default CommentForm;