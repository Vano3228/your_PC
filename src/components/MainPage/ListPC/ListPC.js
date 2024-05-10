import React, {useEffect, useState, useContext} from "react";
import axios from "axios";
import ItemPC from "./ItemPC/ItemPC";
import './ListPC.scss'
import {UserContext} from "../../../App";

function ListPC({type}) {
    const [openFilter, setOpenFilter] = useState(false)
    const {currentUser} = useContext(UserContext)
    const titles = {
        user: 'Ваши конфигурации',
        recommended: 'Рекомендованные конфигурации',
        all: 'Все конфигурации'
    }
    const [list, setList] = useState([])
    useEffect(()=>{
        async function fetchData() {
            let src = 'http://localhost:5000/api/computers/getPC'
            const resp = await axios.post(src, {
                type,
                userID: currentUser && currentUser.user_id
            })
            setList(resp.data)
        }
        fetchData()
    }, [setList, currentUser, type]);

    const deleteConfig = async (pc_id) => {
        setList(list.filter((el)=>el.id !== pc_id))
        const src = `http://localhost:5000/api/computers/${pc_id}`
        const resp = await axios.delete(src)
        alert(resp.data)
    }

    return(
        <div className={`pc-list-box ${type}`}>
            <div className="title">
                <h3>{titles[type]}</h3>
            </div>
            {openFilter ?
                <div className="filter-box">
                    Какое-то окошко для фильтров
                    <button type='button' onClick={()=>setOpenFilter(false)}>
                        Скрыть фильтры
                    </button>
                </div>:
                <button type='button' onClick={()=>setOpenFilter(true)}>
                    Фильтры и сортировка
                </button>}
            <div className="scroll-box">
                <div className="pc-list">
                    {list.length !== 0 ?
                        list.map((el, i)=><ItemPC el={el} key={i} onDelete = {()=>deleteConfig(el.pc_id)}/>) :
                        <p style={{textAlign:"center"}}>Сборок пока нет. <br/>Создайте свою сборку!</p>}
                </div>
            </div>
        </div>

    )
}

export default ListPC
