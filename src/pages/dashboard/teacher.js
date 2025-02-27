
import React from 'react'
import Layout from './layout'
import TeacherLayout from '@/components/dashboard/teacher'

export default function Teacher(){
  return (
   <Layout>
    <TeacherLayout/>
   </Layout>
  )
}

export async function getServerSideProps(params) {
   return{
    props:{}
   }
}