import { ID } from 'appwrite'
import React, { useEffect, useState }  from 'react'
import { useSearchParams ,useNavigate} from 'react-router-dom'
import { databases } from '../lib/appwrite'

const EditData = () => {
    const [searchParam] =useSearchParams()
    const [title,setTitle] =useState('')
    const [desc,setDesc] =useState('')
    useEffect(()=>{
      databases.getDocument(
        '688228f9003a372767b6',
        '68822925000f57ece305',
        dataId,
      ).then((data)=>{
        setTitle(data.title)
        setDesc(data.desc)
      })
    },[])
    const dataId =searchParam.get('id')
        const navigate =useNavigate()
    const editData =(e)=>{
      e.preventDefault()
      databases.updateDocument(
          '688228f9003a372767b6',
            '68822925000f57ece305',
            dataId,{
              title:title,
              desc:desc
            }
      ).then(()=>navigate('/Dashboard'))
    }
    
  return (
    <div className='p-9'>
         <h2 className='text-4xl'>Edit Data</h2>
          <form action="" className='flex flex-col w-1/2 gap-2 mt-9' onSubmit={editData}>
            <label htmlFor="">Title</label>
            <input type="text" name="" id="" placeholder='Title' className='px-2 border-1' value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <label htmlFor="">Description</label>
            <input type="text" name="" id="" placeholder='Description' className='px-2 border-1'value={desc} onChange={(e)=>setDesc(e.target.value)}/>
            <button type="submit" className='w-[200px] bg-gray-500 mt-3 py-2 cursor-pointer hover:bg-gray-400'>Eit Data</button>
          </form>
    </div>
  )
}

export default EditData