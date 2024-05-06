import React from 'react';

import Footer from "./Footer"
import Navbar from "./NavbarAbout";
import AboutProject from "./About";
const about = () => {
  return (
    <div className='overflow-hidden'>
      <Navbar/>
      <AboutProject/>
      <Footer/>
      
    </div>
  );
};

export default about;