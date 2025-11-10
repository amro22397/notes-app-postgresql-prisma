'use client'

import React, { useContext, useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { IoSearch } from "react-icons/io5";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AppContext, AppContextType } from '@/context/AppContext';



const SearchBar = ({ isAddList, isMoveNoteId, folderId }: {
  isAddList?: boolean,
  isMoveNoteId?: boolean,
  folderId?: string | null | undefined
}) => {

  console.log(isAddList)

  const searchParams = useSearchParams() as any;
  const router = useRouter();

  const pathname = usePathname() as any;

  const [searchTerm, setSearchTerm] = useState("");

  const { 
  // getNotesFromMongoDB,
  //   getPinnedNotesFromMongoDB
  } = useContext(AppContext) as AppContextType;

  const handleSearchFx = () => {

    const url = new URLSearchParams(searchParams.toString());

    

    if (searchTerm.trim() === "") {
      router.push(`${folderId ? `${pathname}?folderId=${folderId}` : pathname}`, { scroll: false })
      return;
    }

    url.set("searchTerm", searchTerm);

    router.push(`${pathname}?${url.toString()}`, { scroll: false })

  }

  useEffect(() => {
    if (searchTerm.trim() === "" && !isMoveNoteId) {
      router.push(pathname, { scroll: false })
      return;
    }
  }, []);

  return (
    <div className='sm:w-lg w-[95%] px-4 bg-zinc-300/80 rounded-full mx-auto
    flex flex-row items-center justify-center gap-2'>
      <input type="text" className="w-full py-[7.25px] focus:outline-none text-black
      font-semibold tracking-wider text-[17.5px]"
      onChange={(e: any) => {
        setSearchTerm(e.target.value);
        // handleSearchFx();
      }} 
      onKeyUp={(e: any) => {
        e.key === "Enter" && handleSearchFx();
      }}
      />

      <IoSearch size={25} className='text-black/70 hover:text-gray-900/70 active:scale-95 cursor-pointer'
      onClick={() => {
        handleSearchFx();
      }} />

      {/* {pathname} */}
    </div>
  )
}

export default SearchBar
