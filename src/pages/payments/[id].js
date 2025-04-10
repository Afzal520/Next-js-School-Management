// /pages/payment.js
import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../../components/payment/checkoutFrom";
import Layout from "../dashboard/layout";
import { useRouter } from "next/router";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PaymentPage() {
  const totalFee = 25000;
  const [clientSecret, setClientSecret] = useState("");
  const router = useRouter()
  const {id} = router.query

const [paidAmount,setPaidAmount] = useState("")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/payment-intent", {
          method: "GET"
        })
        const result = await response.json()
        setClientSecret(result.clientSecret)
      } catch (error) {
        throw new Error("strip client secret error", error)
      }
    }
    fetchData()
  }, [])
  const options = { clientSecret };

  return (
    <Layout>
      <div className="lg:mt-[70px]">
        <div>
          <label className="text-gray-500 font-bold">Enter Amount</label>
          <input onChange={(e)=>setPaidAmount(e.target.value)} className="p-2 px-4 rounded  border outline-none border-blue-200" type="number" placeholder="Enter fee  Amount  "/>
        </div>
      </div>
      <div className="lg:mt-[70px]">
      {clientSecret ? (
        <Elements  stripe={stripePromise} options={options}>
          <PaymentForm Id={id} Amount={paidAmount} />
        </Elements>
      ) : (
        <div>Loading payment details...</div>
      )}
    </div>
    </Layout>
  );
};


