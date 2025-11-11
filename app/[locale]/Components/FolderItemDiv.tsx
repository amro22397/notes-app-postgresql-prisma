"use client";

import React, { useEffect, useState } from "react";
import FolderItemInsideLink from "./FolderItemInsideLink";
import { Folder } from "@/types/folder";
import FolderItemBorderBottom from "./FolderItemBorderBottom";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useLocale } from "next-intl";

const FolderItemDiv = ({
  folder,
  index,
  folders,
  folderNotesLength,
  isMoveNoteId,
  noteListId
}: {
  folder: Folder;
  index: number;
  folders: Folder[];
  folderNotesLength: number;
  isMoveNoteId?: boolean;
  noteListId?: string | null | undefined
}) => {
  const params = useParams() as any;
  const router = useRouter();
  const locale = useLocale();

  const [noteMovingLoad, setNoteMovingLoad] = useState(false);

  const [folderClicked, setFolderClicked] = useState("");


  const handleMoveNote = async (e: any) => {
    e.preventDefault();

    setNoteMovingLoad(true)

    setFolderClicked(folder.id)

    try {
      const res = await axios.put(`/api/notes/move-note?id=${params.id}&folderId=${folder.id}`);

      if (!res.data.success) {
        toast.error(res.data.message);
      }

      if (res.data.success) {
        toast.success(res.data.message);
        router.push(`/${locale}/`)
      }

      setNoteMovingLoad(false);

    } catch (error) {

        console.log(`Client error moving note: ${error}`)

        toast.error(`Client error moving note: ${error}`)

        setNoteMovingLoad(false);
    }
  };


  const allFolderWithoutHidden = folders.filter((item: Folder) => item.id !== noteListId);

  const folderIndex = allFolderWithoutHidden.findIndex((item: Folder) => item.id === folder.id )

  const length = allFolderWithoutHidden.length;

  const hiddenFolderIndex = folders.findIndex((item: Folder) => item.id === noteListId)

  

  return (
    <>
      {/* <pre className="">{JSON.stringify(selectedNote, null, 2)}</pre> */}

      {/* {length} */}

      {/*  */}
      {folder.id === folderClicked && noteMovingLoad ? (
        <Loader2 className='animate-spin my-[7px]' />
      ) : (
        <div
        className="w-full mx-auto flex justify-center items-center"
        onClick={handleMoveNote}
      >
        <FolderItemInsideLink
          folder={folder}
          folderNotesLength={folderNotesLength}
        />
      </div>
      )}

      {hiddenFolderIndex === folders.length - 1 && index !== folders.length - 2 && (
        <FolderItemBorderBottom index={index} folders={folders} />
      )}

      {hiddenFolderIndex !== folders.length - 1 && (
        <FolderItemBorderBottom index={index} folders={folders} />
      )}
      

      

      
    </>
  );
};

export default FolderItemDiv;
