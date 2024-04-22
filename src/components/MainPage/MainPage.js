import React, {useEffect, useState} from 'react'
import axios from "axios";
import './MainPage.scss'
import ItemPC from "./ItemPC/ItemPC";
import ComponentItem from "../ComponentItem/ComponentItem";

function PCList({type}) {
    const [list, setList] = useState()
    useEffect(()=>{
        async function fetchData() {
            const src = `http://localhost:5000/api/computers/${type}`
            console.log(src)
            const resp = await axios.get(src)
            setList(resp.data)
        }
        fetchData()
    }, [setList]);
    return(
        <div className="pc-list">
            {list && list.map((el, i)=><ItemPC el={el} key={i}/>)}
        </div>
    )
}

function MainPage() {
    return(
        <div className="main-page">
            <h2>Главная страница</h2>
            <div className="content">
                <div className="pc-list-box all">
                    <h3>Все конфигурации</h3>
                    {/*<PCList type={'all'}/>*/}
                </div>
                <div className="pc-list-box recommended">
                    <h3>Рекоммендованные конфигурации</h3>
                    {/*<PCList type={'recommended'}/>*/}
                </div>
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
