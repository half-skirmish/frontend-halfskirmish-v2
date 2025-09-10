// app/(navItems)/blog/[slug]/loading.js
export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <header className="mb-8 animate-pulse">
          <div className="h-12 bg-gray-300 rounded mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          
          {/* Meta Information Skeleton */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
          
          {/* Tags Skeleton */}
          <div className="flex gap-2 mb-6">
            <div className="h-6 bg-gray-200 rounded-full w-16"></div>
            <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            <div className="h-6 bg-gray-200 rounded-full w-24"></div>
          </div>
        </header>
        
        {/* Cover Image Skeleton */}
        <div className="mb-8 rounded-lg overflow-hidden">
          <div className="w-full h-64 md:h-96 bg-gray-300 animate-pulse"></div>
        </div>
        
        {/* Content Skeleton */}
        <div className="bg-white rounded-lg p-8 shadow-sm border animate-pulse">
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}