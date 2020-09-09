import React, { useState, useContext } from 'react'
import { countryContext, ADD_COMMENT } from '../All'

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
    const [image, setImage] = useState()


    const handleOnSubmit =(e)=>{
        e.preventDefault()
        console.log("submit.....")

        const url = `http://127.0.0.1:8000/api/comment/`
        const uploadData = new FormData();
        uploadData.append('comment', text)
        uploadData.append('image', image, image.name )
        uploadData.append('user_profile', userProfile.id) //현재유저
        uploadData.append('comment_country',country )  //중국 일단고정

        fetch(url,{
            method:"POST",
            headers:{
                "X-CSRFToken": getCookie("csrftoken"),
            },
            body:uploadData,
        })
        .then(res=>{
            console.log(res)
            // dispatch({type:ADD_COMMENT, country:country})
            reGetCountry(country, dispatch)
        })
        .catch(err=>console.log(err))
    }
    return(
        <>
        <div className="d-flex flex-justify-center">
        <div className="col-6 container" style={{backgroundColor:'red'}}>
            <form onSubmit={handleOnSubmit} >
                <input  type="text" onChange={(e)=>setText(e.target.value)} value={text}/>
                <input type="file"  onChange={(e)=>setImage(e.target.files[0])} />
                <button>click</button>
            </form>
        </div>
        </div>
        
        </>
    )
}
export default CommentForm;