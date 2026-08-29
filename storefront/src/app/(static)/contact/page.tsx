'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { Mail, Phone, MapPin, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Bespoke Inquiries');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setIsSent(true);
    showToast('Your message has been transmitted to our concierge.');
  };

  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs font-semibold text-stone-400 tracking-[0.25em] uppercase font-mono">
          Direct Inquiries
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-stone-950">
          Client Concierge & Press
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
          Our client advisory team is stationed in Mumbai, Bengaluru, and New Delhi to assist with sizing specifications, custom dimensions, and private appointments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Contact Form (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-stone-200 shadow-xs">
          {isSent ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 stroke-[2]" />
              </div>
              <h3 className="text-xl font-serif font-medium text-stone-900">Message Received</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                A dedicated concierge advisor will respond to <strong>{email}</strong> within 6 hours.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsSent(false);
                  setMessage('');
                }}
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Your Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rohan Sharma"
                />
                <Input
                  label="Email Address"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rohan.sharma@elemental.in"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 tracking-wider uppercase mb-1.5">
                  Subject *
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full h-11 px-3.5 bg-white border border-stone-300 rounded-md text-sm text-stone-900 focus:outline-none focus:border-stone-900"
                >
                  <option value="Bespoke Inquiries">Bespoke Inquiries & Custom Sizing</option>
                  <option value="Order & Courier Tracking">Order & BlueDart / Air Tracking</option>
                  <option value="Press & Media Accreditation">Press & Media Accreditation</option>
                  <option value="Architectural & Interior Design Projects">Architectural & Interior Design Projects</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-stone-700 tracking-wider uppercase">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How may our concierge assist you today?"
                  className="w-full p-3.5 bg-white border border-stone-300 rounded-md text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Transmit Inquiry
              </Button>
            </form>
          )}
        </div>

        {/* Studio Locations & Channels (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
              Direct Channels
            </h3>
            <div className="space-y-3 text-xs text-stone-600">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-stone-700 shrink-0" />
                <span>concierge@elemental.in</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-stone-700 shrink-0" />
                <span>+91 (022) 6982-0192 (Mon–Sat, 10am–7pm IST)</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-stone-700 shrink-0" />
                <span>Average response window: Under 2 hours</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
              Design Studios
            </h3>
            <div className="space-y-4 text-xs text-stone-600">
              <div>
                <strong className="text-stone-900 block font-serif text-sm">Mumbai Studio</strong>
                <p>Kala Ghoda, Fort, Mumbai, Maharashtra - 400001</p>
                <span className="text-[11px] text-stone-400">By private appointment</span>
              </div>
              <div className="pt-2 border-t border-stone-200">
                <strong className="text-stone-900 block font-serif text-sm">Bengaluru Gallery</strong>
                <p>100 Feet Road, Indiranagar, Bengaluru, Karnataka - 560038</p>
                <span className="text-[11px] text-stone-400">Experience gallery space</span>
              </div>
              <div className="pt-2 border-t border-stone-200">
                <strong className="text-stone-900 block font-serif text-sm">New Delhi Studio</strong>
                <p>The Colonnade, Mehrauli, New Delhi - 110030</p>
                <span className="text-[11px] text-stone-400">Capsule gallery</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
