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
    <div className="relative md:w-[700px] w-[95vw] h-[700px] bg-white rounded-md shadow-md p-7 flex flex-col gap-6">
      <Title />
      <SearchBar />
      {/* <Categories /> */}
      <NotesArea />
      <DropDown />
      <Toaster
        containerStyle={{
          fontSize: '20px',
        }}
      />
    </div>
  )
}

export default App
