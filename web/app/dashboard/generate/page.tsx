'use client';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';

const schema = yup.object().shape({
  prompt: yup
    .string()
    .required('Please enter a prompt')
    .min(3, 'Prompt must be at least 3 characters'),
});

export default function Dashboard() {
  const createLogoSet = useMutation(api.logos.createLogoSet);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    setIsLoading(true);
    try {
      const id = await createLogoSet({ prompt: data.prompt });

      router.push(`/dashboard/logos/${id}`);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Generate</h1>
        <div className="flex flex-col gap-2 text-sm text-gray-600">
          <p>Tips for a great logo prompt:</p>
          <ul className="list-disc list-inside ml-2">
            <li>Tell us about your company and what it does</li>
            <li>Put the company name in parentheses (e.g. "Example Co")</li>
            <li>Describe the style you want (modern, vintage, playful, etc)</li>
            <li>Tell us what colors and images you want</li>
          </ul>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex-1 max-w-xl">
          <Textarea {...register('prompt')} placeholder="Enter your logo prompt..." />
          {errors.prompt && <p className="mt-1 text-sm text-red-500">{errors.prompt.message}</p>}
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-fit">
          {isSubmitting ? 'Generating...' : 'Generate'}
        </Button>
      </form>
    </div>
  );
}
