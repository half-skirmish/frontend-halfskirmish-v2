'use client'

import photoData from "../../data/photoData.json";
import { useState, useEffect } from "react";
import Image from "next/image";

const Gallery = ({ photos, categories, activeCategory, onFilterChange, sortOrder, onSortChange }) => {
    return (
        <div className="p-4 sm:p-6 md:p-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-center text-white mt-16 mb-12">Photo Gallery</h1>
            
            {/* Filter & Sort Menus */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 mt-10">
                {/* Filter Menu */}
                <div className="relative">
                    <label htmlFor="category-select" className="sr-only">Filter by category</label>
                    <select
                        id="category-select"
                        value={activeCategory}
                        onChange={(e) => onFilterChange(e.target.value)}
                        className="appearance-none w-48 bg-gray-800 border border-gray-600 text-gray-200 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-gray-700 focus:border-[#5EFF7C] shadow cursor-pointer"
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
                {/* Sort Menu */}
                <div className="relative">
                    <label htmlFor="sort-select" className="sr-only">Sort by</label>
                    <select
                        id="sort-select"
                        value={sortOrder}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="appearance-none w-48 bg-gray-800 border border-gray-600 text-gray-200 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-gray-700 focus:border-[#5EFF7C] shadow cursor-pointer"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="author">Author</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {photos.map(photo => (
                    <a 
                        key={photo.id} 
                        href={`?id=${photo.id}`} 
                        className="group block bg-gray-800 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/20 border border-transparent hover:border-[#5EFF7C]"
                    >
                        <div className="relative w-full h-48">
                            <Image 
                                src={photo.thumbnailUrl} 
                                alt={photo.title} 
                                fill
                                className="object-cover"
                                onError={(e) => { e.target.src='https://placehold.co/400x400/cccccc/ffffff?text=Error'; }}
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-white group-hover:text-[#5EFF7C] transition-colors duration-300">{photo.title}</h3>
                            <p className="text-sm text-gray-400">by {photo.author}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

// --- Photo Detail Component ---
const PhotoDetail = ({ photo }) => {
    if (!photo) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-8">
                <h1 className="text-4xl font-bold text-red-500 mb-4">Photo Not Found</h1>
                <p className="text-lg text-gray-300 mb-8">
                Sorry, we couldn&apos;t find the photo you&apos;re looking for.
                </p>
                <a href="/photos" className="px-6 py-2 bg-[#5EFF7C] text-black font-bold rounded-lg shadow-md hover:bg-green-400 transition-colors">
                    ← Back to Gallery
                </a>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
            <a href="/photos" className="inline-block mb-6 px-4 py-2 bg-gray-700 text-gray-200 font-semibold rounded-lg hover:bg-gray-600 transition-colors">
                ← Back to Gallery
            </a>
            <div className="bg-gray-800 rounded-lg shadow-2xl shadow-green-500/20 overflow-hidden">
                <div className="relative w-full h-[500px]">
                    <Image 
                        src={photo.imageUrl} 
                        alt={photo.title} 
                        fill
                        className="object-cover"
                        onError={(e) => { e.target.src='https://placehold.co/1200x800/cccccc/ffffff?text=Image+Not+Found'; }}
                    />
                </div>
                <div className="p-6 md:p-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{photo.title}</h1>
                    <p className="text-gray-300 text-base leading-relaxed">{photo.description}</p>
                </div>
            </div>
        </div>
    );
};

// --- Main Photos Component ---
function Photos() {
    const [allPhotos, setAllPhotos] = useState([]);
    const [currentPhotoId, setCurrentPhotoId] = useState(null);
    const [activeCategory, setActiveCategory] = useState('All');
    const [sortOrder, setSortOrder] = useState('newest'); 

    useEffect(() => {
        setAllPhotos(photoData);
        
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if (id) {
            setCurrentPhotoId(parseInt(id, 10));
        }
    }, []);

    const selectedPhoto = allPhotos.find(p => p.id === currentPhotoId);
    const categories = ['All', ...new Set(allPhotos.map(p => p.category))];

    const filteredPhotos = activeCategory === 'All'
        ? allPhotos
        : allPhotos.filter(photo => photo.category === activeCategory);

    const sortedAndFilteredPhotos = [...filteredPhotos].sort((a, b) => {
        switch (sortOrder) {
            case 'oldest':
                return a.timestamp - b.timestamp;
            case 'author':
                return a.author.localeCompare(b.author);
            case 'newest':
            default:
                return b.timestamp - a.timestamp;
        }
    });

    return (
        <main className="bg-gray-900 text-white min-h-screen font-sans">
            {currentPhotoId ? (
                <PhotoDetail photo={selectedPhoto} />
            ) : (
                <Gallery 
                    photos={sortedAndFilteredPhotos}
                    categories={categories}
                    activeCategory={activeCategory}
                    onFilterChange={setActiveCategory}
                    sortOrder={sortOrder}
                    onSortChange={setSortOrder}
                />
            )}
        </main>
    );
}

export default Photos;
