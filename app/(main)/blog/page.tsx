import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import blogsData from '@/data/blogs.json';

export const metadata = {
    title: 'Blog - Online Course',
    description: 'Read our latest articles and news.',
};

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 md:mb-16">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                        Our Latest <span className="text-purple-600">Blogs</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Stay updated with the latest trends in technology, education, and career development.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogsData.map((blog) => (
                        <div
                            key={blog.id}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100"
                        >
                            <div className="relative h-56 w-full group overflow-hidden">
                                {/* Using standard img for external URLs if Next/Image domain not configured, or configure generic loader if needed. 
                     Assuming external images might not be configured in next.config.ts, but standard next/image is preferred.
                     If it fails, user will notify. Using Next Image with unoptimized for now to be safe with external URLs if domain not allowed.
                 */}
                                <Image
                                    src={blog.image_url}
                                    alt={blog.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    unoptimized // Simplest way to handle external URLs without config changes
                                />
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="mb-4">
                                    <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-purple-600 transition-colors">
                                        <Link href={`/blog/${blog.id}`}>
                                            {blog.title}
                                        </Link>
                                    </h2>
                                    <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                                        {blog.main_block}
                                    </p>
                                </div>

                                <div className="mt-auto pt-4 border-t border-gray-100">
                                    <Link
                                        href={`/blog/${blog.id}`}
                                        className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700 transition-colors group"
                                    >
                                        Read Full Story
                                        <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
