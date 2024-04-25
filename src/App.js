import React, { useState, createContext, useEffect } from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Header from "./components/Header/Header";
import MainPage from "./components/MainPage/MainPage";
import CreateForm from "./components/CreateForm/CreateForm";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import './App.css'

export const UserContext = createContext(null);

function App() {
    const [currentUser, setCurrentUser] = useState(() => {
        // При монтировании компонента App пытаемся получить информацию о пользователе из localStorage
        const user = localStorage.getItem('currentUser');
        // Проверяем, есть ли информация о пользователе в localStorage
        return user ? JSON.parse(user) : null;
    });

    useEffect(() => {
        // При изменении currentUser сохраняем его в localStorage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }, [currentUser]);

    const pc = {
        title: 'Домашний ПК',
        description: 'Какое-то описание',
        type: 'home',
        cpu: '2',
        gpu: '2',
        ram: '1',
        pc_case: '2',
        power_supply: '2',
        cooler: '1',
        hard_drive: '2',
        motherboard: '1'
    };
    const [selectPC, setSelectPC] = useState(pc);
    return (
        <BrowserRouter>
            <UserContext.Provider value={{currentUser, setCurrentUser, setSelectPC, selectPC}}>
                <div className="App">
                    <Header/>
                    <Routes>
                        <Route element={<CreateForm pc={pc}/>} path='create'/>
                        <Route element={<ProfilePage />} path='profile'/>
                        <Route element={<MainPage />} path='*'/>
                    </Routes>
                </div>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
