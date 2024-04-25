import React, {useEffect, useState} from "react";
import axios from "axios";
import ItemPC from "./ItemPC/ItemPC";
import './ListPC.scss'

function ListPC({type, userID}) {
    const titles = {
        user: 'Ваши конфигурации',
        recommended: 'Рекомендованные конфигурации',
        all: 'Все конфигурации'
    }
    const [list, setList] = useState([])
    // useEffect(()=>{
    //     async function fetchData() {
    //         let src = ''
    //         if (type === 'user'){
    //             src = `http://localhost:5000/api/computers/${type}/${userID}`
    //         }
    //         else {
    //             src = `http://localhost:5000/api/computers/${type}`
    //         }
    //         console.log(src)
    //         const resp = await axios.get(src)
    //         setList(resp.data)
    //     }
    //     fetchData()
    // }, [setList]);
    return(
        <div className={`pc-list-box ${type}`}>
            <h3>{titles[type]}</h3>
            <div className="pc-list">
                {list && list.map((el, i)=><ItemPC el={el} key={i}/>)}
            </div>
        </div>

    )
}

export default ListPC
