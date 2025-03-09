import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import sgMail from '@sendgrid/mail'
import { User } from "@/models/user";

export const sendEmail = (
    email: string,
    subject: string,
    message: string
) => {
    try {

        /* const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST as string,
            port: process.env.SMTP_PORT as string,
            auth: {
                user: process.env.SMTP_USER as string,
                pass: process.env.SMTP_PASSWORD as string,
            }
        });

        const mailOptions = {
            from: process.env.SMTP_FROM_EMAIL,
            to: email,
            subject,
            text: message,
        }

        await transporter.sendEmail(mailOptions); */

    } catch (error) {
        
        return NextResponse.json({
            message: error,
            success: false,
        })
    }
}