
import { IoPeopleSharp } from "react-icons/io5";
import { FcDepartment } from "react-icons/fc";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TeacherLogin from "../popup/teacherLogin";

export default function DetailTeacher() {
    const [teacher, setTeacher] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [toggleLogin ,setToggleLogin] = useState(false)
console.log(teacher)
    const router = useRouter()
    const { id } = router.query
    console.log(id)
    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const response = await fetch(`/api/teacherRegister?id=${id}`, {
                    method: "GET",
                });
                const result = await response.json();
                setTeacher(result.teacherDetails)
                setLoading(false)
                console.log(result);
            }
        };
        fetchData();
    }, [id]);
    if (isLoading) {
        return <div>Loading studentDetails .......</div>
    }
  
    const handleDetails = () => {
        router.push(`/teacher/teacherEdit?id=${id}`)
    }
    return (
        <div>
            <div className="bg-white shadow-lg h-52">
                <div>  <img alt="student bg" /></div>
                <div className="flex justify-evenly items-end">
                    <div className="h-32 w-32 bg-yellow-400 rounded-full"></div>
                    <div className="">
                        <p className="font-bold">{teacher?.fullName}</p>
                        <p className="text-gray-400">Computer Science</p>
                    </div>

                    <div className="flex  flex-col">
                        <p className="font-bold ">admissionId</p>
                        <p className="block text-gray-400">{"234"}</p>
                    </div>

                    <div>LinkedIn</div>
                    <div className="">GitHub</div>
                    <div className="flex justify-between gap-4">
                        <button className="bg-blue-800 rounded text-white p-2 px-4">Message </button>
                        <button className="bg-blue-500 text-white rounded p-2 px-4">Follow</button>
                        <button onClick={(handleDetails)} className="bg-blue-500 text-white rounded p-2 px-4">Edit Details</button>
                        <button onClick={()=>setToggleLogin(true)}>Add Login Details</button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-6 mt-4 gap-4">
                <div className="col-span-2 border bg-white shadow-lg p-5">
                    <h1 className="text-xl font-bold">Personal Details :</h1>
                    <div className="flex flex-col mt-2  ">
                        <div className="">
                            <div className="flex gap-2 mb-2">
                                <p className="text-blue-400"><IoPeopleSharp /></p>
                                <div className="flex  flex-col">
                                    <p className="font-bold ">Name</p>
                                    <p className="block text-gray-400">{teacher?.fullName} </p>
                                </div>
                            </div>
                            <div className="flex gap-2 md-2">
                                <p className="text-blue-400"><FcDepartment /> </p>
                                <div className="flex  flex-col">
                                    <p className="font-bold ">Department</p>
                                    <p className="block text-gray-400">Computer Science</p>
                                </div>
                            </div>
                            {/* <div className="flex gap-2 md-2">
                                <p className="text-blue-400"><FcDepartment /> </p>
                                <div className="flex  flex-col">
                                    <p className="font-bold ">Religion</p>
                                    <p className="block text-gray-400">{student?.religion}</p>
                                </div>
                            </div> */}
                            <div className="flex gap-2 md-2">
                                <p className="text-blue-400"><FaPhoneAlt /></p>
                                <div className="flex  flex-col">
                                    <p className="font-bold ">Mobile</p>
                                    <p className="block text-gray-400">{teacher?.mobile}</p>
                                </div>
                            </div>
                            <div className="flex gap-2 md-2">
                                <p className="text-blue-400"><MdOutlineMail /></p>
                                <div className="flex  flex-col">
                                    <p className="font-bold ">E-mail</p>
                                    <p className="block text-blue-500">{teacher?.email}</p>
                                </div>
                            </div>


                            <div className="flex gap-2 md-2">
                                <p className="text-blue-400">  <IoPeopleSharp /> </p>
                                <div className="flex  flex-col">
                                    <p className="font-bold ">Gender</p>
                                    <p className="block text-gray-400">{teacher?.gender}</p>
                                </div>
                            </div>
                            <div className="flex gap-2 md-2">
                                <p className="text-bule-400"><MdDateRange /></p>
                                <div className="flex  flex-col">
                                    <p className="font-bold ">Date of Birth</p>
                                    <p className="block text-gray-400">{teacher?.dob}</p>
                                </div>
                            </div>

                        </div>




                    </div>
                </div>
                <div className="col-span-4 bg-white shadow-lg border">
                    <div className="p-4 flex flex-col">
                        <p>About Me</p>
                        <div>
                            <h2 className="font-bold ">Hello I , {teacher?.fullName}</h2>
                            <p className="text-gray-400">
                                lorem lorem   lorem lorem Layout jnhdwhuhACBIYET7 HSGDXBYT ABXFD ZFSRu6r jazbu6trtu
                                lorem lorem   lorem lorem Layout jnhdwhuhACBIYET7 HSGDXBYT ABXFD ZFSRu6r jazbu6trtu
                                lorem lorem   lorem lorem Layout jnhdwhuhACBIYET7 HSGDXBYT ABXFD ZFSRu6r jazbu6trtu

                            </p>
                            <p className="text-gray-400 mt-3">
                                lorem lorem   lorem lorem Layout jnhdwhuhACBIYET7 HSGDXBYT ABXFD ZFSRu6r jazbu6trtu



                            </p>
                        </div>
                        <div className="mt-5">
                            <h4 className="font-bold">Education</h4>
                            <div className="text-gray-400">
                                <p className=""> 2020 - 2022</p>
                                <p className="">Higher  Education , ABC College </p>
                                <p className=""> 2022 - 2024</p>
                                <p>Secondary Education , ABC College </p>
                            </div>
                        </div>
                    </div>
                </div>
                {toggleLogin && <TeacherLogin/>}
            </div>
        </div>
    )
}