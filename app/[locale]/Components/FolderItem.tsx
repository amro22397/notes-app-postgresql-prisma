"use client";

import { Folder } from "@/types/folder";
import { useLocale } from "next-intl";
import Link from "next/link";
import React from "react";
import { IoFolder } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import FolderItemInsideLink from "./FolderItemInsideLink";
import FolderItemBorderBottom from "./FolderItemBorderBottom";

const FolderItem = ({
  folder,
  index,
  folders,
  folderNotesLength,
  // isMoveNoteId,
}: {
  folder: Folder;
  index: number;
  folders: Folder[];
  folderNotesLength: number;
  // isMoveNoteId?: boolean;
}) => {
  const locale = useLocale();

  return (
    <>
      <Link
        href={`/${locale}/${folder.id}`}
        className={`w-full mx-auto flex justify-center items-center`}
        // onClick={(e) => {
        //   if (isMoveNoteId) {
        //     e.preventDefault();
        //     e.stopPropagation();
        //   }
        // }}
      >
        <FolderItemInsideLink folder={folder} folderNotesLength={folderNotesLength} />
      </Link>

      {/* {index !== folders.length - 1 && (
        <div className="w-[70%] border border-black/10"></div>
      )} */}

      <FolderItemBorderBottom index={index} folders={folders} />
    </>
  );
};

export default FolderItem;
