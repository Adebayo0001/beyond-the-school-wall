'use client';

import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { 
  Building2, Users, Calendar, Phone, Mail, MapPin, CheckCircle2, 
  ArrowRight, ShieldCheck, Sparkles, Clock, Video, Award, ChevronRight,
  BookOpen, Star, HelpCircle, Check, Download, ExternalLink, Loader2
} from 'lucide-react';
import { addSchoolLead } from '@/lib/storage';
import { SchoolLead } from '@/types';
import { getGoogleCalendarUrl, getOutlookCalendarUrl, downloadIcsFile } from '@/lib/calendar';
import Breadcrumbs from '@/components/Breadcrumbs';
import Logo from '@/components/Logo';

export default function BringYourSchool() {
  // Mode: 'register' | 'book-call'
  const [activeTab, setActiveTab] = useState<'register' | 'book-call'>('register');

  // Form states
  const [schoolName, setSchoolName] = useState('');
  const [contactName, setContactName] = useState('');
  const [role, setRole] = useState('Principal');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('Lagos');
  const [studentCount, setStudentCount] = useState('100-300 Students');
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([
    'Trade & Technical Skill',
    'Inter Junior & Senior Workshop (AI, Design, Creative Writing, Public speaking)'
  ]);
  const [notes, setNotes] = useState('');
  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  // Booking states
  const [bookingDate, setBookingDate] = useState('2026-06-25');
  const [bookingTime, setBookingTime] = useState('10:00 AM');
  const [bookingType, setBookingType] = useState<'google-meet' | 'phone' | 'in-person'>('google-meet');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailDispatched, setEmailDispatched] = useState(false);

  // Set default booking date to tomorrow/valid upcoming date on mount if needed
  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const dateFormatted = today.toISOString().split('T')[0];
    setBookingDate(dateFormatted);
  }, []);

  const partnerSchools = [
    { name: 'Floral College', type: 'Secondary College', city: 'Lagos', students: '950+' },
    { name: 'EnnyDave College', type: 'Comprehensive Academy', city: 'Lagos', students: '800+' },
    { name: 'Victory School International', type: 'International School', city: 'Lagos', students: '1,100+' },
    { name: 'Zenith International School', type: 'International Academy', city: 'Lagos', students: '850+' },
    { name: 'The Hill Private School', type: 'Private College', city: 'Lagos', students: '720+' },
    { name: 'Nature trail School', type: 'Secondary School', city: 'Lagos', students: '650+' },
    { name: 'Isaac Newton School', type: 'STEM & Science Academy', city: 'Lagos', students: '780+' },
    { name: 'Kelsther International School', type: 'International College', city: 'Lagos', students: '900+' }
  ];

  const programOptions = [
    { 
      id: 'trade', 
      label: 'Trade & Technical Skill', 
      desc: 'For Junior and Senior secondary school' 
    },
    { 
      id: 'workshop', 
      label: 'Inter Junior & Senior Workshop', 
      desc: 'AI, Design, Creative Writing, Public speaking' 
    },
    { 
      id: 'business', 
      label: 'Student Business School', 
      desc: 'Business introductory class to junior and Senior secondary' 
    },
    { 
      id: 'games', 
      label: 'Game Based Learning', 
      desc: 'Learning strategies through Board and Table top Games.' 
    }
  ];

  const handleProgramToggle = (label: string) => {
    if (selectedPrograms.includes(label)) {
      setSelectedPrograms(selectedPrograms.filter(p => p !== label));
    } else {
      setSelectedPrograms([...selectedPrograms, label]);
    }
  };

  const handleRegisterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!schoolName || !contactName || !email || !phone) return;

    setIsSubmitting(true);
    const lead: SchoolLead = {
      id: 'lead-' + Math.random().toString(36).substring(2, 9),
      schoolName: schoolName.trim(),
      contactName: contactName.trim(),
      role,
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      state,
      studentCount,
      selectedPrograms,
      notes: notes.trim(),
      createdAt: new Date().toISOString()
    };

    addSchoolLead(lead);

    try {
      await fetch('/api/book-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...lead, type: 'register' })
      });
      setEmailDispatched(true);
    } catch (err) {
      console.warn('Register notification log:', err);
    } finally {
      setIsSubmitting(false);
      setRegisteredSuccess(true);
    }
  };

  const handleBookingSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!contactName || !email || !phone) return;

    setIsSubmitting(true);
    const lead: SchoolLead = {
      id: 'call-' + Math.random().toString(36).substring(2, 9),
      schoolName: schoolName.trim() || 'Institutional Inquiry',
      contactName: contactName.trim(),
      role,
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      state,
      studentCount,
      selectedPrograms,
      bookingSlot: {
        date: bookingDate,
        time: bookingTime,
        type: bookingType
      },
      createdAt: new Date().toISOString()
    };

    addSchoolLead(lead);

    try {
      await fetch('/api/book-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...lead, type: 'booking' })
      });
      setEmailDispatched(true);
    } catch (err) {
      console.warn('Booking email dispatch error:', err);
    } finally {
      setIsSubmitting(false);
      setBookingSuccess(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#1e1e1e] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 space-y-16">

        {/* Hero Section */}
        <div className="text-center max-w-4xl lg:max-w-5xl mx-auto space-y-6">
          <div className="flex justify-center">
            <Breadcrumbs variant="light" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#1e1e1e] tracking-tight leading-[1.15]">
            <span className="block">Bring Beyond the School Wall to</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#F16736] to-[#e05423] mt-1 sm:mt-2">
              Your School or College.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Partner with Beyond the School Wall to integrate accredited real-world masterclasses in 
            trade skills, AI literacy, creative storytelling, leadership, and simulations directly into your curriculum.
          </p>

          {/* Action Tabs: Register vs Book Call */}
          <div className="inline-flex p-1.5 bg-white border border-[#e8e5e0] rounded-xl shadow-sm">
            <button
              onClick={() => setActiveTab('register')}
              className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'register'
                  ? 'bg-[#1e1e1e] text-white shadow-md'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Enroll Your School (Form)
            </button>
            <button
              onClick={() => setActiveTab('book-call')}
              className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'book-call'
                  ? 'bg-[#F16736] text-white shadow-md'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Calendar size={13} />
              <span>Book a Strategy Call</span>
            </button>
          </div>
        </div>

        {/* Visual Offerings: What You Can Bring BTSW to Your School For */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              title: "Trade Skills",
              desc: "Practical Hands-on Trade Skills for students between the ages 9-15.",
              image: "/images/sec_student_trade.jpg",
              alt: "Student learning Fashion Design in school uniform",
              tag: "Ages 9–15",
              tagBg: "bg-amber-950/80 text-amber-200 border-amber-400/30",
              borderAccent: "border-[#e8e5e0] hover:border-[#F16736]/50"
            },
            {
              title: "AI & Robotics Building Classes",
              desc: "Building Robotic models with AI integration for students between the ages 9-15.",
              image: "/images/sec_student_robot_build.jpg",
              alt: "Student building Robotic models in school uniform",
              tag: "Ages 9–15",
              tagBg: "bg-orange-950/80 text-orange-200 border-orange-400/30",
              borderAccent: "border-[#e8e5e0] hover:border-[#F16736]/50"
            },
            {
              title: "Finance Class for students",
              desc: "Introductory to financial models for students - Sales, Forex, Cryptocurrency, Fin-Tech.",
              image: "/images/sec_student_finance.jpg",
              alt: "Student analyzing a trade setup in school uniform",
              tag: "Financial Intelligence",
              tagBg: "bg-sky-950/80 text-sky-200 border-sky-400/30",
              borderAccent: "border-[#e8e5e0] hover:border-sky-500/50"
            }
          ].map((item, i) => (
            <div 
              key={i} 
              className={`bg-white border ${item.borderAccent} rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group`}
            >
              {/* Image Showcase */}
              <div className="h-56 sm:h-64 relative overflow-hidden bg-neutral-100">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-3.5 left-3.5">
                  <span className={`px-3 py-1 rounded-lg ${item.tagBg} backdrop-blur-md text-[10px] font-black uppercase tracking-wider border shadow-sm`}>
                    {item.tag}
                  </span>
                </div>
              </div>

              {/* Text Description */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="text-xl font-black text-[#1e1e1e] leading-snug tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Interactive Form Area */}
        <div className="bg-white border border-[#e8e5e0] rounded-xl p-8 md:p-12 shadow-sm">
          {activeTab === 'register' ? (
            <div>
              {registeredSuccess ? (
                <div className="text-center py-16 max-w-lg mx-auto space-y-6">
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#1e1e1e]">
                    Partnership Request Received!
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed font-medium">
                    Thank you, <strong>{contactName}</strong>. We have registered <strong>{schoolName}</strong> into our institutional partnership queue. Our education director will reach out within 24 hours to arrange an introductory briefing.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setRegisteredSuccess(false)}
                      className="px-6 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold rounded-lg transition-colors"
                    >
                      Submit Another School Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-8">
                  <div className="border-b border-[#e8e5e0] pb-6">
                    <h2 className="text-2xl font-black text-[#1e1e1e]">Institution Registration Details</h2>
                    <p className="text-xs text-neutral-500 mt-1">Fill in your institution's profile to receive an customized partnership proposal.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-700 mb-2">School / Institution Name *</label>
                      <input
                        type="text"
                        required
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        placeholder="e.g. Landmark International College"
                        className="w-full p-3.5 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl text-sm font-medium focus:border-[#F16736] focus:bg-white focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-700 mb-2">Contact Person Name *</label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. Dr. Olumide Adeleke"
                        className="w-full p-3.5 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl text-sm font-medium focus:border-[#F16736] focus:bg-white focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-700 mb-2">Designation / Role *</label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full p-3.5 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl text-sm font-medium focus:border-[#F16736] focus:bg-white focus:outline-none transition-all"
                      >
                        <option value="Principal">Principal / Head of School</option>
                        <option value="Proprietor">School Owner / Proprietor</option>
                        <option value="Vice Principal Academics">Vice Principal (Academics)</option>
                        <option value="Head of ICT">Head of ICT / STEM Coordinator</option>
                        <option value="PTA Representative">PTA / Board Representative</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-700 mb-2">Official Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. principal@landmarkcollege.edu.ng"
                        className="w-full p-3.5 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl text-sm font-medium focus:border-[#F16736] focus:bg-white focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-700 mb-2">Phone / WhatsApp Number *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +234 802 345 6789"
                        className="w-full p-3.5 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl text-sm font-medium focus:border-[#F16736] focus:bg-white focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-700 mb-2">State / Location *</label>
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full p-3.5 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl text-sm font-medium focus:border-[#F16736] focus:bg-white focus:outline-none transition-all"
                      >
                        <option value="Lagos">Lagos</option>
                        <option value="Ogun">Ogun</option>
                        <option value="Oyo">Oyo (Ibadan)</option>
                        <option value="Abuja">Abuja (FCT)</option>
                        <option value="Rivers">Rivers (Port Harcourt)</option>
                        <option value="Other">Other States / Diaspora</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase text-neutral-700 mb-2">Physical School Address</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. 14 Admiralty Way, Lekki Phase 1, Lagos"
                        className="w-full p-3.5 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl text-sm font-medium focus:border-[#F16736] focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Programs of Interest Selection */}
                  <div className="space-y-3 pt-4">
                    <label className="block text-xs font-bold uppercase text-neutral-700">Programs of Interest (Select all that apply)</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {programOptions.map((opt) => {
                        const checked = selectedPrograms.includes(opt.label);
                        return (
                          <div
                            key={opt.id}
                            onClick={() => handleProgramToggle(opt.label)}
                            className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                              checked 
                                ? 'border-[#F16736] bg-[#fff1eb]/50' 
                                : 'border-[#e8e5e0] bg-[#faf9f7] hover:border-neutral-400'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 transition-colors ${
                              checked ? 'bg-[#F16736] text-white' : 'border border-neutral-300'
                            }`}>
                              {checked && <Check size={14} />}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-[#1e1e1e]">{opt.label}</p>
                              <p className="text-[11px] text-neutral-500 mt-0.5">{opt.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Student Cohort Size & Notes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-700 mb-2">Target Student Cohort Size</label>
                      <select
                        value={studentCount}
                        onChange={(e) => setStudentCount(e.target.value)}
                        className="w-full p-3.5 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl text-sm font-medium focus:border-[#F16736] focus:bg-white focus:outline-none transition-all"
                      >
                        <option value="50-100 Students">50–100 Students</option>
                        <option value="100-300 Students">100–300 Students</option>
                        <option value="300-600 Students">300–600 Students</option>
                        <option value="600+ Students">600+ Students (Whole School Integration)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-700 mb-2">Special Requirements or Questions</label>
                      <input
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g. Looking to run an AI boot camp during summer term"
                        className="w-full p-3.5 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl text-sm font-medium focus:border-[#F16736] focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-neutral-500">
                      By submitting, you agree to receive institutional program outlines and meeting links from BTSW.
                    </p>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-4 bg-[#F16736] hover:bg-[#e05423] text-white font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-lg shadow-[#F16736]/20 transition-all hover:scale-105 active:scale-95"
                    >
                      Register Your School Now
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <div>
              {bookingSuccess ? (
                <div className="py-8 max-w-xl mx-auto space-y-7">
                  {/* Top Success Icon & Badge */}
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 size={38} />
                    </div>
                    <div>
                      <span className="inline-block px-3 py-1 bg-emerald-100/80 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wider rounded-full">
                        Strategy Call Confirmed & Logged
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-[#1e1e1e] mt-2">
                        Call Scheduled Successfully!
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-md mx-auto">
                      Your 30-minute institutional briefing with <strong>Adebayo Kareem & the BTSW Academic Panel</strong> is set:
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="bg-[#fff6f2] border border-[#ffd8c7] rounded-2xl p-5 sm:p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#F16736] tracking-wider block">Date</span>
                        <span className="font-extrabold text-sm text-[#1e1e1e]">{bookingDate}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#F16736] tracking-wider block">Time Slot (WAT)</span>
                        <span className="font-extrabold text-sm text-[#1e1e1e]">{bookingTime}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#F16736] tracking-wider block">Meeting Channel</span>
                        <span className="font-extrabold text-[#1e1e1e]">
                          {bookingType === 'google-meet' ? 'Google Meet Video Call' : bookingType === 'phone' ? 'Phone Call' : 'BTSW Visits Your Campus (In-Person)'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#F16736] tracking-wider block">Institution</span>
                        <span className="font-extrabold text-[#1e1e1e]">{schoolName || 'Institutional Inquiry'}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#ffd8c7]/70 flex items-start gap-2.5 text-xs text-neutral-700">
                      <Mail size={16} className="text-[#F16736] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-[#1e1e1e]">Automated Emails Dispatched:</p>
                        <p className="text-neutral-600 text-[11px] mt-0.5 leading-relaxed">
                          • Confirmation & calendar invite queued for <strong>{email}</strong><br />
                          • Institutional alert sent to BTSW Academic Panel (<strong>beyondtheschoolwallng@gmail.com</strong>)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Prompt & Add-to-Calendar Sync Section */}
                  <div className="bg-white border border-[#e8e5e0] rounded-2xl p-5 sm:p-6 shadow-sm space-y-3">
                    <div className="text-center space-y-1">
                      <h4 className="text-xs sm:text-sm font-black text-[#1e1e1e] uppercase tracking-wider flex items-center justify-center gap-2">
                        <Calendar size={16} className="text-[#F16736]" />
                        <span>Prompt: Add This Session To Your Calendar</span>
                      </h4>
                      <p className="text-[11px] sm:text-xs text-neutral-500">
                        Select your calendar to sync this appointment instantly:
                      </p>
                    </div>

                    {(() => {
                      const channelTitle = bookingType === 'google-meet' ? 'Google Meet' : bookingType === 'phone' ? 'Phone Call' : 'BTSW Campus Visit';
                      const channelLoc = bookingType === 'google-meet' ? 'Google Meet Video Call' : bookingType === 'phone' ? 'Phone Call' : `On-site at ${schoolName || 'Your School'} Campus (BTSW Visit)`;

                      const calEvent = {
                        title: `BTSW Strategy Session (${channelTitle}): ${schoolName || 'School Inquiry'} × Beyond the School Wall`,
                        description: `Strategy consultation with Adebayo Kareem and the BTSW team.\nAttendee: ${contactName} (${role})\nFormat: ${channelLoc}\nContact: beyondtheschoolwallng@gmail.com | +234 901 649 8377`,
                        location: channelLoc,
                        date: bookingDate,
                        time: bookingTime,
                        durationMinutes: 30
                      };

                      return (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                          <a
                            href={getGoogleCalendarUrl(calEvent)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-[#4285F4] hover:bg-[#3367D6] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm hover:scale-[1.01] active:scale-95"
                          >
                            <Calendar size={14} />
                            <span>Add to Google Calendar</span>
                            <ExternalLink size={12} className="opacity-80" />
                          </a>

                          <button
                            type="button"
                            onClick={() => downloadIcsFile(calEvent, `BTSW-Strategy-Call-${bookingDate}.ics`)}
                            className="p-3 bg-[#1e1e1e] hover:bg-[#333333] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm hover:scale-[1.01] active:scale-95"
                          >
                            <Download size={14} />
                            <span>Download .ICS (Apple / Outlook)</span>
                          </button>

                          <a
                            href={getOutlookCalendarUrl(calEvent)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="sm:col-span-2 p-2.5 bg-[#faf9f7] hover:bg-[#f0eee9] text-neutral-800 border border-[#e8e5e0] rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1.5"
                          >
                            <span>Add to Outlook Web / Office 365</span>
                            <ExternalLink size={11} className="text-neutral-500" />
                          </a>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Secondary Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <button
                      onClick={() => setBookingSuccess(false)}
                      className="w-full sm:w-auto px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold rounded-xl transition-colors"
                    >
                      Schedule Another Slot
                    </button>
                    <a
                      href={`https://wa.me/2349016498377?text=Hello%20BTSW,%20I%20just%20booked%20a%20strategy%20call%20for%20${encodeURIComponent(schoolName || contactName)}%20on%20${encodeURIComponent(bookingDate)}%20at%20${encodeURIComponent(bookingTime)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-5 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Phone size={13} /> Chat on WhatsApp (+234 901 649 8377)
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-8">
                  <div className="border-b border-[#e8e5e0] pb-6">
                    <h2 className="text-2xl font-black text-[#1e1e1e]">Schedule a 30-Minute Institutional Call</h2>
                    <p className="text-xs text-neutral-500 mt-1">Pick a convenient date and time to speak directly with our program coordinators.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left: Contact Info */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-neutral-700 mb-2">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="e.g. Mrs. Funke Adeleke"
                          className="w-full p-3.5 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl text-sm font-medium focus:border-[#F16736] focus:bg-white focus:outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-neutral-700 mb-2">School / Institution Name</label>
                        <input
                          type="text"
                          value={schoolName}
                          onChange={(e) => setSchoolName(e.target.value)}
                          placeholder="e.g. Grace Schools"
                          className="w-full p-3.5 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl text-sm font-medium focus:border-[#F16736] focus:bg-white focus:outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-neutral-700 mb-2">Email Address (for calendar invite & confirmation) *</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. funke@graceschools.com"
                          className="w-full p-3.5 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl text-sm font-medium focus:border-[#F16736] focus:bg-white focus:outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-neutral-700 mb-2">Phone / WhatsApp Number *</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +234 803 123 4567"
                          className="w-full p-3.5 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl text-sm font-medium focus:border-[#F16736] focus:bg-white focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Right: Date & Time Picker */}
                    <div className="space-y-5 bg-[#faf9f7] p-6 rounded-3xl border border-[#e8e5e0]">
                      <div>
                        <label className="block text-xs font-bold uppercase text-neutral-700 mb-2">Preferred Meeting Channel</label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: 'google-meet', label: 'Google Meet', icon: Video },
                            { id: 'phone', label: 'Phone Call', icon: Phone },
                            { id: 'in-person', label: 'Visit Your Campus', icon: Building2 },
                          ].map((item) => {
                            const Icon = item.icon;
                            const active = bookingType === item.id;
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => setBookingType(item.id as any)}
                                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 min-h-[72px] ${
                                  active 
                                    ? 'bg-[#F16736] text-white border-[#F16736] shadow-sm' 
                                    : 'bg-white text-neutral-700 border-[#e8e5e0] hover:border-neutral-400'
                                }`}
                              >
                                <Icon size={16} />
                                <span className="text-[11px] font-bold leading-tight">{item.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-neutral-700 mb-2">Select Date</label>
                        <input
                          type="date"
                          value={bookingDate}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="w-full p-3 bg-white border border-[#e8e5e0] rounded-xl text-xs font-bold text-neutral-800 focus:border-[#F16736] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-neutral-700 mb-2">Select Time Slot (WAT)</label>
                        <div className="grid grid-cols-2 gap-2">
                          {['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'].map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setBookingTime(slot)}
                              className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                                bookingTime === slot
                                  ? 'bg-[#1e1e1e] text-white border-[#1e1e1e]'
                                  : 'bg-white text-neutral-700 border-[#e8e5e0] hover:bg-neutral-50'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3.5 bg-[#F16736] hover:bg-[#e05423] disabled:opacity-60 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 size={16} className="animate-spin" />
                              <span>Processing Booking...</span>
                            </>
                          ) : (
                            <span>Confirm & Book Call</span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Showcase of Partner Schools */}
        <div className="space-y-6 pt-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl font-black text-[#1e1e1e]">Trusted by Progressive Institutions</h3>
            <p className="text-xs text-neutral-500">Secondary schools and colleges integrating Beyond the School Wall frameworks.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-4">
            {partnerSchools.map((school, idx) => (
              <div
                key={idx}
                className="p-5 bg-white border border-[#e8e5e0] rounded-2xl text-center space-y-2 hover:border-[#F16736]/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#fff1eb] text-[#F16736] font-black text-sm flex items-center justify-center mx-auto">
                  {school.name.substring(0, 2).toUpperCase()}
                </div>
                <h4 className="text-xs font-bold text-[#1e1e1e] line-clamp-1">{school.name}</h4>
                <p className="text-[10px] text-neutral-500">{school.city} &bull; {school.students}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Direct Liaison Block */}
        <div className="p-8 bg-[#1e1e1e] rounded-xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xl font-black">Prefer to speak right away?</h4>
            <p className="text-xs text-neutral-400">Our institutional liaison desk is available Monday through Friday, 8:00 AM – 6:00 PM WAT.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/2349016498377?text=Hello%20BTSW,%20we%20want%20to%20inquire%20about%20bringing%20your%20program%20to%20our%20school"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-lg transition-all flex items-center gap-2"
            >
              <Phone size={14} /> WhatsApp Direct Desk (+234 901 649 8377)
            </a>
            <a
              href="mailto:beyondtheschoolwallng@gmail.com?subject=School%20Partnership%20Inquiry"
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg border border-white/15 transition-all flex items-center gap-2"
            >
              <Mail size={14} /> Email Partnerships (beyondtheschoolwallng@gmail.com)
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
