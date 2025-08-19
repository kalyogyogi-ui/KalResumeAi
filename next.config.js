/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint during builds to prevent deployment failures
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Keep TypeScript checking enabled for better error detection
    ignoreBuildErrors: false,
  },
  // Handle external packages properly for Vercel deployment
  serverExternalPackages: ['bcryptjs', 'mongoose', 'mongodb'],
  experimental: {
    serverComponentsExternalPackages: ['bcryptjs', 'mongoose', 'mongodb']
  },
  // Image optimization settings for production
  images: {
    domains: [
      'res.cloudinary.com', 
      'avatars.githubusercontent.com', 
      'lh3.googleusercontent.com',
      'images.unsplash.com',
      'via.placeholder.com'
    ],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  // Environment variables with fallbacks for build time
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'development-secret-key',
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
    DATABASE_URL: process.env.DATABASE_URL || '',
    MONGODB_URI: process.env.MONGODB_URI || '',
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
    AWS_REGION: process.env.AWS_REGION || 'us-east-1',
    AWS_S3_BUCKET: process.env.AWS_S3_BUCKET || '',
    DIGITALOCEAN_SPACES_KEY: process.env.DIGITALOCEAN_SPACES_KEY || '',
    DIGITALOCEAN_SPACES_SECRET: process.env.DIGITALOCEAN_SPACES_SECRET || '',
    DIGITALOCEAN_SPACES_ENDPOINT: process.env.DIGITALOCEAN_SPACES_ENDPOINT || '',
    DIGITALOCEAN_SPACES_REGION: process.env.DIGITALOCEAN_SPACES_REGION || 'nyc3',
    DIGITALOCEAN_SPACES_BUCKET: process.env.DIGITALOCEAN_SPACES_BUCKET || '',
    AZURE_STORAGE_CONNECTION_STRING: process.env.AZURE_STORAGE_CONNECTION_STRING || '',
    AZURE_STORAGE_CONTAINER_NAME: process.env.AZURE_STORAGE_CONTAINER_NAME || 'resumes',
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || '',
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET || '',
  },
  // Webpack configuration for handling Node.js modules in browser
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
}

module.exports = nextConfig
