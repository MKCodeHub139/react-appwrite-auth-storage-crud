import React, { useState } from 'react'
import { databases, ID } from '../lib/appwrite'
import { useNavigate } from 'react-router-dom'

const AddData = () => {
    // Database Id -688228f9003a372767b6
    // collection id -68822925000f57ece305
    const [title,setTitle] =useState('')
    const [desc,setDesc] =useState('')
    const navigate =useNavigate()
    const addData =async (e)=>{
        e.preventDefault()
        
        databases.createDocument(
            '688228f9003a372767b6',
            '68822925000f57ece305',
            ID.unique(),
            {
                title:title,
                desc:desc,
            }
        ).then((res)=>navigate('/Dashboard'))

    }
  return (
    <div className='p-9'>
        <h2 className='text-4xl'>Add Data</h2>
          <form action="" className='flex flex-col w-1/2 gap-2 mt-9' onSubmit={addData}>
            <label htmlFor="">Title</label>
            <input type="text" name="" id="" placeholder='Title' className='px-2 border-1' value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <label htmlFor="">Description</label>
            <input type="text" name="" id="" placeholder='Description' className='px-2 border-1'value={desc} onChange={(e)=>setDesc(e.target.value)}/>
            <button type="submit" className='w-[200px] bg-gray-500 mt-3 py-2 cursor-pointer hover:bg-gray-400'>Add Data</button>
          </form>
    </div>
  )
}

export default AddData