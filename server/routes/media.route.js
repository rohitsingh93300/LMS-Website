import express from "express";
import {singleUpload} from "../middlewares/multer.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

const router = express.Router();

router.route("/upload-video").post(singleUpload, async(req,res) => {
    try {
        const file = req.file;
        
        const fileUri = getDataUri(file)
        
        const result = await cloudinary.uploader.upload(fileUri, {
            resource_type: "auto",
          });
        res.status(200).json({
            success:true,
            message:"File uploaded successfully.",
            data:result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error uploading file"})
    }
});
export default router;
