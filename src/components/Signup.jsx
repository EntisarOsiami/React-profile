import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router';

function Signup() {
  const url = 'https://683808ee2c55e01d184ba9ec.mockapi.io/auth';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [img, setImg] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (!username || !password || !email) {
        toast.error('Please fill in all fields');
        return;
      }
  
      if (password.length < 6) {
        toast.error('Password must be at least 6 characters long');
        return;
      }
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }

      let imageUrl = img;
      if (!imageUrl) {
        imageUrl = '/avatar.jpg';
      }

      const userData = {
        username,
        email,
        password,
        img: imageUrl,      };

      const response = await axios.post(`${url}`, userData);
      console.log('Response:', response.data);
      toast.success('Signup successful! Redirecting to login...');
      navigate('/login');
    } catch (err) {
      console.error('Signup error:', err);
      toast.error('An error occurred during signup');
    }
  };

  return (
    <div>
      <form className='flex flex-col items-center justify-center'>
        <h1 className='text-3xl font-bold text-center m-5'>Register</h1>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='border border-gray-300 p-2 mb-2 w-64'
        />
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='border border-gray-300 p-2 mb-2 w-64'
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='border border-gray-300 p-2 mb-2 w-64'
        />
        <input
          type='password'
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className='border border-gray-300 p-2 mb-2 w-64'
        />
        <input
          type='text'
          placeholder='Image URL'
          value={img}
          onChange={(e) => setImg(e.target.value)}
          className='border border-gray-300 p-2 mb-2 w-64'
        />        <button
          onClick={submit}
          className='bg-blue-500 text-white p-2 w-64 hover:bg-blue-600'>
          Signup
        </button>
        <p className='mt-2'>
          Already have an account?{' '}
          <Link to='/login' className='text-blue-500 hover:underline'>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
