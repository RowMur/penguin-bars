"use client";

import { FormEvent, useState } from "react";
import { counties } from "@/lib/counties";
import { flavours } from "@/lib/flavours";
import { shops } from "@/lib/shops";

export default function PenguinBarForm() {
  const [formData, setFormData] = useState({
    joke: "",
    fact: "",
    design: "",
    flavour: "Original",
    county: "",
    shop: "",
    website: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const fieldClassName =
    "w-full rounded-lg border-[3px] border-[#0B4AA7] bg-white px-4 py-2 font-medium text-black focus:outline-none focus:ring-4 focus:ring-[#FFD60A]";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);

    const selectedCounty = formData.county.trim();
    if (!counties.includes(selectedCounty)) {
      setMessage({
        type: "error",
        text: "Please select a valid county from the list.",
      });
      return;
    }

    if (!shops.includes(formData.shop as (typeof shops)[number])) {
      setMessage({
        type: "error",
        text: "Please select a valid shop from the dropdown.",
      });
      return;
    }

    if (!flavours.includes(formData.flavour as (typeof flavours)[number])) {
      setMessage({
        type: "error",
        text: "Please select a valid flavour from the dropdown.",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/penguin-bars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setMessage({
        type: "success",
        text: "Penguin bar logged successfully! 🐧",
      });
      setFormData({
        joke: "",
        fact: "",
        design: "",
        flavour: "",
        county: "",
        shop: "",
        website: "",
      });

      // Refresh the page after 1.5 seconds to show updated stats
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch {
      setMessage({
        type: "error",
        text: "Failed to submit penguin bar. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-0">
      <div className="rounded-2xl border-4 border-[#0B4AA7] bg-[#FFD60A] p-8 shadow-2xl">
        <h2 className="mb-2 text-xl md:text-3xl font-black tracking-tight text-black">
          LOG YOUR BAR
        </h2>
        <p className="mb-6 font-bold text-[#0B4AA7]">
          Share your findings with us!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="mb-2 inline-block rounded px-3 py-1 text-sm font-bold text-black">
              😄 JOKE
            </label>
            <textarea
              name="joke"
              value={formData.joke}
              onChange={handleChange}
              placeholder="What's the joke on this pack?"
              className={fieldClassName}
              rows={2}
              required
            />
          </div>

          <div>
            <label className="mb-2 inline-block rounded px-3 py-1 text-sm font-bold text-black">
              🧠 FACT (OPTIONAL)
            </label>
            <textarea
              name="fact"
              value={formData.fact}
              onChange={handleChange}
              placeholder="What fact is on the back?"
              className={fieldClassName}
              rows={2}
            />
          </div>

          <div>
            <label className="mb-2 inline-block rounded px-3 py-1 text-sm font-bold text-black">
              🐧 DESIGN (OPTIONAL)
            </label>
            <textarea
              name="design"
              value={formData.design}
              onChange={handleChange}
              placeholder="Describe the penguin design on this pack"
              className={fieldClassName}
              rows={2}
            />
          </div>

          <div>
            <label className="mb-2 inline-block rounded px-3 py-1 text-sm font-bold text-black">
              🍫 FLAVOUR
            </label>
            <select
              name="flavour"
              value={formData.flavour}
              onChange={handleChange}
              className={fieldClassName}
              required
            >
              <option value="" disabled>
                Select a flavour
              </option>
              {flavours.map((flavour) => (
                <option key={flavour} value={flavour}>
                  {flavour}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 inline-block rounded px-3 py-1 text-sm font-bold text-black">
              📍 COUNTY
            </label>
            <input
              type="text"
              list="county-options"
              name="county"
              value={formData.county}
              onChange={handleChange}
              placeholder="Start typing and choose a county"
              className={fieldClassName}
              required
            />
            <datalist id="county-options">
              {counties.map((county) => (
                <option key={county} value={county} />
              ))}
            </datalist>
          </div>

          <div>
            <label className="mb-2 inline-block rounded px-3 py-1 text-sm font-bold text-black">
              🏪 SHOP
            </label>
            <select
              name="shop"
              value={formData.shop}
              onChange={handleChange}
              className={fieldClassName}
              required
            >
              <option value="" disabled>
                Select a shop
              </option>
              {shops.map((shop) => (
                <option key={shop} value={shop}>
                  {shop}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl border-4 border-black bg-[#E4252C] py-4 text-lg font-black text-white transition-all hover:cursor-pointer hover:bg-[#0B4AA7] hover:shadow-lg active:translate-y-1 disabled:opacity-50"
          >
            {loading ? "SUBMITTING..." : "🐧 SUBMIT YOUR BAR 🐧"}
          </button>

          {/* Honeypot field to trap bots; real users never see/fill this. */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website}
              onChange={handleChange}
            />
          </div>
        </form>

        {message && (
          <div
            className={`mt-4 p-4 rounded-lg font-bold ${
              message.type === "success"
                ? "border-2 border-black bg-green-200 text-black"
                : "border-2 border-black bg-[#E4252C] text-white"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}
