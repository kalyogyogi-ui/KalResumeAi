'use client'

import { motion } from 'framer-motion'
import { 
  Sparkles, 
  Target, 
  Zap, 
  Shield, 
  Globe, 
  Users, 
  BarChart, 
  Clock,
  CheckCircle,
  Lightbulb
} from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Content Generation",
      description: "Our advanced AI analyzes job descriptions and generates tailored content that highlights your relevant skills and experiences.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Target,
      title: "ATS Optimization",
      description: "Ensure your resume passes Applicant Tracking Systems with our intelligent formatting and keyword optimization.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Real-time Collaboration",
      description: "Work with career coaches, mentors, or teammates in real-time to perfect your resume together.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Your data is encrypted and secure. We never share your information with third parties without consent.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Globe,
      title: "Multi-language Support",
      description: "Create resumes in multiple languages and formats to apply for international opportunities.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Users,
      title: "Expert Templates",
      description: "Choose from professionally designed templates created by career experts and recruiters.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: BarChart,
      title: "Performance Analytics",
      description: "Track your resume's performance with detailed analytics on views, downloads, and application success rates.",
      color: "from-teal-500 to-green-500"
    },
    {
      icon: Clock,
      title: "Version History",
      description: "Never lose your work with automatic saving and comprehensive version history tracking.",
      color: "from-gray-500 to-gray-600"
    }
  ]

  const benefits = [
    {
      icon: CheckCircle,
      title: "Save Time",
      description: "Reduce resume creation time from hours to minutes"
    },
    {
      icon: Target,
      title: "Increase Success",
      description: "95% of our users get more interview calls"
    },
    {
      icon: Lightbulb,
      title: "Expert Guidance",
      description: "AI suggestions based on industry best practices"
    },
    {
      icon: Shield,
      title: "Stay Current",
      description: "Templates updated with latest hiring trends"
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Everything You Need to
              <span className="text-primary"> Stand Out</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive suite of AI-powered tools and features helps you create 
              professional resumes that get noticed by both ATS systems and hiring managers.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} p-3 mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary/10 to-blue-50 rounded-2xl p-8 md:p-12"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Why Choose KalResumeAI?
              </h3>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Join thousands of professionals who have transformed their careers with our AI-powered platform.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <benefit.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Process Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                How It Works
              </h3>
              <p className="text-gray-600 text-lg">
                Get started in just 3 simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  1
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Choose Template
                </h4>
                <p className="text-gray-600">
                  Select from our collection of professional, ATS-optimized templates
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  2
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  AI Enhancement
                </h4>
                <p className="text-gray-600">
                  Let our AI analyze and optimize your content for maximum impact
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  3
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Download & Apply
                </h4>
                <p className="text-gray-600">
                  Download your polished resume and start applying with confidence
                </p>
              </div>

              {/* Connecting Lines */}
              <div className="hidden md:block absolute top-8 left-1/4 right-1/4">
                <div className="h-px bg-gray-300 relative">
                  <div className="absolute left-1/2 top-0 w-2 h-2 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
