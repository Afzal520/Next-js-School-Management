// pages/success.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Success = () => {
  const router = useRouter();
  const [transactionDetails, setTransactionDetails] = useState(null);

  useEffect(() => {
    // Check if query parameters are available
    if (router.query.studentId) {
      setTransactionDetails(router.query);
    } else {
      // Redirect back to payment page if no transaction details are found
      router.push('/payment');
    }
  }, [router]);

  if (!transactionDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 bg-white shadow rounded-lg max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-semibold text-green-600 mb-4">Payment Successful!</h1>
      <div className="space-y-2 print-receipt">
        <p><strong>Student ID:</strong> {transactionDetails.studentId}</p>
        <p><strong>Total Fee:</strong> ₹{transactionDetails.totalFee}</p>
        <p><strong>Paid Amount:</strong> ₹{transactionDetails.paidAmount}</p>
        <p><strong>Payment Method:</strong> {transactionDetails.paymentMethod}</p>
        <p><strong>Transaction ID:</strong> {transactionDetails.paymentIntentId}</p>
        <p><strong>Status:</strong> {transactionDetails.status}</p>
      </div>
      <button
        onClick={() => window.print()}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 print-hidden"
      >
        Print Receipt
      </button>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          .print-hidden {
            display: none;
          }
          .print-receipt {
            padding: 20px;
            border: 1px solid #000;
          }
        }
      `}</style>
    </div>
  );
};

export default Success