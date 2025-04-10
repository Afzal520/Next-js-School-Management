

// components/PaymentForm.js
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { FaGooglePay, FaPhone } from 'react-icons/fa'; // Import Google Pay and PhonePe icons
import { useRouter } from 'next/router';
import QRCode from 'react-qr-code'; // Import QRCode component
import { ContactSupportOutlined } from "@material-ui/icons";

const PaymentForm = ({ Amount ,Id}) => {
  const paidAmount = Number(Amount);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [studentId ,setStudentId] = useState(Id)
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [upiId, setUpiId] = useState("");
  const [showQRCode, setShowQRCode] = useState(false); // State to control QR code visibility
  const [upiTransactionId, setUpiTransactionId] = useState(""); // State for UPI transaction ID

 
  const totalFee = 25000; // Example total fee

  const [clientSecret, setClientSecret] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!stripe || !elements) {
      setMessage("Stripe has not loaded yet.");
      setLoading(false);
      return;
    }

    try {
      if(paidAmount == ""){
        alert("first enter paid amount")
      }
      if (paymentMethod === "card") {
        // Handle card payment
        const response = await fetch("/api/payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentId, totalFee, paidAmount, paymentMethod }),
        });

        if (!response.ok) {
          throw new Error("Failed to create payment intent");
        }

        const { clientSecret } = await response.json();
        setClientSecret(clientSecret);

        const result = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: "http://localhost:3000/success", // Redirect URL after payment
          },
          redirect: "if_required",
        });

        if (result.error) {
          setMessage(result.error.message);
        } else {
          setMessage("Payment successful!");
          const paymentIntentId = result.paymentIntent.id;

          // Post payment data to the server
          await fetch("/api/payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ studentId, totalFee, paidAmount, paymentMethod, paymentIntentId }),
          });

          // Redirect to success page with transaction details
          router.push({
            pathname: '/success',
            query: {
              studentId,
              totalFee,
              paidAmount,
              paymentMethod,
              paymentIntentId,
              status: "success",
            },
          });
        }
      } else if (paymentMethod === "upi") {
    
        // Handle UPI payment
        if (!upiTransactionId) {
          throw new Error("Please enter the UPI transaction ID.");
        }

        // Verify UPI payment
        const response = await fetch("/api/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentId, totalFee, paidAmount, paymentMethod  }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to verify UPI payment.");
        }
        if (response.ok) {
          setMessage("UPI payment successful!");
          // Redirect to success page with transaction details
          router.push({
            pathname: '/success',
            query: {
              studentId,
              totalFee,
              paidAmount,
              paymentMethod,
              paymentIntentId: upiTransactionId,
              status: "success",
            },
          });
        } else {
          throw new Error("UPI payment verification failed.");
        }
      }
    } catch (error) {
      setMessage(error.message);
    }

    setLoading(false);
  };
  const gpay_upi = process.env.NEXT_PUBLIC_GPAY_UPI_ID
  const phone_pe_upi = process.env.PHONE_PE_UPI_ID
  // Handle Google Pay click
  const handleGooglePayClick = () => {
    setPaymentMethod("upi");
    setUpiId(gpay_upi); // Replace with your school's UPI ID
    setShowQRCode(true); // Show QR code
  };

  // Handle PhonePe click
  const handlePhonePeClick = () => {
    setPaymentMethod("upi");
    setUpiId(phone_pe_upi); // Replace with your school's UPI ID
    setShowQRCode(true); // Show QR code
  };

  // Generate UPI payment link
  const generateUPILink = () => {
    return `upi://pay?pa=${upiId}&pn=School&am=${paidAmount}&cu=INR`;
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-lg font-semibold mb-4">School Fee Payment</h2>
      <div className="mb-4">
        <label className="block mb-2">Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="p-2 border rounded-md w-full"
        >
          <option value="card">Card</option>
          <option value="upi">UPI</option>
        </select>
      </div>

      {/* Stripe Payment Element for Card Payments */}
      {paymentMethod === "card" && <PaymentElement />}

      {/* UPI Payment Options */}
      {paymentMethod === "upi" && (
        <>
          <div className="flex justify-around px-2">
            <div className="cursor-pointer mt-2" onClick={handleGooglePayClick}>
              <img className="w-32" src="/gpay-logo.png" />
              <p className="text-blue-300 ml-7 mt-[-8px] underline">Click</p>
            </div>

            <div className="cursor-pointer" onClick={handlePhonePeClick}>
              <img className="w-36" src="/PhonePe-Logo.png" />
              <p className="text-blue-300 ml-12 mt-[-15px] underline">Click</p>
            </div>
          </div>

          {/* Display QR Code for UPI Payments */}
          {showQRCode && (
            <div className="my-4 flex flex-col items-center">
              <QRCode value={generateUPILink()} size={128} />
              <p className="mt-2 text-sm text-gray-600">Scan this QR code to pay using UPI</p>
            </div>
          )}

          {/* UPI Transaction ID Input */}
          <div className="mb-4">
            <label className="block mb-2">UPI Transaction ID</label>
            <input
              type="text"
              value={upiTransactionId}
              onChange={(e) => setUpiTransactionId(e.target.value)}
              className="p-2 border rounded-md w-full"
              placeholder="Enter UPI Transaction ID"
              required
            />
          </div>
        </>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md disabled:opacity-50"
        disabled={!stripe || loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>

      {/* Display Payment Message */}
      {message && <p className="mt-3 text-center text-green-500">{message}</p>}
    </form>
  );
};

export default PaymentForm;