import React from "react";

const Banner = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-50 to-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-6 min-h-[400px] md:min-h-[450px]">

        <div className="flex-1 flex flex-col justify-center md:pl-12 lg:pl-20">
          <h3 className="text-3xl md:text-5xl font-extrabold text-black leading-tight">
           Find <span className="text-blue-700">Scholarships</span><br /> for College
          </h3>

          <ul className="mt-6 space-y-2 text-base md:text-lg">
            <li className="flex items-center gap-2">
              <i className="fas fa-graduation-cap text-blue-500"></i>
              Scholarships for <span className="font-bold">every type</span> of student
            </li>
            <li className="flex items-center gap-2">
              <i className="fas fa-check-circle text-green-500"></i>
              <span className="font-bold">100%</span> free
            </li>
            <li className="flex items-center gap-2">
              <i className="fas fa-star text-yellow-500"></i>
              <span className="font-bold">Vetted</span> scholarship opportunities
            </li>
          </ul>

          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 rounded-lg shadow-md text-xl font-bold mt-10 inline-block w-max">
            Find Scholarship Now
          </button>
        </div>


        <div className="flex-1 flex justify-end relative">
          <img
            src="/assets/images/banner.png"
            alt="Scholarship Banner"
            className="absolute bottom-0 right-0 max-h-[500px] md:max-h-[550px] object-contain"/>
        </div>

      </div>
    </section>
  );
};

export default Banner;
