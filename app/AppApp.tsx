import React from 'react'
import Title from './Components/Title'
import Categories from './Components/Categories'
import NotesArea from './Components/NotesArea'
import NoteWindow from './Components/NoteWindow'
import DropDown from './Components/DropDwon';
import { Toaster } from 'react-hot-toast';
import SearchBar from './Components/SearchBar'


const App = () => {
  return (
    <div className="relative w-[700px] h-[787.5px] bg-white rounded-md shadow-md p-7 flex flex-col gap-6">
      <Title />
      <SearchBar />
      <Categories />
      <NotesArea />
      <DropDown />
      <Toaster
        containerStyle={{
          fontSize: '10px',
        }}
      />
    </div>
  )
}

export default App
