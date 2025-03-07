
import Layout from "../dashboard/layout";
import { getSession } from "next-auth/react";
import connectToDB from "@/config/mongoose";
import Teacher from "@/modal/teacher";
import { FaBarsStaggered, FaCirclePlus } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa";
import { FaArrowsUpDown } from "react-icons/fa6";
import { useState } from "react";
import { useRouter } from "next/router";
import { MdOutlineAddTask } from "react-icons/md";

export default function ({teacher}) {
    const [teacherList, setteacherList] = useState(teacher)
    const [searchQuery, setNameSearchQuery] = useState("")
    const router = useRouter()
    const handleDeatil = (id) => {
        router.push(`/teacher/teacherDetail?id=${id}`)
    }
    const teacherFilter = teacherList.filter((list) => list.fullName.toLowerCase().includes(searchQuery.toLowerCase()))

   
    return (
        <Layout>
          <div>
            <div className="flex justify-between">
                <p>Teacher </p>
                <p>Home / Teacher </p>
            </div>
            <div className="grid grid-cols-7 mt-2 justify-between">
                <div className="col-span-2">
                    <input onChange={(e) => setNameSearchQuery(e.target.value)} type="text" className="p-2 px-4 border border-blue-500 rounded" placeholder="Search by Name" />
                </div>
                <div className="col-span-2">
                    <input type="text" className="p-2 px-4 border border-blue-500 rounded" placeholder="Search by Id" />
                </div>
                <div className="col-span-2">
                    <input type="text" className="p-2 px-4 border border-blue-500 rounded" placeholder="Search by Phone" />
                </div>
                <div className="col-span-1">
                    <button className=" px-7 p-2 rounded bg-blue-700 text-white font-bold">Search</button>
                </div>
            </div>

            <div className="flex justify-between mt-7 mb-4">
                <div className="font-bold text-2xl">teacher</div>
                <div>
                    <div className="flex gap-6">  <p className="text-2xl cursor-pointer"><FaBarsStaggered /></p>

                        <p className="text-2xl cursor-pointer"><FaDownload /></p>
                        <p className="text-2xl cursor-pointer"><FaCirclePlus /></p>
                    </div>
                </div>
            </div>

            <div className="w-full">
                <div className="flex items-center mb-2 gap-2">
                    <label>
                        show
                    </label>
                    <select className="border p-2">
                        <option>
                            20
                        </option>
                        <option>
                            40
                        </option>
                        <option>
                            60
                        </option>
                        <option>
                            80
                        </option>
                        <option>
                            100
                        </option>
                    </select>
                    <p>Entries</p>
                </div>
                <table className="border-2 w-full">
                    <thead className="bg-gray-200">
                        <tr className="p-2">
                            <th><input type="checkbox" /></th>
                            <th className="border p-2 text-center"> <FaArrowsUpDown className="inline" /> ID</th>
                            <th className="border p-2"> <FaArrowsUpDown className="inline" /> NAME</th>
                            <th className="border p-2"> <FaArrowsUpDown className="inline" />Qualification</th>
                            <th className="border p-2"> <FaArrowsUpDown className="inline" />Experience</th>
                            <th className="border p-2"> <FaArrowsUpDown className="inline" />JoiningDate</th>
                            <th className="border p-2"> <FaArrowsUpDown className="inline" />PHONE</th>
                            <th className="border p-2"> <FaArrowsUpDown className="inline" />Add Task</th>
                        </tr>
                    </thead>
                    <tbody className="w-full text-center border">
                        {teacherFilter?.map((list) => {
                            return (
                                <tr className="w-full  cursor-pointer">
                                    <td>
                                        <input type="checkbox" />
                                    </td>
                                    <td className="">id here</td>
                                    <td onClick={() => handleDeatil(list.teacherId)} className="">
                                        <div className=" box-border flex gap-1 justify-evenly items-center">
                                            <p className="w-10 h-10 bg-yellow-400 rounded-full"></p>
                                            <p>{list?.fullName}</p>
                                        </div>

                                    </td>

                                    <td className="border">{list?.qualification}</td>
                                    <td className="border">{list?.experience}</td>
                                    <td>{list?.joiningDate}</td>



                                    <td className="border">{list.mobile}</td>
                                    <td className="border text-center" onClick={() => router.push(`/teacher/teacherTask?id=${list.teacherId}`)}>  <MdOutlineAddTask className="inline text-xl" /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    await connectToDB()
    const session = getSession(context)
    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        }
    }
    const teacherList =await Teacher.find({})
    return {
        props: {teacher:JSON.parse(JSON.stringify(teacherList))}
    }
}
