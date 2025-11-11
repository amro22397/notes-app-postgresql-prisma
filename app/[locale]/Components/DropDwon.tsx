"use client";

import { AppContext, AppContextType } from "@/context/AppContext";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
// import { useGlobalProvider } from '../ContextApi';
import React, { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { Lock, Pin, PinOff, Unlock } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Session } from "@/types/session";
import { MdDriveFileMoveRtl } from "react-icons/md";
import { useLocale } from "next-intl";



const DropDwon = ({ user, folderId }: {
  user: Session | null | undefined,
  folderId?: string | null | undefined
}) => {
  const pathname = usePathname();
  console.log(pathname);

  const {
    dropDownToogle,
    dropDownPositionsObject,
    noteSelectedObject,
    notesObject,
    openWindowNote,
    setOpenWindowNote,
    initialNotesObject,
    clickedCategory,
    setClickedCategory,
    getNotesFromMongoDB,
    getPinnedNotesFromMongoDB,
  } = useContext(AppContext) as AppContextType;

  const { openDropDown, setOpenDropDown } = dropDownToogle;

  console.log(openDropDown);

  const { dropDownPositions } = dropDownPositionsObject;
  const { setNoteSelected, noteSelected } = noteSelectedObject;
  const { allNotes, setAllNotes } = notesObject;
  const { initialAllNotes, setInitialAllNotes } = initialNotesObject;

  const [isLockPasswordCard, setIsLockPasswordCard] = useState(false);
  const [lockPasswordOTPvalue, setLockPasswordOTPvalue] = useState("");

  console.log(lockPasswordOTPvalue)

  const dropDownRef = useRef<any>(null);

  const router = useRouter();
  const locale = useLocale();

  const menuItems = [
    // { name: "Modify", icon: faPencil },
    {
      name: "Delete",
      icon: <FontAwesomeIcon className="size-4" icon={faTrash} />,
    },

    {
      name: "Pin Note",
      icon: <Pin size={19} />,
    },

    {
      name: "Unpin Note",
      icon: <PinOff size={19} />,
    },
  ];

  //ss

  async function deleteNoteFx() {
    try {
      const res = await axios.delete(`/api/notes?id=${noteSelected.id}`);

      if (res.data.success) {

        toast.success("The note has been deleted successfully");

        getNotesFromMongoDB();
        getPinnedNotesFromMongoDB();

        const filterAllNotes = allNotes.filter(
          (note: any) => note.id !== noteSelected.id
        );

        const filterInitialNotes = initialAllNotes.filter(
          (note: any) => note.id !== noteSelected.id
        );

        setAllNotes(filterAllNotes);
        setInitialAllNotes(filterInitialNotes);

        if (filterAllNotes.length === 0) {
          setClickedCategory(null);
        }
        
        setNoteSelected(null);
        setOpenWindowNote(false);
      }
    } catch (error: any) {
      toast.error("Error: " + error.message);
    }
    // const filterAllNotes = allNotes.filter(
    //     (note: any) => note.id !== noteSelected.id,
    // );

    // const filterInitialNotes = initialAllNotes.filter(
    //   (note: any) => note.id !== noteSelected.id,
    // );

    // setAllNotes(filterAllNotes);
    // setInitialAllNotes(filterInitialNotes);

    // if (filterAllNotes.length === 0) {
    //   setClickedCategory(null);
    // }

    // toast.success("The note has been deleted successfully");
    // setNoteSelected(null);
  }

  const updatePinNoteFx = async () => {
    try {
      const res = await axios.put(
        `/api/notes/pin-note?id=${noteSelected.id}&noteSelected=${noteSelected}`
      );

      console.log(res.data);

      getNotesFromMongoDB();
      getPinnedNotesFromMongoDB();

      if (res.data.success) {
        toast.success(res.data.message);
      }

      if (!res.data.success) {
        toast.error(res.data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  const LockNoteFx = async () => {

    try {
      const res = await axios.put(`/api/user/lock-note?id=${noteSelected.id}`, {
        lockedPassword: lockPasswordOTPvalue,
        email: user?.email,
      });

      console.log(res.data);

      getNotesFromMongoDB();
      getPinnedNotesFromMongoDB();
      // window.location.reload();

      if (res.data.success) {
        toast.success(res.data.message);
      }

      if (!res.data.success) {
        toast.error(res.data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  console.log(lockPasswordOTPvalue)

  console.log(user)


  const handleChangleLockPassword = async () => {
    
    try {

      console.log(lockPasswordOTPvalue)
      
      if (!user?.lockedPassword) {
        const res = await axios.put(`/api/user/lock-note?id=${noteSelected.id}`, {
          lockedPassword: lockPasswordOTPvalue,
          email: user?.email,
        })

        getNotesFromMongoDB();
      getPinnedNotesFromMongoDB();
      // window.location.reload();

        if (res.data.success) {
          toast.success(res.data.message)
        }
  
        if (!res.data.success) {
          toast.error(res.data.message)
        }

      } else {

        const res = await axios.post(`/api/user/lock-note?id=${noteSelected.id}`, {
          lockedPassword: lockPasswordOTPvalue,
          email: user?.email,
        })

        getNotesFromMongoDB();
      getPinnedNotesFromMongoDB();

        if (res.data.success) {
          toast.success(res.data.message)
        }
  
        if (!res.data.success) {
          toast.error(res.data.message)
        }

      }

      

    } catch (error: any) {
      toast.error(`ClientError: ${error.message}`)
    }

  }

  function handleDeleteClicked() {
    setOpenDropDown(false);
    toast(
      (t) => (
        <div className="flex flex-col gap-4 w-full">
          <div className="text-[22px] font-semibold">
            Do you really want to delete this note?
          </div>
          <div className="w-full flex gap-3 justify-center">
            <button
              onClick={() => {
                deleteNoteFx();
                toast.dismiss(t.id);
              }}
              className="bg-red-600 text-white  p-1 w-[100px] rounded-md
                text-[20px] font-semibold
              "
            >
              Yes
            </button>
            <button
              className="bg-white text-red-500 p-1 w-[100px] border  border-red-500 
                rounded-md hover:text-white hover:bg-red-500
                text-[20px] font-semibold"
              onClick={() => {
                toast.dismiss(t.id);
                setNoteSelected(null);
              }}
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        duration: "10000",
        id: "deleteNote",
      }
    );

    // if (menuItemClicked.name === "Delete") {

    // } else if (menuItemClicked.name === "Pin Note") {
    //   setOpenDropDown(false);

    //   updatePinNoteFx();
    // }
  }



  const handleMoveNoteFx = async () => {
    
    setOpenDropDown(false);

    router.push(`/${locale}/move-note/${noteSelected?.id}?folderId=${folderId}`);

    
  }



  useEffect(() => {
    function handleOutsideClick(event: any) {
      if (
        openDropDown &&
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target)
      ) {
        setNoteSelected(null);
        setOpenDropDown(false);
      }
    }

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [openDropDown]);

  return (
    <>
      {openDropDown && (
        <div
          ref={dropDownRef}
          style={
            !openWindowNote
              ? { left: dropDownPositions.x, top: dropDownPositions.y }
              : {}
          }
          className={`py-2 px-2 shadow-md flex rounded-lg flex-col gap-3 bg-white 
poppins poppins-light text-[10px] ${!openWindowNote && "fixed z-40"}
${
  // openDropDown ? 'visible opacity-100' : 'invisible'
  openWindowNote && "absolute right-8 top-12 z-50"
}
 `}
        >

          {/* <pre className="">{JSON.stringify(noteSelected, null, 2)}</pre> */}
          <div
            className={`flex gap-2 items-center
select-none cursor-pointer hover:text-gray-900 text-[15px] border-b border-gray-400/95 pb-[6px]
${/* index === menuItems.length - 1 && "border-none" */ ""}
`}
            onClick={() => {
              handleDeleteClicked();
            }}
          >
            <FontAwesomeIcon className="size-4" icon={faTrash} />
            <div className=" ">Delete</div>
          </div>


          <div
            className={`flex gap-2 items-center
select-none cursor-pointer hover:text-gray-900 text-[15px] border-b
 border-gray-400/95 pb-[6px]
${/* index === menuItems.length - 1 && "border-none" */ ""}
`}
            onClick={() => {
              // handleDeleteClicked();
              handleMoveNoteFx()
            }}
          >
            <MdDriveFileMoveRtl size={20} />

            <div className=" ">Move Note</div>
          </div>



          {!noteSelected?.isPinned && (
            <div
              className={`flex gap-2 items-center
select-none cursor-pointer hover:text-gray-900 text-[15px] border-b border-gray-400/95 pb-[6px]
${/* index === menuItems.length - 1 && "border-none" */ ""}
`}
              onClick={() => {
                setOpenDropDown(false);

                updatePinNoteFx();
              }}
            >
              <Pin size={19} />
              <div className=" ">Pin Note</div>
            </div>
          )}

          {noteSelected?.isPinned && (
            <div
              className={`flex gap-2 items-center
select-none cursor-pointer hover:text-gray-900 text-[15px] border-b border-gray-400/95 pb-[6px]
`}
              onClick={() => {
                setOpenDropDown(false);

                updatePinNoteFx();
              }}
            >
              <PinOff size={19} />
              <div className=" ">Unpin Note</div>
            </div>
          )}

          {!noteSelected?.isLocked && (
            <div
              className={`flex gap-2 items-center
select-none cursor-pointer hover:text-gray-900 text-[15px] border-b border-gray-400/95 pb-[6px]
border-none
${/* index === menuItems.length - 1 && "border-none" */ ""}
`}
              onClick={() => {
                setOpenDropDown(false);

                if (!user?.lockedPassword) {
                  setIsLockPasswordCard(true);
            
                  return;
                }

                if (user?.lockedPassword) {
                  LockNoteFx();
                }
              }}
            >
              <Lock size={19} />
              <div className=" ">Lock Note</div>
              {/* {JSON.stringify(user, null, 2)} */}
            </div>
          )}

          {noteSelected?.isLocked && (
            <div
              className={`flex gap-2 items-center
select-none cursor-pointer hover:text-gray-900 text-[15px] border-b border-gray-400/95 pb-[6px]
border-none
`}
              onClick={() => {
                setOpenDropDown(false);

                if (user?.lockedPassword) {
                  setIsLockPasswordCard(true);
            
                  return;
                }

              }}
            >
              <Unlock size={19} />
              <div className=" ">Unlock Note</div>
            </div>
          )}
        </div>
      )}

      {/* setIsLockPassword */}
      <Dialog open={isLockPasswordCard} onOpenChange={() => setIsLockPasswordCard(!isLockPasswordCard)}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent>
          <DialogHeader className="flex flex-col gap-5">
            <DialogTitle>
              {!user?.lockedPassword ? 'Set Lock OTP' : 'Enter Lock OTP'}
            </DialogTitle>
            <DialogDescription>


              <InputOTP maxLength={6} onChange={(e) => {
                setLockPasswordOTPvalue(e);
                console.log(lockPasswordOTPvalue)
              }}>
                <InputOTPGroup className="bg-gray-300/95 rounded-md">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup className="bg-gray-300/95 rounded-md">
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5}
                  // onval={() => {
                  //   setIsLockPasswordCard(false);
                  //   handleChangleLockPassword();
                  // }} 
                  />
                </InputOTPGroup>
              </InputOTP>


              <DialogFooter >
                <Button 
                onClick={() => {
                  setIsLockPasswordCard(false);
                  handleChangleLockPassword();

                  // LockNoteFx();
                }}
                >
                  Save
                </Button>
              </DialogFooter>

            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DropDwon;
