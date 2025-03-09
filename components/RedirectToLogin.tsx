'use client'

import { useRouter } from 'next/navigation';
import React from 'react'

const RedirectToLogin = () => {
    const router = useRouter();

    const s = true;

    if (s) {
        return router.push('/login');
    }

    return (
        <>
        <div className=""></div>
        <div className=""></div>
        </>
    )

}

export default RedirectToLogin
