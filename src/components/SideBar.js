

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaBuilding, FaBook, FaFileInvoice, FaCog, FaBars, FaThLarge } from 'react-icons/fa';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { Outlet } from "react-router-dom"
export const Sidebar = ({ session }) => {

    const [isOpen, setIsOpen] = useState(true);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [openStudentDropdown, setOpenStudentDropdown] = useState(null)
    const [opneTeacherDropdown, setopenTeacherDropdown] = useState(null)

    return (
        <div>
            <div className={`h-screen sticky top-0 bg-white shadow-lg ${isOpen ? 'w-56' : 'w-20'} transition-all duration-300`}>
                <div className="p-4 flex items-center justify-between border-b">
                    <h1 className={`text-lg p-2 font-bold transition-all ${isOpen ? 'block' : 'hidden'}`}>SCHOOL</h1>
                    <FaBars className="cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
                </div>
                <nav className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <button className="flex items-center w-full p-2 rounded-lg hover:bg-gray-200" onClick={() => setOpenDropdown(!openDropdown)}>
                                <FaThLarge className="mr-3" />
                                {isOpen && <span>Dashboard</span>}
                                {isOpen && (openDropdown ? <MdExpandLess className="ml-auto" /> : <MdExpandMore className="ml-auto" />)}
                            </button>
                            {openDropdown && isOpen && (
                                <ul className="pl-8 mt-1 space-y-1">
                                    {session?.user?.role === "teacher" ? null : (<Link href={"/"} className="p-2 bg-blue-500 block text-white rounded-lg">Admin Dashboard</Link>)}
                                    <Link href={"/dashboard/teacher"} className="p-2 block hover:bg-gray-200 rounded-lg">Teacher Dashboard</Link>
                                    <Link href={"/dashboard/student"} className="p-2 block hover:bg-gray-200 rounded-lg">Student Dashboard</Link>
                                </ul>
                            )}
                        </li>
                        <li>
                            <button onClick={() => setOpenStudentDropdown(!openStudentDropdown)} className="flex items-center w-full p-2 rounded-lg hover:bg-gray-200">
                                <FaUserGraduate className="mr-3" /> {isOpen && <span className='font-bold'>Students</span>}
                            </button>

                            {openStudentDropdown && isOpen && (
                                <ul className='mt-1'>
                                    <Link href={"/student/studentAdd"} className='p-2 block  rounded-lg'>Add Student</Link>
                                    <Link href={"/student/studentList"} className='p-2 block hover:bg-blue-200  rounded-lg'>List Student</Link>
                                    <Link href={"/attendance/studentAttendance"} className='p-2 block hover:bg-blue-200  rounded-lg'>Attendance</Link>

                                </ul>

                            )}

                        </li>
                        {session?.user?.role === "teacher" ? null : (<li>
                            <button onClick={() => setopenTeacherDropdown(!opneTeacherDropdown)} className="flex items-center w-full p-2 rounded-lg hover:bg-gray-200">
                                <FaChalkboardTeacher className="mr-3 " /> {isOpen && <span className='font-bold'>Teachers</span>}
                            </button>
                            {opneTeacherDropdown && opneTeacherDropdown && (
                                <ul className='mt-1'>
                                    <Link href={"/teacher/teacherAdd"} className='p-2 block rounded-lg'>Add Teacher</Link>
                                    <Link href={"/teacher/teacherList"} className='p-2 block hover:bg-blue-200  rounded-lg'>ListTeacher </Link>
                                    <Link href={"/attendance/teacherAttendance"} className='p-2 block hover:bg-blue-200  rounded-lg'>Attendance </Link>

                                </ul>
                            )}
                        </li>
                        )}
                        <Link href={"/result"} className="flex items-center p-2 rounded-lg hover:bg-gray-200">
                            <FaBuilding className="mr-3" /> {isOpen && <span>Result</span>}
                        </Link>
                        <Link href={"/report"} className="flex items-center p-2 rounded-lg hover:bg-gray-200">
                            <FaBuilding className="mr-3" /> {isOpen && <span>report</span>}
                        </Link>
                        <li className="flex items-center p-2 rounded-lg hover:bg-gray-200">
                            <FaBuilding className="mr-3" /> {isOpen && <span>Departments</span>}
                        </li>
                        <li className="flex items-center p-2 rounded-lg hover:bg-gray-200">
                            <FaBook className="mr-3" /> {isOpen && <span>Subjects</span>}
                        </li>
                        <Link href={"/payment"} className="flex items-center p-2 rounded-lg hover:bg-gray-200">
                            <FaFileInvoice className="mr-3" /> {isOpen && <span>Fee</span>}
                        </Link>
                        <li className="flex items-center p-2 rounded-lg hover:bg-gray-200">
                            <FaCog className="mr-3" /> {isOpen && <span>Settings</span>}
                        </li>
                    </ul>
                </nav>

            </div>

        </div>

    );
};


