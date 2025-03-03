import { getSession } from "next-auth/react";
import Layout from "../dashboard/layout";

export default function TeacherTask() {
    return (
        <Layout>
            <div>
                hello task
            </div>
        </Layout>
    )
}
export async function getseverSideProps(context) {
    const session = getSession(context)
    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        }
    }
    return {
        props: {}
    }
}