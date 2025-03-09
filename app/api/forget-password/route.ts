import { User } from "@/models/user";
import mongoose from "mongoose";
import sgMail from '@sendgrid/mail'
import crypto from 'crypto'

export async function POST(req: Request) {
    mongoose.connect(process.env.MONGO_URL as string);
    const { email, locale } = await req.json();

    const user = await User.findOne({ email: email });

    try {
        if (!user) {
            return Response.json({
                message: "User not found",
                success: false,
            })
        }
    
        // const resetURL = `${process.env.NEXTAUTH_URL}/${locale}/reset-password/${token}`

        // console.log(resetURL)

        // const body = `Reset password by clicking on the following link: ${resetURL}`

        // const msg = {
        //     to : email,
        //     from: 'amroalmutasim22@gmail.com',
        //     subject: "Reset Password",
        //     text: body,
        // }

        // sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

        // sgMail
        // .send(msg)
        // .then(() => {
        //     return Response.json({
        //         message: "Reset password email was sent",
        //         success: true,
        //     });
        // })
        // .catch(async (error) => {
        //     await User.updateOne({ email: email }, { $set: {
        //         resetPasswordToken: null,
        //         resetPasswordExpires: null,
        //     }})

        //     return Response.json({
        //         message: "Failed sending email. Try again",
        //         success: false,
        //     });
        // });

        /* await sendEmailVerification(
            user.email,
            "Password Reset Request",
            `please click the link to reset your password ${resetURL}`
        ) */
    
        /* return Response.json({
            message: "Password reset email was sent",
                success: true,
        }) */

                return Response.json({
                    message: "Reset password email was sent",
                    success: true,
                })

    } catch (error) {
        return Response.json({
            message: "Something went wrong",
                success: false,
        })
    }
}