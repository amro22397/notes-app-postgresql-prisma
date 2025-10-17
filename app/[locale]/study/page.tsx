'use client'

import { useSearchParams } from 'next/navigation'
import React from 'react'

const page = () => {

    const searchParams = useSearchParams() as any;

    const searchTerm = searchParams.get('searchTerm');

    console.log(searchTerm)

  return (
    <div>page</div>
  )
}

export default page