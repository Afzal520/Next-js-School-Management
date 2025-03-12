import mongoose from "mongoose";
const examResultSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    roll: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    dob: { type: String, required: true },
    examStatus: { type: String, required: true },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    date: { type: String, required: true },
    subjects: [

        {
            name: { type: String },

            max: { type: String },


            obt: { type: String },


            total: { type: String },
        }

    ],
    examName: { type: String }
})
const examResult = mongoose.models.ExamResult || mongoose.model("ExamResult", examResultSchema)
export default examResult