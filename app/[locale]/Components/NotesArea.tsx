"use client";

import { AppContext, AppContextType } from "@/context/AppContext";
import React, { useContext, useState } from "react";
import SingleNote from "./SingleNote";
import NoteWindow from "./NoteWindow";
import { SingleNoteType } from "@/types/singleNote";
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSearchParams } from "next/navigation";
// import axios from "axios";

// import SingeNote from './SingeNote';
// import { useGlobalProvider } from '../ContextApi';

const NotesArea = ({ email }: {
  email: string | null | undefined
}) => {

  console.log(email)
  const { notesObject, initialNotesObject } = useContext(
    AppContext
  ) as AppContextType;
  const { allNotes, pinnedNotes } = notesObject;
  const {} = initialNotesObject;
  const [openedNote, setOpenedNote] = useState({});

  

  // const [initialAllNotes, setInitialAllNotes] = useState<any[]>([]);
  //   const [allNotes, setAllNotes] = useState<any[]>([]);
  //   const [pinnedNotes, setPinnedNotes] = useState<any[]>([]);

  //   console.log(allNotes);

  // console.log(pinnedNotes.length)

  const searchParams = useSearchParams() as any;
      const searchTerm = searchParams.get("searchTerm");

      console.log(searchTerm)



  // const getNotesFromMongoDB = async () => {
  //     try {
  //       const res = await axios.get(`/api/get-notes${searchTerm ? `?searchTerm=${searchTerm}`: ''}`);
  
  //       console.log(searchTerm)
  
  //       setAllNotes(res.data.allNotes);
  //       setInitialAllNotes(res.data.allNotes);
  
  //       console.log(res)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  
  //   const getPinnedNotesFromMongoDB = async () => {
  //     try {
  //       const res = await axios.get(`/api/get-notes?isPinned=true&${searchTerm ? `searchTerm=${searchTerm}`: ''}`);
  
  //       setPinnedNotes(res.data.pinnedNotes);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
      
  
  //   useEffect(() => {
  //     getNotesFromMongoDB();
  //     getPinnedNotesFromMongoDB();
  //   }, [searchTerm]);


  return (
    // <div className="flex flex-col overflow-hidden hover:overflow-y-auto gap-14 my-2">
    <>
      <ScrollArea className="h-[90vh] overflow-x-hidden w-full flex flex-col
      items-center justify-center mt-2">
        
          {/* <span className="text-[20px] font-semibold">Pinned</span> */}
          {/* <div className="flex flex-col items-center justify-center gap-y-2 mb-14"></div> */}
          <div
            className={`notes ${pinnedNotes.length === 0 ? 'hidden mb-0' : 'mb-14'}`}
          >
            {pinnedNotes.length > 0 && pinnedNotes.map((singleNote: SingleNoteType, index: number) => {
              return (

              
              <div 
              key={index}
              className="flex flex-col items-center justify-center gap-y-[11px] ">
                <SingleNote
                
                  singleNote={singleNote}
                  setOpenedNote={setOpenedNote}
                  // openedNote={openedNote}
                />

                <span className="font-semibold text-[17px] text-center w-full line-clamp-1
                ">
              {/* {stringTruncation(singleNote.noteContent, 20)} */}
              {singleNote.noteContent}
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
          console.log(singleNote.id);
          return (
            <div 
            key={index}
            className="flex flex-col items-center justify-center gap-y-[11px] ">
              <SingleNote
                singleNote={singleNote}
                setOpenedNote={setOpenedNote}
                // openedNote={openedNote}
              />
              <span className="font-semibold text-[17px] text-center w-full line-clamp-1">
              {/* {stringTruncation(singleNote.noteContent, 20)} */}
              {singleNote.noteContent}
              </span>
            </div>
          );
        })}
      </div>
      </ScrollArea>
      <NoteWindow singleNote={openedNote} email={email} />
      </>

    // {/* </div> */}
  );
};

export default NotesArea;


// function stringTruncation(str: any, strLength: number) {
//   if (str?.length >= 40) {
//     return str.substring(0, strLength) + "...";
//   }
//   return str;
// }