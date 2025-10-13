import Image from "next/image";

export default function LoginForm() {
  return (
    <div className="bg-white relative top-25 left-25 w-150 h-150 rounded-2xl p-10">
      <div className="flex items-center mb-5">
        <Image
          src="/evantLogo.png"
          alt="Main Logo"
          width={60}
          height={40}
          priority
        />
        <span className="text-5xl text-blue font-semibold funnel-text ml-2">
          Evant
        </span>
      </div>
      <hr className="w-30 mb-5" />
      <div>
        <input type="text" placeholder="Username / Email" />
        <input type="password" placeholder="Password" />
        <button type="submit"> Sign In</button>
      </div>
    </div>
  );
}
