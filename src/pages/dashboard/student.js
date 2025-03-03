
import Layout from "./layout";
import StudentLayout from "@/components/dashboard/student";
import { getSession } from "next-auth/react";
import { StudentAttendance } from "@/modal/attendance";
import connectToDB from "@/config/mongoose";

export default function Student({ attendance }) {
    return (

        <Layout>
            <StudentLayout attendance={attendance} />
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