import { useState } from "react";
import Layout from "../dashboard/layout";
import { getSession } from "next-auth/react";
import connectToDB from "@/config/mongoose";
import Student from "@/modal/student";
import { toast } from "react-toastify";
import { useSwipeable } from "react-swipeable"
import Pagination from "@mui/material/Pagination"

export default function Attendance({ studentList }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [attendanceType, setAttendanceType] = useState("");

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 30
    const handleStatusChange = async (studentId, status, fullName, gender ,fatherName, motherName, roll) => {

        const date = new Date().toISOString().split("T")[0];
        const formData = {
            studentId:studentId,
            status:status ,
            fullName,
            attendanceType,
            gender,
            fatherName,
            motherName,
            roll,
            date
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
            if (result.success) {
                toast.success(result.message, { autoClose: 100 })
            }
            else {
                toast.error(result.message)
            }
        } catch (error) {
            console.error("Error submitting attendance:", error);
            alert("Error submitting attendance");
        }
    };
    // const handleResultChange =async (studentId, result, fullName, gender) => {
    //     const formData = {
    //         studentId,
    //         result,
    //         fullName, gender
    //     }
    //     try {
    //         const response = await fetch("", {
    //             method: 'POST',
    //             headers: {
    //                 "Content-type": "application/json"
    //             },
    //             body: JSON.stringify(formData)
    //         })
    //         const result = await response.json()
    //         console.log(result)
    //     } catch (error) {

    //     }
    // }
    const filterStudent = studentList.filter((list) =>
        list.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => {
            setCurrentPage((prev) =>
                console.log(prev)
                    (filterStudent.length / itemsPerPage) ? prev + 1 : prev
            );
        },
        onSwipedRight: () => {
            setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
        },
        trackMouse: true,
    })

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filterStudent.slice(startIndex, endIndex);



    return (
        <Layout>
            <div className="max-full mx-auto mt-[70px] p-6 bg-white shadow-xl rounded-xl border border-gray-200">
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
                                <option value={"Result"}>Result</option>

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
                <div className="mt-6 space-y-4" {...swipeHandlers}>
                    {paginatedData.length > 0 ? (
                        paginatedData.map((student, index) => (
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
                                        onClick={() => handleStatusChange(student._id, "Present", student.fullName, student.gender, student.fatherName, student.motherName, student.roll)}
                                    >
                                        Present
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                                        onClick={() => handleStatusChange(student._id, "Present", student.fullName, student.gender, student.fatherName, student.motherName, student.roll)}
                                    >
                                        Absent
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : attendanceType == "Result" ? ((
                        paginatedData.map((student, index) => (
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
                                        onClick={() => handleResultChange(student._id, "Pass", student.fullName, student.gender)}
                                    >
                                        Pass
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                                        onClick={() => handleResultChange(student._id, "Failed", student.fullName, student.fatherName, student.motherName, student.roll, student.gender)}
                                    >
                                        failed
                                    </button>
                                </div>
                            </div>
                        ))
                    )) : null}
                    <div className="flex justify-center mt-4">
                        <Pagination
                            count={Math.ceil(filterStudent.length / itemsPerPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </div>
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