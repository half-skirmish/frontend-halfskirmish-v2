// app/(navItems)/blog/[slug]/page.js
import { notFound } from 'next/navigation';
import Image from 'next/image';

async function getBlogPost(slug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/${slug}`, {
      cache: 'no-store', // or 'force-cache' depending on your needs
    });
    
    if (!res.ok) {
      return null;
    }
    
    const data = await res.json();
    
    if (data.error || !data.blog) {
      return null;
    }
    
    return data.blog;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export async function generateMetadata({ params }) {
  const blog = await getBlogPost(params.slug);
  
  if (!blog) {
    return {
      title: 'Blog Post Not Found'
    };
  }
  
  return {
    title: blog.title,
    description: blog.content.substring(0, 160) + '...',
    openGraph: {
      title: blog.title,
      description: blog.content.substring(0, 160) + '...',
      images: [blog.coverImageUrl],
    },
  };
}

export default async function BlogPost({ params }) {
  const blog = await getBlogPost(params.slug);
  
  if (!blog) {
    notFound();
  }
  
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
            <Image
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