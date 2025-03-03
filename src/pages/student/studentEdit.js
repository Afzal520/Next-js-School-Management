
import Layout from "../dashboard/layout";
import connectToDB from "@/config/mongoose"
import Student from "@/modal/student"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { getSession } from "next-auth/react"

export default function StudentEdit({ studentList }) {
    const [student, setStudent] = useState("");
    const [fullName, setFullName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [mobile, setMobile] = useState("");
    const [roll, setRoll] = useState("");
    const [gender, setGender] = useState("");
    const [className, setClassName] = useState("");
    const [admissionId, setAdmission] = useState("");
    const [section, setSection] = useState("");
    const [religion, setReligion] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [isLoading, setLoading] = useState(true);
    const router = useRouter();
    const { id } = router.query;

    const formData = {
        fullName,
        lastName,
        gender,
        dob,
        email,
        roll,
        className,
        bloodGroup,
        mobile,
        section,
        religion,
    };

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const response = await fetch(`/api/studentRegister?id=${id}`, {
                    method: "GET",
                });
                const result = await response.json();
                setStudent(result.StudentDetails);
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        if (student) {
            setFullName(student.fullName);
            setLastName(student.lastName);
            setEmail(student.email);
            setDob(student.dob);
            setMobile(student.mobile);
            setRoll(student.roll);
            setGender(student.gender);
            setClassName(student.className);
            setAdmission(student.admissionId);
            setSection(student.section);
            setReligion(student.religion);
            setBloodGroup(student.bloodGroup);
        }
    }, [student]);
    console.log(student)
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(id)
        try {
            if (id) {
                const response = await fetch(`/api/studentRegister?id=${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });
                const result = await response.json();
                console.log(result);
            }
        } catch (error) {
            console.log("Something went wrong", error);
        }
    };

    if (isLoading) {
        return <div>Loading student details...</div>;
    }
    return (
        <Layout>
            <div>
                <h1>Edit Student</h1>
                <div className="bg-white shadow h-screen p-6">
                    <h2 className="font-bold text-2xl">Student Information</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="flex gap-5">
                            <input type="search" className="border w-full border-blue-600 rounded-lg p-2 px-4" placeholder="Search by Name or registerId" />
                            <button type="button" className="bg-blue-700 text-white p-2 px-4 border rounded-lg">Search</button>
                        </div>
                        <div className="grid grid-cols-3 gap-6 mt-3">
                            <div>
                                <div className="flex flex-col">
                                    <label htmlFor="first">First Name</label>
                                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="p-2 px-4 border border-blue-400 rounded" placeholder="Enter First Name" />
                                </div>
                                <div className="flex flex-col mt-8">
                                    <label htmlFor="dob" className="text-gray-600">Date Of Birth</label>
                                    <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="p-2 px-4 border border-blue-400 rounded" placeholder="DD-MM-YYYY" />
                                </div>
                                <div className="flex flex-col mt-8">
                                    <label htmlFor="religion" className="text-gray-600">Religion</label>
                                    <select value={religion} onChange={(e) => setReligion(e.target.value)} className="border border-blue-500 p-[10px] px-4 rounded">
                                        <option value="" className="text-gray-600 p-[20px] px-4">Choose Religion</option>
                                        <option value="Hindu" className="text-gray-600 p-[20px] px-4">Hindu</option>
                                        <option value="Muslim" className="text-gray-600">Muslim</option>
                                    </select>
                                </div>
                                <div className="flex flex-col mt-8">
                                    <label htmlFor="section">Section</label>
                                    <select value={section} onChange={(e) => setSection(e.target.value)} className="border border-blue-500 p-[10px] px-4 rounded">
                                        <option value="" className="text-gray-600 p-[20px] px-4">Choose Section</option>
                                        <option value="General" className="text-gray-600 p-[20px] px-4">General</option>
                                        <option value="SC" className="text-gray-600">SC</option>
                                        <option value="OBC" className="text-gray-600">OBC</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-col">
                                    <label htmlFor="last">Last Name</label>
                                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="p-2 px-4 border border-blue-400 rounded" placeholder="Enter Last Name" />
                                </div>
                                <div className="flex flex-col mt-8">
                                    <label htmlFor="roll" className="text-gray-600">Roll</label>
                                    <input type="text" value={roll} onChange={(e) => setRoll(e.target.value)} className="p-2 px-4 border border-blue-400 rounded" placeholder="Enter Roll Number" />
                                </div>
                                <div className="flex flex-col mt-8">
                                    <label htmlFor="email" className="text-gray-600">E-mail</label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 px-4 border border-blue-400 rounded" placeholder="Enter Email Address" />
                                </div>
                                <div className="flex flex-col mt-8">
                                    <label htmlFor="admissionId">Admission ID</label>
                                    <input type="text" value={admissionId} onChange={(e) => setAdmission(e.target.value)} className="p-2 px-4 border border-blue-400 rounded" placeholder="Enter Admission ID" />
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-col">
                                    <label htmlFor="gender">Gender</label>
                                    <select value={gender} onChange={(e) => setGender(e.target.value)} className="border border-blue-500 p-[10px] px-4 rounded">
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                <div className="flex flex-col mt-8">
                                    <label htmlFor="bloodGroup" className="text-gray-600">Blood Group</label>
                                    <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} className="border border-blue-500 p-[10px] px-4 rounded">
                                        <option value="">Please Select Group</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="flex flex-col mt-8">
                                    <label htmlFor="className" className="text-gray-600">Class</label>
                                    <select value={className} onChange={(e) => setClassName(e.target.value)} className="border border-blue-500 p-[10px] px-4 rounded">
                                        <option value="BCA1">BCA1</option>
                                        <option value="BCA2">BCA2</option>
                                        <option value="BCA3">BCA3</option>
                                        <option value="BCA4">BCA4</option>
                                        <option value="BCA5">BCA5</option>
                                    </select>
                                </div>
                                <div className="flex flex-col mt-8">
                                    <label htmlFor="mobile">Phone</label>
                                    <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} className="p-2 px-4 border border-blue-400 rounded" placeholder="Enter Phone Number" />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-5">
                            <div className="">
                                <h3 className="font-bold">Upload Student Photo (150px * 150px)</h3>
                                <input type="file" id="file" className="hidden" />
                                <label htmlFor="file" className="bg-black text-white px-4 py-2 rounded cursor-pointer">Choose File</label>
                            </div>
                            <div>
                                <button type="submit" className="p-2 rounded text-white px-4 border bg-blue-700">Edit Details</button>
                            </div>
                        </div>
                    </form>
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
                distination: ("/login"),
                permanent: false
            }

        }
    }
    const student = await Student.find({})
    const studentList = student.map((list) => JSON.parse(JSON.stringify(list)))

    return {
        props: { studentList: studentList }
    }
}

