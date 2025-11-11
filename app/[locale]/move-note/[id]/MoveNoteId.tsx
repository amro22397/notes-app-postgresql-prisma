"use client";

import GoToNormalPage from "@/components/GoToNormalPage";
import React, { useEffect, useState } from "react";
import Title from "../../Components/Title";
import { Session } from "@/types/session";
import { useParams, useSearchParams } from "next/navigation";
import SearchBar from "../../Components/SearchBar";
import axios from "axios";
import { Folder } from "@/types/folder";
import FolderItem from "../../Components/FolderItem";
import FolderItemDiv from "../../Components/FolderItemDiv";
import { useLocale } from "next-intl";
import Link from "next/link";

const MoveNoteId = ({
  email,
  user,
}: {
  email: string | null | undefined;
  user: Session | null | undefined;
}) => {
  console.log(user);

  const params = useSearchParams() as any;
  const locale = useLocale();

  const routerParams = useParams() as any;

  const folderId = params.get("folderId");

  const [folders, setFolders] = useState([]);
  const [allNotes, setAllNotes] = useState([]);

  const [selectedNote, setSelectedNote] = useState<any>(null);


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



  const findNoteById = async () => {
  
      const res = await axios.get(`/api/get-note-by-id?id=${routerParams.id}`);
  
      setSelectedNote(res.data.data)
  
  
    }
  
  
    useEffect(() => {
      findNoteById();
    }, [routerParams.id]);

  useEffect(() => {
    getFolders();
  }, [searchTerm]);

  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <div className="app-app-style">
      {/* <GoToNormalPage /> */}

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
              //   <FolderItem
              //     key={folder.name}
              //     folder={folder}
              //     index={index}
              //     folders={folders}
              //     folderNotesLength={notesByListId.length}
              //     isMoveNoteId={true}
              //   />

              <>
              {/* <pre className="">{JSON.stringify(selectedNote, null, 2)}</pre> */}
              {selectedNote?.listId !== folder.id && (
                <FolderItemDiv
                key={folder.name}
                folder={folder}
                index={index}
                folders={folders}
                folderNotesLength={notesByListId.length}
                isMoveNoteId={true}
                noteListId={selectedNote?.listId}
              />
              )}
              </>
            );
          })}
      </div>


      <div className="flex items-center justify-center">
        <Link href={`/${locale}/`}
        className="text-[16px] hover:underline active:scale-95 cursor-pointer"
        >
            Back to folders
        </Link>
      </div>


    </div>
  );
};

export default MoveNoteId;
