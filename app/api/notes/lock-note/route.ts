// import { connenctToMongoDB } from "@/libs/mongodb";
// import Note from "@/models/noteSchema";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function PUT(req: any) {

    try {

        // await connenctToMongoDB();


        const id = req.nextUrl.searchParams.get('id');

        console.log(id);

        // const theNote = await Note.findById(id);

        const theNote = await prisma.note.findUnique({
            where: { id: id }
        }) as any | null | undefined

        if (!theNote.lockedPassword) {
            const { lockedPassword } = await req.json();

            // const updatedNote = await Note.findByIdAndUpdate(id, { lockedPassword });

            const updatedNote = await prisma.note.update({
                where: { id: id },
                data: { lockedPassword: lockedPassword }
            })

            // const updatedNoteLocked = await Note.findByIdAndUpdate(id, { isLocked: true });

            const updatedNoteLocked = await prisma.note.update({
                where: { id: id },
                data: { isLocked: true }
            })

            return NextResponse.json({
                success: true,
                message: 'The note is locked',
                data: updatedNoteLocked,
                updatedNote: updatedNote,
            })

        }

        if (theNote.lockedPassword) {
            if (!theNote.isLocked) {
                // const updatedNote = await Note.findByIdAndUpdate(id, { isLocked: true });

                const updatedNote = await prisma.note.update({
                    where: { id: id },
                    data: { isLocked: true }
                })

                return NextResponse.json({
                    success: true,
                    message: 'The note is locked',
                    data: updatedNote,
                })
            } else {
                // const updatedNote = await Note.findByIdAndUpdate(id, { isLocked: false });

                const updatedNote = await prisma.note.update({
                    where: { id: id },
                    data: { isLocked: false }
                })

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


    } catch (error) {

        return NextResponse.json({
            success: false,
            message: `ApiError updating locked note: ${error}`,
        })

    }
}


export async function POST(req: any) {

    try {

        // await connenctToMongoDB();

        const id = req.nextUrl.searchParams.get('id');

        const { lockedPassword } = await req.json();

        // const theNote = await Note.findById(id);

        const theNote = await prisma.note.findUnique({
            where: { id: id }
        }) as any | null | undefined

        if (theNote.lockedPassword) {
            if (lockedPassword === theNote.lockedPassword) {

                // const updatedNote = await Note.findByIdAndUpdate(id, { isLocked: false });

                const updatedNote = await prisma.note.update({
                    where: { id: id },
                    data: { isLocked: false }
                })

                return NextResponse.json({
                    success: true,
                    message: 'The note is unlocked',
                    data: updatedNote,
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


    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `ApiError opening lock: ${error}`,
        })
    }
}