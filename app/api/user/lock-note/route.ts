// import { connenctToMongoDB } from "@/libs/mongodb";
// import Note from "@/models/noteSchema";
// import { User } from "@/models/user";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function PUT(req: any) {

    try {
        // await connenctToMongoDB();

        const { lockedPassword, email } = await req.json();

        const id = req.nextUrl.searchParams.get('id');

        // const user = await User.findOne({ email: email });

        const user = await prisma.user.findUnique({
            where: { email: email }
        }) as any | null | undefined

        // const theNote = await Note.findById(id);

        const theNote = await prisma.note.findUnique({
            where: { id: id }
        }) as any | null | undefined

        if (!user.lockedPassword) {
            // const updateUser = await User.updateOne({ email: email }, {
            //     lockedPassword: lockedPassword
            // });

            const updateUser = await prisma.user.update({
                where: { email: email },
                data: { lockedPassword: lockedPassword }
            })
    
            // const updateNoteLocked = await Note.findByIdAndUpdate(id, {
            //     isLocked: true,
            // })

            const updateNoteLocked = await prisma.note.update({
                where: { id: id },
                data: { isLocked: true }
            })
    
            return NextResponse.json({
                success: true,
                message: "Note has been locked successfully",
                data: updateNoteLocked,
                updateUser: updateUser,
            })
        }

        
        if (user.lockedPassword) {
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

        console.log(`Server error: ${error}`)
        
        return NextResponse.json({
            success: false,
            message: `Server error: ${error}`
        })

    }
}


export async function POST(req: any) {

    // await connenctToMongoDB();

    try {
        
        const id = req.nextUrl.searchParams.get('id');

        const { lockedPassword, email } = await req.json();

        // const user = await User.findOne({ email: email })

        const user = await prisma.user.findUnique({
            where: { email: email }
        }) as any | null | undefined

        // const theNote = await Note.findById(id);

        const theNote = await prisma.note.findUnique({
            where: { id: id }
        }) as any | null | undefined

        if (user.lockedPassword) {
            if (lockedPassword === user.lockedPassword) {

                // const updatedNote = await Note.findByIdAndUpdate(id, { isLocked: false });

                const updatedNote = await prisma.note.update({
                    where: { id: id },
                    data: { isLocked: false }
                })

                return NextResponse.json({
                    success: true,
                    message: 'The note is unlocked',
                    data: updatedNote,
                    theNote: theNote,
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
            message: "API Error: " + error.message,
        })
        
    }
}