'use client';

import { GraduationCap, Award, Calendar } from 'lucide-react';
import { useI18n } from '../ui/locale-provider';

type Degree = {
  degree: string;
  school: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
};

type Cert = {
  name: string;
  issuer: string;
  year: string;
};

export default function Education() {
  const { t } = useI18n();
  const degrees: Degree[] = t('education.degrees') as unknown as Degree[];
  const certs: Cert[] = t('education.certs') as unknown as Cert[];

  return (
    <section id="education" className="section-container">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('education.title_pre')} <span className="gradient-text">{t('education.title_highlight')}</span> {t('education.title_suffix')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('education.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold">{t('education.education_label')}</h3>
            </div>

            <div className="space-y-6">
              {degrees.map((edu, index) => (
                <div
                  key={index}
                  className="relative pl-8 pb-8 border-l-2 border-primary/20 last:pb-0"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-primary rounded-full border-4 border-background" />

                  <div className="bg-card p-6 rounded-xl border shadow-sm hover:shadow-md smooth-transition">
                    <h4 className="text-lg font-bold mb-2">{edu.degree}</h4>
                    <p className="text-primary font-semibold mb-2">{edu.school}</p>

                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {edu.period}
                      </span>
                      <span>•</span>
                      <span>{edu.location}</span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">{edu.description}</p>

                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary mt-1">▸</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Award className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold">{t('education.certifications_label')}</h3>
            </div>

            <div className="space-y-4">
              {certs.map((cert, index) => (
                <div
                  key={index}
                  className="bg-card p-4 sm:p-6 rounded-xl border shadow-sm hover:shadow-md smooth-transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold mb-1 text-sm sm:text-base break-words">{cert.name}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">{cert.issuer}</p>
                    </div>
                    <div className="flex-shrink-0 self-start">
                      <span className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium whitespace-nowrap">
                        {cert.year}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional info */}
            <div className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/20">
              <h4 className="font-bold mb-2 text-primary">{t('education.continuous_learning_title')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('education.continuous_learning_text')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}