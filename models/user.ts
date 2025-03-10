
import { model, models, Schema } from "mongoose"
import crypto from "crypto"

const UserSchema = new Schema({
    name: {
        type: String,
        // unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    image: {
        type: String,
    },

    hashedPassword: {
        type: String,
    },
    resetPasswordToken: {
        type: String,
        required: false,
    },
    resetPasswordExpires: {
        type: Date,
        required: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verifyToken: {
        type: String,
    },
    verifyTokenExpires: {
        type: Date,
    },

}, {timestamps: true})


UserSchema.methods.getVerificationToken = function ():string {
    const verificationToken = crypto.randomBytes(20).toString("hex");

    this.verifyToken = crypto.createHash("sha256").update(verificationToken).digest("hex");

    this.verifyTokenExpires = new Date(Date.now() + 3600000);

    return verificationToken;
}

export const User = models?.User || model("User", UserSchema)