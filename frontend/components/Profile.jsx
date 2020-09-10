import React, { useContext } from 'react'
import { countryContext } from './All'
import './Profile.css';
import { MdPeople, FaFlag, FaTransgender } from 'react-icons/fa';
import { FaBeer } from 'react-icons/fa';
import { BsFillPersonFill } from "react-icons/bs";


const Profile = ()=>{
    const {userProfile} = useContext(countryContext)
    console.log(userProfile)
    return (
            // <div>
            //     <div className="card bg-light w-100 " >
            //         <img src={userProfile.images || "./static/images/coroan.png"} alt="user-img" className="profile-img"/>
            //     </div>
            //     <div className="card bg-light">
            //         <p>{userProfile.profile_name}</p>
            //         <p>{userProfile.user_nation}</p>
            //         <p>{userProfile.description}</p>
            //         <p>{userProfile.gender}</p>
            //     </div>
            // </div>
            <div className="card-container">
                <div className="upper-container">
                    <div className="image-container">
                        <img src={userProfile.images} />
                    </div>
                </div>

                <div className="lower-container">
                    <div>
                        <div className="d-block" style={{height:100}}></div>
                       <div className="px-5">
                       <FaTransgender/>{" "}
                       { userProfile.gender}<br/>
                       
                       <FaFlag/>{" "}
                       { userProfile.user_nation}<br/>
                       <BsFillPersonFill/>{" "}
                       { userProfile.profile_name}<br/><br/><br/>
                       { userProfile.description}
                       </div>
                    </div>
                    
                    {/* <div>
                       <FaTransgender/>
                       {userProfile.gender}
                    </div>
                    <div>
                       <BsPeopleCircle/>
                    </div> */}
                </div>

            </div>
    )
}

export default Profile