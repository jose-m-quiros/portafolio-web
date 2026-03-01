"use client";

import { Code2, Lightbulb, Users, Rocket, ShieldCheck, Zap } from 'lucide-react';
import { useI18n } from '../ui/locale-provider';

export default function About() {
  const { t } = useI18n();
  const intro: string[] = t('about.intro') as unknown as string[];
  const facts: string[] = t('about.quick_facts') as unknown as string[];
  const highlights: { title: string; description: string }[] =
    t('about.highlights') as unknown as { title: string; description: string }[];
  const valuesTitle: string = t('about.values_title');
  const values: { title: string; description: string }[] =
    t('about.values') as unknown as { title: string; description: string }[];

  const valueIcons = [ShieldCheck, Zap, Users];
  const highlightIcons = [Code2, Lightbulb, Rocket];

  const combined = [...values.slice(0, 3), ...highlights.slice(0, 3)];
  const icons = [...valueIcons, ...highlightIcons];

  return (
    <section id="about" className="section-container">
      <div className="w-full">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('about.title_main')} <span className="gradient-text">{t('about.title_highlight')}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto prose-lite">{t('about.subtitle')}</p>
          </div>
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-8">
          {/* Intro: full-width responsive block */}
          <div className="w-full mx-auto">
            <div className="space-y-7 text-muted-foreground">
              {intro.map((p, i) => (
                <p key={i} className="mb-7">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="max-w-6xl mx-auto mt-12">
            <div className="grid lg:grid-cols-1 gap-16 lg:gap-20 items-start lg:divide-x lg:divide-border/50">
              <div className="space-y-8 lg:pr-8">
                <div className="flex flex-wrap gap-4">
                  {facts.map((f, i) => (
                    <div key={i} className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium text-sm md:text-base">
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Combined Values + Highlights grid (full-width under the two-column intro) */}
            <div className="mt-12">
              <h3 className="text-2xl font-semibold mb-6">{valuesTitle}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {combined.map((item, idx) => {
                  const IconComp = icons[idx % icons.length];
                  return (
                    <div key={idx} className="card flex items-start gap-4 min-h-[110px]">
                      <div className="icon-circle">
                        <IconComp className="icon-svg text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
