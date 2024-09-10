"use client";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 bg-opacity-95 w-full p-4 sticky top-0">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          ANIME ZONE
        </div>

        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-300 hover:text-white">Anime</a>
          <a href="#" className="text-gray-300 hover:text-white">Characters</a>
          <a href="#" className="text-gray-300 hover:text-white">About</a>
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-300 hover:text-white focus:outline-none"
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
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden mt-2 space-y-2`}
      >
        <a href="#" className="block text-gray-300 hover:text-white">
          Anime
        </a>
        <a href="#" className="block text-gray-300 hover:text-white">
          Characters
        </a>
        <a href="#" className="block text-gray-300 hover:text-white">
          About
        </a>
      </div>
    </nav>
  );
}
