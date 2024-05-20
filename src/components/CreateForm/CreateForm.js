import React, {useState, useContext} from 'react';
import axios from "axios";
import './CreateForm.scss'
import ModalComponents from "./ModalComponents/ModalComponents";
import SelectComponent from "./SelectComponent/SelectComponent";
import {UserContext} from "../../App";

function CreateForm() {
    const {currentUser, selectPC, createFormMode, setCreateFormMode} = useContext(UserContext)
    const [configPC, setConfigPC] = useState(selectPC.hasOwnProperty("pc_price") ? selectPC : {pc_price: 0});
    const [modalOpen, setModalOpen] = useState(false)
    const [modalComponentType, setModalComponentType] = useState('')
    const [statusSubmit, setStatusSubmit] = useState()
    const componentTypes = ['cpu', 'motherboard', 'ram', 'cooler', 'gpu', 'power_supply', 'hard_drive', 'pc_case'];

    const checkFull = (pc) => {
        const allFields = [...componentTypes, 'title', 'description', 'type'];
        for (let i = 0; i < allFields.length; i++) {
            if (!(pc.hasOwnProperty(allFields[i]))) {
                return false;
            }
        }
        return true;
    }
    const logs = {
        success: () => <p style={{color: 'green', textAlign: 'center', fontSize: '18px'}}>Сборка успешно создана!</p>,
        update: () => <p style={{color: 'orange', textAlign: 'center', fontSize: '18px'}}>Сборка обновлена!</p>,
        not_complete: () => <p style={{color: 'red', textAlign: 'center', fontSize: '18px'}}>Выбраны не все компоненты сборки</p>
    };

    const handleComponentSelect = (type, component) => {
        const updatedPC = {
            ...configPC,
            [type]: component,
            pc_price: configPC.hasOwnProperty(type) ? configPC.pc_price - configPC[type].price + component.price : configPC.pc_price + component.price
        };
        setConfigPC(updatedPC);
        setModalOpen(false)
    };

    const handleComponentChange = (event) => {
        const { name, value } = event.target;
        setConfigPC({
            ...configPC,
            [name]: value
        });
    };

    const handlerCleanForm = (e) => {
        e.preventDefault()
        setConfigPC({pc_price: 0})
        document.getElementsByName('type')[0].value = ''
        document.getElementsByName('title')[0].value = ''
        document.getElementsByName('description')[0].value = ''
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!checkFull(configPC)) {
            setStatusSubmit('not_complete')
            return null
        }
        else {
            const src = `http://localhost:5000/api/computers`
            const submitPC = {
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
            if (createFormMode === 'edit') submitPC.pc_id = configPC.pc_id
            const resp = (createFormMode === 'create') ? await axios.post(src, submitPC) : await axios.put(src, submitPC)
            setStatusSubmit(resp.data)
            setCreateFormMode('edit')
        }
    }

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
                    handleComponentSelect={handleComponentSelect}
                />
            }
            {createFormMode === 'view' && <h2>Режим просмотра</h2>}
            {createFormMode === 'edit' && <h2>Режим редактирования</h2>}
            {createFormMode === 'create' && <h2>Режим создания</h2>}
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Название конфигурации:</p>
                        <input name='title' type="text" onChange={handleComponentChange} value={configPC.title}/>
                    </label>
                    <label>
                        <p>Описание конфигурации:</p>
                        <input name='description' value={configPC.description} type="text" onChange={handleComponentChange}/>
                    </label>
                    <label>
                        <p>Тип конфигурации:</p>
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
                    <div className='price-box'>
                        <p>
                            Цена конфигурации - <b>{configPC.pc_price}</b> ₽
                        </p>
                    </div>
                    {statusSubmit && logs[statusSubmit]()}
                    {(createFormMode === 'edit' || createFormMode === 'create') &&
                        <div className="buttons">
                            <button type="submit">{createFormMode === 'create' ? 'Создать' : 'Обновить'} сборку</button>
                            {Object.keys(configPC).length !== 1 && <button type='button' onClick={handlerCleanForm}> Очистить форму</button>}
                        </div>
                    }
                </form>
            </div>
        </div>
    );
}

export default CreateForm;
