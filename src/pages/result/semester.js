import { getSession} from "next-auth/react";
import Layout from "../dashboard/layout";

export default function Semsester() {
    return (
        <Layout >
            <div className="mt-[70px]">
                <p>Student List</p>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (!session) {
        return {
            redirect: {
                destination: "/login"
            },
            permanent: false

        }
    }
    return {
        props: {}
    }
}