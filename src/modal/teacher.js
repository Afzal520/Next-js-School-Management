import mongoose from "mongoose";


const teacherSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    teacherId: { type: String, required: true },
    email: { type: String, required: true },
    experience: { type: String, required: true },
    qualification: { type: String, required: true },
    mobile: { type: String, required: true },
    dob: { type: String, required: true },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        requird: true
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Authenication",
        required: true,
    },
    joiningDate: { type: String, requirde: true },
    image:{type:String}


})

const Teacher = mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema)
export default Teacher