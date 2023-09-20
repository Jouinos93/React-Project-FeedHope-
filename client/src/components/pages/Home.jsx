import React from 'react';
import Navbar from '../Navbar';
import MainSection from '../MainSection';
import HowtoHelp from '../HowtoHelp';
import TeamSection from '../TeamSection';
import FoodPartnersSection from '../FoodPartnersSection';
import Footer from '../Footer';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <MainSection />
      <HowtoHelp />
      <TeamSection />
      <FoodPartnersSection />
      <Footer />
    </div>
  );
};

export default HomePage;
