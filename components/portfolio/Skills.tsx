"use client";

import { useState } from 'react';
import { useI18n } from '../ui/locale-provider';
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaPython,
  FaGitAlt,
  FaCode,
  FaDocker,
  FaJsSquare,
  FaJava,
  FaDatabase,
  FaLaptopCode,
  FaChartBar,
  FaProjectDiagram
} from 'react-icons/fa';
import {
  SiTypescript,
  SiTailwindcss,
  SiSqlite,
  SiMongodb,
  SiMysql,
  SiDotnet,
  SiNextdotjs,
  SiJest,
  SiFigma,
  SiScrumalliance,
  SiApachenetbeanside
} from 'react-icons/si';

type SkillType = {
  name: string;
  icon: any;
  category: string;
};

const categories = ['all', 'frontend', 'backend', 'database', 'tools', 'other'];

const skills: SkillType[] = [
  // Frontend
  { name: 'CSS', icon: FaCss3Alt, category: 'frontend' },
  { name: 'HTML', icon: FaHtml5, category: 'frontend' },
  { name: 'React', icon: FaReact, category: 'frontend' },
  { name: 'Next.js', icon: SiNextdotjs, category: 'frontend' },
  { name: 'TypeScript', icon: SiTypescript, category: 'frontend' },
  { name: 'JavaScript', icon: FaJsSquare, category: 'frontend' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, category: 'frontend' },
  
  // Backend
  { name: 'C#', icon: SiDotnet, category: 'backend' },
  { name: 'Java', icon: FaJava, category: 'backend' },
  { name: 'Python', icon: FaPython, category: 'backend' },

  // Database
  { name: 'SQL Server', icon: FaDatabase, category: 'database' },
  { name: 'MySQL', icon: SiMysql, category: 'database' },
  { name: 'MongoDB', icon: SiMongodb, category: 'database' },
  { name: 'SQLite', icon: SiSqlite, category: 'database' },

  // Tools
  { name: 'Git', icon: FaGitAlt, category: 'tools' },
  { name: 'Docker', icon: FaDocker, category: 'tools' },
  { name: 'VS Code', icon: FaCode, category: 'tools' },
  { name: 'Visual Studio', icon: FaLaptopCode, category: 'tools' },
  { name: 'Apache NetBeans', icon: SiApachenetbeanside, category: 'tools' },
  { name: 'StarUML', icon: FaProjectDiagram, category: 'tools' },
  { name: 'Power BI', icon: FaChartBar, category: 'tools' },

  // Other
  { name: 'Agile/Scrum', icon: SiScrumalliance, category: 'other' },
  { name: 'UI/UX Design', icon: SiFigma, category: 'other' },
  { name: 'Testing (Jest)', icon: SiJest, category: 'other' }
];

export default function Skills() {
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredSkills =
    selectedCategory === 'all'
      ? skills.filter((skill) => ['frontend', 'backend'].includes(skill.category))
      : skills.filter((skill) => skill.category === selectedCategory);

  return (
    <section id="skills" className="section-container">
      <div className="max-w-6xl mx-auto">
        {/* Título */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('skills.title').split(' ')[0]} <span className="gradient-text">{t('skills.title').split(' ')[1] ?? ''}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('skills.description')}
          </p>
        </div>

        {/* Filtros de categoría */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium smooth-transition ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              {t(`categories.${category}`)}
            </button>
          ))}
        </div>

        {/* Grid de skills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {filteredSkills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div key={index} className="card flex items-center gap-4 hover:shadow-md smooth-transition rounded-xl w-full">
                <div className="icon-circle">
                  <Icon className="icon-svg text-primary" />
                </div>
                <span className="font-semibold text-base">{skill.name}</span>
              </div>
            );
          })}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {t('skills.no_results')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}