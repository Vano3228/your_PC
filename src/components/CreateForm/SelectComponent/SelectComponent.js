import './SelectComponent.scss'
import ComponentItem from "../../ComponentItem/ComponentItem";
import React from "react";
function SelectComponent({componentType, configPC, setModalComponentType, setModalOpen}) {
    const openModal = () => {
        setModalComponentType(componentType)
        setModalOpen(true)
    }
    const componentName = {
        cpu: 'Процессор',
        gpu: 'Видеокарта',
        ram: 'Оперативная память',
        motherboard: 'Материнская плата',
        power_supply: 'Блок питания',
        cooler: 'Кулер',
        pc_case: 'Корпус',
        hard_drive: 'Накопитель'
    }
    return(
        <label>
            <p>{componentName[componentType]}:</p>
            <div className="select-component" onClick={openModal}>
                {configPC[componentType] ?
                    <ComponentItem
                        component={configPC[componentType]}
                        type={componentType}
                    /> :
                    <button type={'button'}>
                        Выбрать
                    </button>
                }
            </div>
        </label>
    )
}

export default SelectComponent
