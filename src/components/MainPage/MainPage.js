import React from 'react'
import './MainPage.scss'
import ListPC from "./ListPC/ListPC";

function MainPage() {
    return(
        <div className="main-page">
            <h2>Главная страница</h2>
            <div className="content">
                <ListPC type={'all'}/>
                <ListPC type={'recommended'}/>
            </div>
        </div>
    )
}

export default MainPage
