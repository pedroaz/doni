"use client";

import * as React from "react";
import { Sidebar } from "@/components/sidebar";
import { ChatWindow } from "@/components/chat/chat-window";
import { MessageInput } from "@/components/chat/message-input";
import { QuickActions } from "@/components/chat/quick-actions";
import { Actions, Action } from "@/components/ai/actions";
import { Plus, Sparkles } from "lucide-react";
import type { Message } from "@/components/chat/message-bubble";

export default function Home() {
  const [open, setOpen] = React.useState(true);
  const [active, setActive] = React.useState<string>("chat");
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hey, I'm Döni — your Berlin buddy. Ask me about tonight's parties, weekend events, visas, Anmeldung, or how to get around!",
    },
  ]);

  const handleSend = (text: string) => {
    const user: Message = { id: crypto.randomUUID(), role: "user", content: text };
    setMessages((m) => [...m, user]);

    // Fake assistant reply for now
    setTimeout(() => {
      const reply: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          active === "events-planner"
            ? "Tell me your date, vibe, and neighborhood. I’ll draft a plan and suggest tickets."
            : active === "trip-planner"
            ? "Tell me when you're visiting, your interests, and budget. I’ll build a Berlin itinerary."
            : active === "voice"
            ? "Starting a voice-friendly chat. Press and hold the mic to talk (mock)."
            : "Ask me anything about Berlin — nightlife, events, transport, visas, hotspots.",
      };
      setMessages((m) => [...m, reply]);
    }, 600);
  };

  return (
    <div className="grid h-dvh w-dvw grid-cols-[auto_1fr] grid-rows-[1fr_auto]">
      <Sidebar
        open={open}
        onToggle={() => setOpen((o) => !o)}
        active={active}
        onPick={setActive}
      />

      <main className="flex h-full flex-col">
        <header className="flex h-14 items-center border-b px-4">
          <div className="mx-auto w-full max-w-3xl">
            <h1 className="font-semibold text-lg">Döni — Berlin Chatbot</h1>
            <p className="text-muted-foreground text-xs">
              Mode: {active === "events-planner"
                ? "Events Planner"
                : active === "trip-planner"
                ? "Trip Planner"
                : active === "voice"
                ? "Voice Conversation"
                : "Chat"}
            </p>
          </div>
        </header>

        <section className="min-h-0 flex-1">
          <QuickActions topic={active} onPick={(s) => {
            const text = s;
            const user = { id: crypto.randomUUID(), role: "user" as const, content: text };
            setMessages((m) => [...m, user]);
            setTimeout(() => {
              const reply = { id: crypto.randomUUID(), role: "assistant" as const, content: "Let me fetch that for you…" };
              setMessages((m) => [...m, reply]);
            }, 300);
          }} />
          <ChatWindow messages={messages} />
        </section>

        <footer className="border-t">
          <div className="mx-auto w-full max-w-3xl px-4 pt-3">
            <Actions className="justify-end">
              <Action
                label="New chat"
                tooltip="New chat"
                onClick={() =>
                  setMessages([
                    {
                      id: "welcome",
                      role: "assistant",
                      content:
                        "Hey, I'm Döni — your Berlin buddy. Ask me about tonight's parties, weekend events, visas, Anmeldung, or how to get around!",
                    },
                  ])
                }
              >
                <Plus className="size-4" />
              </Action>
              <Action
                label="Surprise me"
                tooltip="Surprise me"
                onClick={() => {
                  const seed =
                    active === "events-planner"
                      ? "Plan a night out in Friedrichshain (budget €30)"
                      : active === "trip-planner"
                      ? "3-day Berlin itinerary (art + food)"
                      : active === "voice"
                      ? "How does voice chat work?"
                      : "Best techno parties this weekend?";
                  handleSend(seed);
                }}
              >
                <Sparkles className="size-4" />
              </Action>
            </Actions>
          </div>
          <MessageInput onSend={handleSend} mode={active} />
        </footer>
      </main>
    </div>
  );
}
