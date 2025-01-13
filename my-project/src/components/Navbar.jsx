import React, { useState } from 'react'
// import Logo from '../assets/Logo.png'
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
// import { FaChevronRight } from 'react-icons/fa6'
import { GraduationCap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '@/redux/authSlice';
import UserLogo from '../assets/user.jpg'
import ResponsiveMenu from './ResponsiveMenu';


const Navbar = () => {
    const {user} = useSelector(store => store.auth)
    const [showMenu, setShowMenu] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }
    const logoutHandler = async (e) => {
    
        try {
            const res = await axios.get('https://lms-website-wdnh.onrender.com/api/v1/user/logout', { withCredentials: true });
            if (res.data.success) {
                // dispatch(setUser(null))
                navigate("/")
                dispatch(setUser(null))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
    
        }
    }
    return (
        <div className='bg-gray-900 z-50  w-full py-3 fixed top-0'>
            <div className='flex items-center justify-between max-w-7xl mx-auto px-4 md:px-0'>
                {/* logo section */}
                <div>
                    {/* <a href="/"><img src={Logo} alt="" className='w-[170px]' /></a>   */}
                    <Link to="/"><h1 className='font-bold text-3xl text-gray-300 flex items-center gap-2'><GraduationCap className='w-10 h-10' />Logo</h1></Link>
                </div>
                {/* Menu section */}
                <nav className='hidden md:block'>
                    <ul className='flex gap-7 text-xl items-center  font-semibold text-white'>
                        <Link to="/"><li className='cursor-pointer'>Home</li></Link>
                        <Link to="/courses"><li className='cursor-pointer'>Courses</li></Link>

                        {
                            !user ? (
                                <div className='flex gap-3'>
                                    <Link to="/login"> <Button className='px-3 py-1 cursor-pointer rounded-md bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1'>Login</Button></Link>
                                    <Link to="/signup"> <Button className='px-3 py-1 cursor-pointer rounded-md bg-gray-700 hover:bg-gray-800 text-white flex items-center gap-1'>Signup</Button></Link>
                                </div>
                            ) : (
                                <div className='flex items-center gap-7'>
                                    {
                                     user.role === 'instructor' &&  <Link to="/admin/dashboard"><li className='cursor-pointer'>Admin</li></Link>
                                    }
                                    
                                    <Link to='/profile'><Avatar>
                                        <AvatarImage src={user.photoUrl || UserLogo} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar></Link>

                                    <Link > <Button onClick={logoutHandler} className='px-3 py-1 cursor-pointer rounded-md bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1'>Logout</Button></Link>
                                </div>
                            )
                        }


                    </ul>
                </nav>
                <div className='md:hidden text-white text-4xl'>
                    {
                        showMenu ? <HiMenuAlt3 onClick={toggleMenu} /> : <HiMenuAlt1 onClick={toggleMenu} />
                    }
                </div>

            </div>
            <ResponsiveMenu showMenu={showMenu} setShowMenu={setShowMenu} />
        </div>
    )
}

export default Navbar