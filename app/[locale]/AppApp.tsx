'use client'

import React, { useEffect, useState } from 'react'
import Title from './Components/Title'
// import Categories from './Components/Categories'
import NotesArea from './Components/NotesArea'
// import NoteWindow from './Components/NoteWindow'
import DropDown from './Components/DropDwon';
import { Toaster } from 'react-hot-toast';
import SearchBar from './Components/SearchBar'
// import { Button } from '@/components/ui/button'
import { Session } from '@/types/session'
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import axios from 'axios';
import GoToNormalPage from '@/components/GoToNormalPage';


const App = ({ email, user }: {
  email: string | null | undefined,
  user: Session | null | undefined
}) => {

  const [folderById, setFolderById] = useState<any>(null)

  const locale = useLocale();

  const params = useParams() as any;


  const getFolderById = async () => {
    
    const res = await axios.get(`/api/get-folder-by-id?id=${params.id}`)

    setFolderById(res.data.data);

  }

  useEffect(() => {
    getFolderById()
  }, [params.id]);


  return (
    <div className="app-app-style">
      
      

      {/* {params.id} */}
      {/* <pre className="">{JSON.stringify(folderById, null, 2)}</pre> */}

      <Title email={email} 
      folderName={folderById?.name}
      folderId={folderById?.id}
      getFolderById={getFolderById}
       />
      
      <SearchBar  />
      {/* <Categories /> */}
      <NotesArea email={email} />
      <DropDown user={user} folderId={params.id} />
      <Toaster
        containerStyle={{
          fontSize: '20px',
        }}
        position="bottom-right" reverseOrder={false}
      />
    </div>
  )
}

export default App
