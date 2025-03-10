import Layout from "../dashboard/layout";

export default function Result() {
    return (
        <Layout>
            <div className="bg-blue-100 flex w-full  mt-[70px] h-screen justify-center items-center ">
                
                <div className="grid lg:grid-cols-2 w-full gap-3 p-1 text-white items-center ">
                    <div className="bg-green-500 text-center p-2 font-bold px-4 rounded">Semsester </div>
                    <div className="bg-blue-500 text-center font-bold p-2 px-4 rounded">Unit Test </div>
                </div>
            </div>
        </Layout>
    )
}