import EditStudent from "@/components/students/editStudent";
import Layout from "../dashboard/layout";
import connectToDB from "@/config/mongoose"
import Student from "@/modal/student"

import { getSession } from "next-auth/react"

export default function StudentEdit ({studentList}){

    return (
        <Layout>
            <EditStudent student={studentList}/>
        </Layout>
    )
      
    
}

export async function getServerSideProps(context){
    await connectToDB()
    const session = await getSession(context)
    if(!session){
        return{
            redirect:{
               distination:("/login") ,
               permanent:false
            }

        }
    }
    const student = await Student.find({})
    const studentList = student.map((list)=>JSON.parse(JSON.stringify(list)))
   
    return {
        props:{studentList:studentList}
    }
}