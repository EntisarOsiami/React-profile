import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router';

function Login() {
  const url = 'https://683808ee2c55e01d184ba9ec.mockapi.io/auth';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      if (!username || !password) {
        toast.error('Please fill in all fields');
        return;
      }

      const response = await axios.get(`${url}`);
      const users = response.data;
      const user = users.find(
        (user) => user.username === username && user.password === password
      );
      console.log('User:', users);
      if (user) {
        toast.success('Login successful! Redirecting...');
        const userData = {
          username: user.username,
          email: user.email,
          id: user.id,
          isLoggedIn: true,
        };
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/');
      } else {
        toast.error('Invalid username or password');
      }    } catch (err) {
      console.error('Login error:', err);
      toast.error('An error occurred during login');
    }
  };

  return (
    <div className=''>
      <form className='flex flex-col items-center justify-center gap-2 p-3'>
        <h1 className='text-3xl font-bold text-center m-5'>Login</h1>

        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='border border-gray-300 p-2 mb-2 w-64'
        />

        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='border border-gray-300 p-2 mb-2 w-64'
        />

        <button
          onClick={login}
          className='bg-blue-500 text-white p-2 w-64 hover:bg-blue-600'>
          Login
        </button>
        <p className='text-gray-600 mt-2'>
          Don't have an account? <Link to='/signup' className='text-blue-500 hover:underline'> Sign up </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
