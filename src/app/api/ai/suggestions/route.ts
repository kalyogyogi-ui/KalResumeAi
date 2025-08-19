import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { aiService } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { resumeSection, content, userInfo, provider } = body;

    if (!resumeSection || !content) {
      return NextResponse.json({ 
        error: 'Missing required fields: resumeSection and content' 
      }, { status: 400 });
    }

    // Generate suggestions for resume improvement
    const prompt = `
    Analyze this ${resumeSection} section and provide 5 specific improvement suggestions:
    
    Content: ${content}
    
    User Context: ${userInfo ? JSON.stringify(userInfo) : 'No additional context'}
    
    Provide actionable suggestions to make this section more impactful, ATS-friendly, and professionally compelling.
    Format as a numbered list with specific, implementable recommendations.
    `;

    const suggestions = await aiService.generateContent(
      provider || 'openai',
      prompt,
      {
        systemPrompt: 'You are a professional resume coach providing specific, actionable feedback to improve resume sections.',
        maxTokens: 800,
        temperature: 0.7
      }
    );

    return NextResponse.json({ 
      suggestions,
      section: resumeSection,
      provider: provider || 'auto',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Resume suggestions error:', error);
    return NextResponse.json({ 
      error: 'Failed to generate suggestions',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// GET endpoint for suggestion templates
export async function GET() {
  try {
    const suggestionTypes = {
      summary: [
        'Make your summary more quantifiable with specific metrics',
        'Include industry-specific keywords',
        'Lead with your strongest achievement',
        'Keep it concise (2-3 sentences)',
        'Match the tone to your target industry'
      ],
      experience: [
        'Start bullet points with action verbs',
        'Include quantifiable results and metrics',
        'Focus on achievements rather than responsibilities',
        'Use the STAR method (Situation, Task, Action, Result)',
        'Tailor content to match job requirements'
      ],
      skills: [
        'Group skills by category (Technical, Soft, Tools)',
        'Prioritize skills mentioned in job descriptions',
        'Include proficiency levels where relevant',
        'Remove outdated or irrelevant skills',
        'Add industry-specific certifications'
      ],
      education: [
        'Include relevant coursework for entry-level positions',
        'Highlight academic achievements (GPA > 3.5, honors)',
        'Add relevant projects or thesis topics',
        'Include certifications and continuing education',
        'Use reverse chronological order'
      ]
    };

    return NextResponse.json({
      suggestionTypes,
      availableSections: Object.keys(suggestionTypes),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error getting suggestion templates:', error);
    return NextResponse.json({ 
      error: 'Failed to get suggestion templates' 
    }, { status: 500 });
  }
}
