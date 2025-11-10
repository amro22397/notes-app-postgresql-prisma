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
import FolderName from "@/components/FolderName";


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
      className={`flex flex-row  justify-between items-center 
    w-full mx-auto ${params.id ? "max-sm:px-0" : "max-[380px]:flex-col max-[380px]:gap-[13px] max-sm:px-4" }`}
    // max-md:flex-col gap-[13px]"
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
        <FolderName folderName={folderName} folderId={folderId} getFolderById={getFolderById} />
      )}

      {/* <div className='w-lg py-4 px-4 bg-orange-200/70 rounded-full mx-auto'>
      
    </div> */}

      {!isAddList && !isMoveNoteId && (
        <div className="flex flex-col items-center gap-[13px]">

          {folderName && (
        <FolderName folderName={folderName} folderId={folderId} getFolderById={getFolderById}
        paramsId={params.id}
        />
      )}

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

        </div>
      )}

      {isAddList && <AddFolderComponent isAddList={isAddList} email={email} getFolders={getFolders} />}

      {isMoveNoteId && (
        <span className="sm:text-lg max-sm:text-center tracking-wide text-black mx-2 mt-[2px]">
          choose a folder to move your note to
        </span>
      )}
    </div>
  );
};

export default Title;
