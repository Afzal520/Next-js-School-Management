
import Loader from "@/components/loader/loader";
import Profile from "@/components/profile/profile";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
   
      setIsLoading(false)
    console.log("hello loading")
  }, [])
  if (isLoading) {
    return <Loader />
  }
  return (
    <SessionProvider session={session}>
      <Profile/>
      <Component {...pageProps} />
      <ToastContainer />
    </SessionProvider>
  );
}

