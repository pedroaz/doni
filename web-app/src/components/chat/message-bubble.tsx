"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { ReactNode } from "react";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: ReactNode | string;
};

export function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <div
      className={cn(
        "flex w-full items-end gap-3",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <Avatar className="size-8 ring-1 ring-border">
          <AvatarImage src="/globe.svg" alt="Döni" />
          <AvatarFallback>DE</AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-secondary text-foreground rounded-bl-none"
        )}
      >
        {typeof message.content === "string" ? (
          <p className="leading-relaxed">{message.content}</p>
        ) : (
          message.content
        )}
      </div>

      {isUser && (
        <Avatar className="size-8 ring-1 ring-border">
          <AvatarImage src="/window.svg" alt="You" />
          <AvatarFallback>YOU</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
