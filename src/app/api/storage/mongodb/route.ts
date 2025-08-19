import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, GridFSBucket } from 'mongodb';

// MongoDB GridFS Storage API Route for GitHub Student Pack
export async function POST(request: NextRequest) {
  try {
    const { action, filename, data, contentType } = await request.json();
    
    if (action !== 'upload') {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    
    const db = client.db(process.env.MONGODB_DATABASE || 'resumebuilder');
    const bucket = new GridFSBucket(db, { 
      bucketName: process.env.MONGODB_GRIDFS_BUCKET || 'resume_files' 
    });

    const buffer = Buffer.from(data, 'base64');
    const uploadStream = bucket.openUploadStream(filename, {
      metadata: { 
        contentType,
        uploadedAt: new Date(),
        service: 'github-student-pack'
      }
    });

    return new Promise((resolve) => {
      uploadStream.end(buffer);
      
      uploadStream.on('finish', () => {
        const url = `/api/storage/mongodb?file=${encodeURIComponent(filename)}&id=${uploadStream.id}`;
        client.close();
        resolve(NextResponse.json({ url, fileId: uploadStream.id }));
      });

      uploadStream.on('error', (error) => {
        client.close();
        resolve(NextResponse.json({ error: error.message }, { status: 500 }));
      });
    });

  } catch (error) {
    console.error('MongoDB GridFS upload error:', error);
    return NextResponse.json({ 
      error: 'Upload failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('file');
    const fileId = searchParams.get('id');
    
    if (!filename && !fileId) {
      return NextResponse.json({ error: 'File identifier required' }, { status: 400 });
    }

    const client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    
    const db = client.db(process.env.MONGODB_DATABASE || 'resumebuilder');
    const bucket = new GridFSBucket(db, { 
      bucketName: process.env.MONGODB_GRIDFS_BUCKET || 'resume_files' 
    });

    // Find file by filename or ObjectId
    const query: any = {};
    if (filename) {
      query.filename = filename;
    } else if (fileId) {
      query._id = fileId;
    } else {
      client.close();
      return NextResponse.json({ error: 'File identifier required' }, { status: 400 });
    }
    
    const files = await bucket.find(query).toArray();

    if (files.length === 0) {
      client.close();
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const file = files[0];
    const downloadStream = bucket.openDownloadStream(file._id);
    
    const chunks: Uint8Array[] = [];
    
    return new Promise((resolve) => {
      downloadStream.on('data', (chunk) => {
        chunks.push(chunk);
      });

      downloadStream.on('end', () => {
        const buffer = Buffer.concat(chunks);
        client.close();
        
        const response = new NextResponse(buffer);
        response.headers.set('Content-Type', file.metadata?.contentType || 'application/octet-stream');
        response.headers.set('Content-Disposition', `attachment; filename="${file.filename}"`);
        resolve(response);
      });

      downloadStream.on('error', (error) => {
        client.close();
        resolve(NextResponse.json({ error: error.message }, { status: 500 }));
      });
    });

  } catch (error) {
    console.error('MongoDB GridFS download error:', error);
    return NextResponse.json({ 
      error: 'Download failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { filename } = await request.json();
    
    const client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    
    const db = client.db(process.env.MONGODB_DATABASE || 'resumebuilder');
    const bucket = new GridFSBucket(db, { 
      bucketName: process.env.MONGODB_GRIDFS_BUCKET || 'resume_files' 
    });

    // Find file by filename
    const files = await bucket.find({ filename }).toArray();
    
    if (files.length === 0) {
      client.close();
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    await bucket.delete(files[0]._id);
    client.close();
    
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('MongoDB GridFS delete error:', error);
    return NextResponse.json({ 
      error: 'Delete failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
