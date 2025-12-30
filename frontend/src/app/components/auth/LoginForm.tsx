"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { login } from "../../services/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { typeGuard } from "@/app/utils/utils";

export default function LoginForm() {
  const [credentials, setCredentials] = useState(""); //Email or username
  const [password, setPassword] = useState("");
  const [emptyFields, setEmptyFields] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { loginUser } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Log in clicked.");
    e.preventDefault();
    setError("");
    setSuccess("");

    if (credentials.trim() == "" || password.trim() == "") {
      setEmptyFields(true);
      return;
    }

    //Verify a valid email address. Perhaps in could be done with regular expressions instead.
    if (credentials.includes("@")) {
      if (
        !(
          credentials.includes("@gmail.com") ||
          credentials.includes("@hotmail.com") ||
          credentials.includes("@outlook.es") ||
          credentials.includes("@email.com")
        )
      ) {
        alert("Please enter a valid email address.");
        return;
      }
    } else if (credentials.length < 1) {
      alert("Please enter a valid username address.");
      return;
    }

    try {
      const user = await login(credentials, password);

      typeGuard(
        user,
        () => {
          router.push("/");
          loginUser(user);
        },
        () => {
          router.push("/organizer");
          loginUser(user);
        }
      );

      setSuccess(`Log in successful`);
    } catch (err: any) {
      setError(err.message);
      alert("Email or password is incorrect.");
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
        <span className="title">TicketHub</span>
      </div>
      <hr className="w-30 mb-5 border-2 border-yellow" />

      <form className="flex flex-col">
        <div className="flex items-center mb-5">
          <Image src="/icons/login.svg" alt="Log In" width={40} height={20} />
          <span className="text-3xl font-bold text-blue ml-2">Log In</span>
        </div>
        {emptyFields ? (
          <span className="text-red-500 pb-2">
            Email or password cannot be empty!
          </span>
        ) : null}
        <label className="inputLabel">Username or email address</label>
        <input
          id="emailInput"
          type="text"
          placeholder="Username / Email"
          className="inputForm"
          value={credentials}
          onChange={(e) => {
            setEmptyFields(false);
            setCredentials(e.target.value);
          }}
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
          id="passwordInput"
          type="password"
          placeholder="Password"
          className="inputForm"
          onChange={(e) => {
            setEmptyFields(false);
            setPassword(e.target.value);
          }}
        />
        <button
          onClick={handleSubmit}
          type="submit"
          className="inputOk growButton"
          value={password}
        >
          Log In
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
