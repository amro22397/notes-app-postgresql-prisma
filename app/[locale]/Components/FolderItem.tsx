'use client'

import { Folder } from '@/types/folder'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import React from 'react'
import { IoFolder } from 'react-icons/io5'
import { MdKeyboardArrowRight } from 'react-icons/md'

const FolderItem = ({ folder, index, folders, folderNotesLength }: {
    folder: Folder,
    index: number,
    folders: Folder[],
    folderNotesLength: number
}) => {

    const locale = useLocale();

  return (
    <>

    <Link href={`/${locale}/${folder.id}`} className='w-full mx-auto flex justify-center items-center'>
          
          <div key={folder.name} className="folder-style">

            <div className="folder-style-firts-div">

              <IoFolder size={40} className='text-yellow-500' />

            <span className="text-lg tracking-wide text-black">{folder.name}</span>

            </div>


            <div className="flex flex-row items-center">

              <span className="mt-[2.495px]">{folderNotesLength}</span>

              <MdKeyboardArrowRight size={25} />

            </div>

          </div>

          </Link>

          {index !== folders.length - 1 && (
            <div className="w-[70%] border border-black/10"></div>
          )}

    </>

  )
}

export default FolderItem