'use client';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';
import { Id } from '@/convex/_generated/dataModel';

export default function Dashboard() {
  const { id } = useParams();

  const logoSet = useQuery(api.logos.getLogoSet, {
    logoSetId: id as Id<'logoSets'>,
  });

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Logo Set</h1>
      </div>
      <div className="flex flex-col gap-4">
        <div className="rounded-lg border p-4">
          <h2 className="text-lg font-semibold mb-4">Original Prompt</h2>
          <p className="text-sm text-muted-foreground">{logoSet?.originalPrompt}</p>
        </div>

        <div className="rounded-lg border p-4">
          <h2 className="text-lg font-semibold mb-4">All Prompts</h2>
          <div className="flex flex-col gap-2">
            {logoSet?.logos.map((logo, index) => (
              <div key={index} className="text-sm text-muted-foreground">
                {logo.prompt}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
