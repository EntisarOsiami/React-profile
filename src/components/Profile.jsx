import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useParams } from 'react-router';

function Profile() {
  const [user, setUser] = useState({ username: '', email: '' });
  const [img, setImg] = useState(null);
  const url = 'https://683808ee2c55e01d184ba9ec.mockapi.io/auth';
  const { id } = useParams();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${url}/${id}`);
        setImg(response.data.img);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to fetch user data');
      }
    };

    fetchUser();
  }, [id]);

  const ImgInputChange = (e) => {
    setImg(e.target.value);
  };

  const ImgChange = () => {
    axios
      .put(`${url}/${id}`, { ...user, img })
      .then((response) => {
        setImg(response.data.img);
        console.log('updated:', response.data);
        toast.success('Image updated successfully');
      })
      .catch((error) => {
        console.error('Error updating image:', error);
        toast.error('Failed to update image');
      });
  };

  const NameInputChange = (e) => {
    setUser({ ...user, username: e.target.value });
  };
  const usernameChange = () => {
    axios
      .put(`${url}/${id}`, user)
      .then((response) => {
        setUser(response.data);
        const userUpdated = JSON.parse(localStorage.getItem('user') || '{}');
        const updatedUser = {
          ...userUpdated,
          username: response.data.username,
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        console.log('updated:', response.data);
        toast.success('Username updated successfully');
      })
      .catch((error) => {
        console.error('Error updating username:', error);
        toast.error('Failed to update username');
      });
  };

  const EmailInputChange = (e) => {
    setUser({ ...user, email: e.target.value });
  };

  const emailChange = () => {
    axios
      .put(`${url}/${id}`, user)
      .then((response) => {
        setUser(response.data);
        const userUpdated = JSON.parse(localStorage.getItem('user') || '{}');
        const updatedUser = {
          ...userUpdated,
          email: response.data.email,
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        console.log('updated:', response.data);
        toast.success('Email updated successfully');
      })
      .catch((error) => {
        console.error('Error updating email:', error);
        toast.error('Failed to update email');
      });
  };

  const deleteAccount = () => {
    if(confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
    axios
      .delete(`${url}/${id}`)
      .then(() => {
        localStorage.removeItem('user');
        toast.success('Account deleted successfully');
        window.location.href = '/'; 
      })
      .catch((error) => {
        console.error('Error deleting account:', error);
      });}
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-[80vh] py-8'>
      <h1 className='text-3xl font-bold text-center mt-6 mb-8'>Profile Page</h1>
      <div className='w-full max-w-4xl p-4 mx-auto'>
        {user ? (
          <div className='flex flex-col md:flex-row gap-8 items-center md:items-start mt-4'>
            <div className='flex flex-col items-center w-full md:w-1/3 mb-8 md:mb-0'>
              <img
                src={img}
                className='w-40 h-40 rounded-full mb-6 object-cover border-2 border-gray-200'
                alt='Profile'
              />
              <div className='flex flex-col w-full max-w-xs items-center'>
                <input
                  type='text'
                  placeholder='Image URL'
                  className='w-full p-2 border rounded mb-3'
                  value={img || ''}
                  onChange={ImgInputChange}
                />
                <button
                  className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full'
                  onClick={ImgChange}>
                  Save Image
                </button>
              </div>
            </div>

            <div className='flex flex-col w-full md:w-2/3'>
              <h2 className='text-2xl font-semibold mb-6 text-center md:text-left'>
                User Profile
              </h2>

              <div className='mb-6'>
                <p className='text-gray-600 mb-2 font-medium'>Username:</p>
                <div className='flex flex-col sm:flex-row gap-3'>
                  <input
                    type='text'
                    placeholder='Username'
                    className='flex-1 p-2 border rounded'
                    value={user.username}
                    onChange={NameInputChange}
                  />
                  <button
                    className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 sm:w-auto w-full mt-2 sm:mt-0'
                    onClick={usernameChange}>
                    Save
                  </button>
                </div>
              </div>

              <div className='mb-6'>
                <p className='text-gray-600 mb-2 font-medium'>Email:</p>
                <div className='flex flex-col sm:flex-row gap-3'>
                  <input
                    type='text'
                    placeholder='Email'
                    className='flex-1 p-2 border rounded'
                    value={user.email}
                    onChange={EmailInputChange}
                  />
                  <button
                    className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 sm:w-auto w-full mt-2 sm:mt-0'
                    onClick={emailChange}>
                    Save
                  </button>
                </div>
              </div>
                 <button className='red-button' onClick={deleteAccount}>
              Delete your Account
            </button>
            </div>
         
          </div>
        ) : (
          <p className='text-center mt-4'>Loading data...</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
