import React, { useState } from "react";
import { account, ID } from "../lib/appwrite";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      const response = account
        .create(ID.unique(), email, password, name)
        .then(() => alert("registered successful "))
        .then(() => {
            account.createEmailPasswordSession(email,password)}).then(()=>navigate('/Dashboard'));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-[100vw] flex flex-col p-9">
      <h2 className="text-4xl">Register</h2>
      <form
        action=""
        className="flex flex-col justify-center w-1/2 gap-2 mt-9"
        onSubmit={register}
      >
        <label htmlFor="">Name</label>
        <input
          type="text"
          name=""
          id=""
          placeholder="Name"
          className="border-1 px-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="">email</label>
        <input
          type="email"
          name=""
          id=""
          placeholder="Example@email.com"
          className="border-1 px-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="">password</label>
        <input
          type="password"
          name=""
          id=""
          placeholder="Password"
          className="border-1 px-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-gray-500 text-white hover:bg-gray-400 py-1 mt-3 px-3 w-[200px]"
        >
          Register
        </button>
        <label htmlFor="" className="text-red-600">
          Already have an account?{" "}
          <Link to="/" className="underline cursor-pointer">
            Login
          </Link>
        </label>
      </form>
    </div>
  );
};

export default Register;
