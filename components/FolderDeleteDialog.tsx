'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { useLocale } from "next-intl"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
// import { Button } from "@/components/ui/button"
import { IoTrashSharp } from "react-icons/io5"


const FolderDeleteDialog = ({ folderId, getFolderById }: {
    folderId: string | null | undefined,
    getFolderById?: (() => void) | undefined,
    // getFolders: () => void
}) => {

    const locale = useLocale();
    const router = useRouter();

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const [deleteFolderLoading, setDeleteFolderLoading] = useState(false);


    const handleDeleteFolder = async (e: any) => {
        
        e.preventDefault();

        setDeleteFolderLoading(true)

        try {
            
            const res = await axios.delete(`/api/lists?id=${folderId}`);

            if (!res.data.success) {
                toast.error(res.data.message);
                setDeleteDialogOpen(false);
            }

            if (res.data.success) {
                toast.success(res.data.message);
                // getFolders();
                getFolderById?.();
                setDeleteDialogOpen(false);
                router.push(`/${locale}/`)
            }

            setDeleteFolderLoading(false);


        } catch (error) {
            
            console.log(`Client error deleting folder: ${error}`)

            toast.error(`Client error deleting folder: ${error}`)

            setDeleteDialogOpen(false);
            setDeleteFolderLoading(false);
        }
    }


  return (
    <AlertDialog open={deleteDialogOpen} 
    onOpenChange={() => setDeleteDialogOpen(!deleteDialogOpen)}
    >

      <AlertDialogTrigger asChild>
        <IoTrashSharp size={21} className="text-red-600 hover:text-red-600/90 active:scale-95"
        onClick={() => setDeleteDialogOpen(true)}
        />
      </AlertDialogTrigger>



      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you are going to delete this folder?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            folder.
          </AlertDialogDescription>
        </AlertDialogHeader>


        <AlertDialogFooter>

          <AlertDialogCancel
          onClick={() => setDeleteDialogOpen(false)}
          >Cancel</AlertDialogCancel>



          <AlertDialogAction
          onClick={handleDeleteFolder}
          >
            {deleteFolderLoading ? <Loader2 className='animate-spin' /> : "Continue"}
          </AlertDialogAction>

        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default FolderDeleteDialog