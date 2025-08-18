import React from "react";
import timelineData from "../../data/timelineData.json";

const TimelineItem = ({ data, index, totalItems }) => {
  const shouldPinToBottom = index >= totalItems - 2;
  const isLast = index === totalItems - 1;

  return (
    <div className="flex min-h-[150px] group">
      {/* Timeline Gutter: Circle and Line */}
      <div className="flex flex-col items-center mr-6">
        <div className="z-10 flex items-center justify-center bg-[#5EFF7C] w-8 h-8 rounded-full flex-shrink-0">
          <div className="mx-auto font-semibold text-lg text-black transition-transform duration-500 ease-in-out transform cursor-crosshair group-hover:rotate-45">
            +
          </div>
        </div>
        {!isLast && <div className="w-0.5 h-full bg-gray-400 bg-opacity-20 mt-2"></div>}
      </div>

      {/* Content */}
      <div className="relative flex-1 pb-8">
        <div className="p-4 bg-gray-800 rounded-lg shadow-lg shadow-green-500/10 transition-transform cursor-crosshair duration-500 ease-in-out transform group-hover:scale-105">
          <p className="text-sm font-medium text-[#5EFF7C] mb-2">{data.year}</p>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-white flex-grow pr-4">{data.title}</h3>
            <img
              src={data.imageUrl}
              alt={data.title}
              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            />
          </div>
        </div>

        {/* Description on hover */}
        <div
          className={`absolute ${
            shouldPinToBottom ? "bottom-8" : "top-0"
          } left-full ml-6 w-80 p-4 bg-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-20`}
        >
          <img
            src={data.descriptionImageUrl}
            alt={`${data.title} description`}
            className="w-full h-auto rounded-md mb-3"
          />
          <p className="text-sm text-gray-300">{data.description}</p>
        </div>
      </div>
    </div>
  );
};

const Work = () => {
  // Optional: sort by year descending if you want latest first
  const sortedTimeline = [...timelineData].sort((a, b) => b.year - a.year);

  return (
    <div className="bg-gray-900 text-white font-sans min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto w-full h-full">
        <div className="p-4 md:p-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-white mt-8 mb-16">
            Learnings and Work Experiences
          </h1>

          <div className="relative max-w-lg">
            {sortedTimeline.map((data, idx) => (
              <TimelineItem
                data={data}
                key={`${data.year}-${data.title}`}
                index={idx}
                totalItems={sortedTimeline.length}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
