import { Bot, Send, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AI_ANSWERS, AI_SUGGESTIONS } from "@/lib/campus-data";
import { cn } from "@/lib/utils";

type Message = { from: "bot" | "user"; text: string };

const GREETING: Message = {
  from: "bot",
  text: "Hello! I'm the BVCITS AI Assistant. Ask me how to use the portal — certificates, exams, syllabus, scholarships, placements or contacts.",
};

const VERIFY_NOTE =
  "Please verify important or official information with the BVCITS office before acting on it.";

function answerFor(question: string) {
  const q = question.toLowerCase();
  const hit = AI_ANSWERS.find((entry) => entry.match.some((m) => q.includes(m)));
  if (!hit) {
    return `I can guide you through portal features such as attendance, examinations, results, library, certificates, scholarships, grievances, placements and training. ${VERIFY_NOTE}`;
  }
  return `${hit.answer}\n\n${VERIFY_NOTE}`;
}

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [value, setValue] = useState("");

  function ask(question: string) {
    if (!question.trim()) return;
    setMessages((prev) => [
      ...prev,
      { from: "user", text: question },
      { from: "bot", text: answerFor(question) },
    ]);
    setValue("");
  }

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open ? (
        <section
          aria-label="BVCITS AI Assistant"
          className="flex h-[27rem] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-elevated"
        >
          <header className="surface-navy flex items-center gap-3 px-4 py-3">
            <span className="grid size-9 place-items-center rounded-xl bg-gold/20 text-lg">🤖</span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">BVCITS AI Assistant</p>
              <p className="text-xs opacity-70">Campus assistant · portal guidance</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              className="ml-auto rounded-md p-1 opacity-80 transition-opacity hover:opacity-100"
            >
              <X className="size-4" aria-hidden />
            </button>
          </header>

          <ScrollArea className="flex-1 px-4 py-3">
            <div className="space-y-3">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "max-w-[85%] rounded-xl px-3 py-2 text-sm whitespace-pre-line",
                    message.from === "bot"
                      ? "bg-secondary text-secondary-foreground"
                      : "ml-auto bg-primary text-primary-foreground",
                  )}
                >
                  {message.text}
                </div>
              ))}
              {messages.length === 1 ? (
                <div className="space-y-2 pt-1">
                  <p className="text-xs font-medium text-muted-foreground">Try asking</p>
                  {AI_SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => ask(suggestion)}
                      className="block w-full rounded-lg border border-border px-3 py-2 text-left text-xs transition-colors hover:border-gold hover:bg-secondary"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </ScrollArea>

          <form
            className="flex items-center gap-2 border-t border-border p-3"
            onSubmit={(event) => {
              event.preventDefault();
              ask(value);
            }}
          >
            <label className="sr-only" htmlFor="ai-question">
              Ask the assistant
            </label>
            <Input
              id="ai-question"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="Ask about the portal…"
            />
            <Button type="submit" size="icon" aria-label="Send question">
              <Send className="size-4" aria-hidden />
            </Button>
          </form>
        </section>
      ) : null}

      <Button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="h-12 gap-2 rounded-full px-5 shadow-elevated"
        aria-expanded={open}
      >
        <Bot className="size-5" aria-hidden />
        <span className="hidden sm:inline">AI Assistant</span>
      </Button>
    </div>
  );
}
