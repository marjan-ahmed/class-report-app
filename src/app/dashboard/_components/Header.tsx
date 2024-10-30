"use client"
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import React from 'react'
import Image from 'next/image';

function Header() {
  const {user}=useKindeBrowserClient();
  const pictureSrc = user?.picture || '/default-user-picture.svg';
  return (
    <div className='p-4 shadow-sm border flex justify-between'>
      <div>

      </div>
      <div>
        <Image className='rounded-full'
        src={pictureSrc}
        alt="user"
        width={35}
        height={35} />
      </div>
    </div>
  )
}

export default Header
