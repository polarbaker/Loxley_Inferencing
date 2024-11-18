'use client';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Link from 'next/link';

export default function Dashboard() {
  const imageSets = useQuery(api.logos.getAllImages);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">All Images Test</h1>
      </div>

      <div className="flex w-full">
        {imageSets?.map((imageSet, i) => (
          <div
            key={i}
            className="grid grid-cols-3 flex-row gap-2 rounded-lg border p-4 overflow-x-auto"
          >
            {imageSet.urls.map((url, j) => (
              <img
                key={j}
                src={url}
                alt={`Generated image ${j + 1}`}
                className="h-32 w-32 flex-shrink-0 rounded-lg object-cover"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
