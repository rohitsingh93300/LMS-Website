import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Switch } from './ui/switch'
import { Progress } from './ui/progress'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setLecture } from '@/redux/lectureSlice'

const LectureTab = () => {
    const params = useParams();
    const { courseId, lectureId } = params;
    const { lecture } = useSelector(store => store.lecture)
    const selectedLecture = lecture.find(lecture => lecture._id === lectureId);
    // console.log("selectedLecture",selectedLecture);

    const [lectureTitle, setLectureTitle] = useState(selectedLecture.lectureTitle);
    const [uploadVideInfo, setUploadVideoInfo] = useState(null);
    const [isFree, setIsFree] = useState(selectedLecture.isPreviewFree);
    const [mediaProgress, setMediaProgress] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    // const [btnDisable, setBtnDisable] = useState(true);
    const [removeloading, setRemoveLoading] = useState(false)
    const [loading , setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const fileChangeHandler = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            setMediaProgress(true);
            try {
                const res = await axios.post(`http://localhost:8000/api/v1/media/upload-video`, formData, {
                    onUploadProgress: ({ loaded, total }) => {
                        setUploadProgress(Math.round((loaded * 100) / total));
                    },
                });

                if (res.data.success) {
                    console.log(res);
                    setUploadVideoInfo({
                        videoUrl: res.data.data.url,
                        publicId: res.data.data.public_id,
                    });
                    // setBtnDisable(false);
                    toast.success(res.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error("video upload failed");
            } finally {
                setMediaProgress(false);
            }
        }
    }

    const editLectureHandler = async (e) => {
        e.preventDefault();
        const data = {
            lectureTitle,
            videoInfo: uploadVideInfo,
            isPreviewFree: isFree,
        }
        try {
            setLoading(true)
            const res = await axios.post(`http://localhost:8000/api/v1/course/${courseId}/lecture/${lectureId}`, data, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            console.log("response", res);

            if (res.data.success) {
                dispatch([...lecture, setLecture(res.data.lecture)])
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to edit lecture")
        } finally{
            setLoading(false)
        }
    }

    const removeLectureHandler = async (e) => {
        e.preventDefault()
        try {
            setRemoveLoading(true)
            const res = await axios.delete(`http://localhost:8000/api/v1/course/lecture/${lectureId}`, { withCredentials: true })
            if (res.data.success) {
                navigate(`/admin/course/${courseId}/lecture`)
                toast.success(res.data.message)
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete Lecture")

        } finally {
            setRemoveLoading(false)
        }
    }

    return (
        <Card>
            <CardHeader className="flex justify-between">
                <div>
                    <CardTitle>Edit Lecture</CardTitle>
                    <CardDescription>
                        Make changes and click save when done.
                    </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                    <Button disabled={removeloading} variant="destructive" onClick={removeLectureHandler}>

                        {
                            removeloading ? <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </> : "Remove Lecture"
                        }
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div>
                    <Label>Title</Label>
                    <Input
                        // defaultValue={lectureTitle}
                        value={lectureTitle}
                        onChange={(e) => setLectureTitle(e.target.value)}
                        type="text"
                        placeholder="Ex. Introduction to Javascript"
                    />
                </div>
                <div className="my-5">
                    <Label>
                        Video <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        type="file"
                        accept="video/*"
                        onChange={fileChangeHandler}
                        placeholder="Ex. Introduction to Javascript"
                        className="w-fit"
                    />
                </div>
                <div className="flex items-center space-x-2 my-5">
                    <Switch checked={isFree} onCheckedChange={setIsFree} id="airplane-mode" />
                    <Label htmlFor="airplane-mode">Is this video FREE</Label>
                </div>

                {mediaProgress && (
                    <div className="my-4">
                        <Progress value={uploadProgress} />
                        <p>{uploadProgress}% uploaded</p>
                    </div>
                )}

                <div className="mt-4">
                    <Button disabled={loading} onClick={editLectureHandler}>
                        {
                            loading ? <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </> : "Update Lecture"
                        }

                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default LectureTab
