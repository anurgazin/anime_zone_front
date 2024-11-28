"use client";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const Lists = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer hover:text-orange-300">
          Lists
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-orange-400 text-white font-antonio">
          <DropdownMenuItem>
            <Link href="/list/anime">Anime Lists</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/list/characters">Characters Lists</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <nav className="bg-orange-400 bg-opacity-95 w-full lg:h-[64px] p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand */}
        <div className="text-white text-2xl font-anton tracking-widest">
          <Link href="/">ANIME ZONE</Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 font-antonio text-white tracking-wide">
          <Link href="/anime" className="hover:text-orange-300">
            Anime
          </Link>
          <Link href="/characters" className="hover:text-orange-300">
            Characters
          </Link>
          <Link href="/dashboard" className="hover:text-orange-300">
            Dashboard
          </Link>
          <Lists />
          <Link href="/about" className="hover:text-orange-300">
            About
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none hover:text-orange-300"
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

      {/* Mobile Navigation */}
      <div
        className={`${isOpen ? "block" : "hidden"
          } md:hidden mt-2 space-y-2 text-white font-antonio`}
      >
        <Link href="/anime" className="block hover:text-orange-300">
          Anime
        </Link>
        <Link href="/characters" className="block hover:text-orange-300">
          Characters
        </Link>
        <Link href="/dashboard" className="block hover:text-orange-300">
          Dashboard
        </Link>
        <Lists />
        <Link href="/about" className="block hover:text-orange-300">
          About
        </Link>
      </div>
    </nav>
  );
}
