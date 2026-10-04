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
 * Features exégeomai's authentic transparent brand mark enclosed in
 * precision sacred geometric rings with subtle dynamic rotation.
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
    <div className="brandmark-focal-wrap">
      {/* Outer subtle orbital ring with 12 cardinal theological ticks */}
      <div className="brandmark-orbit-ring" />
      
      {/* Secondary concentric aura ring */}
      <div className="brandmark-aura-ring" />

      {/* Surface enclosure housing the transparent brand mark */}
      <div className="brandmark-core-enclosure">
        <Image
          src="/assets/logo-transparent.png"
          alt="exégeomai Sacred Brand Mark"
          width={280}
          height={280}
          priority
          className="brandmark-emblem-image"
        />
      </div>

      {/* Floating active theological badge */}
      <div className="brandmark-floating-tag">
        <span className="brandmark-tag-dot" />
        <span className="brandmark-tag-label">{sectionLabels[activeSection] || sectionLabels[0]}</span>
      </div>
    </div>
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
  const containerRef = useRef<HTMLDivElement>(null);
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
    <div
      ref={containerRef}
      className={cn('scroll-portal-root', className)}
    >
      {/* ── Top Progress Bar ── */}
      <div className="scroll-progress-track">
        <div
          className="scroll-progress-fill"
          style={{
            transform: `scaleX(${scrollProgress})`,
          }}
        />
      </div>

      {/* ── Floating Side Navigation Dots with Responsive Labels ── */}
      <nav className="scroll-side-nav" aria-label="Section quick navigation">
        <div className="scroll-dots-column">
          {sections.map((section, index) => (
            <div key={section.id} className="scroll-dot-wrapper">
              {/* Auto-revealing section label on active state or hover */}
              <div
                className={cn(
                  'scroll-nav-label',
                  activeSection === index ? 'scroll-label-active' : 'scroll-label-hidden'
                )}
              >
                <span className="scroll-label-dot" />
                <span className="scroll-label-text">
                  {section.badge || `Section ${index + 1}`}
                </span>
              </div>

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
            </div>
          ))}
        </div>
        <div className="scroll-nav-line" aria-hidden="true" />
      </nav>

      {/* ── Ultra-Smooth Interactive Focal Brand Mark (Replacing Globe) ── */}
      <div
        className="scroll-focal-brandmark"
        style={{
          transform: brandTransform,
          opacity: brandOpacity,
        }}
        aria-hidden="true"
      >
        <BrandMark activeSection={activeSection} />
      </div>

      {/* ── Dynamic Sections with Rich Scholarly & Architectural Content ── */}
      <div className="scroll-sections-container">
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
            <div className="scroll-section-inner">
              {/* Badge */}
              {section.badge && (
                <div className="section-badge-pill">
                  <span className="section-badge-dot" />
                  <span>{section.badge}</span>
                </div>
              )}

              {/* Title & Subtitle */}
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

              {/* Lead Description */}
              <p className="section-description">{section.description}</p>

              {/* Interactive Experience hints for Section 1 */}
              {index === 0 && (
                <div className="hero-scroll-hints">
                  <div className="scroll-hint-item">
                    <span className="hint-pulse-dot" />
                    <span>Dynamic Focal Brand Motion</span>
                  </div>
                  <div className="scroll-hint-item">
                    <span className="hint-pulse-dot delay" />
                    <span>Scroll to Explore All 6 Pillars</span>
                  </div>
                </div>
              )}

              {/* Features Grid */}
              {section.features && section.features.length > 0 && (
                <div className="section-features-grid">
                  {section.features.map((feature) => (
                    <div key={feature.title} className="feature-card">
                      <div className="feature-card-header">
                        <span className="feature-accent-marker" />
                        <h3 className="feature-title">{feature.title}</h3>
                        {feature.tag && <span className="feature-tag">{feature.tag}</span>}
                      </div>
                      <p className="feature-description">{feature.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Optional Custom Extra Node (e.g. Strong's preview card, translations pill matrix) */}
              {section.extraNode && (
                <div className="section-extra-wrap">
                  {section.extraNode}
                </div>
              )}

              {/* Action Buttons */}
              {section.actions && section.actions.length > 0 && (
                <div className="section-actions-row">
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
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
