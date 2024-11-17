'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen p-4 pb-20 gap-16 sm:p-8 font-[family-name:var(--font-geist-sans)] relative">
      <div className="relative z-10">
        <div className="py-12 md:py-24 flex flex-col items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-transparent rounded-lg animate-[increase-height-and-fade-in_0.5s_ease-out_forwards]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[length:24px_24px] animate-[fade-in-down_0.4s_ease-out_forwards]"></div>
          <h1 className="font-bold text-center relative animate-[fade-in-down_0.4s_ease-out_forwards]">
            <span className="font-bold md:text-9xl text-4xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent py-8">
              Loxley Logos
            </span>
          </h1>
          <p className="text-center text-lg md:text-xl mt-8 text-muted-foreground max-w-2xl mx-auto relative animate-[fade-in-down_0.4s_ease-out_forwards] opacity-0 delay-200">
            Generate 1000 logos for $1
          </p>
          <div className="flex gap-4 mt-8 animate-[fade-in-down_0.4s_ease-out_forwards] opacity-0 delay-300">
            <Link href="/dashboard">
              <Button>Get Started</Button>
            </Link>
            <Button
              className="text-sm md:text-lg px-6 py-2"
              onClick={() =>
                document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
              }
              variant="outline"
            >
              Learn More
            </Button>
          </div>
        </div>

        <div
          className="max-w-xl mx-auto pt-6 mt-6 mb-16 animate-[fade-in-down_0.4s_ease-out_forwards] opacity-0 delay-500"
          id="about"
        >
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8">
            <h2 className="text-lg font-semibold mb-4">About Loxley Logos</h2>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                Loxley Logos is a hackathon project from Sundai Club that generates 1000 unique
                logos for just $1. We achieve this incredibly low price point by batching requests
                together and running them on optimized infrastructure designed for high-throughput
                AI generation.
              </p>
              <p>
                Our system intelligently batches your request with others to process them
                efficiently in parallel. You'll receive your 1000 AI-generated logo options in 10
                minutes or less, giving you an incredible variety of choices at an unbeatable price
                point.
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="relative z-10 text-center text-sm text-muted-foreground">
        <div className="flex gap-2 items-center justify-center">
          <p>Loxley Logos © 2024</p>
        </div>
      </footer>
    </div>
  );
}
