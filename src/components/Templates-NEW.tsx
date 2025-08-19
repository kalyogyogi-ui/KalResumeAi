'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, Download, Star, ArrowRight, Sparkles, Crown, TrendingUp, Zap } from 'lucide-react'
import Link from 'next/link'

export default function Templates() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Templates', count: 50, popular: true },
    { id: 'modern', name: 'Modern', count: 12, popular: true },
    { id: 'professional', name: 'Professional', count: 18, popular: false },
    { id: 'creative', name: 'Creative', count: 8, popular: true },
    { id: 'minimal', name: 'Minimal', count: 7, popular: false },
    { id: 'executive', name: 'Executive', count: 5, popular: false }
  ]

  const templates = [
    {
      id: 1,
      name: "Executive Pro",
      category: "executive",
      image: "/api/placeholder/300/400",
      downloads: "25.2K",
      rating: 4.9,
      featured: true,
      premium: true,
      description: "Premium executive template with sophisticated design elements",
      gradient: "from-slate-800 to-slate-600",
      badge: "Most Popular"
    },
    {
      id: 2,
      name: "Creative Spark",
      category: "creative",
      image: "/api/placeholder/300/400",
      downloads: "18.8K",
      rating: 4.8,
      featured: true,
      premium: false,
      description: "Bold and creative template perfect for designers and artists",
      gradient: "from-pink-500 to-orange-400",
      badge: "Editor's Choice"
    },
    {
      id: 3,
      name: "Tech Innovator",
      category: "modern",
      image: "/api/placeholder/300/400",
      downloads: "22.1K",
      rating: 4.9,
      featured: true,
      premium: true,
      description: "Modern template ideal for tech professionals and developers",
      gradient: "from-blue-600 to-cyan-500",
      badge: "Trending"
    },
    {
      id: 4,
      name: "Classic Professional",
      category: "professional",
      image: "/api/placeholder/300/400",
      downloads: "31.4K",
      rating: 4.7,
      featured: false,
      premium: false,
      description: "Traditional professional template for corporate positions",
      gradient: "from-gray-700 to-gray-500",
      badge: "Best Seller"
    },
    {
      id: 5,
      name: "Minimal Clean",
      category: "minimal",
      image: "/api/placeholder/300/400",
      downloads: "15.6K",
      rating: 4.6,
      featured: false,
      premium: false,
      description: "Clean and minimal design focusing on content",
      gradient: "from-green-500 to-teal-400",
      badge: "Clean Design"
    },
    {
      id: 6,
      name: "Creative Designer",
      category: "creative",
      image: "/api/placeholder/300/400",
      downloads: "19.8K",
      rating: 4.8,
      featured: false,
      premium: true,
      description: "Perfect for creative professionals and portfolios",
      gradient: "from-purple-500 to-pink-500",
      badge: "Premium"
    }
  ]

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory)

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/50 relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.04'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              <span>500+ Professional Templates</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Choose Your Perfect
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Resume Template
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Stand out from the crowd with our professionally designed, ATS-friendly resume templates. 
              Each template is crafted by experts and tested with real hiring managers.
            </p>

            {/* Premium Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <motion.div 
                className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">95% Success Rate</div>
                  <div className="text-sm text-gray-600">Land more interviews</div>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">ATS Optimized</div>
                  <div className="text-sm text-gray-600">Pass application filters</div>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">AI-Enhanced</div>
                  <div className="text-sm text-gray-600">Smart content suggestions</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-md border border-gray-200'
                }`}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>{category.name}</span>
                  <span className="text-sm opacity-75">({category.count})</span>
                  {category.popular && (
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  )}
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* Premium CTA Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl p-8 mb-16 text-white text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold">Get Premium Access</h3>
              </div>
              <p className="text-xl opacity-90 mb-6 max-w-2xl mx-auto">
                Unlock all premium templates, AI-powered content generation, and advanced customization options
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center px-8 py-3 bg-white text-purple-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <span>Start Free Trial</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/templates/preview"
                    className="inline-flex items-center px-8 py-3 border-2 border-white/50 text-white rounded-xl font-semibold backdrop-blur-sm hover:border-white hover:bg-white/10 transition-all duration-300"
                  >
                    Preview All Templates
                  </Link>
                </motion.div>
              </div>
            </div>
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
                  <div className={`w-full h-full bg-gradient-to-br ${template.gradient} opacity-20`} />
                  
                  {/* Template mockup content */}
                  <div className="absolute inset-4 bg-white rounded-lg shadow-inner p-4 flex flex-col space-y-2">
                    <div className="h-4 bg-gray-800 rounded w-3/4" />
                    <div className="h-2 bg-gray-600 rounded w-1/2" />
                    <div className="h-2 bg-gray-400 rounded w-2/3" />
                    <div className="h-1 bg-gray-300 rounded w-full mt-2" />
                    <div className="h-1 bg-gray-300 rounded w-4/5" />
                    <div className="h-1 bg-gray-300 rounded w-3/5" />
                    <div className="flex space-x-2 mt-3">
                      <div className="h-2 bg-purple-400 rounded w-1/4" />
                      <div className="h-2 bg-blue-400 rounded w-1/3" />
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white hover:bg-purple-700 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1 flex items-center">
                        {template.name}
                        {template.premium && (
                          <Crown className="w-4 h-4 text-yellow-500 ml-2" />
                        )}
                      </h3>
                      <p className="text-gray-600 text-sm">{template.description}</p>
                    </div>
                    <span className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {template.badge}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Download className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{template.downloads}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">{template.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        href={`/templates/${template.id}/customize`}
                        className="w-full inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                      >
                        <span>Use Template</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </motion.div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="px-4 py-3 border border-gray-300 rounded-xl hover:border-purple-400 hover:text-purple-600 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Can't find the perfect template?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Our AI can create a custom template tailored specifically to your industry and experience level.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/custom-template"
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
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
