"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { signIn } from "next-auth/react";

export default function LoginUser() {
  const [loginForm, setLoginForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email: loginForm.email,
      password: loginForm.password,
      redirect: false,
    });

    if (result?.error) {
      console.error("Login failed:", result.error);
    } else {
      console.log("Login successful");
      window.location.href = "/dashboard";
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <h2>Login</h2>

      <input
        type="email"
        name="email"
        value={loginForm.email}
        onChange={handleOnChange}
        placeholder="Enter email"
        required
      />

      <input
        type="password"
        name="password"
        value={loginForm.password}
        onChange={handleOnChange}
        placeholder="Enter password"
        required
      />

      <button type="submit">Login</button>
    </form>
  );
}
