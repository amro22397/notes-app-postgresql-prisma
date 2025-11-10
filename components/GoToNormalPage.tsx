'use client'

import { useLocale } from 'next-intl'
import Link from 'next/link'
import React from 'react'

const GoToNormalPage = () => {

    const locale = useLocale()
  return (
    <>
    { locale === "ar" && (
        <Link href={`/en`}
      className="text-left w-full"
      >
    Go to normal page (EN)
    </Link>
      )}
    </>
  )
}

export default GoToNormalPage