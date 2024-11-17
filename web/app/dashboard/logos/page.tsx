'use client';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Link from 'next/link';

export default function Dashboard() {
  const logoSets = useQuery(api.logos.getAllLogos);
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">All Logo Sets</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {logoSets?.length === 0 ? (
          <div className="rounded-lg border p-4 md:col-span-2 lg:col-span-3">
            <div className="text-sm text-muted-foreground text-center py-8">
              {logoSets === undefined ? (
                <div className="animate-pulse">Loading logo sets...</div>
              ) : (
                'No logo sets found'
              )}
            </div>
          </div>
        ) : (
          logoSets?.map((logoSet) => (
            <Link
              key={logoSet._id}
              href={`/dashboard/logos/${logoSet._id}`}
              className="rounded-lg border p-4 hover:bg-muted transition-colors"
            >
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <h2 className="text-lg font-semibold">Original Prompt</h2>
                </div>
                <p className="text-sm text-muted-foreground">{logoSet.originalPrompt}</p>
                <div className="mt-4">
                  <h3 className="text-md font-medium mb-2">Status</h3>
                  <span className="text-sm text-muted-foreground capitalize">{logoSet.status}</span>
                </div>
                <div className="mt-4">
                  <h3 className="text-md font-medium mb-2">Generated Logos</h3>
                  <span className="text-sm text-muted-foreground">
                    {logoSet.logos.length} logos
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
