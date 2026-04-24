'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X, ChevronDown } from 'lucide-react';
import styles from './Navbar.module.css';

const locales = [
  { code: 'az', label: 'AZ', flag: '🇦🇿' },
  { code: 'ru', label: 'RU', flag: '🇷🇺' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
];

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLocalePath = (targetLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = targetLocale;
    return segments.join('/') || `/${targetLocale}`;
  };

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/services`, label: t('services') },
    { href: `/${locale}/results`, label: t('results') },
    { href: `/${locale}/book`, label: t('book') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className="container">
        <nav className={styles.nav}>
          {/* Logo */}
          <Link href={`/${locale}`} className={styles.logo}>
            <div className={styles.logoIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill="currentColor"/>
              </svg>
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoName}>Leyla Zülfüqarlı</span>
              <span className={styles.logoSub}>Diyetoloq</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <ul className={styles.navLinks}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${styles.navLink} ${pathname === link.href || (link.href !== `/${locale}` && pathname.startsWith(link.href)) ? styles.active : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side */}
          <div className={styles.navRight}>
            {/* Language Switcher */}
            <div className={styles.langSwitcher}>
              {locales.map((loc) => (
                <Link
                  key={loc.code}
                  href={getLocalePath(loc.code)}
                  className={`${styles.langBtn} ${locale === loc.code ? styles.langActive : ''}`}
                >
                  {loc.label}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className={styles.authBtns}>
              <Link href={`/${locale}/login`} className={styles.loginBtn}>
                {t('login')}
              </Link>
              <Link href={`/${locale}/login?tab=register`} className="btn btn-primary btn-sm">
                {t('register')}
              </Link>
            </div>

            {/* Consultation CTA (desktop) */}
            <Link href={`/${locale}/consultation`} className={`btn btn-primary btn-sm ${styles.ctaBtn}`}>
              {t('consultation')}
            </Link>

            {/* Mobile toggle */}
            <button className={styles.menuToggle} onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className={styles.mobileMenu}>
            <ul className={styles.mobileLinks}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${styles.mobileLink} ${pathname === link.href ? styles.mobileLinkActive : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className={styles.mobileDivider} />

            <div className={styles.mobileLang}>
              {locales.map((loc) => (
                <Link
                  key={loc.code}
                  href={getLocalePath(loc.code)}
                  className={`${styles.langBtn} ${locale === loc.code ? styles.langActive : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  {loc.flag} {loc.label}
                </Link>
              ))}
            </div>

            <div className={styles.mobileAuthBtns}>
              <Link href={`/${locale}/login`} className="btn btn-outline" onClick={() => setIsOpen(false)}>
                {t('login')}
              </Link>
              <Link href={`/${locale}/login?tab=register`} className="btn btn-primary" onClick={() => setIsOpen(false)}>
                {t('register')}
              </Link>
            </div>

            <Link href={`/${locale}/consultation`} className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%', justifyContent: 'center' }} onClick={() => setIsOpen(false)}>
              {t('consultation')}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
