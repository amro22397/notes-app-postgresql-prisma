import React from 'react'
import Title from './Components/Title'
import Categories from './Components/Categories'
import NotesArea from './Components/NotesArea'
import NoteWindow from './Components/NoteWindow'
import DropDown from './Components/DropDwon';
import { Toaster } from 'react-hot-toast';


const App = () => {
  return (
    <div className="relative w-[680px] h-[410px] bg-white rounded-md shadow-md p-7 flex flex-col gap-9">
      <Title />
      <Categories />
      <NotesArea />
      <DropDown />
      <NoteWindow />
      <Toaster
        containerStyle={{
          fontSize: '10px',
        }}
      />
    </div>
  )
}

export default App
