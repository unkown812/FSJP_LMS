import React from 'react';
import { Link } from 'react-router-dom';

/** Route (with optional selected problem) for a practice problem. */
export const practiceProblemPath = (problem) => {
  const query = `?problem=${encodeURIComponent(problem.id)}`;
  return problem.courseId
    ? `/courses/${problem.courseId}/practice${query}`
    : `/practice${query}`;
};

/** Hero block shared by the general and course-specific practice pages. */
export const PracticeHeader = ({
  eyebrow,
  title,
  description,
  meta = [],
  backTo,
  backLabel = 'Back',
  actions,
}) => (
  <div className="max-w-3xl space-y-5">
    {backTo && (
      <Link to={backTo} className="eyebrow inline-flex items-center gap-2 hover:text-on-dark">
        ← {backLabel}
      </Link>
    )}
    <p className="eyebrow">{eyebrow}</p>
    <h1 className="text-display-xxl text-on-dark">{title}</h1>
    {description && <p className="lead max-w-2xl">{description}</p>}
    {meta.length > 0 && (
      <ul className="flex flex-wrap gap-x-8 gap-y-3 border-t border-hairline-dark pt-6">
        {meta.map((item) => (
          <li key={item.label} className="text-caption text-body">
            <strong className="text-caption-strong text-on-dark">{item.value}</strong>{' '}
            {item.label}
          </li>
        ))}
      </ul>
    )}
    {actions && <div className="flex flex-wrap items-center gap-3 pt-1">{actions}</div>}
  </div>
);

export default PracticeHeader;
