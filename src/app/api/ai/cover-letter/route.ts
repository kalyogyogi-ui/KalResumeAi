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
    const { jobDescription, userInfo, provider } = body;

    if (!jobDescription || !userInfo) {
      return NextResponse.json({ 
        error: 'Missing required fields: jobDescription and userInfo' 
      }, { status: 400 });
    }

    // Generate cover letter using AI service
    const coverLetter = await aiService.generateCoverLetter(
      jobDescription, 
      userInfo, 
      provider
    );

    return NextResponse.json({ 
      coverLetter,
      provider: provider || 'auto',
      timestamp: new Date().toISOString(),
      wordCount: coverLetter.split(/\s+/).length
    });

  } catch (error) {
    console.error('Cover letter generation error:', error);
    return NextResponse.json({ 
      error: 'Failed to generate cover letter',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
