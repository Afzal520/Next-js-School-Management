import { useRouter } from "next/router";
import Layout from "../dashboard/layout";
import { useEffect, useState } from "react";
import Loader from "@/components/loader/loader";
import Pagination from "@mui/material/Pagination";
import { FaArrowsUpDown } from "react-icons/fa6";
import { useSwipeable } from "react-swipeable";


export default function ReportDetails() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 30;
    const [studentDetails, setStudentDetails] = useState([]);
    const [resultDetails, setResultDetails] = useState([])
    const [reportType, setReportType] = useState("attendance")
    const [isLoading, setIsLoading] = useState(true);
    const { id } = router.query;
    console.log(reportType)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/studentAttendance?id=${id}`, {
                    method: "GET"
                });
                const result = await response.json();
                setStudentDetails(result.existedData);
                console.log(result.existedData)
                setIsLoading(false);
            } catch (error) {
                console.log("Internal server error");
                setIsLoading(false);
            }
        };
        const fetchResultData = async () => {
            try {
                const resopnse = await fetch(`/api/result?id=${id}`, {
                    method: "GET"
                })
                const result = await resopnse.json()
                console.log(result)
                setResultDetails(result?.isResult)
                setIsLoading(false)
            } catch (error) {
                console.log("Internal server error");
                setIsLoading(false)
            }

        }
        if (id) {
            fetchData();
            fetchResultData();
        }
    }, [id,setResultDetails]);

    const filterPresent = studentDetails.filter((list) => list.status === "Present");
    const filterAbsent = studentDetails.filter((list) => list.status === "Absent");

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => {
            setCurrentPage((prev) =>
                prev < Math.ceil(studentDetails.length / itemsPerPage) ? prev + 1 : prev
            );
        },
        onSwipedRight: () => {
            setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
        },
        trackMouse: true,
    });

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = studentDetails.slice(startIndex, endIndex);
    const paginatedExamData = resultDetails.slice(startIndex,endIndex)
    if (isLoading) {
        return <Loader />;
    }
    return (
        <Layout>
            <div className="bg-slate-100 mt-[70px]">
                <div className="flex  flex-col justify-center items-center">
                    <div className="bg-yellow-500 rounded-full h-32 w-32"></div>
                    <div className="flex mt-2 gap-3">
                        <div className="flex gap-4">
                            <p className="font-semibold text-2xl">Name: </p>
                            <p className="text-xl font-medium">{studentDetails[0]?.fullName}</p>
                        </div>

                    </div>
                    <div>

                        <div className="flex gap-4 ">
                            <p className="p-2 px-4 rounded bg-red-800 text-white"><strong className="text-xl">{filterAbsent?.length}</strong> Absent</p>
                            <p className="p-2 px-4 rounded bg-green-800 text-white"><strong className="text-xl">{filterPresent?.length}</strong> Present</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between mb-2">
                        <p className="text-center mt-4 text-2xl font-bold">Student Report</p>
                        <select onChange={(e) => setReportType(e.target.value)} className="border-2 p-2 px-4 rounded font-semibold">
                            <option value={""}>
                                Choose report
                            </option>
                            <option  value={"attendance"}>
                                Attendance
                            </option>
                            <option value={"result"}>
                                Result
                            </option>
                            <option className="fee">
                                Fee
                            </option>
                        </select>
                    </div>
                    {reportType === "attendance" ? (<div className="mt-2" {...swipeHandlers}>
                        <table className="border-2 w-full">
                            <thead className="bg-gray-200">
                                <tr className="p-2">
                                    <th className="border p-2 text-center"> <FaArrowsUpDown className="inline" /> SN</th>
                                    <th className="border p-2"> <FaArrowsUpDown className="inline" /> NAME</th>
                                    <th className="border p-2"> <FaArrowsUpDown className="inline" /> Status</th>
                                    <th className="border p-2"> <FaArrowsUpDown className="inline" /> AttendanceType</th>
                                    <th className="border p-2"> <FaArrowsUpDown className="inline" /> Date</th>
                                    <th className="border p-2"> <FaArrowsUpDown className="inline" /> Fee</th>
                                </tr>
                            </thead>
                            <tbody className="w-full text-center bg-white border">
                                {paginatedData.map((list, i) => (
                                    <tr key={list._id} className="w-full cursor-pointer">
                                        <td className="border">{startIndex + i + 1}</td>
                                        <td className="border">{list.fullName}</td>
                                        <td className="border">{list.status}</td>
                                        <td className="border">{list.attendanceType}</td>
                                        <td className="border">{list.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-center mt-4">
                            <Pagination
                                count={Math.ceil(studentDetails.length / itemsPerPage)}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                            />
                        </div>
                    </div>) : reportType === "result" ? (<div className="mt-2" {...swipeHandlers}>
                        <table className="border-2 w-full">
                            <thead className="bg-gray-200">
                                <tr className="p-2">
                                    <th className="border p-2 text-center"> <FaArrowsUpDown className="inline" /> SN</th>
                                    <th className="border p-2"> <FaArrowsUpDown className="inline" />   ROLLNO:</th>
                                    <th className="border p-2"> <FaArrowsUpDown className="inline" /> NAME</th>
                                    <th className="border p-2"> <FaArrowsUpDown className="inline" /> Status</th>

                                    <th className="border p-2"> <FaArrowsUpDown className="inline" /> Date</th>
                                    <th className="border p-2"> <FaArrowsUpDown className="inline" /> Fee</th>
                                </tr>
                            </thead>
                            <tbody className="w-full text-center bg-white border">
                                {paginatedExamData.map((list, i) => (
                                    <tr key={list._id} className="w-full cursor-pointer">
                                        <td className="border">{startIndex + i + 1}</td>
                                        <td className="border">{list.roll}</td>
                                        <td className="border">{list.fullName}</td>
                                        <td className="border">{list.examStatus}</td>
                                
                                        <td className="border">{list.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-center mt-4">
                            <Pagination
                                count={Math.ceil(resultDetails.length / itemsPerPage)}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                            />
                        </div>
                    </div>) : "Report Not Found"}
                </div>
            </div>
        </Layout>
    );
}