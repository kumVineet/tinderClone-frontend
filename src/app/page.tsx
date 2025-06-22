'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addUser } from '../features/user/userSlice'
import { BASE_URL } from '../utils/constants'
import Feed from '../screens/Feed'
import { RootState } from '../store/store'

export default function HomePage() {
    const dispatch = useDispatch()
    const router = useRouter()
    const user = useSelector((state: RootState) => state.user)
    const [loading, setLoading] = useState(user === null)

    useEffect(() => {
        if (user === null) {
            axios
                .get(`${BASE_URL}/profile/view`, { withCredentials: true })
                .then((res) => {
                    dispatch(addUser(res.data))
                    setLoading(false)
                })
                .catch((err) => {
                    if (err?.response?.status === 401 || err?.response?.status === 400) {
                        router.push('/login')
                    }
                    setLoading(false)
                })
        }
    }, [user, dispatch, router])

    if (loading) return null // or a loader

    if (!user) return null // Prevents rendering Feed if user is not set

    return (
        <main className="flex-1">
            <Feed />
        </main>
    )
} 