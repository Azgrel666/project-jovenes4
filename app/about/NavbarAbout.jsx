"use client"
import Image from 'next/image'
import React, {useEffect, useState} from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Languages } from 'lucide-react';

function Navbar() {

    const [header, setHeader] = useState(false)

    const scrollHeader =() =>{
        if(window.scrollY>=20)
        {
            setHeader(true)
        }
        else{
            setHeader(false)
        }
    }


    useEffect(()=>{
        window.addEventListener('scroll', scrollHeader)

        return() => {
            window.addEventListener('scroll', scrollHeader)
        }
    },[])


  return (
    <div className={header? "fixed w-[100%] bg-white z-50": "bg-transparent w-[100%] mx-auto z-50"}>
<div className='header container mx-auto flex items-center justify-between w-full shadow-sm '>
        <div className='flex items-center p-7 gap-10 '>
        <Link href="/">
            <Image src='/logo.svg' alt='logo'
        width={40} height={40}
        />
            </Link>
        </div>
        <div className='flex justify-between gap-4'>
  
              <DropdownMenu clas>
                  <DropdownMenuTrigger>
                    

                  <Languages alt='logo'
                     width={25} height={25} className=' hover: cursor-pointer
                     hover:scale-110
                     transition-all ease-in-out'/>


                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                      <DropdownMenuLabel>Idioma</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Español</DropdownMenuItem>
                      <DropdownMenuItem>English</DropdownMenuItem>
                  </DropdownMenuContent>
              </DropdownMenu>

<Link href='/'>
<Button className='font-semibold rounded-3xl hover: cursor-pointer
                hover:scale-105
                transition-all ease-in-out
                font-bold '
                >Volver al Mapa</Button>
</Link>
        

        
        </div>
        
    </div>

    
    </div>
    
  )
}

export default Navbar