"use client"

import { SessionProvider } from 'next-auth/react'

const AppProvider = ({
  children,
  session,
}) => {
  return (
    <SessionProvider session={session}>
        {children}
    </SessionProvider>
  )
}

export default AppProvider
