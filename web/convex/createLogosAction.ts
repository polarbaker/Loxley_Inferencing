import { v } from 'convex/values';
import { internalAction } from './_generated/server';

export const createLogos = internalAction({
  args: {
    prompts: v.array(v.string()),
  },
  handler: async (ctx, { prompts }) => {
    // Make POST request to the API endpoint
    const response = await fetch('https://8464-90-183-51-3.ngrok-free.app/ping_and_post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompts: prompts,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  },
});
