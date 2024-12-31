import type { NextApiRequest, NextApiResponse } from 'next';

interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  error?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { file } = req.body;

    if (!file) {
      return res.status(400).json({ error: 'File is required' });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      return res
        .status(500)
        .json({ error: 'Cloudinary configuration is missing in environment variables' });
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
        return res.status(200).json({ url: data.secure_url, publicId: data.public_id });
      } else {
        return res.status(response.status).json({ error: data.error || 'Image upload failed' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Image upload failed', details: (error as Error).message });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
