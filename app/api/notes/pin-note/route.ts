import { connenctToMongoDB } from "@/libs/mongodb";
import Note from "@/models/noteSchema";
import { NextResponse } from "next/server";


export async function PUT(req: any) {

    try {
        
        await connenctToMongoDB();

        const id = req.nextUrl.searchParams.get('id');
        
        const noteSelected = await Note.findById(id);

        console.log(noteSelected)

        if (!noteSelected.isPinned) {
            const pinnedNote = await Note.findByIdAndUpdate(id, { isPinned: true });

        return NextResponse.json({
            success: true,
            message: 'The note has been pinned',
            data: pinnedNote
        });
        }

        if (noteSelected.isPinned) {
            const pinnedNote = await Note.findByIdAndUpdate(id, { isPinned: false });

        return NextResponse.json({
            success: true,
            message: 'The note has been unpinned',
            data: pinnedNote
        });
        }

        

    } catch (error: any) {
        
        return NextResponse.json({
            success: false,
            message: `Error: ${error.message}`,
        })
    }
}