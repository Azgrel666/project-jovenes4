'use client'
import React from 'react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import Link from 'next/link'

const HeroSection= () => {

return(

  <section className="relative bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/2.jpg')" }}>
  <div className="absolute inset-0 bg-black/60"></div>
  <div className="relative max-w-screen-xl mx-auto px-4 py-40 gap-12 text-white md:px-8">
    <div className="space-y-5 max-w-4xl mx-auto text-center">
      <h1 className="text-md text-primary font-bold">Mapa Interactivo de Cartagena</h1>
      <h2 className="text-4xl font-extrabold mx-auto md:text-5xl">
        Caminos de Tradición: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500]">Explorando los Activos Culturales</span> de Cartagena
      </h2>
      <p className="max-w-2xl mx-auto font-medium text-gray-300">
        Cartagena es una ciudad bañada por una riqueza cultural, natural e histórica, única en toda América latina. Es la expresión de costumbres, saberes y tradiciones de comunidades que han conectado con el territorio y lo han vuelto mágico. A través de este mapa interactivo, te invitamos a embarcarte en un viaje a descubrir esos activos ocultos y que a menudo han sido ignorados por el turismo convencional.
      </p>
      <div className="items-center justify-center py-5 gap-x-3 space-y-3 sm:flex sm:space-y-0">
        <Link href="#scroll" className="inline-flex font-semibold justify-center items-center py-2 px-4 text-white font-medium bg-[#FFA500] duration-150 hover:bg-[#FFD700] active:bg-[#FFA500] rounded-lg shadow-lg hover:cursor-pointer hover:scale-105 transition-all ease-in-out font-bold">
          Empezar a Explorar
          <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
        </Link>
      </div>
      <div id='scroll' className='h-[1px]'></div>
    </div>
  </div>

</section>

)

 
}
export default HeroSection;