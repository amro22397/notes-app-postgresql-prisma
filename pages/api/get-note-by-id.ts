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

        // const searchTerm = req.nextUrl.searchParams.get('searchTerm');

        const { id } = await req.query;


        // const { searchParams } = new URL(req.url);
        // const searchTerm = searchParams.get('searchTerm');

        // const isPinned = req.nextUrl.searchParams.get('isPinned')

        if (req.method === "GET") {
            // find from db


            // const allNotes = await Note.find({
            //     isPinned: { $ne: true },
            //     emailRef: session?.user?.email, 
            //     noteContent: { $regex: searchString, $options: 'i'},
            // }).sort({ createdAt: -1 });

            const note = await prisma.note.findUnique({
                where: { id: id },
                
            })

            return res.status(200).json({
                success: true,
                message: "Note fetched successfully",
                data: note
            });



            return res.status(200).json({
                success: true,
                data: [],
            })
        }

        res.setHeader("Allow", ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`)


    } catch (error: any) {
        console.error(`Server error getting note: ${error}`);

        res.status(500).json({
            success: false,
            message: `Server error getting note: ${error}`,
            error: error.message
        })
    }
}
