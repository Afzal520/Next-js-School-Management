import { useRouter } from "next/router";
import Layout from "../dashboard/layout";

export default function Report() {
    const router = useRouter()
    return (
        <Layout>
            <div className="grid lg:grid-cols-2 gap-2 mt-[70px]">
                <div onClick ={()=>router.push("/report/teacher")} className="border cursor-pointer h-16 content-center rounded-lg text-center bg-blue-500 text-white">
                    <p className="text-bold text-xl">Teacher Report</p>
                </div>
                <div onClick={() => router.push("/report/student")} className="border  cursor-pointer h-16 content-center rounded-lg text-center bg-blue-500 text-white">
                    <p className="text-bold text-xl">Student Report</p>
                </div>
            </div>
        </Layout>
    )
}