import express from "express";
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCreatorCourses, getPublishedCourse, removeLecture, togglePublishCourse } from "../controllers/course.controller.js";
// import upload from "../utils/multer.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";
const router = express.Router();

router.route("/").post(isAuthenticated,createCourse);
router.route("/published-courses").get( getPublishedCourse);
router.route("/").get(isAuthenticated,getCreatorCourses);
router.route("/:courseId").put(isAuthenticated,singleUpload,editCourse)
router.route("/:courseId").get(isAuthenticated, getCourseById);
router.route("/:courseId/lecture").post(isAuthenticated,createLecture)
router.route("/:courseId/lecture").get(isAuthenticated, getCourseLecture)
router.route("/:courseId/lecture/:lectureId").post(isAuthenticated, editLecture)
router.route("/lecture/:lectureId").delete(isAuthenticated, removeLecture);
router.route("/:courseId").patch( togglePublishCourse);


export default router;