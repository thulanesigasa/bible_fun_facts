'use client';

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface ScrollSection {
  id: string;
  badge?: string;
  title: string;
  subtitle?: string;
  description: string;
  align?: 'left' | 'center' | 'right';
  features?: { title: string; description: string; tag?: string }[];
  actions?: { label: string; variant: 'primary' | 'secondary'; href?: string; onClick?: () => void }[];
  extraNode?: React.ReactNode;
}

export interface ScrollBrandMarkProps {
  sections: ScrollSection[];
  brandPositions?: {
    top: string;
    left: string;
    scale: number;
    opacity?: number;
  }[];
  className?: string;
}

const defaultBrandPositions = [
  { top: '50%', left: '74%', scale: 1.25, opacity: 0.95 },  // Section 0: Hero — Right side
  { top: '48%', left: '26%', scale: 1.15, opacity: 0.9 },   // Section 1: Strong's — Left side
  { top: '50%', left: '74%', scale: 1.2, opacity: 0.92 },   // Section 2: Translations — Right side
  { top: '52%', left: '26%', scale: 1.15, opacity: 0.9 },   // Section 3: Devotionals — Left side
  { top: '48%', left: '74%', scale: 1.2, opacity: 0.92 },   // Section 4: Security — Right side
  { top: '50%', left: '50%', scale: 1.55, opacity: 0.22 },  // Section 5: Community/Download — Center backdrop
];

const parsePercent = (str: string): number => parseFloat(str.replace('%', ''));

/**
 * Interactive Focal Brand Mark (Replaces the generic wireframe globe)
 * Built with semantic HTML5 <figure>, <picture>, and <figcaption>.
 */
function BrandMark({ activeSection }: { activeSection: number }) {
  const sectionLabels = [
    'ἐξηγέομαι · Strong\'s G1834',
    'Concordance · 14,298 Lemmas',
    '32 Offline Canons · Zero Quotas',
    '365 Devotionals · Triple Lens',
    'Hardware Keystore · AES-256',
    'Kingdom Community · Native GPS',
  ];

  return (
    <figure className="brandmark-focal-wrap" aria-label="exégeomai Interactive Brand Mark">
      {/* Outer subtle orbital ring with 12 cardinal theological ticks */}
      <span className="brandmark-orbit-ring" aria-hidden="true" />
      
      {/* Secondary concentric aura ring */}
      <span className="brandmark-aura-ring" aria-hidden="true" />

      {/* Surface enclosure housing the transparent brand mark */}
      <picture className="brandmark-core-enclosure">
        <Image
          src="/assets/logo-transparent.png"
          alt="exégeomai Sacred Brand Mark"
          width={280}
          height={280}
          priority
          className="brandmark-emblem-image"
        />
      </picture>

      {/* Floating active theological badge */}
      <figcaption className="brandmark-floating-tag">
        <span className="brandmark-tag-dot" aria-hidden="true" />
        <span className="brandmark-tag-label">{sectionLabels[activeSection] || sectionLabels[0]}</span>
      </figcaption>
    </figure>
  );
}

export function ScrollBrandMark({
  sections,
  brandPositions = defaultBrandPositions,
  className,
}: ScrollBrandMarkProps) {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [brandTransform, setBrandTransform] = useState('');
  const [brandOpacity, setBrandOpacity] = useState(0.95);
  const containerRef = useRef<HTMLElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const animationFrameId = useRef<number | null>(null);

  // Pre-calculate positions
  const calculatedPositions = useMemo(() => {
    return brandPositions.map(pos => ({
      top: parsePercent(pos.top),
      left: parsePercent(pos.left),
      scale: pos.scale,
      opacity: pos.opacity ?? 0.95,
    }));
  }, [brandPositions]);

  // Update position on scroll
  const updateScrollPosition = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;

    setScrollProgress(progress);

    const viewportCenter = window.innerHeight / 2;
    let newActiveSection = 0;
    let minDistance = Infinity;

    sectionRefs.current.forEach((ref, index) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);

        if (distance < minDistance) {
          minDistance = distance;
          newActiveSection = index;
        }
      }
    });

    const safeIndex = Math.min(newActiveSection, calculatedPositions.length - 1);
    const currentPos = calculatedPositions[safeIndex];
    const transform = `translate3d(${currentPos.left}vw, ${currentPos.top}vh, 0) translate3d(-50%, -50%, 0) scale3d(${currentPos.scale}, ${currentPos.scale}, 1)`;

    setBrandTransform(transform);
    setBrandOpacity(currentPos.opacity);
    setActiveSection(newActiveSection);
  }, [calculatedPositions]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        animationFrameId.current = requestAnimationFrame(() => {
          updateScrollPosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    updateScrollPosition();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [updateScrollPosition]);

  // Set initial position
  useEffect(() => {
    if (calculatedPositions.length > 0) {
      const initialPos = calculatedPositions[0];
      const initialTransform = `translate3d(${initialPos.left}vw, ${initialPos.top}vh, 0) translate3d(-50%, -50%, 0) scale3d(${initialPos.scale}, ${initialPos.scale}, 1)`;
      setBrandTransform(initialTransform);
      setBrandOpacity(initialPos.opacity);
    }
  }, [calculatedPositions]);

  return (
    <main
      ref={containerRef}
      className={cn('scroll-portal-root', className)}
    >
      {/* ── Top Progress Bar with Semantic Nav & Role ── */}
      <nav className="scroll-progress-track" aria-label="Reading depth progress">
        <span
          role="progressbar"
          aria-valuenow={Math.round(scrollProgress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          className="scroll-progress-fill"
          style={{
            transform: `scaleX(${scrollProgress})`,
          }}
        />
      </nav>

      {/* ── Floating Side Navigation with Semantic Nav & List ── */}
      <nav className="scroll-side-nav" aria-label="Section quick navigation">
        <ol className="scroll-dots-column" role="list">
          {sections.map((section, index) => (
            <li key={section.id} className="scroll-dot-wrapper">
              {/* Auto-revealing section label on active state or hover */}
              <span
                className={cn(
                  'scroll-nav-label',
                  activeSection === index ? 'scroll-label-active' : 'scroll-label-hidden'
                )}
              >
                <span className="scroll-label-dot" aria-hidden="true" />
                <span className="scroll-label-text">
                  {section.badge || `Section ${index + 1}`}
                </span>
              </span>

              <button
                type="button"
                onClick={() => {
                  sectionRefs.current[index]?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                  });
                }}
                className={cn(
                  'scroll-dot-button',
                  activeSection === index && 'scroll-dot-active'
                )}
                aria-label={`Jump to ${section.badge || section.title}`}
                title={section.badge || section.title}
              />
            </li>
          ))}
        </ol>
        <span className="scroll-nav-line" aria-hidden="true" />
      </nav>

      {/* ── Ultra-Smooth Interactive Focal Brand Mark in Semantic Aside ── */}
      <aside
        className="scroll-focal-brandmark"
        style={{
          transform: brandTransform,
          opacity: brandOpacity,
        }}
        aria-hidden="true"
      >
        <BrandMark activeSection={activeSection} />
      </aside>

      {/* ── Dynamic Sections with Rich Scholarly & Architectural Content ── */}
      <article className="scroll-sections-container">
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            ref={(el) => {
              sectionRefs.current[index] = el;
            }}
            className={cn(
              'scroll-section',
              section.align === 'center' && 'section-align-center',
              section.align === 'right' && 'section-align-right',
              section.align !== 'center' && section.align !== 'right' && 'section-align-left'
            )}
          >
            <article className="scroll-section-inner">
              {/* Badge */}
              {section.badge && (
                <span className="section-badge-pill">
                  <span className="section-badge-dot" aria-hidden="true" />
                  <span>{section.badge}</span>
                </span>
              )}

              {/* Title & Subtitle */}
              <header className="section-heading-wrap">
                <h2 className="section-heading">
                  {section.subtitle ? (
                    <span className="section-heading-split">
                      <span className="heading-main">{section.title}</span>
                      <span className="heading-sub">{section.subtitle}</span>
                    </span>
                  ) : (
                    <span className="heading-main">{section.title}</span>
                  )}
                </h2>
              </header>

              {/* Lead Description */}
              <p className="section-description">{section.description}</p>

              {/* Interactive Experience hints for Section 1 */}
              {index === 0 && (
                <aside className="hero-scroll-hints" aria-label="Exploration tips">
                  <span className="scroll-hint-item">
                    <span className="hint-pulse-dot" aria-hidden="true" />
                    <span>Dynamic Focal Brand Motion</span>
                  </span>
                  <span className="scroll-hint-item">
                    <span className="hint-pulse-dot delay" aria-hidden="true" />
                    <span>Scroll to Explore All 6 Pillars</span>
                  </span>
                </aside>
              )}

              {/* Features List */}
              {section.features && section.features.length > 0 && (
                <ul className="section-features-grid" role="list">
                  {section.features.map((feature) => (
                    <li key={feature.title} className="feature-card">
                      <header className="feature-card-header">
                        <span className="feature-accent-marker" aria-hidden="true" />
                        <h3 className="feature-title">{feature.title}</h3>
                        {feature.tag && <span className="feature-tag">{feature.tag}</span>}
                      </header>
                      <p className="feature-description">{feature.description}</p>
                    </li>
                  ))}
                </ul>
              )}

              {/* Optional Custom Extra Node (e.g. Strong's preview card, translations pill matrix) */}
              {section.extraNode && (
                <aside className="section-extra-wrap" aria-label={`${section.title} Details`}>
                  {section.extraNode}
                </aside>
              )}

              {/* Action Buttons Nav */}
              {section.actions && section.actions.length > 0 && (
                <nav className="section-actions-row" aria-label="Section primary actions">
                  {section.actions.map((action) => (
                    action.href ? (
                      <a
                        key={action.label}
                        href={action.href}
                        onClick={action.onClick}
                        className={cn(
                          'btn-portal-action',
                          action.variant === 'primary' ? 'btn-portal-primary' : 'btn-portal-secondary'
                        )}
                      >
                        <span>{action.label}</span>
                      </a>
                    ) : (
                      <button
                        key={action.label}
                        type="button"
                        onClick={action.onClick}
                        className={cn(
                          'btn-portal-action',
                          action.variant === 'primary' ? 'btn-portal-primary' : 'btn-portal-secondary'
                        )}
                      >
                        <span>{action.label}</span>
                      </button>
                    )
                  ))}
                </nav>
              )}
            </article>
          </section>
        ))}
      </article>
    </main>
  );
}
