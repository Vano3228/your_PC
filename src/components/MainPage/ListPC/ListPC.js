import React, {useEffect, useState, useContext} from "react";
import axios from "axios";
import ItemPC from "./ItemPC/ItemPC";
import './ListPC.scss'
import {UserContext} from "../../../App";

function ListPC({type}) {
    const {currentUser} = useContext(UserContext)
    const titles = {
        user: 'Ваши конфигурации',
        recommended: 'Рекомендованные конфигурации',
        all: 'Все конфигурации'
    }
    const [list, setList] = useState([])
    useEffect(()=>{
        async function fetchData() {
            let src = ''
            if (type === 'user'){
                src = `http://localhost:5000/api/computers/user/${currentUser.user_id}`
            }
            else {
                src = `http://localhost:5000/api/computers/${type}`
            }
            const resp = await axios.get(src)
            setList(resp.data)
        }
        fetchData()
    }, [setList]);
    return(
        <div className={`pc-list-box ${type}`}>
            <div className="title">
                <h3>{titles[type]}</h3>
            </div>
            <div className="pc-list">
                {list && list.map((el, i)=><ItemPC el={el} key={i}/>)}
                {list && list.map((el, i)=><ItemPC el={el} key={i}/>)}
            </div>
        </div>

    )
}

export default ListPC
