import React from 'react';
import PracticeCard from './PracticeCard';

/** Responsive grid of practice problem cards. */
export const PracticeList = ({ problems = [], className = '' }) => (
  <ul className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
    {problems.map((problem) => (
      <li key={problem.id} className="min-w-0">
        <PracticeCard problem={problem} />
      </li>
    ))}
  </ul>
);

export default PracticeList;
