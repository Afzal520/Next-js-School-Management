
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);


export default function AdminLayout() {
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
            { title: "Students", value: "50,055", icon: "🎓" },
            { title: "Awards", value: "50+", icon: "🏆" },
            { title: "Department", value: "30+", icon: "🏢" },
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
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Number of Students</h3>
            <Bar
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                datasets: [
                  {
                    label: "Boys",
                    data: [400, 500, 600, 550, 530, 580, 600],
                    backgroundColor: "#6366F1",
                  },
                  {
                    label: "Girls",
                    data: [300, 450, 500, 520, 500, 550, 590],
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