import { Folder } from '@/types/folder'
import React from 'react'
import { IoFolder } from 'react-icons/io5'
import { MdKeyboardArrowRight } from 'react-icons/md'

const FolderItemInsideLink = ({ folder , folderNotesLength }: {
    folder: Folder,
    folderNotesLength: number
}) => {
  return (
    <div key={folder.name} className="folder-style">
          <div className="folder-style-firts-div">
            <IoFolder size={40} className="text-yellow-500" />

            <span className="text-lg tracking-wide text-black max-sm:w-[175px]">
              {folder.name}
            </span>
          </div>

          <div className="flex flex-row items-center">
            <span className="mt-[2.495px]">{folderNotesLength}</span>

            <MdKeyboardArrowRight size={25} />
          </div>
        </div>
  )
}

export default FolderItemInsideLink