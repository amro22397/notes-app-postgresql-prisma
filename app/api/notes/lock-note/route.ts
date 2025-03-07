import { connenctToMongoDB } from "@/libs/mongodb";
import Note from "@/models/noteSchema";
import { NextResponse } from "next/server";


export async function PUT(req: any) {

    try {

        await connenctToMongoDB();


        const id = req.nextUrl.searchParams.get('id');

        console.log(id);

        const theNote = await Note.findById(id);

        if (!theNote.lockedPassword) {
        const { lockedPassword } = await req.json();

        const updatedNote = await Note.findByIdAndUpdate(id, { lockedPassword });
        const updatedNoteLocked = await Note.findByIdAndUpdate(id, { isLocked: true });

        return NextResponse.json({
            success: true,
            message: 'The note is locked',
            data: updatedNoteLocked,
        })

        }

        if (theNote.lockedPassword) {
            if (!theNote.isLocked) {
                const updatedNote = await Note.findByIdAndUpdate(id, { isLocked: true });

            return NextResponse.json({
                success: true,
                message: 'The note is locked',
                data: updatedNote,
            })
            } else {
                const updatedNote = await Note.findByIdAndUpdate(id, { isLocked: false });

            return NextResponse.json({
                success: true,
                message: 'The note is unlocked',
                data: updatedNote,
            })
            }
        }

        return NextResponse.json({
            success: true
        })

        
    } catch (error: any) {

        return NextResponse.json({
            success: false,
            message: `ApiError: ${error.message}`,
        })

    }
}


export async function POST(req: any) {

    try {
         
        await connenctToMongoDB();

        const id = req.nextUrl.searchParams.get('id');

        const { lockedPassword } = await req.json();

        const theNote = await Note.findById(id);

        if (theNote.lockedPassword) {
            if (lockedPassword === theNote.lockedPassword) {

                const updatedNote = await Note.findByIdAndUpdate(id, { isLocked: false });

                return NextResponse.json({
                    success: true,
                    message: 'The note is unlocked',
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: 'The lock password is incorrect',
                })
            }
        }

        return NextResponse.json({
            success: true,
        })


    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `ApiError: ${error.message}`,
        })
    }
}