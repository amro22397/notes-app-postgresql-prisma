"use client";

import React, { useState, useRef, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
// import { useGlobalProvider } from '../ContextApi';
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { AppContext, AppContextType } from "@/context/AppContext";
import axios from "axios";

import { MdKeyboardArrowLeft } from "react-icons/md";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useRouter, useSearchParams } from "next/navigation";

const NoteWindow = ({ singleNote }: { singleNote: any }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  console.log(id);

  const removeAllQueries = () => {
    router.push(window.location.pathname, { scroll: false });
  };

  const {
    openWindowNote,
    setOpenWindowNote,
    notesObject,
    noteSelectedObject,
    initialNotesObject,
    setClickedCategory,
    dropDownToogle,
    dropDownPositionsObject,
    getNotesFromMongoDB,
    getPinnedNotesFromMongoDB,
  } = useContext(AppContext) as AppContextType;

  const { allNotes, setAllNotes } = notesObject;
  const { initialAllNotes, setInitialAllNotes } = initialNotesObject;
  const { noteSelected, setNoteSelected } = noteSelectedObject;
  const { openDropDown, setOpenDropDown } = dropDownToogle;
  const { setDropDownPositions } = dropDownPositionsObject;

  const [tags, setTags] = useState(["study", "projects"]);

  const [isLoading, setIsLoading] = useState(false);

  // const [singleNote, setSingleNote] = useState<any>(null);

  console.log(singleNote);

  const [textInputs, setTextInputs] = useState({
    noteTitle: "",
    noteContent: "",
  });

  async function addNewNoteToDB() {
    try {
      setIsLoading(true);

      const res = await axios.post("/api/notes", {
        noteName: textInputs.noteTitle,
        noteContent: textInputs.noteContent,
        categories: tags,
      });

      const newNoteData = res.data;

      getNotesFromMongoDB();
      getPinnedNotesFromMongoDB();

      toast.success("Note is created successfully.");
      setAllNotes([...allNotes, newNoteData]);
      setInitialAllNotes([...initialAllNotes, newNoteData]);
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }

    if (isLoading === false) {
      setOpenWindowNote(false);
    }
  }

  const noteInputRef = useRef<any>(null);

  useEffect(() => {
    if (openWindowNote) {
      setTimeout(() => {
        noteInputRef.current?.focus();
      }, 200);
    }

    if (openWindowNote) {
      if (noteSelected === null) {
        setTextInputs({
          noteTitle: "",
          noteContent: "",
        });
        setTags([]);
      } else {
        setTextInputs({
          noteTitle: singleNote?.noteName,
          noteContent: singleNote?.noteContent,
        });
        setTags(noteSelected.categories);
      }
    }
  }, [openWindowNote]);

  async function updateNoteToDB() {
    try {
      setIsLoading(true);

      const res = await axios.put(`/api/notes?id=${singleNote._id}`, {
        newTitle: textInputs.noteTitle,
        newContent: textInputs.noteContent,
        newCategories: tags,
      });

      // if (res.data) {
      //   const updateNotesArray = ({
      //     prevState,
      //     textInputs,
      //     tags,
      //   }: {
      //     prevState: any;
      //     textInputs: any;
      //     tags: any;
      //   }) => {
      //     const tempArray = [...prevState];
      //     const findSelectedItemIndex = tempArray.findIndex(
      //       (note) => note._id === singleNote._id
      //     );

      //     tempArray[findSelectedItemIndex].noteName = textInputs?.noteTitle || "";
      //     tempArray[findSelectedItemIndex].noteContent = textInputs?.noteContent || '';
      //     tempArray[findSelectedItemIndex].categories = tags || [];

      //     return tempArray;
      //   };

      //   setAllNotes((prevState: any) =>
      //     updateNotesArray({ prevState, textInputs, tags })
      //   );

      //   setInitialAllNotes((prevState: any) =>
      //     updateNotesArray({ prevState, textInputs, tags })
      //   );

      // }

      getNotesFromMongoDB();
      getPinnedNotesFromMongoDB();

      toast.success("The note has been updated successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

    if (isLoading === false) {
      setOpenWindowNote(false);
    }
  }

  // const findNoteById = async (id: string | null) => {
  //   try {
  //     const res = await axios.get(`/api/notes/${id}`);

  //     console.log(res.data);

  //     setSingleNote(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   findNoteById(id);

  //   setTextInputs({
  //     ...textInputs,
  //     noteTitle: singleNote?.noteName || "",
  //     noteContent: singleNote?.noteContent || "",
  //   })

  // }, [id]);

  // useEffect(() => {

  //   console.log(singleNote)

  //     setTextInputs({
  //       ...textInputs,
  //       noteTitle: singleNote?.noteName || "",
  //       noteContent: singleNote?.noteContent || "",
  //     })

  //   }, [singleNote]);

  const submitSaveBtn = async () => {
    if (
      // textInputs.noteTitle.trim().length === 0 ||
      textInputs.noteContent.trim().length === 0
      // tags.length === 0
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    const newNote = {
      id: uuidv4(),
      noteName: textInputs.noteTitle,
      noteContent: textInputs.noteContent,
      dateCreation: new Date(),
      categories: tags,
    };

    if (noteSelected === null) {
      addNewNoteToDB();
      //   setAllNotes([...allNotes, newNote]);
      //   setInitialAllNotes([...initialAllNotes, newNote]);

      // toast.success('Note is created successfully');
      // setOpenWindowNote(false);
    } else {
      updateNoteToDB();
      // setAllNotes((prevState: any) => {
      //   const tempArray = [...prevState];
      //   const findSelectedItemIndex = tempArray.findIndex(
      //     (note) => note.noteName === noteSelected.noteName,
      //   );

      //   tempArray[findSelectedItemIndex].noteName = textInputs.noteTitle;
      //   tempArray[findSelectedItemIndex].noteContent = textInputs.noteContent;
      //   tempArray[findSelectedItemIndex].categories = tags;

      //   return tempArray;
      // });

      // setOpenWindowNote(false);
      // toast.success('The note has been updated successfully');
    }

    console.log(newNote);
  };

  function updateTextInputs(event: any) {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    setTextInputs((prevState) => ({
      ...prevState,
      [inputName]: inputValue,
    }));
  }

  console.log(textInputs.noteContent);

  function openDropDownFx(event: any, noteClicked: any) {
    if (event) {
      event.stopPropagation();
    }

    const xPosition = event.clientX;
    const yPosition = event.clientY;
    setDropDownPositions({ x: xPosition, y: yPosition });
    setOpenDropDown(true);
    setNoteSelected(noteClicked);
  }

  return (
    <div
      className={`poppins px-8 py-[19px] w-[700px] h-[700px] bg-white absolute left-0 top-0 z-50  rounded-md transition-all ${
        openWindowNote ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      {/* Modal Header */}
      <div className="flex flex-row poppins-bold justify-between items-center w-full">
        {/* <div className="text-xl text-black">{`${
          noteSelected ? 'Edit' : 'Add'
        } a note`}</div> */}

        <div
          className="flex flex-row justify-center items-center
        text-orange-600 active:scale-95 cursor-pointer hover:text-orange-600/95"
          onClick={() => {
            setNoteSelected(null);
            setOpenWindowNote(false);
            setNoteSelected(false);
            console.log(noteSelected);
            // removeAllQueries();
            getNotesFromMongoDB();
            getPinnedNotesFromMongoDB();
          }}
        >
          <MdKeyboardArrowLeft size={25} />

          <span className="mt-[0.725px] text-[20px] tracking-wide">Notes</span>
        </div>

        {/* <FontAwesomeIcon
          className="size-4 cursor-pointer text-red-500"
          onClick={() => {
            setNoteSelected(null);
            setOpenWindowNote(false);
            setNoteSelected(false);
          }}
          icon={faClose}
        /> */}

        <div className="flex flex-row items-center justify-center gap-3">
          {noteSelected !== null && (
            <div
            onClick={(event) => {
              openDropDownFx(event, singleNote);
            }}
            className="mt-[5.5px]"
          >
            <FontAwesomeIcon
              className="text-gray-500 select-none cursor-pointer
            text-2xl"
              icon={faEllipsis}
            />
          </div>
          )}

          <div className="">
            <button
              onClick={() => submitSaveBtn()}
              className="rounded text-[18px] tracking-wide
              text-orange-600 active:scale-95 cursor-pointer hover:text-orange-600/95"
            >
              {isLoading ? "Loading..." : "Save"}
            </button>
          </div>
        </div>
      </div>
      {/* Note input */}
      {/* <div className="mt-6">
        <label className="block text-[13px] font-medium text-gray-700">
          Note Title
        </label>

        <input
          type="text"
          value={textInputs.noteTitle}
          ref={noteInputRef}
          name="noteTitle"
          onChange={updateTextInputs}
          placeholder="Name Your Note..."
          className="mt-1 outline-none  w-full rounded-md p-3 text-[11px] border border-gray-300 text-black"
        />
      </div> */}

      {/* Content area */}
      <div className="mt-3 h-[calc(100vh-220px)]">
        {/* <label className="block text-[13px] font-medium text-gray-700">
          Note Content
        </label> */}
        <textarea
          placeholder="Add Your Content Here..."
          name="noteContent"
          defaultValue={noteSelected === null ? "" : textInputs.noteContent}
          onChange={updateTextInputs}
          className="px-3 py-4 outline-none rounded-md w-full resize-none h-full text-[15px] font-semibold
          tracking-wider
          text-black"
          style={{ fontFamily: "Arial" }}
        ></textarea>
        {/* Tags area */}
        {/* <div className="mt-2">
          <label className="block text-[13px] font-medium text-gray-700 mb-1">
            Categories
          </label>
          <InputTags tags={tags} setTags={setTags} />
        </div> */}
        {/* Save button */}
      </div>
    </div>
  );
};

export default NoteWindow;

function InputTags({ tags, setTags }: any) {
  const inputRef = useRef<any>(null);

  const addTags = (e: any) => {
    if (
      e.key === "Enter" &&
      e.target.value !== "" &&
      tags.length < 4 &&
      tags.indexOf(e.target.value) === -1
    ) {
      setTags([...tags, e.target.value]);
      e.target.value = "";
    }
  };

  const removeTags = (index: number) => {
    setTags([...tags.filter((tag: any) => tags.indexOf(tag) !== index)]);
    inputRef.current?.focus();
  };

  return (
    <div className="border text-[11px] overflow-auto flex flex-wrap gap-2 w-full h-12 rounded-md border-gray-300 p-2 relative">
      <ul className="flex flex-wrap gap-2 items-center ">
        {tags?.map((tag: any, index: number) => (
          <li
            key={index}
            className="bg-red-500 px-3 p-1 flex gap-1 items-center justify-center text-white rounded-md"
          >
            <div className="text-[12px]">{tag}</div>
            <div>
              <FontAwesomeIcon
                className="text-sm cursor-pointer w-2 h-2 mt-[2px] bg-white text-red-500 p-1 rounded-full"
                icon={faClose}
                onClick={() => removeTags(index)}
              />
            </div>
          </li>
        ))}
      </ul>

      {tags?.length < 4 && (
        <input
          ref={inputRef}
          type="text"
          onKeyUp={(event) => addTags(event)}
          className="outline-none text-black"
          placeholder="add a new category"
        />
      )}
    </div>
  );
}
