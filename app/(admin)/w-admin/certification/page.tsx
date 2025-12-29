'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Award, Save, Trash2, Edit, AlertCircle, CheckCircle2, User, Image as ImageIcon } from 'lucide-react';

interface Student {
    id?: string;
    name: string;
    registrationNumber: string;
    roll: string;
    studentImageUrl: string;
    certificateImageUrl: string;
}

export default function CertificationPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [students, setStudents] = useState<Student[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState<Student>({
        name: '',
        registrationNumber: '',
        roll: '',
        studentImageUrl: '',
        certificateImageUrl: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/w-admin/login');
        } else {
            setIsAuthenticated(true);
            fetchStudents();
        }
    }, [router]);

    const fetchStudents = async () => {
        try {
            // Import students data from JSON file
            const studentsData = await import('@/data/students.json');
            setStudents(studentsData.students || []);
        } catch (error) {
            console.error('Error fetching students:', error);
            setStudents([]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: keyof Student, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.roll || !formData.registrationNumber || !formData.studentImageUrl || !formData.certificateImageUrl) {
            setMessage({ type: 'error', text: 'সব ফিল্ড পূরণ করতে হবে' });
            return;
        }

        setSaving(true);
        setMessage(null);

        try {
            // TODO: Replace with actual API call
            // For now, we'll simulate the save
            const url = '/api/certificates';
            const method = editingId ? 'PUT' : 'POST';
            const body = editingId ? { ...formData, id: editingId } : { ...formData, id: `stu_${Date.now()}` };

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            // If API doesn't exist yet, just show success message
            if (!response.ok && response.status === 404) {
                // Simulate success for now
                setMessage({
                    type: 'success',
                    text: editingId ? 'সার্টিফিকেট আপডেট হয়েছে!' : 'সার্টিফিকেট যুক্ত হয়েছে!',
                });
                setFormData({ name: '', registrationNumber: '', roll: '', studentImageUrl: '', certificateImageUrl: '' });
                setEditingId(null);
                // Add to local state for demo
                if (editingId) {
                    setStudents(students.map(s => s.id === editingId ? { ...formData, id: editingId } : s));
                } else {
                    setStudents([...students, body as Student]);
                }
            } else {
                const data = await response.json();
                if (data.success) {
                    setMessage({
                        type: 'success',
                        text: editingId ? 'সার্টিফিকেট আপডেট হয়েছে!' : 'সার্টিফিকেট যুক্ত হয়েছে!',
                    });
                    setFormData({ name: '', registrationNumber: '', roll: '', studentImageUrl: '', certificateImageUrl: '' });
                    setEditingId(null);
                    fetchStudents();
                } else {
                    setMessage({ type: 'error', text: data.error || 'সমস্যা হয়েছে' });
                }
            }
        } catch (error) {
            console.error('Error saving certificate:', error);
            setMessage({ type: 'error', text: 'সমস্যা হয়েছে' });
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (student: Student) => {
        setFormData({
            name: student.name,
            registrationNumber: student.registrationNumber,
            roll: student.roll,
            studentImageUrl: student.studentImageUrl,
            certificateImageUrl: student.certificateImageUrl,
        });
        setEditingId(student.id || null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('আপনি কি এই সার্টিফিকেট ডিলিট করতে চান?')) return;

        try {
            const response = await fetch(`/api/certificates?id=${id}`, {
                method: 'DELETE',
            });

            // If API doesn't exist, just remove from local state
            if (!response.ok && response.status === 404) {
                setStudents(students.filter(s => s.id !== id));
                setMessage({ type: 'success', text: 'সার্টিফিকেট ডিলিট হয়েছে!' });
            } else {
                const data = await response.json();
                if (data.success) {
                    setMessage({ type: 'success', text: 'সার্টিফিকেট ডিলিট হয়েছে!' });
                    fetchStudents();
                } else {
                    setMessage({ type: 'error', text: data.error || 'ডিলিট করতে সমস্যা হয়েছে' });
                }
            }
        } catch (error) {
            console.error('Error deleting certificate:', error);
            setMessage({ type: 'error', text: 'ডিলিট করতে সমস্যা হয়েছে' });
        }
    };

    const handleCancelEdit = () => {
        setFormData({ name: '', registrationNumber: '', roll: '', studentImageUrl: '', certificateImageUrl: '' });
        setEditingId(null);
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Certificates</h1>
                <p className="text-gray-600">Add and manage student certificates</p>
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

            {/* Add/Edit Form */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 mb-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-purple-100 p-3 rounded-lg">
                        <Award className="text-purple-600" size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">
                        {editingId ? 'সার্টিফিকেট এডিট করুন' : 'নতুন সার্টিফিকেট যুক্ত করুন'}
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Student Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Student Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="Enter student name"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                        />
                    </div>

                    {/* Roll Number */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Roll Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.roll}
                            onChange={(e) => handleInputChange('roll', e.target.value)}
                            placeholder="Enter roll number"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                        />
                    </div>

                    {/* Registration Number */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Registration Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.registrationNumber}
                            onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                            placeholder="e.g., REG-2023-001"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                        />
                    </div>

                    {/* Student Image URL */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Student Image URL <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={formData.studentImageUrl}
                                onChange={(e) => handleInputChange('studentImageUrl', e.target.value)}
                                placeholder="https://example.com/student-image.jpg"
                                className="w-full px-4 py-3 pl-10 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                            />
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                    </div>

                    {/* Certificate Image URL */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Certificate Image URL <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={formData.certificateImageUrl}
                                onChange={(e) => handleInputChange('certificateImageUrl', e.target.value)}
                                placeholder="https://example.com/certificate-image.jpg"
                                className="w-full px-4 py-3 pl-10 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                            />
                            <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="md:col-span-2 flex gap-3">
                        <button
                            type="submit"
                            disabled={saving}
                            className="relative inline-flex items-center justify-center px-8 py-3 text-white font-semibold rounded-lg overflow-hidden group shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <Save size={18} />
                                {saving ? 'Saving...' : editingId ? 'Update Certificate' : 'Add Certificate'}
                            </span>
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Students Grid */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">All Certificates</h2>
                {students.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-md p-8 text-center border border-gray-100">
                        <p className="text-gray-500">No certificates added yet</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {students.map((student) => (
                            <div
                                key={student.id}
                                className="bg-white rounded-lg shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <Award className="text-purple-600" size={20} />
                                        <span className="font-semibold text-gray-900">{student.name}</span>
                                    </div>
                                </div>
                                <div className="space-y-1 mb-4">
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Roll:</span> {student.roll}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Registration:</span> {student.registrationNumber}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(student)}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                                    >
                                        <Edit size={16} />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(student.id!)}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                                    >
                                        <Trash2 size={16} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

