import mongoose from "mongoose";
import crypto from "crypto"
import { User } from "@/models/user";


export async function POST(req: Request) {
    mongoose.connect(process.env.MONGO_URL as string);

    const { token } = await req.json();

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() },
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
}