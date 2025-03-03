import ListTeacher from "@/components/teacher/listTeacher";
import Layout from "../dashboard/layout";
import { getSession } from "next-auth/react";
import connectToDB from "@/config/mongoose";
import Teacher from "@/modal/teacher";

export default function ({teacherList}) {
    console.log(teacherList)
    return (
        <Layout>
            <ListTeacher teacher={teacherList} />
        </Layout>
    )
}

export async function getServerSideProps(context) {
    await connectToDB()
    const session = getSession(context)
    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        }
    }
    const teacherList =await Teacher.find({})
    return {
        props: {teacherList:JSON.parse(JSON.stringify(teacherList))}
    }
}