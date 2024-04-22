import React from 'react'
import './ProfilePage.scss'
function ProfilePage({profile}) {
    return(
        <div className="profile-page">
            <h2>Профиль</h2>
            <p>Логин - {profile.login}</p>
            <p>E-mail - {profile.mail}</p>
            <div className="profileConfigs">
                Ваши сборки

            </div>
        </div>
    )
}

export default ProfilePage
