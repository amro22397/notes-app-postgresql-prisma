import React from 'react'
import { Input } from "@/components/ui/input"
import { IoSearch } from "react-icons/io5";



const SearchBar = () => {
  return (
    <div className='w-lg px-4 bg-red-200/85 rounded-full mx-auto
    flex flex-row items-center justify-center gap-2'>
      <input type="text" className="w-full py-[7.25px] focus:outline-none text-black
      font-semibold tracking-wider text-[17.5px]" />

      <IoSearch size={25} className='text-black/70' />
    </div>
  )
}

export default SearchBar
