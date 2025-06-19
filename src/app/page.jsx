'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addUser } from '../utils/userSlice'
import { BASE_URL } from '../utils/constants'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Feed from '../screens/Feed'

export default function HomePage() {
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
                router.push('/login')
            }
            console.error(err)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <div >
            <NavBar />
            <main className="flex-1">
                <Feed />
            </main>
            <Footer />
        </div>
    )
} 