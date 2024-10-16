import React, { useState } from "react";
import { registerUser, loginUser } from "../api";

const Auth = ({ setToken }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await loginUser(formData);
        console.log(res);
        if (res.status === 200) {
          setToken(res.data.token);
        }
      } else {
        console.log("something is wrorng");
        await registerUser(formData);
        alert("User registered successfully! Please log in.");
        setIsLogin(true); // Switch to login after registration
      }
    } catch (err) {
      setError("Error occurred during authentication.");
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
        <button type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Switch to Register" : "Switch to Login"}
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Auth;
