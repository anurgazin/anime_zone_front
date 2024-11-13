"use client";
import { useState } from "react";
import Link from 'next/link'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-orange-400 bg-opacity-95 w-full lg:h-[64px] p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-anton tracking-widest">
          <Link href="/">ANIME ZONE</Link>
        </div>

        <div className="hidden md:flex space-x-6 font-antonio text-white tracking-wide">
          <Link href="/anime" className="hover:text-white">Anime</Link>
          <Link href="/characters" className="hover:text-white">Characters</Link>
          <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
          <Link href="/about" className="hover:text-white">About</Link>
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`${isOpen ? "block" : "hidden"
          } md:hidden mt-2 space-y-2 text-white font-antonio`}
      >
        <Link href="/anime" className="block">
          Anime
        </Link>
        <Link href="/characters" className="block">
          Characters
        </Link>
        <Link href="/dashboard" className="block">
          Dashboard
        </Link>
        <Link href="/about" className="block">
          About
        </Link>
      </div>
    </nav>
  );
}
