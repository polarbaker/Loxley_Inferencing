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

  return new Response('hello world', {
    status: 200,
  });
});
