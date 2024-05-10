import React, {useContext} from 'react'
import './ProfilePage.scss'
import { useNavigate} from "react-router-dom";
import {UserContext} from "../../App";
import ListPC from "../MainPage/ListPC/ListPC";
function ProfilePage() {
    const {currentUser} = useContext(UserContext)
    const navigate = useNavigate()
    if (!(localStorage.getItem('currentUser'))) {
        navigate("/main")
    } else {
        return (
            <div className="profile-page">
                <h2>Профиль</h2>
                <div className="user-info">
                    <p>Логин - {currentUser.login}</p>
                    <p>Роль - {currentUser.role}</p>
                </div>
                <ListPC type={'user'}/>
            </div>
        )
    }
}

export default ProfilePage
