"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '../ui/theme-toggle';
import { useI18n } from '../ui/locale-provider';
import LanguageToggle from '../ui/language-toggle';
import MoreMenu from '../ui/more-menu';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sectionIds = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];
  const { t } = useI18n();

  const allLinks = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#skills', label: t('nav.skills') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#experience', label: t('nav.experience') },
    { href: '#education', label: t('nav.education') },
    { href: '#contact', label: t('nav.contact') },
  ];

  const primaryLinks = allLinks.slice(0, 4);
  const extraLinks = allLinks.slice(4);

  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);

        if (window.innerWidth < 768) {
          ticking = false;
          return;
        }

        let current = 'home';
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 120) current = id;
          }
        }

        setActiveSection(current);
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isOpen
            ? 'bg-background/80 backdrop-blur-lg shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="#home"
              className="text-2xl font-bold gradient-text hover:opacity-80 transition-opacity"
            >
              JM
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center gap-2">
                <div className="hidden lg:flex items-center gap-4 overflow-x-auto no-scrollbar">
                  {allLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-sm font-medium smooth-transition px-3 py-1 rounded ${
                        activeSection === link.href.replace('#', '')
                          ? 'text-primary bg-primary/10'
                          : 'text-muted-foreground hover:text-primary'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* On smaller screens show primary links + More */}
                <div className="flex lg:hidden items-center gap-3">
                  {primaryLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-sm font-medium smooth-transition px-3 py-1 rounded ${
                        activeSection === link.href.replace('#', '')
                          ? 'text-primary bg-primary/10'
                          : 'text-muted-foreground hover:text-primary'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <MoreMenu items={extraLinks} />
                </div>
              </div>
              <div className="flex items-center space-x-2 border border-input rounded-md p-1">
                <LanguageToggle />
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors duration-150"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation — rendered outside <nav> to avoid stacking context issues */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-[9999]"
          style={{ top: '4rem' }}
        >
          {/* Solid background layer */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'hsl(var(--background))' }}
          />

          {/* Content layer */}
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center space-y-7 px-6">
            {allLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className={`text-base font-medium transition-colors duration-200 ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center space-x-4 pt-3">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
