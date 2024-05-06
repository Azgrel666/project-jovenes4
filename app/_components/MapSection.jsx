"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { LocateFixed } from "lucide-react";
import Modal from "./Modal";
import IModal from "./IModal.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { createRef } from "react";

export const mapSectionRef = createRef();

import { useState, useEffect, useRef } from "react";
import { Landmark } from "lucide-react";
import { TreePalm } from "lucide-react";
import { Sparkles } from "lucide-react";
import { X } from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { markers } from "./constants/constants.js";
import { P_inmaterial } from "./constants/p_inmaterial.js";
import { P_material } from "./constants/p_material.js";
import { P_natural } from "./constants/p_natural.js";
import { Patrimonio } from "./constants/patrimonio.js";
const MapSection = () => {
  //Controladores del Sidebar
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const [activeTertiaryCategory, setActiveTertiaryCategory] = useState("");
  const [isLeftSectionVisible, setIsLeftSectionVisible] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [popups, setPopups] = useState({});
  const [selectedLine, setSelectedLine] = useState("");
  const [activePlace, setActivePlace] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [showModal, setShowModal] = useState(false);


  const handleImageClick = (image) => {
    setModalImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalImage('');
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLineClick = (line) => {
    setSelectedLine(line);
  };

  useEffect(() => {});

  const ShowPopup = () => {
    // Buscar el popup correspondiente al lugar seleccionado y abrirlo

    if (activePlace != null) {
      const selectedMarker = markers.current.find(
        ({ marker }) => marker.markerData.name === activePlace
      );
      if (selectedMarker) {
        selectedMarker.popup.addTo(map);
       
    
        
        // Luego, después de un retraso (por ejemplo, 2 segundos), realiza la animación existente
       
          map.panTo(selectedMarker.marker.getLngLat(), {
            duration: 1000,
            zoom: 11,
            essential: true,
            speed: 0.8,
            curve: 1,
            easing(t) { return t; }
          });
        

        // Desencadenar el evento de clic en el marcador
        const markerElement = selectedMarker.marker.getElement();
        const clickEvent = new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: true,
        });
        markerElement.dispatchEvent(clickEvent);
      }
    }
  };

  const togglePlace = (place) => {
    setActivePlace(activePlace === place ? null : place);
  };

  const handlePmaterial = (place) => {
    if (activeSubCategory === null) {
      toggleSubCategory("Patrimonio Material");
    }

    togglePlace(place);
  };

  const toggleCategory = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
    setActiveSubCategory(null);
    setActivePlace(null);
  };

  const toggleSubCategory = (subCategory) => {
    setActiveSubCategory(
      activeSubCategory === subCategory ? null : subCategory
    );
    setActivePlace(null);
  };
  const toggleTertiaryCategory = (tertiaryCategory) => {
    setActiveTertiaryCategory(
      activeTertiaryCategory === tertiaryCategory ? "" : tertiaryCategory
    );
  };

  const handleToggleLeftSection = () => {
    setSelectedMarker(null);
  };

  const [map, setMap] = useState(null);
  // ___________________MAPA_________________
  const markers = useRef([]);
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYXpncmVsNjYiLCJhIjoiY2x1cTJ6OHU3MXE1bzJrb2FnMmg3dnZicCJ9.1cCvQYUVTjd80fFCZH1oaQ";

    if (!map) {
      const mapInstance = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-75.40990413470693, 10.33396465955387],
        zoom: 10,
      });

      setMap(mapInstance);
    }
  }, [map]);

  useEffect(() => {
    if (map) {
      // Limpiar marcadores anteriores

      markers.current.forEach(({ marker, popup }) => {
        marker.remove();
        popup.remove();
      });

      markers.current = [];

      // Filtrar marcadores según la categoría seleccionada
      const filteredMarkers = activeSubCategory
        ? Patrimonio.filter(
            (marker) =>
              marker.category === activeCategory &&
              marker.subcategory === activeSubCategory
          )
        : activeCategory === null
        ? Patrimonio
        : Patrimonio.filter(
            (marker) =>
              marker.category === activeCategory &&
              (activeSubCategory === null ||
                marker.subcategory === activeSubCategory)
          );

      // Crear marcadores a partir de los marcadores filtrados
      filteredMarkers.forEach((marker) => {
        let color;
        switch (marker.category) {
          case "Patrimonio Inmaterial":
            color = "#DC90FF";
            break;

          case "Patrimonio Material":
            color = "#FA9154";
            break;
          case "Patrimonio Natural":
            color = "#6CFD8D";
            break;
          default:
            color = "rgb(0,0,0)";
        }
        const { marker: markerElement, popup } = createMarker(
          map,
          marker,
          color
        );
        markers.current.push({ marker: markerElement, popup });
      });

      ShowPopup();
    }
  }, [activeCategory, activeSubCategory, activePlace, map,ShowPopup]);

  const createMarker = (mapInstance, markerData, color) => {
    const markerElement = new mapboxgl.Marker({ color: color })
      .setLngLat([markerData.longitude, markerData.latitude])
      .addTo(mapInstance);

    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<div class="bg-white rounded-lg shadow-lg p-4">
          <h3 class="text-base font-bold mb-2">${markerData.name}</h3>
        </div>`
    );

    markerElement.setPopup(popup);
    markerElement.markerData = markerData;
    markerElement.getElement().addEventListener("click", () => {
      setSelectedMarker(markerData);
      popup.addTo(mapInstance);
    });

    return { marker: markerElement, popup };
  };

  const resetMap = () => {
    map.flyTo({
      center: [-75.40990413470693, 10.33396465955387], // Coordenadas a las que se moverá el mapa
      zoom: 10, // Nivel de zoom al que se moverá el mapa
      speed: 0.8, // Velocidad de la animación (0 para no animado, 1 para velocidad máxima)
      curve: 1, // Curva de la animación (valores mayores dan una curva más pronunciada)
      easing(t) {
        return t;
      },
    });
  };

  return (
    <div className="flex flex-col md:flex-row h-[800px]">
      {/* --------------DIV INFO LUGAR------------------- */}
      <div
        className={`bg-gray-200 bg-opacity-30 p-2 absolute z-10 transition-all ease-in-out duration-500 rounded-xl h-max w-[400px] ${
          selectedMarker ? "left-0" : "-left-full"
        }`}
      >
        <div className="flex justify-end ">
          <X
            className="hover:cursor-pointer"
            onClick={handleToggleLeftSection}
          />
        </div>
        {selectedMarker && (
          <Card className="p-3 h-max">
            <Carousel
              className="w-full"
              opts={{
                align: "center",
                loop: true,
                skinNaps: true,
              }}
            >
              
              <CarouselContent className="w-full">
                $
                {selectedMarker.images.map((photo) => (
                  <CarouselItem key={selectedMarker.name}>
                    <div className="p-1">
                      <Card>
                        <CardContent className="aspect-square flex items-center justify-center  p-3 w-full h-[300px]">
                          <Image
                            src={photo}
                            alt={photo}
                            width={320}
                            height={280}
                            onClick={() => handleImageClick(photo)}
                    style={{ cursor: 'pointer' }}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <IModal open={showModal} onClose={handleCloseModal}>
        <img src={modalImage} alt={modalImage} />
      </IModal>
              <CarouselPrevious className="mt-4 align-center" />
              <CarouselNext />
            </Carousel>

            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">{selectedMarker.name}</CardTitle>

              <div>
                {selectedMarker.category === "Patrimonio Material" && (
                  <Landmark></Landmark>
                )}
                {selectedMarker.category === "Patrimonio Inmaterial" && (
                  <Sparkles></Sparkles>
                )}
                {selectedMarker.category === "Patrimonio Natural" && (
                  <TreePalm></TreePalm>
                )}
              </div>
            </div>
            <h4 className="font-bold">{selectedMarker.category}</h4>
            <h4 className="font-bold text-sm">
              {selectedMarker.category !== "Patrimonio Material"
                ? selectedMarker.subcategory
                : null}
            </h4>
            <CardDescription className="inline-block overflow-auto w-full h-[280px]  mt-3">
              <div className="whitespace-pre-wrap">
                {selectedMarker.description}
              </div>
            </CardDescription>

            <h4 className="font-bold text-sm">
              {selectedMarker.subcategory === "Fogón Cartagenero"
                ? selectedMarker.line
                : null}
            </h4>
          </Card>
        )}
      </div>

      {/* -----------------------MAPA---------------------- */}
      <div
        ref={mapContainer}
        className="w-full h-[500px] md:h-full relative overflow-hidden"
        id="mapbox-container"
      >
        <button
          className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow-md"
          onClick={resetMap}
        >
          <LocateFixed />
        </button>
      </div>

      {/* //-------------------------------SIDEBAR------------------------------------------ */}
      <div className="flex flex-col w-full bg-secondary text-white p-6 overflow-y-auto rounded-xl md:w-[350px] md:h-full">
        <div className="flex flex-col space-y-4">
          <h3 className="text-xl font-bold">Exploración de Activos</h3>

          {/* //-------------------------------PATRIMONIO INMATERIAL------------------------------------------ */}

          <div>
            <button
              className={`flex justify-between items-center w-full p-1 rounded-md shadow-md transition-colors duration-300 border-t border-b border-white ${
                activeCategory === "Patrimonio Inmaterial"
                  ? "bg-white text-gray-900 hover:bg-gray-200"
                  : "hover:text-gray-400"
              }`}
              onClick={() => toggleCategory("Patrimonio Inmaterial")}
            >
              <div
                className={`w-10 h-10 rounded-3xl flex justify-center items-center ${
                  activeCategory === "Patrimonio Inmaterial"
                    ? "bg-[rgb(215,101,230)] text-white"
                    : "hover:text-gray-400"
                }`}
              >
                <Sparkles />
              </div>

              <span>Patrimonio Inmaterial</span>
              <svg
                className={`h-6 w-6 transition-transform duration-300 ${
                  activeCategory === "Patrimonio Inmaterial"
                    ? "transform rotate-180"
                    : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {activeCategory === "Patrimonio Inmaterial" && (
              <div className="ml-4 mt-2 space-y-2">
                <button
                  className={`flex justify-between items-center w-full hover:text-gray-400 ${
                    activeSubCategory === "Fogón Cartagenero"
                      ? "text-gray-400"
                      : ""
                  }`}
                  onClick={() => toggleSubCategory("Fogón Cartagenero")}
                >
                  <span>Fogón Cartagenero</span>
                  <svg
                    className={`h-6 w-6 transition-transform duration-300 ${
                      activeSubCategory === "Fogón Cartagenero"
                        ? "transform rotate-180"
                        : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {activeSubCategory === "Fogón Cartagenero" && (
                  <div className="ml-4 mt-2 space-y-2">
                    <button
                      className={`hover:text-gray-400 flex items-center justify-between ${
                        activeTertiaryCategory === "Autóctono"
                          ? "text-gray-400"
                          : ""
                      }`}
                      onClick={() => toggleTertiaryCategory("Autóctono")}
                    >
                      <span>Autóctono</span>
                      <svg
                        className={`h-5 w-5 transition-transform duration-300 ${
                          activeTertiaryCategory === "Autóctono"
                            ? "transform rotate-180"
                            : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {activeTertiaryCategory === "Autóctono" && (
                      <div className="ml-4 mt-2 space-y-2 overflow-hidden">
                        <ul className="transform text-white transition-all duration-500 ease-in-out delay-100 flex flex-col">
                          {P_inmaterial.map(
                            (item) =>
                              item.line === "Autóctono" && (
                                <button
                                  onClick={() => togglePlace(item.name)}
                                  key={item.name}
                                  href="#"
                                  className="hover:text-gray-400 border-b border-slate-600"
                                >
                                  {item.name}
                                </button>
                              )
                          )}
                        </ul>
                      </div>
                    )}
                    <button
                      className={`hover:text-gray-400 flex items-center justify-between ${
                        activeTertiaryCategory === "Típico"
                          ? "text-gray-400"
                          : ""
                      }`}
                      onClick={() => toggleTertiaryCategory("Típico")}
                    >
                      <span>Típico</span>
                      <svg
                        className={`h-5 w-5 transition-transform duration-300 ${
                          activeTertiaryCategory === "Típico"
                            ? "transform rotate-180"
                            : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {activeTertiaryCategory === "Típico" && (
                      <ul className="transform text-white transition-all duration-500 ease-in-out delay-100 flex flex-col">
                        {P_inmaterial.map(
                          (item) =>
                            item.line === "Típico" && (
                              <button
                                onClick={() => togglePlace(item.name)}
                                key={item.name}
                                href="#"
                                className="hover:text-gray-400 border-b border-slate-600"
                              >
                                {item.name}
                              </button>
                            )
                        )}
                      </ul>
                    )}
                    <button
                      className={`hover:text-gray-400 flex items-center justify-between ${
                        activeTertiaryCategory === "Tradicional"
                          ? "text-gray-400"
                          : ""
                      }`}
                      onClick={() => toggleTertiaryCategory("Tradicional")}
                    >
                      <span>Tradicional</span>
                      <svg
                        className={`h-5 w-5 transition-transform duration-300 ${
                          activeTertiaryCategory === "Tradicional"
                            ? "transform rotate-180"
                            : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {activeTertiaryCategory === "Tradicional" && (
                      <ul className="transform text-white transition-all duration-500 ease-in-out delay-100 flex flex-col">
                        {P_inmaterial.map(
                          (item) =>
                            item.line === "Tradicional" && (
                              <button
                                onClick={() => togglePlace(item.name)}
                                key={item.name}
                                href="#"
                                className="hover:text-gray-400 border-b border-slate-600"
                              >
                                {item.name}
                              </button>
                            )
                        )}
                      </ul>
                    )}
                  </div>
                )}

                <button
                  className={`flex justify-between items-center w-full hover:text-gray-400 ${
                    activeSubCategory === "Artesanias" ? "text-gray-400" : ""
                  }`}
                  onClick={() => toggleSubCategory("Artesanias")}
                >
                  <span>Artesanías</span>
                  <svg
                    className={`h-6 w-6 transition-transform duration-300 ${
                      activeSubCategory === "Artesanias"
                        ? "transform rotate-180"
                        : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {activeSubCategory === "Artesanias" && (
                  <ul className="transform text-white transition-all duration-500 ease-in-out delay-100 flex flex-col">
                    {P_inmaterial.map(
                      (item) =>
                        item.subcategory === "Artesanias" && (
                          <button
                            onClick={() => togglePlace(item.name)}
                            key={item.name}
                            href="#"
                            className="hover:text-gray-400 border-b border-slate-600"
                          >
                            {item.name}
                          </button>
                        )
                    )}
                  </ul>
                )}

                <button
                  className={`flex justify-between items-center w-full hover:text-gray-400 ${
                    activeSubCategory === "Tradición Oral y Danzas"
                      ? "text-gray-400"
                      : ""
                  }`}
                  onClick={() => toggleSubCategory("Tradición Oral y Danzas")}
                >
                  <span>Tradición Oral y Danzas</span>
                  <svg
                    className={`h-6 w-6 transition-transform duration-300 ${
                      activeSubCategory == "Tradición Oral y Danzas"
                        ? "transform rotate-180"
                        : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {activeSubCategory === "Tradición Oral y Danzas" && (
                  <ul className="transform text-white transition-all duration-500 ease-in-out delay-100 flex flex-col">
                    {P_inmaterial.map(
                      (item) =>
                        item.subcategory === "Tradicion Oral y Danzas" && (
                          <button
                            onClick={() => togglePlace(item.name)}
                            key={item.name}
                            href="#"
                            className="hover:text-gray-400 border-b border-slate-600"
                          >
                            {item.name}
                          </button>
                        )
                    )}
                  </ul>
                )}

                <button
                  className={`flex justify-between items-center w-full hover:text-gray-400 ${
                    activeSubCategory === "Festivales" ? "text-gray-400" : ""
                  }`}
                  onClick={() => toggleSubCategory("Festivales")}
                >
                  <span>Festivales</span>
                  <svg
                    className={`h-6 w-6 transition-transform duration-300 ${
                      activeSubCategory === "Festivales"
                        ? "transform rotate-180"
                        : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {activeSubCategory === "Festivales" && (
                  <ul className="transform text-white transition-all duration-500 ease-in-out delay-100 flex flex-col">
                    {P_inmaterial.map(
                      (item) =>
                        item.subcategory === "Festivales" && (
                          <button
                            onClick={() => togglePlace(item.name)}
                            key={item.name}
                            href="#"
                            className="hover:text-gray-400 border-b border-slate-600"
                          >
                            {item.name}
                          </button>
                        )
                    )}
                  </ul>
                )}

                <button
                  className={`flex justify-between items-center w-full hover:text-gray-400 ${
                    activeSubCategory === "Medicina Tradicional"
                      ? "text-gray-400"
                      : ""
                  }`}
                  onClick={() => toggleSubCategory("Medicina Tradicional")}
                >
                  <span>Medicina Tradicional</span>
                  <svg
                    className={`h-6 w-6 transition-transform duration-300 ${
                      activeSubCategory === "Medicina Tradicional"
                        ? "transform rotate-180"
                        : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {activeSubCategory === "Medicina Tradicional" && (
                  <ul className="transform text-white transition-all duration-500 ease-in-out delay-100 flex flex-col">
                    {P_inmaterial.map(
                      (item) =>
                        item.subcategory === "Medicina tradicional" && (
                          <button
                            onClick={() => togglePlace(item.name)}
                            key={item.name}
                            href="#"
                            className="hover:text-gray-400 border-b border-slate-600"
                          >
                            {item.name}
                          </button>
                        )
                    )}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* //-------------------------------PATRIMONIO MATERIAL------------------------------------------ */}
          <div>
            <button
              className={`flex justify-between items-center w-full p-1 rounded-md shadow-md transition-colors duration-300 border-t border-b border-white ${
                activeCategory === "Patrimonio Material"
                  ? "bg-white text-gray-900 hover:bg-gray-200"
                  : "hover:text-gray-400"
              }`}
              onClick={() => toggleCategory("Patrimonio Material")}
            >
              <div
                className={`w-10 h-10 rounded-3xl flex justify-center items-center ${
                  activeCategory === "Patrimonio Material"
                    ? "bg-primary text-white"
                    : "hover:text-gray-400"
                }`}
              >
                <Landmark />
              </div>

              <span>Patrimonio Material</span>
              <svg
                className={`h-6 w-6 transition-transform duration-300 ${
                  activeCategory === "Patrimonio Material"
                    ? "transform rotate-180"
                    : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {activeCategory === "Patrimonio Material" && (
              <ul className="flex flex-col mt-2">
                {P_material.map(
                  (item) =>
                    item.category === "Patrimonio material" && (
                      <button
                        onClick={() => handlePmaterial(item.name)}
                        key={item.name}
                        href="#"
                        className="hover:text-gray-400 border-b border-slate-600"
                      >
                        {item.name}
                      </button>
                    )
                )}
              </ul>
            )}
          </div>

          {/* //-------------------------------PATRIMONIO NATURAL------------------------------------------ */}
          <div>
            <button
              className={`flex justify-between items-center w-full p-1 rounded-md shadow-md transition-colors duration-300 border-t border-b border-white ${
                activeCategory === "Patrimonio Natural"
                  ? "bg-white text-gray-900 hover:bg-gray-200"
                  : "hover:text-gray-400"
              }`}
              onClick={() => toggleCategory("Patrimonio Natural")}
            >
              <div
                className={`w-10 h-10 rounded-3xl flex justify-center items-center ${
                  activeCategory === "Patrimonio Natural"
                    ? "bg-[#6FD38B] text-white"
                    : "hover:text-gray-400"
                }`}
              >
                <TreePalm />
              </div>

              <span>Patrimonio Natural</span>
              <svg
                className={`h-6 w-6 transition-transform duration-300 ${
                  activeCategory === "Patrimonio Natural"
                    ? "transform rotate-180"
                    : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {activeCategory === "Patrimonio Natural" && (
              <div className="ml-4 mt-2 space-y-2">
                <button
                  className={`flex justify-between items-center w-full hover:text-gray-400 ${
                    activeSubCategory === "De Naturaleza" ? "text-gray-400" : ""
                  }`}
                  onClick={() => toggleSubCategory("De Naturaleza")}
                >
                  <span>De Naturaleza</span>
                  <svg
                    className={`h-6 w-6 transition-transform duration-300 ${
                      activeSubCategory === "De Naturaleza"
                        ? "transform rotate-180"
                        : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {activeSubCategory === "De Naturaleza" && (
                  <ul className="transform text-white transition-all duration-500 ease-in-out delay-100 flex flex-col">
                    {P_natural.map(
                      (item) =>
                        item.subcategory === "De naturaleza" && (
                          <button
                            onClick={() => togglePlace(item.name)}
                            key={item.name}
                            href="#"
                            className="hover:text-gray-400 border-b border-slate-600"
                          >
                            {item.name}
                          </button>
                        )
                    )}
                  </ul>
                )}

                <button
                  className={`flex justify-between items-center w-full hover:text-gray-400 ${
                    activeSubCategory === "Recreacional" ? "text-gray-400" : ""
                  }`}
                  onClick={() => toggleSubCategory("Recreacional")}
                >
                  <span>Recreacional</span>
                  <svg
                    className={`h-6 w-6 transition-transform duration-300 ${
                      activeSubCategory === "Recreacional"
                        ? "transform rotate-180"
                        : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {activeSubCategory === "Recreacional" && (
                  <ul className="transform text-white transition-all duration-500 ease-in-out delay-100 flex flex-col">
                    {P_natural.map(
                      (item) =>
                        item.subcategory === "Recreacional" && (
                          <button
                            onClick={() => togglePlace(item.name)}
                            key={item.name}
                            href="#"
                            className="hover:text-gray-400 border-b border-slate-600"
                          >
                            {item.name}
                          </button>
                        )
                    )}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Contenido del sidebar */}

          {/* Botón para abrir la ventana modal */}
        </div>

        <div className="mt-5 md:mt-auto">
          <button
            className=" bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded"
            onClick={toggleModal}
          >
            Referencias
          </button>

          {/* Componente Modal */}
          <Modal isOpen={isModalOpen} onClose={toggleModal} />
        </div>
      </div>
    </div>
  );
};
export default MapSection;