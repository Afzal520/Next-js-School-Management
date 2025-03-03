import EditTeacher from "@/components/teacher/editTeacher";
import Layout from "../dashboard/layout";
import { getSession } from "next-auth/react";

export default function TeacherEdit (){
    return(
        <Layout>
            <EditTeacher/>
        </Layout>
    )
}
export async function getServerSideProps(context){
    const session = await getSession(context)
    if(!session){
        return{
            redirect:{
                destination:"/login",
                permanent:false
            }
        }
    }
    return{
        props:{}
    }
}