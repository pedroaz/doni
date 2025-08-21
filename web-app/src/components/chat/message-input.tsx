"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export function MessageInput({ onSend, mode }: { onSend: (text: string) => void; mode?: string }) {
  const [value, setValue] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const ref = React.useRef<HTMLTextAreaElement>(null);

  const submit = async () => {
    const text = value.trim();
    if (!text) return;
    setSubmitting(true);
    onSend(text);
    setValue("");
    setSubmitting(false);
    setTimeout(() => ref.current?.focus(), 0);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl p-4">
      <div className="flex items-end gap-2 rounded-xl border bg-background p-2 shadow-sm">
        <Textarea
          ref={ref}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={
            mode === "events-planner"
              ? "Tell me your date, vibe, and neighborhood…"
              : mode === "trip-planner"
              ? "Travel dates, interests, and budget…"
              : mode === "voice"
              ? "Voice mode tips or tap mic (mock)…"
              : "Ask Döni about Berlin: events, parties, immigration, transport…"
          }
          className="min-h-12 max-h-40 flex-1 resize-none border-none p-3 shadow-none focus-visible:ring-0"
        />
        <Button disabled={!value.trim() || submitting} onClick={submit} size="icon" className="rounded-lg">
          <Send className="size-4" />
        </Button>
      </div>
      <p className="mx-2 mt-2 text-center text-muted-foreground text-xs">
        Döni can share tips on nightlife, events, visas and immigration rules. Always verify with official sources.
      </p>
    </div>
  );
}
