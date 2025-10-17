'use client'

import axios from 'axios';
import { LoaderCircle } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import React, { useState } from 'react'
import { toast } from 'sonner';

const IfYouDontRecieve = ({ email }: {
  email: string | null | undefined
}) => {

  const emailIsNotVerified = useTranslations('EmailIsNotVerified');
  const locale = useLocale();
  console.log(email, locale)

  const [loading, setLoading] = useState(false);

  const sendEmailAgain = async () => {

    console.log(email, locale)
    
    // PostMark

    // try {
    //   await axios.post("/api/basic-email", {
    //     email,
    //     subject: 'Verfiy your Email',
    //     locale: locale,

    //   })
    // } catch (error: any) {
    //   //
    //   console.log(`ClientError: ${error.message}`);
    // }

    setLoading(true);

    try {
      
      const res = await axios.post("/api/sendEmailGmail", {
        email: email,
        subject: 'Verfiy your Email',
        locale: locale,
      })

      console.log(res)

      if (!res.data.success) {
        toast.error(`${res.data.message}`)
        setLoading(false);
      }

      if (res.data.success) {
        toast.success(`${res.data.message}`);
        setLoading(false);
      }

    } catch (error: any) {
      
      console.log(`Sending verify email client error: ${error.message}`);
      toast.error(`Sending verify email client error: ${error.message}`)
      setLoading(false);
    }

    setLoading(false);
  }

  return (
    <div className="bg-red-500 text-white w-full
    justify-center text-lg text-center flex flex-wrap">
      {emailIsNotVerified('IfYouHaveNotRecieved')}
        {loading ? <LoaderCircle className={`animate-spin ml-[6px]
        ${locale === "ar" && "mr-[6px]"}`} /> : (
          <span 
          className={`ml-[6px] text-indigo-200
          hover:underline active:text-indigo-300 cursor-pointer
          ${locale === "ar" && "mr-[6px]"}`}
          onClick={sendEmailAgain}
          >
          {emailIsNotVerified('click here')}
          </span>
        )  
        }
      
    </div>
  )
}

export default IfYouDontRecieve
