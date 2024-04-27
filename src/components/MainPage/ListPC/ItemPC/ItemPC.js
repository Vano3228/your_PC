import './ItemPC.scss'
import {useEffect, useState} from "react";
import axios from "axios";

function ItemPC({el}) {
    const [thisPC, setThisPC] = useState({});
    const [dataLoaded, setDataLoaded] = useState(false);
    const pc_types ={
        home: 'Домашний',
        work: 'Рабочий',
        game: 'Игровой'
    }

    useEffect(()=>{
        const getThisPC = async () => {
            const src = `http://localhost:5000/api/computers/${el.id}`
            const resp = await axios.get(src)
            setThisPC(resp.data)
            console.log(resp.data)
            setDataLoaded(true)
        }
        getThisPC()
    }, [])

    if (!dataLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div className="item-pc">
            <h1>Компьютер {thisPC.pc_id}</h1>
            <h2>{thisPC.pc_name}</h2>
            <h2>{thisPC.description}</h2>
            <h2>Тип компьютера - {pc_types[thisPC.pc_type]}</h2>
            <p>Процессор {thisPC.cpu.name}</p>
            <p>Видеокарта {thisPC.gpu.name}</p>
            <p>Материнская плата {thisPC.motherboard.name}</p>
            <p>Блок питания {thisPC.power_supply.name}</p>
            <p>Корпус {thisPC.pc_case.name}</p>
            <p>Оперативная память {thisPC.ram.name}</p>
            <p>Диск {thisPC.hard_drive.name}</p>
        </div>
    )
}

export default ItemPC
