'use client'

import { motion } from 'framer-motion'

export default function TrustedBy() {
  const companies = [
    { name: 'Google', logo: '🔍' },
    { name: 'Microsoft', logo: '💻' },
    { name: 'Amazon', logo: '📦' },
    { name: 'Netflix', logo: '🎬' },
    { name: 'Tesla', logo: '🚗' },
    { name: 'Apple', logo: '🍎' },
    { name: 'Meta', logo: '📱' },
    { name: 'OpenAI', logo: '🤖' }
  ]

  return (
    <section className="py-12 bg-white/50 backdrop-blur-sm border-y border-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm text-gray-600 mb-8 font-medium">
            Trusted by professionals at leading companies worldwide
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70">
            {companies.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.1, opacity: 1 }}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-300 cursor-pointer"
              >
                <span className="text-2xl">{company.logo}</span>
                <span className="text-gray-700 font-semibold text-sm md:text-base">
                  {company.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
