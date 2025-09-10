// app/(navItems)/blog/[slug]/page.js
import { notFound } from 'next/navigation';
import Image from 'next/image';

async function getBlogPost(slug) {
  try {
    const res = await fetch(`http://localhost:5000/blog/${slug}`, {
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
    <div className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {blog.title}
          </h1>
          
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">
                  {blog.author.name.charAt(0)}
                </span>
              </div>
              <span className="font-medium">{blog.author.name}</span>
            </div>
            
            <span className="text-gray-400">•</span>
            
            <time dateTime={blog.createdAt} className="text-sm">
              {formatDate(blog.createdAt)}
            </time>
            
            {blog.updatedAt !== blog.createdAt && (
              <>
                <span className="text-gray-400">•</span>
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
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>
        
        {/* Cover Image */}
        {blog.coverImageUrl && (
          <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
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
        <div className="prose prose-lg prose-gray max-w-none">
          <div className="bg-white rounded-lg p-8 shadow-sm border">
            <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {blog.content}
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-lg font-medium text-gray-700">
                  {blog.author.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{blog.author.name}</p>
                <p className="text-sm text-gray-600">Author</p>
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