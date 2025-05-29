import React from 'react';
import { Link } from 'react-router';
import { useState } from 'react';
import { useNavigate } from 'react-router';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = userData ? userData.isLoggedIn : null;
  const Id = userData ? userData.id : null;
  return (
    <div className='bg-gray-800 text-white p-4 flex justify-between items-center'>
      <Link to='/' className='text-2xl font-bold text-white hover:text-amber-400'>Profile Demo</Link>
      <nav className='space-x-4 hidden  justify-center  items-center md:flex'>
        <Link to='/' className='hover:text-gray-300'>
          Home
        </Link>
        <Link to={`/profile/${Id}`} className='hover:text-gray-300'>
          Profile
        </Link>
        {isLoggedIn ? (
          <div className='flex items-center space-x-4'>
            <p className='hover:text-gray-300'>Welcome, {userData.username}</p>
            <button
              onClick={() => {
                localStorage.removeItem('user');
                navigate('/login');
              }}
              className='hover:text-gray-300'>
              Logout
            </button>
          </div>
        ) : (
          <>
            <button
              className='hover:text-gray-300'
              onClick={() => navigate('/login')}>
              Login
            </button>
          </>
        )}
      </nav>
      <nav className='md:hidden'>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='text-white focus:outline-none'>
          {isOpen ? 'Close' : 'Menu'}
        </button>
        {isOpen && (
          <div className='absolute right-0 mt-2 bg-gray-800 rounded shadow-lg p-4'>
            <Link to='/' className='block px-4 py-2 hover:text-gray-300'>
              Home
            </Link>
            <Link to={`/profile/${Id}`} className='block px-4 py-2 hover:text-gray-300'>
              Profile
            </Link>
            {isLoggedIn ? (
              <div>
                <p className='block px-4 py-2'>Welcome, {userData.username}</p>
                <button
                  onClick={() => {
                    localStorage.removeItem('user');
                    navigate('/login');
                  }}
                  className='block px-4 py-2 hover:text-gray-300'>
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to='/login'
                  className='block px-4 py-2 hover:text-gray-300'>
                  Login
                </Link>
                <Link
                  to='/signup'
                  className='block px-4 py-2 hover:text-gray-300'>
                  Signup
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
