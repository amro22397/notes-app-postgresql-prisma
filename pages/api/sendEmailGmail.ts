import VerifyEmailTemplate from "@/app/emails/VerifyEmailTemplate";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/user";
import { render } from "@react-email/components";
import mongoose from "mongoose";
import nodemailer from "nodemailer";

export default async function handler(req: any, res: any) {
    if (req.method !== "POST") {
        return res.status(405).json({ 
            success: false,
            message: "Method not allowed"
         });
    }

    await connectToDatabase();

    const { email, subject, locale } = req.body;

    console.log(email, subject, locale)

    if (!subject || !email) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields"
        });
    }

    mongoose.connect(process.env.MONGO_URL as string);
    const user = await User.findOne({ email: email })


    const verificationToken = user.getVerificationToken();
    await user.save();
    console.log(verificationToken);

    const verificationLink = `${process.env.NEXTAUTH_URL}/${locale}/verify-email?verifyToken=${verificationToken}&id=${user._id}`

    console.log(verificationLink)

    const emailHtml = await render(VerifyEmailTemplate(verificationLink));

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
            html: emailHtml,
        });

        return res.status(200).json({
            success: true,
            message: "Email sent successfully!"
        });

    } catch (error: any) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Api Error: " + error.message
        });
    }
}
