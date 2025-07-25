import React, { useEffect, useState } from 'react'
import {account, databases, ID} from '../lib/appwrite'
import { Link } from 'react-router-dom'
const Dashboard = () => {
    const [userData,setUserData] =useState({})
    const [data,setData] =useState({})

    useEffect(()=>{
      const response =account.get().then((user)=>setUserData(user))
    },[])
    useEffect(()=>{
      const getData =databases.listDocuments(
        '688228f9003a372767b6',
        '68822925000f57ece305',
      ).then((data)=>setData(data))
    },[])
   
  return (
    <div className='p-9'>
      <div className="header flex justify-between gap-9 bg-gray-100 p-3 ">

        <p>Logged in as {userData.name}</p>
        <button className='border-2 px-3 cursor-pointer'><Link to='/logout'>logout</Link></button>
      </div>
      <div className='w-1/2 flex justify-end'>

      <Link to='/add' className='bg-blue-600 text-white px-11 py-2 mt-7 hover:bg-blue-500'>+ Add Data</Link>
      </div>
      <div className="list mt-9">
        {data?.documents?.length >0 &&(
          data.documents.map((item)=>{
            return(
              <div key={item.$id}>
                <div className='flex justify-between w-1/2 mt-2 bg-gray-200 p-2'>
                  <p className='title'>{item.title}</p>
                  <p className='desc'>{item.desc}</p>
                  <div className="actions flex gap-2">
                   <Link to={`/edit?id=${item.$id}`}className='edit cursor-pointer bg-blue-500 text-white px-2 py-1 rounded'>Edit</Link> 
                    <button className='delete cursor-pointer bg-red-400 px-2' onClick={()=>databases.deleteDocument(
                       '688228f9003a372767b6',
                       '68822925000f57ece305',
                       item.$id
                    ).then(()=>alert('task deleted successfully'))}>delete</button>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
        
    
    </div>
  )
}

export default Dashboard