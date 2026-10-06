import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowRightOutlined, CodeOutlined } from '@ant-design/icons';
import { Badge } from '../ui';
import LoadingState from '../common/LoadingState';
import ErrorState from '../common/ErrorState';
import EmptyState from '../common/EmptyState';
import { difficultyVariant } from './constants';
import { languageLabel } from './OneCompilerEditor';
import { fetchPracticeProblems } from '../../data/practiceData';

/** Practice tab content on the course details page. */
export const CoursePracticeTab = ({ courseId }) => {
  const [problems, setProblems] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    setStatus('loading');
    setError(null);

    fetchPracticeProblems({ courseId })
      .then((data) => {
        if (!active) return;
        setProblems(data);
        setStatus('success');
      })
      .catch((err) => {
        if (!active) return;
        setError(err?.message || 'Failed to load practice problems.');
        setStatus('error');
      });

    return () => {
      active = false;
    };
  }, [courseId, reloadKey]);

  const retry = () => setReloadKey((key) => key + 1);

  return (
    <div className="space-y-6">
      <p className="text-body-md text-ink">
        Practice writing code for this course in the embedded OneCompiler
        editor. Each problem ships with a statement, examples and starter code.
      </p>

      {status === 'loading' && <LoadingState tip="Loading practice problems..." />}
      {status === 'error' && (
        <ErrorState
          title="Could not load practice problems"
          subTitle={error}
          onRetry={retry}
        />
      )}
      {status === 'success' && problems.length === 0 && (
        <EmptyState description="No practice problems are available for this course yet." />
      )}
      {status === 'success' && problems.length > 0 && (
        <ul className="border-t border-hairline">
          {problems.map((problem) => (
            <li
              key={problem.id}
              className="flex flex-wrap items-center gap-4 border-b border-hairline py-5"
            >
              <div className="min-w-0 flex-1">
                <span className="text-body-md-strong text-ink">{problem.title}</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant={difficultyVariant(problem.difficulty)}>
                    {problem.difficulty}
                  </Badge>
                  <Badge variant="neutral">{languageLabel(problem.language)}</Badge>
                </div>
              </div>
              <div className="shrink-0">
                <Link
                  to={`/courses/${courseId}/practice?problem=${encodeURIComponent(problem.id)}`}
                >
                  <Button type="primary" size="small" icon={<ArrowRightOutlined />}>
                    Open
                  </Button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div>
        <Link to={`/courses/${courseId}/practice`}>
          <Button type="primary" icon={<CodeOutlined />}>
            Open practice workspace
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CoursePracticeTab;
