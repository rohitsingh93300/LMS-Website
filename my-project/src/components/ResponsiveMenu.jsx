import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { FaChevronRight } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import userLogo from "../assets/user.jpg"
import { toast } from 'sonner';
import axios from 'axios';
import { setUser } from '@/redux/authSlice';

const ResponsiveMenu = ({ showMenu, setShowMenu }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async (e) => {

    try {
      const res = await axios.get('http://localhost:8000/api/v1/user/logout', { withCredentials: true });
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

  const { user } = useSelector(store => store.auth)
  return (
    <div className={`${showMenu ? "left-0" : "-left-[100%]"} fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-gray-950 px-8 pb-6 pt-16 text-black md:hidden rounded-r-xl shadow-md transition-all`}>
      <div>
        <div className='flex items-center justify-start gap-3'>

          <Link to='/profile'>
            <Avatar onClick={()=>setShowMenu(false)} className="w-16 h-16">
              <AvatarImage src={user?.photoUrl || userLogo} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>

          <div>
            <h1 className='text-white'>Hello {user?.name?.split(" ")[0] || "User"} !</h1>
            <h1 className='text-sm text-slate-500'>{user?.role || "Role"}</h1>
          </div>
        </div>
        <nav className='mt-12'>
          <ul className='flex flex-col gap-3 text-lg font-semibold text-white'>
            <Link to="/"><li className='cursor-pointer' onClick={() => setShowMenu(false)}>Home</li></Link>
            <Link to="/courses"><li className='cursor-pointer' onClick={() => setShowMenu(false)}>Courses</li></Link>

            {
              !user ? (
                <div className='flex flex-col gap-3'>
                  <Link to="/login"> <Button onClick={() => setShowMenu(false)} className='px-3 py-1 cursor-pointer rounded-md bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1'>Login</Button></Link>
                  <Link to="/signup"> <Button onClick={() => setShowMenu(false)} className='px-3 py-1 cursor-pointer rounded-md bg-gray-700 hover:bg-gray-800 text-white flex items-center gap-1'>Signup</Button></Link>
                </div>
              ) : (
                <div className='flex flex-col gap-7'>
                  {
                    user.role === 'instructor' && <Link to="/admin/course"><li onClick={() => setShowMenu(false)} className='cursor-pointer'>Admin</li></Link>
                  }



                  <Link > <Button onClick={logoutHandler} className='px-3 py-1 cursor-pointer rounded-md bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1'>Logout</Button></Link>
                </div>
              )
            }

          </ul>
        </nav>
      </div>
      <div className='text-white'>
        <h1>
          Made with ❤️ by Rohit
        </h1>
      </div>
    </div>
  )
}

export default ResponsiveMenu
