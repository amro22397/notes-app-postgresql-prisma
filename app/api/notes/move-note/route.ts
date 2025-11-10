import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest) {

    const id = req.nextUrl.searchParams.get('id');
    const folderId = req.nextUrl.searchParams.get('folderId');
    
    try {
        
        const updatedNote = await prisma.note.update({
            where: { id: id },
            data: {
                listId: folderId,
            }
        })

        return NextResponse.json({
            success: true,
            message: "Note moved successfully",
            data: updatedNote,
        })

    } catch (error) {
        
        console.log(`Server error moving note: ${error}`)

        return NextResponse.json({
            success: false,
            message: `Server error moving note: ${error}`,
        })
    }
}