import './ItemPC.scss'

function ItemPC({el}) {
    return (
        <div className="item-pc">
            <h1>Компьютер {el.id}</h1>
            <p>Процессор {el.cpu_id }</p>
            <p>Видеокарта {el.gpu_id }</p>
            <p>Матринская плата {el.motherboard_id }</p>
            <p>Блок питания {el.power_supply_id }</p>
            <p>Корпус {el.pc_case_id }</p>
            <p>Оперативная память {el.ram_id }</p>
            <p>Диск {el.hard_drive_id }</p>
        </div>
    )
}

export default ItemPC
