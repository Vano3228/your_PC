import './App.css';
import React from 'react'
import {Routes, Route, BrowserRouter} from "react-router-dom"
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MainPage from "./components/MainPage/MainPage";
import CreateForm from "./components/CreateForm/CreateForm";
import ProfilePage from "./components/ProfilePage/ProfilePage";

function App() {
  return (
      <BrowserRouter>
          <div className="App">
              <Header/>
              <Routes>
                  <Route element={<CreateForm />} path='create'/>
                  <Route element={<ProfilePage />} path='profile'/>
                  <Route element={<MainPage />} path='*'/>
              </Routes>
              <Footer/>
          </div>
      </BrowserRouter>
  );
}

export default App;
