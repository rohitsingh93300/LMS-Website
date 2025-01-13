import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { setUser } from "@/redux/authSlice";
import UserLogo from '../assets/user.jpg'
import Js from "../assets/JS.jpg"
import ReactBasics from '../assets/ReactBasics.jpg'
import Css from '../assets/Css.jpg'



const profileData = {
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "An enthusiastic learner enrolled in multiple courses.",
    enrolledCourses: [{
        title: "React Basics",
        description: "Learn the fundamentals of React, including components, state, and props.",
        image: ReactBasics,
    },
    {
        title: "Advanced JavaScript",
        description: "Dive deeper into JavaScript concepts like closures, async/await, and more.",
        image: Js,
    },
    {
        title: "CSS for Designers",
        description: "Master the art of creating beautiful, responsive designs using CSS.",
        image: Css,
    }],
    profilePicture: "https://via.placeholder.com/150",
    linkedin: "https://www.linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
};
const Profile = () => {

    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState({
        name: user?.name,
        description: user?.description,
        file: user?.photoUrl
    })

    console.log(user)

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        if (input?.file) {
            formData.append("file", input?.file)
        }
        try {
            setLoading(true)
            const res = await axios.put('https://lms-website-wdnh.onrender.com/api/v1/user/profile/update', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                setOpen(false)
                toast.success(res.data.message)
                dispatch(setUser(res.data.user))
                // console.log(input);


            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        } finally {
            setLoading(false);
        }
    }

    // useEffect(()=>{
    //     setInput({
    //         name: user?.name || "",
    //         description: user?.description || "",
    //         email: user?.email || "",
    //         role: user?.role || "",
    //         file: user?.file || null
    //     })
    // },[user])

    return (
        <div className="bg-gray-100  py-12 px-4 lg:px-0 ">
            <div className="max-w-6xl mx-auto p-8 bg-gradient-to-r bg-white shadow-xl rounded-2xl mt-14">
                <div className="flex flex-col items-center  md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-12">
                    {/* Profile Picture */}

                    <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
                        <img
                            src={user?.photoUrl || UserLogo}
                            alt="Profile Picture"
                            className="w-full h-full object-cover"
                        />
                    </div>


                    {/* User Info */}
                    <div className="text-center md:text-left ">
                        <h1 className="text-4xl font-bold text-blue-500">Welcome, {user?.name?.split(" ")[0] || "Name Not Available"}!</h1>
                        <p className="text-lg text-gray-600 mt-3 "><span className="font-bold">Email : </span>{user?.email || "Email Not Available"}</p>
                        <p className="text-gray-600  my-1 capitalize"><span className="font-bold">Role : </span>{user?.role}</p>
                        <p className="text-gray-700 text-base leading-relaxed">
                            <span className="font-bold">Bio : </span>
                            {user?.description || "Add your bio."}
                        </p>
                        <div className="mt-3 flex flex-col sm:flex-row justify-center sm:justify-start space-y-4 sm:space-y-0 sm:space-x-6">

                            <Dialog open={open} onOpenChange={setOpen}>
                                <Button onClick={() => setOpen(true)} className='bg-blue-500 hover:bg-blue-600'>Edit Profile</Button>

                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle className="text-center">Edit profile</DialogTitle>
                                        <DialogDescription className="text-center">
                                            Make changes to your profile here.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">
                                                Name
                                            </Label>
                                            <Input
                                                id="name"
                                                name='name'
                                                onChange={changeEventHandler}
                                                value={input.name}
                                                className="col-span-3 text-gray-500"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="username" className="text-right">
                                                Description
                                            </Label>
                                            <Input
                                                id="description"
                                                name='description'
                                                onChange={changeEventHandler}
                                                value={input.description}
                                                className="col-span-3 text-gray-500"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="file" className='text-right'>Picture</Label>
                                            <Input id="file" type="file" accept="image/*"
                                                onChange={changeFileHandler} className='w-[277px]' />
                                        </div>
                                    </div>
                                    <DialogFooter>

                                        {
                                            loading ? <Button className="bg-blue-400"><Loader2 className="mr-2 w-4 h-4 animate-spin" />Please wait</Button> : <Button
                                                onClick={submitHandler} type='submit'
                                                className=" bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
                                            >
                                                Save Changes
                                            </Button>
                                        }

                                        {/* <Button onClick={submitHandler} type="submit" className="bg-blue-500 hover:bg-blue-600">Save changes</Button> */}
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            {/* <Button className='bg-red-500 hover:bg-red-600'>Logout</Button> */}
                        </div>
                    </div>
                </div>



            </div>
            <div className="max-w-6xl mx-auto p-8 bg-gradient-to-r bg-white shadow-xl rounded-2xl mt-6">
                <h1 className="text-2xl font-bold text-gray-800">Your Enrolled Courses</h1>
                <div className="mt-10">
                    {profileData.enrolledCourses && profileData.enrolledCourses.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {profileData.enrolledCourses?.map((course, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-5 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow flex flex-col items-center"
                                >
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full rounded-md mb-4 object-cover"
                                    />
                                    <h3 className="text-xl font-bold text-gray-800 text-center mb-2">{course.title}</h3>
                                    <p className="text-gray-600 text-sm text-center mb-4">{course.description}</p>
                                    <Button
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors"
                                    >
                                        View Course
                                    </Button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600 text-center">No courses enrolled yet.</p>
                    )}
                </div>
            </div>
            {/* <div className="max-w-6xl mx-auto p-8 bg-gradient-to-r bg-white shadow-xl rounded-2xl mt-6">
                <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>
                <div className="flex gap-4 mt-4">
                    <Button className="bg-green-500 hover:bg-green-600">Edit Profile</Button>
                    <Button className="bg-red-500 hover:bg-red-600">Logout</Button>
                </div>
            </div> */}
        </div>
    );
};



export default Profile;
