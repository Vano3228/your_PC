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
                    
                </label>
                <label>
                    Видеокарта:


                </label>
                <label>
                    Материнская плата:

                </label>
                <label>
                    Оперативная память:

                </label>
                <label>
                    Кулер:

                </label>
                <label>
                    Корпус:

                </label>
                <label>
                    Жёсткий диск:

                </label>
                <label>
                    Блок питания:

                </label>
                <div className="buttons">
                    <button type="submit">Отправить</button>
                </div>
            </form>
        </div>
    );
}

export default CreateForm;
