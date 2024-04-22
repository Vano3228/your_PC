import './App.css';
import React from 'react'
import {Routes, Route, BrowserRouter} from "react-router-dom"
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MainPage from "./components/MainPage/MainPage";
import CreateForm from "./components/CreateForm/CreateForm";
import ProfilePage from "./components/ProfilePage/ProfilePage";

function App() {
    const pc = {
        title: 'Домашний ПК',
        description: 'Какое-то описание',
        type: 'home',
        cpu: '1',
        gpu: '2',
        ram: '1',
        case: '2',
        powerSupply: '2',
        cpuCooler: '1',
        hardDrive: '2',
        motherboard: '1'
    }
  return (
      <BrowserRouter>
          <div className="App">
              <Header/>
              <Routes>
                  <Route element={<CreateForm pc={pc}/>} path='create'/>
                  <Route element={<ProfilePage />} path='profile'/>
                  <Route element={<MainPage />} path='*'/>
              </Routes>
              <Footer/>
          </div>
      </BrowserRouter>
  );
}

export default App;
