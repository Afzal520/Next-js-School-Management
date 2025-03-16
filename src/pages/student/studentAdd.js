import { toast } from "react-toastify";
import Layout from "../dashboard/layout";
import { useState } from "react"



export default function StudentAdd() {
    const [fullName, setFullName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [dob, setDob] = useState("")
    const [mobile, setMobile] = useState("")
    const [fatherName, setfatherName] = useState("")
    const [gender, setGender] = useState("")
    const [className, setClassName] = useState("")
    const [motherName, setmotherName] = useState("")
    const [section, setSection] = useState("")
    const [religion, setReligion] = useState("")
    const [bloodGroup, setBloodGroup] = useState("")
    const [images, setImage] = useState("")
    const [formData, setFormData] = useState({
        fullName: "",
        lastName: "",
        gender: "",
        className: "",
        section: "",
        religion: "",
        bloodGroup: "",
        fatherName: "",
        motherName: "",
        email: "",

        dob: "",
        mobile: "",
        profile:null
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file)
        setFormData({ ...formData, profile: file });
    };

  console.log(formData)
    const handleSubmit = async (e) => {
        e.preventDefault(e)
        const form = new FormData()
        for (const key in formData) {
            form.append(key, formData[key]);
            console.log(key)

        }

        try {
            const response = await fetch("/api/studentRegister", {
                method: "POST",
               //  headers:{"Content-Type":"application/json"},
                body:form
            })
            const result = await response.json()
            console.log(result)
            if (result.success) {
                toast.success(result.message)
                setFullName("")
                setLastName("")
                setBloodGroup('')
                setDob("")
                setGender("")
                setSection("")
                setReligion("")
                setEmail("")
                setfatherName("")
                setmotherName("")
                setMobile("")
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
                                    <input onChange={handleInputChange} value={formData.fullName} name="fullName" required type="text" className="p-2 px-4 border border-blue-400 rounded" placeholder="Enter First Name" />
                                </div>
                                <div className="flex flex-col mt-8">
                                    <label htmlFor="first" className="text-gray-600">Date Of Birth</label>
                                    <input onChange={handleInputChange} value={formData.dob} name="dob" required type="date" className="p-2 px-4 border border-blue-400 rounded" placeholder="DD-MM-YYYY" />
                                </div>
                                <div className="flex flex-col mt-8">
                                    <label htmlFor="first" className="text-gray-600 ">Religion</label>
                                    <select onChange={handleInputChange} value={formData.religion} name="religion" required className="border border-blue-500 p-[10px] px-4 rounded">
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
                                    <select onChange={handleInputChange} value={formData.section} name="section" required className="border border-blue-500 p-[10px] px-4 rounded">
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
                                    <input onChange={handleInputChange} value={formData.lastName} name="lastName" required type="text" className="p-2 px-4 border border-blue-400 rounded" placeholder="Enter First Name" />
                                </div>
                                <div className="flex flex-col mt-8">
                                    <label htmlFor="first" className="text-gray-600">Mother Name</label>
                                    <input type="text" onChange={handleInputChange} value={formData.motherName} name='motherName' required className="p-2 px-4 border border-blue-400  rounded" placeholder="Mother Name" />
                                </div>
                                <div className="flex flex-col mt-8">
                                    <label htmlFor="first" className="text-gray-600 ">E-mail</label>
                                    <input type="email" onChange={handleInputChange} value={formData.email} name="email" required className="p-2 px-4 border border-blue-400 rounded" placeholder="Enter Email Address" />
                                </div>
                                <div className="flex flex-col mt-8">
                                    <label htmlFor="first">father Name</label>
                                    <input type="text" onChange={handleInputChange} value={formData.fatherName} name="fatherName" required className="p-2 px-4 border border-blue-400 rounded" placeholder="Father Name" />
                                </div>

                            </div>

                            <div>
                                <div className="flex flex-col">
                                    <label htmlFor="first">Gender</label>
                                    <select onChange={handleInputChange} value={formData.gender} name="gender" required className="border border-blue-500 p-[10px] px-4 rounded">
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
                                    <select onChange={handleInputChange} value={formData.bloodGroup} name="bloodGroup" required className="border border-blue-500 p-[10px] px-4 rounded">
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
                                    <select onChange={handleInputChange} value={formData.className} name="className" required className="border border-blue-500 p-[10px] px-4 rounded">
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
                                    <input onChange={handleInputChange} value={formData.mobile} name="mobile" required type="text" className="p-2 px-4 border border-blue-400 rounded" placeholder="Enter Phone Number" />
                                </div>

                            </div>


                        </div>
                        <div className="flex justify-between">

                            <div className="mt-5">
                                <h3 className="font-bold">Upload Student Photo (150px * 150px)</h3>
                                <input onChange={handleFileChange} type="file"  accept="image/*" id="file" name="profile" className="hidden " />
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