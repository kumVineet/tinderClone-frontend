'use client';

import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../features/user/userSlice';
import { useRouter } from 'next/navigation';
import { BASE_URL } from '../utils/constants';
import {
  PassKeyIcon,
  UserIcon,
  EyeIcon,
  EyeOffIcon,
} from '../assets/icons/Icons';
// import heic2any from 'heic2any';

type Errors = {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  about?: string;
  hobbies?: string;
};

type LookingForOptions = {
  label: string;
  value: string;
};

type hobbyOptions = {
  label: string;
  value: string;
};

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const genderOptions = [
    { label: 'Man', value: 'male' },
    { label: 'Woman', value: 'female' },
    { label: 'Other', value: 'others' },
  ];

  const interestOptions = [
    { label: 'Man', value: 'man' },
    { label: 'Woman', value: 'woman' },
    { label: 'Everyone', value: 'everyone' },
  ];

  const lookingForOptions: LookingForOptions[] = [
    { label: 'Short-term', value: 'short-term' },
    { label: 'Long-term', value: 'long-term' },
    { label: 'Not-decided', value: 'not-decided' },
  ];

  let hobbyOptions: hobbyOptions[] = [
    { label: 'Travel', value: 'travel' },
    { label: 'Movies', value: 'movies' },
    { label: 'Shopping', value: 'shopping' },
    { label: 'Clubbing', value: 'clubbing' },
    { label: 'Art', value: 'art' },
    { label: 'Chess', value: 'chess' },
    { label: 'Cooking', value: 'cooking' },
    { label: 'Music', value: 'music' },
    { label: 'Dance', value: 'dance' },
    { label: 'Cafe-hopping', value: 'cafe-hopping' },
    { label: 'Football', value: 'football' },
    { label: 'Cricket', value: 'cricket' },
    { label: 'Content-creator', value: 'content-creator' },
    { label: 'Gardening', value: 'gardening' },
    { label: 'Badminton', value: 'badminton' },
    { label: 'Swimming', value: 'swimming' },
    { label: 'Gym', value: 'gym' },
    { label: '+More', value: 'others' },
  ];

  const [formfields, setFormFields] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    month: number;
    date: number;
    year: number;
    gender: string;
    interest: string;
    lookingFor: string[];
    photo1: string;
    photo2: string;
    photo3: string;
    photo4: string;
    hobbies: string[];
    about: string;
  }>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    month: 1,
    date: 1,
    year: 1965,
    gender: '',
    interest: '',
    lookingFor: [],
    photo1: '',
    photo2: '',
    photo3: '',
    photo4: '',
    hobbies: [],
    about: '',
  });

  const [otherHobbies, setOtherHobbies] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [generalError, setGeneralError] = useState('');
  const [error, setError] = useState<Errors>({});

  const toggleLookingFor = (value: string) => {
    setFormFields((prev) => ({
      ...prev,
      lookingFor: prev.lookingFor.includes(value)
        ? prev.lookingFor.filter((item) => item !== value)
        : [...prev.lookingFor, value],
    }));
  };

  const toggleHobbies = (value: string) => {
    setFormFields((prev) => ({
      ...prev,
      hobbies: prev.hobbies.includes(value)
        ? prev.hobbies.filter((item) => item !== value)
        : [...prev.hobbies, value],
    }));
  };

  const updatehobbies = (value: string) => {
    setOtherHobbies(value);
    if (value.charAt(value.length - 1) === ' ') {
      hobbyOptions = [
        {
          label: otherHobbies.trim(),
          value: otherHobbies.trim().toLowerCase(),
        },
        ...hobbyOptions,
      ];
      setFormFields((prev) => ({
        ...prev,
        hobbies: [
          otherHobbies.trim().toLowerCase(),
          ...prev.hobbies.filter((item) => item !== 'others'),
        ],
      }));
      setOtherHobbies('');
    }
  };

  // const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      alert('Please select a valid image file (JPG, PNG, GIF)');
      return;
    } else if (file.type === 'image/heic' || file.name.endsWith('.heic')) {
      // allowing .heic images
      try {
        const heic2any = (await import('heic2any')).default;
        const convertedBlob = await heic2any({
          blob: file,
          toType: 'image/jpeg',
        });
        const imageUrl = URL.createObjectURL(convertedBlob as Blob);
        setFormFields((prev) => ({ ...prev, photo1: imageUrl }));
      } catch (error) {
        alert('Failed to convert HEIC file.');
        console.error(error);
        return;
      }
    } else if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPG, PNG, GIF)');
    } else if (file.size > 5 * 1024 * 1024) {
      alert("File size must be under 5MB");
      return;
    } else {
      setFormFields((prev) => ({ ...prev, photo1: URL.createObjectURL(file) }));
      return;
    }
  };

  const validate = () => {
    const newErrors: Errors = { ...error };
    if (!formfields.email.trim()) {
      newErrors.email = 'Email is required';
    }
    if (!formfields.password) {
      newErrors.password = 'Password is required';
    } else if (formfields.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLoginForm) {
      if (!formfields.firstName.trim()) {
        newErrors.firstName = 'First Name is required';
      }
      if (!formfields.lastName.trim()) {
        newErrors.lastName = 'Last Name is required';
      }
      if (!formfields.about.trim()) {
        newErrors.about = 'Please tell us something about yourself';
      }
      if (!formfields.hobbies.length) {
        newErrors.hobbies = 'Please add at least one hobby';
      }
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (validate()) {
      try {
        const res = await axios.post(
          `${BASE_URL}/login`,
          { email: formfields.email, password: formfields.password },
          { withCredentials: true }
        );
        dispatch(addUser(res.data));
        router.push('/');
      } catch (err: any) {
        setGeneralError(err?.response?.data?.message || 'Something went wrong');
      }
    }
  };

  const handleSignUp = async () => {
    if (validate()) {
      try {
        const res = await axios.post(
          `${BASE_URL}/signup`,
          { formfields },
          { withCredentials: true }
        );
        dispatch(addUser(res.data));
        router.push('/profile');
      } catch (err: any) {
        setGeneralError(err?.response?.data?.message || 'Something went wrong');
      }
    }
  };

  return (
    <div className="flex justify-center my-10 gap-20">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? 'Login' : 'Sign Up'}
          </h2>

          {/* Name */}
          {!isLoginForm && (
            <div className="flex justify-between">
              {/* FirstNamne */}
              <div className="mb-2 mt-4">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  value={formfields.firstName}
                  className="w-40 border px-3 py-2 rounded"
                  onChange={(e) => {
                    setFormFields((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }));
                  }}
                />
                {error.firstName && (
                  <p className="text-red-500 text-sm mt-1">{error.firstName}</p>
                )}
              </div>

              {/* LatName */}
              <div className="mb-2 mt-4">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  value={formfields.lastName}
                  className="w-40 border px-3 py-2 rounded"
                  onChange={(e) => {
                    setFormFields((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }));
                  }}
                />
                {error.lastName && (
                  <p className="text-red-500 text-sm mt-1">{error.lastName}</p>
                )}
              </div>
            </div>
          )}

          {/* Email */}
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
                value={formfields.email}
                onChange={(e) => {
                  setFormFields((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }));
                }}
                className="w-full border px-3 py-2 pl-10 rounded"
              />
            </div>
            {error.email && (
              <p className="text-red-500 text-sm mt-1">{error.email}</p>
            )}
          </div>

          {!isLoginForm && (
            <>
              {/* Birthday */}
              <div>
                <p className="block text-sm font-medium mb-1">Birthday</p>
                <div className="flex justify-between">
                  {/* Month */}
                  <div>
                    <label
                      htmlFor="month"
                      className="block text-sm font-medium mb-1"
                    >
                      Month
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={formfields.month}
                      className="w-18 border px-3 py-2 rounded text-center"
                      onChange={(e) => {
                        setFormFields((prev) => ({
                          ...prev,
                          month: Number(e.target.value),
                        }));
                      }}
                    />
                  </div>
                  {/* Date */}
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium mb-1"
                    >
                      Date
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="31"
                      value={formfields.date}
                      className="w-18 border px-3 py-2 rounded text-center"
                      onChange={(e) => {
                        setFormFields((prev) => ({
                          ...prev,
                          date: Number(e.target.value),
                        }));
                      }}
                    />
                  </div>
                  {/* Year */}
                  <div>
                    <label
                      htmlFor="Year"
                      className="block text-sm font-medium mb-1"
                    >
                      Year
                    </label>
                    <input
                      type="number"
                      min="1965"
                      value={formfields.year}
                      className="w-18 border px-3 py-2 rounded text-center"
                      onChange={(e) => {
                        setFormFields((prev) => ({
                          ...prev,
                          year: Number(e.target.value),
                        }));
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* Gender */}
              <div>
                <label className="block text-sm font-medium mb-1">Gender</label>
                <div className="flex justify-between">
                  {genderOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setFormFields((prev) => ({
                          ...prev,
                          gender: option.value,
                        }));
                      }}
                      className={
                        'px-8 py-2 rounded-full border-2 font-bold transition-all'
                      }
                      style={{
                        borderColor:
                          formfields.gender === option.value
                            ? '#f87171'
                            : '#ffffff',
                        outline: 'none',
                        boxShadow: 'none',
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              {/* Interest */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Interested In
                </label>
                <div className="flex justify-between">
                  {interestOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setFormFields((prev) => ({
                          ...prev,
                          interest: option.value,
                        }));
                      }}
                      className={
                        'px-8 py-2 rounded-full border-2 font-bold transition-all'
                      }
                      style={{
                        borderColor:
                          formfields.interest === option.value
                            ? '#f87171'
                            : '#ffffff',
                        outline: 'none',
                        boxShadow: 'none',
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              {/* LookingFor */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Looking For
                </label>
                <div className="flex justify-between">
                  {lookingForOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={
                        'px-8 py-2 rounded-full border-2 font-bold transition-all'
                      }
                      style={{
                        borderColor: formfields.lookingFor.includes(
                          option.value
                        )
                          ? '#f87171'
                          : '#ffffff',
                        outline: 'none',
                        boxShadow: 'none',
                      }}
                      onClick={() => toggleLookingFor(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              {/* About */}
              <div>
                <label
                  htmlFor="about"
                  className="block text-sm font-medium mb-1"
                >
                  About
                </label>
                <textarea
                  id="about"
                  value={formfields.about}
                  onChange={(e) => {
                    setFormFields((prev) => ({
                      ...prev,
                      about: e.target.value,
                    }));
                  }}
                  className="w-full border px-3 py-2 rounded"
                  rows={3}
                />
                {error.about && (
                  <p className="text-red-500 text-sm mt-1">{error.about}</p>
                )}
              </div>
              {/* Hobbies */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Hobbies
                </label>
                <div className="flex flex-wrap gap-2">
                  {hobbyOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={
                        'px-8 py-2 rounded-full border-2 font-bold transition-all'
                      }
                      style={{
                        borderColor: formfields.hobbies.includes(option.value)
                          ? '#f87171'
                          : '#ffffff',
                        outline: 'none',
                        boxShadow: 'none',
                      }}
                      onClick={() => toggleHobbies(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                  {error.hobbies && (
                    <p className="text-red-500 text-sm mt-1">{error.hobbies}</p>
                  )}
                </div>
                {formfields.hobbies.includes('others') && (
                  <>
                    <br />
                    <input
                      className="w-full border px-3 py-2 rounded"
                      type="text"
                      value={otherHobbies}
                      placeholder="hit space after adding each hobby"
                      onChange={(e) => updatehobbies(e.target.value)}
                    />
                  </>
                )}
              </div>
            </>
          )}
          {/* Password */}
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
                value={formfields.password}
                onChange={(e) => {
                  setFormFields((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
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
      {/* Images */}
      <div className="card bg-base-300 w-96 shadow-xl">
          <div className="card-body">
            <label
              htmlFor="image-upload"
              className="w-2/5 h-48 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center cursor-pointer hover:border-blue-400 transition"
            >
              {formfields.photo1 ? (
                <img
                  src={formfields.photo1}
                  alt="Preview"
                  className="h-full w-full object-cover rounded-2xl"
                />
              ) : (
                <div className="text-center text-gray-500">
                  <p className="text-sm">Click or drag an image here</p>
                  <p className="text-xs mt-1">JPG, PNG, or GIF (max 2MB)</p>
                </div>
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
      </div>
    </div>
  );
};

export default Login;
