"use client"
import React, { useState, useEffect } from 'react';
import { Calendar, User, Tag, Clock, AlertCircle, RefreshCw } from 'lucide-react';

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      // In API routes or getServerSideProps
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/get-all-blogs`);
      const data = await response.json();
      
      if (data.error) {
        setError(data.message || 'Failed to fetch blogs');
      } else {
        setBlogs(data.blogs || []);
      }
    } catch (err) {
      setError('Network error: Unable to fetch blogs');
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateContent = (content, maxLength = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const readingTime = Math.ceil(words / wordsPerMinute);
    return readingTime;
  };

  if (loading) {
    return (
      <div className="bg-gray-900 text-white min-h-screen font-sans flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5EFF7C] mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Loading blogs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 text-white min-h-screen font-sans flex items-center justify-center p-4">
        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="text-red-400 text-center mb-4">
            <AlertCircle className="w-16 h-16 mx-auto mb-4" />
          </div>
          <h3 className="text-xl font-bold text-white text-center mb-2">Error Loading Blogs</h3>
          <p className="text-gray-400 text-center mb-6">{error}</p>
          <button 
            onClick={fetchBlogs}
            className="w-full inline-flex items-center justify-center space-x-2 px-4 py-3 bg-gray-700 text-gray-200 font-semibold rounded-lg hover:bg-gray-600 hover:text-white transition-colors duration-300"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-30">
        {blogs.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-600 mb-6">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No blogs found</h3>
            <p className="text-gray-400 text-lg">Check back later for new content!</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {blogs.map((blog) => (
              <article 
                key={blog._id} 
                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:border-[#5EFF7C] transition-all duration-300 hover:shadow-green-500/20 group"
              >
                {/* Cover Image */}
                {blog.coverImageUrl ? (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={blog.coverImageUrl} 
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.style.display = 'none';
                      }}
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center">
                    <svg className="w-12 h-12 text-[#5EFF7C] opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.slice(0, 3).map((tag, index) => (
                        <span 
                          key={index} 
                          className="inline-flex items-center px-2 py-1 bg-gray-700 text-xs font-semibold text-[#5EFF7C] rounded-full"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                      {blog.tags.length > 3 && (
                        <span className="inline-flex items-center px-2 py-1 bg-gray-700 text-xs font-semibold text-gray-400 rounded-full">
                          +{blog.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-[#5EFF7C] cursor-pointer transition-colors duration-300">
                    {blog.title}
                  </h2>



                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6 pt-4 border-t border-gray-700">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1 text-[#5EFF7C]" />
                        <span className="text-gray-400">{blog.author.name}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-[#5EFF7C]" />
                        <span className="text-gray-400">{getReadingTime(blog.content)} min read</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1 text-[#5EFF7C]" />
                      <span className="text-gray-400">{formatDate(blog.createdAt)}</span>
                    </div>
                  </div>


                </div>
              </article>
            ))}
          </div>
        )}

        {/* Load More Button (if needed for pagination) */}
        {blogs.length > 0 && (
          <div className="text-center mt-12">
            <button className="inline-flex items-center space-x-2 px-8 py-3 bg-gray-800 border border-gray-700 text-gray-200 font-semibold rounded-lg hover:border-[#5EFF7C] hover:bg-gray-700 transition-all duration-300 hover:shadow-green-500/20">
              <span>Load More Articles</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Blog;