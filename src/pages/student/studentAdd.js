import { toast } from "react-toastify";
import Layout from "../dashboard/layout";
import { useState } from "react"



export default function StudentAdd() {
    const [fullName, setFullName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [dob, setDob] = useState("")
    const [mobile, setMobile] = useState("")
    const [roll, setRoll] = useState("")
    const [gender, setGender] = useState("")
    const [className, setClassName] = useState("")
    const [admissionId, setAdmission] = useState("")
    const [section, setSection] = useState("")
    const [religion, setReligion] = useState("")
    const [bloodGroup, setBloodGroup] = useState("")
    const [image, setImage] = useState("")
    const formData = {
        fullName,
        lastName,
        gender,
        className,
        section,
        religion,
        bloodGroup,
        admissionId,
        email,
        roll,
        dob,
        mobile,
        image
    }
    const handleSubmit = async (e) => {
        e.preventDefault(e)
        try {
            const response = await fetch("/api/studentRegister", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            const result = await response.json()
            if (result.success) {
                toast.success(result.message)
            }
            else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error(error)
            console.log("Something went wrong", error);
        }
    }
    return (

        <Layout>
            <div className="mt-[70px]">
                <h1>Add Student</h1>
                <div className=" bg-white shadow h-screen p-6">
                    <h2 className="font-bold text-2xl">Student Information</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">

                            <div>
                                <div className="flex flex-col">
                                    <label htmlFor="first">First Name</label>
                                    <input onChange={(e) => setFullName(e.target.value)} required type="text" className="p-2 px-4 border border-blue-400 rounded" placeholder="Enter First Name" />
                                </div>
                                <div className="flex flex-col mt-8">
                                    <label htmlFor="first" className="text-gray-600">Date Of Birth</label>
                                    <input onChange={(e) => setDob(e.target.value)} required type="date" className="p-2 px-4 border border-blue-400 rounded" placeholder="DD-MM-YYYY" />
                                </div>
                                <div className="flex flex-col mt-8">
                                    <label htmlFor="first" className="text-gray-600 ">Religion</label>
                                    <select onChange={(e) => setReligion(e.target.value)} required className="border border-blue-500 p-[10px] px-4 rounded">
                                        <option value={""} className="text-gray-600 p-[20px] px-4">

                                            Choose Religion
                                        </option>
                                        <option value={"hindu"} className="text-gray-600 p-[20px] px-4">

                                            Hindu
                                        </option>
                                        <option value={"muslim"} className="text-gray-600">
                                            Muslim
                                        </option>

                                    </select>
                                </div>
                                <div className="flex flex-col mt-8">
                                    <label htmlFor="first">Section</label>
                                    <select onChange={(e) => setSection(e.target.value)} required className="border border-blue-500 p-[10px] px-4 rounded">
                                        <option value={""} className="text-gray-600 p-[20px] px-4">
                                            Choose Section
                                        </option>
                                        <option value={"general"} className="text-gray-600 p-[20px] px-4">
                                            General
                                        </option>
                                        <option value={"SC"} className="text-gray-600">
                                            SC
                                        </option>
                                        <option value={"OBC"} className="text-gray-600">
                                            OBC
                                        </option>
                                    </select>
                                </div>

                            </div>

                            <div>
                                <div className="flex flex-col">
                                    <label htmlFor="first">Last Name</label>
                                    <input onChange={(e) => setLastName(e.target.value)} required type="text" className="p-2 px-4 border border-blue-400 rounded" placeholder="Enter First Name" />
                                </div>
                                <div className="flex flex-col mt-8">
                                    <label htmlFor="first" className="text-gray-600">Roll</label>
                                    <input type="text" onChange={(e) => setRoll(e.target.value)} required className="p-2 px-4 border border-blue-400  rounded" placeholder="Enter Roll Number" />
                                </div>
                                <div className="flex flex-col mt-8">
                                    <label htmlFor="first" className="text-gray-600 ">E-mail</label>
                                    <input type="email" onChange={(e) => setEmail(e.target.value)} required className="p-2 px-4 border border-blue-400 rounded" placeholder="Enter Email Address" />
                                </div>
                                <div className="flex flex-col mt-8">
                                    <label htmlFor="first">Admission ID</label>
                                    <input type="text" onChange={(e) => setAdmission(e.target.value)} required className="p-2 px-4 border border-blue-400 rounded" placeholder="Enter Admission ID" />
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
                                    <label htmlFor="first" className="text-gray-600">Blood Group</label>
                                    <select onChange={(e) => setBloodGroup(e.target.value)} required className="border border-blue-500 p-[10px] px-4 rounded">
                                        <option value={""}>
                                            Please Select Group
                                        </option>
                                        <option value={"A+"}>
                                            A+
                                        </option>
                                        <option value={"A-"}>
                                            A-
                                        </option>
                                        <option value={"B+"}>
                                            B+
                                        </option>
                                        <option value={"other"}>
                                            Other
                                        </option>
                                    </select>
                                </div>
                                <div className="flex flex-col mt-8">
                                    <label htmlFor="first" className="text-gray-600 ">Class</label>
                                    <select onChange={(e) => setClassName(e.target.value)} required className="border border-blue-500 p-[10px] px-4 rounded">
                                        <option value={"BCA1"}>
                                            BCA1
                                        </option>
                                        <option value={"BCA2"}>
                                            BCA2
                                        </option>
                                        <option value={"BCA3"}>
                                            BCA3
                                        </option>
                                        <option value={"BCA4"}>
                                            BCA4
                                        </option>
                                        <option value={"BCA5"}>
                                            BCA5
                                        </option>
                                    </select>
                                </div>
                                <div className="flex flex-col mt-8">
                                    <label htmlFor="first">Phone</label>
                                    <input onChange={(e) => setMobile(e.target.value)} required type="text" className="p-2 px-4 border border-blue-400 rounded" placeholder="Enter Phone Number" />
                                </div>

                            </div>


                        </div>
                        <div className="flex justify-between">

                            <div className="mt-5">
                                <h3 className="font-bold">Upload Student Photo (150px * 150px)</h3>
                                <input onChange={(e) => setImage(e.target.value)} type="file" id="file" className="hidden " />
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
    return {
        props: {}
    }
}