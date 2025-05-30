
import { useEditDetailsMutation, useGetDetailsQuery } from "@/querySlice";
import Layout from "../dashboard/layout";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify";


export default function EditTeacher() {
    // const [teacher, setTeacher] = useState(null)
    const [fullName, setFullName] = useState("")
    const [teacherId, setTeacherId] = useState("")
    const [email, setEmail] = useState("")
    //    const [teacherEmail,setTeacherEmail] = useState("")
    const [dob, setDob] = useState("")
    const [mobile, setMobile] = useState("")
    const [experience, setExperience] = useState("")
    const [qualification, setQualification] = useState("")
    const [gender, setGender] = useState("")
    const [JoiningDate, setJoining] = useState("")
    // const [isLoading, setLoading] = useState(true)
    const router = useRouter()
    const { id } = router.query 
    const {data:teacher ,isError, isFetching,isSuccess,refetch ,isLoading} = useGetDetailsQuery(id)
    const [editDetails] = useEditDetailsMutation()
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await fetch(`/api/teacherRegister?id=${id}`, {
    //             method: "GET"
    //         })
    //         const result = await response.json()
    //         // setLoading(false)


    //     }
    //     fetchData()
    // }, [id])
        useEffect(() => {
        if (teacher) {
            setFullName(teacher.teacherDetails.fullName)
            setExperience(teacher.teacherDetails.experience)
            setDob(teacher.teacherDetails.dob)
            setGender(teacher.teacherDetails.gender)
            setJoining(teacher.teacherDetails.JoiningDate || null)
            setTeacherId(teacher.teacherDetails.teacherId)
            setMobile(teacher.teacherDetails.mobile)
            setEmail(teacher.teacherDetails.email)
            setQualification(teacher.teacherDetails.qualification)
        }
    }, [teacher])
    if (isLoading) {
        return <div>Loading teacher details...</div>;
    }
    console.log(teacher.teacherDetails.fullName)
  
   
    const handleSubmit = async (e) => {
        e.preventDefault(e)
     
        const formData = {
            fullName,
            experience,
            qualification,
            gender,
            email,
            dob,
            teacherId,
            JoiningDate,
            mobile,

        }
        try {
           await  editDetails({id, data:formData})
           refetch()
            // const response = await fetch(`/api/teacherRegister?id=${id}`, {
            //     method: "PUT",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify(formData)
            // })
            // const result = await response.json()
            // if (result.success) {
            //     toast.success(result.message)
            //     setLoading(false)
            // }
           
        } catch (error) {
            toast.error(error)
        }
    }
    if (isLoading) {
        return <div>Loading teacher details...</div>;
    }
    return (
        <Layout>
           
            <div className=" lg:mt-[70px] bg-white shadow h-auto p-6">
            <h1>Edit Teacher</h1>
                <h2 className="font-bold text-2xl">Teacher Information Update</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">

                        <div>
                            <div className="flex flex-col">
                                <label htmlFor="first">Teacher ID</label>
                                <input value={teacherId} onChange={(e) => setTeacherId(e.target.value)} required type="text" className="p-2 px-4 border border-blue-400 rounded" placeholder="TeacherId" />
                            </div>
                            <div className="flex flex-col mt-8">
                                <label htmlFor="first">Date of Birth</label>
                                <input value={dob} onChange={(e) => setDob(e.target.value)} required type="date" className="p-2 px-4 border border-blue-400 rounded" placeholder="Enter Phone Number" />
                            </div>

                            <div className="flex flex-col mt-8">
                                <label htmlFor="first" className="text-gray-600">Qualification</label>
                                <input value={qualification} onChange={(e) => setQualification(e.target.value)} required type="text" className="p-2 px-4 border border-blue-400 rounded" placeholder="Teacher FullName " />
                            </div>
                        </div>

                        <div>
                            <div className="flex flex-col">
                                <label htmlFor="first" className="text-gray-600">FullName</label>
                                <input value={fullName} onChange={(e) => setFullName(e.target.value)} required type="text" className="p-2 px-4 border border-blue-400 rounded" placeholder="Teacher FullName " />
                            </div>
                            <div className="flex flex-col mt-8">
                                <label htmlFor="exp">Phone</label>
                                <input value={mobile} onChange={(e) => setMobile(e.target.value)} required type="text" className="p-2 px-4 border border-blue-400 rounded" placeholder="mobile" />
                            </div>
                            <div className="flex flex-col mt-8">
                                <label htmlFor="exp">Experience</label>
                                <input value={experience} onChange={(e) => setExperience(e.target.value)} required type="text" className="p-2 px-4 border border-blue-400 rounded" placeholder="Experience" />
                            </div>
                        </div>

                        <div>
                            <div className="flex flex-col">
                                <label htmlFor="first">Gender</label>
                                <select value={gender} onChange={(e) => setGender(e.target.value)} required className="border border-blue-500 p-[10px] px-4 rounded">
                                    <option value={""}>
                                        Select Gender
                                    </option>
                                    <option value={"Male"}>
                                        Male
                                    </option>
                                    <option value={"Female"}>
                                        Female
                                    </option>
                                </select>
                            </div>
                            <div className="flex flex-col mt-8">
                                <label htmlFor="">Email</label>
                                <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} className="p-2 px-4 border border-blue-400 rounded" placeholder="Email" />
                            </div>

                            <div className="flex flex-col mt-8">
                                <label htmlFor="">Joining Date</label>
                                <input value={JoiningDate} type="date" onChange={(e) => setJoining(e.target.value)} className="p-2 px-4 border border-blue-400 rounded" placeholder="Joining Date" />
                            </div>


                        </div>


                    </div>
                    <div className="flex justify-between">

                        <div className="mt-5">
                            <h3 className="font-bold">Upload Student Photo (150px * 150px)</h3>
                            <input type="file" id="file" className="hidden " />
                            <label htmlFor="file" className="bg-black text-white mt-4 px-4 py-2 rounded cursor-pointer">Choose File</label>
                        </div>
                        <div className="mt-4"><button className="border text-white rounded p-2 px-6 bg-blue-700">Submit</button></div>

                    </div>

                </form>
            </div>

        </Layout>
    )
}
export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        }
    }
    return {
        props: {}
    }
}



