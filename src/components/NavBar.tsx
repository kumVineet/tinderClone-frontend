'use client'

import Link from 'next/link';
import { LogoIcon } from '../assets/icons/Icons';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../features/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';

const NavBar = () => {
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const router = useRouter()

  const handleLogout = async () => {
    if (!user) return;
    try {
      await axios.post(BASE_URL + '/logout', {}, { withCredentials: true })
      dispatch(removeUser())
      router.push('/login')
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          <LogoIcon />
          tinderClone
        </Link>
      </div>
      {user && (
        <div className="flex gap-2 mx-5 items-center">
          <p>Welcome! {user?.user?.firstName}</p>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={
                    user?.user?.photo ??
                    'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                  } />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <Link href="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><a>Settings</a></li>
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
