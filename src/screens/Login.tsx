'use client'

import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../features/user/userSlice';
import { useRouter } from 'next/navigation';
import { BASE_URL } from '../constants/ApiConstant';
import {
  PassKeyIcon,
  UserIcon,
  EyeIcon,
  EyeOffIcon,
} from '../assets/icons/Icons';

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!emailId.trim()) {
      newErrors.email = 'Email is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLoginForm) {
      if (!firstName.trim()) {
        newErrors.firstName = 'First Name is required';
      }
      if (!lastName.trim()) {
        newErrors.lastName = 'Last Name is required';
      }
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (validate()) {
      try {
        const res = await axios.post(
          `${BASE_URL}/api/dev/auth/login`,
          { email: emailId, password },
          { withCredentials: true }
        );
        dispatch(addUser(res.data));
        router.push('/');
      } catch (err) {
        setGeneralError(err?.response?.data?.message || 'Something went wrong');
      }
    }
  };

  const handleSignUp = async () => {
    if (validate()) {
      try {
        const res = await axios.post(
          `${BASE_URL}/api/dev/auth/signup`,
          { firstName, lastName, email: emailId, password },
          { withCredentials: true }
        );
        dispatch(addUser(res.data));
        router.push('/profile');
      } catch (err) {
        setGeneralError(err?.response?.data?.message || 'Something went wrong');
      }
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? 'Login' : 'Sign Up'}
          </h2>

          {!isLoginForm && (
            <>
              <div className="mb-2 mt-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  className="w-full border px-3 py-2 rounded"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {error.firstName && (
                  <p className="text-red-500 text-sm mt-1">{error.firstName}</p>
                )}
              </div>

              <div className="mb-2 mt-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  className="w-full border px-3 py-2 rounded"
                  onChange={(e) => setLastName(e.target.value)}
                />
                {error.lastName && (
                  <p className="text-red-500 text-sm mt-1">{error.lastName}</p>
                )}
              </div>
            </>
          )}

          <div className="mb-4 mt-2">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <UserIcon />
              </span>
              <input
                type="email"
                id="email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="w-full border px-3 py-2 pl-10 rounded"
              />
            </div>
            {error.email && (
              <p className="text-red-500 text-sm mt-1">{error.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <PassKeyIcon />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border px-3 py-2 pl-10 rounded"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </span>
            </div>
            {error.password && (
              <p className="text-red-500 text-sm mt-1">{error.password}</p>
            )}
          </div>

          {generalError && <p className="text-red-500">{generalError}</p>}

          <div className="card-actions justify-center m-2">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? 'Login' : 'Sign Up'}
            </button>
          </div>

          <p
            className="m-auto cursor-pointer py-2 text-blue-600 hover:underline"
            onClick={() => {
              setIsLoginForm((prev) => !prev);
              setError({});
              setGeneralError('');
            }}
          >
            {isLoginForm
              ? 'New User? Sign up here'
              : 'Existing User? Login here'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
