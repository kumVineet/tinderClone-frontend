'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addUser } from '../../features/user/userSlice'
import { BASE_URL } from '../../utils/constants'
import Login from '../../screens/Login'

export default function LoginPage() {
    const dispatch = useDispatch()
    const router = useRouter()
    const userData = useSelector((store) => store.user)

    const fetchUser = async () => {
        if (userData) return
        try {
            const res = await axios.get(BASE_URL + '/profile/view', {
                withCredentials: true,
            })
            dispatch(addUser(res.data))
        } catch (err) {
            if (err.status === 401) {
                // User is not authenticated, stay on login page
                return
            }
            console.error(err)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1">
                <Login />
            </main>
        </div>
    )
} 