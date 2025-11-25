
// import { User } from "@/models/user";
// import mongoose from "mongoose";
// import { getServerSession } from "next-auth"

import type {
    //   GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
} from "next"
// import type { NextAuthOptions } from "next-auth"
import prisma from "@/lib/prisma";
// import { mySession } from "@/types/session";


// export const config = {
//   providers: [], // rest of your config
// } satisfies NextAuthOptions


// export function getSession(
//   ...args:
//     | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
//     | [NextApiRequest, NextApiResponse]
//     | []
// ) {
//   return getServerSession(...args, config)
// }


export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    const { locale, session } = req.query as any;

    console.log(`credentials:`, locale, session)

    if (req.method !== "GET") {
        return res.status(200).json({
            success: false,
            message: locale === "en" ? "This method is not allowed" : "هذه الطريقة غير مسموحة"

        })
    }

    const parsedSession = session ? JSON.parse(session) : null;


    try {

        // const session = await getSession();
        console.log(`Session is: ${parsedSession}`);




        let mySession: any;

        if (parsedSession) {
            mySession = parsedSession
        };



        if (!parsedSession?.user?.email) {
            return res.status(250).json({
                success: false,
                message: locale === "en" ? "Invalid session (missing user email)" : locale === "ar" ? "سيشن غير صالح (لم يتم العثور على البريد الإلكتروني)" : "",
                data: null
            })
        }


        if (req.method === "GET") {

            const currentUser = await prisma.user.findUnique({
                where: { email: parsedSession?.user?.email }
            })

            console.log(`currentUser: ${currentUser}`)

            if (!currentUser) {

                // await User.create({
                //   name: session?.user.name,
                //   email: session?.user?.email,
                //   image: session?.user?.image,
                //   isVerified: true,
                // })

                const user = await prisma.user.create({
                    data: {
                        name: parsedSession?.user.name,
                        email: parsedSession?.user?.email,
                        image: parsedSession?.user?.image,
                        isVerified: true,
                    }
                })

                console.log(user)
                mySession.user = user;
                mySession.user.id = user.id;
                mySession.user.isVerified = true;
                mySession.user.createdAt = user.createdAt;
                mySession.user.updatedAt = user.updatedAt;

                //   return mySession;

                return res.status(200).json({
                    success: true,
                    data: mySession
                })

            } else {

                // const updatedUser = await User.findOneAndUpdate({ email: session?.user?.email }, {
                //   name: session?.user?.name,
                //   image: session?.user?.image,
                // })

                const updatedUser = await prisma.user.update({
                    where: { email: parsedSession?.user?.email },
                    data: {
                        // name: session?.user?.name,
                        image: parsedSession?.user?.image,
                    }
                })

                console.log(updatedUser)
                mySession.user = updatedUser;
                mySession.user.id = currentUser.id;
                // mySession.user.isVerified = true;
                mySession.user.createdAt = currentUser.createdAt;
                mySession.user.updatedAt = updatedUser.updatedAt;

                //   return mySession;

                return res.status(200).json({
                    success: true,
                    data: mySession
                })
            }

            // return res.status(200).json({
            //     success: true,
            //     data: jUser
            // })
        }

        // res.status(200).json({
        //     success: true,
        // })


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