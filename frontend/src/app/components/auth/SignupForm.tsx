"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { checkDuplicate, login } from "../../services/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function SignupForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [accountType, setAccountType] = useState("personal"); //personal || organization
  //TODO - No sé si aquí usar useRef en lugar de useState para no provocar un render cada que se cambian estos campos
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState(null); //Can be null on the db
  const [firstLN, setFirstLN] = useState("");
  const [secondLN, setSecondLN] = useState(null); //Can be null on the db
  const [gender, setGender] = useState(null); //Can be null on the db
  const [birthday, setBirthday] = useState(null); //CANNOT be null on the db
  const [phone, setPhone] = useState(null);
  const [isEmailAvaliable, setIsEmailAvaliable] = useState(false);
  const [isUsernameAvaliable, setIsUsernameAvaliable] = useState(false);

  const changeEmail = (email: string) => {
    setEmail(email);
    if (isEmailAvaliable) {
      setIsEmailAvaliable(false);
    }
  };

  const changeUsername = (username: string) => {
    setUsername(username);
    setIsUsernameAvaliable(false);
  };

  const handleEmailSubmit = async () => {
    console.log("Continue clicked.");

    if (
      !(
        email.includes("@gmail.com") ||
        email.includes("@hotmail.com") ||
        email.includes("@outlook.es") ||
        email.includes("@email.com")
      )
    ) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const checkedEmail = await checkDuplicate(email);
      if (!checkedEmail) {
        alert("This email is already in use.");
      }
      setIsEmailAvaliable(checkedEmail);
      setSuccess(`Email checked.`);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleUsernameSubmit = async () => {
    console.log("Continue clicked.");

    try {
      const checkedUsername = await checkDuplicate(username);
      if (!checkedUsername) {
        alert("This username is already in use.");
      }
      setIsUsernameAvaliable(checkedUsername);
      setSuccess(`Username checked.`);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleAccountTypeSelection = (origin: string) => {
    origin == "personal"
      ? setAccountType("personal")
      : setAccountType("organization");
  };

  function handleGoBack(): void {
    setIsEmailAvaliable(false);
  }

  const renderCurrentStep = () => {
    if (!isEmailAvaliable && !isUsernameAvaliable) {
      return (
        <EmailInput
          email={email}
          isEmailAvaliable={isEmailAvaliable}
          handleEmailSubmit={handleEmailSubmit}
          changeEmail={changeEmail}
        />
      );
    } else if (isEmailAvaliable && !isUsernameAvaliable) {
      return (
        <>
          <UserInfoInput
            username={username}
            accountType={accountType}
            handleUsernameSubmit={handleUsernameSubmit}
            handleAccountTypeSelection={handleAccountTypeSelection}
            handleGoBack={handleGoBack}
            changeUsername={changeUsername}
          />
        </>
      );
    } else {
      return <PasswordInput/>;
    }
  };

  return (
    <div className="bg-white relative top-30 left-30 w-145 h-fit rounded-2xl p-10">
      <div className="flex items-center mb-5">
        <Image
          src="/logos/evantLogo.png"
          alt="Main Logo"
          width={60}
          height={40}
          priority
        />
        <div className="flex flex-col">
          <span className="title">Welcome to Evant!</span>
          <span className="text-xl text-dark-blue ml-3 pt-1">
            Your gateway to unforgettable events.
          </span>
        </div>
      </div>
      <hr className="w-30 mb-5 border-2 border-yellow" />
      <div className="flex items-center mb-5">
        <Image src="/icons/login.svg" alt="Log In" width={40} height={20} />
        <span className="text-3xl font-bold text-blue ml-2">Sign Up</span>
      </div>
      {renderCurrentStep()}
    </div>
  );
}

interface EmailInputProps {
  email: string;
  isEmailAvaliable: boolean;
  handleEmailSubmit: () => void;
  changeEmail: (email: string) => void;
}

function EmailInput(props: EmailInputProps) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  return (
    <form className="flex flex-col">
      <label className="inputLabel">Email address</label>
      <input
        type="email"
        placeholder="Email"
        className="inputForm"
        onChange={(e) => props.changeEmail(e.target.value)}
      />
      {!props.isEmailAvaliable ? (
        <button
          onClick={props.handleEmailSubmit}
          type="button"
          className="inputOk growButton"
        >
          Continue
        </button>
      ) : null}
    </form>
  );
}

interface UserInfoInputProps {
  username: string;
  accountType: string;
  handleUsernameSubmit: () => void;
  handleAccountTypeSelection: (accountType: string) => void;
  handleGoBack: () => void;
  changeUsername: (username: string) => void;
}

function UserInfoInput(props: UserInfoInputProps) {
  return (
    <div className="flex flex-col">
      <label className="inputLabel">Username</label>
      <input
        type="text"
        placeholder="Username"
        className="inputForm"
        onChange={(e) => props.changeUsername(e.target.value)}
      />
      <div className="pb-1">
        <span className="font-medium">Select your account type</span>
        <div className="flex flex-row border-2 rounded-2xl contain-content mt-2">
          <article
            className={`flex flex-col flex-1 p-3 border-r-1 ${
              props.accountType == "personal" ? "bg-light-yellow" : "bg-white"
            }`}
            onClick={(e) => props.handleAccountTypeSelection("personal")}
          >
            <div className="flex flex-row items-center gap-1">
              <Image
                src="/icons/user_black.svg"
                alt="Go back"
                width={22}
                height={25}
              />
              <span className="font-bold">Personal</span>
            </div>
            <span>Enjoy events, concerts, festivals and more!</span>
          </article>
          <article
            className={`flex flex-col flex-1 p-3 border-l-1 ${
              props.accountType == "organization" ? "bg-light-yellow" : "bg-white"
            }`}
            onClick={(e) => props.handleAccountTypeSelection("organization")}
          >
            <div className="flex flex-row items-center gap-1">
              <Image
                src="/icons/business_black.svg"
                alt="Go back"
                width={22}
                height={25}
              />
              <span className="font-bold">Organization</span>
            </div>
            <span>Organize your own shows for everyone to have fun</span>
          </article>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <button
          type="button"
          className="growButton border-2 border-darker-blue rounded-2xl p-2 font-semibold text-darker-blue mt-4 flex-1 flex flex-row items-center justify-center gap-0.5"
          onClick={(e) => props.handleGoBack()}
        >
          <Image
            src="/icons/go_back_blue.svg"
            alt="Go back"
            width={30}
            height={30}
          />
          <span>Go back</span>
        </button>
        <button type="button" className="inputOk growButton mt-4 flex-3" onClick={props.handleUsernameSubmit}>
          Continue
        </button>
      </div>
    </div>
  );
}

function ClientInput() {

}

function PasswordInput() {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [samePassword, setSamePassword] = useState(true);

  const validatePassword = () => {
    setSamePassword(password == password2);
  };

  return (
    <div className="flex flex-col">
      {!samePassword ? (
        <span className="text-red-500 pb-2">Passwords do not match!</span>
      ) : null}
      <label className="inputLabel">Password</label>
      <input
        type="password"
        placeholder="Password"
        className="inputForm"
        onChange={(e) => setPassword(e.target.value)}
      />
      <label className="inputLabel">Confirm password</label>
      <input
        id="passwordConfirmation"
        type="password"
        placeholder="Password"
        className="inputForm"
        onChange={(e) => setPassword2(e.target.value)}
      />
      <button onClick={validatePassword} type="button" className="inputOk">
        Continue
      </button>
    </div>
  );
}
