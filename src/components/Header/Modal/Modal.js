import React, { useState, useContext } from 'react';
import {UserContext} from "../../../App"
import './Modal.scss';

const Modal = ({ isOpen, onClose, mode }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const {setCurrentUser} = useContext(UserContext);
    const loginCurrentUser = () => {
        const user = {
            login,
            role: 'user'
        };
        // Сохраняем информацию о пользователе в localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        setCurrentUser(user);
        onClose();
    }

    const handleLogin = (e) => {
        e.preventDefault();
        loginCurrentUser()

    };

    const handleRegister = (e) => {
        e.preventDefault();
        loginCurrentUser()
    };


    return (
        <>
            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={onClose}>&times;</span>
                        <h2>{(mode === 'login') ? "Вход" : "Регистрация"}</h2>
                        <form onSubmit={(mode === 'login') ? handleLogin : handleRegister}>
                            <div className="form-group">
                                <label htmlFor="login">Логин:</label>
                                <input
                                    type="text"
                                    id="login"
                                    value={login}
                                    onChange={(e) => setLogin(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Пароль:</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit">{(mode === 'login') ? "Войти" : "Зарегистрироваться"}</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
