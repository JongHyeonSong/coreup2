import React, { useContext } from 'react';
import { Link , NavLink} from 'react-router-dom';
import { countryContext } from './All';


const Nav = () => {
  const {country, dispatch, userProfile} = useContext(countryContext)

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
          { !userProfile.id ?  <div>
          <a className="btn btn-success" href="/accounts/register"> 회원가입 </a>
          <a className="btn btn-danger" href="/accounts/login"> 로그인 </a> </div> 
          
          : <div>
          <a className="btn btn-success" href="/accounts/logout"> 로그아웃 </a>
          <a className="btn btn-danger" href="/accounts/profile"> 프로필 </a></div>}
         
         
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