'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  Sparkles, 
  Crown, 
  Zap, 
  Shield, 
  Heart,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Github,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ChevronUp,
  Globe,
  Star,
  Award,
  Users,
  Briefcase,
  FileText,
  Download,
  Lock,
  Headphones,
  MessageCircle,
  ExternalLink,
  TrendingUp
} from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true)
      setEmail('')
    }, 1000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerSections = [
    {
      title: 'Product',
      icon: FileText,
      links: [
        { name: 'Resume Builder', href: '/resume-builder', isNew: false },
        { name: 'Cover Letter', href: '/cover-letter', isNew: true },
        { name: 'LinkedIn Profile', href: '/linkedin', isNew: true },
        { name: 'Portfolio Sites', href: '/portfolio', isNew: false },
        { name: 'ATS Scanner', href: '/ats-scanner', isNew: false },
        { name: 'Salary Insights', href: '/salary', isNew: true }
      ]
    },
    {
      title: 'Templates',
      icon: Briefcase,
      links: [
        { name: 'Modern Templates', href: '/templates/modern', isNew: false },
        { name: 'Creative Designs', href: '/templates/creative', isNew: false },
        { name: 'Executive Resumes', href: '/templates/executive', isNew: true },
        { name: 'Entry Level', href: '/templates/entry-level', isNew: false },
        { name: 'Industry Specific', href: '/templates/industry', isNew: false },
        { name: 'International', href: '/templates/international', isNew: true }
      ]
    },
    {
      title: 'Resources',
      icon: Award,
      links: [
        { name: 'Career Advice', href: '/blog/career-advice', isNew: false },
        { name: 'Interview Tips', href: '/blog/interviews', isNew: false },
        { name: 'Resume Examples', href: '/examples', isNew: false },
        { name: 'Job Search Guide', href: '/guides/job-search', isNew: true },
        { name: 'Salary Negotiation', href: '/guides/salary', isNew: false },
        { name: 'Video Tutorials', href: '/tutorials', isNew: true }
      ]
    },
    {
      title: 'Support',
      icon: Headphones,
      links: [
        { name: 'Help Center', href: '/help', isNew: false },
        { name: 'Contact Support', href: '/contact', isNew: false },
        { name: 'Live Chat', href: '/chat', isNew: true },
        { name: 'Community Forum', href: '/community', isNew: false },
        { name: 'Feature Requests', href: '/feedback', isNew: false },
        { name: 'System Status', href: '/status', isNew: false }
      ]
    },
    {
      title: 'Company',
      icon: Users,
      links: [
        { name: 'About Us', href: '/about', isNew: false },
        { name: 'Careers', href: '/careers', isNew: true },
        { name: 'Press Kit', href: '/press', isNew: false },
        { name: 'Partner Program', href: '/partners', isNew: true },
        { name: 'Affiliate Program', href: '/affiliates', isNew: false },
        { name: 'Success Stories', href: '/success-stories', isNew: false }
      ]
    }
  ]

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/kalresumeai', color: 'hover:text-blue-400' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/kalresumeai', color: 'hover:text-blue-600' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/kalresumeai', color: 'hover:text-blue-500' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/kalresumeai', color: 'hover:text-pink-500' },
    { name: 'Youtube', icon: Youtube, href: 'https://youtube.com/@kalresumeai', color: 'hover:text-red-500' },
    { name: 'Github', icon: Github, href: 'https://github.com/kalresumeai', color: 'hover:text-gray-600' }
  ]

  const features = [
    { icon: Zap, text: 'AI-Powered Generation', count: '50M+' },
    { icon: Crown, text: 'Premium Templates', count: '500+' },
    { icon: Users, text: 'Happy Users', count: '2M+' },
    { icon: Star, text: 'Success Rate', count: '95%' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <footer 
      ref={ref}
      className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Main Footer Content */}
      <div className="relative">
        {/* Newsletter Section */}
        <motion.div
          className="border-b border-white/10 py-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                variants={itemVariants}
                className="flex items-center justify-center space-x-2 mb-4"
              >
                <Sparkles className="w-8 h-8 text-yellow-400" />
                <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                  Stay Ahead in Your Career
                </h2>
                <Sparkles className="w-8 h-8 text-yellow-400" />
              </motion.div>
              
              <motion.p
                variants={itemVariants}
                className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
              >
                Get exclusive career tips, resume templates, and job market insights delivered to your inbox
              </motion.p>

              <motion.form
                variants={itemVariants}
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
              >
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubscribed}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isSubscribed ? (
                    <>
                      <Heart className="w-5 h-5" />
                      <span>Subscribed!</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </motion.form>

              {/* Stats */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 pt-8 border-t border-white/10"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.text}
                    className="text-center group"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:shadow-lg transition-all duration-300">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{feature.count}</div>
                    <div className="text-sm text-gray-300">{feature.text}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Links Section */}
        <motion.div
          className="py-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {footerSections.map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  variants={itemVariants}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <section.icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="group flex items-center text-gray-300 hover:text-white transition-colors duration-300"
                        >
                          <span className="group-hover:translate-x-1 transition-transform duration-300">
                            {link.name}
                          </span>
                          {link.isNew && (
                            <span className="ml-2 px-2 py-0.5 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs font-semibold rounded-full">
                              NEW
                            </span>
                          )}
                          <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact & Social Section */}
        <motion.div
          className="border-t border-white/10 py-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              
              {/* Contact Info */}
              <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <MessageCircle className="w-6 h-6 mr-2 text-purple-400" />
                  Get in Touch
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <Mail className="w-5 h-5 mr-3 text-purple-400" />
                    <a href="mailto:hello@kalresumeai.com" className="hover:text-white transition-colors">
                      hello@kalresumeai.com
                    </a>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Phone className="w-5 h-5 mr-3 text-purple-400" />
                    <a href="tel:+1-555-RESUME" className="hover:text-white transition-colors">
                      +1 (555) RESUME-1
                    </a>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <MapPin className="w-5 h-5 mr-3 text-purple-400" />
                    <span>San Francisco, CA & Remote</span>
                  </div>
                </div>
              </motion.div>

              {/* Logo & Description */}
              <motion.div variants={itemVariants} className="text-center">
                <Link href="/" className="inline-flex items-center space-x-3 group mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <span className="text-white font-bold text-xl">K</span>
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    KalResumeAI
                  </span>
                </Link>
                <p className="text-gray-300 max-w-md mx-auto">
                  Empowering professionals worldwide with AI-powered career tools that land dream jobs.
                </p>
                <div className="flex items-center justify-center space-x-2 mt-4">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-green-400 font-medium">95% Success Rate</span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div variants={itemVariants} className="lg:text-right">
                <h3 className="text-xl font-semibold mb-4 flex items-center lg:justify-end">
                  <Globe className="w-6 h-6 mr-2 text-purple-400" />
                  Follow Us
                </h3>
                <div className="flex flex-wrap gap-3 lg:justify-end">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-gray-300 ${social.color} transition-all duration-300 hover:shadow-lg`}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
                <div className="mt-4 text-sm text-gray-400 lg:text-right">
                  Join 50K+ followers for career tips and updates
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-white/10 py-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <motion.div variants={itemVariants} className="text-gray-400 text-sm">
                © 2024 KalResumeAI. All rights reserved. Built with ❤️ for job seekers worldwide.
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-center space-x-6 text-sm">
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1">
                  <Lock className="w-4 h-4" />
                  <span>Privacy Policy</span>
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
                <div className="flex items-center space-x-2 text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs font-medium">All Systems Operational</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 z-50 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: showBackToTop ? 1 : 0,
          y: showBackToTop ? 0 : 20
        }}
      >
        <ChevronUp className="w-6 h-6" />
      </motion.button>
    </footer>
  )
}
