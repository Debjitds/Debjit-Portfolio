import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Lightbulb, Rocket, Users } from 'lucide-react';
import { ScrollReveal, StaggerReveal, StaggerItem } from './animations/ScrollReveal';

const highlights = [
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Writing maintainable, scalable code with modern best practices',
  },
  {
    icon: Lightbulb,
    title: 'AI Innovation',
    description: 'Integrating cutting-edge AI models into practical applications',
  },
  {
    icon: Rocket,
    title: 'Fast Delivery',
    description: 'Rapid prototyping and deployment with production-grade quality',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Working closely with teams to bring visions to life',
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <ScrollReveal direction="left" delay={0}>
              <span className="text-primary font-medium text-sm uppercase tracking-wider mb-4 block">
                About Me
              </span>
            </ScrollReveal>
            
            <ScrollReveal direction="left" delay={0.1}>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Crafting Digital
                <br />
                <span className="gradient-text">Experiences</span> That Matter
              </h2>
            </ScrollReveal>
            
            <ScrollReveal direction="left" delay={0.2}>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I'm a passionate Full Stack Developer based in India, specializing in building 
                  AI-powered SaaS products and modern web applications. With expertise in React, 
                  TypeScript, and Tailwind CSS, I create scalable, user-centric solutions.
                </p>
                <p>
                  My journey in tech has led me to work extensively with AI integrations, 
                  workflow automation using tools like n8n, and building robust authentication 
                  systems with Supabase. I believe in the power of clean code and intuitive design.
                </p>
                <p>
                  When I'm not coding, I'm exploring the latest in AI technology and finding 
                  ways to integrate innovative solutions into real-world applications.
                </p>
              </div>
            </ScrollReveal>

            {/* Contact Info */}
            <ScrollReveal direction="up" delay={0.3}>
              <div className="mt-8 p-4 rounded-xl bg-card border border-border/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary text-xl">📱</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Call me at</p>
                    <p className="font-semibold text-foreground">+91 6289771823</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right - Highlights Grid */}
          <StaggerReveal className="grid grid-cols-2 gap-4" staggerDelay={0.15}>
            {highlights.map((item, index) => (
              <StaggerItem key={item.title} direction="scale">
                <motion.div
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 group h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
};
