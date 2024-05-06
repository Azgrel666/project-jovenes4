
"use client"
import React from 'react';
import Image from 'next/image';

export default function AboutProject() {
  return (
    <div className="relative bg-gradient-to-r from-indigo-800 to-purple-700 py-16 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0">
        <div className="bg-gradient-to-r from-indigo-800 to-purple-700 h-1/2 sm:h-2/3"></div>
        
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Sobre el Proyecto
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-indigo-200 sm:mt-4">
            Caminos de tradición: Explorando los activos culturales de Cartagena
          </p>
        </div>
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-2 lg:max-w-none">
          <div className="flex flex-col rounded-lg shadow-lg overflow-hidden items-center justify-center">
            <div className="flex items-center justify-center">
              <Image
                className=""
                src="/footer/goglab.png"
                alt="GobLab Icon"
                width={300}
                height={150}
              />
            </div>
          </div>
          <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <div className="flex-shrink-0 bg-black p-6 sm:p-8">
              <p className="text-lg text-indigo-200">
                En el marco del laboratorio de asuntos públicos y la estrategia GobLab de la Universidad Externado de Colombia, los estudiantes de Gobierno y Relaciones Internacionales participan en una convocatoria donde deben escoger uno de los proyectos presentados y desarrollar un producto. En este contexto, surge la iniciativa <strong>Caminos de Tradición: Explorando los Activos Culturales de Cartagena</strong>.
              </p>
              <p className="mt-4 text-indigo-200">
                El proyecto tiene como objetivo crear un mapa interactivo que permita a los consumidores del sector turístico de Cartagena de Indias y algunos municipios conurbados adentrarse en el turismo cultural, de naturaleza y el turismo de las personas. Esta iniciativa busca promover y destacar las tradiciones y activos culturales de la región.
              </p>
              
            </div>
          </div>
        </div>

        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-2 lg:max-w-none">
          
          <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <div className="flex-shrink-0 bg-black p-6 sm:p-8">
            
              <p className="mt-4 text-indigo-200">
                Para llevar a cabo este proyecto, el GobLab se ha asociado con la Universidad Nacional de Colombia a través del proyecto UnLab 4.0. Juntos, trabajan en el desarrollo del mapa interactivo, demostrando así las capacidades y éxitos que la academia puede generar cuando se unen fuerzas y colaboran en proyectos conjuntos.
              </p>
            </div>
          </div>
          <div className="flex flex-col rounded-lg shadow-lg overflow-hidden items-center justify-center">
            <div className="flex-shrink-0">
              <Image
                className=""
                src="/footer/jovenes.png"
                alt="Jovenes Imagen"
                width={300}
                height={150}
              />
            </div>
          </div>


        </div>
        
        <div className="mt-8 bg-black p-6 sm:p-8 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-indigo-200">Trabajo Futuro</h3>
          <p className="mt-4 text-indigo-200">
            Está aplicación web ha sido un primer paso hacia la preservación y promoción de la rica historia y el legado cultural de Cartagena.
          </p>
          <p className="mt-4 text-indigo-200">
            El trabajo futuro incluye implementar una serie de mejoras y funcionalidades adicionales para ofrecer una experiencia más completa y satisfactoria a los usuarios. Algunas de las áreas clave que abordaremos incluyen:
          </p>
          <ul className="mt-4 list-disc pl-4 text-indigo-200 flex flex-col gap-3">
            <li>
              <strong>Sistema de Autenticación de Usuarios</strong>: Implementar un sistema de autenticación de usuarios que permitirá a los visitantes registrarse, iniciar sesión y tener cuentas personales. Esto abrirá la puerta a funcionalidades adicionales como la capacidad de guardar listas de lugares favoritos, crear itinerarios personalizados, dejar comentarios y calificaciones.
            </li>
            <li>
              <strong>Sistema de calificación y comentarios</strong>: Esta es una funcionalidad clave que brindará mayor transparencia y seguridad a los visitantes. Al permitir que los usuarios califiquen y comenten sobre los lugares, otros podrán tomar decisiones informadas sobre dónde visitar basándose en la reputación. </li>
            <li>
              <strong>Funcionalidades Avanzadas de Filtrado y Búsqueda</strong>: Se implementarán funcionalidades avanzadas de filtrado y búsqueda para facilitar la búsqueda de lugares culturales específicos por categoría, período histórico, ubicación y otros criterios relevantes.
            </li>
            <li>
              <strong>Registro de Negocios locales</strong>: Involucrar emprendedores locales dandole la posibilidad de exponer su negocio de interes turístico. Permitirles registrarse y promocionarse en la plataforma fomentará el turismo y la activación económica de la zona. Los visitantes podrán descubrir opciones auténticas de restaurantes, compras y servicios, enriqueciendo su experiencia cultural. </li>
            <li>
            <strong>Integración de varios idiomas</strong>: Esta funcionalidad es esencial para hacer la plataforma accesible a un público más amplio, tanto local como internacional. Al ofrecer traducciones a múltiples idiomas, se eliminarán las barreras lingüísticas y se logrará una mayor inclusión, lo que a su vez atraerá a más visitantes.</li>
             
            <li>
              <strong>Rutas y Tours</strong>: Funciones para crear y compartir rutas y tours guiados que combinen varios lugares de patrimonio cultural de manera lógica y organizada. Esto facilitará la planificación de visitas turísticas y proporcionará una experiencia más estructurada para los usuarios.
           
              </li>
          </ul>
        </div>
      </div>
    </div>
  );
}