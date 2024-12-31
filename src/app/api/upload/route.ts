// pages/api/upload.ts

import type { NextApiRequest, NextApiResponse } from 'next';

interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  error?: string;
}

export default async function Post(req: NextApiRequest, res: NextApiResponse) {
  
    const { file } = req.body;

    // The Cloudinary upload URL
    const url = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`;

    // Create form data
    const formData = new URLSearchParams();
    formData.append('file', file);
    formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET!);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      const data: CloudinaryResponse = await response.json();

      if (response.ok) {
        // Return the secure URL and public ID from Cloudinary response
        return res.status(200).json({ url: data.secure_url, publicId: data.public_id });
      } else {
        return res.status(response.status).json({ error: data.error || 'Image upload failed' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Image upload failed', details: (error as Error).message });
    }
}