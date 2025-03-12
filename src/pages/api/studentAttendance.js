import connectToDB from "@/config/mongoose";
import { StudentAttendance } from "@/modal/attendance";

export default async function handler(req, res) {
    await connectToDB();

    if (req.method === "POST") {
        const { studentId, fullName, status, date, gender, attendanceType,motherName,fatherName,roll } = req.body;

        try {
            let existedData = await StudentAttendance.findOne({ studentId, date });

            if (existedData) {
                existedData.status = status;
                existedData.attendanceType = attendanceType;
                await existedData.save();
                return res.status(202).json({ success: true, message: 'Status Updated' });
            } else {
                const newAttendance = new StudentAttendance({
                    studentId,
                    fullName,
                    fatherName,
                    motherName,
                    roll,
                    status,
                    date,
                    gender,
                    attendanceType,
                });

                await newAttendance.save();
                return res.status(201).json({ success: true, message: 'Attendance Recorded' });
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
        }

    }
    else if (req.method == "GET") {
        const { id } = req.query
        try {
            const existedData = await StudentAttendance.find({ studentId: id })
            if (!existedData) {
                return res.status(404).json({ success: false, message: "Data Not Found" })
            }
            res.status(200).json({ success: true, message: "Attendance Detail Get Successfully", existedData })
        } catch (error) {
            res.status(500).json({ success: false, message: "Server Error", error: error.message })
        }
    }
    else {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}