import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatRelativeTime(date: Date | string) {
  const now = new Date()
  const target = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - target.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return 'just now'
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} day${days > 1 ? 's' : ''} ago`
  } else {
    return formatDate(target)
  }
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

export function calculateAtsScore(resumeContent: any): number {
  // Simple ATS scoring algorithm
  let score = 0
  const maxScore = 100

  // Check for required sections
  if (resumeContent.personalInfo) score += 15
  if (resumeContent.summary) score += 10
  if (resumeContent.experience?.length > 0) score += 20
  if (resumeContent.education?.length > 0) score += 15
  if (resumeContent.skills?.length > 0) score += 15
  if (resumeContent.contact) score += 10

  // Check for formatting
  if (resumeContent.personalInfo?.phone) score += 5
  if (resumeContent.personalInfo?.email) score += 5
  if (resumeContent.personalInfo?.location) score += 5

  return Math.min(score, maxScore)
}
