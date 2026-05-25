"use client";

import { FormEvent, useState } from "react";
import { Send, ShoppingBag } from "lucide-react";

import { useCart } from "@/components/inquiry/cart-provider";
import { Button } from "@/components/ui/button";

const inputClass = "field min-h-12 w-full rounded-lg px-4 text-sm";

export function ContactForm() {
  const { items, count, summary, clear } = useCart();
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      ...Object.fromEntries(formData.entries()),
      products: items,
    };

    console.info("Yhteydenottolomakkeen placeholder-lähetys:", payload);
    setSent(true);
    event.currentTarget.reset();
    clear();
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      {count > 0 ? (
        <div className="rounded-xl border border-border bg-white/[0.02] p-4">
          <div className="flex items-center gap-2 text-sm text-text-primary">
            <ShoppingBag className="h-4 w-4 text-accent-glow" />
            Tilauslista lähetetään viestin mukana
            <span className="text-text-tertiary">({count})</span>
          </div>
          <ul className="mt-3 flex flex-col gap-1.5">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 text-sm text-text-secondary"
              >
                <span className="truncate">{item.name}</span>
                <span className="shrink-0 font-mono text-[11px] text-text-tertiary">
                  {item.code} · {item.qty} kpl
                </span>
              </li>
            ))}
          </ul>
          {/* keep the list in the payload even without JS-based submission */}
          <input type="hidden" name="tilauslista" value={summary()} />
        </div>
      ) : null}

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
          placeholder={
            count > 0
              ? "Kerro toimitustarpeesta, aikataulusta tai kysy saatavuudesta."
              : undefined
          }
          required={count === 0}
        />
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" className="sm:w-auto">
          {count > 0 ? "Lähetä tilauspyyntö" : "Lähetä viesti"}
          <Send className="h-4 w-4" />
        </Button>
        {sent ? (
          <p className="text-sm text-accent-glow">
            Kiitos! Viesti kirjattiin konsoliin. Sähköposti-integraatio voidaan kytkeä
            seuraavaksi.
          </p>
        ) : null}
      </div>
    </form>
  );
}
