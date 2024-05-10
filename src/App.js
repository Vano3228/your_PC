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
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    });

    useEffect(() => {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }, [currentUser]);

    const [selectPC, setSelectPC] = useState({});
    const [createFormMode, setCreateFormMode] = useState('')
    return (
        <BrowserRouter>
            <UserContext.Provider value={{currentUser, setCurrentUser, setSelectPC, selectPC, createFormMode, setCreateFormMode}}>
                <div className="App">
                    <Header/>
                    <Routes>
                        <Route element={<CreateForm/>} path='create'/>
                        <Route element={<ProfilePage />} path='profile'/>
                        <Route element={<MainPage />} path='*'/>
                    </Routes>
                </div>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
