import { motion } from 'framer-motion';
import { ScrollReveal, StaggerReveal, StaggerItem } from './animations/ScrollReveal';

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', icon: '⚛️' },
      { name: 'TypeScript', icon: '📘' },
      { name: 'Tailwind CSS', icon: '🎨' },
      { name: 'Vite', icon: '⚡' },
      { name: 'shadcn/ui', icon: '🧩' },
      { name: 'Framer Motion', icon: '✨' },
    ],
  },
  {
    title: 'Backend & APIs',
    skills: [
      { name: 'Supabase', icon: '🗄️' },
      { name: 'REST APIs', icon: '🔗' },
      { name: 'Node.js', icon: '🟢' },
      { name: 'PostgreSQL', icon: '🐘' },
      { name: 'Auth Systems', icon: '🔐' },
      { name: 'Edge Functions', icon: '☁️' },
    ],
  },
  {
    title: 'AI & Automation',
    skills: [
      { name: 'OpenAI API', icon: '🤖' },
      { name: 'n8n Workflows', icon: '🔄' },
      { name: 'LangChain', icon: '🦜' },
      { name: 'AI Integrations', icon: '🧠' },
      { name: 'Prompt Engineering', icon: '💬' },
      { name: 'Vector DBs', icon: '📊' },
    ],
  },
  {
    title: 'Tools & DevOps',
    skills: [
      { name: 'Git', icon: '📦' },
      { name: 'Vercel', icon: '▲' },
      { name: 'Docker', icon: '🐳' },
      { name: 'Figma', icon: '🎯' },
      { name: 'VS Code', icon: '💻' },
      { name: 'Linux', icon: '🐧' },
    ],
  },
];

export const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="hero-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <ScrollReveal direction="up" delay={0}>
            <span className="text-primary font-medium text-sm uppercase tracking-wider mb-4 block">
              My Expertise
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">
              Skills & <span className="gradient-text">Technologies</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Skills Grid */}
        <StaggerReveal className="grid md:grid-cols-2 gap-8" staggerDelay={0.12}>
          {skillCategories.map((category, catIndex) => (
            <StaggerItem key={category.title} direction="up">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <h3 className="font-display text-xl font-semibold mb-6 flex items-center gap-3">
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: catIndex * 0.2 }}
                  />
                  {category.title}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + skillIndex * 0.05 }}
                      whileHover={{ scale: 1.08, y: -3 }}
                      className="flex items-center gap-2 p-3 rounded-xl bg-secondary/50 border border-border/30 hover:border-primary/40 transition-all cursor-default"
                    >
                      <span className="text-lg">{skill.icon}</span>
                      <span className="text-sm font-medium">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
};
