'use client';

import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { AppContext, AppContextType } from '@/context/AppContext';
// import { useGlobalProvider } from '../ContextApi';

const Title = () => {

  const { openWindowNote, setOpenWindowNote, noteSelectedObject,
    getNotesFromMongoDB,
    getPinnedNotesFromMongoDB,
   } = useContext(AppContext) as AppContextType;

  const { noteSelected, setNoteSelected } = noteSelectedObject

  const openWindowNoteFunction = () => {
    setOpenWindowNote(true)
    setNoteSelected(null);
    console.log(noteSelected)
  }


  return (
    <div className="flex justify-between">
      <div className="flex gap-2 items-center">
        {/* <FontAwesomeIcon
          className={`w-20 h-20 p-2 bg-red-500 rounded-md text-white`}
          icon={faNoteSticky}
        /> */}

        <div className="text-[25px] flex gap-[7px]">
          <span className="font-bold text-amber-700/90 tracking-wide">Quick</span>
          <span className='text-black font-bold tracking-wide'>Notes</span>
        </div>
      </div>

      {/* <div className='w-lg py-4 px-4 bg-orange-200/70 rounded-full mx-auto'>
      
    </div> */}


      <button
        onClick={() => {
          openWindowNoteFunction();
          setNoteSelected(null);
          console.log(noteSelected)
        }}
        className=" px-3 py-1 rounded border border-amber-700/90 text-[22.5px] text-amber-700/90 hover:bg-amber-700/90
        cursor-pointer hover:text-white"
      >
        Add a note
      </button>
    </div>
  )
}

export default Title
