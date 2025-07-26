import React, { useEffect, useState } from "react";
import { account, databases, ID, storage } from "../lib/appwrite";
import { Link, useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const [data, setData] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const response = account
      .get()
      .then((user) => {
        setUserData(user);
        setIsLogin(true);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLogin(false);
        setIsLoading(false);
      });
  }, []);
  useEffect(() => {
    if (!isLogin && !isLoading) {
      navigate("/");
    }
  }, [isLogin, navigate, isLoading]);
  useEffect(() => {
    if (isLogin) {
      const getData = databases
        .listDocuments(
          import.meta.env.VITE_Database_Id,
          import.meta.env.VITE_Collection_Id
        )
        .then((data) => setData(data));
    }
  }, [isLogin]);

  const deleteData = (id, imgId) => {
    databases
      .deleteDocument(
        import.meta.env.VITE_Database_Id,
        import.meta.env.VITE_Collection_Id,
        id
      )
      .then(() => alert("task deleted successfully"));
    storage.deleteFile(import.meta.env.VITE_Bucket_Id, imgId);
  };

  if (!isLogin) return null;
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="p-9">
      <div className="header flex justify-between gap-9 bg-gray-100 p-3 ">
        <p>Logged in as {userData.name}</p>
        <button className="border-2 px-3 cursor-pointer">
          <Link to="/logout">logout</Link>
        </button>
      </div>
      <div className="w-full flex justify-end">
        <Link
          to="/add"
          className="bg-blue-600 text-white px-11 py-2 mt-7 hover:bg-blue-500"
        >
          + Add Data
        </Link>
      </div>
      <div className="list mt-9">
        {data?.documents?.length > 0 &&
          data.documents.map((item) => {
            return (
              <div key={item.$id}>
                <div className="flex justify-between w-full mt-2 bg-gray-200 p-2 gap-3">
                  <p className="title">{item.title}</p>
                  <p className="desc">{item.desc}</p>
                  <img
                    src={storage.getFileView(
                      import.meta.env.VITE_Bucket_Id,
                      item.img_id
                    )}
                    alt=""
                    width={100}
                  />
                  <div className="actions flex gap-2">
                    <Link
                      to={`/edit?id=${item.$id}`}
                      className="edit cursor-pointer bg-blue-500 text-white px-2 py-1 rounded flex items-center"
                    >
                      Edit
                    </Link>
                    <button
                      className="delete  text-white cursor-pointer bg-red-400 px-2"
                      onClick={() => deleteData(item.$id, item.img_id)}
                    >
                      delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Dashboard;
