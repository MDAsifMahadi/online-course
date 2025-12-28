"use client";

import Image from "next/image";
import Link from "next/link";
import heroImage from "@/images/hero.png";
import { useState, useEffect } from "react";

const Hero = () => {
  const texts = [
    "Professional Social Media Marketing",
    "Master of Graphics Design",
    "Professional Digital Marketing",
    "Professional Data Entry and Freelancing"
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    
    const handleTyping = () => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.substring(0, displayText.length + 1));
          setTypingSpeed(100);
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(currentText.substring(0, displayText.length - 1));
          setTypingSpeed(50);
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTextIndex, texts, typingSpeed]);

  return (
    <section className="bg-white py-12 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 leading-tight">
              <span className="text-purple-600">Best</span>{" "}
              <span className="text-purple-600">IT Institute</span>{" "}
              <span className="text-gray-900">In</span>{" "}
              <span className="text-purple-600">Bangladesh</span>{" "}
              <span className="text-gray-900">Since</span>{" "}
              <span className="text-purple-600">1999</span>
            </h1>
            
            {/* Typing Animation */}
            <div className="h-8 md:h-10 mb-4 lg:mb-6 flex items-center justify-center lg:justify-start">
              <p className="text-lg md:text-xl text-gray-600">
                <span className="text-purple-600 font-semibold">{displayText}</span>
                <span className="animate-pulse text-purple-600">|</span>
              </p>
            </div>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 lg:mb-10">
              We are providing the best IT training & services since 1999
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/courses"
                className="relative inline-flex items-center justify-center px-8 py-3 text-white font-semibold rounded-lg overflow-hidden group shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-700 hover:via-purple-800 hover:to-purple-900"
              >
                {/* Linear Gradient Background */}
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 opacity-100 group-hover:opacity-90 transition-opacity duration-300" />
                
                {/* Shimmer/Shine Effect */}
                <span 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"
                  style={{
                    width: '200%',
                    height: '200%',
                  }}
                />
                
                {/* Radial Glow Effect */}
                <span 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)',
                  }}
                />
                
                {/* Button Text */}
                <span className="relative z-10">Enroll Now</span>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-xl">
              <Image
                src={heroImage}
                alt="IT Training Illustration"
                width={600}
                height={600}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

