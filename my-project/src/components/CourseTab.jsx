import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import { Loader2 } from 'lucide-react'
import RichTextEditor from './RichTextEditor'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { setCourse, setLoading } from '@/redux/courseSlice'
import { useDispatch, useSelector } from 'react-redux'


const CourseTab = () => {
    const { course, loading } = useSelector(store => store.course)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const id = params.courseId
    const selectCourse = course.find(course => course._id === id)
    const [selectedCourse, setSelectedCourse] = useState(selectCourse)
    const [publish, setPublish] = useState(false)

    const getCourseById = async () => {
        try {
            const res = await axios.get(`https://lms-website-wdnh.onrender.com/api/v1/course/${id}`, { withCredentials: true })
            if (res.data.success) {
                setSelectedCourse(res.data.course)
            }
        } catch (error) {
            console.log((error));

        }
    }

    const getCreatorCourse = async () => {
        try {
            const res = await axios.get('https://lms-website-wdnh.onrender.com/api/v1/course/', { withCredentials: true })
            if (res.data.success) {
                dispatch(setCourse(res.data.courses))
            }
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {

        getCreatorCourse()
        getCourseById()
    }, [publish])
    console.log("selectedCourse", selectedCourse);



    const [input, setInput] = useState({
        courseTitle: selectedCourse?.courseTitle,
        subTitle: selectedCourse?.subTitle,
        description: selectedCourse?.description,
        category: selectedCourse?.category,
        courseLevel: selectedCourse?.courseLevel,
        coursePrice: selectedCourse?.coursePrice,
        file: "",
    });
    const [previewThumbnail, setPreviewThumbnail] = useState(selectedCourse?.courseThumbnail);
    


    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const selectCategory = (value) => {
        setInput({ ...input, category: value });
    };
    const selectCourseLevel = (value) => {
        setInput({ ...input, courseLevel: value });
    };

    // get file
    const selectThumbnail = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, courseThumbnail: file });
            const fileReader = new FileReader();
            fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
            fileReader.readAsDataURL(file);
        }
    };

    const updateCourseHandler = async () => {

        const formData = new FormData();
        formData.append("courseTitle", input.courseTitle);
        formData.append("subTitle", input.subTitle);
        formData.append("description", input.description);
        formData.append("category", input.category);
        formData.append("courseLevel", input.courseLevel);
        formData.append("coursePrice", input.coursePrice);
        formData.append("file", input.courseThumbnail);
        console.log(input);
        try {
            dispatch(setLoading(true))
            const res = await axios.put(`https://lms-website-wdnh.onrender.com/api/v1/course/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            })
            if (res.data.success) {
                navigate(`lecture`)
                toast.success(res.data.message)
                dispatch([...course, setCourse(res.data.course)])
                // console.log(input);


            }
        } catch (error) {
            console.log(error);

        } finally {
            dispatch(setLoading(false))
        }

    }

    const togglePublishUnpublish = async (action) => {
        //    const publish = action
        console.log("action", action);

        try {
            const res = await axios.patch(`https://lms-website-wdnh.onrender.com/api/v1/course/${id}`, {
                params: {
                    action
                },
                withCredentials: true
            })
            if (res.data.success) {
                setPublish(!publish)
                toast.success(res.data.message)
            } else {
                toast.error("Failed to update")
            }
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <Card className="">
            <CardHeader className="flex md:flex-row justify-between">
                <div>
                    <CardTitle>Basic Course Information</CardTitle>
                    <CardDescription>
                        Make changes to your courses here. Click save when you're done.
                    </CardDescription>
                </div>
                <div className="space-x-2">
                    <Button onClick={() => togglePublishUnpublish(selectedCourse.isPublished ? "false" : "true")}
                    >
                        {selectedCourse?.isPublished ? "UnPublish" : "Publish"}
                    </Button>
                    <Button variant="destructive">Remove Course</Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 mt-5">
                    <div>
                        <Label>Title</Label>
                        <Input
                            type="text"
                            name="courseTitle"
                            value={input.courseTitle}
                            onChange={changeEventHandler}
                            placeholder="Ex. Fullstack developer"
                        />
                    </div>
                    <div>
                        <Label>Subtitle</Label>
                        <Input
                            type="text"
                            name="subTitle"
                            value={input.subTitle}
                            onChange={changeEventHandler}
                            placeholder="Ex. Become a Fullstack developer from zero to hero in 2 months"
                        />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <RichTextEditor input={input} setInput={setInput} />
                    </div>
                    <div className="flex md:flex-row flex-wrap gap-1 items-center md:gap-5">
                        <div>
                            <Label>Category</Label>
                            <Select
                                defaultValue={input.category}
                                onValueChange={selectCategory}
                            >
                                <SelectTrigger className="w-[180px]">
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
                        <div>
                            <Label>Course Level</Label>
                            <Select
                                defaultValue={input.courseLevel}
                                onValueChange={selectCourseLevel}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a course level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Course Level</SelectLabel>
                                        <SelectItem value="Beginner">Beginner</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="Advance">Advance</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Price in (INR)</Label>
                            <Input
                                type="number"
                                name="coursePrice"
                                value={input.coursePrice}
                                onChange={changeEventHandler}
                                placeholder="199"
                                className="w-fit"
                            />
                        </div>
                    </div>
                    <div>
                        <Label>Course Thumbnail</Label>
                        <Input
                            id="file"
                            type="file"
                            onChange={selectThumbnail}
                            accept="image/*"
                            className="w-fit"
                        />
                        {previewThumbnail && (
                            <img
                                src={previewThumbnail}
                                className="w-64 my-2"
                                alt="Course Thumbnail"
                            />
                        )}
                    </div>
                    <div className='flex gap-2'>
                        <Button onClick={() => navigate("/admin/course")} variant="outline">
                            Cancel
                        </Button>
                        <Button disabled={loading} onClick={updateCourseHandler}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                "Save"
                            )}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default CourseTab
