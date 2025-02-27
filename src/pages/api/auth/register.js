import connectToDB from "@/config/mongoose";
import Authenication from "../../../modal/authenication";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
    await connectToDB();
    if (req.method === "POST") {
        try {
            const { fullName, email, password } = req.body;
            const existedUser = await Authenication.findOne({ email });
            if (existedUser) {
                return res.status(400).json({ success: false, message: "Admin already exists" });
            }

            const hashPassword = await bcrypt.hash(password, 10);
            const newUser = new Authenication({
                fullName,
                email,
                password: hashPassword
            });
            await newUser.save();
            res.status(201).json({ success: true, message: "Admin registered successfully" });

        } catch (error) {
            res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
        }
    } else {
        res.status(405).json({ success: false, message: "Method not allowed" });
    }
}