'use client';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';
import { Id } from '@/convex/_generated/dataModel';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

export default function Dashboard() {
  const { id } = useParams();

  const logoSet = useQuery(api.logos.getLogoSet, {
    logoSetId: id as Id<'logoSets'>,
  });

  const updateLogoPrompt = useMutation(api.logos.updateLogoPrompt);
  const generateLogos = useMutation(api.logos.generateLogos);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Logo Set</h1>
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-4">
            <h2 className="text-lg font-semibold mb-4">Original Prompt</h2>
            <p className="text-sm text-muted-foreground">{logoSet?.originalPrompt}</p>
          </div>
          <div className="rounded-lg border p-4">
            <h2 className="text-lg font-semibold mb-4">Logo Group Status</h2>
            <p className="text-sm text-muted-foreground">{logoSet?.status}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div>
            <Button onClick={() => generateLogos({ logoSetId: logoSet!._id })}>
              Submit for Image Generation!
            </Button>
          </div>
          <div className="text-sm italic">Review the prompts below before submitting!</div>
        </div>

        <div className="rounded-lg border p-4 mt-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            All Prompts <Badge variant="outline">{logoSet?.logos.length}</Badge>
          </h2>
          <div className="text-sm text-muted-foreground mb-4">
            Updating the prompts will save immediately
          </div>
          <div className="flex flex-col gap-2">
            {logoSet?.logos.map((logo, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="text-sm font-medium">Prompt #{index + 1}</div>
                <Textarea
                  key={index}
                  value={logo.prompt}
                  className="text-sm"
                  onChange={(e) => updateLogoPrompt({ logoId: logo._id, prompt: e.target.value })}
                />
                {index < logoSet.logos.length - 1 && (
                  <hr className="border-t border-gray-200 my-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
