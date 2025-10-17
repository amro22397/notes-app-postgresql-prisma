// import Welcome from "@/app/emails/Welcome";
import nodemailer from "nodemailer";
import { render } from '@react-email/components';
import VerifyEmailTemplate from "@/app/emails/VerifyEmailTemplate";
// import { User } from "@/models/user";
// import { connectToDatabase } from "@/lib/db";
// import mongoose from "mongoose";
import prisma from "@/lib/prisma";
// import crypto from "crypto"
import { UserService } from "@/lib/user.service"; 




export default async function handler(req: any, res: any) {
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

  



  try {

    const { email, subject, locale } = req.body;

  

  if (!email || !subject) {
    return res.status(400).json({ 
      success: false,
      error: "Missing required fields" 
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


  // const getVerificationToken = ():string => {
  //   const verificationToken = crypto.randomBytes(20).toString("hex");

  //   this.verifyToken = crypto.createHash("sha256").update(verificationToken).digest("hex");

  //   this.verifyTokenExpires = new Date(Date.now() + 3600000);

  //   return verificationToken;

  // }

  // const verificationToken = user.getVerificationToken();
  //   await user.save();
    // console.log(verificationToken);

    const verificationToken = await UserService.getVerificationToken(user.id);


    const verificationLink = `${process.env.NEXTAUTH_URL}/${locale}/verify-email?verifyToken=${verificationToken}&id=${user.id}`

    console.log(verificationLink)




  console.log(process.env.SMTP_HOST, process.env.SMTP_PORT, process.env.SMTP_USERNAME,
     process.env.SMTP_PASSWORD, process.env.GENERATED_ZOHO_PASSWORD)

  console.log('console log: ', email, subject, locale, user)

  const emailHtml = await render(VerifyEmailTemplate(verificationLink));

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


    await transporter.sendMail({
      from: 'admin@wds-oman.com',
      to: email,
      subject: subject,
      html: emailHtml,
    });

    console.log('Email sent successfully!')

    res.status(200).json({ success: true, message: "Email sent successfully!" });
    // return Response.json({
    //     success: true,
    //     message: "Email sent successfully!"
    // })

  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ 
      success: false,
      message: "Api Error: " + error
     });
    // return Response.json({
    //     success: false,
    //     message: "Failed to send email"
    // })
  }
}
