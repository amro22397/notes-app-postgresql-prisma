import mongoose from "mongoose";
import crypto from "crypto"
import { User } from "@/models/user";

export async function PUT(req: Request) {
    mongoose.connect(process.env.MONGO_URL as string);
    const { verificationToken, userId } = await req.json();

    try {
        const verifyToken = crypto.createHash("sha256").update(verificationToken).digest("hex");
        console.log(verifyToken)
        

    const user = await User.findOne({
        _id: userId,
        verifyToken: verifyToken,
        verifyTokenExpires: { $gt: new Date()},
    });

    if (!user) {
        return Response.json({
            message: "Invalid token or has expired",
            success: false,
        })
    }
    
    await User.updateOne({ email: user.email }, { $set: {
        isVerified: true,
        verifyToken: null,
        verifyTokenExpires: null,
    }});

    return Response.json({
        message: 'Email is verified',
        success: true,
    });

    } catch (error) {
        console.log(error);
        return Response.json({
            message: `${error}`,
            success: false,
        })
    }

}