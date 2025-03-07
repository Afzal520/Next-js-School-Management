
import Layout from "../dashboard/layout";
import { getSession } from "next-auth/react";
import { useState } from "react";

export default function TeacherAdd() {
    const [fullName, setFullName] = useState("")

    const [email, setEmail] = useState("")
    //    const [teacherEmail,setTeacherEmail] = useState("")
    const [dob, setDob] = useState("")
    const [mobile, setMobile] = useState("")
    const [experience, setExperience] = useState("")
    const [qualification, setQualification] = useState("")
    const [gender, setGender] = useState("")
    const [JoiningDate, setJoining] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("teacher")


    const handleSubmit = async (e) => {
        e.preventDefault(e)

        const formData = {
            fullName,
            experience,
            qualification,
            gender,
            email,
            dob,
         
            JoiningDate,
            mobile,

        }
        try {
            const response = await fetch("/api/teacherRegister", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            const result = await response.json()

        } catch (error) {

        }
    }
    const handleLogin = async (e) => {
        const formData = {
            email,
            fullName, password,
            role,
        }
        e.preventDefault()
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const result = await response.json()
        console.log(result)
    }
    return (
        <Layout>
         <div>
            <h1>Add Teacher</h1>
            <div className=" bg-white shadow h-auto p-6">
                <div className="mt-3">
                    <h2 className="font-bold text-2xl">Teacher Loging Details</h2>
                    <form onSubmit={handleLogin}>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="flex flex-col">
                                <label htmlFor="first">UserName </label>
                                <input onChange={(e) => setFullName(e.target.value)} required type="text" className="p-2 px-4 border border-blue-400 rounded" placeholder="User Name" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="first">E-mail ID</label>
                                <input onChange={(e) => setEmail(e.target.value)} required type="email" className="p-2 px-4 border border-blue-400 rounded" placeholder="email" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="first">Password</label>
                                <input onChange={(e) => setPassword(e.target.value)} required type="password" className="p-2 px-4 border border-blue-400 rounded" placeholder="password" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <button className="p-2 text-white px-4 rounded  bg-blue-700">Loging Teacher </button>
                        </div>
                    </form>
                </div>
                <h2 className="font-bold text-2xl">Teacher Information</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
                        <div>
                            <div className="flex flex-col">
                                <label htmlFor="first" className="text-gray-600">FullName</label>
                                <input onChange={(e) => setFullName(e.target.value)} required type="text" className="p-2 px-4 border border-blue-400 rounded" placeholder="Teacher FullName " />
                            </div>
                            <div className="flex flex-col mt-8">
                                <label htmlFor="exp">Phone</label>
                                <input onChange={(e) => setMobile(e.target.value)} required type="text" className="p-2 px-4 border border-blue-400 rounded" placeholder="mobile" />
                            </div>
                            <div className="flex flex-col mt-8">
                                <label htmlFor="exp">Experience</label>
                                <input onChange={(e) => setExperience(e.target.value)} required type="text" className="p-2 px-4 border border-blue-400 rounded" placeholder="Experience" />
                            </div>
                        </div>

                        <div>
                            <div className="flex flex-col">
                                <label htmlFor="first">Gender</label>
                                <select onChange={(e) => setGender(e.target.value)} required className="border border-blue-500 p-[10px] px-4 rounded">
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
                                <input type="email" onChange={(e) => setEmail(e.target.value)} className="p-2 px-4 border border-blue-400 rounded" placeholder="Email" />
                            </div>

                            <div className="flex flex-col mt-8">
                                <label htmlFor="">Joining Date</label>
                                <input type="date" onChange={(e) => setJoining(e.target.value)} className="p-2 px-4 border border-blue-400 rounded" placeholder="Joining Date" />
                            </div>


                        </div>

                        <div>

                            <div className="flex flex-col ">
                                <label htmlFor="first">Date of Birth</label>
                                <input onChange={(e) => setDob(e.target.value)} required type="date" className="p-2 px-4 border border-blue-400 rounded" placeholder="Enter Phone Number" />
                            </div>

                            <div className="flex flex-col mt-8">
                                <label htmlFor="first" className="text-gray-600">Qualification</label>
                                <input onChange={(e) => setQualification(e.target.value)} required type="text" className="p-2 px-4 border border-blue-400 rounded" placeholder="Teacher FullName " />
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
    return {
        props: {}
    }
}




