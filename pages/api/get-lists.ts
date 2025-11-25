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

        const { searchTerm } = await req.query;

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


            // const allNotes = await Note.find({
            //     isPinned: { $ne: true },
            //     emailRef: session?.user?.email, 
            //     noteContent: { $regex: searchString, $options: 'i'},
            // }).sort({ createdAt: -1 });

            const allFolders = await prisma.folder.findMany({
                where: {
                    AND: [
                        { emailRef: session?.user?.email },
                        { name: { contains: searchString, mode: 'insensitive' } },
                    ]
                },
                orderBy: [
                    { name: "asc" },
                ],

            })

            return res.status(200).json({
                success: true,
                message: "Folders fetched successfully",
                data: allFolders
            });



            return res.status(200).json({
                success: true,
                data: [],
            })
        }

        res.setHeader("Allow", ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`)


    } catch (error: any) {

        console.error(`Server error getting folders: ${error}`);

        res.status(500).json({
            success: false,
            message: `Server error getting folders: ${error}`,
            error: error.message
        })
        
    }
}
