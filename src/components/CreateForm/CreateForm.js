import React, { useState } from 'react';
import './CreateForm.scss'

function CreateForm() {    const [configPC, setConfigPC] = useState({
        cpu: '',
        gpu: '',
        ram: '',
        case: '',
        powerSupply: '',
        cpuCooler: '',
        hardDrive: '',
        motherboard: ''
    });

    const handleComponentChange = (event) => {
        const { name, value } = event.target;
        setConfigPC({
            ...configPC,
            [name]: value
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className="create-form">
            <form onSubmit={handleSubmit}>
                <label>
                    Процессор:
                    <select name="cpu" value={configPC.cpu} onChange={handleComponentChange}>
                        <option value="">Выберите процессор</option>
                        <option value="cpu1">Процессор 1</option>
                        <option value="cpu2">Процессор 2</option>
                        <option value="cpu2">Процессор 2</option>
                    </select>
                </label>
                <label>
                    Видеокарта:
                    <select name="gpu" value={configPC.gpu} onChange={handleComponentChange}>
                        <option value="">Выберите видеокарту</option>
                        <option value="gpu1">Видеокарта 1</option>
                        <option value="gpu2">Видеокарта 2</option>
                    </select>
                </label>
                <label>
                    Материнская плата:
                    <select name="motherboard" value={configPC.motherboard} onChange={handleComponentChange}>
                        <option value="">Выберите материнскую плату</option>
                        <option value="motherboard1">Материнская плата 1</option>
                        <option value="motherboard2">Материнская плата 2</option>
                    </select>
                </label>
                <label>
                    Оперативная память:
                    <select name="ram" value={configPC.ram} onChange={handleComponentChange}>
                        <option value="">Выберите оперативную память</option>
                        <option value="ram1">Оперативная память 1</option>
                        <option value="ram2">Оперативная память 2</option>
                    </select>
                </label>
                <label>
                    Кулер:
                    <select name="cpuCooler" value={configPC.cpuCooler} onChange={handleComponentChange}>
                        <option value="">Выберите кулер</option>
                        <option value="cpuCooler">Кулер 1</option>
                        <option value="cpuCooler">Кулер 2</option>
                    </select>
                </label>
                <label>
                    Корпус:
                    <select name="case" value={configPC.case} onChange={handleComponentChange}>
                        <option value="">Выберите корпус</option>
                        <option value="case1">Корпус 1</option>
                        <option value="case2">Корпус 2</option>
                    </select>
                </label>
                <label>
                    Жёсткий диск:
                    <select name="hardDrive" value={configPC.hardDrive} onChange={handleComponentChange}>
                        <option value="">Выберите жёсткий диск</option>
                        <option value="hardDrive1">Жёсткий диск 1</option>
                        <option value="hardDrive2">Жёсткий диск 2</option>
                    </select>
                </label>
                <label>
                    Блок питания:
                    <select name="powerSupply" value={configPC.powerSupply} onChange={handleComponentChange}>
                        <option value="">Выберите блок питания</option>
                        <option value="powerSupply1">Блок питания 1</option>
                        <option value="powerSupply2">Блок питания 2</option>
                    </select>
                </label>
                <div className="buttons">
                    <button type="submit">Отправить</button>
                </div>
            </form>
        </div>
    );
}

export default CreateForm;
