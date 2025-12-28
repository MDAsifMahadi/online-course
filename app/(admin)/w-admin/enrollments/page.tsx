'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Trash2, AlertCircle, CheckCircle2, Phone, Mail, Calendar, BookOpen } from 'lucide-react';

interface Enrollment {
    id: number;
    name: string;
    phone: string;
    email: string;
    course?: string;
    createdAt: string;
}

export default function EnrollmentsPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/w-admin/login');
        } else {
            setIsAuthenticated(true);
            fetchEnrollments();
        }
    }, [router]);

    const fetchEnrollments = async () => {
        try {
            const response = await fetch('/api/enrollments');
            const data = await response.json();

            if (data.success) {
                setEnrollments(data.enrollments);
            }
        } catch (error) {
            console.error('Error fetching enrollments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('আপনি কি এই এনরোলমেন্ট ডিলিট করতে চান?')) return;

        try {
            const response = await fetch(`/api/enrollments?id=${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.success) {
                setMessage({ type: 'success', text: 'এনরোলমেন্ট ডিলিট হয়েছে!' });
                fetchEnrollments();
            } else {
                setMessage({ type: 'error', text: data.error || 'ডিলিট করতে সমস্যা হয়েছে' });
            }
        } catch (error) {
            console.error('Error deleting enrollment:', error);
            setMessage({ type: 'error', text: 'ডিলিট করতে সমস্যা হয়েছে' });
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }) + ' ' + date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (!isAuthenticated || loading) {
        return (
            <div className="p-6 lg:p-10 flex items-center justify-center">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-10">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Enrollments</h1>
                <p className="text-gray-600">View all course enrollment submissions</p>
            </div>

            {/* Message Alert */}
            {message && (
                <div
                    className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${message.type === 'success'
                            ? 'bg-green-50 text-green-800 border border-green-200'
                            : 'bg-red-50 text-red-800 border border-red-200'
                        }`}
                >
                    {message.type === 'success' ? (
                        <CheckCircle2 size={20} />
                    ) : (
                        <AlertCircle size={20} />
                    )}
                    <span>{message.text}</span>
                </div>
            )}

            {/* Stats Card */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl shadow-lg p-6 mb-8 text-white">
                <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                        <Users size={32} />
                    </div>
                    <div>
                        <p className="text-purple-100 text-sm">Total Enrollments</p>
                        <p className="text-4xl font-bold">{enrollments.length}</p>
                    </div>
                </div>
            </div>

            {/* Enrollments Grid */}
            {enrollments.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-8 text-center border border-gray-100">
                    <Users className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-500 text-lg">No enrollments yet</p>
                    <p className="text-gray-400 text-sm mt-2">
                        Enrollment submissions will appear here
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {enrollments.map((enrollment) => (
                        <div
                            key={enrollment.id}
                            className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-purple-100 p-2 rounded-lg">
                                        <Users className="text-purple-600" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{enrollment.name}</h3>
                                    </div>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="space-y-3 mb-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Phone size={16} className="text-purple-600" />
                                    <span>{enrollment.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Mail size={16} className="text-purple-600" />
                                    <span className="truncate">{enrollment.email}</span>
                                </div>
                                {enrollment.course && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <BookOpen size={16} className="text-purple-600" />
                                        <span>{enrollment.course}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Calendar size={16} className="text-gray-400" />
                                    <span>{formatDate(enrollment.createdAt)}</span>
                                </div>
                            </div>

                            {/* Delete Button */}
                            <button
                                onClick={() => handleDelete(enrollment.id)}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
                            >
                                <Trash2 size={18} />
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
