import React, { useState, useContext } from 'react';
import axios from "axios";
import './CreateForm.scss'
import ModalComponents from "./ModalComponents/ModalComponents";
import SelectComponent from "./SelectComponent/SelectComponent";
import {UserContext} from "../../App";

function CreateForm() {
    const {currentUser, selectPC} = useContext(UserContext)
    const [configPC, setConfigPC] = useState(selectPC);
    const [modalOpen, setModalOpen] = useState(false)
    const [modalComponentType, setModalComponentType] = useState('')
    const [statusSubmit, setStatusSubmit] = useState()
    const componentTypes = ['cpu', 'motherboard', 'ram', 'cooler', 'gpu', 'power_supply', 'hard_drive', 'pc_case']

    const handleComponentChange = (event) => {
        const { name, value } = event.target;
        setConfigPC({
            ...configPC,
            [name]: value
        });
    };
    const handleSubmitCreate = async (event) => {
        event.preventDefault()
        console.log(Object.keys(configPC).length)
        if (Object.keys(configPC).length === 11) {
            const src = `http://localhost:5000/api/computers`
            const createdPC = {
                pc_name: configPC.title,
                description: configPC.description,
                pc_type: configPC.type,
                cpu_id: configPC.cpu.id,
                gpu_id: configPC.gpu.id,
                ram_id: configPC.ram.id,
                motherboard_id: configPC.motherboard.id,
                pc_case_id: configPC.pc_case.id,
                hard_drive_id: configPC.hard_drive.id,
                cooler_id: configPC.cooler.id,
                power_supply_id: configPC.power_supply.id,
                creator_id: currentUser.user_id
            }
            console.log(createdPC)
            const createPCReq = await axios.post(src, createdPC)
            setStatusSubmit(createPCReq.data)
            setConfigPC({})
        }
        else {
            setStatusSubmit('not_complete')
        }
    };

    return (
        <div className="create-form">
            {modalOpen &&
                <ModalComponents
                    type={modalComponentType}
                    open={modalOpen}
                    onClose={()=>{
                        setModalOpen(false)
                    }}
                    configPC={configPC}
                    setConfigPC={setConfigPC}
                />
            }
            <form onSubmit={handleSubmitCreate}>
                <label>
                    <p>Название конфигурации:</p>
                    <input name='title' type="text" onChange={handleComponentChange} value={configPC.title}/>
                </label>
                <label>
                    <p>Описание конфигурации:</p>
                    <input name='description' value={configPC.description} type="text" onChange={handleComponentChange}/>
                </label>
                <label>
                    <p>Тип конфигунации:</p>
                    <select name="type" value={configPC.type} onChange={handleComponentChange}>
                        <option value="">Выберите тип сборки</option>
                        <option value="game">Игровой</option>
                        <option value="office">Офисный</option>
                        <option value="home">Домашний</option>
                    </select>
                </label>
                {componentTypes.map((el)=>
                    <SelectComponent
                        configPC={configPC}
                        setModalComponentType={setModalComponentType}
                        componentType={el}
                        setModalOpen={setModalOpen}
                    />)
                }
                {statusSubmit &&
                    ((statusSubmit === 'success') ?
                        <p style={{color: 'green', textAlign: 'center', fontSize: '18px'}}>Сборка успешно создана!</p> :
                        <p style={{color: 'red', textAlign: 'center', fontSize: '18px'}}>Выбраны не все компоненты сборки</p>)}
                <div className="buttons">
                    <button type="submit">Создать сборку</button>
                </div>
            </form>
        </div>
    );
}

export default CreateForm;
