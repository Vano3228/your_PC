import './ComponentItem.scss'
import {useEffect, useState} from "react";
import axios from "axios";
function ComponentItem({component, type}){
    const [componentWithPrices, setComponentWithPrices] = useState({})
    useEffect(()=>{
        const getPrices = async () =>{
            const src = `http://localhost:5000/api/components/${type}/${component.id}`
            const pricesReq = await axios.get(src)
            console.log(pricesReq)
            const newComponentWithPrices = {
                ...component,
                shop: pricesReq.data.shop,
                url: pricesReq.data.url,
                price: pricesReq.data.price
            }
            setComponentWithPrices(newComponentWithPrices)
        }
        getPrices()
    },[])
    return(
        <div className="component-item">
            <h3>{componentWithPrices.name}</h3>
            <p>Магазин {componentWithPrices.shop}</p>
            <a href={componentWithPrices.url} target={'_blank'}>
                Ссылка на товар
            </a>
            <p className={'price'}>{componentWithPrices.price}</p>
        </div>
    )
}

export default ComponentItem
