
import { Line, Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, ArcElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, ArcElement, LineElement, BarElement, Title, Tooltip, Legend);


import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Default styles for the calendar
import { useState } from 'react';

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

export default function TeacherLayout({teacher}) {
    console.log(teacher)
    const [date, setDate] = useState(new Date())
    return (
        <div className="h-auto bg-gray-200 p-2">
            <div className="flex justify-between items-center bg-white p-2 shadow rounded-lg">
                <h2 className="text-xl font-semibold">Welcome {teacher?.fullName}!</h2>
                <input type="text" placeholder="Search here" className="border p-2 rounded-lg" />
            </div>
            {/* <div className="flex justify-between">
                <h1 className="font-bold text-2xl font-xl">Hello Zack</h1>
                <p>Home / Teacher</p>
            </div> */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-3">
                <div className="h-32 p-5 flex justify-between items-center rounded shadow-lg bg-white">
                    <div>
                        <p className="text-gray-500 font-medium text-xl">Total Class</p>
                        <p className="font-bold text-2xl">04/16</p>
                    </div>
                    <div>
                        <p className="text-4xl">🎓</p>
                    </div>
                </div>
                <div className="h-32 p-5 flex justify-between items-center rounded shadow-lg bg-white">
                    <div>
                        <p className="text-gray-500 font-medium text-xl">Total Student</p>
                        <p className="font-bold text-2xl">04/16</p>
                    </div>
                    <div>
                        <p className="text-4xl">🏢</p>
                    </div>
                </div>
                <div className="h-32 p-5 flex justify-between items-center rounded shadow-lg bg-white">
                    <div>
                        <p className="text-gray-500 font-medium text-xl">Total Unit</p>
                        <p className="font-bold text-xl">04/16</p>
                    </div>
                    <div>
                        <p className="text-4xl">🏆</p>
                    </div>
                </div>
                <div className="h-32 p-5 flex justify-between items-center rounded shadow-lg bg-white">
                    <div>
                        <p className="text-gray-500 font-medium text-xl">Total Hours</p>
                        <p className="font-bold text-xl">00/5</p>
                    </div>
                    <div>
                        <p className="text-4xl">🏢</p>
                    </div>
                </div>



            </div>

            <div className="mt-4">
                <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                    <div className="col-span-1 row-span-8 bg-white p-4 rounded shadow-lg">
                        <div className="flex justify-center items-center">
                            <div>  <Pie options={options} data={data} /></div>
                        </div>
                    </div>
                    <div className="col-span-2 row-span-4 ">
                        <div className='bg-white  p-4 rounded shadow-lg'>
                            <div className="flex justify-between mt-2">
                                <p>Upcoming Lesson</p>
                                <p>View All Course</p>
                            </div>
                            <div className="flex justify-between mt-2">
                                <p>Lesson 30</p>
                                <p className="text-blue-600 cursor-pointer">Confirm</p>
                            </div>
                            <div className="flex justify-between mt-2">
                                <p>Date: 25/02/2025</p>
                                <button className="border px-3 p-2 rounded bg-blue-800 text-white">Schedule</button>
                            </div>
                            <div className="flex justify-between mt-2">
                                <p>Lesson 30</p>
                                <p className="text-blue-700 cursor-pointer">Confirm</p>
                            </div>
                            <div className="flex justify-between mt-2">
                                <p>Date: 25/02/2025</p>
                                <button className="border px-3 p-2 rounded bg-blue-800 text-white">Schedule</button>
                            </div>
                        </div>

                        <div className=" col-span-4 mt-6">
                            {/* Line Chart */}
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h3 className="text-lg font-semibold">Overview</h3>
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

                            {/* Bar Chart */}

                        </div>
                    </div>


                    <div className="col-span-2 row-span-8  bg-white p-4 rounded shadow-lg">
                        <h2 className="text-xl text-center font-bold text-gray-700 mb-4">📅 Full Calendar</h2>
                        <div className='flex justify-center items-center'>

                            <Calendar
                                onChange={setDate}
                                value={date}
                                className="border rounded-lg w-full"
                            />
                        </div>
                        <div className='flex justify-between mt-4'>
                            <p className='font-bold text-xl'>UpComming Event</p>
                            <p>+</p>
                        </div>
                        <div className='mt-3'>
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
    );
}

export async function getServerSideProps() {
    return {
        props: {},
    }
}