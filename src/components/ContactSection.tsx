import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ScrollReveal, StaggerReveal, StaggerItem } from './animations/ScrollReveal';

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 6289771823',
    href: 'tel:+916289771823',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'debjitchsarkarofficial2003@gmail.com',
    href: 'mailto:debjitchsarkarofficial2003@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'India',
    href: '#',
  },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/Debjitds', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/debjitchandrasarkar', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: 'https://www.instagram.com/debjit.sarkar.756?igsh=ZHFvcWVocHlieTdh', label: 'Instagram' },
  { icon: Mail, href: 'https://mail.google.com/mail/?view=cm&fs=1&to=debjitchsarkarofficial2003@gmail.com', label: 'Mail' },
];

export const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Message sent!',
      description: "Thank you for reaching out. I'll get back to you soon!",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-card/30">
      <div className="hero-glow bottom-0 left-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <ScrollReveal direction="up" delay={0}>
            <span className="text-primary font-medium text-sm uppercase tracking-wider mb-4 block">
              Get In Touch
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Let's Work <span className="gradient-text">Together</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? Let's discuss how I can help bring your ideas to life.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <ScrollReveal direction="left" delay={0}>
              <h3 className="font-display text-2xl font-bold mb-4">Contact Information</h3>
              <p className="text-muted-foreground">
                Feel free to reach out through any of these channels. I'm always open to discussing new projects and opportunities.
              </p>
            </ScrollReveal>

            <StaggerReveal className="space-y-4" staggerDelay={0.1}>
              {contactInfo.map((info) => (
                <StaggerItem key={info.label} direction="left">
                  <motion.a
                    href={info.href}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 group overflow-hidden"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="font-semibold text-foreground text-sm sm:text-base break-all">{info.value}</p>
                    </div>
                  </motion.a>
                </StaggerItem>
              ))}
            </StaggerReveal>

            {/* Social Links */}
            <ScrollReveal direction="up" delay={0.3}>
              <p className="text-sm text-muted-foreground mb-4">Find me on</p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('mailto:') ? undefined : "_blank"}
                    rel={social.href.startsWith('mailto:') ? undefined : "noopener noreferrer"}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1, type: 'spring' }}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-card border border-border/50 flex items-center justify-center hover:border-primary/50 hover:text-primary transition-all duration-300"
                  >
                    <social.icon className="w-4 h-4 md:w-5 md:h-5" />
                  </motion.a>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Contact Form */}
          <ScrollReveal direction="right" delay={0.2}>
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-4 md:space-y-6 p-4 md:p-6 rounded-2xl bg-card border border-border/50"
              whileHover={{ borderColor: 'hsl(var(--primary) / 0.3)' }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  required
                  className="bg-secondary/50 border-border/50 focus:border-primary transition-colors"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Your Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  required
                  className="bg-secondary/50 border-border/50 focus:border-primary transition-colors"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  rows={5}
                  required
                  className="bg-secondary/50 border-border/50 focus:border-primary resize-none transition-colors"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <Button type="submit" variant="hero" size="lg" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </motion.div>
            </motion.form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
