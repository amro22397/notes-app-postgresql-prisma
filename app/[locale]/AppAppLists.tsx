'use client'

import React, { useEffect, useState } from 'react'
import Title from './Components/Title'
import SearchBar from './Components/SearchBar'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { Folder } from '@/types/folder'
import { IoFolder } from 'react-icons/io5'
import { MdKeyboardArrowRight } from 'react-icons/md'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import FolderItem from './Components/FolderItem'

const AppAppLists = ({ email, user }: {
  email: string | null | undefined,
  user: Session | null | undefined
}) => {

  const locale = useLocale();

    const [folders, setFolders] = useState([]);

    const [allNotes, setAllNotes] = useState([]);

    const getAllNotes = async () => {

      const res = await axios.get(`/api/get-all-notes`);

      setAllNotes(res.data.data);

    }

    const searchParams = useSearchParams() as any;

    const searchTerm = searchParams.get("searchTerm")

    const getFolders = async () => {
      
      const res = await axios.get(`/api/get-lists${searchTerm ? `?searchTerm=${searchTerm}`: ''}`);

      setFolders(res.data.data);


    }


    useEffect(() => {
      getFolders();
      
    }, [searchTerm]);

    useEffect(() => {
      getAllNotes();
    }, []);

    const allId = 'all'

    
  return (
    <div className="relative md:w-[700px] w-[95vw] max-h-[700px] rounded-md shadow-md sm:px-7 p-0 py-7 flex flex-col gap-6
    bg-zinc-200/75">
      
      {/* <pre className="">{JSON.stringify(allNotes, null, 2)}</pre> */}

      <Title isAddList={true} email={email} getFolders={getFolders} />
      
      <SearchBar isAddList={true} />

      <div className={`flex flex-col items-center justify-center
      sm:rounded-md rounded-md py-[8px] sm:w-[80%] w-[97.5%] mx-auto ${folders.length > 0 && 'bg-white/50 '}`}>
        {/* <pre className="">{JSON.stringify(folders, null, 2)}</pre> */}

        <>

    <Link href={`/${locale}/${allId}`} className='w-full mx-auto flex justify-center items-center'>
          
          <div className="folder-style">

            <div className="folder-style-firts-div">

              <IoFolder size={40} className='text-yellow-500' />

            <span className="text-lg tracking-wide text-black">All</span>

            </div>


            <div className="flex flex-row items-center">

              <span className="mt-[2.495px]">{allNotes.length}</span>

              <MdKeyboardArrowRight size={25} />

            </div>

          </div>

          </Link>

          <div className="w-[70%] border border-black/10"></div>

    </>

        {folders.length > 0 && folders.map((folder: Folder, index: number) => {

          const notesByListId = allNotes.filter((note: any) => note.listId === folder.id);

          return (
          <FolderItem key={folder.name} folder={folder} index={index} folders={folders}
          folderNotesLength={notesByListId.length}
          />
        )})}
      </div>

      {/* <Categories /> */}
      {/* <NotesArea email={email} /> */}
      {/* <DropDown user={user} /> */}
      {/* <Toaster
        containerStyle={{
          fontSize: '20px',
        }}
      /> */}
    </div>
  )
}

export default AppAppLists