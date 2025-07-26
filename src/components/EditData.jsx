import React, { useEffect, useState }  from 'react'
import { useSearchParams ,useNavigate} from 'react-router-dom'
import { databases, storage,ID } from '../lib/appwrite'

const EditData = () => {
    const [searchParam] =useSearchParams()
    const [title,setTitle] =useState('')
    const [desc,setDesc] =useState('')
    const [imgId, setImgId] =useState('')
    const [file,setFile] =useState(null)
    const dataId =searchParam.get('id')
    const navigate =useNavigate()
  
    useEffect(()=>{
      databases.getDocument(
        import.meta.env.VITE_Database_Id,
        import.meta.env.VITE_Collection_Id,
        dataId,
      ).then((data)=>{
        setTitle(data.title)
        setDesc(data.desc)
        setImgId(data.img_id)
      })
    },[])
    const editData =async (e)=>{
      e.preventDefault()
      let updatedImgId = imgId;
      if(file){
        await storage.deleteFile(import.meta.env.VITE_Bucket_Id,imgId)
        const imgRes =await storage.createFile(import.meta.env.VITE_Bucket_Id,ID.unique(),file);
       updatedImgId =imgRes.$id
      }
      databases.updateDocument(
          import.meta.env.VITE_Database_Id,
            import.meta.env.VITE_Collection_Id,
            dataId,{
              title:title,
              desc:desc,
              img_id:updatedImgId,

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
            <img src={storage.getFileView(import.meta.env.VITE_Bucket_Id,imgId)} alt="" width={100}/>
            <input type="file" name="image" onChange={(e)=>setFile(e.target.files[0])} id=""  className='cursor-pointer'/>
            <button type="submit" className='w-[200px] bg-gray-500 mt-3 py-2 cursor-pointer hover:bg-gray-400'>Eit Data</button>
          </form>
    </div>
  )
}

export default EditData