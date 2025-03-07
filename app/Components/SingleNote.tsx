"use client";

import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { AppContext, AppContextType } from "@/context/AppContext";
import { useRouter, useSearchParams } from "next/navigation";
import { Pin } from "lucide-react";
// import { useGlobalProvider } from '../ContextApi';

function formatDate(date: Date) {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
}

function stringTruncation(str: any, strLength: number) {
  if (str?.length >= 40) {
    return str.substring(0, strLength) + "...";
  }
  return str;
}

const SingleNote = ({ singleNote, openedNote, setOpenedNote }: { 
  singleNote: any,
  setOpenedNote: (value: boolean) => void,
  openedNote: any,
 }) => {

  const router = useRouter();
  const searchParams = useSearchParams();  

  const addIdtoQueryString = (id: string) => {

    const url = new URLSearchParams(searchParams.toString());
    url.set("id", id);

    router.push(`?${url.toString()}`, { scroll: false });

  }
  // console.log(keyA)

  const {
    dropDownToogle,
    dropDownPositionsObject,
    noteSelectedObject,
    notesObject,
    setOpenWindowNote
  } = useContext(AppContext) as AppContextType;

  const { openDropDown, setOpenDropDown } = dropDownToogle;
  const { setDropDownPositions } = dropDownPositionsObject;
  const { setNoteSelected, noteSelected } = noteSelectedObject;

  console.log(openDropDown);

  function openDropDownFx(event: any, noteClicked: any) {
    if (event) {
      event.stopPropagation();
    }

    const xPosition = event.clientX;
    const yPosition = event.clientY;
    setDropDownPositions({ x: xPosition, y: yPosition });
    setOpenDropDown(true);
    setNoteSelected(noteClicked);
  }


  // useEffect(() => {
  //   setOpenedNote(singleNote);
  // }, [singleNote]);

  // console.log(openedNote)

  // console.log(keyA)
  return (
    <div
      key={singleNote._id}
      className="rounded-lg flex flex-col w-45 gap-2 border h-[170px] text-[19px] border-gray-200 bg-white p-4
       shadow-sm hover:shadow-2xl active:bg-gray-300/50 mx-auto"
       onClick={() => {
        setOpenedNote(singleNote);
        setOpenWindowNote(true);
        setOpenDropDown(false);
        console.log(openedNote)
        // addIdtoQueryString(singleNote._id);
        console.log(noteSelected)
       }}
    >
      <div className="flex justify-between items-center relative">
        {/* Header's note */}
        {/* <div className="text-[10px] text-gray-500 mt-1 ">
          {formatDate(singleNote.dateCreation)}
        </div> */}
        <div
          onClick={(event) => {
            openDropDownFx(event, singleNote);
          }}
          className="w-3 h-3"
        >
          <FontAwesomeIcon
            className=" text-gray-500 select-none cursor-pointer
            absolute top-0 right-0"
            icon={faEllipsis}
          />
        </div>

        <div className="absolute top-0 left-0">
          {singleNote.isPinned && (
            <Pin size={19} />
          )}
        </div>
      </div>

      <div className="flex flex-col justify-between items-center h-full mt-[1.25px]">
        {/* Title's note */}
        <h3 className="mt-0.5 font-bold text-[18px] text-gray-900 text-center
        w-[77.5%] break-words cursor-default">
          {stringTruncation(singleNote.noteContent, 34)}
        </h3>

        {/* the note itself */}
        {/* <p className="mt-2 text-gray-500 text-[11px] h-14 whitespace-pre-wrap">
        {stringTruncation(singleNote.noteContent, 80)}
      </p> */}

        {/* category's note */}
        {/* <div className="text-[10px] flex gap-2 flex-wrap">
        {singleNote.categories.map((category: any, index: number) => (
          <div
            key={index}
            className="bg-red-500 p-1 rounded-md text-white px-3"
          >
            {category}
          </div>
        ))}
      </div> */}

        <div className="text-[15px] text-center text-gray-500 mt-1 cursor-default">
          {formatDate(singleNote.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default SingleNote;
