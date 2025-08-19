'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Users, FileText, Award, Zap } from 'lucide-react'

export default function StatsSection() {
  const [counts, setCounts] = useState({
    users: 0,
    resumes: 0,
    success: 0,
    speed: 0
  })

  const stats = [
    {
      icon: Users,
      value: 50000,
      label: 'Active Users',
      suffix: '+',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FileText,
      value: 250000,
      label: 'Resumes Created',
      suffix: '+',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Award,
      value: 95,
      label: 'Success Rate',
      suffix: '%',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      value: 60,
      label: 'Avg. Creation Time',
      suffix: 's',
      color: 'from-orange-500 to-red-500'
    }
  ]

  useEffect(() => {
    const animateCounter = (target: number, key: keyof typeof counts) => {
      let current = 0
      const increment = target / 100
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          setCounts(prev => ({ ...prev, [key]: target }))
          clearInterval(timer)
        } else {
          setCounts(prev => ({ ...prev, [key]: Math.floor(current) }))
        }
      }, 20)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(stats[0].value, 'users')
            animateCounter(stats[1].value, 'resumes')
            animateCounter(stats[2].value, 'success')
            animateCounter(stats[3].value, 'speed')
            observer.disconnect()
          }
        })
      },
      { threshold: 0.3 }
    )

    const element = document.getElementById('stats-section')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="stats-section" className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Empowering Career Success
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Join thousands of professionals who have transformed their careers with our AI-powered resume builder
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="text-center group"
            >
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {index === 0 ? counts.users.toLocaleString() : 
                 index === 1 ? counts.resumes.toLocaleString() :
                 index === 2 ? counts.success :
                 counts.speed}
                <span className="text-2xl md:text-3xl">{stat.suffix}</span>
              </div>
              
              <div className="text-blue-200 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="flex justify-center items-center space-x-6 text-blue-200">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-2 border-white" />
                ))}
              </div>
              <span className="text-sm">Join 50K+ users</span>
            </div>
            <div className="text-yellow-400 text-lg">★★★★★</div>
            <span className="text-sm">4.9/5 rating</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
