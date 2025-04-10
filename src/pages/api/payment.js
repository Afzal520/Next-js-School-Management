import Stripe from "stripe";
import connectToDB from "@/config/mongoose";
import Payment from "../../modal/payment";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
  
    await connectToDB();
    try {
      const { studentId, totalFee, paidAmount, paymentIntentId,
        paymentMethod } = req.body;

      const isPayment = await Payment.findOne({ studentId })
    
      if (isPayment) {
        if (isPayment.totalFee === isPayment.paidAmount) {
          return res.status(400).json({ success: false, message: "Fees already fully paid" });
        }
     
        // Calculate new paid amount without exceeding totalFee
        const newPaid = Math.min(isPayment.paidAmount + paidAmount, isPayment.totalFee);
        const updatedRemaining = isPayment.totalFee - newPaid;

        isPayment.paidAmount = newPaid;
        isPayment.remainingAmount = updatedRemaining;
        isPayment.paymentStatus = updatedRemaining === 0 ? "Paid" : "Partially Paid";

        await isPayment.save();
        return res.status(200).json({ success: true, message: 'Payment updated successfully' });
      }
      else {
        const remainingAmount = totalFee - paidAmount;
        const newPayment = new Payment({
          studentId,
          totalFee,
          paidAmount: Math.min(paidAmount, totalFee), // Prevent overpayment on creation
          remainingAmount: Math.max(remainingAmount, 0),
          paymentIntentId,
          paymentStatus: remainingAmount > 0 ? "Partially Paid" : "Paid",
        });

        await newPayment.save();
        return res.status(200).json({ success: true, message: 'Payment Added successfully' });
      }
      // Create new payment if none exists

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "GET") {
    try {
      ;
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}