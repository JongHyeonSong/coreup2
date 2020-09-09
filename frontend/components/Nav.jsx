import React from 'react';
import { Link , NavLink} from 'react-router-dom';


const Nav = () => {
  return (
    <>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a href="http://127.0.0.1:8000/"><img className="w-1" alt="covid-19" src="/static/images/coroan.png"></img></a>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active mx-10">
              <NavLink exact to="/chart"  style={{ textDecoration: 'none' }} className="main-nav" activeClassName="main-nav-active" > <h1 className="m-5">Chart</h1> </NavLink>
            </li>
            <li className="nav-item">
              <NavLink  exact to="/comment"  style={{ textDecoration: 'none' }}className="main-nav" activeClassName="main-nav-active"> <h1 className="m-5">Comment</h1></NavLink>
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