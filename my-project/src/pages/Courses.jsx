import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { setCourse } from "@/redux/courseSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const courses = [
  {
    id: 1,
    title: "Web Development Bootcamp",
    description: "Master HTML, CSS, JavaScript, and React to become a professional web developer.",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 2,
    title: "UI/UX Design Essentials",
    description: "Learn the art of designing intuitive and beautiful user interfaces and experiences.",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 3,
    title: "Data Science with Python",
    description: "Dive into data analysis, machine learning, and visualization using Python.",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 4,
    title: "Digital Marketing Mastery",
    description: "Master SEO, social media, email marketing, and advertising strategies.",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 5,
    title: "Cloud Computing Basics",
    description: "Get started with AWS, Azure, and Google Cloud to understand the fundamentals of cloud computing.",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 6,
    title: "Full-Stack Development",
    description: "Become proficient in building complete applications with MERN stack.",
    image: "https://via.placeholder.com/300x200",
  },
];

const Courses = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {course} = useSelector(store=>store.course)
  const {user} = useSelector(store=>store.auth)
  // console.log("course", course);

  useEffect(()=> {
    const getAllPublishedCourse = async()=> {
      try {
        const res = await axios.get('https://lms-website-wdnh.onrender.com/api/v1/course/published-courses',{withCredentials:true})
        if (res.data.success){
          dispatch(setCourse(res.data.courses))
        }
      } catch (error) {
        console.log(error);
        
      }
    }
    getAllPublishedCourse()
  })
  
  return (
    <div className="bg-gray-100 pt-14">

    <div className="min-h-screen max-w-7xl mx-auto py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Our Courses
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Explore our curated courses to boost your skills and career. Whether you're a beginner or an expert, we have something for everyone.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {course?.map((course) => (
            <Card
              key={course._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform "
            >
              <img
                src={course.courseThumbnail}
                alt={course.courseTitle}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  {course.courseTitle}
                </h2>
                <p className="text-gray-600 mb-4">{course.subTitle}</p>
                <Button className="" onClick={()=>navigate(user ? `/courses/${course._id}`: "/login")}>
                  Learn More
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Courses;
