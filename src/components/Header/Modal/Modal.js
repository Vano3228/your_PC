import React, { useState, useContext } from 'react';
import { UserContext } from "../../../App";
import './Modal.scss';
import axios from "axios";
axios.defaults.headers.post['Content-Type'] = 'application/json';

const Modal = ({ isOpen, onClose, mode }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { setCurrentUser } = useContext(UserContext);
    const [fail, setFail] = useState(false);
    const [alreadyCreate, setAlreadyCreate] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);

    const loginCurrentUser = (userObj) => {
        localStorage.setItem('currentUser', JSON.stringify(userObj));
        setCurrentUser(userObj);
        setLogin('');
        setPassword('');
        setConfirmPassword('');
        setAlreadyCreate(false);
        setFail(false);
        onClose();
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const resp = await axios.post('http://localhost:5000/api/loginUser', {
            login,
            password
        })
        if (resp.data === 'fail') {
            setFail(true);
        } else {
            setFail(false);
            loginCurrentUser(resp.data);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordMismatch(true);
        } else {
            setPasswordMismatch(false);
            const resp = await axios.post('http://localhost:5000/api/users', {
                login,
                password
            });
            if (resp.data === 'alreadyCreate') {
                setAlreadyCreate(true);
            } else {
                loginCurrentUser(resp.data);
                alert('Вы успешно зарегистрировались!');
            }
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        setPasswordMismatch(value !== password);
    }

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
                            {(mode === 'register') && (
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Подтвердите пароль:</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        required
                                    />
                                    {confirmPassword && passwordMismatch && <p style={{ color: "red", marginBottom: "5px", textAlign: 'center'}}>Пароли не совпадают</p>}
                                    {!passwordMismatch && confirmPassword && <p style={{ color: "green", marginBottom: "5px", textAlign: 'center' }}>Пароли совпадают</p>}
                                </div>
                            )}
                            {fail && <p style={{ color: "red", marginBottom: "5px" }}>Неправильный логин или пароль</p>}
                            {alreadyCreate && <p style={{ color: "red", marginBottom: "10px", textAlign: "center" }}>Пользователь с таким логином уже существует</p>}
                            <button type="submit">{(mode === 'login') ? "Войти" : "Зарегистрироваться"}</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
