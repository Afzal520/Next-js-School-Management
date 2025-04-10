
import Loader from "@/components/loader/loader";
import Profile from "@/components/profile/profile";
import "@/styles/globals.css";
import { Provider } from 'react-redux';

import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiSlice } from "@/querySlice"
import { store } from "@/store/store";
export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setIsLoading(false)
  }, [])
  if (isLoading) {
    return <Loader />
  }
  return (
    < Provider store={store} >

      <SessionProvider session={session}>
        <Profile />
        <Component {...pageProps} />
        <ToastContainer />
      </SessionProvider>
    </Provider>
  );
}

