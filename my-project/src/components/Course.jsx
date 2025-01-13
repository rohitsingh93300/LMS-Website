import React, { useEffect } from 'react'
import { Button } from './ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setCourse } from '@/redux/courseSlice'
import { Edit } from 'lucide-react'
import { Badge } from './ui/badge'



const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

const Course = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { course } = useSelector(store => store.course)

  useEffect(() => {
    // Scroll to the top when the component loads
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getCreatorCourse = async () => {
      try {
        const res = await axios.get('https://lms-website-wdnh.onrender.com/api/v1/course/', { withCredentials: true })
        if (res.data.success) {
          dispatch(setCourse(res.data.courses))
        }
        console.log(res)
      } catch (error) {

      }
    }

    getCreatorCourse()

  }, []);


  return (

    <div className='md:p-10 p-4 w-full h-screen'>
      <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => navigate('create')}>Create Course</Button>
      <Table className="mt-10">
        <TableCaption>A list of your recent courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Course</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {course?.map((course) => (
            <TableRow key={course._id}>
              <TableCell className="md:w-[300px] flex items-center gap-2"><img src={course?.courseThumbnail} alt="Thumbnail" className='w-20 hidden md:block rounded-sm' />
                {course.courseTitle}
              </TableCell>
              <TableCell className="font-medium text-right">₹{course.coursePrice || "NA"}</TableCell>
              <TableCell className="text-center"><Badge className={course.isPublished ? "bg-green-400" : "bg-red-400"}>{course.isPublished ? "Published" : "Draft"}</Badge></TableCell>
              <TableCell className="text-right"><Button variant='ghost' onClick={() => navigate(`/admin/course/${course._id}`)}><Edit /></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

  )
}

export default Course
