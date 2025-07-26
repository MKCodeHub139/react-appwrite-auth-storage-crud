import React, { useState } from "react";
import { databases, ID, storage } from "../lib/appwrite";
import { useNavigate } from "react-router-dom";

const AddData = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const addData = async (e) => {
    e.preventDefault();
    const imgRes = await storage.createFile(
      import.meta.env.VITE_Bucket_Id,
      ID.unique(),
      file
    );
    const imgId = imgRes.$id;
    databases
      .createDocument(
        import.meta.env.VITE_Database_Id,
        import.meta.env.VITE_Collection_Id,
        ID.unique(),
        {
          title: title,
          desc: desc,
          img_id: imgId,
        }
      )
      .then((res) => navigate("/Dashboard"));
  };
  return (
    <div className="p-9">
      <h2 className="text-4xl">Add Data</h2>
      <form
        action=""
        className="flex flex-col w-1/2 gap-2 mt-9"
        onSubmit={addData}
      >
        <label htmlFor="">Title</label>
        <input
          type="text"
          name=""
          id=""
          placeholder="Title"
          className="px-2 border-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="">Description</label>
        <input
          type="text"
          name=""
          id=""
          placeholder="Description"
          className="px-2 border-1"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <input
          type="file"
          name="image"
          onChange={(e) => setFile(e.target.files[0])}
          id=""
          className="cursor-pointer"
        />
        <button
          type="submit"
          className="w-[200px] bg-gray-500 mt-3 py-2 cursor-pointer hover:bg-gray-400"
        >
          Add Data
        </button>
      </form>
    </div>
  );
};

export default AddData;
