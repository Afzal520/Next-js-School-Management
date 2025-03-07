
import Layout from "./layout";

import { getSession } from "next-auth/react";
import { StudentAttendance } from "@/modal/attendance";
import connectToDB from "@/config/mongoose";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Default styles for the calendar

import { IoMdTime } from "react-icons/io";
import { IoBookOutline } from "react-icons/io5";
import { FaTv } from "react-icons/fa";
import { Line, Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, ArcElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useState } from "react";

ChartJS.register(CategoryScale, LinearScale, PointElement, ArcElement, LineElement, BarElement, Title, Tooltip, Legend);

export default function Student({ attendance }) {
    const filterDailyPresent = attendance.filter((list)=>list.status === "Present")
    const filterPracticalPresent =attendance.filter((list)=>list.attendanceType ==="Practical")
     const [date, setDate] = useState(new Date())
     const data = {
         labels: ['Complete', 'Remaining'],
         datasets: [
             {
 
                 data: [20, 40], // Changed to numbers
                 backgroundColor: [
                     'rgba(153, 102, 255, 0.2)',
                     'rgba(255, 159, 64, 0.2)',
                 ],
                 borderColor: [
                     'rgba(153, 102, 255, 1)',
                     'rgba(255, 159, 64, 1)',
                 ],
                 borderWidth: 1,
             },
         ],
     };
 
     const options = {
         responsive: true,
         maintainAspectRatio: false,
         aspectRatio: 1,
         plugins: {
             legend: {
                 position: "bottom",
                 labels: {
                     font: {
                         size: 12,
                         weight: "bold",
                     },
                     padding: 6,
                     usePointStyle: true,
                     pointStyle: "line",
                 },
             },
             tooltip: {
                 titleFont: {
                     weight: "bold",
                 },
                 bodyFont: {
                     weight: "bold",
                 },
             },
 
         },
         animation: true,
     };
    return (

        <Layout>
           <div className="flex">
            <div className="flex-grow h-auto bg-gray-300 p-2">
                <div className="flex justify-between items-center bg-white p-4 shadow rounded-lg">
                    <h2 className="text-xl font-semibold">Welcome Zack !</h2>
                    <input type="text" placeholder="Search here" className="border p-2 rounded-lg" />
                </div>
                {/* <div className="flex justify-between items-center p-6 ">
                    <h1 className="font-bold text-2xl font-xl">Hello Zack</h1>
                    <p>Home / student</p>
                </div> */}
                <div className="grid grid-cols-4 mt-4 gap-4">
                    <div className="">
                        <div className="flex h-32 p-5   rounded shadow-lg bg-white justify-between gap-4 items-center">
                            <div>
                                <p className=" font-medium text-xl">Total Class</p>
                                <p className="text-gray-400">Weekly</p>
                                <p className="text-2xl">  00/06</p>
                            </div>
                            <p className="text-4xl">🎓</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="flex h-32 p-5   rounded shadow-lg bg-white justify-between gap-4 items-center">
                            <div>
                                <p className="text-gray-500 font-medium text-xl">Daily Attendance</p>
                                <p className="text-gray-400">Daily</p>
                                <p className="text-2xl">  {filterDailyPresent.length}/180</p>
                            </div>
                            <p className="text-4xl">🎓</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="flex h-32 p-5   rounded shadow-lg bg-white justify-between gap-4 items-center">
                            <div>
                                <p className="text-gray-500 font-medium text-xl">Test Passed</p>
                                <p className="text-gray-400">Unit Test</p>
                                <p className="text-2xl">  130/160</p> 
                            </div>
                            <p className="text-4xl">🎓</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="flex h-32 p-5   rounded shadow-lg bg-white justify-between gap-4 items-center">
                            <div>
                                <p className="text-gray-500 font-medium text-xl">Practical</p>
                                <p className="text-gray-400">Semester</p>
                                <p className="text-2xl"> {filterPracticalPresent.length || "0"}/180</p>
                            </div>
                            <p className="text-4xl">🎓</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="grid  grid-cols-6 mt-2">
                        <div className="col-span-4 ">
                            <div className=" p-2">
                                <h>Today Lesson</h>
                                <div className="flex justify-between  bg-white p-6  rounded-lg shadow">
                                    <div>
                                        <div className="w-28">
                                            <div>  <Pie options={options} data={data} /></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex flex-col  gap-2">
                                            <div className="flex">
                                                <p className="m-1"><FaTv /></p>


                                                <div>
                                                    <p>Class</p>
                                                    <p className="font-semibold">Electrical Engg</p>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <p className="m-1"><IoBookOutline /></p>
                                                <div>
                                                    <p>Lesson</p>
                                                    <p className="font-semibold">Electrical Engg</p>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <p className="m-1"><IoMdTime /></p>
                                                <div className="">
                                                    <p>Lesson</p>
                                                    <p className="font-semibold">Electrical Engg</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex">
                                                <p>Icon</p>
                                                <div>
                                                    <p>Lesson</p>
                                                    <p>Electrical Engg</p>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <p>Icon</p>
                                                <div>
                                                    <p>Lesson</p>
                                                    <p>Electrical Engg</p>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <p>Icon</p>
                                                <div>
                                                    <p>Lesson</p>
                                                    <p>Electrical Engg</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div >
                                        <div className="flex h-32 justify-center items-center">
                                            <div>
                                                <p className="text-center">Skip</p>
                                                <button className="p-2 px-14 text-white rounded-lg bg-blue-600">Continue</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="p-2">

                                <div className="bg-white p-6  rounded-lg shadow">
                                    <h3 className="text-lg font-semibold">Learning Activity</h3>
                                    <Line
                                        data={{
                                            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                                            datasets: [
                                                {
                                                    label: "Teachers",
                                                    data: [40, 50, 70, 60, 50, 55, 45],
                                                    borderColor: "#6366F1",
                                                    fill: false,
                                                },
                                                {
                                                    label: "Students",
                                                    data: [30, 40, 60, 50, 40, 60, 50],
                                                    borderColor: "#10B981",
                                                    fill: false,
                                                },
                                            ],
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2  bg-white rounded shadow-lg row-span-6">
                            <h2 className="text-xl text-center font-bold text-gray-700 mb-4">📅 Full Calendar</h2>
                            <div className='flex  justify-center items-center p-2'>

                                <Calendar
                                    onChange={setDate}
                                    value={date}
                                    className="border rounded-lg w-full"
                                />
                            </div>
                            <div className='flex p-2 justify-between mt-4'>
                                <p className='font-bold text-xl'>UpComming Event</p>
                                <p>+</p>
                            </div>
                            <div className='mt-3 p-2'>
                                <div className='flex items-center'>
                                    <p>8:00</p>
                                    <div className='flex justify-between items-center w-full ml-2'>
                                        <ul className='border-l-4 px-1 border-blue-800 '>
                                            <li className='font-bold'>English</li>
                                            <li className='text-gray-400'>Lorem content </li>
                                        </ul>
                                        <p>9:00 - 10:00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                destination: "/login",
                permanent: false
            }
        }
    }
    const attendance = await StudentAttendance.find({})
 
    return {
        props: {
            attendance: JSON.parse(JSON.stringify(attendance))
        }
    }
}





