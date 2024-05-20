import React, {useState, useContext} from 'react'
import './Header.scss'
import logo from "../../images/yourPC_logo.png"
import Modal from "./Modal/Modal";
import {UserContext} from "../../App"
import {NavLink} from "react-router-dom";
function Header() {
    const [registerModal, setRegisterModal] = useState(false)
    const [loginModal, setLoginModal] = useState(false)
    const {currentUser, setCurrentUser, setSelectPC, setCreateFormMode} = useContext(UserContext)
    return(
        <header className="header">
            <NavLink to={"main"}>
                <img src={logo} alt="logo Your PC" className="logo"/>
            </NavLink>
            <div className="buttons">
                {currentUser && <NavLink to={'/create'}>
                    <button onClick={()=>{
                    setSelectPC({})
                    setCreateFormMode('create')
                }}>
                        Создай свой ПК!
                    </button>
                </NavLink>}
                {currentUser && <NavLink to={'/guide'}>
                    <button>
                        Руководство по сборке
                    </button>
                </NavLink>}
                {currentUser && <NavLink to={'/profile'}>
                    <button>
                        Профиль
                    </button>
                </NavLink>}
                {currentUser && <NavLink to={'/main'}>
                    <button onClick={()=>{
                        setCurrentUser(null)
                        localStorage.removeItem('currentUser')}
                    }>
                        Выйти
                    </button>
                </NavLink>}
                {!currentUser && <button onClick={()=>{
                    setLoginModal(true)}
                } >Вход</button>}
                {!currentUser && <button onClick={()=>{
                    setRegisterModal(true)
                }
                }>Регистрация</button>}
            </div>
            <Modal
                isOpen={registerModal}
                onClose={() => setRegisterModal(false)}
                title={"Регистрация"}
                buttonText={"Зарегистрироваться"}
                mode={"register"}
            />
            <Modal
                isOpen={loginModal}
                onClose={() => setLoginModal(false)}
                title={"Вход"}
                buttonText={"Войти"}
                mode={"login"}
            />
        </header>
    )
}

export default Header
