'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight, Users, Play, ShieldCheck, Coins, Sparkles, 
  Award, CheckCircle2, ChevronRight, ChevronLeft, GraduationCap, Laptop, Star, ArrowUpRight,
  Bot, Palette, Feather, Mic, Shield, Building2, Calendar, Target, BookOpen,
  Dice5, Gamepad2, Code, Terminal, Film, Check
} from 'lucide-react';

const ContourWaves = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {/* Top Left Radiating Contour Waves */}
    <svg className="absolute -top-16 -left-16 w-[700px] h-[700px] opacity-25" viewBox="0 0 600 600" fill="none">
      {[...Array(18)].map((_, i) => (
        <path
          key={i}
          d={`M -60,${30 + i * 26} C ${100 + i * 22},${50 + i * 22} ${240 + i * 18},${140 + i * 18} ${310 + i * 15},${420 + i * 22}`}
          stroke={i % 3 === 0 ? "#F16736" : i % 3 === 1 ? "#ea580c" : "#cbd5e1"}
          strokeWidth="1.2"
          strokeOpacity={0.15 + (i % 4) * 0.08}
        />
      ))}
    </svg>

    {/* Top Right Radiating Contour Waves */}
    <svg className="absolute -top-16 -right-16 w-[700px] h-[700px] opacity-25" viewBox="0 0 600 600" fill="none">
      {[...Array(18)].map((_, i) => (
        <path
          key={i}
          d={`M 660,${30 + i * 26} C ${500 - i * 22},${50 + i * 22} ${360 - i * 18},${140 + i * 18} ${290 - i * 15},${420 + i * 22}`}
          stroke={i % 3 === 0 ? "#F16736" : i % 3 === 1 ? "#ea580c" : "#cbd5e1"}
          strokeWidth="1.2"
          strokeOpacity={0.15 + (i % 4) * 0.08}
        />
      ))}
    </svg>
  </div>
);

// Hero Component featuring intuitive African American secondary student Bento showcase and light arched pillar cards
const Hero = () => {
  const pillars = [
    {
      id: '01',
      prefix: "Beyond the School Wall's",
      title: 'MAGNET SCHOOL',
      subtitle: 'Secondary School Flagship',
      description: "Beyond the School Wall's Magnet School is an Industry & Marketplace preparatory school for young professionals built around 3 unique solutions",
      icon: GraduationCap,
      color: '#F16736',
      lightGradient: 'from-[#fff8f5] via-[#ffffff] to-[#fff2eb]',
      iconBg: 'bg-[#fff1eb] text-[#F16736]',
      borderStyle: 'border-[#F16736]/25 hover:border-[#F16736]/60',
      glowStyle: 'hover:shadow-[0_16px_35px_rgba(241,103,54,0.12)]',
      topRim: 'shadow-[inset_0_2px_4px_rgba(241,103,54,0.06)]',
      href: '/programs/the-magnet-school',
    },
    {
      id: '02',
      prefix: "Beyond The School Wall's",
      title: 'CASH ON CAMPUS',
      subtitle: 'Financial Intelligence',
      description: 'A training and Mentorship program for students on Campus. Raising Student Entrepreneurs across African Schools.',
      icon: Coins,
      color: '#0284c7',
      lightGradient: 'from-[#f0f9ff] via-[#ffffff] to-[#e0f2fe]',
      iconBg: 'bg-[#f0f9ff] text-[#0284c7]',
      borderStyle: 'border-sky-300/40 hover:border-sky-500/60',
      glowStyle: 'hover:shadow-[0_16px_35px_rgba(2,132,199,0.12)]',
      topRim: 'shadow-[inset_0_2px_4px_rgba(2,132,199,0.06)]',
      href: '/programs/cash-on-campus',
    },
    {
      id: '03',
      prefix: 'Beyond The School Wall',
      title: 'JUNIOR WORKSPACE',
      subtitle: 'Junior Accelerator (Ages 9–18)',
      description: 'Foundational starter course for students between the ages 9-18 in practical Trade skills, Technical & Technological adaptive skills.',
      icon: Sparkles,
      color: '#9333ea',
      lightGradient: 'from-[#faf5ff] via-[#ffffff] to-[#f3e8ff]',
      iconBg: 'bg-[#faf5ff] text-[#9333ea]',
      borderStyle: 'border-purple-300/40 hover:border-purple-500/60',
      glowStyle: 'hover:shadow-[0_16px_35px_rgba(147,51,234,0.12)]',
      topRim: 'shadow-[inset_0_2px_4px_rgba(147,51,234,0.06)]',
      href: '/inter-junior-workspace',
    },
    {
      id: '04',
      prefix: "Beyond the school wall's",
      title: 'SIMULATION & GAMES',
      subtitle: 'Cognitive Sports & Strategy',
      description: 'Building students Mental strength, business acumen, leadership skills, Decision & choice through gameplay - Board, Tabletops & virtual games.',
      icon: Gamepad2,
      color: '#059669',
      lightGradient: 'from-[#f0fdf4] via-[#ffffff] to-[#dcfce7]',
      iconBg: 'bg-[#f0fdf4] text-[#059669]',
      borderStyle: 'border-emerald-300/40 hover:border-emerald-500/60',
      glowStyle: 'hover:shadow-[0_16px_35px_rgba(5,150,105,0.12)]',
      topRim: 'shadow-[inset_0_2px_4px_rgba(5,150,105,0.06)]',
      href: '/simulations',
    },
  ];

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-32 sm:pt-36 pb-24 sm:pb-28 lg:pb-32 overflow-hidden bg-white text-[#1e1e1e] border-b border-[#e8e5e0]">
      {/* Background Radiating Waveforms */}
      <ContourWaves />

      {/* Ambient Atmospheric Glows */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-[#F16736]/8 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-[#fff1eb]/70 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left Column: Core Positioning & CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center"
          >

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight text-[#1e1e1e] leading-[1.08] mb-6">
              Beyond The <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F16736] via-[#ea580c] to-[#d94815]">
                School Wall.
              </span>
            </h1>

            {/* Subtitle - Crisp, punchy, breathing room */}
            <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed mb-10 max-w-lg">
              Raising the King’s seed into visionary problem solvers, creative builders, and transformative leaders equipped for real-world mastery beyond the classroom.
            </p>

            {/* Primary & Secondary Action Row */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <Link 
                href="/bring-your-school"
                className="px-7 sm:px-8 py-3.5 rounded-xl bg-[#F16736] hover:bg-[#e05423] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#F16736]/25 hover:shadow-xl hover:shadow-[#F16736]/35 flex items-center gap-2.5 group cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <Building2 size={18} className="text-white group-hover:scale-110 transition-transform" />
                <span>Bring us to your School</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a 
                href="https://www.youtube.com/@beyondtheschoolwall"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-[#faf9f7] hover:bg-neutral-100 border border-[#e8e5e0] text-[#1e1e1e] font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-2.5 cursor-pointer hover:border-[#F16736]/40 group"
              >
                <div className="w-6 h-6 rounded-full bg-[#fff1eb] text-[#F16736] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play size={12} className="ml-0.5 fill-current" />
                </div>
                <span>Watch Live Classes</span>
              </a>
            </div>

            {/* Social Proof Row */}
            <div className="flex items-center gap-4 pt-7 border-t border-[#e8e5e0]">
              <div className="flex -space-x-2.5">
                <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm bg-sky-600 text-white flex items-center justify-center text-[10px] font-bold">AK</div>
                <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm bg-[#F16736] text-white flex items-center justify-center text-[10px] font-bold">OO</div>
                <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">DA</div>
                <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm bg-neutral-800 text-white flex items-center justify-center text-[10px] font-black">
                  +800
                </div>
              </div>
              <div className="text-xs sm:text-sm">
                <div className="flex items-center gap-1 text-amber-500 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <span className="text-neutral-700 font-semibold">Over 800+ Students Impacted Nationwide</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Intuitive Bento Showcase of Secondary School Students */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-7 xl:col-span-7 relative"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-4.5 relative z-10">
              
              {/* Sub-Column 1 */}
              <div className="flex flex-col gap-4 sm:gap-4.5">
                {/* 1. Photo Card: Trade & Fashion Craft */}
                <div className="h-[210px] sm:h-[220px] rounded-2xl sm:rounded-3xl overflow-hidden relative border border-amber-200/70 shadow-sm group">
                  <Image 
                    src="/images/sec_student_trade.jpg"
                    alt="African secondary school student crafting apparel in a fashion and textile trade studio"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-amber-950/70 backdrop-blur-md text-amber-200 text-[11px] font-extrabold tracking-wide border border-amber-400/30">
                      Trade & Fashion Craft
                    </span>
                  </div>
                </div>

                {/* 2. Photo Card: Applied AI & Tech Design */}
                <div className="h-[185px] sm:h-[195px] rounded-2xl sm:rounded-3xl overflow-hidden relative border border-sky-200/60 shadow-sm group">
                  <Image 
                    src="/images/sec_student_design.jpg"
                    alt="African American secondary school student in digital design lab"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-sky-950/70 backdrop-blur-md text-sky-200 text-[11px] font-extrabold tracking-wide border border-sky-400/30">
                      Applied AI & Tech
                    </span>
                  </div>
                </div>
              </div>

              {/* Sub-Column 2: Tall Center Feature (STEM & Robotics) */}
              <div className="h-[340px] sm:h-[430px] rounded-2xl sm:rounded-3xl overflow-hidden relative border border-orange-200/70 shadow-md group">
                <Image 
                  src="/images/sec_student_robotics.jpg"
                  alt="African American secondary school student in modern science laboratory"
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <div className="absolute top-3.5 left-3.5">
                  <span className="px-2.5 py-1 rounded-lg bg-[#F16736]/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                    Featured
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-md text-orange-200 text-[11px] font-extrabold tracking-wide border border-orange-400/30 inline-block mb-1.5">
                    STEM & Robotics
                  </span>
                  <p className="text-xs font-medium text-neutral-200 leading-snug line-clamp-2">
                    Hands-on robotics, neural intuition, and prompt engineering in school labs.
                  </p>
                </div>
              </div>

              {/* Sub-Column 3 */}
              <div className="flex flex-col gap-4 sm:gap-4.5">
                {/* 3. Photo Card: Strategic Simulations */}
                <div className="h-[200px] sm:h-[210px] rounded-2xl sm:rounded-3xl overflow-hidden relative border border-emerald-200/60 shadow-sm group">
                  <Image 
                    src="/images/sec_student_board.jpg"
                    alt="African American secondary school student presenting strategic analysis"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-950/70 backdrop-blur-md text-emerald-200 text-[11px] font-extrabold tracking-wide border border-emerald-400/30">
                      Simulations & Strategy
                    </span>
                  </div>
                </div>

                {/* 4. Photo Card: Leadership & Character */}
                <div className="h-[195px] sm:h-[205px] rounded-2xl sm:rounded-3xl overflow-hidden relative border border-purple-200/60 shadow-sm group">
                  <Image 
                    src="/images/sec_student_lead.jpg"
                    alt="African American secondary school student with textbooks in school library"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="px-2.5 py-1 rounded-lg bg-purple-950/70 backdrop-blur-md text-purple-200 text-[11px] font-extrabold tracking-wide border border-purple-400/30">
                      Leadership Architecture
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

        {/* Section Heading: Our Program */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 sm:mt-24 lg:mt-28 mb-10 sm:mb-14 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1e1e1e] tracking-tight">
            Our Program
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-neutral-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Actionable learning ecosystems designed to bridge academic theory with real-world industry, entrepreneurship, trade skills, and strategic game theory.
          </p>
        </motion.div>

        {/* Core BTSW Pillar Arched Cards (Light Version on White Background) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.08 + idx * 0.08 }}
                className="group flex flex-col h-full"
              >
                <Link
                  href={pillar.href}
                  className={`relative rounded-t-[44px] sm:rounded-t-[50px] lg:rounded-t-[56px] rounded-b-2xl bg-gradient-to-b ${pillar.lightGradient} border ${pillar.borderStyle} ${pillar.topRim} ${pillar.glowStyle} pt-10 sm:pt-12 pb-8 sm:pb-9 px-5 sm:px-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 cursor-pointer flex-1 shadow-sm hover:shadow-xl`}
                >
                  {/* Centered Large Stroke Icon in Pill Container */}
                  <div className={`w-14 h-14 rounded-2xl ${pillar.iconBg} flex items-center justify-center mb-4 sm:mb-5 transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                    <Icon size={28} strokeWidth={2} />
                  </div>

                  {/* Category Subtitle */}
                  <span 
                    className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider mb-2.5 px-2.5 py-0.5 rounded-full bg-white/80 border border-black/5"
                    style={{ color: pillar.color }}
                  >
                    {pillar.subtitle}
                  </span>

                  {/* Brand Prefix & Title */}
                  <div className="mb-3.5">
                    <span className="block text-[11px] sm:text-xs font-semibold text-neutral-500 tracking-tight mb-1">
                      {pillar.prefix}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black tracking-tight text-[#1e1e1e] leading-snug">
                      {pillar.title}
                    </h3>
                  </div>

                  {/* Subtitle / Description */}
                  <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-normal mb-6 flex-1 px-1">
                    {pillar.description}
                  </p>

                  {/* Explore Link with Animated Arrow */}
                  <div 
                    className="mt-auto inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold tracking-wider uppercase transition-all group-hover:translate-x-1"
                    style={{ color: pillar.color }}
                  >
                    <span>Explore Pillar</span>
                    <ArrowRight size={14} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Mission Section
const Mission = () => {
  return (
    <section id="intelligence" className="py-24 bg-white relative overflow-hidden scroll-mt-24 border-b border-[#e8e5e0]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="group relative h-[380px] sm:h-[460px] lg:h-[500px] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#e8e5e0] shadow-xl">
              <Image
                src="/images/sec_student_lead.jpg"
                alt="Beyond The School Wall Students in Action"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <span className="text-[#F16736] text-xs font-black uppercase tracking-[0.3em] mb-4 block">
              Our Philosophy
            </span>
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1e1e1e] mb-8 leading-tight">
              Why Traditional School <br className="hidden md:block" />
              <span className="text-[#6b6b6b] italic">Isn't Enough.</span>
            </h2>

            <div className="space-y-6 text-neutral-600 text-lg leading-relaxed">
              <p>
                The modern world moves at exponential speed, yet classroom curricula remain rooted in industrial-age memorization. Certificates alone no longer guarantee survival, let alone influence.
              </p>
              <p>
                Beyond the School Wall (BTSW) grooms human resourcefulness. We bridge the critical gap between academic theory and real-world execution, preparing students with the strategic tools needed for the 21st century and beyond.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <Link 
                href="/inter-junior-workspace" 
                className="group inline-flex items-center gap-3 text-[#1e1e1e] font-bold hover:text-[#F16736] transition-colors"
              >
                Explore Junior Workspace
                <div className="w-10 h-10 rounded-lg border border-[#e8e5e0] flex items-center justify-center group-hover:border-[#F16736] group-hover:translate-x-2 transition-all">
                  <ArrowRight size={18} />
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Project Lumina / Junior Competition Banner (Crisp Brand Orange Showcase)
const ProjectLuminaBanner = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-xl p-8 md:p-12 overflow-hidden bg-gradient-to-r from-[#F16736] via-[#ea580c] to-[#c2410c] text-white shadow-xl"
        >
          {/* Ambient Corner Accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/20 border border-white/30 text-white text-[10px] sm:text-xs font-black uppercase tracking-widest">
                <Sparkles size={13} /> PROJECT LUMINA &bull; INTER JUNIOR WORKSPACE
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-snug">
                The Inter Junior Workspace Competition for Middle and High School Students
              </h3>
              <p className="text-sm sm:text-base text-white/95 max-w-2xl leading-relaxed">
                Empowering secondary learners to build, challenge, and excel across 5 high-impact tracks: 
                <strong> Artificial Intelligence, Gaming & Strategy, Design & Art, Creative Writing, and Public Speaking</strong>. 
                Equipping young innovators with real-world project portfolios, interactive sandboxes, and certified competition recognition.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end items-start lg:items-end">
              <button
                type="button"
                disabled
                className="w-full sm:w-auto px-7 py-4 bg-white/90 text-[#F16736] font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-md cursor-not-allowed opacity-85 text-center flex items-center justify-center gap-2"
              >
                <span>Enter Junior Competition</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F16736]/15 text-[#F16736] font-bold lowercase tracking-normal">soon</span>
              </button>

              <button
                type="button"
                disabled
                className="w-full sm:w-auto px-6 py-3.5 bg-black/20 border border-white/20 text-white/80 font-bold text-xs uppercase tracking-wider rounded-lg cursor-not-allowed opacity-85 text-center flex items-center justify-center gap-2"
              >
                <Building2 size={14} />
                <span>Enroll Your School</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};



// Simulation & Cognitive Games Spotlight (Central Showcase: Lagos Hustle Arena)
const SimulationSpotlight = () => {
  return (
    <section className="py-24 sm:py-32 lg:py-36 bg-[#faf9f7] text-[#1e1e1e] relative overflow-hidden border-b border-[#e8e5e0]">
      <ContourWaves />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#1e1e1e] leading-tight">
            Simulations & Strategic Games
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Practical game environments designed to sharpen situational awareness, long-range planning, and real-world negotiation.
          </p>
        </div>

        {/* Central Featured Banner: Lagos Hustle Arena */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full bg-white border border-[#e8e5e0] hover:border-[#F16736]/40 rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 lg:p-14 shadow-xl hover:shadow-2xl transition-all duration-300 group"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Image Showcase (Increased Height, Clean) */}
            <div className="lg:col-span-6 relative h-[340px] sm:h-[400px] lg:h-[460px] w-full rounded-2xl overflow-hidden border border-[#e8e5e0] shadow-md">
              <Image 
                src="/images/lagos_negotiation.jpg" 
                alt="Lagos Hustle Commercial Negotiation" 
                fill 
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Content Details */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6 sm:space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm text-amber-500 font-bold">
                    <Star size={15} className="fill-current" />
                    <span>4.9 (184 reviews)</span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1e1e1e] group-hover:text-[#F16736] transition-colors leading-snug">
                  Lagos Hustle Arena: Commercial Negotiation
                </h3>

                <p className="text-sm sm:text-base md:text-lg text-neutral-600 leading-relaxed mt-4">
                  Face realistic Nigerian distributor actors and dynamic AI dialogue. Defend profit margins and close high-stakes contracts without depleting capital.
                </p>
              </div>

              {/* Metadata & CTAs */}
              <div className="pt-6 border-t border-[#f0ede8] flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs sm:text-sm font-semibold text-neutral-500 bg-neutral-100 px-3.5 py-1.5 rounded-lg">
                  45 Minutes
                </span>

                <div className="flex items-center gap-3">
                  <Link 
                    href="/simulations" 
                    className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-[#F16736] hover:bg-[#e05423] text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-[#F16736]/20 transition-all hover:scale-105 active:scale-95"
                  >
                    <span>Enter Simulation Lab</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

// Partnership & School Institutional Curriculum Slideshow Section
const Partnership = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const schoolTracks = [
    {
      id: 'student-business',
      tabLabel: 'Student Business School',
      title: 'Student Business School & Enterprise',
      tagline: 'Equip your students to launch real enterprises, build business models & master commercial negotiation.',
      description: 'Students learn foundational micro-economics, unit economics, market validation, supply chain inventory, and sales pitch frameworks. Prepares young minds to generate value and lead sustainable commercial initiatives.',
      icon: Coins,
      deliverables: [
        'Business Model Canvas & Product Market Validation',
        'Budgeting, Cash Flow Management & Unit Economics',
        'Commercial Pitching & Stakeholder Negotiation',
        'Annual School Venture Exhibition & Student Enterprise Fair'
      ],
      image: '/images/sec_student_finance.jpg',
      alt: 'Student Business School & Enterprise',
      label: 'Business & Commercial Lab'
    },
    {
      id: 'trade-technical',
      tabLabel: 'Trade & Technical Skills',
      title: 'Trade, Technical & Practical Skills',
      tagline: 'Foundational starter mastery in practical tradecraft, digital tools & technical adaptive execution.',
      description: 'Hands-on practical training designed to instill technical competence, problem-solving dexterity, and adaptive trade skills that build lifelong self-reliance.',
      icon: Target,
      deliverables: [
        'Practical Trade & Prototyping Essentials',
        'Technical Tool Competency & Safety Standards',
        'Applied Problem Solving & Hardware Fabrication',
        'Portfolio of Functional Student Trade Builds'
      ],
      image: '/images/sec_student_trade.jpg',
      alt: 'Trade & Technical Skills',
      label: 'Applied Trade Workshop'
    },
    {
      id: 'ai-digital-business',
      tabLabel: 'AI & Digital Business',
      title: 'Applied AI & Digital Tools for Modern Commerce',
      tagline: 'Harness modern AI tools, workflow automation & digital marketing for modern commerce.',
      description: 'Students utilize generative AI, market research tools, and digital design software to accelerate business workflows, create digital branding, and deploy real digital products.',
      icon: Bot,
      deliverables: [
        'AI-Powered Market Research & Customer Discovery',
        'Digital Branding, UI/UX Design & Copywriting',
        'Automated Workflow Pipelines & Cloud Productivity',
        'Live School Showcase & Portfolio Verification'
      ],
      image: '/images/sec_student_lead.jpg',
      alt: 'Applied AI & Digital Business',
      label: 'Digital Innovation Hub'
    }
  ];

  const actualPartnerSchools = [
    'Floral College',
    'EnnyDave College',
    'Victory School International',
    'Zenith International School',
    'The Hill Private School',
    'Nature trail School',
    'Isaac Newton School',
    'Kelsther International School'
  ];

  // Auto-advance slideshow every 6 seconds unless paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % schoolTracks.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, schoolTracks.length]);

  const currentTrack = schoolTracks[activeTab];

  return (
    <section 
      className="py-24 bg-white border-b border-[#e8e5e0] relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#F16736]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-12">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 tracking-tight leading-tight">
            Bring World-Class Business & Future Skills <br className="hidden sm:inline" />
            Directly into Your School.
          </h2>

          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
            We partner with visionary school owners and principals to deploy turnkey modern curricula in business, trade skills, and applied technology. Complete with teacher facilitation, student toolkits, and tangible portfolio projects.
          </p>
        </div>

        {/* Interactive Track Navigation Tabs / Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {schoolTracks.map((track, idx) => {
            const Icon = track.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={track.id}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2.5 px-5 sm:px-6 py-3 rounded-lg font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#1e1e1e] text-white border-[#1e1e1e] shadow-md scale-105'
                    : 'bg-[#faf9f7] text-neutral-600 border-[#e8e5e0] hover:border-neutral-300 hover:bg-neutral-100'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-[#F16736]' : 'text-neutral-400'} />
                <span>{track.tabLabel}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F16736] ml-1 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Main Showcase Display */}
        <div className="bg-[#faf9f7] border-2 border-[#e8e5e0] rounded-2xl shadow-lg overflow-hidden transition-all">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTrack.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
            >
              {/* Left Column: Track Info & Curriculum Deliverables (No pills) */}
              <div className="lg:col-span-6 space-y-6 text-left">
                <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight leading-snug">
                  {currentTrack.tagline}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  {currentTrack.description}
                </p>

                {/* Key Deliverables Checklist */}
                <div className="space-y-2.5 pt-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
                    Turnkey Student Deliverables:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    {currentTrack.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-neutral-700 font-medium">
                        <CheckCircle2 size={15} className="text-[#F16736] shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: High-Impact Visual Showcase Image */}
              <div className="lg:col-span-6">
                <div className="relative aspect-[4/3] sm:aspect-video rounded-xl overflow-hidden border border-[#e8e5e0] shadow-xl group">
                  <Image
                    src={currentTrack.image}
                    alt={currentTrack.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs font-bold text-[#F16736] uppercase tracking-wider bg-black/50 px-2.5 py-1 rounded backdrop-blur-sm inline-block mb-1">
                      {currentTrack.label}
                    </span>
                    <p className="text-sm font-bold text-white drop-shadow">
                      {currentTrack.title}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Controls Bar */}
          <div className="px-6 sm:px-10 py-4 bg-white border-t border-[#e8e5e0] flex items-center justify-between">
            <div className="flex items-center gap-2">
              {schoolTracks.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeTab === i ? 'w-8 bg-[#F16736]' : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab((prev) => (prev - 1 + schoolTracks.length) % schoolTracks.length)}
                className="w-8 h-8 rounded-lg border border-[#e8e5e0] hover:border-neutral-400 flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
                aria-label="Previous Track"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setActiveTab((prev) => (prev + 1) % schoolTracks.length)}
                className="w-8 h-8 rounded-lg border border-[#e8e5e0] hover:border-neutral-400 flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
                aria-label="Next Track"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* High-Impact CTAs & Partner Schools Showcase */}
        <div className="pt-4 text-center space-y-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link 
              href="/bring-your-school" 
              className="px-10 py-5 bg-[#F16736] hover:bg-[#e05423] text-white font-extrabold text-sm uppercase tracking-wider rounded-lg shadow-xl shadow-[#F16736]/25 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 cursor-pointer"
            >
              <span>Enrol your school now!</span>
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/bring-your-school" 
              className="px-8 py-5 bg-white hover:bg-neutral-100 text-neutral-900 font-bold text-sm uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 border border-[#e8e5e0] shadow-sm cursor-pointer"
            >
              <Calendar size={16} />
              <span>Book a Strategy Call</span>
            </Link>
          </div>

          {/* Actual Partner Schools Badges */}
          <div className="space-y-3 pt-4 border-t border-[#e8e5e0]/60 max-w-4xl mx-auto">
            <p className="text-xs font-extrabold uppercase tracking-widest text-neutral-400">
              Trusted by Leading Partner Schools Across Lagos & Nigeria
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {actualPartnerSchools.map((school, sIdx) => (
                <span
                  key={sIdx}
                  className="px-3.5 py-1.5 rounded-lg bg-[#faf9f7] border border-[#e8e5e0] text-xs font-bold text-neutral-700 shadow-sm"
                >
                  {school}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

// Testimonials Section
const Testimonials = () => {
  const testimonials = [
    {
      quote: "BTSW gave me the exact digital ecosystem blueprint my brand needed to scale beyond local boundaries.",
      name: "Tunde A.",
      role: "Creative Director"
    },
    {
      quote: "The Mental Application Study changed how I approach problem-solving. It's not just school; it's a profound mindset shift.",
      name: "Chioma O.",
      role: "Tech Founder"
    },
    {
      quote: "Finally, an organization that understands the gap between Nigerian education and the global market demands.",
      name: "Ibrahim K.",
      role: "Entrepreneur"
    }
  ];

  return (
    <section className="py-24 bg-[#faf9f7] border-b border-[#e8e5e0]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-[#1e1e1e]">The Wall We've Broken.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col p-8 bg-white border border-[#e8e5e0] rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-[#F16736] mb-6">
                <svg width="32" height="24" viewBox="0 0 32 24" fill="currentColor">
                  <path d="M0 24V10.6667C0 4.44444 4.44444 0 10.6667 0V5.33333C7.11111 5.33333 5.33333 7.11111 5.33333 10.6667H10.6667V24H0ZM21.3333 24V10.6667C21.3333 4.44444 25.7778 0 32 0V5.33333C28.4444 5.33333 26.6667 7.11111 26.6667 10.6667H32V24H21.3333Z" />
                </svg>
              </div>
              <p className="text-[#6b6b6b] text-base italic mb-8 leading-relaxed">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-[#e8e5e0]">
                <div className="w-10 h-10 rounded-md bg-[#fff1eb] text-[#F16736] font-black text-xs flex items-center justify-center border border-[#F16736]/20">
                  {t.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-[#1e1e1e] font-bold text-sm">{t.name}</h4>
                  <p className="text-[#6b6b6b] text-xs uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Final CTA Section (Signature BTSW Brand Orange Gradient Showcase)
const FinalCTA = () => {
  return (
    <section id="join" className="relative py-28 overflow-hidden bg-gradient-to-br from-[#F16736] via-[#ea580c] to-[#d94815] text-white">
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl sm:text-6xl font-black text-white leading-tight tracking-tight">
            The World Won't Wait <br />
            For Your <span className="underline decoration-black decoration-4 underline-offset-8 italic">Certificate.</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/95 font-medium">
            Join the community of 800+ resourceful students rewriting the rules of success in Nigeria.
          </p>
          
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/inter-junior-workspace"
              className="px-10 py-5 bg-white hover:bg-neutral-100 text-[#F16736] text-sm font-black rounded-lg transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center gap-2"
            >
              <span>Join Junior Workspace</span>
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/bring-your-school"
              className="px-8 py-5 bg-black/15 hover:bg-black/25 border border-white/30 text-white text-sm font-bold rounded-lg transition-all flex items-center gap-2"
            >
              <Building2 size={16} />
              <span>Bring BTSW to Your School</span>
            </Link>

            <Link
              href="/register"
              className="px-8 py-5 bg-black/25 hover:bg-black/35 border border-white/30 text-white text-sm font-bold rounded-lg transition-all flex items-center gap-2"
            >
              <span>Register to our Schools</span>
            </Link>
          </div>
          
          <p className="pt-4 text-white/75 text-xs font-bold uppercase tracking-widest">
            Equipping You With What School Won't Teach
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// Main Home Page Component
const Home = () => {
  return (
    <>
      <Hero />
      <Mission />
      <ProjectLuminaBanner />
      <SimulationSpotlight />
      <Partnership />
      <Testimonials />
      <FinalCTA />
    </>
  );
};

export default Home;
