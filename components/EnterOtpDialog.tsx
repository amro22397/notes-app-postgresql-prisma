"use client";

import React, { useContext, useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { User } from "@/types/user";
import { Button } from "./ui/button";
import axios from "axios";
import { SingleNoteType } from "@/types/singleNote";
import { AppContext, AppContextType } from "@/context/AppContext";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const EnterOtpDialog = ({
  openOTPDialog,
  setOpenOTPDialog,
  user,
  // noteSelected,
  singleNote,
}: {
  openOTPDialog: boolean | undefined;
  setOpenOTPDialog: ((value: boolean) => void) | undefined | null | any;
  user: User;
  // noteSelected: SingleNoteType;
  singleNote: SingleNoteType;
}) => {
  const [lockPasswordOTPvalue, setLockPasswordOTPvalue] = useState("");

  const [unLockingNoteLoading, setUnLockingNoteLoading] = useState(false);

  console.log(singleNote);

  const { getNotesFromMongoDB, getPinnedNotesFromMongoDB, noteSelectedObject } =
    useContext(AppContext) as AppContextType;

  const {
    // setNoteSelected,
    noteSelected,
  } = noteSelectedObject;

  const handleOpenLockedNote = async () => {
    setUnLockingNoteLoading(true);

    try {
      console.log(lockPasswordOTPvalue);

      if (!user?.lockedPassword) {
        const res = await axios.put(
          `/api/user/lock-note?id=${noteSelected.id}`,
          {
            lockedPassword: lockPasswordOTPvalue,
            email: user?.email,
          }
        );

        getNotesFromMongoDB();
        getPinnedNotesFromMongoDB();
        // window.location.reload();

        if (res.data.success) {
          toast.success(res.data.message);
        }

        if (!res.data.success) {
          toast.error(res.data.message);
        }

        setUnLockingNoteLoading(false);
        setOpenOTPDialog(false);
      } else {
        const res = await axios.post(
          `/api/user/lock-note?id=${noteSelected.id}`,
          {
            lockedPassword: lockPasswordOTPvalue,
            email: user?.email,
          }
        );

        localStorage.setItem(
          "unlockSession",
          JSON.stringify({
            noteId: noteSelected?.id,
            unlockTime: Date.now(),
            duration: 1 * 60 * 1000, // 1 hour
          })
        );

        getNotesFromMongoDB();
        getPinnedNotesFromMongoDB();

        if (res.data.success) {
          toast.success(res.data.message);
        }

        if (!res.data.success) {
          toast.error(res.data.message);
        }

        setUnLockingNoteLoading(false);
        setOpenOTPDialog(false);
      }
    } catch (error) {
      toast.error(`Client Error open locked note: ${error}`);

      console.log(`Client Error open locked note: ${error}`);

      setUnLockingNoteLoading(false);
      setOpenOTPDialog(false);
    }
  };

  const handleTimeOutToClose = async (e: any) => {
    e.preventDefault();

    localStorage.setItem("startTime", Date.now().toString());

    localStorage.setItem("noteSelectedId", noteSelected.id);

    setTimeout(
      async () => {
        // if (noteSelected.isLocked === false) {

        try {
          const res = await axios.put(
            `/api/user/lock-note-timeout?id=${noteSelected.id}`,
            {
              lockedPassword: lockPasswordOTPvalue,
              email: user?.email,
            }
          );

          getNotesFromMongoDB();
          getPinnedNotesFromMongoDB();

          // if (res.data.success) {
          //     toast.success
          // }

          if (!res.data.success) {
            toast.error(res.data.message);
          }
        } catch (error) {
          toast.error(`Client Error locking locked note: ${error}`);

          console.log(`Client Error locking locked note: ${error}`);
        }

        // }
      },
      60 * 60 * 1000
    );
  };

  const handleTimeOutToCloseOnEveryMount = async () => {
    // e.preventDefault();

    // const noteSelectedId = localStorage.getItem("noteSelectedId");

    const noteSelectedId = localStorage.getItem("noteSelectedId");

    // if (singleNote.isLocked === false) {
    try {
      const res = await axios.put(
        `/api/user/lock-note-timeout?id=${noteSelectedId}`,
        {
          lockedPassword: lockPasswordOTPvalue,
          email: user?.email,
        }
      );

      getNotesFromMongoDB();
      getPinnedNotesFromMongoDB();

      // if (res.data.success) {
      //     toast.success
      // }

      if (!res.data.success) {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(`Client Error locking locked note: ${error}`);

      console.log(`Client Error locking locked note: ${error}`);
    }
    // }
  };

  console.log(handleTimeOutToCloseOnEveryMount)

  //   const tamer = "ali";

  // useEffect(() => {
  //   const session = localStorage.getItem("unlockSession");
  //   if (!session) return;

  //   const { noteId, unlockTime, duration } = JSON.parse(session);

  //   if (Date.now() < unlockTime + duration) return;

  //   (async () => {
  //   try {
  //     const res = await axios.put(
  //       `/api/user/lock-note-timeout?id=${noteId}`,
  //       {
  //         lockedPassword: lockPasswordOTPvalue,
  //         email: user?.email,
  //       }
  //     );

  //     getNotesFromMongoDB();
  //     getPinnedNotesFromMongoDB();

  //     if (!res.data.success) toast.error(res.data.message);

  //     // Cleanup
  //     localStorage.removeItem("unlockSession");
  //   } catch (error) {
  //     toast.error(`Client Error locking note: ${error}`);
  //   }
  // })();

  //   // const start = Number(localStorage.getItem("startTime"));

  //   // if (Date.now() - start >= 1 * 60 * 1000) {
  //   //   const noteSelectedId = localStorage.getItem("noteSelectedId");
  //   //   if (!noteSelectedId || noteSelectedId === "") return;
  //   //   handleTimeOutToCloseOnEveryMount();
  //   //   localStorage.setItem("noteSelectedId", "");
  //   // }
  // }, []);

  return (
    <Dialog
      open={openOTPDialog}
      onOpenChange={() => {
        setOpenOTPDialog(!openOTPDialog);
        setLockPasswordOTPvalue("");
      }}
    >
      {/* <DialogTrigger>Open</DialogTrigger> */}
      {/* <pre className="">{JSON.stringify(user, null, 2)}</pre> */}
      <DialogContent>
        {/* <pre className="">{JSON.stringify(noteSelected, null, 2)}</pre> */}
        {/* {noteSelectedId} */}
        <DialogHeader className="flex flex-col gap-5">
          <DialogTitle>Enter Lock OTP</DialogTitle>
          <DialogDescription>
            <InputOTP
              maxLength={6}
              onChange={(e) => {
                setLockPasswordOTPvalue(e);
                console.log(lockPasswordOTPvalue);
              }}
            >
              <InputOTPGroup className="bg-gray-300/95 rounded-md">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup className="bg-gray-300/95 rounded-md">
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot
                  index={5}
                  // onval={() => {
                  //   setIsLockPasswordCard(false);
                  //   handleChangleLockPassword();
                  // }}
                />
              </InputOTPGroup>
            </InputOTP>

            <DialogFooter>
              <Button
                onClick={(e: any) => {
                  //   setOpenOTPDialog(false);
                  handleOpenLockedNote();
                  //   if (!noteSelected) {

                  //   }

                  handleTimeOutToClose(e);
                  // LockNoteFx();
                }}
              >
                {unLockingNoteLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Enter"
                )}
              </Button>
            </DialogFooter>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EnterOtpDialog;
