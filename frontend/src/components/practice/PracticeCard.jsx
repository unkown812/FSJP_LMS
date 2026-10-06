import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Badge } from '../ui';
import { difficultyVariant } from './constants';
import { practiceProblemPath } from './PracticeHeader';
import { languageLabel } from './OneCompilerEditor';

/** A single practice problem summary card. */
export const PracticeCard = ({ problem }) => (
  <article className="card card-interactive flex h-full flex-col">
    <div className="card-pad flex flex-1 flex-col">
      <p className="eyebrow">{problem.courseTitle || 'General practice'}</p>
      <h3 className="mt-3 text-display-md text-ink">{problem.title}</h3>
      <p className="mt-2 text-caption text-body">{problem.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge variant={difficultyVariant(problem.difficulty)}>{problem.difficulty}</Badge>
        <Badge variant="neutral">{languageLabel(problem.language)}</Badge>
      </div>

      <div className="mt-auto pt-6">
        <Link to={practiceProblemPath(problem)}>
          <Button type="primary" icon={<ArrowRightOutlined />}>
            Open problem
          </Button>
        </Link>
      </div>
    </div>
  </article>
);

export default PracticeCard;
