import React from 'react'
import './MainPage.scss'
import ListPC from "./ListPC/ListPC";
import ComponentItem from "../ComponentItem/ComponentItem";

function MainPage() {
    return(
        <div className="main-page">
            <h2>Главная страница</h2>
            <div className="content">
                <ListPC type={'all'}/>
                <ListPC type={'recommended'}/>
                <ComponentItem type={"cpu"} component={{
                    id: 2,
                    name: 'AMD Ryzen 5 5500'
                }}/>
            </div>
        </div>
    )
}

export default MainPage
