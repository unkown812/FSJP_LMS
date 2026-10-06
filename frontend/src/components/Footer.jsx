import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROLES } from '../utils/constants';
import { WordmarkBanner } from './ui';

const COLUMNS = [
  {
    heading: 'Learn',
    links: [
      { label: 'Explore courses', to: '/courses' },
      { label: 'Learner dashboard', to: '/learner' },
      { label: 'Certificates', to: '/learner/certificates' },
    ],
  },
  {
    heading: 'Profile',
    links: [
      { label: 'My profile', to: '/profile' },
      { label: 'My enrollments', to: '/learner/enrollments' },
      { label: 'My progress', to: '/learner/progress' },
    ],
  },
  {
    heading: 'Account',
    links: [
      { label: 'My profile', to: '/profile' },
      { label: 'Settings', to: '/settings' },
      { label: 'Sign in', to: '/login' },
      { label: 'Create account', to: '/register' },
    ],
  },
  {
    heading: 'Practice',
    links: [{ label: 'Coding practice', to: '/practice' }],
  },
];

export const Footer = ({ showSidebar = true }) => {
  const { isAuthenticated, role, logout } = useAuth();

  const accountLinks = isAuthenticated
    ? [{ label: 'My profile', to: '/profile' }]
    : [
        { label: 'Sign in', to: '/login' },
        { label: 'Create account', to: '/register' },
      ];

  return (
    <footer className="border-t border-hairline bg-canvas no-print">
      <div className="container-app py-14 lg:py-section">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-5 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5" aria-label="LMS Portal home">
              <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary text-on-primary text-sm">
                ◆
              </span>
              <span className="text-body-md-strong tracking-[-0.02em] text-ink">Edvanta</span>
            </Link>
            <p className="mt-4 max-w-xs text-caption text-body">
              Structured courses, rigorous assessment and verified certificates for learners,
              instructors and administrators.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <p className="eyebrow">{col.heading}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-body-md text-body transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        
      </div>

      {/* Giant wordmark sign-off — the closing slide */}
      <div className="border-t border-hairline">
        <WordmarkBanner />
        <p className="text-caption text-body md:flex-row md:items-center md:justify-between">© 2026 Edvanta</p>
      </div>
    </footer>
  );
};

export default Footer;
