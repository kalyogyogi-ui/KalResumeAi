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
    
    // Use async/await instead of Promise wrapper
    const uploadResult = await new Promise<{ url: string; fileId: any }>((resolve, reject) => {
      const uploadStream = bucket.openUploadStream(filename, {
        metadata: { 
          contentType,
          uploadedAt: new Date(),
          service: 'github-student-pack'
        }
      });

      uploadStream.end(buffer);
      
      uploadStream.on('finish', () => {
        const url = `/api/storage/mongodb?file=${encodeURIComponent(filename)}&id=${uploadStream.id}`;
        resolve({ url, fileId: uploadStream.id });
      });

      uploadStream.on('error', (error) => {
        reject(error);
      });
    });

    await client.close();
    return NextResponse.json(uploadResult);

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
      await client.close();
      return NextResponse.json({ error: 'File identifier required' }, { status: 400 });
    }
    
    const files = await bucket.find(query).toArray();

    if (files.length === 0) {
      await client.close();
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const file = files[0];
    const downloadStream = bucket.openDownloadStream(file._id);
    
    // Use async/await instead of Promise wrapper
    const downloadResult = await new Promise<{ buffer: Buffer; contentType: string; filename: string }>((resolve, reject) => {
      const chunks: Uint8Array[] = [];
      
      downloadStream.on('data', (chunk) => {
        chunks.push(chunk);
      });

      downloadStream.on('end', () => {
        const buffer = Buffer.concat(chunks);
        resolve({
          buffer,
          contentType: file.metadata?.contentType || 'application/octet-stream',
          filename: file.filename
        });
      });

      downloadStream.on('error', (error) => {
        reject(error);
      });
    });

    await client.close();
    
    // Create proper response with buffer as Uint8Array
    const response = new NextResponse(new Uint8Array(downloadResult.buffer));
    response.headers.set('Content-Type', downloadResult.contentType);
    response.headers.set('Content-Disposition', `attachment; filename="${downloadResult.filename}"`);
    return response;

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
