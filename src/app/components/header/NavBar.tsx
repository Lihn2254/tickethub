import Link from "next/link";


export default function NavBar() {
  return (
    <nav>
      <ul className="flex items-center gap-6 text-md text-gray-600 font-medium">
        <li className="cursor-pointer hover:text-primary transition-colors">
          <Link
            key={'events'}
            href={'/'}
          >
            <p>Events</p>
          </Link>
        </li>
        <li className="cursor-pointer hover:text-primary transition-colors"><Link
            key={'user'}
            href={'/user/tickets'}
          >
            <p>My Tickets</p>
          </Link>
        </li>
        <li className="cursor-pointer hover:text-primary transition-colors"><Link
            key={'about'}
            href={'/about'}
          >
            <p>About Us</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}