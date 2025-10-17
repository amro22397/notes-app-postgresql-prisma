import prisma from "@/lib/prisma";
import crypto from "crypto";


export const UserService = {

    async getVerificationToken(userId: string): Promise<string> {

        const verificationToken = crypto.randomBytes(20).toString("hex");

        const hashedToken = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");

      await prisma.user.update({
      where: { id: userId },
      data: {
        verifyToken: hashedToken,
        verifyTokenExpires: new Date(Date.now() + 3600000), // 1 hour
      },
    });

    return verificationToken; 

    }
}