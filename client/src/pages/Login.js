import React, { useState, useContext } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (data.success) {
        alert(data.message);
        setAuth({
          ...auth,
          user: data.user,
          token: data.token,
        });
        localStorage.setItem("auth", JSON.stringify(data));
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong while logging in");
    }
  };
  return (
    <Layout>
      <div className="w-full h-full">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-semibold text-cyan-500 text-center py-10">
            Login
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 items-center"
          >
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              required
              className="w-[35%] px-6 py-2 bg-gray-700 rounded-md border-none outline-none cursor-pointer"
            />
            <input
              type="password"
              name="password"
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-[35%] px-6 py-2 bg-gray-700 rounded-md border-none outline-none cursor-pointer"
            />
            <button
              type="submit"
              className="bg-cyan-500 text-lg px-6 py-2 rounded-md"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
