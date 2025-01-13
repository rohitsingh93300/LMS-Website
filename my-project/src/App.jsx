import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Courses from './pages/Courses'
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Dashboard from './components/Dashboard';
import Course from './components/Course';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CreateLecture from './components/CreateLecture';
import EditLecture from './components/EditLecture';
import CourseDetails from './components/CourseDetails';


const router = createBrowserRouter([
   {
     path: "/admin",
     element: <><Navbar/><Admin/></>,
     children: [
       {
         path: "dashboard",
         element: <Dashboard/>
       },
       {
         path: "course",
         element: <Course/>
       },
       {
         path: "course/create",
         element: <CreateCourse/>
       },
       {
         path: "course/:courseId",
         element: <UpdateCourse/>
       },
       {
         path: "course/:courseId/lecture",
         element: <CreateLecture/>
       },
       {
         path: "course/:courseId/lecture/:lectureId",
         element: <EditLecture/>
       },
     ]
   },
  {
    path: "/",
    element: <><Navbar/><Home/></>
  },
  {
    path: "/signup",
    element: <><Navbar/><Signup /></>
  },
  {
    path: "/login",
    element: <><Navbar/><Login /></>
  },
  {
    path:"/courses",
    element: <><Navbar/><Courses/></>
  },
  {
    path:"/courses/:courseId",
    element: <><Navbar/><CourseDetails/></>
  },
  {
    path:"/profile",
    element: <><Navbar/><Profile/></>
  },
])

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create/course" element={<CreateCourse/>} />
        </Route>
        <Route path="/profile" element={<Profile />} />
      </Routes> */}
      <Footer />
    </>
  )
}

export default App
