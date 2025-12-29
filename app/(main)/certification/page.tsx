"use client";

import React, { useState, Suspense } from "react";
import { Search, GraduationCap } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import studentsData from "@/data/students.json";

interface Student {
    id: string;
    name: string;
    registrationNumber: string;
    roll: string;
    studentImageUrl: string;
    certificateImageUrl: string;
}

function CertificationPageContent() {
    const searchParams = useSearchParams();
    const rollParam = searchParams.get('roll');

    const [query, setQuery] = useState(rollParam || "");
    const students: Student[] = studentsData.students;

    // Filter students based on search query
    const filteredStudents = students.filter((student) => {
        if (!query.trim()) return true;
        const searchTerm = query.toLowerCase().trim();
        return (
            student.name.toLowerCase().includes(searchTerm) ||
            student.roll.toLowerCase().includes(searchTerm) ||
            student.registrationNumber.toLowerCase().includes(searchTerm)
        );
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <div className="mx-auto h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                        <GraduationCap className="h-8 w-8 text-purple-600" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Certification
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        View certificates of students who have completed their courses.
                    </p>
                </div>

                {/* Search Box */}
                <div className="max-w-2xl mx-auto mb-12">
                    <form onSubmit={handleSearch} className="space-y-4">
                        <div className="relative">
                            <input
                                type="text"
                                className="appearance-none rounded-lg relative block w-full px-4 py-3 pl-12 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm transition-colors"
                                placeholder="Search by Name, Roll Number, or Registration Number"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                    </form>
                </div>

                {/* Student Cards Grid */}
                {filteredStudents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredStudents.map((student) => (
                            <div
                                key={student.id}
                                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                            >
                                {/* Student Info Section */}
                                <div className="p-4 border-b border-gray-100">
                                    <div className="flex items-center gap-3 mb-3">
                                        {/* Student Image */}
                                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-purple-200 flex-shrink-0">
                                            <Image
                                                src={student.studentImageUrl || "/images/profile.jpg"}
                                                alt={student.name}
                                                fill
                                                className="object-cover"
                                                onError={(e) => {
                                                    // Fallback to default image if error
                                                    (e.target as HTMLImageElement).src = "/images/profile.jpg";
                                                }}
                                            />
                                        </div>
                                        {/* Name and Roll */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg font-bold text-gray-900 truncate">
                                                {student.name}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Roll: <span className="font-semibold">{student.roll}</span>
                                            </p>
                                        </div>
                                    </div>
                                    {/* Registration Number */}
                                    <div className="mt-2 pt-2 border-t border-gray-100">
                                        <p className="text-sm text-gray-500">
                                            Registration: <span className="font-semibold text-gray-700">{student.registrationNumber}</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Certificate Image */}
                                <div className="relative w-full h-64 bg-gray-100">
                                    <Image
                                        src={student.certificateImageUrl || "/images/certificate-placeholder.jpg"}
                                        alt={`${student.name}'s Certificate`}
                                        fill
                                        className="object-contain"
                                        onError={(e) => {
                                            // Fallback to placeholder if error
                                            (e.target as HTMLImageElement).src = "/images/certificate-placeholder.jpg";
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">
                            No certificates found matching your search.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function CertificationPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-gray-600">Loading...</div>
            </div>
        }>
            <CertificationPageContent />
        </Suspense>
    );
}
