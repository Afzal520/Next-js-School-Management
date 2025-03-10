import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Authenication",
        required: true,
    },
    amount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
    paymentDate: { type: Date, default: Date.now },
});

const Payment = mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);
export default Payment