import { v } from 'convex/values';
import { internalMutation, internalQuery, mutation, query } from './_generated/server';
import { Logo, LogoSet, LogoSetStatus, LogoStatus } from './schema';
import { generateRandomPromptPermutations } from '../lib/prompts/generatePrompts';

export const createLogoSet = mutation({
  args: {
    prompt: v.string(),
  },
  handler: async (ctx, args) => {
    const logoSet = await ctx.db.insert('logoSets', {
      originalPrompt: args.prompt,
      status: LogoSetStatus.CREATED,
    });

    // Call your generator stuff
    const prompts = generateRandomPromptPermutations(args.prompt, 33);

    console.log(prompts);
    // Create array of 100 promises to create logos in parallel
    await Promise.all(
      prompts.map((val) => {
        console.log(`Saving ${val}`);
        return ctx.db.insert('logos', {
          logoSetId: logoSet,
          prompt: val,
          status: LogoStatus.CREATED,
        });
      }),
    );

    return logoSet;
  },
});

export const createLogo = internalMutation({
  args: {
    logoSetId: v.id('logoSets'),
    prompt: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('logos', {
      logoSetId: args.logoSetId,
      prompt: args.prompt,
      status: LogoStatus.CREATED,
    });
  },
});

export const updateLogoPrompt = mutation({
  args: {
    logoId: v.id('logos'),
    prompt: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.logoId, {
      prompt: args.prompt,
    });
  },
});

export const getLogoSet = query({
  args: {
    logoSetId: v.id('logoSets'),
  },
  handler: async (ctx, args): Promise<LogoSet> => {
    const logoSet = await ctx.db.get(args.logoSetId);

    if (!logoSet) {
      throw new Error('Logo set not found');
    }

    const logos = await ctx.db
      .query('logos')
      .withIndex('by_logo_set_id', (q) => q.eq('logoSetId', logoSet?._id))
      .collect();

    return {
      ...logoSet,
      logos: logos as Logo[],
    } as LogoSet;
  },
});

export const getAllLogos = query({
  args: {},
  handler: async (ctx) => {
    const allLogoSets = await ctx.db.query('logoSets').collect();

    return Promise.all(
      allLogoSets.map(async (logoSet) => {
        return await getLogoSet(ctx, { logoSetId: logoSet._id });
      }),
    );
  },
});

export const saveImages = mutation({
  args: {
    images: v.array(v.string()),
    metadata: v.object({}),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('images', {
      imageStorageIds: args.images,
      metadata: args.metadata,
    });
  },
});

export const getAllImages = query({
  args: {},
  handler: async (ctx) => {
    const images = await ctx.db.query('images').collect();
    return Promise.all(
      images.map(async (image) => ({
        ...image,
        urls: await Promise.all(image.imageStorageIds.map((id) => ctx.storage.getUrl(id))),
      })),
    );
  },
});
