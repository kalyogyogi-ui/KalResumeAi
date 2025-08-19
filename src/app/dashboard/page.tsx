'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Plus, FileText, BarChart, Clock, Star } from 'lucide-react'
import Link from 'next/link'
import GitHubStudentPackDashboard from '@/components/GitHubStudentPackDashboard'

export default function Dashboard() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!session) {
    redirect('/auth/signin')
  }

  const stats = [
    { label: 'Total Resumes', value: '3', icon: FileText, color: 'text-blue-600' },
    { label: 'This Month', value: '2', icon: Plus, color: 'text-green-600' },
    { label: 'Total Views', value: '127', icon: BarChart, color: 'text-purple-600' },
    { label: 'Average Score', value: '94', icon: Star, color: 'text-yellow-600' },
  ]

  const recentResumes = [
    {
      id: 1,
      title: 'Software Engineer Resume',
      updatedAt: '2 hours ago',
      atsScore: 96,
      status: 'Published'
    },
    {
      id: 2,
      title: 'Frontend Developer Resume',
      updatedAt: '1 day ago',
      atsScore: 92,
      status: 'Draft'
    },
    {
      id: 3,
      title: 'Full Stack Resume',
      updatedAt: '3 days ago',
      atsScore: 94,
      status: 'Published'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {session.user?.name || 'User'}!
          </h1>
          <p className="text-gray-600">Manage your resumes and track your job search progress.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-100 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Resumes */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Resumes</h2>
                  <Link
                    href="/editor"
                    className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Resume
                  </Link>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {recentResumes.map((resume) => (
                  <div key={resume.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900 mb-1">
                          {resume.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {resume.updatedAt}
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 mr-1 text-yellow-500" />
                            {resume.atsScore}% ATS
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            resume.status === 'Published' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {resume.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          href={`/editor/${resume.id}`}
                          className="px-3 py-1 text-sm text-primary hover:bg-primary/10 rounded transition-colors"
                        >
                          Edit
                        </Link>
                        <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded transition-colors">
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* GitHub Student Pack Dashboard */}
            <GitHubStudentPackDashboard />

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/templates"
                  className="block w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-primary mr-3" />
                    <span className="text-sm font-medium text-gray-900">Browse Templates</span>
                  </div>
                </Link>
                <Link
                  href="/ai-optimizer"
                  className="block w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-primary mr-3" />
                    <span className="text-sm font-medium text-gray-900">AI Optimizer</span>
                  </div>
                </Link>
                <Link
                  href="/analytics"
                  className="block w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <BarChart className="w-5 h-5 text-primary mr-3" />
                    <span className="text-sm font-medium text-gray-900">View Analytics</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-primary/10 to-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 Pro Tip</h3>
              <p className="text-sm text-gray-600 mb-4">
                Upload a job description to get AI-powered suggestions for optimizing your resume content.
              </p>
              <Link
                href="/ai-suggestions"
                className="text-sm text-primary font-medium hover:text-primary/80 transition-colors"
              >
                Try AI Suggestions →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
