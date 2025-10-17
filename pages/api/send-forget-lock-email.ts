import nodemailer from "nodemailer";
// import { render } from '@react-email/components';
// import VerifyEmailTemplate from "@/app/emails/VerifyEmailTemplate";
// import { User } from "@/models/user";
import crypto from 'crypto'
// import { connectToDatabase } from "@/lib/db";
// import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {

        // await connectToDatabase();

        // return res.status(405).json({ error: "Method Not Allowed" });
        res.status(200).json({
            success: false,
            message: "Method Not Allowed"
        })
        // return Response.json({
        //     success: false,
        //     message: "Method Not Allowed"
        // })
    }

    const { email, subject, locale } = req.body;

    console.log(email, subject, locale)

    if (!email || !subject) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields"
        });
        // return Response.json({
        //     success: false,
        //     message: "Missing required fields"
        // })
    }


    // mongoose.connect(process.env.MONGO_URL as string);
    // const user = await User.findOne({ email: email })

    const user = await prisma.user.findUnique({
        where: { email: email }
    })

    console.log(user)

    const token = crypto.randomBytes(20).toString('hex')
    const lockPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

    console.log(lockPasswordToken)
    console.log(new Date(Date.now() + 3600000))

    // const updatedUser = await User.updateOne({ email: email }, {
    //     resetLockPasswordToken: lockPasswordToken,
    //     resetLockPasswordExpires: new Date(Date.now() + 3600000)
    // })

    const updatedUser = await prisma.user.update({
        where: { email: email },
        data: {
            resetLockPasswordToken: lockPasswordToken,
            resetLockPasswordExpires: new Date(Date.now() + 3600000)
        }
    })

    console.log(updatedUser)


    const resetURL = `${process.env.NEXTAUTH_URL}/${locale}/reset-lock-password/${token}`

    const body = `Reset Lock OPT by clicking on the following link: ${resetURL}`



    console.log(process.env.SMTP_HOST, process.env.SMTP_PORT, process.env.SMTP_USERNAME, process.env.SMTP_PASSWORD)

    //   const emailHtml = await render(VerifyEmailTemplate(verificationLink));

    // Mailtrap SMTP configuration
    const transporter = nodemailer.createTransport({
        host: "smtp.zoho.com", // Make sure this is correct
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USERNAME, // Use environment variables for security
            pass: process.env.GENERATED_ZOHO_PASSWORD,
        },
    });



    try {
        await transporter.sendMail({
            from: 'admin@wds-oman.com',
            to: email,
            subject: subject,
            text: body,
        });

        res.status(200).json({ success: true, message: "Email sent successfully!" });
        // return Response.json({
        //     success: true,
        //     message: "Email sent successfully!"
        // })

    } catch (error: any) {
        console.error("Error sending email:", error);

        // await User.updateOne({ email: email }, {
        //     $set: {
        //         resetLockPasswordToken: null,
        //         resetLockPasswordExpires: null,
        //     }
        // })

        await prisma.user.update({
            where: { email: email },
            data: {
                resetLockPasswordToken: null,
                resetLockPasswordExpires: null,
            }
        })

        res.status(500).json({
            success: false,
            message: "Send lock OTP reset email api error: " + error.message
        });
        // return Response.json({
        //     success: false,
        //     message: "Failed to send email"
        // })
    }
}
