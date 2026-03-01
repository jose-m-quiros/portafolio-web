"use client";

import Link from 'next/link';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';
import { useI18n } from '../ui/locale-provider';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useI18n();

  const navigationMain = [
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.skills'), href: '#skills' },
    { name: t('nav.experience'), href: '#experience' },
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.education'), href: '#education' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  const navigationSocial = [
    {
      name: 'GitHub',
      href: 'https://github.com/jose-m-quiros',
      icon: Github,
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/jmquiros19/',
      icon: Linkedin,
    },
    {
      name: 'Discord (jm_quiros19)',
      href: 'https://discord.com/users/jm_quiros19',
      icon: FaDiscord,
    },
    {
      name: 'Email',
      href: 'mailto:jqchaves1928@gmail.com',
      icon: Mail,
    },
  ];

  return (
    <footer className="bg-transparent border-t">
      <div className="section-container py-12">
        <div className="max-w-7xl mx-auto">
          {/* Top section */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <Link
                href="#home"
                className="text-2xl font-bold gradient-text hover:opacity-80 transition-opacity inline-block mb-4"
              >
                Jose M Quiros
              </Link>
              <p className="text-muted-foreground text-sm">
                {t('footer.description')}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">{t('footer.links_title')}</h3>
              <ul className="space-y-2">
                {navigationMain.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary smooth-transition"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="font-semibold mb-4">{t('footer.connect_title')}</h3>
              <div className="flex gap-4">
                {navigationSocial.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground smooth-transition"
                    aria-label={item.name}
                  >
                    <item.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
              <div className="mt-6">
                <a
                  href="mailto:jqchaves1928@gmail.com"
                  className="text-sm text-primary hover:underline"
                >
                  jqchaves1928@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t my-8" />

          {/* Bottom section */}
          <div className="flex justify-center items-center">
            <p className="text-sm text-muted-foreground text-center">
              © {currentYear} Jose M Quiros, {t('footer.rights')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
