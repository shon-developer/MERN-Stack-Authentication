import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  // function to handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/auth/signup", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data.success) {
        alert(data.message);
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong while signing up");
    }
  };
  return (
    <Layout>
      <div className="w-full h-full">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center py-10">
          <h1 className="text-3xl text-cyan-500">SignUp</h1>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center gap-6 py-10"
          >
            <input
              className="w-[35%] px-6 py-2 bg-gray-700 rounded-md border-none outline-none cursor-pointer"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-[35%] px-6 py-2 bg-gray-700 rounded-md border-none outline-none cursor-pointer"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-[35%] px-6 py-2 bg-gray-700 rounded-md border-none outline-none cursor-pointer"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="w-[35%] px-6 py-2 bg-gray-700 rounded-md border-none outline-none cursor-pointer"
              type="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              className="w-[35%] px-6 py-2 bg-gray-700 rounded-md border-none outline-none cursor-pointer"
              type="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <button
              type="submit"
              className="bg-cyan-500 text-lg rounded-md text-black px-6 py-2"
            >
              SignUp
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
