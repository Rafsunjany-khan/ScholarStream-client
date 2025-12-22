import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const stories = [
  { id: 1, name: "Alice Johnson", image: "https://randomuser.me/api/portraits/women/1.jpg", text: "I got a scholarship that completely changed my life. I can now study abroad without any financial worries. The support I received allowed me to focus entirely on my academics and personal growth." },
  { id: 2, name: "Bob Smith", image: "https://randomuser.me/api/portraits/men/2.jpg", text: "Thanks to this platform, I secured funding for my computer science degree and gained real confidence. I was able to attend workshops, seminars, and networking events that enriched my career path." },
  { id: 3, name: "Catherine Lee", image: "https://randomuser.me/api/portraits/women/3.jpg", text: "I never thought studying abroad was possible, but now I am living my dream and learning new cultures. Every experience, from lectures to travel, has expanded my horizons." },
  { id: 4, name: "David Kim", image: "https://randomuser.me/api/portraits/men/4.jpg", text: "The scholarship helped me focus on my studies without worrying about tuition fees. Truly life-changing. I also joined clubs and participated in research projects that shaped my future." },
  { id: 5, name: "Eva Green", image: "https://randomuser.me/api/portraits/women/5.jpg", text: "I was able to pursue my dream course thanks to this platform. My career has completely transformed. I even had the chance to intern at top companies thanks to the opportunities it provided." },
  { id: 6, name: "Frank Brown", image: "https://randomuser.me/api/portraits/men/6.jpg", text: "Securing a scholarship here was smooth and transparent. Highly recommend to anyone looking for funding. The guidance and tips from previous students were extremely helpful." },
  { id: 7, name: "Grace Wilson", image: "https://randomuser.me/api/portraits/women/7.jpg", text: "This scholarship allowed me to focus on what really matters: learning and growing professionally. I am now confident in pursuing my dream job with the skills and knowledge I've gained." },
];

const SuccessStories = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
      setStartIndex(0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = stories.length - itemsPerView;

  const prev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const next = () => {
    if (startIndex < maxIndex) setStartIndex(startIndex + 1);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-12 px-2">
      <button
        onClick={prev}
        disabled={startIndex === 0}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full text-white
          ${startIndex === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}>
        <FaChevronLeft />
      </button>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${startIndex * (100 / itemsPerView)}%)`,
          }} >
          {stories.map((story) => (
            <div
              key={story.id}
              className="flex-none w-full sm:w-1/2 lg:w-1/3 p-4" >
              <div className="border rounded-lg p-5 shadow-md bg-white h-full flex flex-col">
                <div className="flex items-center mb-3">
                  <img src={story.image} alt={story.name}
                    className="w-12 h-12 rounded-full mr-3" />
                  <span className="font-semibold">{story.name}</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {story.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={next}
        disabled={startIndex >= maxIndex}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full text-white
          ${startIndex >= maxIndex ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default SuccessStories;
