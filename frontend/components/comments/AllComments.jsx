import React from 'react'
import CommentForm from './CommentForm'
import Comments from './Comments'

const AllComments = ()=>{
    return(
        <>
        <div id="container">
        <CommentForm />
        <hr/>
        <Comments/>
        </div>
        </>
    )
}
export default AllComments;