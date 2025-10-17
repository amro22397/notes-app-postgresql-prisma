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
        console.log('Hello')
        const session = await getServerSession(req, res, authOptions);
        console.log(session?.user?.email);


        if (!session) {
            return res.status(401).json({
                message: "Unauthorized",
                success: false,
            })
        }

        // const searchTerm = req.nextUrl.searchParams.get('searchTerm');

        const { searchTerm, isPinned } = await req.query;

        // const { searchParams } = new URL(req.url);
        // const searchTerm = searchParams.get('searchTerm');

        console.log(searchTerm)

        let searchString = searchTerm;

        if (searchTerm === null || searchTerm === undefined || searchTerm.trim() === '') {
            searchString = ''
        }

        console.log(searchString)

        // const isPinned = req.nextUrl.searchParams.get('isPinned')

        if (req.method === "GET") {
            // find from db


            if (isPinned) {
                // const pinnedNotes = await Note.find({ 
                //     isPinned: true,
                //     emailRef: session?.user?.email, 
                //     noteContent: { $regex: searchString, $options: 'i'},
                //  }).sort({
                //     updatedAt: -1,
                //     createdAt: -1,
                // });

                const pinnedNotes = await prisma.note.findMany({
                    where: {
                        AND: [
                            { isPinned: true },
                            { emailRef: session?.user?.email },
                            { noteContent: { contains: searchString, mode: 'insensitive' } },
                        ]
                    },
                    orderBy: [
                        { updatedAt: 'desc' },
                        { createdAt: 'desc' },
                    ],
                })
                return res.status(200).json({ pinnedNotes }, { status: 200 });
            }

            // const allNotes = await Note.find({
            //     isPinned: { $ne: true },
            //     emailRef: session?.user?.email, 
            //     noteContent: { $regex: searchString, $options: 'i'},
            // }).sort({ createdAt: -1 });

            const allNotes = await prisma.note.findMany({
                where: {
                    AND: [
                        { isPinned: { not: true } },
                        { emailRef: session?.user?.email },
                        { noteContent: { contains: searchString, mode: 'insensitive' } },
                    ]
                },
                orderBy: [
                    { updatedAt: 'desc' },
                    { createdAt: 'desc' },
                ],

            })

            return res.status(200).json({ allNotes }, { status: 200 });



            return res.status(200).json({
                success: true,
                data: [],
            })
        }

        res.setHeader("Allow", ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`)


    } catch (error: any) {
        console.error('Error in handler', error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}
