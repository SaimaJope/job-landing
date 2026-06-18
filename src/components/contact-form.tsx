"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";

const inputClass = "field min-h-12 w-full rounded-lg px-4 text-sm";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    console.info("Yhteydenottolomakkeen placeholder-lähetys:", payload);
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm text-text-secondary">
          Nimi
          <input className={inputClass} name="name" autoComplete="name" required />
        </label>
        <label className="grid gap-2 text-sm text-text-secondary">
          Sähköposti
          <input
            className={inputClass}
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </label>
      </div>
      <label className="grid gap-2 text-sm text-text-secondary">
        Puhelin
        <input className={inputClass} name="phone" type="tel" autoComplete="tel" />
      </label>
      <label className="grid gap-2 text-sm text-text-secondary">
        Viesti
        <textarea
          className={`${inputClass} min-h-36 resize-y py-3`}
          name="message"
          placeholder="Kerro kohteesta, aikataulusta ja tarvittavasta työstä."
          required
        />
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" className="sm:w-auto">
          Lähetä viesti
          <Send className="h-4 w-4" />
        </Button>
        {sent ? (
          <p className="text-sm text-accent-glow">
            Kiitos! Viesti kirjattiin konsoliin. Sähköposti-integraatio kytketään
            ennen julkaisua.
          </p>
        ) : null}
      </div>
    </form>
  );
}
