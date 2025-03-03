import connectToDB from "@/config/mongoose";
import Student from "@/modal/student"
import { getToken } from "next-auth/jwt";


export default async function handler(req, res) {
    await connectToDB();
    const token = await getToken({ req })
    if (!token) {
        return json.status(405).json({ success: false, message: "Unauthorized Person" })
    }
    const adminId = token.id

    if (req.method === "POST") {
        try {
            const { email, roll, className, bloodGroup, mobile, section, religion, admissionId, gender, dob, fullName, lastName } = req.body
            const existedStudent = await Student.findOne({ email })
            if (existedStudent) {
                return res.status(404).json({ success: false, message: "Student Already exists" })
            }
            const newStudent = new Student({
                fullName,
                lastName,
                gender,
                dob,
                email,
                roll,
                className,
                bloodGroup,
                mobile,
                section,
                religion,
                adminId,

            })
            await newStudent.save()
            res.status(201).json({ success: true, message: "Student register Successfully" })
        } catch (error) {
            res.status(500).json({ success: false, message: "Server Error", error: error.message })
        }
    }
    else if (req.method === "GET") {
        const { id } = req.query

        try {
            if (!id) { return res.status(404).json({ success: false, message: "Student ID Must Provide" }) }
            const StudentDetails = await Student.findOne({ _id: id })


            if (!StudentDetails) {
                return res.status(404).json({ success: false, message: "Student not found" });
            }
            console.log(StudentDetails)

            res.status(200).json({ success: true, message: "Student Get Successfully", StudentDetails })
        } catch (error) {
            res.status(500).json({ success: false, message: "Enternal server Error", error: error.message })
        }
    }
    else if (req.method === "PUT") {

        try {
            const { id } = req.query
            const { fullName,
                lastName,
                gender,
                dob,
                email,
                roll,
                className,
                bloodGroup,
                mobile,
                section,
                religion,
              
            } = req.body
            const studentDetails = await Student.findById(id)

            if (!studentDetails) {
                return req.status(404).json({ success: true, message: "student details not found" })

            }
            const updateStudent = {
                fullName,
                lastName,
                gender,
                dob,
                email,
                roll,
                className,
                bloodGroup,
                mobile,
                section,
                religion,
              
            }
            await Student.findByIdAndUpdate(studentDetails._id, updateStudent)
            return res.json({ success: true, message: "Student Information  Update Successfull" })

        } catch (error) {
            res.status(500).json({ success: false, message: "Enternal server Error", error: error.message })
        }
    }

    else {
        res.status(407).json({ success: false, message: "Method Not Allowed" })
    }
}
