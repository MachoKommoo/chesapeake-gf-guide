"use client";

import React from "react";

export default function ContactForm() {
  return (
     <form
      action="https://formsubmit.co/inkedinnoir@gmail.com"
      method="POST"
      className="max-w-md mx-auto space-y-4"
      >
       <input type="hidden" name="_subject" value="New Restaurant Submission" />
       <input type="hidden" name="_captcha" value="false" />
       <input type="hidden" name="_next" value="/thanks" />

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
        className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
        >
        Submit Restaurant
        </button>
      </form>
    );
}
