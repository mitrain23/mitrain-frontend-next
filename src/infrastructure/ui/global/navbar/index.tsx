'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white drop-shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <a>
            <Image src="/images/logoMitrain.svg" width={60} height={60} alt="logo-mitrain" />
          </a>
        
        <div className="hidden md:flex space-x-4">
            <a className="text-gray-700 hover:text-gray-900">Home</a>
            <a className="text-gray-700 hover:text-gray-900">About</a>
            <a className="text-gray-700 hover:text-gray-900">Contact</a>
        </div>
        
        <div className="md:hidden">
          <button className="text-gray-700 hover:text-gray-900" onClick={handleMenuToggle}>
            &#9776;
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="bg-white md:hidden">
          <div className="container mx-auto px-4 py-2">
              <a className="block text-gray-700 hover:text-gray-900 py-2">Home</a>
              <a className="block text-gray-700 hover:text-gray-900 py-2">About</a>
              <a className="block text-gray-700 hover:text-gray-900 py-2">Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
