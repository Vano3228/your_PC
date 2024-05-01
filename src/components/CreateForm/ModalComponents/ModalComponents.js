
import axios from "axios";
import {useEffect, useState} from "react";
import ComponentItem from "../../ComponentItem/ComponentItem";
import './ModalComponents.scss'
function ModalComponents({type, open, onClose, configPC, setConfigPC}) {
    const componentName = {
        cpu: 'Выбор процессора',
        gpu: 'Выбор видеокарты',
        ram: 'Выбор оперативной памяти',
        motherboard: 'Выбор материнской платы',
        power_supply: 'Выбор блока питания',
        cooler: 'Выбор кулера',
        pc_case: 'Выбор корпуса',
        hard_drive: 'Выбор жёсткого диска'
    }

    const [fetchComponents, setFetchComponents] = useState([])
    useEffect(() =>{
        const getAllComponents = async () => {
            const src = `http://localhost:5000/api/components/all/${type}`
            const allComponentsReq = await axios.get(src)
            if (allComponentsReq.data !== []) {
                setFetchComponents(allComponentsReq.data)
            }
        }
        getAllComponents()
    },[setConfigPC])
    return(
        <>
            {open &&
                <div
                    className={`modal-components`}
                    onClick={()=> onClose(false)}
                >
                    <div className={`content`} onClick={(e)=> e.stopPropagation()}>
                        <h2>
                            {componentName[type]}
                        </h2>
                        <div className='components'>
                            {fetchComponents.map((el,i)=><ComponentItem key={i} type={type} component={el} onSelect={()=>{
                                const updatedPC = {
                                    ...configPC,
                                    [type]: {...el}
                                }
                                setConfigPC(updatedPC)
                                onClose()
                            }}/>)}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ModalComponents
