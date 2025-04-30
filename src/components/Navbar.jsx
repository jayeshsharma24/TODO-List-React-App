import { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-300 p-3">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="https://img.icons8.com/?size=60&id=rnwtSv4H3pXk&format=png&color=000000"
            alt="Logo"
            className="w-10 h-10"
          />
          <span className="text-2xl font-bold">Your's TO-DO</span>
        </div>

        {/* Hamburger menu (small screens) */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-3xl focus:outline-none">
            ☰
          </button>
        </div>

        {/* Nav Links (large screens) */}
        <ul className="hidden md:flex flex-row gap-5 text-2xl">
          <li>
            <button className="h-10 w-20 p-0.5 bg-blue-800 text-amber-50 rounded-[8px] hover:-translate-y-1 hover:shadow-lg transition duration-300 ease-in-out hover:text-black cursor-pointer">
              Home
            </button>
          </li>
          <li>
            <button className="h-10 w-20 p-0.5 bg-blue-800 text-amber-50 rounded-[8px] hover:-translate-y-1 hover:shadow-lg transition duration-300 ease-in-out hover:text-black cursor-pointer">
              About
            </button>
          </li>
          <li>
            <button className="h-10 w-25 p-0.5 bg-blue-800 text-amber-50 rounded-[8px] hover:-translate-y-1 hover:shadow-lg transition duration-300 ease-in-out hover:text-black cursor-pointer">
              Contact
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile menu (toggle) */}
      {isOpen && (
        <ul className="md:hidden mt-4 flex flex-col gap-3 text-lg">
          <li>
            <button className="w-full bg-blue-800 text-amber-50 rounded-md py-2 hover:bg-blue-700">Home</button>
          </li>
          <li>
            <button className="w-full bg-blue-800 text-amber-50 rounded-md py-2 hover:bg-blue-700">About</button>
          </li>
          <li>
            <button className="w-full bg-blue-800 text-amber-50 rounded-md py-2 hover:bg-blue-700">Contact</button>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
