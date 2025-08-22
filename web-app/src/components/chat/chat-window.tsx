"use client";

import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble, type Message } from "./message-bubble";

export function ChatWindow({ messages }: { messages: Message[] }) {
  const viewportRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="flex-1">
        <div ref={viewportRef} className="scrollarea-viewport p-4">
          <div className="mx-auto flex max-w-3xl flex-col gap-3">
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} />)
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
