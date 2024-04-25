import React from 'react'
import './MainPage.scss'
import ComponentItem from "../ComponentItem/ComponentItem";
import ListPC from "./ListPC/ListPC";

function MainPage() {
    return(
        <div className="main-page">
            <h2>Главная страница</h2>
            <div className="content">
                <ListPC type={'all'}/>
                <ListPC type={'recommended'}/>
                <ComponentItem component={{
                    name: "Intel Core i3-10100F",
                    characteristics: "4 ядра 8 потоков, вся хуйня",
                    shop: "DNS",
                    url: "https://www.dns-shop.ru/product/858de36402573330/480-gb-ssd-nakopitel-kingston-a400-sa400s37480g/opinion/",
                    price: "4999"

                }}/>
            </div>
        </div>
    )
}

export default MainPage
