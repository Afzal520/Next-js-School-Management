
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    dob: { type: String, required: true },
    mobile: { type: Number, required: true },
    religion: { type: String },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Authenication",
        required: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true
    },
    section: { type: String },
    roll: { type: String, required: true },
    admissionId: { type: String },
    bloodGroup: { type: String },
    className: { type: String },
    image:{type:String}

}, { timestamps: true })


const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student;