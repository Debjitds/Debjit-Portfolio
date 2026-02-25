import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollReveal, StaggerReveal, StaggerItem } from './animations/ScrollReveal';

const projects = [
  {
    title: 'tRIAL-cLIENTS',
    description: 'A SaaS platform that helps developers and designers practice real-world project work through realistic, AI-generated client briefs. It simulates real client requirements, constraints, and ambiguity to build practical skills and stronger portfolios.',
    image: '/tRIAL-cLIENTS.png',
    tech: ['React', 'TypeScript', 'Supabase', 'Gemini', 'Tailwind CSS', 'Vercel'],
    liveUrl: 'https://trial-clients.vercel.app',
    githubUrl: 'https://github.com/Debjitds/tRIAL-cLIENT',
    featured: true,
  },
  {
    title: 'Google-ADK-Customer-Support-Agent',
    description: 'An advanced customer support agent built with Google Agent Development Kit and Gemini. It automates complex support workflows, and provides intelligent, context-aware responses to user queries.',
    image: '/adk.png',
    tech: ['Gemini', 'ADK', 'Python', 'PostgreSQL'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Debjitds/Google-ADK-Customer-Support-Agent.git',
    featured: true,
  },
  {
    title: 'PreOp-CareCoordinator 🏥',
    description: 'AI-powered content generation tool for marketers. Features include blog writing, social media posts, and SEO optimization with multiple LLM integrations.',
    image: '/preop.png',
    tech: ['Streamlit', 'LangChain', 'MedGemma', 'Python', 'PostgreSQL'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Debjitds/PreOp-CareCoordinator-by-Google-MEDGEMMA.git',
    featured: false,
  },
  {
    title: 'DevCollab Platform',
    description: 'Real-time collaboration platform for developers. Includes code sharing, video conferencing, and project management features with role-based access.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop',
    tech: ['React', 'WebRTC', 'Supabase', 'shadcn/ui', 'Socket.io'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <ScrollReveal direction="up" delay={0}>
            <span className="text-primary font-medium text-sm uppercase tracking-wider mb-4 block">
              Featured Work
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Projects I've <span className="gradient-text">Built</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A selection of my recent work in AI SaaS, web applications, and automation tools.
            </p>
          </ScrollReveal>
        </div>

        {/* Projects Grid */}
        <StaggerReveal className="grid lg:grid-cols-2 gap-8" staggerDelay={0.15}>
          {projects.map((project, index) => (
            <StaggerItem key={project.title} direction={index % 2 === 0 ? 'left' : 'right'}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-primary/30 transition-all duration-500"
              >
                {/* Project Image */}
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

                  {/* Overlay Actions */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center gap-4 bg-background/60 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button variant="hero" size="sm" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-1" /> Live Demo
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-1" /> Code
                      </a>
                    </Button>
                  </motion.div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-display text-xl font-bold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
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
