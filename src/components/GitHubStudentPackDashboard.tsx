'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CloudArrowUpIcon, 
  CircleStackIcon, 
  ServerIcon,
  CreditCardIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface StudentPackProvider {
  name: string;
  id: string;
  credits: string;
  status: 'active' | 'inactive' | 'error';
  usage: string;
  remaining: string;
  icon: React.ElementType;
  color: string;
}

const GitHubStudentPackDashboard: React.FC = () => {
  const [providers, setProviders] = useState<StudentPackProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalUsage, setTotalUsage] = useState({ used: 0, total: 1000 });

  useEffect(() => {
    // Simulate fetching GitHub Student Pack providers
    const mockProviders: StudentPackProvider[] = [
      {
        name: 'DigitalOcean Spaces',
        id: 'digitalocean',
        credits: '$200 Credit',
        status: 'active',
        usage: '12%',
        remaining: '$176',
        icon: CloudArrowUpIcon,
        color: 'from-blue-500 to-blue-600'
      },
      {
        name: 'Azure Blob Storage',
        id: 'azure',
        credits: 'Free 12 months',
        status: 'active',
        usage: '8%',
        remaining: '11 months',
        icon: ServerIcon,
        color: 'from-cyan-500 to-blue-500'
      },
      {
        name: 'MongoDB Atlas',
        id: 'mongodb',
        credits: 'Free Cluster',
        status: 'active',
        usage: '15%',
        remaining: 'Unlimited',
        icon: CircleStackIcon,
        color: 'from-green-500 to-emerald-500'
      },
      {
        name: 'Heroku Dynos',
        id: 'heroku',
        credits: 'Free Hours',
        status: 'inactive',
        usage: '0%',
        remaining: '1000 hours',
        icon: ServerIcon,
        color: 'from-purple-500 to-violet-500'
      },
      {
        name: 'AWS S3',
        id: 'aws',
        credits: 'Free Tier + Credits',
        status: 'active',
        usage: '5%',
        remaining: '$95',
        icon: CloudArrowUpIcon,
        color: 'from-orange-500 to-red-500'
      }
    ];

    setTimeout(() => {
      setProviders(mockProviders);
      setTotalUsage({ used: 250, total: 1000 });
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'error':
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />;
      default:
        return <div className="w-5 h-5 rounded-full bg-gray-300" />;
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white rounded-xl shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <CreditCardIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              GitHub Student Developer Pack
            </h3>
            <p className="text-sm text-gray-600">
              Free cloud services for students
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            ${totalUsage.used}
          </div>
          <div className="text-sm text-gray-500">
            of ${totalUsage.total} used
          </div>
        </div>
      </div>

      {/* Overall Usage Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Usage</span>
          <span className="text-sm text-gray-500">
            {Math.round((totalUsage.used / totalUsage.total) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(totalUsage.used / totalUsage.total) * 100}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
          />
        </div>
      </div>

      {/* Providers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {providers.map((provider, index) => {
          const Icon = provider.icon;
          return (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 bg-gradient-to-r ${provider.color} rounded-lg`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                {getStatusIcon(provider.status)}
              </div>
              
              <h4 className="font-medium text-gray-900 mb-1 text-sm">
                {provider.name}
              </h4>
              
              <div className="text-xs text-gray-600 mb-2">
                {provider.credits}
              </div>
              
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">Usage: {provider.usage}</span>
                <span className="font-medium text-gray-700">
                  {provider.remaining}
                </span>
              </div>
              
              {/* Mini usage bar */}
              <div className="w-full bg-gray-100 rounded-full h-1 mt-2">
                <div 
                  className={`bg-gradient-to-r ${provider.color} h-1 rounded-full`}
                  style={{ width: provider.usage }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium rounded-lg hover:shadow-md transition-shadow"
        >
          View All Benefits
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors"
        >
          Add New Service
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors"
        >
          <ChartBarIcon className="w-3 h-3 inline mr-1" />
          Usage Reports
        </motion.button>
      </div>

      {/* Student Pack Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
            SP
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">
              Student Developer Pack Active
            </div>
            <div className="text-xs text-gray-600">
              Access to $200,000+ in free credits and tools
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GitHubStudentPackDashboard;
