"use client";

import { createContext, useContext, useEffect, useState } from "react";
import notesData from "../app/NotesData";

import axios from "axios";
import { SingleNoteType } from "@/types/singleNote";

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
};

export const AppContext = createContext<AppContextType | null>(null);

interface Props {
  [propName: string]: any;
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

  useEffect(() => {
    getNotesFromMongoDB();
    getPinnedNotesFromMongoDB();
  }, []);

  const getNotesFromMongoDB = async () => {
    try {
      const res = await axios.get("/api/notes");

      setAllNotes(res.data.allNotes);
      setInitialAllNotes(res.data.allNotes);
    } catch (error) {
      console.log(error);
    }
  };

  const getPinnedNotesFromMongoDB = async () => {
    try {
      const res = await axios.get("/api/notes?isPinned=true");

      setPinnedNotes(res.data.pinnedNotes);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(allNotes);

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
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
