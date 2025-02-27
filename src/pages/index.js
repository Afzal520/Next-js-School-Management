import AdminLayout from "@/components/dashboard/admin";
import { getSession } from "next-auth/react";
import Layout from "./dashboard/layout";

export default function Home() {
  return (
    <Layout>
      <AdminLayout />
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session)
  if (!session) {
    // If there is no session, redirect to the login page
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  // If there is a session, render the page
  return {
    props: {}
  }
}