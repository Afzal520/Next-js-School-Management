import connectToDB from "@/config/mongoose"
import Authenication from "@/modal/authenication"
import Teacher from "@/modal/teacher"

export default async function handler(req, res) {
    await connectToDB()
    if (req.method === "POST") {
        try {
            const { fullName, gender, joiningDate, email, dob, mobile, experience, qualification } = req.body
            const auth= await Authenication.findOne({email})
            if(!auth){
                return res.status(404).json({success:false,message:"Login Email Not Match"})
            }
            const existedTeacher = await Teacher.findOne({ email })
            if (existedTeacher) {
                return res.status(404).json({ success: true, message: "Teacher Already Existed" })
            }
            const newTeacher = new Teacher({
                fullName,
                email,
                dob,
                mobile,
                experience,
                joiningDate,
                qualification,
                gender,
                teacherId:auth._id
            })
            await newTeacher.save()

            res.status(201).json({ success: true, message: "Teacher Register Successfully" })


        } catch (error) {
            res.status(500).json({ success: false, message: "Enternal server error", error: error.message })
        }
    }
    else if (req.method === "GET") {
        const { id } = req.query

        try {
            if (!id) {
                return res.status(404).json({ success: false, message: "Teacher ID Must Provide" })
            }
            const teacherDetails = await Teacher.findOne({ teacherId: id })
            if (!teacherDetails) {
                return res.status(404).json({ success: false, message: "Details not found" })
            }
            res.status(200).json({ success: true, message: "Teacher Deatils Get Successfully", teacherDetails })
        } catch (error) {
            res.status(500).json({ success: false, message: "Server error", error: error.message })
        }
    }
    else if (req.method === "PUT") {
        const { id } = req.query
        console.log(id,"teacher id here")
        const { fullName,
            email,
            dob,
            mobile,
            experience,
            joiningDate,
            qualification,
            gender,
            teacherId } = req.body



        try {

            if (!id) {
                return res.status(404).json({ success: false, message: 'Teacher Id not found try again ' })
            }
            const updateData = {
                fullName,
                email,
                dob,
                mobile,
                experience,
                joiningDate,
                qualification,
                gender,
                teacherId
            }
            const existedTeacher = await Teacher.findOne({teacherId:id})
            console.log(existedTeacher)
            console.log(existedTeacher._id)
            if (!existedTeacher) {
                return res.status(404).json({ success: false, message: "Teacher detail not found" })
            }
            const updateTeacherDetails = await Teacher.findByIdAndUpdate(existedTeacher._id, updateData,{new:true})
            res.status(200).json({ success: true, message: "Teacher Details SuccessFully", updateTeacherDetails })

        } catch (error) {
            res.status(500).json({ success: false, message: "Server error", error: error.message })
        }
    }
    else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' })
    }
}
