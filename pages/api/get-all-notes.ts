// import { connectToDatabase } from "@/lib/db";
// import Note from "@/models/noteSchema";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/lib/prisma';
// import { NextApiRequest, NextApiResponse } from "next";
// model import 


export default async function handler(req: any, res: any) {
    try {


        // await connectToDatabase();
        const session = await getServerSession(req, res, authOptions);
        console.log(session?.user?.email);


        if (!session) {
            return res.status(401).json({
                message: "Unauthorized",
                success: false,
            })
        }

        

        if (req.method === "GET") {
            // find from db



            // const allNotes = await Note.find({
            //     isPinned: { $ne: true },
            //     emailRef: session?.user?.email, 
            //     noteContent: { $regex: searchString, $options: 'i'},
            // }).sort({ createdAt: -1 });

            const allNotes = await prisma.note.findMany({
                where: {
                    AND: [
                        { emailRef: session?.user?.email },
                    ]
                },
                orderBy: [
                    { updatedAt: 'desc' },
                    { createdAt: 'desc' },
                ],

            })

            // return res.status(200).json({ allNotes }, { status: 200 });



            return res.status(200).json({
                success: true,
                data: allNotes,
            })
        }

        res.setHeader("Allow", ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`)


    } catch (error: any) {
        console.error(`Server error getting all notes: ${error}`);
        
        res.status(500).json({
            success: false,
            message: `Server error getting all notes: ${error}`,
            error: error.message
        })
    }
}
