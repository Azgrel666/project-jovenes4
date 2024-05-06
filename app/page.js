import Image from "next/image";
import Navbar from "./_components/Navbar";
import HeroSection from "./_components/HeroSection"
import Footer from "./_components/Footer"
import MapSection from "./_components/MapSection"
export default function Home() {
  return (
    
    <div className="overflow-hidden">
      <Navbar/>
      <HeroSection/>
      <MapSection/>
      <Footer/>
    </div>
  );
}
