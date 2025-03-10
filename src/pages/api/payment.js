import Razorpay from "razorpay";
import connectToDB from "@/config/mongoose";
import Payment from "@/modal/payment";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  await connectToDB();

  if (req.method === "POST") {
    const { teacherId, amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `order_${Date.now()}`,
    };

    try {
      const order = await razorpay.orders.create(options);

      await Payment.create({
        teacherId,
        amount,
        paymentStatus: "Pending",
      });

      res.status(200).json({ orderId: order.id, amount });
    } catch (error) {
      res.status(500).json({ message: "Payment Error", error });
    }
  }
}
