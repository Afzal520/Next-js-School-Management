import React from 'react';
import Layout from './layout';
import TeacherLayout from '@/components/dashboard/teacher';
import { getSession } from 'next-auth/react';
import connectToDB from '@/config/mongoose';
import Teacher from '@/modal/teacher';

export default function Teachers({ teacher }) {
  console.log(teacher)
  return (
    <Layout>
      <TeacherLayout teacher={teacher} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  await connectToDB();
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false, 
      },
    };
  }

  const {teacherId} = session.user.id;
  const filterTeacher = await Teacher.findOne(teacherId); // Corrected query to use teacherId
  return {
    props: { teacher: JSON.parse(JSON.stringify(filterTeacher)) }, // Pass the teacher data to props
  };
}