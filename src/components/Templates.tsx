'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, Download, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Templates() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'modern', name: 'Modern' },
    { id: 'professional', name: 'Professional' },
    { id: 'creative', name: 'Creative' },
    { id: 'minimal', name: 'Minimal' },
    { id: 'executive', name: 'Executive' }
  ]

  const templates = [
    {
      id: 1,
      name: "Modern Professional",
      category: "modern",
      image: "/api/placeholder/300/400",
      downloads: "15.2K",
      rating: 4.9,
      featured: true,
      description: "Clean, modern design perfect for tech and creative industries"
    },
    {
      id: 2,
      name: "Executive Classic",
      category: "executive",
      image: "/api/placeholder/300/400",
      downloads: "12.8K",
      rating: 4.8,
      featured: false,
      description: "Elegant design for senior-level positions and C-suite roles"
    },
    {
      id: 3,
      name: "Creative Designer",
      category: "creative",
      image: "/api/placeholder/300/400",
      downloads: "18.5K",
      rating: 4.9,
      featured: true,
      description: "Bold and creative template for designers and artists"
    },
    {
      id: 4,
      name: "Minimal Clean",
      category: "minimal",
      image: "/api/placeholder/300/400",
      downloads: "22.1K",
      rating: 4.7,
      featured: false,
      description: "Simple, clean layout that focuses on content"
    },
    {
      id: 5,
      name: "Professional Blue",
      category: "professional",
      image: "/api/placeholder/300/400",
      downloads: "14.7K",
      rating: 4.8,
      featured: false,
      description: "Classic professional template with blue accents"
    },
    {
      id: 6,
      name: "Tech Innovator",
      category: "modern",
      image: "/api/placeholder/300/400",
      downloads: "16.3K",
      rating: 4.9,
      featured: true,
      description: "Perfect for software engineers and tech professionals"
    }
  ]

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Professional
              <span className="text-primary"> Resume Templates</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Choose from our collection of expertly designed, ATS-optimized templates. 
              Each template is crafted to highlight your strengths and get you noticed.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>

          {/* Templates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Featured Badge */}
                {template.featured && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium z-10">
                    Featured
                  </div>
                )}

                {/* Template Preview */}
                <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                  {/* Placeholder for template preview */}
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <div className="text-center space-y-4 p-8">
                      {/* Header */}
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-400 rounded w-32 mx-auto" />
                        <div className="h-3 bg-gray-300 rounded w-24 mx-auto" />
                      </div>
                      
                      {/* Content sections */}
                      <div className="space-y-3">
                        <div className="h-2 bg-gray-400 rounded w-20" />
                        <div className="space-y-1">
                          <div className="h-2 bg-gray-300 rounded" />
                          <div className="h-2 bg-gray-300 rounded w-4/5" />
                          <div className="h-2 bg-gray-300 rounded w-3/4" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="h-2 bg-gray-400 rounded w-16" />
                        <div className="space-y-1">
                          <div className="h-2 bg-gray-300 rounded" />
                          <div className="h-2 bg-gray-300 rounded w-5/6" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-4">
                      <button className="p-3 bg-white rounded-full hover:scale-110 transition-transform">
                        <Eye className="w-5 h-5 text-gray-700" />
                      </button>
                      <Link
                        href={`/templates/${template.id}`}
                        className="p-3 bg-primary text-white rounded-full hover:scale-110 transition-transform"
                      >
                        <Download className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {template.name}
                    </h3>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{template.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {template.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Download className="w-4 h-4" />
                      <span>{template.downloads} downloads</span>
                    </div>
                    
                    <Link
                      href={`/editor?template=${template.id}`}
                      className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-medium"
                    >
                      Use Template
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-r from-primary/10 to-blue-50 rounded-2xl p-8 md:p-12"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Can't Find the Perfect Template?
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Our AI can help you create a custom template tailored to your industry and career level.
              Get personalized recommendations based on your background.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/custom-template"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Create Custom Template
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-primary hover:text-primary transition-colors font-medium"
              >
                Browse All Templates
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
