import mongoose from "mongoose";

const teacherTaskSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    totalClass: { type: Number, required: true },
    startDate: { type: String, required: true },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Authenication",
        required: true,
    },
    currentDate: { type: String, },
    totalUnit: { type: Number, required: true },
    completedUnit: { type: Number, default: 0 },
    completedClasses: { type: Number, default: 0 },
    isCompleted: { type: Boolean, default: false }
});

const TeacherTask = mongoose.models.TeacherTask || mongoose.model("TeacherTask", teacherTaskSchema);

export default TeacherTask;