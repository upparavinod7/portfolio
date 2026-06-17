"use client";

import React, { useState } from 'react';
import { usePersona } from '@/context/PersonaContext';
import { personalInfo } from '@/data/portfolioData';
import { Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function Contact() {
  const { persona } = usePersona();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const getGlowText = () => {
    switch (persona) {
      case 'ai-ml': return 'text-cyan-400';
      case 'full-stack': return 'text-rose-400';
      case 'sde': return 'text-violet-400';
    }
  };

  const getAccentBtn = () => {
    switch (persona) {
      case 'ai-ml': return 'bg-cyan-500 hover:bg-cyan-600 text-black shadow-cyan-500/20';
      case 'full-stack': return 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20';
      case 'sde': return 'bg-violet-500 hover:bg-violet-600 text-white shadow-violet-500/20';
    }
  };

  const getInputFocus = () => {
    switch (persona) {
      case 'ai-ml': return 'focus:border-cyan-500/60 focus:ring-cyan-500/20';
      case 'full-stack': return 'focus:border-rose-500/60 focus:ring-rose-500/20';
      case 'sde': return 'focus:border-violet-500/60 focus:ring-violet-500/20';
    }
  };

  const getIconBorder = () => {
    switch (persona) {
      case 'ai-ml': return 'border-cyan-500/20 text-cyan-400 bg-cyan-500/10';
      case 'full-stack': return 'border-rose-500/20 text-rose-400 bg-rose-500/10';
      case 'sde': return 'border-violet-500/20 text-violet-400 bg-violet-500/10';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("contact-success"));
        }
      } else {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to submit form.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white mb-4">
            Get In <span className={getGlowText()}>Touch</span>
          </h2>
          <div className={`h-1.5 w-24 mx-auto rounded-full ${persona === 'ai-ml' ? 'bg-cyan-500' :
              persona === 'full-stack' ? 'bg-rose-500' :
                'bg-violet-500'
            }`}></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-stretch">

          {/* Contact Details Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">
                Let's Discuss Opportunities
              </h3>
              <p className="text-gray-400 font-sans leading-relaxed text-sm">
                I am actively seeking roles for **AI/ML Engineering**, **Full Stack Development**, and **SDE** starting 2026/2027. Open to discussing internships, freelance, or full-time opportunities.
              </p>
            </div>

            {/* Info Items */}
            <div className="space-y-5">

              {/* Email */}
              <div className="flex items-center gap-4 bg-gray-900/30 p-4 rounded-xl border border-white/5">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center border flex-shrink-0 ${getIconBorder()}`}>
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Email</h4>
                  <a href={`mailto:${personalInfo.email}`} className="text-sm font-medium text-white hover:underline">
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4 bg-gray-900/30 p-4 rounded-xl border border-white/5">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center border flex-shrink-0 ${getIconBorder()}`}>
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Phone</h4>
                  <a href={`tel:${personalInfo.phone}`} className="text-sm font-medium text-white hover:underline">
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4 bg-gray-900/30 p-4 rounded-xl border border-white/5">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center border flex-shrink-0 ${getIconBorder()}`}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Location</h4>
                  <p className="text-sm font-medium text-white">{personalInfo.location}</p>
                </div>
              </div>

            </div>

            <div className="text-xs text-gray-500">
              © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </div>

          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/5">

              {status === 'success' ? (
                <div className="flex flex-col items-center text-center py-12 space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-emerald-400 animate-bounce" />
                  <h3 className="font-display font-bold text-2xl text-white">Message Sent!</h3>
                  <p className="text-gray-400 text-sm max-w-sm">
                    Thank you for reaching out. I've received your message and will get back to you shortly at {personalInfo.email}.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className={`mt-4 px-6 py-2 rounded-xl text-xs font-bold border border-white/10 text-white hover:bg-white/5 transition-colors cursor-pointer`}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* Name field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className={`w-full px-4 py-3 rounded-xl bg-gray-950 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-4 focus:ring-offset-0 transition-all ${getInputFocus()}`}
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className={`w-full px-4 py-3 rounded-xl bg-gray-950 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-4 focus:ring-offset-0 transition-all ${getInputFocus()}`}
                    />
                  </div>

                  {/* Subject field */}
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Interview / Collaboration / Project"
                      className={`w-full px-4 py-3 rounded-xl bg-gray-950 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-4 focus:ring-offset-0 transition-all ${getInputFocus()}`}
                    />
                  </div>

                  {/* Message field */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Message <span className="text-red-500">*</span></label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Write your message here..."
                      required
                      className={`w-full px-4 py-3 rounded-xl bg-gray-950 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-4 focus:ring-offset-0 transition-all ${getInputFocus()}`}
                    />
                  </div>

                  {/* Error Notification */}
                  {status === 'error' && (
                    <div className="flex items-center gap-2.5 p-3.5 bg-red-950/30 border border-red-500/20 text-red-400 text-xs rounded-xl">
                      <AlertCircle className="w-4.5 h-4.5 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${getAccentBtn()}`}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4.5 h-4.5 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
