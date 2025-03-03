import { useState } from "react";
import Layout from "../dashboard/layout";
import { getSession } from "next-auth/react";
import connectToDB from "@/config/mongoose";
import Student from "@/modal/student";

export default function Attendance({ studentList }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [attendanceType, setAttendanceType] = useState("");

    const handleStatusChange = async (studentId, status, fullName, gender) => {
        const date = new Date().toISOString().split("T")[0];
        const formData = {
            studentId,
            fullName,
            status,
            date,
            gender,
            attendanceType,
        };

        try {
            const response = await fetch("/api/studentAttendance", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            console.log(result);
            alert(result.message);
        } catch (error) {
            console.error("Error submitting attendance:", error);
            alert("Error submitting attendance");
        }
    };

    const filterStudent = studentList.filter((list) =>
        list.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Layout>
            <div className="max-full mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl border border-gray-200">
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-center mb-6">{attendanceType} Attendance</h1>
                    </div>
                    <div className="">
                        <div className="flex gap-4">
                            <select onChange={(e) => setAttendanceType(e.target.value)} className="p-2 px-4 border">
                                <option value={"Daily"}>Choose Attendance Type</option>
                                <option value={"Daily"}>Daily Attendance</option>
                                <option value={"Practical"}>Practical</option>
                                <option value={"Test"}>Test</option>
                            </select>
                        </div>
                    </div>
                </div>
                <input
                    type="search"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                    placeholder="Search Student..."
                />
                <div className="mt-6 space-y-4">
                    {studentList.length > 0 ? (
                        filterStudent.map((student, index) => (
                            <div
                                key={student._id}
                                className="p-4 bg-gray-100 shadow-md rounded-lg flex justify-between items-center"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 flex justify-center items-center bg-blue-500 text-white font-bold rounded-full">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold">{student.fullName}</h2>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                                        onClick={() => handleStatusChange(student._id, "Present", student.fullName, student.gender)}
                                    >
                                        Present
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                                        onClick={() => handleStatusChange(student._id, "Absent", student.fullName, student.gender)}
                                    >
                                        Absent
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">No results found</p>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    await connectToDB();
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }
    const studentList = await Student.find({});
    return {
        props: { studentList: JSON.parse(JSON.stringify(studentList)) },
    };
}