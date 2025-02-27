import ListStudent from "@/components/students/liststudent";
import Layout from "../dashboard/layout";
import { getSession } from "next-auth/react";
import Student from "@/modal/student";
import connectToDB from "@/config/mongoose";
import { parse } from "dotenv";

export default function StudentList({studentList}) {
   
    return (
        <Layout>
            <ListStudent students={studentList} />
        </Layout>
    )
}


export async function getServerSideProps(context) {
    const session = getSession(context)
    if (!session) {
        return {
            redirect: {
                distination: '/login',
                permanent: false
            }
        }
    }
    await connectToDB()
    const student = await Student.find({})
    const studentList = student.map((list) => JSON.parse(JSON.stringify(list)))
   
    return {
        props: { studentList: studentList }
    }
}