import { useRouter } from "next/router";
import Layout from "../dashboard/layout";

export default function Result() {
    const router = useRouter()
    return (
        <Layout>
            <div className="bg-blue-100 flex w-full  mt-[70px] h-screen justify-center items-center ">
                
                <div className="grid lg:grid-cols-2 w-full gap-3 p-1 text-white items-center ">
                    <div onClick={()=>router.push("/result/unit")} className="bg-green-500 cursor-pointer text-center p-2 font-bold px-4 rounded">
                        <p>Unit</p>
                    </div>
                    <div onClick ={()=>router.push("/result/semester")} className="bg-blue-500 cursor-pointer text-center font-bold p-2 px-4 rounded">
                        <p>Semsester </p>
                         </div>
                </div>
            </div>
        </Layout>
    )
}