// import { connenctToMongoDB } from "@/libs/mongodb";
// import Note from "@/models/noteSchema";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function PUT(req: any) {

    try {
        
        // await connenctToMongoDB();

        const id = req.nextUrl.searchParams.get('id');
        
        // const noteSelected = await Note.findById(id);

        const noteSelected = await prisma.note.findUnique({
            where: { id: id }
        }) as any | null | undefined

        console.log(noteSelected)

        if (!noteSelected.isPinned) {
            // const pinnedNote = await Note.findByIdAndUpdate(id, { isPinned: true });

            const pinnedNote = await prisma.note.update({
                where: { id: id },
                data: { isPinned: true }
            })

        return NextResponse.json({
            success: true,
            message: 'The note has been pinned',
            data: pinnedNote
        });
        }

        if (noteSelected.isPinned) {
            // const pinnedNote = await Note.findByIdAndUpdate(id, { isPinned: false });

            const pinnedNote = await prisma.note.update({
                where: { id: id },
                data: { isPinned: false }
            })

        return NextResponse.json({
            success: true,
            message: 'The note has been unpinned',
            data: pinnedNote
        });
        }

        

    } catch (error) {
        
        return NextResponse.json({
            success: false,
            message: `Server Error updating pinned note: ${error}`,
        })
    }
}