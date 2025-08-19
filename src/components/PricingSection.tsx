'use client'

import { motion } from 'framer-motion'
import { Check, Zap, Crown, Rocket, Star } from 'lucide-react'
import { useState } from 'react'

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState('monthly')

  const plans = [
    {
      name: 'Free',
      icon: Zap,
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for getting started',
      color: 'from-gray-500 to-gray-600',
      features: [
        '1 Resume template',
        'Basic AI content generation',
        'PDF download',
        'Email support',
        'Basic ATS optimization'
      ],
      limitations: [
        '1 resume per month',
        'Watermark included',
        'Limited customization'
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      name: 'Pro',
      icon: Crown,
      price: { monthly: 19, yearly: 15 },
      description: 'Best for job seekers',
      color: 'from-blue-500 to-purple-600',
      features: [
        '25+ Premium templates',
        'Advanced AI with multiple providers',
        'PDF & DOCX downloads',
        'Cover letter generator',
        'Advanced ATS optimization',
        'LinkedIn profile optimization',
        'Interview preparation tips',
        'Priority support'
      ],
      limitations: [],
      cta: 'Start Pro Trial',
      popular: true,
      badge: 'Most Popular'
    },
    {
      name: 'Enterprise',
      icon: Rocket,
      price: { monthly: 49, yearly: 39 },
      description: 'For teams and agencies',
      color: 'from-purple-600 to-pink-600',
      features: [
        'Everything in Pro',
        'Unlimited resumes',
        'Team collaboration',
        'Brand customization',
        'API access',
        'Analytics dashboard',
        'White-label solution',
        'Dedicated account manager',
        'Custom integrations',
        'Priority phone support'
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-500/10 to-transparent rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
            PRICING
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Start free and upgrade as you grow. All plans include our core AI features.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-slate-800/50 backdrop-blur-sm rounded-full p-1 border border-slate-700">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                billingCycle === 'monthly'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 relative ${
                billingCycle === 'yearly'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                -20%
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.7 }}
              className={`relative ${
                plan.popular 
                  ? 'scale-105 z-10' 
                  : 'hover:scale-105'
              } transition-transform duration-300`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>{plan.badge}</span>
                  </div>
                </div>
              )}

              <div className={`bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border ${
                plan.popular 
                  ? 'border-blue-500 shadow-2xl shadow-blue-500/25' 
                  : 'border-slate-700 hover:border-slate-600'
              } transition-all duration-300 h-full`}>
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${plan.color} mb-4`}>
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-white">
                        ${plan.price[billingCycle as keyof typeof plan.price]}
                      </span>
                      <span className="text-gray-400 ml-2">
                        /{billingCycle === 'yearly' ? 'year' : 'month'}
                      </span>
                    </div>
                    {billingCycle === 'yearly' && plan.price.yearly < plan.price.monthly && (
                      <div className="text-green-400 text-sm mt-2">
                        Save ${(plan.price.monthly - plan.price.yearly) * 12}/year
                      </div>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25'
                        : 'bg-slate-700 text-white hover:bg-slate-600 border border-slate-600'
                    }`}
                  >
                    {plan.cta}
                  </motion.button>
                </div>

                {/* Features List */}
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-sm uppercase tracking-wide">
                    What's Included:
                  </h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Limitations */}
                  {plan.limitations.length > 0 && (
                    <div className="pt-6 border-t border-slate-700">
                      <h4 className="text-gray-400 font-semibold text-sm uppercase tracking-wide mb-3">
                        Limitations:
                      </h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li key={limitIndex} className="flex items-start">
                            <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                            <span className="text-gray-400 text-sm">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            All plans come with a 30-day money-back guarantee. Need a custom solution? 
            Contact our sales team for enterprise pricing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-3 bg-slate-800 text-gray-300 rounded-xl hover:bg-slate-700 transition-colors duration-300 border border-slate-600">
              View Feature Comparison
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
              Contact Sales
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
