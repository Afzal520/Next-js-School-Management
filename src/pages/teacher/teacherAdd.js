import AddTeacher from "@/components/teacher/addTeacher";
import Layout from "../dashboard/layout";
import { getSession } from "next-auth/react";

export default function TeacherAdd() {
    return (
        <Layout>
            <AddTeacher />
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
    return {
        props: {}
    }
}