// import { User } from "@/models/user";
// import bcrypt from "bcrypt"
// import mongoose from "mongoose";
import prisma from '@/lib/prisma';
import crypto from 'crypto'


export async function POST(req: Request) {
   //  mongoose.connect(process.env.MONGO_URL as string);
   const { token, lockedPassword } = await req.json();

   const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

   try {
      //   const user = await User.findOne({ 
      //       resetLockPasswordToken: hashedToken,
      //       resetLockPasswordExpires: { $gt: Date.now() },
      //    });

      const user = await prisma.user.findFirst({
         where: {
            resetLockPasswordToken: hashedToken,
            resetLockPasswordExpires: { gt: new Date() },
         }
      })

      if (!user) {
         return Response.json({
            message: "Invalid token or has expired",
            success: false,
         })
      }

      //  const hashedOTP = await bcrypt.hash(lockedPassword, 12);

      // await User.updateOne({ email: user.email }, {
      //    $set: {
      //       resetLockPasswordToken: null,
      //       resetLockPasswordExpires: null,
      //       lockedPassword: lockedPassword,
      //    }
      // })

      await prisma.user.update({
         where: { email: user.email },
         data: {
            resetLockPasswordToken: null,
            resetLockPasswordExpires: null,
            lockedPassword: lockedPassword,
         }
      })

      return Response.json({
         message: "OTP Lock was reset successfully",
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