export async function uploadToImgBB(file: File): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!apiKey) {
    throw new Error('Image upload is not configured. Add NEXT_PUBLIC_IMGBB_API_KEY to the frontend .env.');
  }

  if (!file.type.startsWith('image/')) {
    throw new Error('Please choose an image file (JPG, PNG, WebP or GIF).');
  }
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('Image is too large. Please choose a file under 10 MB.');
  }

  const formData = new FormData();
  formData.append('image', file);

  try {
    const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

    const res = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (data && data.success && data.data && data.data.display_url) {
      return data.data.display_url;
    }
    throw new Error(data.error?.message || 'Failed to upload image to ImgBB');
  } catch (error: any) {
    console.error('ImgBB Upload Error:', error);
    throw new Error(error.message || 'Image upload failed. Please try again.');
  }
}

