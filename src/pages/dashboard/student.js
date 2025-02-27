import TeacherLayout from "@/components/dashboard/teacher";
import Layout from "./layout";
import StudentLayout from "@/components/dashboard/student";

export default function Student (){
    return(
       
        <Layout>
            <StudentLayout/>
        </Layout>
    )
}


export async function getServerSideProps(params) {
    return{
     props:{}
    }
 }