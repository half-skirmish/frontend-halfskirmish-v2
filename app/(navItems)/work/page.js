
const timelineData = [
  {
    year: '2021',
    title: 'Project Alpha Launch',
    description: 'Successfully launched Project Alpha, a groundbreaking initiative in machine learning that exceeded all initial performance benchmarks.',
    imageUrl: 'https://placehold.co/150x150/1a202c/5eff7c?text=Alpha',
  },
  {
    year: '2019',
    title: 'New Partnership',
    description: 'Formed a strategic partnership with a leading tech company, expanding our market reach and collaborative capabilities.',
    imageUrl: 'https://placehold.co/150x150/1a202c/5eff7c?text=Partner',
  },
  {
    year: '2017',
    title: 'Series B Funding',
    description: 'Secured $20 million in Series B funding, enabling us to scale our operations and invest in new research and development.',
    imageUrl: 'https://placehold.co/150x150/1a202c/5eff7c?text=Funding',
  },
  {
    year: '2015',
    title: 'Company Founded',
    description: 'The journey began. Our company was founded with a mission to innovate and disrupt the technology sector.',
    imageUrl: 'https://placehold.co/150x150/1a202c/5eff7c?text=Founded',
  },
  {
    year: '2012',
    title: 'Initial Research Phase',
    description: 'The foundational ideas were born. This period was dedicated to intensive research and developing the core concepts that would later define our products.',
    imageUrl: 'https://placehold.co/150x150/1a202c/5eff7c?text=Research',
  },
];

// Individual Timeline Item Component
const TimelineItem = ({ data, index }) => (
    <div className="mb-8 flex justify-between items-center w-full group">
        {/* Alternating layout for left and right alignment */}
        {index % 2 === 0 ? (
            <>
                {/* Left Side: Content Box */}
                <div className="order-1 w-5/12">
                    <div className="p-4 bg-gray-800 rounded-lg shadow-lg shadow-green-500/10 transition-transform duration-500 ease-in-out transform group-hover:scale-105">
                        <p className="text-sm font-medium text-[#5EFF7C] mb-2">{data.year}</p>
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold text-white flex-grow pr-4">{data.title}</h3>
                            <img src={data.imageUrl} alt={data.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                        </div>
                        {/* Hidden description revealed on hover */}
                        <p className="text-sm leading-snug tracking-wide text-gray-300 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-screen transition-all duration-700 ease-in-out mt-3">
                            {data.description}
                        </p>
                    </div>
                </div>
                {/* Center: Circle and Line */}
                <div className="z-10 flex items-center order-1 bg-[#5EFF7C] w-8 h-8 rounded-full">
                    <div className="mx-auto font-semibold text-lg text-black transition-transform duration-500 ease-in-out transform group-hover:rotate-45">+</div>
                </div>
                {/* Right Side: Empty placeholder for alignment */}
                <div className="order-1 w-5/12"></div>
            </>
        ) : (
            <>
                {/* Left Side: Empty placeholder for alignment */}
                <div className="order-1 w-5/12"></div>
                {/* Center: Circle and Line */}
                <div className="z-10 flex items-center order-1 bg-[#5EFF7C] shadow-xl w-8 h-8 rounded-full">
                    <div className="mx-auto font-semibold text-lg text-black transition-transform duration-500 ease-in-out transform group-hover:rotate-45">+</div>
                </div>
                {/* Right Side: Content Box */}
                <div className="order-1 w-5/12">
                     <div className="p-4 bg-gray-800 rounded-lg shadow-lg shadow-green-500/10 transition-transform duration-500 ease-in-out transform group-hover:scale-105">
                        <p className="text-sm font-medium text-[#5EFF7C] mb-2">{data.year}</p>
                        <div className="flex justify-between items-center">
                             <h3 className="text-lg font-bold text-white flex-grow pr-4">{data.title}</h3>
                             <img src={data.imageUrl} alt={data.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                        </div>
                        {/* Hidden description revealed on hover */}
                        <p className="text-sm leading-snug tracking-wide text-gray-300 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-screen transition-all duration-700 ease-in-out mt-3">
                            {data.description}
                        </p>
                    </div>
                </div>
            </>
        )}
    </div>
);


// Main Timeline Component for a standard React app
const Work = () => {
  return (
    <div className="bg-gray-900 text-white font-sans min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto w-full h-full">
        <div className="relative wrap overflow-hidden p-4 md:p-10 h-full">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-white mt-8 mb-12">
            My Work Experience
          </h1>
          {/* The vertical line */}
          <div className="border-2-2 absolute border-opacity-20 border-gray-400 h-full border" style={{ left: '50%' }}></div>

          {/* Mapping through the data to create timeline items */}
          {timelineData.map((data, idx) => (
            <TimelineItem data={data} index={idx} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
