import connectToDB from "@/config/mongoose"
import Authenication from "@/modal/authenication"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export default async function Login(email, password) {
    await connectToDB()

        try {
            if (!email || !password) {
                return
            }
          
            const user = await Authenication.findOne({ email })
            console.log(user)
            if (!user) {
                return res.status(400).json({ success: false, message: 'Invalid Credential' })
            }
            const isCompared = await bcrypt.compare(password, user.password)
            if (!isCompared) {
                return res.status(400).json({ success: false, message: "Invalid credientials" })
            }

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1hr"
            })
            return {
                success: true,
                token,
                user: {
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    role:user.role
                },
            }
        } catch (error) {
            res.status(500).json({ sucess: false, message: "Server Error", error: error.message })
        }
   
}