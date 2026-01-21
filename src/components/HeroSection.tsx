import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Typewriter } from './Typewriter';
import { ParticleBackground } from './ParticleBackground';
import heroIllustration from '@/assets/hero-illustration.png';
import { fadeInUp, staggerContainer, staggerItem } from './animations/AnimatedSection';

const roles = [
  'Full Stack Developer',
  'AI SaaS Builder',
  'Automation Expert',
  'Frontend Engineer',
  'UI/UX Enthusiast',
];

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground particleCount={60} connectionDistance={120} particleSpeed={0.3} />
      
      {/* Background Glow Effects */}
      <div className="hero-glow top-1/4 -left-32" />
      <div className="hero-glow bottom-1/4 -right-32" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Floating Elements */}
      <motion.div
        className="absolute top-32 left-[15%] w-3 h-3 rounded-full bg-primary/50"
        animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-48 right-[20%] w-2 h-2 rounded-full bg-accent/50"
        animate={{ y: [0, 15, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
      <motion.div
        className="absolute bottom-48 left-[25%] w-4 h-4 rounded-full bg-primary/30"
        animate={{ y: [0, -25, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <div className="container mx-auto px-6 pt-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              variants={staggerItem}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Open to Work</span>
            </motion.div>

            {/* Main Heading with Typewriter */}
            <motion.div variants={staggerItem}>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-2">
                Hi, I'm{' '}
                <span className="gradient-text">Debjit</span>
              </h1>
              <div className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-muted-foreground mb-6 min-h-[1.5em]">
                <Typewriter 
                  words={roles} 
                  typingSpeed={80}
                  deletingSpeed={40}
                  pauseDuration={2500}
                  className="text-foreground"
                />
              </div>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={staggerItem}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8"
            >
              Building AI-powered SaaS products, modern web applications, 
              and scalable automation workflows that drive business growth.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={staggerItem}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
            >
              <Button variant="hero" size="lg" asChild>
                <a href="#projects">View My Work</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#contact">Get in Touch</a>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <a href="/resume.pdf" download="Debjit_Chandra_Sarkar_Resume.pdf">
                  <Download className="w-4 h-4 mr-2" />
                  Resume
                </a>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-border/30"
            >
              {[
                { value: '3+', label: 'Years Experience' },
                { value: '20+', label: 'Projects Completed' },
                { value: '15+', label: 'Happy Clients' },
                { value: '99%', label: 'Success Rate' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  className="text-center lg:text-left"
                >
                  <div className="font-display text-2xl md:text-3xl font-bold gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Hero Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Glow behind image */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl rounded-full scale-75" />
              
              {/* Hero Image */}
              <motion.img
                src={heroIllustration}
                alt="Developer workspace illustration"
                className="relative z-10 w-full max-w-2xl mx-auto rounded-2xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#about"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-xs uppercase tracking-wider">Scroll</span>
            <ArrowDown className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
