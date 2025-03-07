import connectToDB from "@/config/mongoose";
import TeacherTask from "@/modal/teacherTask";

export default async function handler(req, res) {
    await connectToDB();

    if (req.method === "PUT") {
        try {
            const { teacherId, increment, unitIncrement, currentDate } = req.body;

            if (!teacherId || isNaN(Number(increment)) || isNaN(Number(unitIncrement))) {
                return res.status(400).json({ success: false, message: "Invalid Data Provided" });
            }

            const teacherTask = await TeacherTask.findOne({ teacherId });

            if (!teacherTask) {
                return res.status(404).json({ success: false, message: "Teacher Task Not Found" });
            }

          
            // if (teacherTask.currentDate === currentDate) {
            //     return res.status(400).json({ success: false, message: "Same Date can't add 2 Class" });
            // }

            teacherTask.completedUnit += Number(unitIncrement) || 0;
            teacherTask.currentDate = currentDate;
            teacherTask.completedClasses += Number(increment) || 0; 
            teacherTask.isCompleted = teacherTask.completedClasses >= teacherTask.totalClass;

            await teacherTask.save();

            res.status(200).json({ success: true, message: "Teacher Task Updated Successfully", teacherTask });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        }
    } 

    else if (req.method === "POST") {
        try {
            const { subject, totalClass, totalUnit, teacherId, startDate } = req.body;

            if (!subject || !totalClass || !totalUnit || !teacherId || !startDate) {
                return res.status(400).json({ success: false, message: "All Fields Are Required" });
            }

            const newTask = new TeacherTask({
                subject,
                startDate,
                teacherId,
                totalUnit: Number(totalUnit),
                totalClass: Number(totalClass),
            });

            await newTask.save();

            res.status(201).json({ success: true, message: "Task added successfully", newTask });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: "Server Error", error: error.message });
        }
    } 

    else {
        res.status(405).json({ success: false, message: "Method Not Allowed" });
    }
}
