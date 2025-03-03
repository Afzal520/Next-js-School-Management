import connectToDB from "@/config/mongoose";
import Authenication from "../../../modal/authenication";
import bcrypt from "bcrypt";
import { transporter } from "@/config/nodemailer";
export default async function handler(req, res) {
    await connectToDB();
    if (req.method === "POST") {
        try {
            const { fullName, email, password, role } = req.body;
            console.log(role)
            const existedUser = await Authenication.findOne({ email });
            if (existedUser) {
                return res.status(400).json({ success: false, message: "Admin already exists" });
            }

            const hashPassword = await bcrypt.hash(password, 10);
        
           
            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: email,
                subject: "Registration Successful - Thank You!",
                text: `Dear ${fullName},\n\n
                Congratulations on successfully registering with us! 🎉\n\n
                We are pleased to inform you that your registration has been completed. Your LOGIN Password is: ${password}. Thank you for choosing our School Management System. We're excited to have you on board! 🙌\n\n
                Best regards,\n
                School Management Team \n
                visit link for first you Register Your Own Information using StudentId then you try To Login
                YOUR EMAIL ${email}
                `
            };
            const newUser = new Authenication({
                fullName,
                email,
                password: hashPassword,
                role: role
            });
            await transporter.sendMail(mailOptions);
            await newUser.save();
            res.status(201).json({ success: true, message: `${role} registered successfully` });

        } catch (error) {
            res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
        }
    } else {
        res.status(405).json({ success: false, message: "Method not allowed" });
    }
}