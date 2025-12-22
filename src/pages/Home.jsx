import React from "react";
import Banner from "../components/Banner";
import TopScholarships from "../components/TopScholarships";
import SuccessStories from "../components/SuccessStories";
import ContactSection from "../components/ContactUs";

const Home = () => {
  return (
    <div>
      <Banner />
      <TopScholarships />
      <SuccessStories />
      <ContactSection />
    </div>
  );
};

export default Home;
