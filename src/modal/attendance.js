import mongoose from "mongoose";

const StudentAttendanceSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    status: {
        type: String,
        enum: ["Present", "Absent"],
        required: true
    },
    attendanceType: {
        type: String,
        enum: ["Daily", "Test", "Practical"],
        default:"Daily",
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true
    },
    date: { type: String, required: true }
});



const TeacherAttendanceSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    status: {
        type: String,
        enum: ["Present", "Absent"],
        required: true
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true
    },
    date: { type: String, required: true }
});

// Prevent model re-registration
const StudentAttendance = mongoose.models.StudentAttendance || mongoose.model("StudentAttendance", StudentAttendanceSchema);
const TeacherAttendance = mongoose.models.TeacherAttendance || mongoose.model("TeacherAttendance", TeacherAttendanceSchema);

export { StudentAttendance, TeacherAttendance };