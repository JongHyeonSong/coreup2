import React, { useContext } from 'react'
import { countryContext } from './All'
import './Profile.css';
import { MdPeople, FaFlag, FaTransgender } from 'react-icons/fa';
import { FaBeer } from 'react-icons/fa';
import { BsFillPersonFill } from "react-icons/bs";


const Profile = ()=>{
    const {userProfile} = useContext(countryContext)
    return (
            <div className="card-container">
                <div className="upper-container">
                    <div className="image-container">
                        <img src={userProfile.images || './static/images/coroan.png'} />
                    </div>
                </div>

                <div className="lower-container">
                    <div>
                        <div className="d-block" style={{height:100}}></div>
                       <div className="px-5">
                       <FaTransgender/>{" "}
                       { userProfile.gender || "?"}<br/>
                       
                       <FaFlag/>{" "}
                       { userProfile.user_nation || "?"}<br/>
                       <BsFillPersonFill/>{" "}
                       { userProfile.profile_name || "?"}<br/><br/><br/>
                       { userProfile.description}
                       </div>
                    </div>
               
                </div>

            </div>
    )
}

export default Profile