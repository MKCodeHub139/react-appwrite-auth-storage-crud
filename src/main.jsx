import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import Logout from './components/Logout.jsx'
import Dashboard from './components/Dashboard.jsx'
import AddData from './components/AddData.jsx'
import EditData from './components/EditData.jsx'

const router =createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path=''element={<Login/>}/>
      <Route path='register'element={<Register/>}/>
      <Route path='logout'element={<Logout/>}/>
      <Route path='Dashboard'element={<Dashboard/>}/>
      <Route path='add'element={<AddData/>}/>
      <Route path='/edit'element={<EditData/>}/>

    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
