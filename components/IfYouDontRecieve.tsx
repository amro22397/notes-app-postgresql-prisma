'use client'

import { useTranslations } from 'next-intl';
import React from 'react'

const IfYouDontRecieve = () => {

  const emailIsNotVerified = useTranslations('EmailIsNotVerified');

  return (
    <div className="bg-red-500 text-white w-full
    justify-center text-lg text-center">
      {emailIsNotVerified('IfYouHaveNotRecieved')}<span 
      className="ml-1 text-indigo-200
      hover:underline active:text-indigo-300 cursor-pointer">{emailIsNotVerified('click here')}</span>
    </div>
  )
}

export default IfYouDontRecieve
