import React from 'react';
import { Link } from 'react-router-dom';


const Nav = () => {
  return (
    <>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a href="http://127.0.0.1:8000/"><img className="w-1" alt="covid-19" src="/static/images/coroan.png"></img></a>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              {/* <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a> */}
              <Link to="/chart"> <h1 className="mx-30">차트 확인ㄹㄹ</h1> </Link>
              차트확인링크
            </li>
            <li className="nav-item">
            <Link to="/comment"> <h1 className="mx-30">for comment</h1></Link>
            코멘트링크ff
            </li>
            <div>
        </div>
          </ul>
        <a href="/accounts/register">회원가입</a>
        <a href="/accounts/login">로그인</a>
        <a href="/accounts/logout">로그아웃</a>
        </div>
      </nav>
      <hr/>
      <hr/>
      <hr/>
      <hr/>
    </>
  )
}

export default Nav