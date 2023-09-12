'use client';

import React from 'react';

const SignInModal = ({ isOpen, onClose }: { isOpen: any, onClose: any }) => {
    return (
        <div
  className={`fixed inset-0 flex items-center justify-center ${
    isOpen ? 'block' : 'hidden'
  }`}
  style={{ backgroundColor: isOpen ? 'rgba(0, 0, 0, 0.5)' : 'transparent' }}
>
  <div className="bg-red-500 w-full h-full p-4">
    {/* Your modal content goes here */}
    <h2 className="text-white text-2xl font-bold">Sign In</h2>
    {/* Add your sign-in form or content */}
    <button
      className="mt-4 px-4 py-2 bg-white text-red-500 rounded-md hover:bg-red-500 hover:text-white"
      onClick={onClose}
    >
      Close
    </button>
  </div>
</div>

    );
};

export default SignInModal;
