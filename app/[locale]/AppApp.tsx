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
import { useLocale } from 'next-intl';
// import Link from 'next/link';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Session } from '@/types/user';
// import GoToNormalPage from '@/components/GoToNormalPage';


const App = ({ email, /* user */ session }: {
  email: string | null | undefined,
  // user: Session | null | undefined,
  session: Session | null | undefined
}) => {

  const [folderById, setFolderById] = useState<any>(null)

      const [sessionUser, setSessionUser] = useState<Session | null | undefined>(null);
  

  const locale = useLocale();

  console.log(locale)

  const params = useParams() as any;


  const getFolderById = async () => {
    
    const res = await axios.get(`/api/get-folder-by-id?id=${params.id}`)

    setFolderById(res.data.data);

  }

  useEffect(() => {
    getFolderById()
  }, [params.id]);


  const getSessionUser = async () => {
    
    const res = await axios.get(`/api/get-session-user?email=${session?.user?.email}&locale=${locale}`, {
      params: {
        session: JSON.stringify(session),
      }
    });

    // setRes(res)

    setSessionUser(res.data.data);

  }


  useEffect(() => {
      getSessionUser();
    }, []);


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
      <DropDown user={sessionUser} folderId={params.id} />
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
