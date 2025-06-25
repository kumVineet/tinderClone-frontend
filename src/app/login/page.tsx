'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addUser } from '../../features/user/userSlice';
import { BASE_URL } from '../../constants/ApiConstant';
import Login from '../../screens/Login';
import { isNotNullAndUndefined } from '../../utils/helper';

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const userData = useSelector((store: any) => store.user);

  const fetchUser = async () => {
    if (isNotNullAndUndefined(userData)) {
      try {
        const res = await axios.get(BASE_URL + '/profile/view', {
          withCredentials: true,
        });
        dispatch(addUser(res.data));
      } catch (err: any) {
        if (err.status === 401) {
          // User is not authenticated, stay on login page
          return;
        }
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userData]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Login />
      </main>
    </div>
  );
}
