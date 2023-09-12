'use client';

import { useLoginMitra } from '@/src/application/hooks/mitraAuth/useLoginMitra';
import LayoutTemplate from '@/src/utils/layout';
import React, { useState } from 'react';

const Page = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const loginMitra = useLoginMitra()

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData)
    loginMitra(formData)

  };

  return (
    <LayoutTemplate>
      <div className='w-[500px] h-[300px] bg-white rounded-md shadow-md mx-auto'>
        <h1 className='text-center'>Masuk</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='username' className='block text-gray-700 text-sm font-bold mb-2'>
              Email
            </label>
            <input
              type='text'
              id='username'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='w-full border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Email'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='password' className='block text-gray-700 text-sm font-bold mb-2'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className='w-full border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='Password'
            />
          </div>
          <div className='text-center'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline'
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </LayoutTemplate>
  );
};

export default Page;
