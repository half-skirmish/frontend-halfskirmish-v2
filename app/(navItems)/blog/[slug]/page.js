// app/(navItems)/blog/[slug]/page.js
import { notFound } from 'next/navigation';
import BlogPostClient from './BlogPostClient';

async function getBlogPost(slug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/${slug}`, {
      cache: 'no-store',
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
  
  return <BlogPostClient initialBlog={blog} />;
}