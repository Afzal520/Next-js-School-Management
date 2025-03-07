import { useEffect, useState } from "react"




import Layout from "../dashboard/layout";
import { getSession } from "next-auth/react";
import connectToDB from "@/config/mongoose";
import Teacher from "@/modal/teacher";

export default function TeacherAttendence({ teacherList }) {
    const [searchQuery, setSearchQuery] = useState("")
    const handleStatusChange = async (teacherId, status, fullName, gender) => {
        const date = new Date().toISOString().split("T")[0];
        const formData = {
            teacherId,
            fullName,
            status,
            date,
            gender
        }
        console.log(formData)
        const response = await fetch("/api/teacherAttendance", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        const result = await response.json()
        console.log(result)

    }






    const filterStudent = teacherList.filter((list) => list.fullName.toLowerCase().includes(searchQuery.toLowerCase()))
    return (
        <Layout>
            <div className="max-full mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl border border-gray-200">
                <h1 className="text-2xl font-bold text-center mb-6">Teacher Attendance List </h1>
                <input
                    type="search"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                    placeholder="Search Student..."
                />

                <div className="mt-6 space-y-4">
                    {teacherList.length > 0 ? (
                        filterStudent.map((teacher, index) => (
                            <div
                                key={teacher._id}
                                className="p-4 bg-gray-100 shadow-md rounded-lg flex justify-between items-center"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 flex justify-center items-center bg-blue-500 text-white font-bold rounded-full">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold">{teacher.fullName}</h2>

                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                                        onClick={() => handleStatusChange(teacher.teacherId, "Present", teacher.fullName, teacher.gender)}
                                    >
                                        Present
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                                        onClick={() => handleStatusChange(teacher.teacherId, "Absent", teacher.fullName, teacher.gender)}
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
    )
}

export async function getServerSideProps(context) {
    await connectToDB()
    const session = await getSession(context)
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }
    const teacherList = await Teacher.find({})
    return {
        props: { teacherList: JSON.parse(JSON.stringify(teacherList)) }
    }
}