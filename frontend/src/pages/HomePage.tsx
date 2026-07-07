import { useState } from "react";
import ChatWidget from "../components/ChatWidget";
import type { Persona } from "../components/ChatWidget";

const personas: Persona[] = [
  { id: "hitesh-sir", name: "Hitesh Sir" },
  { id: "piyush-sir", name: "Piyush Sir" },
  { id: "jiveetesh", name: "Jiveetesh" },
];

export default function HomePage() {
  const [activePersona, setActivePersona] = useState<Persona>(personas[0]);

  function handlePersonaChange(persona: Persona) {
    setActivePersona(persona);
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-secondary sm:px-6 lg:px-8">
      <div
        id="container"
        className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl flex-col items-center justify-center gap-6 lg:flex-row lg:items-stretch"
      >
        <div className="grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3 lg:w-56 lg:max-w-none lg:grid-cols-1 lg:content-start">
          {personas.map(persona => (
            <button
              key={persona.id}
              type="button"
              onClick={() => handlePersonaChange(persona)}
              className={`min-h-16 rounded-lg border px-5 text-base font-bold transition ${
                activePersona.id === persona.id
                  ? "border-primary bg-primary text-white shadow-lg"
                  : "border-slate-200 bg-white text-slate-700 hover:border-primary"
              }`}
            >
              {persona.name}
            </button>
          ))}
        </div>

        <ChatWidget persona={activePersona} key={activePersona.id} />
      </div>
    </main>
  );
}
