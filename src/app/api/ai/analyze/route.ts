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
    const { jobDescription, provider } = body;

    if (!jobDescription) {
      return NextResponse.json({ 
        error: 'Missing required field: jobDescription' 
      }, { status: 400 });
    }

    // Analyze job description using AI service
    const analysis = await aiService.analyzeJobDescription(
      jobDescription, 
      provider
    );

    return NextResponse.json({ 
      analysis,
      jobLength: jobDescription.length,
      provider: provider || 'auto',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Job description analysis error:', error);
    return NextResponse.json({ 
      error: 'Failed to analyze job description',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
