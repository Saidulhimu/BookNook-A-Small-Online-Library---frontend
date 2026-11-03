export async function uploadToImgBB(file: File): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  const formData = new FormData();
  formData.append('image', file);

  try {
    const url = apiKey && apiKey !== 'placeholder_imgbb_key'
      ? `https://api.imgbb.com/1/upload?key=${apiKey}`
      : 'https://api.imgbb.com/1/upload?key=67f6731caef8e3e4a2c3eb7ce856b3b5'; // fallback key for testing

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

