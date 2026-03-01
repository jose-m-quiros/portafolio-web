"use client";

import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Download, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useI18n } from "../ui/locale-provider";

export default function Hero() {
  const { t } = useI18n();
  const roles: string[] = t('hero.roles') as unknown as string[];

  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setDisplayText(
        isDeleting
          ? fullText.substring(0, displayText.length - 1)
          : fullText.substring(0, displayText.length + 1),
      );

      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed, roles]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20" />

      {/* Animated circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse animation-delay-400" />

      <div className="section-container relative z-10 text-center">
        <div className="animate-fadeIn">
          <div className="mb-6 inline-block">
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {t('hero.badge')}
            </span>
          </div>

          <h1 className="font-bold mb-2">
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              {t('hero.greeting')}
            </span>
            <br />
            <span className="gradient-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              Jose M Quiros
            </span>
          </h1>

          <div className="mb-8 min-h-[60px] sm:min-h-[80px]">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-muted-foreground">
              {t('hero.iam')}{" "}
              <span className="text-primary">
                {displayText}
                <span className="animate-pulse">|</span>
              </span>
            </h2>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            {t('hero.description')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="#contact"
              className="btn-primary w-full sm:w-auto group"
            >
              <Mail className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              {t('hero.cta_contact')}
            </Link>
            <a
              href="/CV.pdf"
              download
              className="btn-secondary w-full sm:w-auto group"
            >
              <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              {t('hero.cta_cv')}
            </a>
          </div>

          <div className="flex items-center justify-center gap-6">
            <a
              href="https://github.com/jose-m-quiros"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground smooth-transition"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/jmquiros19/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground smooth-transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:jqchaves1928@gmail.com"
              className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground smooth-transition"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <Link
          href="#about"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <ChevronDown className="h-8 w-8 text-muted-foreground" />
        </Link>
      </div>
    </section>
  );
}
