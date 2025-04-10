import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  totalFee: { type: Number,  }, // e.g., 25000
  paidAmount: { type: Number, }, // e.g., 20000
  remainingAmount: { type: Number, }, // e.g., 5000
  paymentStatus: { type: String, enum: ["Pending", "Partially Paid", "Paid"], default: "Pending" },
  paymentDate: { type: Date, default: Date.now },
  paymentIntentId:{type:String}

},{timestamps:true});

export default mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);
