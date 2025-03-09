import { User } from "@/models/user";
import bcrypt from "bcrypt"
import mongoose from "mongoose";
import crypto from 'crypto'


export async function POST(req: Request) {
    mongoose.connect(process.env.MONGO_URL as string);
    const { token, lockedPassword } = await req.json();

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    try {
        const user = await User.findOne({ 
            resetLockPasswordToken: hashedToken,
            resetLockPasswordExpires: { $gt: Date.now() },
         });

         if (!user) {
            return Response.json({
                message: "Invalid token or has expired",
                success: false,
            })
         }

        //  const hashedOTP = await bcrypt.hash(lockedPassword, 12);

         await User.updateOne({ email: user.email }, { $set: {
            resetLockPasswordToken: null,
            resetLockPasswordExpires: null,
            lockedPassword: lockedPassword,
         }})

         return Response.json({
            message: "Password was reset successfully",
               success: true,
         })

    } catch (error) {

      console.log(error);
      return Response.json({
         message: `There is an error: ${error}`,
            success: false,
      })

    }



}