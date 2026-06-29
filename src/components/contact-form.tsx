"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";

const inputClass = "field min-h-12 w-full rounded-lg px-4 text-sm";

// Web3Forms access key. Public by design (spam is handled by the honeypot +
// domain allowlist in the Web3Forms dashboard). Set in .env.local:
//   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (!ACCESS_KEY) {
      setStatus("error");
      setError(
        "Lomaketta ei ole vielä yhdistetty (puuttuva access key). Soita 044 572 3200.",
      );
      return;
    }

    try {
      // Web3Forms requires a JSON body for client-side (CORS) submissions.
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
        setError(data.message || "Lähetys epäonnistui. Yritä uudelleen.");
      }
    } catch {
      setStatus("error");
      setError("Verkkovirhe. Tarkista yhteys ja yritä uudelleen.");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex min-h-72 flex-col items-start justify-center gap-3">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(120,160,210,0.3)] text-accent">
          <Send className="h-5 w-5" />
        </span>
        <h3 className="text-xl font-medium text-text-primary">
          Kiitos viestistä.
        </h3>
        <p className="max-w-sm leading-7 text-text-secondary">
          Viesti ohjattiin osoitteisiin info@jobkauppa.fi ja
          jobkiinteistotekniikka@gmail.com. Olemme yhteydessä arkisin.
          Kiireellisissä asioissa soita 044 572 3200.
        </p>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      {/* Web3Forms control fields */}
      <input type="hidden" name="access_key" value={ACCESS_KEY} />
      <input
        type="hidden"
        name="subject"
        value="Uusi yhteydenotto — jobkauppa.fi"
      />
      <input type="hidden" name="from_name" value="JOB Kiinteistötekniikka Oy" />
      {/* primary recipient is the key's address (info@jobkauppa.fi); copy the gmail */}
      <input type="hidden" name="cc" value="jobkiinteistotekniikka@gmail.com" />
      {/* honeypot: real users never fill this */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

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
        <Button type="submit" size="lg" className="sm:w-auto" disabled={sending}>
          {sending ? "Lähetetään…" : "Lähetä viesti"}
          <Send className="h-4 w-4" />
        </Button>
        {status === "error" ? (
          <p className="text-sm text-[#E89B9B]" role="alert">
            {error}
          </p>
        ) : (
          <span className="text-xs text-text-tertiary">
            Tietoja käytetään vain yhteydenottoon.
          </span>
        )}
      </div>
    </form>
  );
}
