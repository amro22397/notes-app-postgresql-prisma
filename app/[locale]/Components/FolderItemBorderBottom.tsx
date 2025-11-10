import { Folder } from '@/types/folder'
import React from 'react'

const FolderItemBorderBottom = ({ index, folders }: {
    index: number,
    folders: Folder[]
}) => {
  return (
    <>
    {index !== folders.length - 1 && (
        <div className="w-[70%] border border-black/10"></div>
      )}
    </>
  )
}

export default FolderItemBorderBottom