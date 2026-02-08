'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import Link from 'next/link';
import { 
  Film, 
  Sparkles, 
  Zap, 
  Users, 
  Shield, 
  Globe,
  ArrowRight,
  Play,
  Star,
  Quote,
  CheckCircle2,
  MessageSquare,
  Calendar,
  FileText,
  ImageIcon,
  Video,
  Clock,
  ChevronRight
} from 'lucide-react';

// ==========================================
// PARTICLES BACKGROUND COMPONENT
// ==========================================

function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    const createParticles = () => {
      particles = [];
      const count = Math.min(window.innerWidth / 10, 100);
      
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, i) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14, 165, 233, ${particle.opacity})`;
        ctx.fill();
        
        // Draw connections
        particles.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(14, 165, 233, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    resize();
    createParticles();
    animate();
    
    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

// ==========================================
// ANIMATED GRADIENT BACKGROUND
// ==========================================

function AnimatedGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-uwrap-500/30 to-cyan-500/20 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-1/2 -right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/20 to-pink-500/10 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-emerald-500/15 to-blue-500/10 rounded-full blur-[80px]"
      />
    </div>
  );
}

// ==========================================
// HERO SECTION
// ==========================================

function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedGradient />
      <ParticlesBackground />
      
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
      
      <motion.div 
        style={{ y: y1, opacity }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-uwrap-500/10 border border-uwrap-500/20 mb-8"
        >
          <Sparkles className="w-4 h-4 text-uwrap-400" />
          <span className="text-sm text-uwrap-300">New: AI-Powered Script Writing</span>
          <ArrowRight className="w-3 h-3 text-uwrap-400" />
        </motion.div>
        
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
        >
          Video Production,
          <br />
          <span className="bg-gradient-to-r from-uwrap-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Reimagined
          </span>
        </motion.h1>
        
        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10"
        >
          The all-in-one platform for creative teams. Plan, shoot, and deliver 
          stunning video content with powerful collaboration tools.
        </motion.p>
        
        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold hover:bg-slate-100 transition-colors shadow-lg shadow-white/10"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-8 py-4 bg-slate-800/50 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors border border-slate-700"
          >
            <Play className="w-4 h-4" />
            Watch Demo
          </motion.button>
        </motion.div>
        
        {/* Hero Image / Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/80 backdrop-blur-sm shadow-2xl shadow-uwrap-500/10">
            <div className="absolute inset-0 bg-gradient-to-b from-uwrap-500/5 to-transparent pointer-events-none" />
            
            {/* Browser Chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 mx-4">
                <div className="max-w-md mx-auto px-4 py-1.5 rounded-lg bg-slate-800/50 text-xs text-slate-500 text-center">
                  app.uwrap.io/dashboard
                </div>
              </div>
            </div>
            
            {/* Dashboard Preview Content */}
            <div className="p-6">
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-uwrap-500/20 to-cyan-500/20 mb-3" />
                    <div className="h-4 w-16 bg-slate-700 rounded mb-2" />
                    <div className="h-6 w-8 bg-slate-600 rounded" />
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
                    <div className="h-24 bg-gradient-to-br from-slate-700 to-slate-800" />
                    <div className="p-4">
                      <div className="h-4 w-24 bg-slate-700 rounded mb-2" />
                      <div className="h-3 w-16 bg-slate-700/50 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Floating Elements */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 p-4 rounded-xl bg-slate-800/90 border border-slate-700 shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-white">Project Complete</div>
                <div className="text-xs text-slate-400">Spot CRVDO Group</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-6 -left-6 p-4 rounded-xl bg-slate-800/90 border border-slate-700 shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-uwrap-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-uwrap-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-white">Team Online</div>
                <div className="text-xs text-slate-400">8 members active</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-slate-600 flex justify-center pt-2"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ==========================================
// FEATURES SECTION
// ==========================================

const features = [
  {
    icon: FileText,
    title: 'Script Writing',
    description: 'Collaborative script editor with real-time editing, version control, and AI-powered suggestions.',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    icon: Calendar,
    title: 'Shoot Scheduling',
    description: 'Plan your production days with drag-and-drop scheduling, location management, and crew assignments.',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: ImageIcon,
    title: 'Asset Management',
    description: 'Organize footage, photos, and documents with powerful tagging and search capabilities.',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/10',
  },
  {
    icon: Video,
    title: 'Shot Lists',
    description: 'Create detailed shot lists with storyboards, camera settings, and blocking notes.',
    color: 'from-emerald-500 to-green-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Work seamlessly with your team using comments, mentions, and real-time notifications.',
    color: 'from-violet-500 to-purple-500',
    bgColor: 'bg-violet-500/10',
  },
  {
    icon: Shield,
    title: 'Secure Cloud',
    description: 'Enterprise-grade security with encrypted storage, SSO, and granular permissions.',
    color: 'from-amber-500 to-yellow-500',
    bgColor: 'bg-amber-500/10',
  },
];

function FeatureCard({ 
  feature, 
  index 
}: { 
  feature: typeof features[0]; 
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = feature.icon;
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-300 h-full">
        {/* Hover Glow */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 blur-xl`} />
        
        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <div className={`w-6 h-6 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center`}>
            <Icon className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
        
        {/* Content */}
        <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
        
        {/* Arrow */}
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowRight className="w-4 h-4 text-slate-500" />
        </div>
      </div>
    </motion.div>
  );
}

function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section ref={ref} className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-uwrap-500/10 border border-uwrap-500/20 mb-6"
          >
            <Zap className="w-4 h-4 text-uwrap-400" />
            <span className="text-sm text-uwrap-300">Powerful Features</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-uwrap-400 to-cyan-400 bg-clip-text text-transparent">
              create
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-400"
          >
            From pre-production planning to final delivery, uWrap has you covered 
            with a complete suite of professional tools.
          </motion.p>
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// HOW IT WORKS SECTION
// ==========================================

const steps = [
  {
    number: '01',
    title: 'Plan Your Project',
    description: 'Create a new project, write your script using our collaborative editor, and build detailed shot lists with storyboards.',
    icon: FileText,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    number: '02',
    title: 'Schedule & Organize',
    description: 'Plan your shooting days, assign crew members, manage locations, and keep everyone in sync with shared calendars.',
    icon: Calendar,
    color: 'from-purple-500 to-pink-500',
  },
  {
    number: '03',
    title: 'Shoot & Deliver',
    description: 'Upload assets, track progress, collaborate with your team in real-time, and deliver your final project.',
    icon: Video,
    color: 'from-emerald-500 to-green-500',
  },
];

function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-uwrap-500/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            How it{" "}
            <span className="bg-gradient-to-r from-uwrap-400 to-cyan-400 bg-clip-text text-transparent">
              works
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-slate-400"
          >
            Get started in minutes with our simple three-step process
          </motion.p>
        </div>
        
        {/* Steps */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent hidden lg:block" />
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="text-center">
                    {/* Icon */}
                    <div className="relative inline-flex mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg shadow-${step.color.split('-')[1]}-500/20`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
                        <span className="text-xs font-bold text-uwrap-400">{step.number}</span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// TESTIMONIALS SECTION
// ==========================================

const testimonials = [
  {
    quote: "uWrap has completely transformed how we handle video production. The collaborative script editor alone has saved us countless hours.",
    author: "Marco Rossi",
    role: "Creative Director",
    company: "CRVDO Group",
    avatar: "M",
  },
  {
    quote: "The scheduling features are incredible. We've reduced our planning time by 60% and our shoots run so much smoother now.",
    author: "Sarah Chen",
    role: "Producer",
    company: "Studio Milano",
    avatar: "S",
  },
  {
    quote: "Finally, a tool that understands the needs of video professionals. The asset management alone is worth the subscription.",
    author: "Lisa Martinez",
    role: "Film Director",
    company: "Indie Films",
    avatar: "L",
  },
];

function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section ref={ref} className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-uwrap-500/10 border border-uwrap-500/20 mb-6"
          >
            <MessageSquare className="w-4 h-4 text-uwrap-400" />
            <span className="text-sm text-uwrap-300">Testimonials</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Loved by{" "}
            <span className="bg-gradient-to-r from-uwrap-400 to-cyan-400 bg-clip-text text-transparent">
              creators
            </span>
          </motion.h2>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-300 h-full"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-10 h-10 text-uwrap-400" />
                </div>
                
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-slate-300 leading-relaxed mb-6">"{testimonial.quote}"</p>
                
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-uwrap-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  
                  <div>
                    <div className="font-medium text-white">{testimonial.author}</div>
                    <div className="text-sm text-slate-500">{testimonial.role} at {testimonial.company}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// CTA SECTION
// ==========================================

function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section ref={ref} className="py-32 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-uwrap-600 via-uwrap-700 to-slate-900 p-12 lg:p-16"
        >
          {/* Background Effects */}
          
          <div className="absolute inset-0 overflow-hidden"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-400/30 rounded-full blur-3xl"
            />
            
            <motion.div
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"
            />
          </div>
          
          <div className="relative z-10 text-center"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
            >
              Ready to transform your
              <br />
              video workflow?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-uwrap-100 mb-10 max-w-xl mx-auto"
            >
              Join thousands of creative teams already using uWrap to deliver 
              amazing video content faster.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold hover:bg-slate-100 transition-colors shadow-lg shadow-white/10"
                >
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              
              <button className="flex items-center gap-2 px-8 py-4 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors border border-white/20"
              >
                <Play className="w-4 h-4" />
                Watch Demo
              </button>
            </motion.div>
            
            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-8 border-t border-white/10"
            >
              <div className="flex items-center gap-2 text-sm text-uwrap-200">
                <CheckCircle2 className="w-4 h-4" />
                Free 14-day trial
              </div>
              <div className="flex items-center gap-2 text-sm text-uwrap-200">
                <CheckCircle2 className="w-4 h-4" />
                No credit card required
              </div>
              <div className="flex items-center gap-2 text-sm text-uwrap-200">
                <CheckCircle2 className="w-4 h-4" />
                Cancel anytime
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ==========================================
// FOOTER
// ==========================================

function Footer() {
  const links = [
    {
      title: 'Product',
      items: ['Features', 'Pricing', 'Integrations', 'Changelog'],
    },
    {
      title: 'Company',
      items: ['About', 'Blog', 'Careers', 'Press'],
    },
    {
      title: 'Resources',
      items: ['Documentation', 'Help Center', 'Community', 'Templates'],
    },
    {
      title: 'Legal',
      items: ['Privacy', 'Terms', 'Security', 'Cookies'],
    },
  ];
  
  return (
    <footer className="border-t border-slate-800 py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12"
        >
          <div className="col-span-2"
          >
            <div className="flex items-center gap-2 mb-4"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-uwrap-500 to-cyan-500 flex items-center justify-center"
              >
                <Film className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl text-white">uWrap</span>
            </div>
            
            <p className="text-slate-400 text-sm mb-6 max-w-xs"
            >
              The modern platform for video production teams. Plan, shoot, and deliver stunning content.
            </p>
            
            <div className="flex gap-4"
            >
              {['Twitter', 'LinkedIn', 'YouTube', 'Instagram'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  <Globe className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          
          {links.map((group) => (
            <div key={group.title}>
              <h4 className="font-semibold text-white mb-4">{group.title}</h4>
              
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item}>
                    <a 
                      href="#" 
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© 2026 uWrap. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ==========================================
// MAIN LANDING PAGE
// ==========================================

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950"
    >
      <HeroSection />
      
      <FeaturesSection />
      
      <HowItWorksSection />
      
      <TestimonialsSection />
      
      <CTASection />
      
      <Footer />
    </main>
  );
}
