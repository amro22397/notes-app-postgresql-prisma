import React from 'react'
import Title from './Components/Title'
import Categories from './Components/Categories'
import NotesArea from './Components/NotesArea'
import NoteWindow from './Components/NoteWindow'
import DropDown from './Components/DropDwon';
import { Toaster } from 'react-hot-toast';
import SearchBar from './Components/SearchBar'
import { Button } from '@/components/ui/button'
import { Session } from '@/types/session'


const App = ({ email, user }: {
  email: string | null | undefined,
  user: Session | null | undefined
}) => {
  return (
    <div className="relative md:w-[700px] w-[95vw] h-[700px] rounded-md shadow-md p-7 flex flex-col gap-6
    bg-zinc-200/75">
      <Title />
      
      <SearchBar />
      {/* <Categories /> */}
      <NotesArea email={email} />
      <DropDown user={user} />
      <Toaster
        containerStyle={{
          fontSize: '20px',
        }}
      />
    </div>
  )
}

export default App
