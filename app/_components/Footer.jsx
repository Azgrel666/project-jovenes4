"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const [showDevelopers, setShowDevelopers] = React.useState(false);

  return (
    <footer className="bg-secondary p-6 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="flex items-center justify-center gap-5 md:gap-5 mb-4 md:mb-0">
  <Image
    src="/footer/logo-externado.png"
    alt="Logo 1"
    width={100}
    height={100}
    className="w-auto h-auto"
  />
  <Image
    src="/footer/goglab.png"
    alt="Logo 3"
    width={85}
    height={85}
    className="w-20 h-20 md:w-auto md:h-auto"
  />
  <Image
    src="/footer/jovenes.png"
    alt="Logo 2"
    width={85}
    height={85}
    className="w-20 h-20 md:w-auto md:h-auto"
  />
</div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Mapa Interactivo de Cartagena</h3>
            <Link href="/about" className="inline-flex items-center text-gray-300 hover:text-white transition-colors duration-200">
              <span>Sobre el Proyecto</span>
              <svg
                className="w-4 h-4 ml-2 transition-transform duration-200"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className="flex justify-center mb-8">
          <button
            className="inline-flex items-center text-gray-300 hover:text-white focus:outline-none transition-colors duration-200"
            onClick={() => setShowDevelopers(!showDevelopers)}
          >
            <span className="mr-2">Desarrollado por:</span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                showDevelopers ? 'rotate-180' : ''
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {showDevelopers && (
            <div className="ml-4 text-gray-300">
              <span>Isaac Velásquez</span> y <span>Santiago Sarria. Jóvenes 4.0 </span>
            </div>
          )}
        </div>
        <div className="text-center text-gray-400">
          &copy; {new Date().getFullYear()} Universidad Externado, Jóvenes 4.0. Todos los derechos reservados.
        </div>
        <hr className="my-4 border-gray-600" />
        
      </div>
    </footer>
  );
};

export default Footer;