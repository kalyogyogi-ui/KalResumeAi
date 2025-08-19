'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Senior Software Engineer',
      company: 'Google',
      image: '/avatars/sarah.jpg',
      rating: 5,
      text: 'KalResumeAI transformed my career. The AI-generated content was so precise and professional that I landed interviews at 5 top tech companies. The ATS optimization feature is a game-changer!',
      highlight: 'Landed 5 interviews',
      resultMetric: '300% more interviews'
    },
    {
      name: 'Marcus Johnson',
      role: 'Product Manager',
      company: 'Microsoft',
      image: '/avatars/marcus.jpg',
      rating: 5,
      text: 'As someone who struggled with resume writing, this platform was a lifesaver. The AI understood my experience and presented it in a way that got me noticed by recruiters.',
      highlight: '3x more recruiter responses',
      resultMetric: '$50k salary increase'
    },
    {
      name: 'Emily Rodriguez',
      role: 'UX Designer',
      company: 'Netflix',
      image: '/avatars/emily.jpg',
      rating: 5,
      text: 'The multiple AI providers ensure I always get high-quality content. The templates are modern and the customization options are endless. Highly recommend!',
      highlight: 'Dream job secured',
      resultMetric: 'Hired in 2 weeks'
    },
    {
      name: 'David Kim',
      role: 'Data Scientist',
      company: 'Tesla',
      image: '/avatars/david.jpg',
      rating: 5,
      text: 'The AI suggestions were incredibly intelligent. It helped me articulate my achievements in ways I never thought of. The career impact has been tremendous.',
      highlight: 'Career transformation',
      resultMetric: '2 job offers'
    },
    {
      name: 'Lisa Thompson',
      role: 'Marketing Director',
      company: 'Amazon',
      image: '/avatars/lisa.jpg',
      rating: 5,
      text: 'What impressed me most was how the AI adapted to different industries. I created multiple versions for different roles and each one was perfectly tailored.',
      highlight: 'Multi-industry success',
      resultMetric: '95% response rate'
    },
    {
      name: 'Ahmed Hassan',
      role: 'DevOps Engineer',
      company: 'Meta',
      image: '/avatars/ahmed.jpg',
      rating: 5,
      text: 'The speed and quality of resume generation is unmatched. What used to take me days now takes minutes, and the results are far superior.',
      highlight: 'Time-saving solution',
      resultMetric: '10x faster process'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-300 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
            TESTIMONIALS
          </span>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real results from real professionals who transformed their careers with KalResumeAI
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="max-w-6xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden"
          >
            {/* Quote Icon */}
            <div className="absolute top-8 right-8 text-blue-100">
              <Quote className="w-16 h-16" />
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Testimonial Content */}
              <div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonials[currentIndex].text}"
                </blockquote>

                <div className="mb-6">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-blue-600 font-semibold mb-1">
                    {testimonials[currentIndex].role}
                  </div>
                  <div className="text-gray-500">
                    {testimonials[currentIndex].company}
                  </div>
                </div>

                {/* Results Metrics */}
                <div className="flex flex-wrap gap-4">
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                    {testimonials[currentIndex].highlight}
                  </div>
                  <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                    {testimonials[currentIndex].resultMetric}
                  </div>
                </div>
              </div>

              {/* Profile Image & Company Logo */}
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-1">
                    <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-4xl text-gray-600">
                        {testimonials[currentIndex].name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <span className="text-2xl">
                      {testimonials[currentIndex].company === 'Google' ? '🔍' :
                       testimonials[currentIndex].company === 'Microsoft' ? '💻' :
                       testimonials[currentIndex].company === 'Netflix' ? '🎬' :
                       testimonials[currentIndex].company === 'Tesla' ? '🚗' :
                       testimonials[currentIndex].company === 'Amazon' ? '📦' : '📱'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-105 transform"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-blue-600 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-105 transform"
            >
              <ArrowRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-8 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">4.9/5</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="w-px h-8 bg-gray-300" />
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">50K+</div>
              <div className="text-sm text-gray-600">Happy Users</div>
            </div>
            <div className="w-px h-8 bg-gray-300" />
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">95%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
