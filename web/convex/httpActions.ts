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
      console.log(imageBase64);
      // Convert base64 string to Uint8Array
      const binaryArray = Uint8Array.from(imageBase64, (c) => c.charCodeAt(0));

      // Create blob from binary array
      const blob = new Blob([binaryArray], { type: 'image/png' });

      // Store the image blob
      const storageId = await ctx.storage.store(blob);
      return storageId;
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
