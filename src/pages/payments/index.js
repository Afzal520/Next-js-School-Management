
import Layout from "../dashboard/layout";
import { getSession } from "next-auth/react";
import Student from "@/modal/student";
import connectToDB from "@/config/mongoose";
import { parse } from "dotenv";
import { FaBarsStaggered, FaCirclePlus } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa";
import { FaArrowsUpDown } from "react-icons/fa6";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSwipeable } from "react-swipeable"
import Pagination from "@mui/material/Pagination"
import { downloadExcel } from "@/utils/downloadReport";

export default function ({ student }) {
    const [studentList, setStudentList] = useState(student)
    const [searchQuery, setNameSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemPerPage] = useState(20)

    const router = useRouter()
    const handleStudentDeatil = (id) => {
        router.push(`/payments/${id}`)
    }
    const studentFilter = studentList.filter((list) => list.fullName.toLowerCase().includes(searchQuery.toLowerCase()))
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => {
            setCurrentPage((prev) =>
                prev < Math.ceil(studentFilter.length / itemsPerPage) ? prev + 1 : prev
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
    const paginatedData = studentFilter.slice(startIndex, endIndex);
    const handleDownloadReport = () => {
        downloadExcel(paginatedData)
    }
    return (
        <Layout>
            <div className="mt-[70px]">
                <div className="flex justify-between">
                    <p>Student </p>
                    <p>Home / Student </p>
                </div>
                <div className="flex gap-2 mt-2 justify-between">
                    <div className="col-span-2">
                        <input onChange={(e) => setNameSearchQuery(e.target.value)} type="text" className="p-2 px-4 border border-blue-500 rounded" placeholder="Search by Name" />
                    </div>
                 
                    <div className="col-span-2">
                        <input type="text" className="p-2 px-4 border border-blue-500 rounded" placeholder="Search by Phone" />
                    </div>
                    <div className="col-span-1">
                        <button className=" px-7 p-2 rounded bg-blue-700 text-white font-bold">Search</button>
                    </div>
                </div>

                <div className="flex justify-between mt-7 mb-4">
                    <div className="font-bold text-2xl">Students</div>
                    <div>
                        <div className="flex gap-6">  <p className="text-2xl cursor-pointer"><FaBarsStaggered /></p>

                            <p onClick={handleDownloadReport} className="text-2xl cursor-pointer"><FaDownload /></p>
                            <p className="text-2xl cursor-pointer"><FaCirclePlus /></p>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="flex items-center mb-2 gap-2">
                        <label>
                            show
                        </label>
                        <select onChange={(e) => setItemPerPage(e.target.value)} className="border  p-2">
                            <option value={"20"}>
                                20
                            </option>
                            <option value={"30"}>
                                30
                            </option>
                            <option value={"50"}>
                                50
                            </option>
                            <option value={"80"}>
                                80
                            </option>
                            <option value={"100"}>
                                100
                            </option>
                        </select>
                        <p>Entries</p>
                    </div>
                    <div className="" {...swipeHandlers}>
                        <table className="border-2 w-full">
                            <thead className="bg-gray-200">
                                <tr className="p-2">
                                    <th className="border p-2 text-center">SN:</th>
                                    <th className="border p-2 text-center"> <FaArrowsUpDown className="inline" /> Roll No</th>
                                    <th className="border p-2 text-center"><FaArrowsUpDown className="inline" /> Profile</th>
                                    <th className="border p-2"> <FaArrowsUpDown className="inline" /> NAME</th>
                                    <th className="border p-2"> <FaArrowsUpDown className="inline" />CLASS</th>
                                    <th className="border p-2"> <FaArrowsUpDown className="inline" />Father Name</th>
                                    <th className="border p-2"> <FaArrowsUpDown className="inline" />PHONE</th>
                                    <th className="border p-2 "> <FaArrowsUpDown className="inline" />Totat Fee</th>
                                    <th className="border p-2 "> <FaArrowsUpDown className="inline" /> Status</th>

                                </tr>
                            </thead>
                            <tbody className="w-full text-center border">
                                {paginatedData?.map((list, i) => {
                                    return (
                                        <tr onClick={() => handleStudentDeatil(list._id)} className="w-full  cursor-pointer">
                                            <td className="border font-semibold ">
                                                {startIndex + i + 1}
                                            </td>
                                            <td className="border">{list?.roll}</td>
                                            <td className="border text-center">  <img src={list?.image} className="w-10 h-10 inline  bg-yellow-400 rounded-full" /></td>
                                            <td className="border">
                                                <p>{list?.fullName}</p>
                                            </td>
                                            <td className="border">{list?.className}</td>
                                            <td className="border">{list?.fatherName}</td>
                                            <td className="border">{list?.mobile}</td>
                                            <td className="border">{list?.fee}</td>
                                            <td className="border">{list?.feeStatus}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <div className="flex justify-center mt-4">
                            <Pagination
                                count={Math.ceil(studentFilter.length / itemsPerPage)}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
}


export async function getServerSideProps(context) {
    const session = getSession(context)
    if (!session) {
        return {
            redirect: {
                distination: '/login',
                permanent: false
            }
        }
    }
    await connectToDB()
    const student = await Student.find({})


    return {
        props: { student: JSON.parse(JSON.stringify(student)) }
    }
}




