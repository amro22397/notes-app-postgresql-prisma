"use client";

import { AppContext, AppContextType } from "@/context/AppContext";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
// import { useGlobalProvider } from '../ContextApi';
import React, { useContext, useEffect, useRef } from "react";
import toast from "react-hot-toast";

import { Pin, PinOff } from "lucide-react";
import { usePathname } from "next/navigation";

const DropDwon = () => {
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

  const dropDownRef = useRef<any>(null);

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

  async function deleteNoteFx() {
    try {
      const res = await axios.delete(`/api/notes?id=${noteSelected._id}`);

      if (res.data.success) {
        const filterAllNotes = allNotes.filter(
          (note: any) => note._id !== noteSelected._id
        );

        const filterInitialNotes = initialAllNotes.filter(
          (note: any) => note._id !== noteSelected._id
        );

        setAllNotes(filterAllNotes);
        setInitialAllNotes(filterInitialNotes);

        if (filterAllNotes.length === 0) {
          setClickedCategory(null);
        }

        getNotesFromMongoDB();
    getPinnedNotesFromMongoDB()

        toast.success("The note has been deleted successfully");
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
        `/api/notes/pin-note?id=${noteSelected._id}&noteSelected=${noteSelected}`
      );

      console.log(res.data);

      getNotesFromMongoDB();
    getPinnedNotesFromMongoDB()
    
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
poppins poppins-light text-[10px] ${!openWindowNote && "fixed"}
${
  // openDropDown ? 'visible opacity-100' : 'invisible'
  openWindowNote && "absolute right-8 top-12 z-50"
}
 `}
        >
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
border-none
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
        </div>
      )}
    </>
  );
};

export default DropDwon;
