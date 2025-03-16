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
    roll: { type: String },
    admissionId: { type: String },
    bloodGroup: { type: String },
    fatherName: { type: String },
    motherName: { type: String },
    className: { type: String },
    image: { type: String },
   

}, { timestamps: true });

studentSchema.pre('save', async function (next) {
    if (this.isNew) {
        const lastStudent = await Student.findOne().sort({ createdAt: -1 });
        const lastRollNumber = lastStudent ? parseInt(lastStudent.roll, 10) : 0;
        this.roll = (lastRollNumber + 1).toString().padStart(4, '0'); // Generate roll number with leading zeros
    }
    next();
});

const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student;