"use client";

import { AppContext, AppContextType } from "@/context/AppContext";
import React, { useContext, useState } from "react";
import SingleNote from "./SingleNote";
import NoteWindow from "./NoteWindow";
import { SingleNoteType } from "@/types/singleNote";
import { ScrollArea } from "@/components/ui/scroll-area"

// import SingeNote from './SingeNote';
// import { useGlobalProvider } from '../ContextApi';

const NotesArea = () => {
  const { notesObject, initialNotesObject } = useContext(
    AppContext
  ) as AppContextType;
  const { allNotes, pinnedNotes } = notesObject;
  const { initialAllNotes, setInitialAllNotes } = initialNotesObject;
  const [openedNote, setOpenedNote] = useState({});

  console.log(allNotes);

  return (
    // <div className="flex flex-col overflow-hidden hover:overflow-y-auto gap-14 my-2">
    <>
      <ScrollArea className="h-[90vh] overflow-hidden w-full flex flex-col
      items-center justify-center mt-2">
        
          {/* <span className="text-[20px] font-semibold">Pinned</span> */}
          {/* <div className="flex flex-col items-center justify-center gap-y-2 mb-14"></div> */}
          <div
            className="notes mb-14"
          >
            {pinnedNotes.length > 0 && pinnedNotes.map((singleNote: SingleNoteType, index: number) => {
              return (

              
              <div className="flex flex-col items-center justify-center gap-y-[11px] ">
                <SingleNote
                  singleNote={singleNote}
                  setOpenedNote={setOpenedNote}
                  // openedNote={openedNote}
                />

                <span className="font-semibold text-[17px] text-center">
              {stringTruncation(singleNote.noteContent, 20)}
              </span>
              </div>
              )
            }
            )}
          </div>

      <div
        className="notes"
      >
        {allNotes.map((singleNote: any, index: number) => {
          console.log(singleNote._id);
          return (
            <div className="flex flex-col items-center justify-center gap-y-[11px] ">
              <SingleNote
                singleNote={singleNote}
                setOpenedNote={setOpenedNote}
                // openedNote={openedNote}
              />
              <span className="font-semibold text-[17px] text-center">
              {stringTruncation(singleNote.noteContent, 20)}
              </span>
            </div>
          );
        })}
      </div>
      </ScrollArea>
      <NoteWindow singleNote={openedNote} />
      </>

    // {/* </div> */}
  );
};

export default NotesArea;


function stringTruncation(str: any, strLength: number) {
  if (str?.length >= 40) {
    return str.substring(0, strLength) + "...";
  }
  return str;
}