import AdminLayout from "@/components/dashboard/admin";
import { getSession, useSession } from "next-auth/react";
import Layout from "./dashboard/layout";
import connectToDB from "@/config/mongoose";
import Student from "@/modal/student";
import Teacher from "@/modal/teacher";
import teacherList from "./teacher/teacherList";
import { StudentAttendance, TeacherAttendance } from "@/modal/attendance";

export default function Home({ studentList, teacherList, teacherAttendance, studentAttendance }) { 
  const { data: session, status } = useSession();

  return (
    <Layout>
      <AdminLayout teacherAttendance={teacherAttendance} studentAttendance={studentAttendance} studentList={studentList} teacherList={teacherList} />
    </Layout>
  )
}

export async function getServerSideProps(context) {
  await connectToDB()
  const session = await getSession(context);

  if (!session) {
    // If there is no session, redirect to the login page
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  if (session.user.role == "teacher") {
    return {
      redirect: {
        destination: "/dashboard/teacher",
        permanent: false,
      },
    };
  }
  console.log(session, "session here")
  const studentList = await Student.find({})
  const TeacherList = await Teacher.find({})
  const teacherAttendance = await TeacherAttendance.find({})
  const studentAttendance = await StudentAttendance.find({})

  // If there is a session, render the page
  return {
    props: {
      studentList: JSON.parse(JSON.stringify(studentList)),
      teacherList: JSON.parse(JSON.stringify(TeacherList)),
      teacherAttendance: JSON.parse(JSON.stringify(teacherAttendance)),
      studentAttendance: JSON.parse(JSON.stringify(studentAttendance))
    }
  }
}