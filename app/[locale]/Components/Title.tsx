"use client";

import React, { useContext } from "react";
import { AppContext, AppContextType } from "@/context/AppContext";
import AddFolderComponent from "./AddFolderComponent";
import { useParams } from "next/navigation";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Link from "next/link";
import { useLocale } from "next-intl";
// import { useGlobalProvider } from '../ContextApi';

// import { FaRegEdit } from "react-icons/fa";
// import { IoTrashSharp } from "react-icons/io5";
import FolderEditDialog from "@/components/FolderEditDialog";
import FolderDeleteDialog from "@/components/FolderDeleteDialog";


const Title = ({
  isAddList,
  email,
  folderName,
  folderId,
  getFolderById,
  getFolders,
  isMoveNoteId
}: {
  isAddList?: boolean;
  email: string | null | undefined;
  folderName?: string | null | undefined,
  folderId?: string | null | undefined,
  getFolderById?: () => void,
  getFolders?: () => Promise<void>,
  isMoveNoteId?: boolean
}) => {
  const params = useParams() as any;

  const locale = useLocale();

  const {
    setOpenWindowNote,
    noteSelectedObject,
    // getNotesFromMongoDB,
    // getPinnedNotesFromMongoDB,
    // openWindowNote,
  } = useContext(AppContext) as AppContextType;

  const { noteSelected, setNoteSelected } = noteSelectedObject;

  const openWindowNoteFunction = () => {
    setOpenWindowNote(true);
    setNoteSelected(null);
    console.log(noteSelected);
  };

  return (
    <div
      className="flex flex-row max-[380px]:flex-col justify-between items-center max-[380px]:gap-[13px]
    w-full mx-auto max-sm:px-4"
    >
      {!params.id && (
        <div className="flex gap-2 items-center">
          {/* <FontAwesomeIcon
          className={`w-20 h-20 p-2 bg-red-500 rounded-md text-white`}
          icon={faNoteSticky}
        /> */}

          <div className="text-[25px] flex gap-[7px] cursor-default">
            <span className="font-bold text-amber-700/90 tracking-wide">
              Quick
            </span>
            <span className="text-black font-bold tracking-wide">Notes</span>
          </div>
        </div>
      )}

      {params.id && (
        <Link href={isMoveNoteId ? `/${locale}/${folderId}` : `/${locale}`}>
          <MdKeyboardArrowLeft
            size={40}
            className="ml-1 cursor-default text-yellow-600 hover:text-yellow-600/85
          active:scale-90"
          />
        </Link>
      )}

      {folderName && (
        <div className="flex flex-row items-center gap-4">

          <span className="text-black text-lg tracking-wide">{folderName}</span>


          <div className="flex flex-row items-center gap-1">
            
            <FolderEditDialog folderId={folderId} folderNameInput={folderName} getFolderById={getFolderById} />

            <FolderDeleteDialog folderId={folderId} getFolderById={getFolderById} />
          </div>

        </div>
      )}

      {/* <div className='w-lg py-4 px-4 bg-orange-200/70 rounded-full mx-auto'>
      
    </div> */}

      {!isAddList && !isMoveNoteId && (
        <button
          onClick={() => {
            openWindowNoteFunction();
            console.log(noteSelected);
          }}
          className="px-3 py-1 rounded border border-amber-700/90 text-[22.5px] text-amber-700/90 hover:bg-amber-700/90
        cursor-pointer hover:text-white"
        >
          Add a note
        </button>
      )}

      {isAddList && <AddFolderComponent isAddList={isAddList} email={email} getFolders={getFolders} />}

      {isMoveNoteId && (
        <span className="text-lg tracking-wide text-black mx-2 mt-[2px]">
          choose a folder to move your note to
        </span>
      )}
    </div>
  );
};

export default Title;
