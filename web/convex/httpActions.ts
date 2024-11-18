import { httpAction } from './_generated/server';
import { internal } from './_generated/api';

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

  // Save the images and metadata to the database

  return new Response(JSON.stringify({ success: true, otherData }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
});
