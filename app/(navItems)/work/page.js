"use client";
import React from "react";
import Image from "next/image";
import timelineData from "../../data/timelineData.json";

const monthOrder = {
  Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
  Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
};

// Format date range or single year
const formatDate = (item) => {
  if (item.type === "period") {
    const endText = item.end ? `${item.end.month} ${item.end.year}` : "Present";
    return `${item.start.month} ${item.start.year} – ${endText}`;
  }
  if (item.type === "event") {
    return `${item.year}`;
  }
  return "";
};

const TimelineItem = ({ data, index, totalItems }) => {
  const shouldPinToBottom = index >= totalItems - 2;
  const isLast = index === totalItems - 1;

  return (
    <div className="flex min-h-[150px] group">
      {/* Timeline Gutter */}
      <div className="flex flex-col items-center mr-6">
        <div className="z-10 flex items-center justify-center bg-[#5EFF7C] w-8 h-8 rounded-full flex-shrink-0">
          <div className="mx-auto font-semibold text-lg text-black transition-transform duration-500 ease-in-out transform cursor-crosshair group-hover:rotate-45">
            +
          </div>
        </div>
        {!isLast && (
          <div className="w-0.5 h-full bg-gray-400 bg-opacity-20 mt-2"></div>
        )}
      </div>

      {/* Content */}
      <div className="relative flex-1 pb-8">
        <div className="p-4 bg-gray-800 hover:border border-[#5EFF7C] rounded-lg shadow-lg shadow-green-500/10 transition-transform cursor-crosshair duration-500 ease-in-out transform group-hover:scale-105">
          <p className="text-sm font-medium text-white mb-2">
            {formatDate(data)}
          </p>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-white flex-grow pr-4">
              {data.title}
            </h3>
            <Image
              src={data.imageUrl}
              alt={data.title}
              width={64}
              height={64}
              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            />
          </div>
        </div>

        {/* Description on hover (no image now) */}
        <div
          className={`absolute ${
            shouldPinToBottom ? "bottom-8" : "top-0"
          } left-full ml-6 w-80 p-4 bg-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-20`}
        >
          <p className="text-sm text-gray-300">{data.description}</p>
        </div>
      </div>
    </div>
  );
};

const Work = () => {
  // Sorting by start date (period) or year (event)
  const sortedTimeline = [...timelineData].sort((a, b) => {
    const aYear = a.type === "period" ? a.start.year : a.year;
    const bYear = b.type === "period" ? b.start.year : b.year;

    if (aYear !== bYear) return bYear - aYear;

    const aMonth = a.type === "period" ? monthOrder[a.start.month] : 1;
    const bMonth = b.type === "period" ? monthOrder[b.start.month] : 1;

    return bMonth - aMonth;
  });

  return (
    <div className="bg-gray-900 text-white font-sans min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto w-full h-full">
        <div className="p-4 md:p-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-white mt-16 sm:mt-8 mb-16">
            Learnings and Work Experiences
          </h1>

          {/* Timeline Centered on desktop, full width on mobile */}
          <div className="relative w-full max-w-full md:max-w-lg mx-auto">
            {sortedTimeline.map((data, idx) => (
              <TimelineItem
                data={data}
                key={`${formatDate(data)}-${data.title}`}
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
