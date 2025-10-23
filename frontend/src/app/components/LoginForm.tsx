"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { login } from "../services/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { loginUser } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Log in clicked.");
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const user = await login(email, password);
      loginUser(user);
      router.push('/');
      setSuccess(`Log in successful`);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white relative top-30 left-30 w-120 h-fit rounded-2xl p-10">
      <div className="flex items-center mb-5">
        <Image
          src="/logos/evantLogo.png"
          alt="Main Logo"
          width={60}
          height={40}
          priority
        />
        <span className="title">Evant</span>
      </div>
      <hr className="w-30 mb-5 border-2 border-yellow" />
      <form className="flex flex-col">
        <div className="flex items-center mb-5">
          <Image src="/icons/login.svg" alt="Log In" width={40} height={20} />
          <span className="text-3xl font-semibold text-blue ml-2">Sign In</span>
        </div>
        <label className="inputLabel">Username or email address</label>
        <input
          type="text"
          placeholder="Username / Email"
          className="inputForm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative mb-1">
          <label className="inputLabel">Password</label>
          <Link
            href="/passwordreset"
            className="hover:underline text-end text-darker-blue absolute top-0 right-0"
          >
            Forgot password?
          </Link>
        </div>
        <input
          type="password"
          placeholder="Password"
          className="inputForm"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          type="submit"
          className="inputOk"
          value={password}
        >
          Sign In
        </button>
      </form>
      <div className="flex flex-row justify-center mt-8">
        <span>New to Evant?</span>
        <Link
          href="/signup"
          className="hover:underline text-end text-darker-blue pl-1"
        >
          Create an account
        </Link>
      </div>
    </div>
  );
}
