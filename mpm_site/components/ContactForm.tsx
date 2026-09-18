"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setError("Please fill out all required fields marked with an asterisk (*).");
      return;
    }

    // Submit successfully
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center space-y-4">
        <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
        <h3 className="text-xl font-bold text-gray-900">
          Thank you, {formData.firstName}!
        </h3>
        <p className="text-gray-700 text-sm max-w-md mx-auto">
          Your inquiry has been received. A member of our management team will follow up with you shortly during normal office hours (Monday - Friday 9:00am - 5:00pm).
        </p>
        <div className="pt-2">
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                message: "",
              });
            }}
            className="text-xs uppercase font-bold text-[#415161] hover:underline"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-full"
    >
      <div className="space-y-4">
        <div className="border-b border-gray-100 pb-3 mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Send Us a Message
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Fill out the form below and our team will get back to you promptly.
          </p>
        </div>

        <div className="text-xs text-gray-500 mb-3">
          <span className="text-red-500 font-bold">*</span> Indicates required field
        </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded border border-red-200 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Name fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
          >
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#415161] focus:border-transparent outline-none text-sm transition"
            placeholder="First"
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
          >
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#415161] focus:border-transparent outline-none text-sm transition"
            placeholder="Last"
          />
        </div>
      </div>

      {/* Email field */}
      <div>
        <label
          htmlFor="email"
          className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
        >
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#415161] focus:border-transparent outline-none text-sm transition"
          placeholder="your.email@example.com"
        />
      </div>

      {/* Phone field */}
      <div>
        <label
          htmlFor="phone"
          className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
        >
          Phone Number (Optional)
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#415161] focus:border-transparent outline-none text-sm transition"
          placeholder="(509) 000-0000"
        />
      </div>

      {/* Comment / Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
        >
          Comment / Question <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#415161] focus:border-transparent outline-none text-sm transition"
          placeholder="How can we help you?"
        ></textarea>
      </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#415161] hover:bg-[#2f3d4a] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors shadow-sm"
        >
          <Send className="w-4 h-4" />
          <span>Submit Inquiry</span>
        </button>
      </div>
    </form>
  );
}
