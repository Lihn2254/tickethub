import Image from 'next/image';
import Link from 'next/link';
import NavBar from './NavBar';
import AccountDropDown from '../AccountDropDown';

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/">
          <Image
            src="/tempLogo.png"
            alt="Main Logo"
            width={60}
            height={40}
            priority
          />
        </Link>
        
        <div className="hidden md:flex">
          <NavBar />
        </div>
        
        <AccountDropDown />
      </div>
    </header>
  );
}