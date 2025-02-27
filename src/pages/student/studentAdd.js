import Layout from "../dashboard/layout";
import AddStudent from "@/components/students/addStudent";

export default function StudentAdd() {
    return (

        <Layout>
            <AddStudent />
        </Layout>
    )
}


export async function getServerSideProps(context) {
    return {
        props: {}
    }
}