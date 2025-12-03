import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

    const { name, emailRef } = await req.json();

    const isNameExist = await prisma.folder.findUnique({
        where: { name: name },
    })

    if (isNameExist) {
        return NextResponse.json({
            success: false,
            message: "Folder Name already exists",
        })
    }


    try {
        
        const folder = await prisma.folder.create({
            data: {
                name: name,
                emailRef: emailRef,
            }
        })

        return NextResponse.json({
            success: true,
            message: "Folder created successfully",
            data: folder,
        })


    } catch (error) {
        
        console.log(`Server error creating folder: ${error}`);

        return NextResponse.json({
            success: false,
            message: `Server error creating folder: ${error}`,
        })
    }
}




export async function PUT(req: NextRequest) {

    const { name, id } = await req.json();


    try {
        
        const updatedFolder = await prisma.folder.update({
            where: { id: id },
            data: {
                name: name,
            }
        })

        return NextResponse.json({
            success: true,
            message: "Folder updated successfully",
            data: updatedFolder,
        })


    } catch (error) {
        
        console.log(`Server error updating folder: ${error}`);

        return NextResponse.json({
            success: false,
            message: `Server error updating folder: ${error}`,
        })
    }
}



export async function DELETE(req: NextRequest) {

    const id = req.nextUrl.searchParams.get('id') as string | undefined | null;

    try {
        
        const deletedFolder = await prisma.folder.delete({
            where: { id: id }
        })

        return NextResponse.json({
            success: true,
            message: "Folder deleted successfully",
            data: deletedFolder
        })


    } catch (error) {
        
        console.log(`Server error deleting folder: ${error}`);

        return NextResponse.json({
            success: false,
            message: `Server error deleting folder: ${error}`,
        })
    }
}