import { getSession } from "next-auth/react";
import Layout from "../dashboard/layout";
import connectToDB from "@/config/mongoose";
import { useEffect, useState } from "react";
import { StudentAttendance } from "@/modal/attendance";
import { useRouter } from "next/router";
import { FaArrowsUpDown, FaBarsStaggered, FaCirclePlus } from "react-icons/fa6";
import Pagination from "@mui/material/Pagination";
import { useSwipeable } from "react-swipeable"
import { FaDownload } from "react-icons/fa";
import { downloadExcel } from "@/utils/downloadReport";

export default function StudentReport({ studentReport }) {
    const [studentReports, setStudentReport] = useState(studentReport)
    const [searchQuery, setSearchQuery] = useState("")
    const [reportValue, setReportValue] = useState("Daily")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 30
    const filterdaily = studentReports.filter((list) => list.status.toLowerCase().includes(searchQuery.toLowerCase()))
    const filterPresent = studentReports.filter((list) => list.attendanceType === reportValue)
    const router = useRouter()
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => {
            setCurrentPage((prev) =>
                prev < Math.ceil(filterdaily.length / itemsPerPage) ? prev + 1 : prev
            );
        },
        onSwipedRight: () => {
            setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
        },
        trackMouse: true,
    });

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filterdaily.slice(startIndex, endIndex);
    const handleDownloadReport= ()=>{
        downloadExcel(paginatedData)
    }
    return (
        <Layout>
            <div>
                <div className="flex justify-between mt-[70px]">
                    <h1 className="text-center font-bold text-2xl">Students Reports</h1>
                    <div>
                        <input onChange={(e) => setSearchQuery(e.target.value)} type="search" className="p-2 px-4 border border-gray-500 outline-none rounded" placeholder="Search By Name" />
                    </div>
                    <select onChange={(e) => setReportValue(e.target.value)} className="border rounded border-black p-2 px-4">
                        <option selected value={"Daily"}>
                            Daily Attendance
                        </option>
                        <option value={"Test"}>
                            Test Attendance
                        </option>

                        <option value={"Practical"}>
                            Practical Attendance
                        </option>
                        <option value={"Pass"}>
                            Pass Student
                        </option>
                        <option value={"failed"}>
                            failed Student
                        </option>
                    </select>
                </div>
                <div className="flex justify-between mt-7 mb-4">
                    <div className="font-bold text-2xl"></div>
                    <div>
                        <div className="flex gap-6">  <p className="text-2xl cursor-pointer"><FaBarsStaggered /></p>

                            <p onClick={handleDownloadReport} className="text-2xl cursor-pointer"><FaDownload /></p>
                            <p className="text-2xl cursor-pointer"><FaCirclePlus /></p>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    {reportValue === "Daily" ? (<div className="" {...swipeHandlers}>
                        <table className="w-full ">

                            <thead className="bg-gray-200">
                                <tr className="p-2">
                                    <th className="border p-2 text-center"> <FaArrowsUpDown className="inline" /> SN</th>
                                    <th className="border p-2"> <FaArrowsUpDown className="inline" /> Photo</th>
                                    <th className="border p-2"> <FaArrowsUpDown className="inline" /> Name</th>
                                    <th className="border p-2"> <FaArrowsUpDown className="inline" /> Father Name</th>
                                    <th className="border p-2"> <FaArrowsUpDown className="inline" /> Status</th>
                                    <th className="border p-2"> <FaArrowsUpDown className="inline" /> Date</th>
                                    <th className="border p-2"> <FaArrowsUpDown className="inline" /> Phone</th>
                                </tr>
                            </thead>

                            {paginatedData.map((student, i) => <tbody className="bg-white">
                                <tr onClick={() => router.push(`/report/${student.studentId}`)} key={student._id} className="text-center cursor-pointer border">
                                    <td className="p-3">{startIndex + i + 1}</td>
                                    <td className="p-3">Photo</td>
                                    <td>{student.fullName}</td>
                                    <td>{"father Name"}</td>
                                    <td className="text-green-700 font-semibold">{student.status}</td>
                                    <td>{student.date}</td>
                                    <td>{"mobile Number"}</td>
                                </tr>
                            </tbody>)}
                        </table>
                        <div className="flex justify-center mt-4">
                            <Pagination
                                count={Math.ceil(filterdaily.length / itemsPerPage)}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                            />
                        </div>
                    </div>) : reportValue === "Test" ? (<table className="w-full ">
                        <thead className="bg-gray-200">
                            <tr className="p-2">
                                <th className="border p-2 text-center"> <FaArrowsUpDown className="inline" /> SN</th>
                                <th className="border p-2"> <FaArrowsUpDown className="inline" /> Photo</th>
                                <th className="border p-2"> <FaArrowsUpDown className="inline" /> Name</th>
                                <th className="border p-2"> <FaArrowsUpDown className="inline" /> Father Name</th>
                                <th className="border p-2"> <FaArrowsUpDown className="inline" /> Status</th>
                                <th className="border p-2"> <FaArrowsUpDown className="inline" /> Date</th>
                                <th className="border p-2"> <FaArrowsUpDown className="inline" /> Phone</th>
                            </tr>
                        </thead>
                        {filterPresent.map((student, i) => <tbody>
                            <tr key={student._id} className="text-center border">
                                <td className="p-3">{i + 1}</td>
                                <td className="p-3">Photo</td>
                                <td>{student.fullName}</td>
                                <td>{"father Name"}</td>
                                <td className="text-green-700 font-semibold">{student.status}</td>
                                <td>{"mobile Number"}</td>
                            </tr>
                        </tbody>)}
                    </table>) : reportValue === "Practical" ? (<table className="w-full ">
                        <thead className="bg-gray-200">
                            <tr className="p-2">
                                <th className="border p-2 text-center"> <FaArrowsUpDown className="inline" /> SN</th>
                                <th className="border p-2"> <FaArrowsUpDown className="inline" /> Photo</th>
                                <th className="border p-2"> <FaArrowsUpDown className="inline" /> Name</th>
                                <th className="border p-2"> <FaArrowsUpDown className="inline" /> Father Name</th>
                                <th className="border p-2"> <FaArrowsUpDown className="inline" /> Status</th>
                                <th className="border p-2"> <FaArrowsUpDown className="inline" /> Date</th>
                                <th className="border p-2"> <FaArrowsUpDown className="inline" /> Phone</th>
                            </tr>
                        </thead>
                        {filterPresent.map((student, i) => <tbody>
                            <tr key={student._id} className="text-center border">
                                <td className="p-3">{startIndex + i + 1}</td>
                                <td className="p-3">Photo</td>
                                <td>{student.fullName}</td>
                                <td>{"father Name"}</td>
                                <td className="text-green-700 font-semibold">{student.status}</td>
                                <td>{"mobile Number"}</td>
                            </tr>
                        </tbody>)}
                    </table>) : reportValue === "Pass" ? (<table className="w-full ">
                        <thead className="bg-gray-200">
                            <tr className="p-2">
                                <th className="border p-2 text-center"> <FaArrowsUpDown className="inline" /> SN</th>
                                <th className="border p-2"> <FaArrowsUpDown className="inline" /> Photo</th>
                                <th className="border p-2"> <FaArrowsUpDown className="inline" /> Name</th>
                                <th className="border p-2"> <FaArrowsUpDown className="inline" /> Father Name</th>
                                <th className="border p-2"> <FaArrowsUpDown className="inline" /> Status</th>
                                <th className="border p-2"> <FaArrowsUpDown className="inline" /> Date</th>
                                <th className="border p-2"> <FaArrowsUpDown className="inline" /> Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-center border">
                                <td className="p-3">P</td>
                                <td>afzal</td>
                                <td>Md Aslam</td>
                                <td className="text-green-700 font-semibold">Pass</td>
                                <td>9022308370</td>
                            </tr>
                        </tbody>
                    </table>) : reportValue === "failed" ? (<table className="w-full ">
                        <thead className="bg-gray-200">
                            <tr className="p-2">
                                <th className="border p-2 text-center"> <FaArrowsUpDown className="inline" /> SN</th>
                                <th className="border p-2"> <FaArrowsUpDown className="inline" /> Photo</th>
                                <th className="border p-2"> <FaArrowsUpDown className="inline" /> Name</th>
                                <th className="border p-2"> <FaArrowsUpDown className="inline" /> Father Name</th>
                                <th className="border p-2"> <FaArrowsUpDown className="inline" /> Status</th>
                                <th className="border p-2"> <FaArrowsUpDown className="inline" /> Date</th>
                                <th className="border p-2"> <FaArrowsUpDown className="inline" /> Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-center border">
                                <td className="p-3">P</td>
                                <td>afzal</td>
                                <td>Md Aslam</td>
                                <td className="text-red-700 font-semibold">Failed</td>
                                <td>9022308370</td>
                            </tr>
                        </tbody>
                    </table>) : reportValue === "absent" ? (<table className="w-full ">
                        <thead className="text-center border ">
                            <tr className="text-center font-semibold">
                                <th className="p-3">Photo</th>
                                <th>Name</th>
                                <th>Father Name</th>
                                <th>Status</th>
                                <th>Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-center border">
                                <td className="p-3">P</td>
                                <td>afzal</td>
                                <td>Md Aslam</td>
                                <td className="text-red-700 font-semibold">Absent</td>
                                <td>9022308370</td>
                            </tr>
                        </tbody>
                    </table>) : "data not found"}
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
                destination: "/login",
                permanent: false
            }
        }
    }
    const studentReport = await StudentAttendance.find({}).lean()
    return {
        props: {
            studentReport: JSON.parse(JSON.stringify(studentReport))
        }
    }
}