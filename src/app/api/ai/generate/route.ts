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
    const { section, userInfo, provider, options } = body;

    if (!section || !userInfo) {
      return NextResponse.json({ 
        error: 'Missing required fields: section and userInfo' 
      }, { status: 400 });
    }

    // Generate content using AI service
    const content = await aiService.generateResumeContent(
      section, 
      userInfo, 
      provider
    );

    return NextResponse.json({ 
      content,
      provider: provider || 'auto',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI generation error:', error);
    return NextResponse.json({ 
      error: 'Failed to generate content',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// GET endpoint to check available AI providers
export async function GET() {
  try {
    const availableProviders = aiService.getAvailableProviders();
    
    return NextResponse.json({
      providers: availableProviders,
      total: availableProviders.length,
      status: availableProviders.length > 0 ? 'ready' : 'no_providers',
      defaultProvider: 'auto'
    });

  } catch (error) {
    console.error('Error checking AI providers:', error);
    return NextResponse.json({ 
      error: 'Failed to check AI providers',
      providers: [],
      total: 0,
      status: 'error'
    }, { status: 500 });
  }
}
