import React from 'react'
import {account} from '../lib/appwrite'
import { useNavigate } from 'react-router-dom'
const Logout = () => {
  const navigate =useNavigate()
    try {
        const response =account.deleteSessions()
        .then(()=>console.log('logout')).then(()=>navigate('/'))
    } catch (error) {
        console.log(error)
    }
  return (
    <div>Logout</div>
  )
}

export default Logout