import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'pg';

// Heroku Postgres File Storage API Route for GitHub Student Pack
export async function POST(request: NextRequest) {
  try {
    const { action, path, data, contentType } = await request.json();
    
    if (action !== 'upload') {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const client = new Client({
      connectionString: process.env.HEROKU_POSTGRES_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });

    await client.connect();

    // Create table if not exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS file_storage (
        id SERIAL PRIMARY KEY,
        path VARCHAR(255) UNIQUE NOT NULL,
        content_type VARCHAR(100),
        data TEXT NOT NULL,
        size INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert or update file
    const size = Buffer.from(data, 'base64').length;
    
    await client.query(`
      INSERT INTO file_storage (path, content_type, data, size) 
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (path) 
      DO UPDATE SET 
        content_type = EXCLUDED.content_type,
        data = EXCLUDED.data,
        size = EXCLUDED.size,
        updated_at = CURRENT_TIMESTAMP
    `, [path, contentType, data, size]);

    await client.end();

    const url = `/api/storage/heroku?file=${encodeURIComponent(path)}`;
    return NextResponse.json({ url, path, size });

  } catch (error) {
    console.error('Heroku Postgres upload error:', error);
    return NextResponse.json({ 
      error: 'Upload failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('file');
    
    if (!path) {
      return NextResponse.json({ error: 'File path required' }, { status: 400 });
    }

    const client = new Client({
      connectionString: process.env.HEROKU_POSTGRES_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });

    await client.connect();

    const result = await client.query(
      'SELECT content_type, data FROM file_storage WHERE path = $1',
      [path]
    );

    await client.end();

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const file = result.rows[0];
    const buffer = Buffer.from(file.data, 'base64');
    
    const response = new NextResponse(buffer);
    response.headers.set('Content-Type', file.content_type || 'application/octet-stream');
    response.headers.set('Content-Disposition', `attachment; filename="${path.split('/').pop()}"`);
    
    return response;

  } catch (error) {
    console.error('Heroku Postgres download error:', error);
    return NextResponse.json({ 
      error: 'Download failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { path } = await request.json();
    
    if (!path) {
      return NextResponse.json({ error: 'File path required' }, { status: 400 });
    }

    const client = new Client({
      connectionString: process.env.HEROKU_POSTGRES_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });

    await client.connect();

    const result = await client.query(
      'DELETE FROM file_storage WHERE path = $1 RETURNING id',
      [path]
    );

    await client.end();

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Heroku Postgres delete error:', error);
    return NextResponse.json({ 
      error: 'Delete failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
