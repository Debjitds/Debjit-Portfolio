import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { ScrollReveal, StaggerReveal, StaggerItem } from './animations/ScrollReveal';

const experiences = [
  {
    role: 'Full Stack Developer',
    company: 'AI Startup',
    location: 'Remote',
    period: 'January 2024 - Present',
    description: 'Leading development of AI-powered SaaS products, building scalable frontend architectures with React and TypeScript, and integrating OpenAI APIs for intelligent features.',
    responsibilities: [
      'Architecting and developing AI-powered web applications with React & TypeScript',
      'Building RESTful APIs and integrating with Supabase for authentication & database',
      'Implementing workflow automation using n8n and custom integrations',
      'Collaborating with product teams to deliver user-centric solutions',
    ],
    color: 'from-primary to-accent',
  },
  {
    role: 'Frontend Developer',
    company: 'Tech Agency',
    location: 'India',
    period: 'June 2023 - December 2023',
    description: 'Developed responsive web applications for various clients, focusing on performance optimization and modern UI/UX practices.',
    responsibilities: [
      'Built pixel-perfect responsive interfaces using React and Tailwind CSS',
      'Optimized web performance achieving 95+ Lighthouse scores',
      'Collaborated with designers to implement complex UI animations',
      'Maintained code quality through reviews and testing practices',
    ],
    color: 'from-primary to-secondary',
  },
  {
    role: 'Junior Developer',
    company: 'Freelance',
    location: 'Remote',
    period: 'January 2022 - May 2023',
    description: 'Started freelancing journey building websites and web applications for small businesses and startups.',
    responsibilities: [
      'Developed custom WordPress themes and React applications',
      'Integrated payment gateways and third-party APIs',
      'Provided ongoing maintenance and support for clients',
      'Built landing pages and marketing websites',
    ],
    color: 'from-secondary to-muted',
  },
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding relative overflow-hidden bg-card/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <ScrollReveal direction="up" delay={0}>
            <span className="text-primary font-medium text-sm uppercase tracking-wider mb-4 block">
              Career Journey
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">
              Work <span className="gradient-text">Experience</span>
            </h2>
          </ScrollReveal>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <motion.div 
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent"
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />

          {experiences.map((exp, index) => (
            <div
              key={exp.role}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <ScrollReveal direction="scale" delay={0.2}>
                <motion.div 
                  className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary glow-effect z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.2, duration: 0.4, type: 'spring' }}
                />
              </ScrollReveal>

              {/* Content Card */}
              <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                <ScrollReveal direction={index % 2 === 0 ? 'left' : 'right'} delay={0.1 + index * 0.15}>
                  <motion.div 
                    whileHover={{ scale: 1.02, y: -3 }}
                    transition={{ duration: 0.2 }}
                    className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300"
                  >
                    {/* Header */}
                    <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${exp.color} text-primary-foreground text-xs font-medium mb-4`}>
                      {exp.company}
                    </div>
                    
                    <h3 className="font-display text-xl font-bold mb-2">{exp.role}</h3>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                    </div>

                    <p className="text-muted-foreground text-sm mb-4">{exp.description}</p>

                    <ul className="space-y-2">
                      {exp.responsibilities.map((resp, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          {resp}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </ScrollReveal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
