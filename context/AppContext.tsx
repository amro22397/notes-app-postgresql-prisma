"use client";

import { createContext,useEffect, useRef, useState } from "react";
// import notesData from "../app/[locale]/NotesData";

import axios from "axios";
import { SingleNoteType } from "@/types/singleNote";
import { useParams, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { textInputs } from "@/types/textInputs";

// should declare here the type of the things that i pass as props

export type AppContextType = {
  notesObject: {
    allNotes: SingleNoteType[];
    setAllNotes: (value: any) => void;
    pinnedNotes: SingleNoteType[];
  };
  initialNotesObject: {
    initialAllNotes: any;
    setInitialAllNotes: (value: any) => void;
  };
  dropDownToogle: {
    openDropDown: boolean;
    setOpenDropDown: (value: boolean) => void;
  };
  dropDownPositionsObject: {
    dropDownPositions: any;
    setDropDownPositions: (value: any) => void;
  };
  noteSelectedObject: {
    noteSelected: any;
    setNoteSelected: (value: any) => void;
  };
  uniqueCategoriesObject: {
    uniqueCategories: any;
    setUniqueCategoies: (value: any) => void;
  };
  openWindowNote: boolean;
  setOpenWindowNote: (value: boolean) => void;
  filterNotesByCategory: (value: any) => void;
  allClickedCategory: () => void;
  clickedCategory: any;
  // allClickedCategory,
  setClickedCategory: (value: any) => void;
  getNotesFromMongoDB: () => void;
  getPinnedNotesFromMongoDB: () => void;
  addNewNoteToDB: () => void,
    updateNoteToDB: (id: string | null | undefined) => void,
    submitSaveBtn: (id: string | null | undefined) => void,
    setTextInputs: (value: any) => void,
    textInputs: textInputs,
    isLoading: boolean,
    hasChanged: boolean,
    setHasChanged: (value: boolean) => void,
};

export const AppContext = createContext<AppContextType | null>(null);

interface Props {
  [propName: string]: any;
  email: string | null | undefined;
}

const AppContextProvider = (props: Props) => {
  const [openWindowNote, setOpenWindowNote] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  //
  const [initialAllNotes, setInitialAllNotes] = useState<any[]>([]);
  const [allNotes, setAllNotes] = useState<any[]>([]);
  const [pinnedNotes, setPinnedNotes] = useState<any[]>([]);
  //
  const [dropDownPositions, setDropDownPositions] = useState({ x: 0, y: 0 });
  const [noteSelected, setNoteSelected] = useState(null);
  const [uniqueCategories, setUniqueCategoies] = useState<any[]>([]);
  const [clickedCategory, setClickedCategory] = useState<any>(null);

    const [isLoading, setIsLoading] = useState(false);

      const [textInputs, setTextInputs] = useState({
        noteTitle: "",
        noteContent: "",
      });
        const [tags, setTags] = useState(["study", "projects"]);

  const [hasChanged, setHasChanged] = useState(false);

      
  

  
  const searchParams = useSearchParams() as any;
      const searchTerm = searchParams.get("searchTerm");

      const params = useParams() as any;

      console.log(params.id);

      console.log(textInputs.noteContent)


      // console.log(props.email)

      async function addNewNoteToDB(listId: string | null | undefined) {
        try {
          setIsLoading(true);
    
          const res = await axios.post("/api/notes", {
            noteName: textInputs.noteTitle,
            noteContent: textInputs.noteContent,
            categories: tags,
            emailRef: props.email,
            listId: listId
          });
    
          const newNoteData = res.data;
    
          getNotesFromMongoDB();
          getPinnedNotesFromMongoDB();
    
          toast.success("Note is created successfully.");
          // setAllNotes([...allNotes, newNoteData]);
          // setInitialAllNotes([...initialAllNotes, newNoteData]);
        } catch (error: any) {
          toast.error(`Error: ${error.message}`);
        } finally {
          setIsLoading(false);
          setHasChanged(false)
        }
    
        if (isLoading === false) {
          setOpenWindowNote(false);
        }
      }
    
      const noteInputRef = useRef<any>(null);
    
      // console.log(openWindowNote)
    
      async function updateNoteToDB(id: string | null | undefined) {
        try {
          setIsLoading(true);
    
          const res = await axios.put(`/api/notes?id=${id}`, {
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
    
          // toast.success("The note has been updated successfully");
        } catch (error) {
          console.log(error);
          alert(`Error updating note: ${error}`);
        } finally {
          setIsLoading(false);
          setHasChanged(false)
        }
    
        // if (isLoading === false) {
        //   setOpenWindowNote(false);
        // }
      }





      const submitSaveBtn = async (id: string | null | undefined, listId: string | null | undefined) => {
        if (
          // textInputs.noteTitle.trim().length === 0 ||
          textInputs.noteContent.trim().length === 0
          // tags.length === 0
        ) {
          toast.error("Please fill all the fields");
          return;
        }
    
        // const newNote = {
        //   id: uuidv4(),
        //   noteName: textInputs.noteTitle,
        //   noteContent: textInputs.noteContent,
        //   dateCreation: new Date(),
        //   categories: tags,
        // };
    
        if (noteSelected === null) {
          addNewNoteToDB(listId);
          // setHasChanged(false)
          //   setAllNotes([...allNotes, newNote]);
          //   setInitialAllNotes([...initialAllNotes, newNote]);
    
          // toast.success('Note is created successfully');
          // setOpenWindowNote(false);
        } else {
          updateNoteToDB(id);
          // setHasChanged(false)
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
    
        // console.log(newNote);
      };

      const getNotesFromMongoDB = async () => {
    try {
      const res = await axios.get(`/api/get-notes${searchTerm ? `?searchTerm=${searchTerm}&listId=${params.id}`: `?listId=${params.id}`}`);

      // console.log(searchTerm)

      setAllNotes(res.data.allNotes);
      setInitialAllNotes(res.data.allNotes);

      // console.log(res)
    } catch (error) {
      console.log(error);
    }
  };

  const getPinnedNotesFromMongoDB = async () => {
    try {
      const res = await axios.get(`/api/get-notes?isPinned=true&listId=${params.id}&${searchTerm ? `searchTerm=${searchTerm}`: ''}`);

      setPinnedNotes(res.data.pinnedNotes);
    } catch (error) {
      console.log(error);
    }
  };
    

  useEffect(() => {
    getNotesFromMongoDB();
    getPinnedNotesFromMongoDB();
  }, [searchTerm, params.id]);

  // useEffect(() => {
  //   setAllNotes(notesData);
  //   setInitialAllNotes(notesData);
  // }, []);

  useEffect(() => {
    if (allNotes) {
      const categoriesSet = new Set();
      allNotes?.forEach((note: any) => {
        note?.categories?.forEach((category: any) => {
          categoriesSet.add(category);
        });
      });

      setUniqueCategoies([...categoriesSet]);
    }
  }, [allNotes, initialAllNotes]);

  function filterNotesByCategory(category: any) {
    const filterByCategory = initialAllNotes.filter((note) => {
      return note?.categories.includes(category);
    });

    setAllNotes(filterByCategory);
  }

  function allClickedCategory() {
    setAllNotes(initialAllNotes);
  }

  const contextValue = {
    notesObject: { allNotes, setAllNotes, pinnedNotes },
    initialNotesObject: { initialAllNotes, setInitialAllNotes },
    dropDownPositionsObject: { dropDownPositions, setDropDownPositions },
    dropDownToogle: { openDropDown, setOpenDropDown },
    noteSelectedObject: { noteSelected, setNoteSelected },
    uniqueCategoriesObject: { uniqueCategories, setUniqueCategoies },
    openWindowNote,
    setOpenWindowNote,
    filterNotesByCategory,
    allClickedCategory,
    clickedCategory,
    setClickedCategory,
    getNotesFromMongoDB,
    getPinnedNotesFromMongoDB,
    addNewNoteToDB,
    updateNoteToDB,
    submitSaveBtn,
    setTextInputs,
    textInputs,
    isLoading,
    hasChanged,
    setHasChanged
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
