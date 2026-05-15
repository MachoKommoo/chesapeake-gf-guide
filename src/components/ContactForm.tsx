"use client";

import React from "react";

export default function ContactForm() {
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
       });

      if (response.ok) {
        setStatus("success");
       } else {
        setStatus("error");
       }
      } catch {
      setStatus("error");
      }
     };

  if (status === "success") {
    return (
       <div className="text-center bg-green-50 p-6 rounded-xl">
         <svg className="w-12 h-12 text-green-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
         </svg>
         <p className="text-green-800 font-semibold text-lg">Thank you! Your submission has been received.</p>
         <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-green-600 hover:underline font-medium"
         >
          Submit another
         </button>
       </div>
      );
    }

  return (
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name
          </label>
          <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
          </label>
          <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          placeholder="your@email.com"
          />
        </div>
        <div>
          <label htmlFor="restaurant" className="block text-sm font-medium text-gray-700 mb-1">
          Restaurant Name
          </label>
          <input
          type="text"
          id="restaurant"
          name="restaurant"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          placeholder="Restaurant name"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message
          </label>
          <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          placeholder="Tell us about the restaurant..."
          />
        </div>
        <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50"
        >
          {status === "submitting" ? "Sending..." : "Submit Restaurant"}
        </button>
      </form>
    );
}
