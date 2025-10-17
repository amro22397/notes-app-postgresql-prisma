// import mongoose from "mongoose";
import prisma from "@/lib/prisma";
import crypto from "crypto"
// import { User } from "@/models/user";


export async function POST(req: Request) {
    // mongoose.connect(process.env.MONGO_URL as string);

    try {
        
        const { token } = await req.json();

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // const user = await User.findOne({
    //     resetPasswordToken: hashedToken,
    //     resetPasswordExpires: { $gt: Date.now() },
    // })

    const user = await prisma.user.findFirst({
        where: {
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { gt: new Date() },
            // resetPasswordExpires: { gt: Date.now() },
        }
    })

    if (!user) {
        return Response.json({
            message: "Invalid token or has expired",
            status: false,
        })
    }

    return Response.json({
        message: "Token is verified",
        status: true,
        user: user
    })

    } catch (error) {
        
        console.log(`Server Error verifying token: ${error}`);

        return Response.json({
        message: `Server Error verifying token: ${error}`,
        status: false,
    })
    
    }
}


