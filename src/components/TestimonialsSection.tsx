import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { ScrollReveal, StaggerReveal, StaggerItem } from './animations/ScrollReveal';

const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'CEO, TechVentures',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    content: 'Debjit delivered an exceptional AI-powered dashboard that exceeded our expectations. His technical expertise in React and AI integrations transformed our data visualization needs into reality.',
    rating: 5,
  },
  {
    name: 'Priya Patel',
    role: 'Product Manager, StartupX',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    content: 'Working with Debjit was a fantastic experience. He built our workflow automation system with incredible attention to detail. The n8n integrations he implemented saved our team countless hours.',
    rating: 5,
  },
  {
    name: 'Alex Chen',
    role: 'CTO, InnovateTech',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    content: "Debjit's ability to translate complex requirements into elegant solutions is remarkable. His work on our SaaS platform was clean, scalable, and exactly what we needed. Highly recommended!",
    rating: 5,
  },
  {
    name: 'Sarah Johnson',
    role: 'Founder, CreativeHub',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    content: 'The frontend work Debjit did for our platform was outstanding. Fast, responsive, and beautifully designed. He has a keen eye for UI/UX and delivers pixel-perfect implementations.',
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      <div className="hero-glow top-0 right-0" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <ScrollReveal direction="up" delay={0}>
            <span className="text-primary font-medium text-sm uppercase tracking-wider mb-4 block">
              Testimonials
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              What Clients <span className="gradient-text">Say</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Feedback from amazing people I've had the pleasure to work with.
            </p>
          </ScrollReveal>
        </div>

        {/* Testimonials Grid */}
        <StaggerReveal className="grid md:grid-cols-2 gap-6" staggerDelay={0.12}>
          {testimonials.map((testimonial, index) => (
            <StaggerItem key={testimonial.name} direction={index % 2 === 0 ? 'left' : 'right'}>
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.2 }}
                className="relative p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 h-full"
              >
                {/* Quote Icon */}
                <motion.div
                  initial={{ rotate: -10, opacity: 0 }}
                  whileInView={{ rotate: 0, opacity: 0.2 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-primary" />
                </motion.div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                    >
                      <Star className="w-4 h-4 fill-primary text-primary" />
                    </motion.div>
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 relative z-10">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <motion.img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
};
