import mongoose from "mongoose";

const AuthenicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type:String,
    enum: ["admin", "teacher", "student"],
    required: true
  }
}, { timestamps: true });

// Prevent model re-registration
const Authenication = mongoose.models.Authenication || mongoose.model("Authenication", AuthenicationSchema);

export default Authenication;
