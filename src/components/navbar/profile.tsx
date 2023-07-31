'use client'


import React, { useState } from 'react';
import Cookies from 'js-cookie';




const Profile = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            Cookies.remove('token')
            // localStorage.removeItem('token');
            window.location.reload(); 
            handleClick();
        }
    }


    return (
        <div className="relative">
            <button
                className="border-none"
                onClick={handleClick}
            >
                {/* Add your image here */}
                <img className='rounded-full bg-cover w-10' src="https://randomuser.me/api/portraits/med/men/75.jpg" alt="" />
            </button>
            {showDropdown && (
                <ul className="absolute top-full right-0 mt-2 p-2 bg-white rounded-md shadow z-40">
                    <li>
                        <a href="#" className="block px-4 py-2 text-black">
                            Profil
                        </a>
                    </li>
                    <li>
                        <a href="/profile" className="block px-4 py-2 text-black">
                            Iklan Anda
                        </a>
                    </li>
                    <li>
                        <button onClick={handleLogout} className="block px-4 py-2 text-black">
                            Logout
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Profile;
