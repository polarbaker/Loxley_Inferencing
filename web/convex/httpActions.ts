import { httpAction } from './_generated/server';
import { api } from './_generated/api';

export const testGetMessage = httpAction(async (ctx, request) => {
  return new Response('hello world', {
    status: 200,
  });
});

export const receiveImage = httpAction(async (ctx, request) => {
  const body = await request.json();
  console.log(body);

  // Extract data from request body
  const { images, ...otherData } = body;

  // Store each image in Convex storage
  const imageIds = await Promise.all(
    images.map(async (imageBase64: string) => {
      // Log only the length and first/last few characters of base64 string
      console.log(`Base64 length: ${imageBase64.length}`);
      console.log(`Base64 preview: ${imageBase64.slice(0, 50)}...${imageBase64.slice(-50)}`);

      try {
        // Ensure the base64 string is properly formatted (remove data URL prefix if present)
        const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');

        // Convert base64 directly to Uint8Array
        const binaryStr = atob(base64Data);
        const bytes = new Uint8Array(binaryStr.length);
        for (let i = 0; i < binaryStr.length; i++) {
          bytes[i] = binaryStr.charCodeAt(i);
        }

        // Create blob from Uint8Array
        const blob = new Blob([bytes], { type: 'image/png' });
        console.log(`Blob size: ${blob.size} bytes`);

        // Store the image blob
        const storageId = await ctx.storage.store(blob);
        console.log(`Successfully stored image with ID: ${storageId}`);
        return storageId;
      } catch (error) {
        console.error('Error processing image:', error);
        throw error;
      }
    }),
  );

  console.log(imageIds);

  // Save metadata and image IDs to database using internal mutation
  await ctx.runMutation(api.logos.saveImages, {
    images: imageIds,
    metadata: {},
  });

  // Save the images and metadata to the database

  return new Response(JSON.stringify({ success: true, otherData }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
});
