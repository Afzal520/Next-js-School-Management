import Result from "@/modal/examResult"

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { subjects, examStatus, fullName, date, studentId, fatherName, motherName, examName, roll, dob } = req.body

        try {
            const existedResult = await Result.findOne({ roll })
            if (existedResult) {
                return res.status(404).json({ success: false, message: "result already existed" })
            }
            const newResult = new Result({
                subjects,
                fullName,
                fatherName,
                motherName,
                dob,
                studentId,
                examStatus,
                date,
                roll,
                examName
            })
            await newResult.save()
            res.status(200).json({ success: true, message: "Result Add Successfully" })

        } catch (error) {
            res.status(500).json({ success: false, message: error.message })
        }
    }
    else if (req.method === "GET") {
        const { id } = req.query
        try {
            const isResult = await Result.find({ studentId: id })
            if (!isResult) {
                return res.status(404).json({ success: false, message: "Result not found" })
            }
            res.status(200).json({ success: true, message: "result get Successfully", isResult })
        } catch (error) {
            res.status(500).json({ success: false, message: error.message })
        }
    }
    else {
        res.status(500).json({ success: false, message: "Method Not Allowed" })
    }
}