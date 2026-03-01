'use client';

import { Briefcase, Calendar } from 'lucide-react';
import { useI18n } from '../ui/locale-provider';

type ExperienceType = {
  company: string;
  position: string;
  period: string;
  description: string;
  achievements: string[];
  link?: string;
};

export default function Experience() {
  const { t } = useI18n();
  const experiences: ExperienceType[] = t('experience.items') as unknown as ExperienceType[];

  return (
    <section id="experience" className="section-container">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('experience.title_pre')} <span className="gradient-text">{t('experience.title_highlight')}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('experience.subtitle')}
          </p>
        </div>

        <div className="relative">
          {/* Línea central */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600 -translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative grid md:grid-cols-2 gap-8">
                {/* Punto del timeline */}
                <div className="hidden md:block absolute left-1/2 top-8 w-4 h-4 bg-primary rounded-full border-4 border-background -translate-x-1/2 z-10" />

                {/* Contenedor de la experiencia */}
                <div
                  className={`${
                    index % 2 === 0
                      ? 'md:text-left md:pr-12'
                      : 'md:col-start-2 md:pl-12 text-left'
                  }`}
                >
                  <div className="bg-card p-6 rounded-xl border shadow-sm hover:shadow-md smooth-transition text-left">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{exp.position}</h3>
                        <p className="text-primary font-semibold mb-2">{exp.company}</p>
                        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {exp.period}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">{exp.description}</p>

                    <div className="space-y-2">
                      <p className="font-semibold text-sm">{t('experience.responsibilities')}</p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-primary mt-1">▸</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                      {exp.link && (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-block text-primary font-medium hover:underline"
                        >
                          {t('experience.visit_site')}
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Espacio vacío para mantener diseño */}
                <div className="hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}