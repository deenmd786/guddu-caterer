import { NextRequest, NextResponse } from 'next/server';

interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  error?: string;
}

export async function POST(req: NextRequest) {
  const { file } = await req.json(); // Get the file from the request body

  if (!file) {
    return NextResponse.json({ error: 'File is required' }, { status: 400 });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    return NextResponse.json({ error: 'Cloudinary configuration is missing in environment variables' }, { status: 500 });
  }

  // The Cloudinary upload URL
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  try {
    // Create form data
    const formData = new URLSearchParams();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // Required for URLSearchParams
      },
      body: formData,
    });

    const data: CloudinaryResponse = await response.json();

    if (response.ok) {
      // Return the secure URL and public ID from Cloudinary response
      return NextResponse.json({ url: data.secure_url, publicId: data.public_id });
    } else {
      return NextResponse.json({ error: data.error || 'Image upload failed' }, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Image upload failed', details: (error as Error).message }, { status: 500 });
  }
}
