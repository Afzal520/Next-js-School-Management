import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  totalFee: { type: Number, required: true }, 
  paidAmount: { type: Number, required: true }, 
  remainingAmount: { type: Number, required: true }, 
  paymentStatus: { type: String, enum: ["Pending", "Partially Paid", "Paid"], default: "Pending" },
  paymentDate: { type: Date, default: Date.now },
});

export default mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);
