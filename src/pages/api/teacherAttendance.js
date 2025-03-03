import { TeacherAttendance } from "@/modal/attendance"

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { status, teacherId, date, fullName,gender } = req.body
      
        try {
            const existedData = await TeacherAttendance.findOne({ teacherId, date })
            if (existedData) {
                if (status === "Absent") {
                    existedData.status = status
                    existedData.date = date
                 await  existedData.save()
                    return res.status(200).json({ success: true, message: "Status Updated" })
                }
                else if (status === "Present") {
                    existedData.status = status
                    existedData.date = date
   await existedData.save()
                    return res.status(200).json({ success: true, message: "Status Updated" })
                }
            }
            const newAttendance = new TeacherAttendance({
                status,
                teacherId,
                date,
                fullName,
                gender
            })
            await newAttendance.save()
            res.status(200).json({ success: true, message: 'Attendance Add SuccessFully' })
        } catch (error) {
            res.status(500).json({ success: true, message: 'Server Error' })
        }
    }
    else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' })
    }
}