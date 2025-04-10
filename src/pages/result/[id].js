import { useRouter } from "next/router";
import Layout from "../dashboard/layout";
import { useState, useEffect } from "react";
import Loader from "@/components/loader/loader";
import { toast } from "react-toastify";

export default function ResultDetails() {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true)
    const [studentD, setStudentD] = useState({})
    const [term, setTerm] = useState(false)
    const [examStatus, setExamStatus] = useState("")

    
    const date = new Date().toISOString().split("T")[0]
    const { id } = router.query;
    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await fetch(`/api/studentRegister?id=${id}`, {
                    method: "GET"
                })
                const result = await response.json()
                setStudentD(result?.StudentDetails)
                setLoading(false)

            }
            fetchData()
        } catch (error) {
            console.log(error)
        }
    }, [id])

    const [studentDetails, setStudentDetails] = useState({
        roll: "",
        fullName: "",
        dob: "",
        date,
      
        fatherName: "",
        motherName: "",
        examName: "Unit Pre-Exam",
        subject: "Computer Application",
        studentId: "",
        subjects: [
            { name: "Fundamental", max: 30, obt: "-", total: 30 },
            { name: "Programming In C", max: 30, obt: "-", total: 30 },
            { name: "Basic I S", max: 30, obt: "-", total: 30 },
            { name: "Math", max: 30, obt: "-", total: 30 },
            { name: "Soft Skills", max: 30, obt: "-", total: 30 },
        ],
    });

    useEffect(() => {
        if (studentD) {
            setStudentDetails((prev) => ({
                ...prev,
                roll: studentD.roll,
                fullName: studentD.fullName,
                fatherName: studentD.fatherName,
                motherName: studentD.motherName,
                dob: studentD.dob,
                studentId: studentD._id,
                date,
             

            }))
        }
    }, [studentD])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedSubjects = studentDetails.subjects.map((subject, index) => {
            const obt = e.target[`obt-${index}`].value;
            const total = obt;
            return { ...subject, obt, total };
        });

        const updatedStudentDetails = { ...studentDetails,examStatus, subjects: updatedSubjects };

        try {
            if (examStatus == "Failed" || examStatus == "Pass") {
                const response = await fetch(`/api/result`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedStudentDetails),
                });

                const result = await response.json();

                if (result.success) {
                    alert("Data submitted successfully!");
                } else {
                    alert("Failed to submit data.");
                }
            }
            else {
                toast.error("Insure all data is correct")
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("An error occurred while submitting data.");
        }
    };
    console.log(studentD?._id)

    if (isLoading) {
        return <Loader />
    }
    return (
        <Layout>
            <div className="lg:mt-[70px] bg-white p-6 rounded-lg shadow-lg">
                <div className="mb-6">
                    <div>
                        <h1 className="text-center font-bold text-2xl mb-1">UNIVERSITY OF LUCKNOW</h1>
                        <h2 className="text-center font-bold">(ACCREDITED A++ BY NAAC)</h2>
                        <h2 className="text-center font-bold">RESULT SHEET GRADE CREDIT & SCORE</h2>
                        <h2 className="text-center font-bold">CITY COLLEGE OF MANAGEMENT TIWARIGANJ FAIZABAD ROAD</h2>
                        <h3 className="text-center font-bold">CHINHAT, LUCKNOW</h3>
                    </div>
                    <div className="flex gap-20 mt-5">
                        <div className="">
                            <div className="mb-2 flex gap-4">
                                <p className="font-bold">Roll No :</p>
                            </div>
                            <div className="mb-2 flex gap-4">
                                <p className="font-bold">Name of Student :</p>
                            </div>
                            <div className="mb-2 flex gap-4">
                                <p className="font-bold">Name of Student :</p>
                            </div>
                            <div className="mb-2 ">
                                <p className="font-bold">Father's Name :</p>
                            </div>
                            <div className="mb-2">
                                <p className="font-bold">Mother's Name :</p>
                            </div>
                            <div className="mb-2">
                                <p className="font-bold">Name of Exam :</p>
                            </div>
                            <div className="mb-2">
                                <p className="font-bold">Subject :</p>
                            </div>
                        </div>
                        <div className="font-bold  capitalize">
                            <div className="mb-2"><span>{studentD?.roll}</span></div>
                            <div className="mb-2"><span>{studentD?.fullName}</span></div>
                            <div className="mb-2"><span>{studentD?.dob}</span></div>
                            <div className="mb-2"> <span>{studentD?.fatherName}</span></div>
                            <div className="mb-2"><span>{studentD?.motherName}</span></div>
                            <div className="mb-2"><span>{studentDetails.examName}</span></div>
                            <div className="mb-2"><span>{studentDetails.subject}</span></div>
                        </div>
                        <div className="font-bold">Enrollment No : LS/24/15215</div>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <table className="w-full bg-white rounded-lg shadow-lg">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-2 border">Subject</th>
                                <th className="p-2 border">Max</th>
                                <th className="p-2 border">Obt</th>
                                <th className="p-2 border">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentDetails.subjects.map((subject, index) => (
                                <tr key={index} className="text-center bg-gray-50">
                                    <td className="p-2 border">{subject.name}</td>
                                    <td className="p-2 border">{subject.max}</td>
                                    <td className="p-2 border">
                                        <input
                                            name={`obt-${index}`}
                                            className="border p-1 rounded mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            defaultValue={subject.obt}
                                        />
                                    </td>
                                    <td className="p-2 border">{subject.obt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex  mt-4">
                        <button type="submit" className="bg-blue-500 text-white p-2 px-8 rounded-lg">
                            Submit
                        </button>
                    </div>
                </form>
                <div className="flex justify-between mt-4">
                    <div className="flex justify-center items-center gap-2">

                        <p className="text-blue-500"> Insure all data is correct if correct then check the box</p>
                    </div>
                    <div className="flex gap-4">
                        <select className="p-2 px-4 border-2 border-black" onChange={(e) => setExamStatus(e.target.value)}>
                            <option value={""}>
                                Choose Exam Status
                            </option>
                            <option className="text-red-500" value={"Failed"}>
                                Failed
                            </option>
                            <option className="test-green-500" value={"Pass"}>
                                Pass
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </Layout>
    );
}