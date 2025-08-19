'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, Shield, Star } from 'lucide-react'

export default function Hero() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "Google",
      text: "KalResumeAI helped me land my dream job at Google! The AI suggestions were spot-on."
    },
    {
      name: "Michael Chen", 
      role: "Product Manager",
      company: "Microsoft",
      text: "The ATS optimization feature is incredible. My resume now passes all screening systems."
    },
    {
      name: "Emily Rodriguez",
      role: "Data Scientist",
      company: "Meta",
      text: "I love how the AI tailors my resume for different job applications. So much time saved!"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-white to-blue-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full blur-xl" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-blue-400 rounded-full blur-xl" />
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-purple-400 rounded-full blur-xl" />
      </div>

      <div className="container mx-auto px-4 py-20 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Resume Builder</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Create Your
                  <span className="text-primary"> Perfect Resume</span>
                  <br />
                  in Minutes
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                  Leverage advanced AI to build professional resumes that pass ATS systems 
                  and impress hiring managers. Get hired faster with personalized recommendations.
                </p>
              </div>

              {/* Features List */}
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Zap className="w-4 h-4 text-green-500" />
                  <span>AI-Powered Content</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span>ATS Optimized</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>Professional Templates</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-lg group"
                >
                  Start Building Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/templates"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-primary hover:text-primary transition-colors font-medium text-lg"
                >
                  View Templates
                </Link>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">50K+</div>
                  <div className="text-sm text-gray-600">Resumes Created</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">95%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">4.9★</div>
                  <div className="text-sm text-gray-600">User Rating</div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Resume Preview Card */}
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-900 rounded w-32" />
                      <div className="h-3 bg-gray-400 rounded w-24" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="h-3 bg-primary/20 rounded" />
                    <div className="h-3 bg-gray-200 rounded w-4/5" />
                    <div className="h-3 bg-gray-200 rounded w-3/4" />
                  </div>

                  <div className="space-y-2">
                    <div className="h-4 bg-gray-800 rounded w-20" />
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-300 rounded" />
                      <div className="h-3 bg-gray-300 rounded w-5/6" />
                      <div className="h-3 bg-gray-300 rounded w-4/5" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="h-4 bg-gray-800 rounded w-16" />
                    <div className="flex space-x-2">
                      <div className="h-6 bg-primary/30 rounded-full px-3 w-20" />
                      <div className="h-6 bg-primary/30 rounded-full px-3 w-16" />
                      <div className="h-6 bg-primary/30 rounded-full px-3 w-18" />
                    </div>
                  </div>
                </div>

                {/* AI Badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium animate-pulse">
                  AI Enhanced
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-4 -right-4 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg"
              >
                98% ATS Score
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute bottom-8 -left-4 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg"
              >
                Professional Design
              </motion.div>
            </motion.div>
          </div>

          {/* Testimonial Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 text-center"
          >
            <div className="max-w-3xl mx-auto">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-8">
                Trusted by professionals at top companies
              </p>
              
              <div className="relative">
                <blockquote className="text-xl text-gray-700 font-medium mb-6 min-h-[3rem]">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                <div className="flex items-center justify-center space-x-2">
                  <div className="font-semibold text-gray-900">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <span className="text-gray-500">•</span>
                  <div className="text-gray-600">
                    {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                  </div>
                </div>
              </div>

              {/* Company Logos */}
              <div className="flex items-center justify-center space-x-8 mt-12 opacity-60">
                <div className="text-2xl font-bold text-gray-400">Google</div>
                <div className="text-2xl font-bold text-gray-400">Microsoft</div>
                <div className="text-2xl font-bold text-gray-400">Meta</div>
                <div className="text-2xl font-bold text-gray-400">Amazon</div>
                <div className="text-2xl font-bold text-gray-400">Apple</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
