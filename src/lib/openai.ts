import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Types for better type safety
interface AIOptions {
  model?: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
}

interface GenerateContentOptions extends AIOptions {
  systemPrompt?: string;
  context?: string;
}

interface UserInfo {
  name?: string;
  email?: string;
  phone?: string;
  jobTitle?: string;
  experience?: string;
  skills?: string[];
  company?: string;
  previousRoles?: string[];
  education?: string;
  location?: string;
}

// Multiple AI Provider Configuration
interface AIProvider {
  name: string;
  client: any;
  generateContent: (prompt: string, options?: GenerateContentOptions) => Promise<string>;
  isAvailable: boolean;
}

class AIService {
  private providers: Map<string, AIProvider> = new Map();
  private defaultProvider: string = 'openai';

  constructor() {
    this.initializeProviders();
  }

  private initializeProviders() {
    // OpenAI Configuration
    if (process.env.OPENAI_API_KEY) {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      this.providers.set('openai', {
        name: 'OpenAI GPT',
        client: openai,
        isAvailable: true,
        generateContent: async (prompt: string, options: GenerateContentOptions = {}) => {
          try {
            const messages = [];
            
            if (options.systemPrompt) {
              messages.push({ role: 'system', content: options.systemPrompt });
            }
            
            messages.push({ role: 'user', content: prompt });
            
            const response = await openai.chat.completions.create({
              model: options.model || 'gpt-4-turbo-preview',
              messages: messages as any,
              max_tokens: options.maxTokens || 1500,
              temperature: options.temperature || 0.7,
              top_p: options.topP || 1,
            });
            
            return response.choices[0]?.message?.content || '';
          } catch (error) {
            console.error('OpenAI API error:', error);
            throw error;
          }
        }
      });
    }

    // Google Gemini Configuration
    if (process.env.GEMINI_API_KEY) {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      
      this.providers.set('gemini', {
        name: 'Google Gemini',
        client: genAI,
        isAvailable: true,
        generateContent: async (prompt: string, options: GenerateContentOptions = {}) => {
          try {
            const model = genAI.getGenerativeModel({ 
              model: options.model || 'gemini-pro' 
            });
            
            const result = await model.generateContent({
              contents: [{ role: 'user', parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: options.temperature || 0.7,
                maxOutputTokens: options.maxTokens || 1500,
                topP: options.topP || 1,
              }
            });
            
            return result.response.text() || '';
          } catch (error) {
            console.error('Gemini API error:', error);
            throw error;
          }
        }
      });
    }

    // Perplexity AI Configuration
    if (process.env.PERPLEXITY_API_KEY) {
      this.providers.set('perplexity', {
        name: 'Perplexity AI',
        client: null,
        isAvailable: true,
        generateContent: async (prompt: string, options: GenerateContentOptions = {}) => {
          try {
            const response = await fetch('https://api.perplexity.ai/chat/completions', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                model: options.model || 'llama-3.1-sonar-small-128k-online',
                messages: [
                  ...(options.systemPrompt ? [{ role: 'system', content: options.systemPrompt }] : []),
                  { role: 'user', content: prompt }
                ],
                max_tokens: options.maxTokens || 1500,
                temperature: options.temperature || 0.7,
                top_p: options.topP || 1,
              })
            });
            
            if (!response.ok) {
              throw new Error(`Perplexity API error: ${response.statusText}`);
            }
            
            const data = await response.json();
            return data.choices?.[0]?.message?.content || '';
          } catch (error) {
            console.error('Perplexity API error:', error);
            throw error;
          }
        }
      });
    }

    // Anthropic Claude Configuration
    if (process.env.ANTHROPIC_API_KEY) {
      this.providers.set('claude', {
        name: 'Anthropic Claude',
        client: null,
        isAvailable: true,
        generateContent: async (prompt: string, options: GenerateContentOptions = {}) => {
          try {
            const response = await fetch('https://api.anthropic.com/v1/messages', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${process.env.ANTHROPIC_API_KEY}`,
                'Content-Type': 'application/json',
                'anthropic-version': '2023-06-01',
              },
              body: JSON.stringify({
                model: options.model || 'claude-3-sonnet-20240229',
                max_tokens: options.maxTokens || 1500,
                temperature: options.temperature || 0.7,
                system: options.systemPrompt || '',
                messages: [{ role: 'user', content: prompt }],
              })
            });
            
            if (!response.ok) {
              throw new Error(`Claude API error: ${response.statusText}`);
            }
            
            const data = await response.json();
            return data.content?.[0]?.text || '';
          } catch (error) {
            console.error('Claude API error:', error);
            throw error;
          }
        }
      });
    }
  }

  // Get available AI providers
  getAvailableProviders(): Array<{name: string, key: string, available: boolean}> {
    return Array.from(this.providers.entries()).map(([key, provider]) => ({
      name: provider.name,
      key,
      available: provider.isAvailable
    }));
  }

  // Get provider names only
  getProviderNames(): string[] {
    return Array.from(this.providers.keys());
  }

  // Generate content using specified provider
  async generateContent(provider: string, prompt: string, options: GenerateContentOptions = {}): Promise<string> {
    const aiProvider = this.providers.get(provider);
    if (!aiProvider) {
      throw new Error(`AI provider '${provider}' not configured`);
    }

    if (!aiProvider.isAvailable) {
      throw new Error(`AI provider '${provider}' is not available`);
    }

    try {
      return await aiProvider.generateContent(prompt, options);
    } catch (error) {
      console.error(`Error with ${provider}:`, error);
      throw new Error(`Failed to generate content with ${provider}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Smart provider selection based on availability and performance
  async generateWithBestProvider(prompt: string, options: GenerateContentOptions = {}): Promise<{ content: string; provider: string }> {
    const availableProviders = this.getProviderNames();
    
    if (availableProviders.length === 0) {
      throw new Error('No AI providers configured');
    }

    // Priority order: OpenAI > Gemini > Claude > Perplexity
    const priorityOrder = ['openai', 'gemini', 'claude', 'perplexity'];
    
    for (const provider of priorityOrder) {
      if (availableProviders.includes(provider)) {
        try {
          const content = await this.generateContent(provider, prompt, options);
          return { content, provider };
        } catch (error) {
          console.warn(`Failed to use ${provider}, trying next provider...`, error);
          continue;
        }
      }
    }

    // If priority providers failed, try remaining providers
    for (const provider of availableProviders) {
      if (!priorityOrder.includes(provider)) {
        try {
          const content = await this.generateContent(provider, prompt, options);
          return { content, provider };
        } catch (error) {
          console.warn(`Failed to use ${provider}...`, error);
          continue;
        }
      }
    }

    throw new Error('All AI providers failed');
  }

  // Resume-specific AI functions
  async generateResumeContent(section: string, userInfo: UserInfo, provider?: string): Promise<string> {
    const prompts = {
      summary: `Create a professional resume summary for a ${userInfo.jobTitle || 'professional'} with ${userInfo.experience || '0'} years of experience in ${userInfo.skills?.join(', ') || 'various skills'}. Focus on achievements and value proposition.`,
      
      experience: `Write compelling job descriptions for a ${userInfo.jobTitle || 'professional'} role at ${userInfo.company || 'previous company'}. Include achievements, responsibilities, and impact. Use action verbs and quantify results where possible.`,
      
      skills: `Organize and enhance this skill list for a ${userInfo.jobTitle || 'professional'}: ${userInfo.skills?.join(', ') || 'various skills'}. Group by categories (Technical, Soft Skills, Tools) and add relevant skills.`,
      
      education: `Format and enhance education details for resume. Include relevant coursework, honors, and achievements that align with ${userInfo.jobTitle || 'career'} goals.`,
      
      projects: `Write engaging project descriptions that showcase technical skills and problem-solving abilities for a ${userInfo.jobTitle || 'professional'}. Focus on technologies used, challenges overcome, and results achieved.`,
      
      objective: `Write a compelling career objective for a ${userInfo.jobTitle || 'professional'} with ${userInfo.experience || '0'} years of experience. Make it specific and achievement-focused.`,
      
      achievements: `List and describe key professional achievements for a ${userInfo.jobTitle || 'professional'} with skills in ${userInfo.skills?.join(', ') || 'various areas'}. Focus on measurable impact and results.`
    };

    const prompt = prompts[section as keyof typeof prompts] || prompts.summary;
    
    const options: GenerateContentOptions = {
      systemPrompt: `You are a professional resume writer with expertise in creating compelling, ATS-friendly resume content. Always provide specific, action-oriented content that highlights achievements and value.`,
      maxTokens: 1000,
      temperature: 0.7
    };
    
    if (provider) {
      return await this.generateContent(provider, prompt, options);
    } else {
      const result = await this.generateWithBestProvider(prompt, options);
      return result.content;
    }
  }

  // Cover letter generation
  async generateCoverLetter(jobDescription: string, userInfo: UserInfo, provider?: string): Promise<string> {
    const prompt = `
    Create a compelling cover letter for this job:
    ${jobDescription}
    
    Applicant details:
    - Name: ${userInfo.name || 'Applicant'}
    - Experience: ${userInfo.experience || '0'} years
    - Skills: ${userInfo.skills?.join(', ') || 'Various skills'}
    - Previous roles: ${userInfo.previousRoles?.join(', ') || 'Previous experience'}
    - Job Title: ${userInfo.jobTitle || 'Professional'}
    
    Make it personalized, engaging, and highlight relevant achievements. Keep it concise and professional.
    `;

    const options: GenerateContentOptions = {
      systemPrompt: `You are a professional career counselor specializing in cover letter writing. Create compelling, personalized cover letters that match job requirements and highlight candidate strengths.`,
      maxTokens: 1200,
      temperature: 0.8
    };

    if (provider) {
      return await this.generateContent(provider, prompt, options);
    } else {
      const result = await this.generateWithBestProvider(prompt, options);
      return result.content;
    }
  }

  // Resume optimization
  async optimizeResumeForATS(resumeContent: string, jobDescription: string, provider?: string): Promise<string> {
    const prompt = `
    Optimize this resume content for ATS (Applicant Tracking Systems) based on this job description:
    
    Job Description: ${jobDescription}
    
    Resume Content: ${resumeContent}
    
    Please:
    1. Add relevant keywords from the job description
    2. Improve formatting for ATS compatibility
    3. Enhance skill matching with job requirements
    4. Suggest improvements for better ATS ranking
    5. Ensure proper section headers and formatting
    6. Optimize bullet points with action verbs and metrics
    
    Provide the optimized resume content with explanations for changes made.
    `;

    const options: GenerateContentOptions = {
      systemPrompt: `You are an ATS optimization expert who understands how applicant tracking systems parse and rank resumes. Focus on keyword optimization, proper formatting, and content structure that maximizes ATS compatibility.`,
      maxTokens: 2000,
      temperature: 0.6
    };

    if (provider) {
      return await this.generateContent(provider, prompt, options);
    } else {
      const result = await this.generateWithBestProvider(prompt, options);
      return result.content;
    }
  }

  // Job description analysis
  async analyzeJobDescription(jobDescription: string, provider?: string): Promise<string> {
    const prompt = `
    Analyze this job description and extract:
    1. Required skills and qualifications
    2. Key responsibilities
    3. Important keywords for ATS optimization
    4. Company culture indicators
    5. Salary/benefit information (if mentioned)
    6. Experience level requirements
    
    Job Description: ${jobDescription}
    
    Provide a structured analysis that can help optimize a resume for this position.
    `;

    const options: GenerateContentOptions = {
      systemPrompt: `You are a job market analyst who specializes in breaking down job descriptions to help job seekers understand requirements and optimize their applications.`,
      maxTokens: 1500,
      temperature: 0.5
    };

    if (provider) {
      return await this.generateContent(provider, prompt, options);
    } else {
      const result = await this.generateWithBestProvider(prompt, options);
      return result.content;
    }
  }
}

// Export singleton instance
export const aiService = new AIService();
export default aiService;