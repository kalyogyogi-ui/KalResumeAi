import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// GitHub Student Developer Pack - Free Cloud Services Integration

// Cloud Storage Provider Interface
interface CloudStorageProvider {
  name: string;
  uploadFile: (file: File | Buffer, path: string) => Promise<string>;
  getFileUrl: (path: string) => Promise<string>;
  deleteFile: (path: string) => Promise<boolean>;
}

class CloudStorageService {
  private providers: Map<string, CloudStorageProvider> = new Map();
  private defaultProvider: string = 'digitalocean'; // GitHub Student Pack default

  constructor() {
    this.initializeProviders();
  }

  private initializeProviders() {
    // GitHub Student Developer Pack Services Configuration
    
    // DigitalOcean Spaces (GitHub Student Pack: $200 credit)
    if (process.env.DIGITALOCEAN_SPACES_KEY && process.env.DIGITALOCEAN_SPACES_SECRET) {
      const doSpacesClient = new S3Client({
        endpoint: `https://${process.env.DIGITALOCEAN_SPACES_REGION}.digitaloceanspaces.com`,
        region: process.env.DIGITALOCEAN_SPACES_REGION || 'nyc3',
        credentials: {
          accessKeyId: process.env.DIGITALOCEAN_SPACES_KEY,
          secretAccessKey: process.env.DIGITALOCEAN_SPACES_SECRET,
        },
      });

      this.providers.set('digitalocean', {
        name: 'DigitalOcean Spaces (GitHub Student Pack)',
        uploadFile: async (file: File | Buffer, path: string) => {
          const buffer = file instanceof File ? Buffer.from(await file.arrayBuffer()) : file;
          const key = `resumes/${Date.now()}-${path}`;
          
          const command = new PutObjectCommand({
            Bucket: process.env.DIGITALOCEAN_SPACES_BUCKET!,
            Key: key,
            Body: buffer,
            ContentType: file instanceof File ? file.type : 'application/pdf',
            ACL: 'public-read',
          });

          await doSpacesClient.send(command);
          return `https://${process.env.DIGITALOCEAN_SPACES_BUCKET}.${process.env.DIGITALOCEAN_SPACES_REGION}.cdn.digitaloceanspaces.com/${key}`;
        },
        
        getFileUrl: async (path: string) => {
          const command = new GetObjectCommand({
            Bucket: process.env.DIGITALOCEAN_SPACES_BUCKET!,
            Key: path,
          });
          return await getSignedUrl(doSpacesClient, command, { expiresIn: 3600 });
        },
        
        deleteFile: async (path: string) => {
          const command = new DeleteObjectCommand({
            Bucket: process.env.DIGITALOCEAN_SPACES_BUCKET!,
            Key: path,
          });
          await doSpacesClient.send(command);
          return true;
        }
      });
    }

    // Azure Blob Storage (GitHub Student Pack: Free 12 months)
    if (process.env.AZURE_STORAGE_ACCOUNT_NAME && process.env.AZURE_STORAGE_ACCOUNT_KEY) {
      this.providers.set('azure', {
        name: 'Azure Blob Storage (GitHub Student Pack)',
        uploadFile: async (file: File | Buffer, path: string) => {
          const buffer = file instanceof File ? Buffer.from(await file.arrayBuffer()) : file;
          const blobName = `resumes/${Date.now()}-${path}`;
          
          // Using Azure Blob Storage REST API
          const endpoint = `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${process.env.AZURE_STORAGE_CONTAINER}/${blobName}`;
          
          const response = await fetch(endpoint, {
            method: 'PUT',
            headers: {
              'x-ms-blob-type': 'BlockBlob',
              'Content-Type': file instanceof File ? file.type : 'application/pdf',
              'Authorization': `SharedKey ${process.env.AZURE_STORAGE_ACCOUNT_NAME}:${process.env.AZURE_STORAGE_ACCOUNT_KEY}`,
            },
            body: buffer as any, // Type assertion for Buffer compatibility
          });

          if (!response.ok) {
            throw new Error(`Azure upload failed: ${response.statusText}`);
          }

          return endpoint;
        },
        
        getFileUrl: async (path: string) => {
          return `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${process.env.AZURE_STORAGE_CONTAINER}/${path}`;
        },
        
        deleteFile: async (path: string) => {
          const endpoint = `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${process.env.AZURE_STORAGE_CONTAINER}/${path}`;
          
          const response = await fetch(endpoint, {
            method: 'DELETE',
            headers: {
              'Authorization': `SharedKey ${process.env.AZURE_STORAGE_ACCOUNT_NAME}:${process.env.AZURE_STORAGE_ACCOUNT_KEY}`,
            },
          });

          return response.ok;
        }
      });
    }

    // MongoDB GridFS (GitHub Student Pack: Free through MongoDB Atlas)
    if (process.env.MONGODB_URI && process.env.MONGODB_GRIDFS_BUCKET) {
      this.providers.set('mongodb', {
        name: 'MongoDB GridFS (GitHub Student Pack)',
        uploadFile: async (file: File | Buffer, path: string) => {
          const buffer = file instanceof File ? Buffer.from(await file.arrayBuffer()) : file;
          
          // This would require mongodb package and GridFS implementation
          // For now, we'll use a placeholder implementation
          const response = await fetch('/api/storage/mongodb', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              action: 'upload',
              filename: path,
              data: buffer.toString('base64'),
              contentType: file instanceof File ? file.type : 'application/pdf',
            }),
          });

          const data = await response.json();
          return data.url;
        },
        
        getFileUrl: async (path: string) => {
          return `/api/storage/mongodb?file=${encodeURIComponent(path)}`;
        },
        
        deleteFile: async (path: string) => {
          const response = await fetch('/api/storage/mongodb', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ filename: path }),
          });

          return response.ok;
        }
      });
    }

    // Heroku Postgres File Storage (GitHub Student Pack: Free dynos)
    if (process.env.HEROKU_POSTGRES_URL) {
      this.providers.set('heroku', {
        name: 'Heroku Postgres Storage (GitHub Student Pack)',
        uploadFile: async (file: File | Buffer, path: string) => {
          const buffer = file instanceof File ? Buffer.from(await file.arrayBuffer()) : file;
          
          // Store file as base64 in Heroku Postgres
          const response = await fetch('/api/storage/heroku', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              action: 'upload',
              path,
              data: buffer.toString('base64'),
              contentType: file instanceof File ? file.type : 'application/pdf',
            }),
          });

          const data = await response.json();
          return data.url;
        },
        
        getFileUrl: async (path: string) => {
          return `/api/storage/heroku?file=${encodeURIComponent(path)}`;
        },
        
        deleteFile: async (path: string) => {
          const response = await fetch('/api/storage/heroku', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ path }),
          });

          return response.ok;
        }
      });
    }

    // AWS S3 Configuration (GitHub Student Pack: Free tier + credits)
    if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
      const s3Client = new S3Client({
        region: process.env.AWS_REGION || 'us-east-1',
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      });

      this.providers.set('aws', {
        name: 'Amazon S3',
        uploadFile: async (file: File | Buffer, path: string) => {
          const buffer = file instanceof File ? Buffer.from(await file.arrayBuffer()) : file;
          const key = `resumes/${Date.now()}-${path}`;
          
          const command = new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET!,
            Key: key,
            Body: buffer,
            ContentType: file instanceof File ? file.type : 'application/pdf',
          });

          await s3Client.send(command);
          return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
        },
        
        getFileUrl: async (path: string) => {
          const command = new GetObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET!,
            Key: path,
          });
          return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        },
        
        deleteFile: async (path: string) => {
          const command = new DeleteObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET!,
            Key: path,
          });
          await s3Client.send(command);
          return true;
        }
      });
    }

    // Cloudinary Configuration
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY) {
      this.providers.set('cloudinary', {
        name: 'Cloudinary',
        uploadFile: async (file: File | Buffer, path: string) => {
          const formData = new FormData();
          // Convert Buffer to Blob if needed
          const blob = file instanceof File ? file : new Blob([Buffer.from(file)]);
          formData.append('file', blob);
          formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET || 'resumes');
          formData.append('folder', 'resumes');

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/auto/upload`,
            {
              method: 'POST',
              body: formData,
            }
          );

          const data = await response.json();
          return data.secure_url;
        },
        
        getFileUrl: async (path: string) => {
          return path; // Cloudinary URLs are already public
        },
        
        deleteFile: async (path: string) => {
          // Extract public_id from URL
          const publicId = path.split('/').pop()?.split('.')[0];
          
          const timestamp = Math.round(new Date().getTime() / 1000);
          const signature = await this.generateCloudinarySignature({
            public_id: publicId,
            timestamp
          });

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/destroy`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                public_id: publicId,
                signature,
                api_key: process.env.CLOUDINARY_API_KEY,
                timestamp,
              }),
            }
          );

          return response.ok;
        }
      });
    }

    // Google Cloud Storage Configuration
    if (process.env.GOOGLE_CLOUD_PROJECT_ID && process.env.GOOGLE_CLOUD_KEY_FILE) {
      this.providers.set('gcp', {
        name: 'Google Cloud Storage',
        uploadFile: async (file: File | Buffer, path: string) => {
          // Implementation for Google Cloud Storage
          // This would require @google-cloud/storage package
          throw new Error('Google Cloud Storage not implemented yet');
        },
        getFileUrl: async (path: string) => {
          throw new Error('Google Cloud Storage not implemented yet');
        },
        deleteFile: async (path: string) => {
          throw new Error('Google Cloud Storage not implemented yet');
        }
      });
    }
  }

  private async generateCloudinarySignature(params: Record<string, any>): Promise<string> {
    const crypto = await import('crypto');
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&');
    
    return crypto
      .createHash('sha256')
      .update(sortedParams + process.env.CLOUDINARY_API_SECRET)
      .digest('hex');
  }

  // GitHub Student Developer Pack specific methods
  getStudentPackProviders(): Array<{ name: string; id: string; credits: string }> {
    const studentPackProviders = [
      { name: 'DigitalOcean Spaces', id: 'digitalocean', credits: '$200 credit' },
      { name: 'Azure Blob Storage', id: 'azure', credits: 'Free 12 months' },
      { name: 'MongoDB GridFS', id: 'mongodb', credits: 'Free through Atlas' },
      { name: 'Heroku Storage', id: 'heroku', credits: 'Free dynos' },
      { name: 'AWS S3', id: 'aws', credits: 'Free tier + credits' },
    ];

    return studentPackProviders.filter(provider => 
      this.providers.has(provider.id)
    );
  }

  // Upload with GitHub Student Pack priority
  async uploadWithStudentPack(file: File | Buffer, path: string): Promise<{ url: string; provider: string; credits: string }> {
    const studentProviders = this.getStudentPackProviders();
    
    if (studentProviders.length === 0) {
      throw new Error('No GitHub Student Pack providers configured');
    }

    // Try DigitalOcean first (best value), then Azure, then others
    const priority = ['digitalocean', 'azure', 'mongodb', 'heroku', 'aws'];
    
    for (const providerId of priority) {
      if (this.providers.has(providerId)) {
        try {
          const url = await this.uploadFile(providerId, file, path);
          const providerInfo = studentProviders.find(p => p.id === providerId)!;
          return { 
            url, 
            provider: providerInfo.name, 
            credits: providerInfo.credits 
          };
        } catch (error) {
          console.warn(`Failed to upload to ${providerId}, trying next provider...`);
          continue;
        }
      }
    }

    throw new Error('All GitHub Student Pack providers failed');
  }

  // Get storage usage and credits info
  async getStudentPackUsage(): Promise<Array<{ provider: string; usage: string; remaining: string }>> {
    // This would connect to each provider's API to get usage stats
    // For now, return mock data
    const studentProviders = this.getStudentPackProviders();
    
    return studentProviders.map(provider => ({
      provider: provider.name,
      usage: '12%', // Mock usage
      remaining: provider.credits === '$200 credit' ? '$176' : provider.credits,
    }));
  }

  // Get available storage providers
  getAvailableProviders(): string[] {
    return Array.from(this.providers.keys());
  }

  // Upload file using specified provider
  async uploadFile(provider: string, file: File | Buffer, path: string): Promise<string> {
    const storageProvider = this.providers.get(provider);
    if (!storageProvider) {
      throw new Error(`Storage provider '${provider}' not configured`);
    }

    return await storageProvider.uploadFile(file, path);
  }

  // Upload with automatic provider selection
  async upload(file: File | Buffer, path: string, preferredProvider?: string): Promise<{ url: string; provider: string }> {
    const availableProviders = this.getAvailableProviders();
    
    if (availableProviders.length === 0) {
      throw new Error('No cloud storage providers configured');
    }

    const provider = preferredProvider && availableProviders.includes(preferredProvider) 
      ? preferredProvider 
      : availableProviders[0];

    const url = await this.uploadFile(provider, file, path);
    return { url, provider };
  }

  // Get file URL
  async getFileUrl(provider: string, path: string): Promise<string> {
    const storageProvider = this.providers.get(provider);
    if (!storageProvider) {
      throw new Error(`Storage provider '${provider}' not configured`);
    }

    return await storageProvider.getFileUrl(path);
  }

  // Delete file
  async deleteFile(provider: string, path: string): Promise<boolean> {
    const storageProvider = this.providers.get(provider);
    if (!storageProvider) {
      throw new Error(`Storage provider '${provider}' not configured`);
    }

    return await storageProvider.deleteFile(path);
  }

  // Resume-specific upload functions
  async uploadResume(file: File | Buffer, userId: string, resumeId: string): Promise<{ url: string; provider: string }> {
    const path = `${userId}/${resumeId}/resume.pdf`;
    return await this.upload(file, path);
  }

  async uploadProfilePhoto(file: File | Buffer, userId: string): Promise<{ url: string; provider: string }> {
    const path = `${userId}/profile/photo.jpg`;
    return await this.upload(file, path);
  }

  async uploadDocument(file: File | Buffer, userId: string, docType: string): Promise<{ url: string; provider: string }> {
    const timestamp = Date.now();
    const extension = file instanceof File ? file.name.split('.').pop() : 'pdf';
    const path = `${userId}/documents/${docType}_${timestamp}.${extension}`;
    return await this.upload(file, path);
  }

  // Backup and sync across providers
  async syncToMultipleProviders(file: File | Buffer, path: string): Promise<Array<{ url: string; provider: string }>> {
    const availableProviders = this.getAvailableProviders();
    const results = [];

    for (const provider of availableProviders) {
      try {
        const url = await this.uploadFile(provider, file, path);
        results.push({ url, provider });
      } catch (error) {
        console.warn(`Failed to sync to ${provider}:`, error);
      }
    }

    return results;
  }
}

// Export singleton instance
export const cloudStorage = new CloudStorageService();
export default cloudStorage;