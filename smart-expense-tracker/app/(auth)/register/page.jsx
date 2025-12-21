"use client";
import { useState } from "react";
import axios from "axios";

export default function RegisterUser() {
  const [userform, setuserform] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleonsubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/api/user/register",
        userform,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response.data);
      setuserform({ name: "", email: "", password: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const handleonchange = (e) => {
    setuserform((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleonsubmit}>
      <input
        type="text"
        name="name"
        value={userform.name}
        onChange={handleonchange}
        placeholder="enter the name"
      />

      <input
        type="email"
        name="email"
        value={userform.email}
        onChange={handleonchange}
        placeholder="enter the email"
      />

      <input
        type="password"
        name="password"
        value={userform.password}
        onChange={handleonchange}
        placeholder="enter the password"
      />

      <button type="submit">Submit</button>
    </form>
  );
}
