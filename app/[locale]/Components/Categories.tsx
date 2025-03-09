'use client';

import { AppContext, AppContextType } from '@/context/AppContext';
import React, { useContext, useState } from 'react';
// import { useGlobalProvider } from '../ContextApi';

const Categories = (props: any) => {


  const { 
    uniqueCategoriesObject,
    filterNotesByCategory,
    allClickedCategory,
    initialNotesObject,
    clickedCategory,
    setClickedCategory,
   } = useContext(AppContext) as AppContextType;

   const { uniqueCategories } = uniqueCategoriesObject;

   function handleClickedCategory(clickedCategory: any) {
    filterNotesByCategory(clickedCategory);
    setClickedCategory(clickedCategory);
   }

   console.log(clickedCategory)



  return (
    <div className='mb-1'>
      <div>
        <nav className="flex gap-2" aria-label="Tabs">
          <button
            onClick={() => {
              allClickedCategory();
              setClickedCategory(null);
            }}
            className={`categories ${
              clickedCategory === null
                ? ' text-white bg-red-500'
                : 'bg-transparent text-red-500 hover:text-red-500/90'
            }`}
          >
            All
          </button>

          {uniqueCategories.map((uniqueCategory: any, index: number) => (
            <button
              onClick={() => handleClickedCategory(uniqueCategory)}
              key={index}
              className={`categories
               text-red-500 ${
                 clickedCategory === uniqueCategory
                   ? 'bg-red-500 text-white'
                   : 'bg-transparent : text-red-500 hover:text-red-500/90'
               }`}
            >
              {uniqueCategory}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default Categories
