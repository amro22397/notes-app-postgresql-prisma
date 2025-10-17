// import { User } from "@/models/user";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt"
// import mongoose from "mongoose";
import crypto from 'crypto'


export async function POST(req: Request) {
   //  mongoose.connect(process.env.MONGO_URL as string);
   const { token, password } = await req.json();

   const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

   try {
      //   const user = await User.findOne({ 
      //       resetPasswordToken: hashedToken,
      //       resetPasswordExpires: { $gt: Date.now() },
      //    });

      const user = await prisma.user.findFirst({
         where: {
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { gt: new Date() },
         }
      })

      if (!user) {
         return Response.json({
            message: "Invalid token or has expired",
            success: false,
         })
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      // await User.updateOne({ email: user.email }, { $set: {
      //    resetPasswordToken: null,
      //    resetPasswordExpires: null,
      //    hashedPassword: hashedPassword,
      // }})

      await prisma.user.update({
         where: { email: user.email },
         data: {
            resetPasswordToken: null,
            resetPasswordExpires: null,
            hashedPassword: hashedPassword,
         }
      })

      return Response.json({
         message: "Password was reset successfully",
         success: true,
      })

   } catch (error) {

      console.log(`There is an error resetting password: ${error}`);
      return Response.json({
         message: `There is an error resetting password: ${error}`,
         success: false,
      })

   }



}