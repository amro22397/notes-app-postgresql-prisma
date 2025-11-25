import React from 'react'
import FolderEditDialog from './FolderEditDialog'
import FolderDeleteDialog from './FolderDeleteDialog'

const FolderName = ({ folderName, folderId, getFolderById, paramsId }: {
    folderName?: string | null | undefined,
    folderId: string | null | undefined,
    getFolderById?: () => void,
    paramsId?: string | null | undefined
}) => {
  return (
    <div className={`flex flex-row items-center gap-4  ${paramsId ? "md:hidden" : "max-md:hidden"}`}>

          <span className={`text-black text-lg tracking-wide
          ${folderName?.split(" ")?.length >= 3 && "w-[175px]"}`}>{folderName}</span>


          <div className="flex flex-row items-center gap-1">
            
            <FolderEditDialog folderId={folderId} folderNameInput={folderName} getFolderById={getFolderById} />

            <FolderDeleteDialog folderId={folderId} getFolderById={getFolderById} />
          </div>

        </div>
  )
}

export default FolderName