import React, {useEffect, useState, useContext} from "react";
import axios from "axios";
import ItemPC from "./ItemPC/ItemPC";
import './ListPC.scss'
import {UserContext} from "../../../App";

function ListPC({type}) {
    const titles = {
        user: 'Ваши конфигурации',
        recommended: 'Рекомендованные конфигурации',
        all: 'Все конфигурации'
    }
    const [openFilter, setOpenFilter] = useState(false)
    const {currentUser} = useContext(UserContext)
    const [list, setList] = useState([])
    const [filteredList, setFilteredList] = useState(list)

    const [typeFilter, setTypeFilter] = useState('all');
    const [producerFilter, setProducerFilter] = useState('all');
    const [sortOrder, setSortOrder] = useState('priceLowHigh');

    useEffect(() => {
        const sortFunctions = {
            priceLowHigh: (a, b) => a.pc_price - b.pc_price,
            priceHighLow: (a, b) => b.pc_price - a.pc_price,
            oldest: (a, b) => new Date(a.created_at) - new Date(b.created_at),
            newest: (a, b) => new Date(b.created_at) - new Date(a.created_at)
        };
        const filtered = list
            .filter(item => typeFilter === 'all' || item.type === typeFilter)
            .filter(item => producerFilter === 'all' || item.cpu.producer === producerFilter)
            .sort(sortFunctions[sortOrder]);
        setFilteredList(filtered);
    },[list, typeFilter, producerFilter, sortOrder]);

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
                    <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                        <option value="all">Все типы</option>
                        <option value="game">Игровой</option>
                        <option value="work">Офисный</option>
                        <option value="home">Домашний</option>
                    </select>
                    <select value={producerFilter} onChange={(e) => setProducerFilter(e.target.value)}>
                        <option value="all">Все производители</option>
                        <option value="AMD">AMD</option>
                        <option value="Intel">Intel</option>
                    </select>
                    <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="newest">Сначала новые</option>
                        <option value="oldest">Сначала старые</option>
                        <option value="priceLowHigh">Цена по возрастанию</option>
                        <option value="priceHighLow">Цена по убыванию</option>
                    </select>
                    <button className='filter-button' type='button' onClick={()=>setOpenFilter(false)}>
                        Скрыть фильтры
                    </button>
                </div>:
                <button type='button' onClick={()=>setOpenFilter(true)} className='filter-button'>
                    Фильтры и сортировка
                </button>}
            <div className="scroll-box">
                <div className="pc-list">
                    {filteredList.length !== 0 ?
                        filteredList.map((el, i)=><ItemPC el={el} key={i} onDelete = {()=>deleteConfig(el.pc_id)}/>) :
                        <p style={{textAlign:"center", padding: '20px', fontSize: '20px'}}>Сборок пока нет. <br/>Создайте свою сборку!</p>}
                </div>
            </div>
        </div>
    )
}

export default ListPC
