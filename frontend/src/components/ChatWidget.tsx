import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { FiCpu, FiSend, FiUser } from "react-icons/fi";

export type Persona = {
  id: "hitesh-sir" | "piyush-sir" | "jiveetesh";
  name: string;
};

type PersonaTheme = {
  tone: string;
  accent: string;
  widgetBackground: string;
  ring: string;
};

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  text: string;
};

type ChatWidgetProps = {
  persona: Persona;
};

const personaThemes: Record<Persona["id"], PersonaTheme> = {
  "hitesh-sir": {
    tone: "Practical coding guidance",
    accent: "from-emerald-500 to-teal-600",
    widgetBackground: "bg-gradient-to-br from-emerald-50 via-white to-teal-100",
    ring: "ring-emerald-200",
  },
  "piyush-sir": {
    tone: "Clear problem solving",
    accent: "from-sky-500 to-indigo-600",
    widgetBackground: "bg-gradient-to-br from-sky-50 via-white to-indigo-100",
    ring: "ring-sky-200",
  },
  jiveetesh: {
    tone: "Personal AI companion",
    accent: "from-rose-500 to-amber-500",
    widgetBackground: "bg-gradient-to-br from-rose-50 via-white to-amber-100",
    ring: "ring-rose-200",
  },
};

const personaOpeners: Record<Persona["id"], string> = {
  "hitesh-sir": "Haanji, kya build karna hai aaj?",
  "piyush-sir": "Tell me the problem. We will break it down cleanly. Btw Coding is Dead !",
  jiveetesh:
    "Hi, I'am Jiveetesh Mourya, The builder of this project. Prompt with 'Hey Jiveetesh' to know more about me",
};

export default function ChatWidget({ persona }: ChatWidgetProps) {
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const theme = personaThemes[persona.id];

  const visibleMessages = useMemo(
    () => [
      {
        id: 0,
        role: "assistant" as const,
        text: personaOpeners[persona.id],
      },
      ...messages,
    ],
    [messages, persona.id]
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedDraft = draft.trim();

    if (!trimmedDraft) {
      return;
    }

    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: Date.now(),
        role: "user",
        text: trimmedDraft,
      },
    ]);
    setDraft("");
  }

  return (
    <section
      className={`flex h-155 max-h-[calc(100vh-14rem)] min-h-130 w-full max-w-3xl flex-col overflow-hidden rounded-lg border border-white/70 ${theme.widgetBackground} shadow-2xl shadow-slate-200/80 ring-1 ${theme.ring}`}
      aria-label={`${persona.name} chat widget`}
    >
      <header className="flex items-center gap-3 border-b border-white/70 bg-white/60 px-5 py-4 backdrop-blur">
        <div
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-linear-to-br ${theme.accent} text-white shadow-md`}
          aria-hidden="true"
        >
          <FiCpu className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold text-slate-900">{persona.name}</h1>
          <p className="truncate text-sm font-medium text-slate-500">{theme.tone}</p>
        </div>
      </header>

      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-5">
        {visibleMessages.map(message => {
          const isUser = message.role === "user";

          return (
            <div key={message.id} className={`flex items-end gap-2 ${isUser ? "justify-end" : ""}`}>
              {!isUser && (
                <div
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-linear-to-br ${theme.accent} text-white`}
                  aria-hidden="true"
                >
                  <FiCpu className="h-4 w-4" />
                </div>
              )}

              <div
                className={`max-w-[82%] rounded-lg px-4 py-3 text-sm leading-6 shadow-sm ${
                  isUser
                    ? "bg-slate-900 text-white"
                    : "border border-white/80 bg-white/85 text-slate-700"
                }`}
              >
                {message.text}
              </div>

              {isUser && (
                <div
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-slate-600 shadow-sm"
                  aria-hidden="true"
                >
                  <FiUser className="h-4 w-4" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex gap-3 border-t border-white/70 bg-white/70 p-4 backdrop-blur"
      >
        <input
          value={draft}
          onChange={event => setDraft(event.target.value)}
          className="min-h-12 flex-1 rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-200"
          placeholder={`Message ${persona.name}`}
          aria-label={`Message ${persona.name}`}
        />
        <button
          type="submit"
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-linear-to-br ${theme.accent} text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 ${theme.ring}`}
          aria-label="Send message"
        >
          <FiSend className="h-5 w-5" />
        </button>
      </form>
    </section>
  );
}
