import React from 'react'
import './Header.scss'
import logo from "../../images/yourPC_logo.png"
function Header() {
    return(
        <header className="header">
            <a href="/main">
                <img src={logo} alt="logo Your PC" className="logo"/>
            </a>
            <div className="buttons">
                <button><a href="/create">Создай свой ПК!</a></button>
                <button><a href="/profile">Профиль</a></button>
                <button>Вход</button>
                <button>Регистрация</button>
            </div>
        </header>
    )
}

export default Header
