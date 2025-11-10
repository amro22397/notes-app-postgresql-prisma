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

const AddFolderComponent = ({
  isAddList,
  email,
  getFolders
}: {
  isAddList: boolean;
  email: string | null | undefined;
  getFolders?: () => void
}) => {
  const [addFolderDialogOpen, setAddFolderDialogOpen] = useState(false);

  const [folderName, setFolderName] = useState("New folder");

  const [addFolderLoading, setAddFolderLoading] = useState(false);

  const handleAddFolder = async (e: any) => {
    e.preventDefault();

    setAddFolderLoading(true);

    try {
      const res = await axios.post("/api/lists", {
        name: folderName,
        emailRef: email,
      });

      if (!res.data.success) {
        toast.error(res.data.message);
        setAddFolderDialogOpen(false);
      }

      if (res.data.success) {
        toast.success(res.data.message);
        getFolders?.();
        setAddFolderDialogOpen(false);
      }

      setAddFolderLoading(false);
    } catch (error) {
      console.log(`Client error adding folder: ${error}`);

      toast.error(`Client error adding folder: ${error}`);

      setAddFolderDialogOpen(false);
      setAddFolderLoading(false);
    }
  };

  return (
    <Dialog
      open={addFolderDialogOpen}
      onOpenChange={() => {
        setAddFolderDialogOpen(!addFolderDialogOpen);
        setFolderName("New folder");
      }}
    >
      <form>
        <DialogTrigger asChild>
          {isAddList && (
            <button
              onClick={() => {
                setAddFolderDialogOpen(true);
                // openWindowNoteFunction();
                // console.log(noteSelected)
              }}
              className="px-3 py-1 rounded border border-amber-700/90 text-[22.5px] text-amber-700/90 hover:bg-amber-700/90
        cursor-pointer hover:text-white"
            >
              Add folder
            </button>
          )}
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add folder</DialogTitle>

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
                defaultValue="New folder"
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
                onClick={() => setAddFolderDialogOpen(false)}
              >
                Cancel
              </Button>
            </DialogClose>

            <Button onClick={handleAddFolder}>
              {addFolderLoading ? <Loader2 className="animate-spin" /> : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
        <div>
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
      </form>
      
    </Dialog>
  );
};

export default AddFolderComponent;
