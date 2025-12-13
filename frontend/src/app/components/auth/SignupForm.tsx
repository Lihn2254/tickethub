"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { checkDuplicate, login, register } from "../../services/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { User } from "@/app/types/user";

export default function SignupForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [accountType, setAccountType] = useState("client"); //client | organizer
  //TODO - No sé si aquí usar useRef en lugar de useState para no provocar un render cada que se cambian estos campos
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState(""); //Can be null on the db
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [phone, setPhone] = useState(""); //Can be null on the db
  const [socials, setSocials] = useState();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isEmailAvaliable, setIsEmailAvaliable] = useState(false);
  const [isUsernameAvaliable, setIsUsernameAvaliable] = useState(false);
  const [isUserInfoOk, setIsUserInfoOk] = useState(false);
  const { loginUser } = useAuth();
  const router = useRouter();

  const changeStringInput = (text: string, type: string) => {
    switch (type) {
      case "email": {
        setEmail(text);
        setIsEmailAvaliable(false);
        break;
      }
      case "username": {
        setUsername(text);
        setIsUsernameAvaliable(false);
        break;
      }
      case "name": {
        setName(text);
        break;
      }
      case "lastname": {
        setLastname(text);
        break;
      }
      case "gender": {
        setGender(text);
        break;
      }
      case "phone": {
        setPhone(text);
        break;
      }
      case "password": {
        setPassword(text);
        break;
      }
      case "password2": {
        setPassword2(text);
        break;
      }
    }
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

    if (!(username.length >= 1)) {
      alert("Please enter a valid username.");
      return;
    }

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

  const handleClientInfoSubmit = () => {
    if (name.length < 1 || lastname.length < 1) {
      alert("Name fields cannot be empty.");
    } else if (gender.length < 1) {
      alert("Please select a gender.");
    } else if (phone.length < 10) {
      alert("Phone must have 10 digits.");
    } else if (birthDate == null) {
      alert("Please select your birth date.");
    } else {
      setIsUserInfoOk(true);
    }
  };

  const handlePasswordSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    let tmpUser: User;

    switch (accountType) {
      case "client": {
        tmpUser = {
          //user
          id: null,
          email: email,
          username: username,
          password: password,
          registrationDate: null,
          //client
          accountType: "client",
          name: name,
          lastname: lastname,
          gender: gender,
          birthDate: birthDate,
          phone: phone,
        };
        break;
      }
      case "organizer": {
        tmpUser = {
          //user
          id: null,
          email: email,
          username: username,
          password: password,
          registrationDate: null,
          //organizer
          accountType: "organizer",
          name: name,
          socials: [], // TODO
        };
        break;
      }
      default: {
        console.error("User type could be determined.");
        return;
      }
    }

    try {
      const newUser = await register(tmpUser);
      if (newUser.accountType == "client") {
        loginUser(newUser);
        router.push("/");
      } else if (newUser.accountType == "organizer") {
        loginUser(newUser);
        router.push("/");
      }
      setSuccess('Sign up successful')
    } catch (error: any) {
      setError(error.message);
      alert("Something went wrong. The new account could not be registered.");
    }
  };

  const handleAccountTypeSelection = (origin: string) => {
    origin == "client" ? setAccountType("client") : setAccountType("organizer");
  };

  const handleGoBack = (origin: string) => {
    if (origin == "user") {
      setEmail("");
      // setUsername("");
      // setAccountType("");
      setIsEmailAvaliable(false);
    } else if (origin == "client" || origin == "organizer") {
      setUsername("");
      // setName("");
      // setLastname("");
      // setGender("");
      // setBirthDate(null);
      // setPhone("");
      setIsUsernameAvaliable(false);
      setIsUserInfoOk(false);
    } else if (origin == "password") {
      setPassword("");
      setPassword2("");
      setIsUserInfoOk(false);
    }
  };

  const renderCurrentStep = () => {
    if (!isEmailAvaliable && !isUsernameAvaliable) {
      return (
        <EmailInput
          email={email}
          isEmailAvaliable={isEmailAvaliable}
          handleEmailSubmit={handleEmailSubmit}
          changeEmail={changeStringInput}
        />
      );
    } else if (isEmailAvaliable && !isUsernameAvaliable) {
      return (
        <UserInfoInput
          username={username}
          accountType={accountType}
          handleUsernameSubmit={handleUsernameSubmit}
          handleAccountTypeSelection={handleAccountTypeSelection}
          handleGoBack={handleGoBack}
          changeUsername={changeStringInput}
        />
      );
    } else if (accountType == "client" && !isUserInfoOk) {
      return (
        <ClientInput
          name={name}
          lastname={lastname}
          gender={gender}
          birthDate={birthDate}
          phone={phone}
          handleClientInfoSubmit={handleClientInfoSubmit}
          handleGoBack={handleGoBack}
          changeStringInput={changeStringInput}
          changeDate={(date: Date) => setBirthDate(date)}
        />
      );
    } else if (accountType == "organizer" && !isUserInfoOk) {
      //TODO
    } else if (isUserInfoOk) {
      return (
        <PasswordInput
          password={password}
          password2={password2}
          handleGoBack={handleGoBack}
          handlePasswordSubmit={handlePasswordSubmit}
          changePassword={changeStringInput}
        />
      );
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
          <span className="title">Welcome to TicketHub!</span>
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
  changeEmail: (email: string, type: string) => void;
}

function EmailInput(props: EmailInputProps) {
  return (
    <form className="flex flex-col">
      <label className="inputLabel">Email address</label>
      <input
        type="email"
        placeholder="Email"
        className="inputForm"
        onChange={(e) => props.changeEmail(e.target.value, "email")}
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
  handleGoBack: (origin: string) => void;
  changeUsername: (username: string, type: string) => void;
}

function UserInfoInput(props: UserInfoInputProps) {
  return (
    <div className="flex flex-col">
      <label className="inputLabel">Username</label>
      <input
        type="text"
        placeholder="Username"
        className="inputForm"
        onChange={(e) =>
          props.changeUsername(e.target.value.toLowerCase(), "username")
        }
      />
      <div className="pb-1">
        <span className="font-medium">Select your account type</span>
        <div className="flex flex-row border-2 rounded-2xl contain-content mt-2">
          <article
            className={`flex flex-col flex-1 p-3 border-r-1 ${
              props.accountType == "client" ? "bg-light-yellow" : "bg-white"
            }`}
            onClick={(e) => props.handleAccountTypeSelection("client")}
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
              props.accountType == "organizer" ? "bg-light-yellow" : "bg-white"
            }`}
            onClick={(e) => props.handleAccountTypeSelection("organizer")}
          >
            <div className="flex flex-row items-center gap-1">
              <Image
                src="/icons/business_black.svg"
                alt="Go back"
                width={22}
                height={25}
              />
              <span className="font-bold">Organizer</span>
            </div>
            <span>Organize your own shows for everyone to have fun</span>
          </article>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <button
          type="button"
          className="growButton border-2 border-darker-blue rounded-2xl p-2 font-semibold text-darker-blue mt-4 flex-1 flex flex-row items-center justify-center gap-0.5"
          onClick={(e) => props.handleGoBack("user")}
        >
          <Image
            src="/icons/go_back_blue.svg"
            alt="Go back"
            width={30}
            height={30}
          />
          <span>Go back</span>
        </button>
        <button
          type="button"
          className="inputOk growButton mt-4 flex-3"
          onClick={(e) => props.handleUsernameSubmit()}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

interface ClientInputProps {
  name: string;
  lastname: string;
  gender: string;
  birthDate: Date | null;
  phone: string;
  handleGoBack: (origin: string) => void;
  handleClientInfoSubmit: () => void;
  changeStringInput: (value: string, type: string) => void;
  changeDate: (date: Date) => void;
}

function ClientInput(props: ClientInputProps) {
  const handlePhoneChange = (inputValue: string) => {
    const justDigits = inputValue.replace(/\D/g, "");
    const limitedDigits = justDigits.slice(0, 10);
    props.changeStringInput(limitedDigits, "phone");
  };

  return (
    <div>
      <form className="flex flex-col">
        {/* Name and lastname */}
        <div className="flex flex-row justify-around gap-8">
          <div className="flex flex-col flex-1">
            <label className="inputLabel">Name</label>
            <input
              type="text"
              placeholder="Name"
              className="inputForm"
              onChange={(e) => props.changeStringInput(e.target.value, "name")}
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="inputLabel">Lastname</label>
            <input
              type="text"
              placeholder="Lastname"
              className="inputForm"
              onChange={(e) =>
                props.changeStringInput(e.target.value, "lastname")
              }
            />
          </div>
        </div>

        {/* Gender selector */}
        <div className="flex flex-col w-fit mt-2">
          <label className="inputLabel">Gender</label>
          <select
            className="inputForm"
            onChange={(e) => props.changeStringInput(e.target.value, "gender")}
          >
            <option value="" defaultValue="disabled">
              Select gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex flex-row justify-around gap-8 mt-2">
          {/* Birth date selector */}
          <div className="flex flex-col flex-1">
            <label className="inputLabel">Birth Date</label>
            <input
              type="date"
              className="inputForm"
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => props.changeDate(new Date(e.target.value))}
            />
          </div>

          {/* Phone input */}
          <div className="flex flex-col flex-1">
            <label className="inputLabel">Phone</label>
            <input
              type="tel"
              placeholder="e.g., 667-123-4567"
              className="inputForm"
              value={props.phone ?? ""}
              onChange={(e) => handlePhoneChange(e.target.value)}
            />
          </div>
        </div>
      </form>
      <div className="flex flex-row gap-4">
        <button
          type="button"
          className="growButton border-2 border-darker-blue rounded-2xl p-2 font-semibold text-darker-blue mt-4 flex-1 flex flex-row items-center justify-center gap-0.5"
          onClick={(e) => props.handleGoBack("client")}
        >
          <Image
            src="/icons/go_back_blue.svg"
            alt="Go back"
            width={30}
            height={30}
          />
          <span>Go back</span>
        </button>
        <button
          type="button"
          className="inputOk growButton mt-4 flex-3"
          onClick={props.handleClientInfoSubmit}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

interface PasswordInputProps {
  password: string;
  password2: string;
  handleGoBack: (origin: string) => void;
  handlePasswordSubmit: (
    e: React.MouseEvent<HTMLButtonElement>
  ) => Promise<void>;
  changePassword: (password: string, type: string) => void;
}

function PasswordInput(props: PasswordInputProps) {
  const [samePassword, setSamePassword] = useState(true);

  const validatePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSamePassword(props.password == props.password2);
    if (samePassword) {
      props.handlePasswordSubmit(e);
    }
  };

  return (
    <div className="flex flex-col">
      {!samePassword ? (
        <span className="text-red-500 pb-2">Passwords do not match!</span>
      ) : null}
      <form className="flex flex-col">
        <label className="inputLabel">Password</label>
        <input
          type="password"
          placeholder="Password"
          className="inputForm"
          onChange={(e) => props.changePassword(e.target.value, "password")}
        />
        <label className="inputLabel">Confirm password</label>
        <input
          id="passwordConfirmation"
          type="password"
          placeholder="Password"
          className="inputForm"
          onChange={(e) => props.changePassword(e.target.value, "password2")}
        />
      </form>
      <div className="flex flex-row gap-4">
        <button
          type="button"
          className="growButton border-2 border-darker-blue rounded-2xl p-2 font-semibold text-darker-blue mt-4 flex-1 flex flex-row items-center justify-center gap-0.5"
          onClick={(e) => props.handleGoBack("password")}
        >
          <Image
            src="/icons/go_back_blue.svg"
            alt="Go back"
            width={30}
            height={30}
          />
          <span>Go back</span>
        </button>
        <button
          type="button"
          className="inputOk growButton mt-4 flex-3"
          onClick={(e) => validatePassword(e)}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
