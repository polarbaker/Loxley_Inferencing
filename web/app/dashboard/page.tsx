'use client';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { GalleryVerticalEnd, SquarePen } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Home</h1>
      </div>

      <div className="flex flex-col gap-6">
        <div className="rounded-lg border">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Recent Processing Jobs</h2>
            <div className="text-sm text-muted-foreground text-center py-8">
              No logo sets generated!
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/dashboard/generate"
            className="group rounded-lg border p-4 hover:border-primary transition-colors"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <SquarePen className="h-5 w-5" />
                <h3 className="font-semibold">Generate a New Logo</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Create a new set of 1000 unique logo variations
              </p>
            </div>
          </Link>

          <Link
            href="/dashboard/logos"
            className="group rounded-lg border p-4 hover:border-primary transition-colors"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <GalleryVerticalEnd className="h-5 w-5" />
                <h3 className="font-semibold">View Logo Sets</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Browse and manage your generated logo collections
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
