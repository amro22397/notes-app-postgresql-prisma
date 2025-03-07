import { connenctToMongoDB } from "@/libs/mongodb";
import Note from "@/models/noteSchema";
import { NextResponse } from "next/server";


export async function GET(req: Request, { params }: { params: { id: string }}) {

    await connenctToMongoDB();

    console.log(params.id);

    const singleNote = await Note.findById(params.id);

    return NextResponse.json(singleNote)
}