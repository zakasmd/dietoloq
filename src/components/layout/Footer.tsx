import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Phone, Mail, MapPin } from 'lucide-react';
import styles from './Footer.module.css';

// Inline social icons (lucide-react doesn't include Instagram/Youtube in this version)
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.4 2.8 12 2.8 12 2.8s-4.4 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.3v2c0 2.1.3 4.3.3 4.3s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.5 21.7 12 21.7 12 21.7s4.4 0 6.8-.2c.6-.1 1.9-.1 3-1.2.9-.8 1.2-2.8 1.2-2.8s.3-2.1.3-4.3v-2C23.3 9.1 23 7 23 7zm-13.5 7V10l5.5 2L9.5 14z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block', flexShrink: 0 }}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
);

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const locale = useLocale();

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: `/${locale}`, label: nav('home') },
    { href: `/${locale}/about`, label: nav('about') },
    { href: `/${locale}/services`, label: nav('services') },
    { href: `/${locale}/results`, label: nav('results') },
    { href: `/${locale}/book`, label: nav('book') },
    { href: `/${locale}/consultation`, label: nav('consultation') },
  ];

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <div className={styles.logoIcon} style={{ background: 'transparent', padding: 0, boxShadow: 'none' }}>
                <Image src="/images/logo.jpg" alt="Logo" width={48} height={48} style={{ borderRadius: '50%', objectFit: 'cover' }} />
              </div>
              <div>
                <div className={styles.logoName}>{nav('brandName')}</div>
              </div>
            </div>
            <p className={styles.description}>{t('description')}</p>
            <div className={styles.socials}>
              <a href="https://www.instagram.com/dietoloqleylazulfuqarli/" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://www.facebook.com/diyetoloqleylazulfuqarli/?locale=az_AZ" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="https://www.youtube.com/@DiyetoloqLeyla" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="YouTube">
                <YoutubeIcon />
              </a>
              <a
                href="https://wa.me/994506684823"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.socialBtn} ${styles.socialWa}`}
                aria-label="WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block', flexShrink: 0 }}>
                  <path d="M12.012 2c-5.508 0-9.988 4.48-9.988 9.988 0 1.76.46 3.412 1.26 4.852l-1.284 4.692 4.812-1.26c1.408.768 3.012 1.208 4.712 1.208 5.508 0 9.988-4.48 9.988-9.988C22 6.48 17.52 2 12.012 2zm4.7 13.52c-.22.612-1.284 1.144-1.776 1.208-.456.06-1.04.092-1.644-.104-.376-.124-.852-.288-1.464-.544-2.612-1.092-4.304-3.752-4.436-3.928-.132-.176-1.072-1.428-1.072-2.724 0-1.296.672-1.932.912-2.196.24-.264.524-.332.7-.332s.352.004.504.012c.16.008.376-.06.588.452.22.532.748 1.824.812 1.956.064.132.108.288.02.464-.088.176-.132.288-.264.444-.132.156-.288-.276-.348-.396.468-.132.132-.272.276-.116.544.156.268.692 1.144 1.488 1.848.8.712 1.472 1.052 1.74 1.184.268.132.424.112.58-.068.156-.18.664-.772.844-1.036.18-.264.36-.22.608-.132.248.088 1.572.74 1.84 1.876.04.148.04.436-.14.736z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>{t('quickLinks')}</h4>
            <ul className={styles.linkList}>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>{t('contact')}</h4>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <Phone size={16} className={styles.contactIcon} />
                <a href="tel:+994506684823" className={styles.footerLink}>+994 50 668 48 23</a>
              </li>
              <li className={styles.contactItem}>
                <Mail size={16} className={styles.contactIcon} />
                <a href="mailto:diyetoloq.leyla@yandex.com" className={styles.footerLink}>diyetoloq.leyla@yandex.com</a>
              </li>
              <li className={styles.contactItem}>
                <MapPin size={16} className={styles.contactIcon} />
                <a href="https://maps.app.goo.gl/GqsFrSB7j7Pp4vfS7" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>{t('address')}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} {t('copyrightName')}. {t('rights')}
            <Link href={`/${locale}/privacy`} style={{ marginLeft: '1.5rem', color: 'inherit', textDecoration: 'none', opacity: 0.6 }} className="hover:opacity-100 transition-opacity">
              {locale === 'az' ? 'Məxfilik Siyasəti' : locale === 'ru' ? 'Конфиденциальность' : 'Privacy Policy'}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
