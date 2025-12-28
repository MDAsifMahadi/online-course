"use client";

import { Phone, Mail, Send, UserCircle2 } from "lucide-react";
import { useState } from "react";

const EnrollPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Form submission logic will be added later
        console.log("Form submitted:", formData);
        alert("আপনার তথ্য সফলভাবে জমা হয়েছে! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।");
        setFormData({ name: "", phone: "", email: "" });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 py-12 px-4">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-purple-600">কোর্সে</span>{" "}
                        <span className="text-gray-900">ভর্তি হন</span>
                    </h1>
                    <p className="text-lg text-gray-600">
                        আপনার তথ্য দিয়ে ফর্মটি পূরণ করুন এবং আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Enrollment Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-purple-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-purple-100 p-3 rounded-lg">
                                <UserCircle2 className="text-purple-600" size={28} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                ভর্তি ফর্ম
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Input */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    পূর্ণ নাম <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="আপনার পূর্ণ নাম লিখুন"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                                />
                            </div>

                            {/* Phone Input */}
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    ফোন নাম্বার <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    placeholder="+880 1XXX XXXXXX"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                                />
                            </div>

                            {/* Email Input */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    ইমেইল এড্রেস <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="example@email.com"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="relative w-full inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-lg overflow-hidden group shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-700 hover:via-purple-800 hover:to-purple-900"
                            >
                                {/* Shimmer Effect */}
                                <span
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"
                                    style={{
                                        width: "200%",
                                        height: "200%",
                                    }}
                                />

                                {/* Button Content */}
                                <span className="relative z-10 flex items-center gap-2">
                                    <Send size={20} />
                                    ফর্ম জমা দিন
                                </span>
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        {/* Contact Card */}
                        <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl shadow-xl p-8 md:p-10 text-white">
                            <h2 className="text-2xl font-bold mb-6">যোগাযোগ করুন</h2>
                            <p className="text-purple-100 mb-8">
                                কোন প্রশ্ন বা সাহায্যের প্রয়োজন হলে আমাদের সাথে যোগাযোগ করুন
                            </p>

                            <div className="space-y-6">
                                {/* Phone */}
                                <div className="flex items-start gap-4">
                                    <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">ফোন নাম্বার</h3>
                                        <a
                                            href="tel:+8801234567890"
                                            className="text-purple-100 hover:text-white transition-colors"
                                        >
                                            +880 1234 567890
                                        </a>
                                        <br />
                                        <a
                                            href="tel:+8801987654321"
                                            className="text-purple-100 hover:text-white transition-colors"
                                        >
                                            +880 1987 654321
                                        </a>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start gap-4">
                                    <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">ইমেইল</h3>
                                        <a
                                            href="mailto:info@example.com"
                                            className="text-purple-100 hover:text-white transition-colors"
                                        >
                                            info@example.com
                                        </a>
                                        <br />
                                        <a
                                            href="mailto:support@example.com"
                                            className="text-purple-100 hover:text-white transition-colors"
                                        >
                                            support@example.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info Card */}
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                কেন আমাদের সাথে?
                            </h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-600 font-bold">✓</span>
                                    <span>অভিজ্ঞ প্রশিক্ষক দ্বারা পরিচালিত</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-600 font-bold">✓</span>
                                    <span>হাতে-কলমে প্রশিক্ষণ</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-600 font-bold">✓</span>
                                    <span>চাকরির সহায়তা প্রদান</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-600 font-bold">✓</span>
                                    <span>সার্টিফিকেট প্রদান</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnrollPage;
