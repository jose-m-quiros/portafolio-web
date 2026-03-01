'use client';

import { useState } from 'react';
import { ExternalLink, Github, Filter } from 'lucide-react';
import Image from 'next/image';
import { useI18n } from '../ui/locale-provider';

type Project = {
  title: string;
  description: string;
  category: string;
  status: string;
  image: string;
  technologies: string[];
  highlights: string[];
  github?: string;
  demo?: string;
};

export default function Projects() {
  const { t } = useI18n();
  const projects: Project[] = t('projects.items') as unknown as Project[];

  const categories = [t('projects.all'), ...Array.from(new Set(projects.map(p => p.category)))];

  const [selectedCategory, setSelectedCategory] = useState<string>(t('projects.all'));

  const filteredProjects = selectedCategory === t('projects.all')
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  const statusLabel = (s: string) =>
    s === 'published' ? t('projects.status_published') : t('projects.status_wip');

  const statusClasses = (s: string) =>
    s === 'published'
      ? 'bg-green-100 text-green-700'
      : 'bg-yellow-100 text-yellow-700';

  return (
    <section id="projects" className="section-container">
      <div className="max-w-7xl mx-auto">
        {/* Título */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('projects.title_pre')} <span className="gradient-text">{t('projects.title_highlight')}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">{t('projects.filter')}</span>
          </div>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium smooth-transition ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid de proyectos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={idx}
              className="group bg-card rounded-xl border shadow-sm hover:shadow-xl smooth-transition overflow-hidden"
            >
              {/* Imagen */}
              <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  loading="eager"
                  className="object-cover w-full h-full group-hover:scale-105 smooth-transition"
                />
              </div>

              {/* Contenido */}
              <div className="p-6">
                <div className="mb-2 flex flex-wrap gap-2 items-center">
                  <span className={`text-xs px-2 py-1 rounded font-medium ${statusClasses(project.status)}`}>
                    {statusLabel(project.status)}
                  </span>
                  {project.highlights.map((item, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-secondary rounded-md font-medium">
                      {item}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-primary smooth-transition">
                  {project.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-secondary rounded-md font-medium">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 mt-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-background/90 rounded-full hover:bg-primary hover:text-primary-foreground smooth-transition"
                      aria-label="GitHub"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-background/90 rounded-full hover:bg-primary hover:text-primary-foreground smooth-transition"
                      aria-label="Demo"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t('projects.no_results')}</p>
          </div>
        )}
      </div>
    </section>
  );
}