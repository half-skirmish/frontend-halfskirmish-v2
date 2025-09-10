// app/(navItems)/blog/[slug]/BlogPostClient.js
"use client"
import { useState } from 'react';

// Custom Image component with error handling
const SafeImage = ({ src, alt, width, height, className, priority, ...props }) => {
  const [imageError, setImageError] = useState(false);

  if (imageError || !src) {
    return (
      <div className={`bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center ${className}`} style={{height: height || '400px'}}>
        <svg className="w-16 h-16 text-[#5EFF7C] opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setImageError(true)}
      loading={priority ? "eager" : "lazy"}
      style={{width: '100%', height: 'auto'}}
      {...props}
    />
  );
};

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default function BlogPostClient({ initialBlog }) {
  const blog = initialBlog;
  
  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Section */}
        <header className="py-15">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {blog.title}
          </h1>
          
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-white mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center border border-[#5EFF7C]">
                <span className="text-sm font-medium">
                  {blog.author.name.charAt(0)}
                </span>
              </div>
              <span className="font-medium text-white">{blog.author.name}</span>
            </div>
            
            <span className="text-gray-600">•</span>
            
            <time dateTime={blog.createdAt} className="text-sm">
              {formatDate(blog.createdAt)}
            </time>
            
            {blog.updatedAt !== blog.createdAt && (
              <>
                <span className="text-gray-600">•</span>
                <span className="text-sm">
                  Updated {formatDate(blog.updatedAt)}
                </span>
              </>
            )}
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-800 border border-gray-700 text-[#5EFF7C] text-sm font-medium rounded-full hover:border-[#5EFF7C] transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>
        
        {/* Cover Image */}
        {blog.coverImageUrl && (
          <div className="mb-8 rounded-lg overflow-hidden shadow-lg border border-gray-700 hover:border-[#5EFF7C] transition-colors duration-300">
            <SafeImage
              src={blog.coverImageUrl}
              alt={blog.title}
              width={1200}
              height={600}
              className="w-full h-64 md:h-96 object-cover"
              priority
            />
          </div>
        )}
        
        {/* Content */}
        <div className="prose prose-lg prose-invert max-w-none">
          <div className="bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-700">
            <div className="text-gray-200 leading-relaxed whitespace-pre-wrap">
              {blog.content}
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center border-2 border-[#5EFF7C]">
                <span className="text-lg font-medium">
                  {blog.author.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium text-white">{blog.author.name}</p>
                <p className="text-sm text-gray-400">Author</p>
              </div>
            </div>
            
            <div className="text-sm text-gray-500">
              Published on {formatDate(blog.createdAt)}
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}