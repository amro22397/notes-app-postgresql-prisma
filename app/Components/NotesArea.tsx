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
      <ScrollArea className="h-[90vh] overflow-hidden w-full flex flex-col my-2">
      {pinnedNotes.length > 0 && (
        <div className="flex flex-col items-center justify-center gap-y-2 mb-14">
          {/* <span className="text-[20px] font-semibold">Pinned</span> */}
          <div
            className="grid grid-cols-3 gap-x-3 gap-y-5
    mx-5 justify-center items-center"
          >
            {pinnedNotes.map((singleNote: SingleNoteType, index: number) => (
              <>
                <SingleNote
                  singleNote={singleNote}
                  setOpenedNote={setOpenedNote}
                  openedNote={openedNote}
                />
              </>
            ))}
          </div>
        </div>
      )}

      <div
        className="grid grid-cols-3 gap-x-3 gap-y-5
    mx-5 justify-center items-center"
      >
        {allNotes.map((singleNote: any, index: number) => {
          console.log(singleNote._id);
          return (
            <>
              <SingleNote
                singleNote={singleNote}
                setOpenedNote={setOpenedNote}
                openedNote={openedNote}
              />
            </>
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
