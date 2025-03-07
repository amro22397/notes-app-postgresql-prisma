import { connenctToMongoDB } from "@/libs/mongodb";
import Note from "@/models/noteSchema";
import { error } from "console";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function POST(req: any) {

    await connenctToMongoDB();

    try {

        const { noteName, noteContent, categories } = await req.json();

        const newNote = await Note.create({
            noteName, noteContent, categories,
            dateCreation: new Date(),
        })

        return NextResponse.json(
            { _id: newNote._id, noteName, noteContent, categories },
            { status: 200 },
        );

    } catch (error: any) {

        return NextResponse.json(
            { error: error.message },
            { status: 500 },
        );

    }
}


export async function GET(req: any) {

    try {

        await connenctToMongoDB();

        const searchTerm = req.nextUrl.searchParams.get('searchTerm');

        // const { searchParams } = new URL(req.url);
        // const searchTerm = searchParams.get('searchTerm');

        console.log(searchTerm)

        let searchString = searchTerm;

        if (searchTerm === null || searchTerm === undefined || searchTerm.trim === '') {
            searchString = ''
        }

        console.log(searchString)

        const pinnedNotes = req.nextUrl.searchParams.get('isPinned')
        

        if (pinnedNotes) {
            const pinnedNotes = await Note.find({ 
                isPinned: true,
                noteContent: { $regex: searchString, $options: 'i'},
             }).sort({
                updatedAt: -1,
                createdAt: -1,
            });
            return NextResponse.json({ pinnedNotes }, { status: 200 });
        }

        const allNotes = await Note.find({
            isPinned: { $ne: true },
            noteContent: { $regex: searchString, $options: 'i'},
        }).sort({ createdAt: -1 });



        return NextResponse.json({ allNotes }, { status: 200 });

    } catch (error: any) {

        return NextResponse.json({
            error: error.message,
        }, {
            status: 500,
        })
    }
}



export async function DELETE(req: any) {

    try {

        const id = req.nextUrl.searchParams.get('id');

        await Note.findByIdAndDelete(id);

        return NextResponse.json({
            message: 'Note has been deleted',
            success: true,
        })

    } catch (error: any) {

        return NextResponse.json({
            error: error.message,
        })
    }
}


export async function PUT(req: any) {

    try {

        const id = req.nextUrl.searchParams.get('id');

        const { newTitle, newContent, newCategories } = await req.json();

        const notesToUpdate = await Note.findById(id);

        notesToUpdate.noteName = newTitle;
        notesToUpdate.noteContent = newContent;
        notesToUpdate.categories = newCategories;

        await notesToUpdate.save();

        return NextResponse.json(
            { message: 'Note has been updated successfully...' },
            { status: 200 }
        );
    } catch (error) {

        console.log(error);
    }
}