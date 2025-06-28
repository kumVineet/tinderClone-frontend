'use client';

import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../features/user/userSlice';
import { useRouter } from 'next/navigation';
import {
  PassKeyIcon,
  UserIcon,
  EyeIcon,
  EyeOffIcon,
} from '../assets/icons/Icons';
import { loginUserApi, signupUserApi } from '../services/apiServices';
import { capitalizeFirstLetter, customConsole } from '../utils/helper';
import { useGlobalContext } from '../context/Global.context';
import { ClientPageRoot } from 'next/dist/client/components/client-page';
import CustomImage from '../components/CustomImage.component';

type Errors = {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  about?: string;
  hobbies?: string;
  image?: string;
};

type LookingForOptions = {
  label: string;
  value: string;
};

type hobbyOptions = {
  label: string;
  value: string;
};

const EmailField: FC<{
  formfields: any;
  setFormFields: any;
  error: any;
  setError: any;
  width: string;
}> = ({ formfields, setFormFields, error, setError, width }) => (
  <div className="mb-2 mt-4">
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
          setError((prev: any) => ({ ...prev, email: '' }));
          setFormFields((prev: any) => ({
            ...prev,
            email: e.target.value,
          }));
        }}
        className={`border px-3 py-2 pl-10 rounded w-${width}`}
      // style={{ width: !isLoginForm ? '300px' : '100%' }}
      />
    </div>
    {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
  </div>
);

const Password: FC<{
  formfields: any;
  setFormFields: any;
  showPassword: boolean;
  setShowPassword: any;
  error: any;
  setError: any;
}> = ({ formfields, setFormFields, showPassword, setShowPassword, error, setError }) => (
  <div className="mb-6 w-full">
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
          setError((prev: any) => ({ ...prev, password: '' }));
          setFormFields((prev: any) => ({
            ...prev,
            password: e.target.value,
          }));
        }}
        className="w-full border px-3 py-2 pl-10 rounded"
      />
      <span
        onClick={() => setShowPassword((prev: any) => !prev)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
      >
        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
      </span>
    </div>
    {error.password && (
      <p className="text-red-500 text-sm mt-1">{error.password}</p>
    )}
  </div>
);

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { startLoader, stopLoader } = useGlobalContext();

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
    { label: 'Short Term', value: 'short-term' },
    { label: 'Long Term', value: 'long-term' },
    { label: 'Not Decided', value: 'not-decided' },
  ];

  const [hobbyOptions, setHobbyOptions] = useState<hobbyOptions[]>([
    { label: 'Travel', value: 'travel' },
    { label: 'Movies', value: 'movies' },
    { label: 'Shopping', value: 'shopping' },
    { label: 'Clubbing', value: 'clubbing' },
    { label: 'Art', value: 'art' },
    { label: 'Chess', value: 'chess' },
    { label: 'Cooking', value: 'cooking' },
    { label: 'Music', value: 'music' },
    { label: 'Dance', value: 'dance' },
    { label: 'Cafe Hopping', value: 'cafe hopping' },
    // { label: 'Football', value: 'football' },
    // { label: 'Cricket', value: 'cricket' },
    { label: 'Content Creator', value: 'content creator' },
    // { label: 'Gardening', value: 'gardening' },
    { label: 'Badminton', value: 'badminton' },
    { label: 'Swimming', value: 'swimming' },
    { label: 'Gym', value: 'gym' },
  ]);

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
    imageUrls: string[];
    hobbies: string[];
    about: string;
  }>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    month: 0,
    date: 0,
    year: 0,
    gender: '',
    interest: '',
    lookingFor: [],
    imageUrls: [],
    hobbies: [],
    about: '',
  });

  customConsole('formfields', formfields);

  const [otherHobbies, setOtherHobbies] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [generalError, setGeneralError] = useState('');
  const [error, setError] = useState<Errors>({});
  const [showField, setShowField] = useState(false);

  const toggleLookingFor = (value: string) => {
    setFormFields((prev) => ({
      ...prev,
      lookingFor: prev.lookingFor.includes(value)
        ? prev.lookingFor.filter((item) => item !== value)
        : [...prev.lookingFor, value],
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      hobbyOptions.push({
        label: capitalizeFirstLetter(otherHobbies.trim()),
        value: otherHobbies.trim().toLowerCase(),
      });
      setFormFields((prev) => ({
        ...prev,
        hobbies: [
          ...prev.hobbies.filter(
            (item) => item !== otherHobbies.trim().toLowerCase()
          ),
          otherHobbies.trim().toLowerCase(),
        ],
      }));
      setOtherHobbies('');
    }
  };

  const toggleHobbies = (value: string) => {
    setError((prev) => ({ ...prev, hobbies: '' }));
    setFormFields((prev) => ({
      ...prev,
      hobbies: prev.hobbies.includes(value)
        ? prev.hobbies.filter((item) => item !== value)
        : [...prev.hobbies, value],
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError((prev) => ({ ...prev, image: '' }));
    const file = e.target.files?.[0];

    if (!file) {
      alert('Please select a valid image file (JPG, PNG, GIF)');
      return;
    } else if (file.type === 'image/heic' || file.name.endsWith('.heic')) {
      startLoader();
      // allowing .heic images
      try {
        const heic2any = (await import('heic2any')).default;
        const convertedBlob = await heic2any({
          blob: file,
          toType: 'image/jpeg',
        });
        const imageUrl = URL.createObjectURL(convertedBlob as Blob);
        setFormFields((prev) => ({
          ...prev,
          imageUrls: [...prev.imageUrls, imageUrl],
        }));
        stopLoader();
        return;
      } catch (error) {
        alert('Failed to convert HEIC file.');
        stopLoader();
        return;
      }
    } else if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPG, PNG, GIF)');
    } else if (file.size > 5 * 1024 * 1024) {
      alert('File size must be under 5MB');
      return;
    } else {
      startLoader();
      setFormFields((prev) => ({
        ...prev,
        imageUrls: [...prev.imageUrls, URL.createObjectURL(file)],
      }));
      stopLoader();
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
      if (!formfields.imageUrls.length) {
        newErrors.image = 'Please upload at least one image';
      }
    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) {
      startLoader();
      try {
        const res: any = await loginUserApi({
          email: formfields.email,
          password: formfields.password,
        });
        dispatch(addUser(res.data));
        router.push('/');
        stopLoader();
      } catch (err: any) {
        setGeneralError(err?.response?.data?.message || 'Something went wrong');
        stopLoader();
      }
    }
  };

  const handleSignUp = async () => {
    if (!validate()) {
      startLoader();
      try {
        const res: any = await signupUserApi({ formfields });
        dispatch(addUser(res.data));
        router.push('/profile');
        stopLoader();
      } catch (err: any) {
        setGeneralError(err?.response?.data?.message || 'Something went wrong');
        stopLoader();
      }
    }
  };

  return (
    <div className="flex justify-center my-10 gap-20">
      <div
        className="card bg-base-300 w-96 shadow-xl"
        style={{ width: !isLoginForm ? '80%' : '384px' }}
      >
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? 'Login' : 'Profile'}
          </h2>

          <div className="flex justify-between">
            {/* FirstName */}
            {!isLoginForm && (
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
                  className="w-75 border px-3 py-2 rounded"
                  onChange={(e) => {
                    setError((prev) => ({ ...prev, firstName: '' }));
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
            )}

            {/* LastName */}
            {!isLoginForm && (
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
                  className="w-75 border px-3 py-2 rounded"
                  onChange={(e) => {
                    setError((prev) => ({ ...prev, lastName: '' }));
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
            )}

            {/* Email on Profile Page */}
            {!isLoginForm && (
              <EmailField
                formfields={formfields}
                setFormFields={setFormFields}
                error={error}
                setError={setError}
                width="75"
              />
            )}
          </div>

          {/* Email on Login Page */}
          {isLoginForm && (
            <EmailField
              formfields={formfields}
              setFormFields={setFormFields}
              error={error}
              setError={setError}
              width="full"
            />
          )}

          {!isLoginForm && (
            <>
              <div className="flex justify-between mb-2">
                {/* Birthday */}
                <div className="w-1/4">
                  <p className="block text-sm font-medium mb-1">Date of Birth</p>
                  <div className="flex justify-between">
                    {/* Month */}
                    <div>
                      {/* <label
                        htmlFor="month"
                        className="block text-sm font-medium mb-1"
                      >
                        Month
                      </label> */}
                      <input
                        type="number"
                        min="1"
                        max="12"
                        // value={formfields.month}
                        placeholder='MM'
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
                      {/* <label
                        htmlFor="date"
                        className="block text-sm font-medium mb-1"
                      >
                        Date
                      </label> */}
                      <input
                        type="number"
                        min="1"
                        max="31"
                        // value={formfields.date}
                        placeholder='DD'
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
                      {/* <label
                        htmlFor="Year"
                        className="block text-sm font-medium mb-1"
                      >
                        Year
                      </label> */}
                      <input
                        type="number"
                        min="1965"
                        // value={formfields.year}
                        placeholder='YYYY'
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
                <div className="w-1/4">
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
                <div className="w-1/4">
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
              </div>
              <div className="flex justify-between mb-2">
                <div className="w-78">
                  {/* LookingFor */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Looking For
                    </label>
                    <div className="flex justify-between gap-1">
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
                  <div className='mb-2'>
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
                        setError((prev) => ({ ...prev, about: '' }));
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
                  {/* Password */}
                  <Password
                    formfields={formfields}
                    setFormFields={setFormFields}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    error={error}
                    setError={setError}
                  />
                </div>
                {/* Hobbies */}
                <div className="mb-2 w-78">
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
                    <button
                      type="button"
                      className={
                        'px-8 py-2 rounded-full border-2 font-bold transition-all'
                      }
                      style={{
                        borderColor: showField ? '#f87171' : '#ffffff',
                        outline: 'none',
                        boxShadow: 'none',
                      }}
                      onClick={() => setShowField(!showField)}
                    >
                      {!showField ? '+ More' : '- Less'}
                    </button>
                    {error.hobbies && (
                      <p className="text-red-500 text-sm mt-1">{error.hobbies}</p>
                    )}
                  </div>
                  {showField && (
                    <>
                      <br />
                      <input
                        className="w-1/3 border px-3 py-2 rounded"
                        type="text"
                        value={otherHobbies}
                        placeholder="Press enter key after adding each hobby"
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setOtherHobbies(e.target.value)}
                      />
                    </>
                  )}
                </div>
                {/* Images */}
                {!isLoginForm && (
                  <div className="w-78">
                    <h2 className="mt-6 card-title justify-left">Images</h2>
                    <div className="card-body flex flex-row flex-wrap justify-between w-full gap-auto">
                      {formfields.imageUrls.map((url, index) => (
                        <>
                          <img
                            key={index}
                            src={url}
                            alt="Preview"
                            className="h-36 w-2/5 border-gray-300 border-2 object-cover rounded-2xl hover:cursor-pointer hover:border-red-600"
                            onClick={() =>
                              setFormFields((prev) => ({
                                ...prev,
                                imageUrls: prev.imageUrls.filter(
                                  (img) => prev.imageUrls.indexOf(img) !== index
                                ),
                              }))
                            }
                          />
                        </>
                      ))}
                      {formfields.imageUrls.length < 4 && (
                        <div
                          className={`${formfields.imageUrls.length < 4 ? 'w-2/5' : ''}`}
                        >
                          <label
                            htmlFor="image-upload"
                            className=" h-36 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center cursor-pointer hover:border-blue-400 transition"
                          >
                            {
                              <div className="text-center text-gray-500">
                                <p className="text-sm">Click or drag an image here</p>
                                <p className="text-xs mt-1">
                                  JPG, PNG, or GIF (max 5MB)
                                </p>
                              </div>
                            }
                            <input
                              id="image-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageChange}
                            />
                          </label>
                        </div>
                      )}
                      {error.image && formfields.imageUrls.length < 4 && (
                        <p className="text-red-500 flex justify-center text-sm mt-1">
                          {error.image}
                        </p>
                      )}
                    </div>
                    {formfields.imageUrls.length > 0 && <p className="text-yellow-400">Click on image to delete it.</p>}
                  </div>
                )}
              </div>
            </>
          )}

          {/* Password on Login form */}
          {isLoginForm && (
            <Password
              formfields={formfields}
              setFormFields={setFormFields}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              error={error}
              setError={setError}
            />
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
  );
};

export default Login;
