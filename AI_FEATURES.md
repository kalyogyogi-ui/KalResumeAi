# 🤖 KalResumeAI - Advanced AI-Powered Resume Builder

## 🌟 Overview

KalResumeAI is a cutting-edge, AI-powered resume builder that leverages multiple AI providers, cloud storage solutions, and modern web technologies to create professional, ATS-optimized resumes.

## ✨ Key Features

### 🧠 Multi-AI Provider Integration
- **OpenAI GPT-4** - Advanced content generation and optimization
- **Google Gemini** - Creative content and analysis
- **Anthropic Claude** - Professional writing and refinement
- **Perplexity AI** - Research-enhanced content creation

### ☁️ Cloud Storage & Hosting
- **AWS S3** - Secure file storage and retrieval
- **Cloudinary** - Image optimization and document processing
- **Automatic failover** between storage providers

### 🎯 AI-Powered Features
- **Resume Content Generation** - AI-generated summaries, experience descriptions, skills organization
- **ATS Optimization** - Automatic keyword optimization and formatting
- **Cover Letter Generation** - Personalized cover letters matching job descriptions
- **Job Description Analysis** - Extract key requirements and skills
- **Resume Suggestions** - Real-time improvement recommendations

## 🛠️ Technology Stack

### Frontend
- **Next.js 15.4.6** - React framework with App Router
- **TypeScript 5.7.2** - Type safety and development experience
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Framer Motion 11.18.2** - Smooth animations and transitions
- **Radix UI** - Accessible component primitives

### Backend & APIs
- **Next.js API Routes** - Serverless API endpoints
- **NextAuth.js 4.24.10** - Authentication with multiple providers
- **Prisma 5.22.0** - Database ORM with type safety
- **PostgreSQL** - Robust database for user data and resumes

### AI Integration
- **OpenAI SDK** - GPT-4 integration
- **Google Generative AI** - Gemini model access
- **Custom AI Service** - Multi-provider fallback system
- **Intelligent prompt engineering** - Optimized prompts for each use case

### Cloud Services
- **AWS S3** - Document storage and retrieval
- **Cloudinary** - Image and document processing
- **Presigned URLs** - Secure file access
- **Multi-provider fallback** - Reliability and redundancy

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   │   ├── ai/           # AI service endpoints
│   │   │   ├── generate/ # Content generation
│   │   │   ├── optimize/ # ATS optimization
│   │   │   ├── cover-letter/ # Cover letter generation
│   │   │   ├── analyze/  # Job description analysis
│   │   │   └── suggestions/ # Resume improvement suggestions
│   │   └── auth/         # Authentication endpoints
│   ├── dashboard/        # User dashboard
│   └── layout.tsx        # Root layout
├── components/           # React components
│   ├── Header.tsx       # Navigation header
│   ├── Hero.tsx         # Landing page hero
│   ├── Features.tsx     # Feature showcase
│   ├── Templates.tsx    # Resume templates
│   └── Footer.tsx       # Site footer
├── lib/                 # Utility libraries
│   ├── openai.ts       # AI service integration
│   ├── cloudStorage.ts # Cloud storage service
│   ├── auth.ts         # Authentication configuration
│   ├── prisma.ts       # Database client
│   └── utils.ts        # Common utilities
├── providers/          # React context providers
└── types/             # TypeScript type definitions
```

## 🚀 API Endpoints

### AI Services
- `POST /api/ai/generate` - Generate resume content
- `POST /api/ai/optimize` - Optimize resume for ATS
- `POST /api/ai/cover-letter` - Generate cover letters
- `POST /api/ai/analyze` - Analyze job descriptions
- `POST /api/ai/suggestions` - Get improvement suggestions
- `GET /api/ai/generate` - Check available AI providers

### Authentication
- `/api/auth/[...nextauth]` - NextAuth.js authentication

## 🔧 Configuration

### Environment Variables

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/kalresume_db"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id" 
GITHUB_CLIENT_SECRET="your-github-client-secret"

# AI Providers
OPENAI_API_KEY="your-openai-api-key"
GEMINI_API_KEY="your-google-gemini-api-key"
PERPLEXITY_API_KEY="your-perplexity-api-key"
ANTHROPIC_API_KEY="your-claude-api-key"

# Cloud Storage
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="your-s3-bucket"

CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-secret"
```

## 🏗️ Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/kalyogyogi-ui/KalResumeAi.git
cd KalResumeAi
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
```bash
cp .env.example .env.local
# Configure your environment variables
```

### 4. Database Setup
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Run Development Server
```bash
npm run dev
```

## 🎨 Features in Detail

### Multi-AI Provider System
- **Intelligent Fallback**: Automatically switches between AI providers if one fails
- **Provider Selection**: Choose specific AI provider or use automatic selection
- **Custom Prompts**: Optimized prompts for each AI provider and use case
- **Error Handling**: Comprehensive error handling and recovery

### Advanced Cloud Storage
- **Multi-Provider Support**: AWS S3 and Cloudinary integration
- **Automatic Optimization**: Image compression and format optimization
- **Secure Access**: Presigned URLs for secure file access
- **File Type Detection**: Automatic content type detection

### Resume AI Features
- **Content Generation**: AI-generated summaries, experience descriptions
- **ATS Optimization**: Keyword optimization for applicant tracking systems
- **Cover Letters**: Personalized cover letters matching job requirements
- **Job Analysis**: Extract skills and requirements from job postings
- **Real-time Suggestions**: Continuous improvement recommendations

## 🔒 Security Features

- **Authentication**: Secure user authentication with NextAuth.js
- **API Protection**: Protected API routes requiring authentication
- **Data Validation**: Input validation and sanitization
- **Secure Storage**: Encrypted data storage and secure file access
- **CORS Protection**: Cross-origin resource sharing protection

## 📱 Modern UI/UX

- **Responsive Design**: Works on all device sizes
- **Dark/Light Mode**: Theme switching support
- **Smooth Animations**: Framer Motion animations
- **Accessibility**: WCAG compliant components
- **Loading States**: Professional loading indicators
- **Error Handling**: User-friendly error messages

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Docker
```bash
docker build -t kal-resume-ai .
docker run -p 3000:3000 kal-resume-ai
```

## 📊 Performance Features

- **Next.js Optimization**: Automatic code splitting and optimization
- **Image Optimization**: Next.js Image component with automatic optimization
- **Caching**: Intelligent caching strategies
- **Bundle Analysis**: Built-in bundle analyzer
- **Performance Monitoring**: Built-in performance metrics

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- Google for Gemini AI
- Anthropic for Claude AI
- Perplexity for AI search capabilities
- Vercel for hosting platform
- AWS for cloud storage
- Cloudinary for media optimization

---

**Made with ❤️ by KalResumeAI Team**
