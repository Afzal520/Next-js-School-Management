import { getSession } from "next-auth/react";
import Layout from "../dashboard/layout";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function TeacherTask() {
    const router = useRouter()
    const [subject, setSubjectName] = useState("")
    const [totalClass, setTotalClass] = useState("")
    const [totalUnit, setTotalUnit] = useState("")
    const [startDate, setStartDate] = useState("")
    const { id } = router.query
    // const currentDate = new Date().toISOString().split("T")[0]
    const formData = {
        subject,
        totalUnit,
        totalClass,
        startDate,
        teacherId: id
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("/api/teacherTask", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify(formData)
            })
            const result = await response.json()
            if (result.success) {
                toast.success(result.message)
                setStartDate("")
                setSubjectName('')
                setTotalClass("")
                setTotalUnit('')
            }
            else {
                toast.error(result.message)
            }
        } catch (error) {
           toast.error(error)
        }
    }
    return (
        <Layout>
            <div className="mt-[70px]">
                <h1>Add Teacher</h1>
                <div className=" bg-white shadow h-auto p-6">

                    <h2 className="font-bold text-2xl">Add Teacher task</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-3">

                            <div className="">
                                <label htmlFor="first" className="text-gray-600">Subject Name</label>
                                <input onChange={(e) => setSubjectName(e.target.value)} required type="text" className="p-2 px-4 border border-blue-400 rounded" placeholder="Subject Name " />
                            </div>
                            <div className="">
                                <label htmlFor="exp">Total Class</label>
                                <input onChange={(e) => setTotalClass(e.target.value)} required type="text" className="p-2 px-4 border border-blue-400 rounded" placeholder="Total class" />
                            </div>
                            <div className="">
                                <label htmlFor="exp">Total Unit</label>
                                <input onChange={(e) => setTotalUnit(e.target.value)} required type="text" className="p-2 px-4 border border-blue-400 rounded" placeholder="Total unit" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="exp">start Data</label>
                                <input onChange={(e) => setStartDate(e.target.value)} required type="date" className="p-2 px-4 border border-blue-400 rounded" placeholder="Start Date" />
                            </div>
                        </div>
                        <div className="flex ">
                            <div className="mt-4"><button className="border text-white rounded p-2 px-6 bg-blue-700">Submit</button></div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}
export async function getseverSideProps(context) {
    const session = getSession(context)
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