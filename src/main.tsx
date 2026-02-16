import {Route, Routes, BrowserRouter} from "react-router-dom"
import ReactDOM from "react-dom/client";
import App from './App.tsx'
import {Login} from './components/Login.tsx';
import { Register } from './components/Register.tsx';
import './index.css'
import React from 'react'
import { Profile } from './components/Profile.tsx';

const savedTheme = localStorage.getItem("note-app-color-theme") === "dark"
const savedFont = localStorage.getItem("note-app-font-theme") || "sans"
if (savedTheme) document.documentElement.classList.add("dark")
else document.documentElement.classList.remove("dark")
document.body.classList.add(`font-${savedFont}`)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<App/>} ></Route>
          <Route path='/login' element={<Login/>} ></Route>
          <Route path='/Register' element={<Register/>} ></Route>
          <Route path='/Profile' element = {<Profile/>}/>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
