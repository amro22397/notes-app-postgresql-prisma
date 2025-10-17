// import VerifyEmailTemplate from "@/app/emails/VerifyEmailTemplate";
// import { connectToDatabase } from "@/lib/db";
// import { User } from "@/models/user";
// import { render } from "@react-email/components";
// import mongoose from "mongoose";
import nodemailer from "nodemailer";
import crypto from 'crypto'
import prisma from "@/lib/prisma";


export default async function handler(req: any, res: any) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed"
        });
    }

    // await connectToDatabase();

    const { email, subject, locale } = req.body;

    console.log(email, subject, locale)

    if (!subject || !email) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields"
        });
    }

    // mongoose.connect(process.env.MONGO_URL as string);
    // const user = await User.findOne({ email: email })

    // const user = await prisma.user.findUnique({
    //     where: { email: email }
    // })


    const token = crypto.randomBytes(20).toString('hex')
    const passwordToken = crypto.createHash("sha256").update(token).digest("hex");

    // await User.updateOne({ email: email }, {
    //     $set: {
    //         resetPasswordToken: passwordToken,
    //         resetPasswordExpires: new Date(Date.now() + 3600000),
    //     }
    // })

    await prisma.user.update({
        where: { email: email },
        data: {
            resetPasswordToken: passwordToken,
            resetPasswordExpires: new Date(Date.now() + 3600000),
        }
    })

    const resetURL = `${process.env.NEXTAUTH_URL}/${locale}/reset-password/${token}`

    const body = `Reset password by clicking on the following link: ${resetURL}`

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL, // Your Gmail
                pass: process.env.EMAIL_PASS, // App Password
            },
        });

        // const text = 'Hello World'

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject,
            text: body,
        });

        return res.status(200).json({
            success: true,
            message: "Email sent successfully!"
        });

    } catch (error: any) {
        console.error(error);

        // await User.updateOne({ email: email }, {
        //     $set: {
        //         resetPasswordToken: null,
        //         resetPasswordExpires: null,
        //     }
        // })

        await prisma.user.update({
            where: { email: email },
            data: {
                resetPasswordToken: null,
                resetPasswordExpires: null,
            }
        })

        return res.status(500).json({
            success: false,
            message: "Api Error: " + error.message
        });
    }
}
