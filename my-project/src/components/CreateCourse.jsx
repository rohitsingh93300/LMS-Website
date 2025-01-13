import React, { useEffect, useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'


const CreateCourse = () => {
    const [loading, setLoading] = useState(false)
    const [courseTitle, setCourseTitle] = useState("")
    const [category, setCategory] = useState("")
    const navigate = useNavigate()
 
    useEffect(() => {
        // Scroll to the top when the component loads
        window.scrollTo(0, 0);
      }, []);

    const getSelectedCategory = (value) => {
        setCategory(value)
    }
    const createCourseHandler = async () => {
        console.log(courseTitle, category);
        try {
            setLoading(true)
            const res = await axios.post('http://localhost:8000/api/v1/course/', { courseTitle, category }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            })
            if (res.data.success) {
                navigate('/admin/course')
                toast.success(res.data.message)
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }

    return (
        <div className='p-10 md:pr-20 h-screen'>
            <h1 className='text-2xl font-bold'>Lets Add <span className='text-blue-500'>Courses</span></h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex eius necessitatibus fugit vel distinctio architecto, ut ratione rem nobis eaque?</p>
            <div className='mt-10 '>
                <div>
                    <Label>Title</Label>
                    <Input type="text" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} placeholder="Your Course Name" className="bg-white" />
                </div>
                <div className='mt-4 mb-5'>
                    <Label>Category</Label>
                    <Select onValueChange={getSelectedCategory}>
                        <SelectTrigger className="w-[180px] bg-white">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Category</SelectLabel>
                                <SelectItem value="Next JS">Next JS</SelectItem>
                                <SelectItem value="Data Science">Data Science</SelectItem>
                                <SelectItem value="Frontend Development">
                                    Frontend Development
                                </SelectItem>
                                <SelectItem value="Backend Development">
                                    Backend Development
                                </SelectItem>
                                <SelectItem value="MERN Stack Development">
                                    MERN Stack Development
                                </SelectItem>
                                <SelectItem value="Javascript">Javascript</SelectItem>
                                <SelectItem value="Python">Python</SelectItem>
                                <SelectItem value="Docker">Docker</SelectItem>
                                <SelectItem value="MongoDB">MongoDB</SelectItem>
                                <SelectItem value="HTML">HTML</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex gap-2'>
                    <Button onClick={() => navigate('/admin/course')} variant="outline">Cancel</Button>
                    <Button className="bg-blue-500 hover:bg-blue-600" disabled={loading} onClick={createCourseHandler}>
                        {
                            loading ? <><Loader2 className='mr-1 h-4 w-4 animate-spin' />Please wait</> : "Create"
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CreateCourse
