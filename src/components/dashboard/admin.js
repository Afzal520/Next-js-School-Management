import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useState, useEffect } from "react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export default function AdminLayout({ studentList, teacherList, studentAttendance, teacherAttendance }) {
  const [student, setStudent] = useState(studentList);
  const [teacher, setTeacher] = useState(teacherList);
  const [sAttendance, setStudentAttendance] = useState(studentAttendance);
  const [tAttendance, setTeacherAttendance] = useState(teacherAttendance);

  const getAttendanceCounts = (attendanceData) => {
    const counts = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
    attendanceData.forEach((record) => {
      const day = new Date(record.date).toLocaleString("en-US", { weekday: "short" });
      if (counts[day] !== undefined && record.status === "Present") {
        counts[day]++;
      }
    });
    return Object.values(counts);
  };

  const getMonthlyGenderCounts = (attendanceData) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const counts = months.map(() => ({ boys: 0, girls: 0 }));
    console.log(counts)
    attendanceData.forEach((record) => {
      const month = new Date(record.date).getMonth();
      if (record.gender === "Male" && record.status === "Present") {
        counts[month].boys++;
      } else if (record.gender === "Female" && record.status === "Present") {
        counts[month].girls++;
      }
    });

    return counts;
  };

  const studentAttendanceCounts = getAttendanceCounts(sAttendance);
  const teacherAttendanceCounts = getAttendanceCounts(tAttendance);
  const monthlyGenderCounts = getMonthlyGenderCounts(sAttendance);


  const boyData = monthlyGenderCounts.map((count) => count.boys);
  const girlData = monthlyGenderCounts.map((count) => count.girls);

  return (
    <div className="flex">
      <div className="p-6 flex-grow bg-gray-100 min-h-screen">
        {/* Top Navigation */}
        <div className="flex justify-between items-center bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold">Welcome Admin!</h2>
          <input type="text" placeholder="Search here" className="border p-2 rounded-lg" />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          {[
            { title: "Students", value: `${student.length}`, icon: "🎓" },
            { title: "Awards", value: "50+", icon: "🏆" },
            { title: "Teacher", value: `${teacher.length}`, icon: "🏢" },
            { title: "Revenue", value: "$505", icon: "💰" },
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-4xl">{item.icon}</div>
              <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
              <p className="text-xl font-bold text-gray-700">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Line Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Attendance</h3>
            <Line
              data={{
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                datasets: [
                  {
                    label: "Teachers",
                    data: teacherAttendanceCounts,
                    borderColor: "#6366F1",
                    fill: false,
                  },
                  {
                    label: "Students",
                    data: studentAttendanceCounts,
                    borderColor: "#10B981",
                    fill: false,
                  },
                ],
              }}
            />
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Number of Students</h3>
            <Bar
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [
                  {
                    label: "Boys",
                    data: boyData,
                    backgroundColor: "#6366F1",
                  },
                  {
                    label: "Girls",
                    data: girlData,
                    backgroundColor: "#10B981",
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}