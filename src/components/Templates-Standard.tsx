'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Templates: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Professional', 'Creative', 'Technical', 'Executive', 'Modern'];

  const templates = [
    {
      id: 1,
      name: "Professional Classic",
      category: "Professional",
      description: "Clean, traditional design perfect for corporate roles",
      image: "/api/placeholder/300/400",
      popular: true
    },
    {
      id: 2,
      name: "Modern Minimalist",
      category: "Modern",
      description: "Sleek, minimal design with modern typography",
      image: "/api/placeholder/300/400",
      popular: false
    },
    {
      id: 3,
      name: "Creative Portfolio",
      category: "Creative",
      description: "Eye-catching design for creative professionals",
      image: "/api/placeholder/300/400",
      popular: true
    },
    {
      id: 4,
      name: "Tech Professional",
      category: "Technical",
      description: "Optimized for software engineers and tech roles",
      image: "/api/placeholder/300/400",
      popular: false
    },
    {
      id: 5,
      name: "Executive Leadership",
      category: "Executive",
      description: "Sophisticated design for senior-level positions",
      image: "/api/placeholder/300/400",
      popular: false
    },
    {
      id: 6,
      name: "Contemporary",
      category: "Modern",
      description: "Fresh, contemporary look with subtle colors",
      image: "/api/placeholder/300/400",
      popular: true
    }
  ];

  const filteredTemplates = activeCategory === 'All' 
    ? templates 
    : templates.filter(template => template.category === activeCategory);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Resume Templates
          </h2>
          <p className="text-xl text-gray-600">
            Choose from our collection of professionally designed templates. 
            Each template is ATS-optimized and customizable to match your style.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <div 
              key={template.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
            >
              {/* Template Preview */}
              <div className="relative aspect-[3/4] bg-gray-100">
                {template.popular && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                      Popular
                    </span>
                  </div>
                )}
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-300 rounded-lg mb-4 mx-auto"></div>
                    <div className="space-y-2">
                      <div className="w-24 h-2 bg-gray-300 rounded mx-auto"></div>
                      <div className="w-20 h-2 bg-gray-300 rounded mx-auto"></div>
                      <div className="w-32 h-2 bg-gray-300 rounded mx-auto"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <Link
                    href={`/templates/${template.id}`}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                  >
                    Use Template
                  </Link>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {template.name}
                  </h3>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {template.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {template.description}
                </p>
                <div className="flex space-x-3">
                  <Link
                    href={`/templates/${template.id}`}
                    className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Use Template
                  </Link>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:border-gray-400 transition-colors">
                    Preview
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-blue-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Can't Find the Perfect Template?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Our AI can create a custom template based on your industry and preferences.
            </p>
            <Link
              href="/templates/custom"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Create Custom Template
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Templates;
