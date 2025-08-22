"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const presets: Record<string, string[]> = {
  chat: [
    "Best techno parties this weekend?",
    "What's the easiest airport transfer to Kreuzberg?",
    "Where to watch sunset in Berlin?",
  ],
  "events-planner": [
    "Plan a night out in Friedrichshain (budget €30)",
    "Find a live concert tomorrow near Mitte",
    "Suggest open-air events this Saturday",
  ],
  "trip-planner": [
    "3-day Berlin itinerary (art + food)",
    "Family trip plan with museums and parks",
    "Budget-friendly highlights for 2 days",
  ],
  voice: [
    "Start voice mode",
    "How does voice chat work?",
    "What can I ask you by voice?",
  ],
};

export function QuickActions({ topic, onPick, className }: { topic: string; onPick: (s: string) => void; className?: string }) {
  const items = presets[topic] ?? presets.chat;
  return (
    <div className={cn("mx-auto w-full max-w-3xl gap-2 p-3 pt-4", className)}>
      <div className="flex flex-wrap gap-2">
        {items.map((s) => (
          <Button key={s} variant="outline" size="sm" className="rounded-full" onClick={() => onPick(s)}>
            {s}
          </Button>
        ))}
      </div>
    </div>
  );
}
