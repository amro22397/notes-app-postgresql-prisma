"use client";

import GoToNormalPage from "@/components/GoToNormalPage";
import React, { useEffect, useState } from "react";
import Title from "../../Components/Title";
import { Session } from "@/types/session";
import { useSearchParams } from "next/navigation";
import SearchBar from "../../Components/SearchBar";
import axios from "axios";
import { Folder } from "@/types/folder";
import FolderItem from "../../Components/FolderItem";

const MoveNoteId = ({
  email,
  user,
}: {
  email: string | null | undefined;
  user: Session | null | undefined;
}) => {
  console.log(user);

  const params = useSearchParams() as any;

  const folderId = params.get("folderId");

  const [folders, setFolders] = useState([]);
  const [allNotes, setAllNotes] = useState([]);

  const searchParams = useSearchParams() as any;

  const searchTerm = searchParams.get("searchTerm");

  const getFolders = async () => {
    const res = await axios.get(
      `/api/get-lists${searchTerm ? `?searchTerm=${searchTerm}` : ""}`
    );

    setFolders(res.data.data);
  };

  const getAllNotes = async () => {
    const res = await axios.get(`/api/get-all-notes`);

    setAllNotes(res.data.data);
  };

  useEffect(() => {
    getFolders();
  }, [searchTerm]);

  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <div className="app-app-style">
      <GoToNormalPage />

      <Title
        email={email}
        //   folderName={folderById?.name}
        //   folderId={folderById?.id}
        //   getFolderById={getFolderById}
        folderId={folderId}
        isMoveNoteId={true}
      />

      <SearchBar isMoveNoteId={true} folderId={folderId} />

      <div
        className={`flex flex-col items-center justify-center gap-2
      sm:rounded-md rounded-md py-3 sm:w-[80%] w-[97.5%] mx-auto ${folders.length > 0 && "bg-white/50 "}`}
      >
        {folders.length > 0 &&
          folders.map((folder: Folder, index: number) => {
            const notesByListId = allNotes.filter(
              (note: any) => note.listId === folder.id
            );

            return (
              <FolderItem
                key={folder.name}
                folder={folder}
                index={index}
                folders={folders}
                folderNotesLength={notesByListId.length}
              />
            );
          })}
      </div>
    </div>
  );
};

export default MoveNoteId;
