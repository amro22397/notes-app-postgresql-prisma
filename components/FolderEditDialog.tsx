"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  //   DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";


const FolderEditDialog = ({ folderId, folderNameInput, getFolderById }: {
    folderId: string | null | undefined,
    folderNameInput: string | null | undefined,
    getFolderById?: () => void
}) => {

    const [editFolderDialogOpen, setEditFolderDialogOpen] = useState(false);

  const [folderName, setFolderName] = useState('');

  const [editFolderLoading, setEditFolderLoading] = useState(false);

  const handleAddFolder = async (e: any) => {
    e.preventDefault();

    setEditFolderLoading(true);

    try {
      const res = await axios.put("/api/lists", {
        id: folderId,
        name: folderName,
      });

      if (!res.data.success) {
        toast.error(res.data.message);
        setEditFolderDialogOpen(false);
      }

      if (res.data.success) {
        toast.success(res.data.message);
        getFolderById?.();
        setEditFolderDialogOpen(false);
      }

      setEditFolderLoading(false);
    } catch (error) {
      console.log(`Client error adding folder: ${error}`);

      toast.error(`Client error adding folder: ${error}`);

      setEditFolderDialogOpen(false);
      setEditFolderLoading(false);
    }
  };


  return (
    <Dialog
      open={editFolderDialogOpen}
      onOpenChange={() => {
        setEditFolderDialogOpen(!editFolderDialogOpen);
        setFolderName('');
      }}
    >
      <form>
        <DialogTrigger asChild>
          <FaRegEdit size={20} className="text-green-600 hover:text-green-600/90 active:scale-95" 
          onClick={() => {
            setEditFolderDialogOpen(true);
          }}
          />
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit folder</DialogTitle>

            {/* <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription> */}
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="folder-name-1">Name</Label>
              <Input
                id="folder-name-1"
                name="folder-name-1"
                defaultValue={folderNameInput}
                onChange={(e: any) => setFolderName(e.target.value)}
              />
            </div>

            {/* <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </div> */}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                onClick={() => setEditFolderDialogOpen(false)}
              >
                Cancel
              </Button>
            </DialogClose>

            <Button onClick={handleAddFolder}>
              {editFolderLoading ? <Loader2 className="animate-spin" /> : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
        <div>
        {/* <Toaster  /> */}
      </div>
      </form>
      
    </Dialog>
  )
}

export default FolderEditDialog