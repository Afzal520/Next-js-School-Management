import Stripe from "stripe";
import connectToDB from "@/config/mongoose";
import Payment from "../../modal/payment";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    await connectToDB();
    try {
      const { studentId, totalFee, paidAmount, paymentMethod } = req.body;

      // For unified PaymentElement, you can include both card and upi in allowed methods.
      const paymentMethodTypes = paymentMethod === "upi" ? ["upi"] : ["card"];

      const paymentIntent = await stripe.paymentIntents.create({
        amount: paidAmount * 100, // in cents
        currency: "usd",
        payment_method_types: paymentMethodTypes,
      });

      // Calculate remaining balance and save payment record.
      
      res.status(200).json({
        clientSecret: paymentIntent.client_secret,
        message: "Payment record saved successfully!",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "GET") {
    try {
      // Create a payment intent for the GET request
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 1000, // Example amount in cents
        currency: "usd",
        payment_method_types: ["card"],
      });

      res.status(200).json({
        clientSecret: paymentIntent.client_secret,
        message: "Client secret retrieved successfully!",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}