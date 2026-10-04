'use client';

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
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

// Alternating coordinates so the pure transparent logo glides opposite each section's editorial text
const defaultBrandPositions = [
  { top: '50%', left: '76%', scale: 1.35, opacity: 0.95 },  // Section 0 (Hero, align left) -> Logo Right
  { top: '50%', left: '24%', scale: 1.25, opacity: 0.95 },  // Section 1 (Strong's, align right) -> Logo Left
  { top: '50%', left: '76%', scale: 1.3, opacity: 0.95 },   // Section 2 (32 Canons, align left) -> Logo Right
  { top: '50%', left: '24%', scale: 1.25, opacity: 0.95 },  // Section 3 (Devotionals, align right) -> Logo Left
  { top: '50%', left: '76%', scale: 1.3, opacity: 0.95 },   // Section 4 (Security, align left) -> Logo Right
  { top: '50%', left: '50%', scale: 1.75, opacity: 0.22 },  // Section 5 (Community, align center) -> Center Backdrop
];

const parsePercent = (str: string): number => parseFloat(str.replace('%', ''));

/**
 * Pure Free-Floating Brand Mark (No card enclosure, zero border-radius)
 * Renders exégeomai's golden transparent brand emblem floating with natural ease.
 */
function BrandMark() {
  return (
    <figure className="brandmark-focal-wrap" aria-label="exégeomai Sacred Brand Emblem">
      <Image
        src="/assets/logo-transparent.png"
        alt="exégeomai Sacred Brand Emblem"
        width={380}
        height={380}
        priority
        className="brandmark-emblem-image"
      />
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

  // Jump to section with reliable coordinate math accounting for fixed top header (64px)
  const scrollToSection = useCallback((index: number) => {
    const el = sectionRefs.current[index];
    if (el) {
      const rect = el.getBoundingClientRect();
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      const targetTop = rect.top + currentScrollY - 75;
      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth',
      });
      setActiveSection(index);
    }
  }, []);

  // Update position on scroll
  const updateScrollPosition = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
    const scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );
    const docHeight = scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;

    setScrollProgress(progress);

    const viewportCenter = window.innerHeight / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    sectionRefs.current.forEach((ref, index) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      }
    });

    const safeIndex = Math.min(closestIndex, calculatedPositions.length - 1);
    const currentPos = calculatedPositions[safeIndex];
    if (currentPos) {
      const transform = `translate3d(${currentPos.left}vw, ${currentPos.top}vh, 0) translate3d(-50%, -50%, 0) scale3d(${currentPos.scale}, ${currentPos.scale}, 1)`;
      setBrandTransform(transform);
      setBrandOpacity(currentPos.opacity);
      setActiveSection(safeIndex);
    }
  }, [calculatedPositions]);

  // Scroll and resize listener with capture
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

    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    document.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial position trigger
    updateScrollPosition();
    const timeout = setTimeout(updateScrollPosition, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      document.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleScroll);
      clearTimeout(timeout);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [updateScrollPosition]);

  // Native IntersectionObserver for 100% reliable active section detection
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              const currentPos = calculatedPositions[index];
              if (currentPos) {
                const transform = `translate3d(${currentPos.left}vw, ${currentPos.top}vh, 0) translate3d(-50%, -50%, 0) scale3d(${currentPos.scale}, ${currentPos.scale}, 1)`;
                setBrandTransform(transform);
                setBrandOpacity(currentPos.opacity);
                setActiveSection(index);
              }
            }
          }
        });
      },
      {
        rootMargin: '-25% 0px -25% 0px',
        threshold: 0,
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [calculatedPositions]);

  // Initial position fallback
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

      {/* ── Floating Side Navigation with Generous Hit Areas & Clickable Labels ── */}
      <nav className="scroll-side-nav" aria-label="Section quick navigation">
        <ol className="scroll-dots-column" role="list">
          {sections.map((section, index) => {
            const isCurrent = activeSection === index;
            return (
              <li
                key={section.id}
                className="scroll-dot-wrapper"
              >
                {/* Clickable section badge label */}
                <button
                  type="button"
                  onClick={() => scrollToSection(index)}
                  className={cn(
                    'scroll-nav-label',
                    isCurrent ? 'scroll-label-active' : 'scroll-label-hidden'
                  )}
                  aria-label={`Navigate to ${section.badge || section.title}`}
                >
                  <span className="scroll-label-dot" aria-hidden="true" />
                  <span className="scroll-label-text">
                    {section.badge || `Section ${index + 1}`}
                  </span>
                </button>

                {/* Generous 36x36px clickable target button */}
                <button
                  type="button"
                  onClick={() => scrollToSection(index)}
                  className={cn(
                    'scroll-dot-button',
                    isCurrent && 'scroll-dot-active'
                  )}
                  aria-label={`Jump to ${section.badge || section.title}`}
                  title={section.badge || section.title}
                >
                  <span className="scroll-dot-circle" />
                </button>
              </li>
            );
          })}
        </ol>
        <span className="scroll-nav-line" aria-hidden="true" />
      </nav>

      {/* ── Pure Free-Floating Brand Emblem (No Border Radius, No Card Box) ── */}
      <aside
        className="scroll-focal-brandmark"
        style={{
          transform: brandTransform,
          opacity: brandOpacity,
        }}
        aria-hidden="true"
      >
        <BrandMark />
      </aside>

      {/* ── Dynamic Sections with Rich Scholarly Content ── */}
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

              {/* Custom Extra Showcase Slot */}
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
