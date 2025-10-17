// import { connenctToMongoDB } from "@/libs/mongodb";
// import Note from "@/models/noteSchema";
// import { error } from "console";
// import mongoose from "mongoose";
import prisma from "@/lib/prisma";
import Note from "@/models/noteSchema";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

    // await connenctToMongoDB();
    // mongoose.connect(process.env.MONGO_URL as string);

    try {

        const { noteName, noteContent, categories, emailRef } = await req.json();

        // const newNote = await Note.create({
        //     noteName, noteContent, categories,
        //     dateCreation: new Date(),
        //     emailRef: emailRef,
        // })

        const newNote = await prisma.note.create({
            data: {
                noteName, noteContent, categories,
                dateCreation: new Date(),
                emailRef: emailRef,
            }
        })

        return NextResponse.json(
            { id: newNote.id, noteName, noteContent, categories, emailRef },
            { status: 200 },
        );

    } catch (error) {

        return NextResponse.json(
            { error: error },
            { status: 500 },
        );

    }
}


export async function GET(req: NextRequest) {

    try {

        // await connenctToMongoDB();
        // mongoose.connect(process.env.MONGO_URL as string);

        const searchTerm = req.nextUrl.searchParams.get('searchTerm');

        // const { searchParams } = new URL(req.url);
        // const searchTerm = searchParams.get('searchTerm');

        console.log(searchTerm)

        let searchString = searchTerm;

        if (searchTerm === null || searchTerm === undefined || searchTerm.trim() === '') {
            searchString = ''
        }

        console.log(searchString)

        const pinnedNotes = req.nextUrl.searchParams.get('isPinned')


        if (pinnedNotes) {
            // const pinnedNotes = await Note.find({
            //     isPinned: true,
            //     noteContent: { $regex: searchString, $options: 'i' },
            // }).sort({
            //     updatedAt: -1,
            //     createdAt: -1,
            // });

            const pinnedNotes = await prisma.note.findMany({
                where: {
                    AND: [
                        { isPinned: true },
                        { noteContent: { contains: searchString, mode: 'insensitive' } },
                    ]
                },
                orderBy: {
                    updatedAt: 'desc',
                    createdAt: 'desc',
                }
            })
            return NextResponse.json({ pinnedNotes }, { status: 200 });
        }

        // const allNotes = await Note.find({
        //     isPinned: { $ne: true },
        //     noteContent: { $regex: searchString, $options: 'i' },
        // }).sort({ createdAt: -1 });

        const allNotes = await prisma.note.findMany({
                where: {
                    AND: [
                        { isPinned: { not: true } },
                        { noteContent: { contains: searchString, mode: 'insensitive' } },
                    ]
                },
                orderBy: {
                    updatedAt: 'desc',
                    createdAt: 'desc',
                }
            })



        return NextResponse.json({ allNotes }, { status: 200 });

    } catch (error) {

        return NextResponse.json({
            error: error,
        }, {
            status: 500,
        })
    }
}



export async function DELETE(req: NextRequest) {

    // mongoose.connect(process.env.MONGO_URL as string);

    try {

        const id = req.nextUrl.searchParams.get('id') as string | undefined;

        // await Note.findByIdAndDelete(id);

        await prisma.note.delete({
            where: { id: id }
        })

        return NextResponse.json({
            message: 'Note has been deleted',
            success: true,
        })

    } catch (error) {

        return NextResponse.json({
            error: error,
        })
    }
}


export async function PUT(req: any) {

    // mongoose.connect(process.env.MONGO_URL as string);

    try {

        const id = req.nextUrl.searchParams.get('id');

        const { newTitle, newContent, newCategories } = await req.json();

        // const notesToUpdate = await Note.findById(id);

        // const notesToUpdate = await prisma.note.findUnique({
        //     where: { id: id }
        // }) as any | null | undefined

        // notesToUpdate.noteName = newTitle;
        // notesToUpdate.noteContent = newContent;
        // notesToUpdate.categories = newCategories;

        // await notesToUpdate.save();

        const notesToUpdate = await prisma.note.update({
            where: { id: id },
            data: {
                noteName: newTitle,
                noteContent: newContent,
                categories: newCategories,
            }
        })

        return NextResponse.json(
            { message: 'Note has been updated successfully...',
                data: notesToUpdate
             },
            { status: 200 },
        );
    } catch (error) {

        console.log(`Server Error updating note: ${error}`);
    }
}