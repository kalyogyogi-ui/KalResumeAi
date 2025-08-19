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
    const { resumeContent, jobDescription, provider } = body;

    if (!resumeContent || !jobDescription) {
      return NextResponse.json({ 
        error: 'Missing required fields: resumeContent and jobDescription' 
      }, { status: 400 });
    }

    // Optimize resume for ATS using AI service
    const optimizedResume = await aiService.optimizeResumeForATS(
      resumeContent, 
      jobDescription, 
      provider
    );

    return NextResponse.json({ 
      optimizedResume,
      originalLength: resumeContent.length,
      optimizedLength: optimizedResume.length,
      provider: provider || 'auto',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Resume optimization error:', error);
    return NextResponse.json({ 
      error: 'Failed to optimize resume',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
