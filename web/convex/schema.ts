import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';
import { Id } from './_generated/dataModel';

export enum LogoSetStatus {
  CREATED = 'created', // Initial state
  EXPANDING = 'expanding', // Generating more prompts from the initial prompt
  REFINING = 'refining', // Refining the prompts before submitting
  GENERATING = 'generating', // Generating logos
  COMPLETED = 'completed', // All prompts have been generated into logos
}

export enum LogoStatus {
  CREATED = 'created',
  PENDING = 'pending',
  COMPLETED = 'completed',
}

export interface Logo {
  _id: Id<'logos'>;
  _createdAt?: Date;
  prompt: string;
  status: LogoStatus;
  storageId: string;
}

export interface LogoSet {
  _id: Id<'logoSets'>;
  _createdAt?: Date;
  originalPrompt: string;
  status: LogoSetStatus;
  logos: Logo[];
}

export default defineSchema({
  logoSets: defineTable({
    originalPrompt: v.string(),
    status: v.string(),
  }),
  logos: defineTable({
    logoSetId: v.id('logoSets'),
    prompt: v.string(),
    status: v.string(),
    storageId: v.optional(v.string()),
  }).index('by_logo_set_id', ['logoSetId']),
  images: defineTable({
    images: v.array(v.string()),
    metadata: v.object({}),
  }),
});
