import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    const { email, locale } = req.query;

    try {
        

        if (req.method === "GET") {

        const jUser = await prisma.user.findUnique({
            where: { email: email }
        })

        return res.status(200).json({
            success: true,
            data: jUser
        })
    }


    res.setHeader("Allow", ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`)


    } catch (error) {
        
        console.log(locale === "en" ? `Server error getting the user: ${error}` : locale === "ar" ? `خلل من السيرفر في الحصول على إسم المستخدم:  ${error}` : "");

        res.status(500).json({
            success: false,
            message: locale === "en" ? `Server error getting the user: ${error}` : locale === "ar" ? `خلل من السيرفر في الحصول على إسم المستخدم:  ${error}` : "",
        })
    }
}