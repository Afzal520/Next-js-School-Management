import connectToDB from "@/config/mongoose";
import { StudentAttendance } from "@/modal/attendance";

export default async function handler(req, res) {
    await connectToDB();

    if (req.method === "POST") {
        const { studentId, fullName, status, date, gender, attendanceType } = req.body;

        try {
            let existedData = await StudentAttendance.findOne({ studentId });

            if (existedData) {
                existedData.status = status;
                existedData.date = date;
                existedData.attendanceType = attendanceType;
                await existedData.save();
                return res.status(202).json({ success: true, message: 'Status Updated' });
            } else {
                const newAttendance = new StudentAttendance({
                    studentId,
                    fullName,
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
    } else {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}