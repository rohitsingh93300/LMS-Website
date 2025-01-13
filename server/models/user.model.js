import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default:""
    },
    role: {
        type: String,
        enum: ["instructor", "student"],
        required: true
    },
    enrolledCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    ],
    photoUrl: {
        type: String,
        default: ""
    }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);