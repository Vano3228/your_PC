import './ComponentItem.scss'
import {useEffect, useState} from "react";
import axios from "axios";
function ComponentItem({component, type, onSelect}){
    const [componentWithPrices, setComponentWithPrices] = useState({})
    const charFormatStrings = {
        cpu: `Сокет: ${componentWithPrices.socket}, TDP: ${componentWithPrices.tdp} Вт, Тип RAM: ${componentWithPrices.ram_type}`,
        gpu: `Рекомендованный блок питания: ${componentWithPrices.recommended_psu} Вт, Длина видеокарты: ${componentWithPrices['length']} мм`,
        ram: `Тип памяти: ${componentWithPrices.memory_type}, Частота: ${componentWithPrices['frequency']} МГц, Объем памяти: ${componentWithPrices.ram_size} ГБ, Кол-во модулей памяти: ${componentWithPrices.modules_num}`,
        motherboard: `Сокет: ${componentWithPrices['socket']}, Размер: ${componentWithPrices.size_type}, Тип RAM: ${componentWithPrices.ram_type}`,
        power_supply: `Мощность: ${componentWithPrices.power} Вт`,
        pc_case: `Максимальная длина видеокарты: ${componentWithPrices.gpu_max_length} мм, Максимальная высота кулера: ${componentWithPrices.cooler_max_height} мм`,
        cooler: `Поддерживаемые сокеты: ${componentWithPrices.socket}, Высота: ${componentWithPrices['height']}, Рассеиваемая мощность: ${componentWithPrices.tdp} Вт`,
        hard_drive: `Тип: ${componentWithPrices['type']}, Интерфейс: ${componentWithPrices['interface']}, Объем памяти: ${componentWithPrices.memory_size} ГБ`,
    }
    useEffect(()=>{
        const getPrices = async () =>{
            const src = `http://localhost:5000/api/components/${type}/${component.id}`
            const pricesReq = await axios.get(src)
            const newComponentWithPrices = {
                ...component,
                shop: pricesReq.data.shop,
                url: pricesReq.data.url,
                price: pricesReq.data.price
            }
            setComponentWithPrices(newComponentWithPrices)
        }
        getPrices()
    },[component, type])
    return(
        <div className="component-item"
             onClick={()=>onSelect ? onSelect(type, componentWithPrices) : ''}
        >
            <h3>{componentWithPrices.name}</h3>
            <p>{charFormatStrings[type]}</p>
            <p>Магазин {componentWithPrices.shop}</p>
            <a href={componentWithPrices.url} target={'_blank'} rel="noreferrer" onClick={(e)=>{e.stopPropagation()}}>
                Ссылка на товар
            </a>
            <p className={'price'}><b>Цена - {componentWithPrices.price} руб</b></p>
        </div>
    )
}

export default ComponentItem
