import React from 'react';
import { useNavigate } from 'react-router';
function HomePage() {
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem('user'));
  const id = userData ? userData.id : null;

  const profileSend = () => {
    navigate(`/profile/${id}`);
  };  return (
    <div className='w-full flex items-center justify-center min-h-[80vh] py-16'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-3xl font-bold text-center'>
          Welcome to the Profile Demo Page
        </h1>
        <div className='flex justify-center mt-6'>
          <button
            onClick={profileSend}
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
            Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
