import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    
})

const Payment = mongoose.models.Payment || mongoose.model("Payment",paymentSchema)

export default Payment