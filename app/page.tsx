'use client';
import App from '@/app/AppApp';
// import GlobalProvier from './ContextApi';
// import NotesBluePrint from '@/notesBluePrint';
// import { connectToMongoDB } from './libs/mongodb';
import { useEffect, useState } from 'react';
import React from 'react';
import { Cinzel } from 'next/font/google';

const page = () => {
  return (
    <div>
      {/* <GlobalProvier> */}
        <App />
        <></>
      {/* </GlobalProvier> */}
    </div>
  )
}

export default page
