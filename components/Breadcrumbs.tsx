'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
  variant?: 'light' | 'dark' | 'transparent';
  showHomeIcon?: boolean;
}

// Route mapping dictionary for clean human readable titles
const ROUTE_NAME_MAP: Record<string, string> = {
  'bring-your-school': 'Bring Your School',
  'programs': 'Programs',
  'inter-junior-workspace': 'Inter Junior Workspace',
  'cash-on-campus': 'Cash on Campus',
  'the-magnet-school': 'The Magnet School',
  'student-business-school': 'Student Business School',
  'tabletop-games': 'Tabletop Games',
  'game-based-learning': 'Game-Based Learning',
  'game-recommendations': 'Game Recommendations',
  'simulations': 'Virtual Simulations',
  'virtual-training': 'Virtual Training',
  'events': 'Events',
  'catalyst-conference': 'Catalyst Conference',
  'game-tech-convention': 'Game Tech Convention',
  'prefect-conference': 'Prefect Leadership Conference',
  'thryb8': 'Thryb8 Community',
  'echelon': 'Echelon Project',
  'echelon-project-africa': 'Echelon Project Africa',
  'tools': 'AI Tools',
  'career-path': 'Career Path AI',
  'career-path-ai': 'Career Path AI',
  'project-generator': 'AI Project Generator',
  'university-match': 'University Match AI',
  'scholarship-finder': 'Scholarship Finder AI',
  'industry-explorer': 'AI Industry Explorer',
  'learnin-star': 'LearninStar AI',
  'portal': 'Student Portal',
  'playground': 'Interactive Playground',
  'admin': 'Admin Console',
  'luminaire': 'Luminaire Workspace',
  'login': 'Login',
  'register': 'Enrollment & Register',
  'detail': 'Details'
};

function formatSegmentName(segment: string): string {
  if (ROUTE_NAME_MAP[segment]) {
    return ROUTE_NAME_MAP[segment];
  }
  // Convert kebab-case or slug to title case
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function Breadcrumbs({
  items,
  className = '',
  variant = 'transparent',
  showHomeIcon = true
}: BreadcrumbsProps) {
  const pathname = usePathname();

  // If items are not passed, generate them from pathname
  let breadcrumbItems: BreadcrumbItem[] = [];

  if (items && items.length > 0) {
    breadcrumbItems = items;
  } else if (pathname && pathname !== '/') {
    const segments = pathname.split('/').filter(Boolean);
    breadcrumbItems = [
      { label: 'Home', href: '/' },
      ...segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join('/')}`;
        const isLast = index === segments.length - 1;
        return {
          label: formatSegmentName(segment),
          href: isLast ? undefined : href
        };
      })
    ];
  }

  // Do not render breadcrumbs on homepage if no custom items
  if (breadcrumbItems.length <= 1) {
    return null;
  }

  // Schema.org structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.label,
      'item': item.href ? (typeof window !== 'undefined' ? `${window.location.origin}${item.href}` : item.href) : undefined
    }))
  };

  const isDark = variant === 'dark';
  const isLight = variant === 'light';

  return (
    <nav
      aria-label="Breadcrumb"
      className={`inline-flex items-center text-xs font-medium ${
        isLight
          ? 'bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-neutral-200/80 shadow-xs'
          : isDark
          ? 'bg-neutral-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-neutral-300'
          : 'text-neutral-500'
      } ${className}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        {breadcrumbItems.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === breadcrumbItems.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5 sm:gap-2">
              {index > 0 && (
                <ChevronRight
                  size={12}
                  className={`shrink-0 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}
                  aria-hidden="true"
                />
              )}

              {isLast || !item.href ? (
                <span
                  className={`font-bold truncate max-w-[200px] sm:max-w-[320px] ${
                    isDark ? 'text-[#F16736]' : 'text-[#1e1e1e]'
                  }`}
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 transition-colors hover:text-[#F16736] ${
                    isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-500'
                  }`}
                >
                  {isFirst && showHomeIcon && <Home size={12} className="shrink-0 mb-0.5" />}
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
