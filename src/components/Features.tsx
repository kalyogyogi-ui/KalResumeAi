'use client'

import { motion } from 'framer-motion'
import { 
  Brain, 
  Zap, 
  Shield, 
  Star, 
  Target, 
  Download,
  Users,
  Globe,
  Sparkles,
  CheckCircle,
  BarChart3,
  Palette,
  Clock,
  Lightbulb,
  TrendingUp
} from 'lucide-react'

export default function Features() {
  const mainFeatures = [
    {
      icon: Brain,
      title: "Advanced AI Engine",
      description: "Powered by GPT-4, Gemini, and Claude AI for intelligent resume generation and optimization",
      gradient: "from-purple-500 to-pink-500",
      stats: "99.5% accuracy",
      delay: 0
    },
    {
      icon: Shield,
      title: "ATS Optimization",
      description: "Ensure your resume passes through Applicant Tracking Systems with AI-powered keyword optimization",
      gradient: "from-green-500 to-emerald-500",
      stats: "95% ATS pass rate",
      delay: 0.2
    },
    {
      icon: Sparkles,
      title: "Smart Content Generation",
      description: "AI generates compelling bullet points, summaries, and achievements tailored to your industry",
      gradient: "from-blue-500 to-cyan-500",
      stats: "10x faster writing",
      delay: 0.4
    }
  ]

  const allFeatures = [
    {
      icon: Target,
      title: "Industry-Specific Templates",
      description: "Choose from 50+ professionally designed templates optimized for different industries and roles",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Download,
      title: "Multiple Export Formats",
      description: "Download your resume in PDF, DOCX, or TXT formats with perfect formatting preservation",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Users,
      title: "Collaboration Tools",
      description: "Share your resume with mentors, friends, or career coaches for real-time feedback and suggestions",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description: "Create resumes in multiple languages with AI-powered translation and cultural adaptation",
      color: "from-teal-500 to-green-500"
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Track your resume's performance with detailed analytics and optimization recommendations",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Palette,
      title: "Custom Branding",
      description: "Personalize your resume with custom colors, fonts, and layouts to match your personal brand",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Clock,
      title: "Version History",
      description: "Never lose your work with automatic saving and comprehensive version history tracking",
      color: "from-gray-500 to-slate-500"
    },
    {
      icon: TrendingUp,
      title: "Success Tracking",
      description: "Monitor application success rates and get insights to improve your job search strategy",
      color: "from-emerald-500 to-teal-500"
    }
  ]

  const benefits = [
    {
      icon: CheckCircle,
      title: "Save Time",
      description: "Reduce resume creation time from hours to minutes",
      stat: "90% faster"
    },
    {
      icon: Target,
      title: "Increase Success",
      description: "95% of our users get more interview calls",
      stat: "300% more calls"
    },
    {
      icon: Lightbulb,
      title: "Expert Guidance",
      description: "AI suggestions based on industry best practices",
      stat: "Expert-level"
    },
    {
      icon: Shield,
      title: "Stay Current",
      description: "Templates updated with latest hiring trends",
      stat: "Always fresh"
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230ea5e9' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }} />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Zap className="w-4 h-4" />
              <span>Powerful Features</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Everything You Need to
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent block">
                Build the Perfect Resume
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our AI-powered platform combines cutting-edge technology with professional design 
              to help you create resumes that stand out and get results.
            </p>
          </motion.div>

          {/* Main Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: feature.delay }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group"
              >
                <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 h-full">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-5 rounded-3xl group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Floating Icon */}
                  <motion.div 
                    className={`relative w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                    
                    {/* Sparkle Effect */}
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Sparkles className="w-3 h-3 text-white m-0.5" />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700">{feature.title}</h3>
                      <motion.span 
                        className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full group-hover:bg-gray-200"
                        whileHover={{ scale: 1.1 }}
                      >
                        {feature.stats}
                      </motion.span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>

                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" style={{ padding: '2px' }}>
                    <div className="w-full h-full bg-white rounded-3xl" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* All Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {allFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -2 }}
                className="group"
              >
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-transparent hover:shadow-lg transition-all duration-300 group-hover:bg-white h-full">
                  <div className="space-y-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-700">{feature.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white relative overflow-hidden mb-20"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat'
              }} />
            </div>
            
            <div className="relative">
              <div className="text-center mb-12">
                <motion.h3 
                  className="text-3xl md:text-4xl font-bold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Why Choose KalResumeAI?
                </motion.h3>
                <motion.p 
                  className="text-xl text-white/90 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Join thousands of professionals who have transformed their careers with our AI-powered platform.
                </motion.p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center group"
                  >
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all duration-300">
                      <benefit.icon className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-white/90 mb-2">
                      {benefit.description}
                    </p>
                    <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                      {benefit.stat}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Process Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h3>
              <p className="text-xl text-gray-600">
                Get started in just 3 simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {[
                { title: "Choose Template", desc: "Select from our collection of professional, ATS-optimized templates" },
                { title: "AI Enhancement", desc: "Let our AI analyze and optimize your content for maximum impact" },
                { title: "Download & Apply", desc: "Download your polished resume and start applying with confidence" }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center group"
                >
                  <motion.div 
                    className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg group-hover:shadow-xl"
                    whileHover={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 0.3 }}
                  >
                    {index + 1}
                  </motion.div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600">
                    {step.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              ))}

              {/* Connecting Lines */}
              <div className="hidden md:block absolute top-10 left-1/4 right-1/4">
                <svg className="w-full h-4" viewBox="0 0 400 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 20 L180 20 M220 20 L400 20" stroke="#e5e7eb" strokeWidth="2" strokeDasharray="5,5" />
                  <circle cx="200" cy="20" r="4" fill="#3b82f6" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
