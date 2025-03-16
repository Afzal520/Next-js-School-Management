import Stripe from "stripe";
import dbConnect from "../../utils/dbConnect"; // MongoDB connection
import Payment from "../../models/Payment"; // Payment model

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    await dbConnect();

    try {
      const { studentId, totalFee, paidAmount } = req.body;

    
      const paymentIntent = await stripe.paymentIntents.create({
        amount: paidAmount * 100, 
        currency: "usd",
        payment_method_types: ["card"],
      });

      // Calculate remaining balance
      const remainingAmount = totalFee - paidAmount;

      // Save payment record in database
      const newPayment = new Payment({
        studentId,
        totalFee,
        paidAmount,
        remainingAmount,
        paymentStatus: remainingAmount > 0 ? "Partially Paid" : "Paid",
      });

      await newPayment.save();

      res.status(200).json({
        clientSecret: paymentIntent.client_secret,
        message: "Payment record saved successfully!",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
