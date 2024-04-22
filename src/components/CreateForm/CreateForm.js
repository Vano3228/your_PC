import React, { useState } from 'react';
import axios from "axios";
import './CreateForm.scss'

function CreateForm({mode, pc = {}}) {
    const [configPC, setConfigPC] = useState(pc);

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
                    Название конфигурации:
                    <input name='title' type="text" onChange={handleComponentChange} value={configPC.title}/>
                </label>
                <label>
                    Описание конфигурации:
                    <input name='description' value={configPC.description} type="text" onChange={handleComponentChange}/>
                </label>
                <label>
                    Тип конфигунации:
                    <select name="type" value={configPC.type} onChange={handleComponentChange}>
                        <option value="">Выберите тип сборки</option>
                        <option value="game">Игровой</option>
                        <option value="office">Офисный</option>
                        <option value="home">Домашний</option>
                    </select>
                </label>
                <label>
                    Процессор:
                    <select name="cpu" value={configPC.cpu} onChange={handleComponentChange}>
                        <option value="">Выберите процессор</option>
                        <option value="1">Процессор 1</option>
                        <option value="2">Процессор 2</option>
                    </select>
                </label>
                <label>
                    Видеокарта:
                    <select name="gpu" value={configPC.gpu} onChange={handleComponentChange}>
                        <option value="">Выберите видеокарту</option>
                        <option value="1">Видеокарта 1</option>
                        <option value="2">Видеокарта 2</option>
                    </select>
                </label>
                <label>
                    Материнская плата:
                    <select name="motherboard" value={configPC.motherboard} onChange={handleComponentChange}>
                        <option value="">Выберите материнскую плату</option>
                        <option value="1">Материнская плата 1</option>
                        <option value="2">Материнская плата 2</option>
                    </select>
                </label>
                <label>
                    Оперативная память:
                    <select name="ram" value={configPC.ram} onChange={handleComponentChange}>
                        <option value="">Выберите оперативную память</option>
                        <option value="1">Оперативная память 1</option>
                        <option value="2">Оперативная память 2</option>
                    </select>
                </label>
                <label>
                    Кулер:
                    <select name="cpuCooler" value={configPC.cpuCooler} onChange={handleComponentChange}>
                        <option value="">Выберите кулер</option>
                        <option value="1">Кулер 1</option>
                        <option value="2">Кулер 2</option>
                    </select>
                </label>
                <label>
                    Корпус:
                    <select name="case" value={configPC.case} onChange={handleComponentChange}>
                        <option value="">Выберите корпус</option>
                        <option value="1">Корпус 1</option>
                        <option value="2">Корпус 2</option>
                    </select>
                </label>
                <label>
                    Жёсткий диск:
                    <select name="hardDrive" value={configPC.hardDrive} onChange={handleComponentChange}>
                        <option value="">Выберите жёсткий диск</option>
                        <option value="1">Жёсткий диск 1</option>
                        <option value="2">Жёсткий диск 2</option>
                    </select>
                </label>
                <label>
                    Блок питания:
                    <select name="powerSupply" value={configPC.powerSupply} onChange={handleComponentChange}>
                        <option value="">Выберите блок питания</option>
                        <option value="1">Блок питания 1</option>
                        <option value="2">Блок питания 2</option>
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
