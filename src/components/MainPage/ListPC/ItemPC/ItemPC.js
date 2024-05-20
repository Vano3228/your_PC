import './ItemPC.scss'
import {useContext} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";
import {UserContext} from "../../../../App";

function ItemPC({el, onDelete}) {
    const {setCreateFormMode, setSelectPC, currentUser} = useContext(UserContext)
    const pc_types ={
        home: 'Домашний',
        office: 'Офисный',
        game: 'Игровой'
    }

    const recommendHandler = async () => {
        const src = `http://localhost:5000/api/computers/recommend/${el.pc_id}`
        const resp = await axios.get(src)
        alert(resp.data)
    }

    const redirectHandler = () => {
        const redirectPC = {...el}
        setSelectPC(redirectPC)
        if (currentUser && (currentUser.role === 'admin' || el.creator_id === currentUser.user_id)) {
            setCreateFormMode('edit')
        }
        else {
            setCreateFormMode('view')
        }
    }

    return (
        <div className="item-pc">
            <h1>{el.title}</h1>
            <h2>{el.description}</h2>
            <h2>Тип компьютера - {pc_types[el.type]}</h2>
            <p><b>Процессор</b> {el.cpu.name}</p>
            <p><b>Видеокарта</b> {el.gpu.name}</p>
            <p><b>Материнская плата</b> {el.motherboard.name}</p>
            <p><b>Блок питания</b> {el.power_supply.name}</p>
            <p><b>Корпус</b> {el.pc_case.name}</p>
            <p><b>Оперативная память</b> {el.ram.name}</p>
            <p><b>Накопитель</b> {el.hard_drive.name}</p>
            <p><b>Дата создания конфигурации</b> {el.created_at.split('T').join(' ').slice(0,-5)}</p>
            <p className='price'><b>Цена - {el.pc_price} руб.</b></p>
            <div className="buttons">
                <NavLink to='/create'>
                    <button type='button' onClick={redirectHandler}>
                        Открыть в конфигураторе
                    </button>
                </NavLink>
                {(currentUser && ((currentUser.role === 'admin') || (currentUser.user_id === el.creator_id))) &&
                    <>
                        {(!el.is_recommended && (currentUser.role === 'admin')) &&
                            <button type='button' onClick={recommendHandler}>
                            Рекомендовать сборку
                        </button>
                        }
                        <button type='button' onClick={onDelete} style={{backgroundColor: 'rgba(255,200,191,0.75)'}}>
                            Удалить конфигурацию
                        </button>
                    </>
                }
            </div>
        </div>
    )
}

export default ItemPC
