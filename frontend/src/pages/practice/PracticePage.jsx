import React, { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PracticeHeader from '../../components/practice/PracticeHeader';
import PracticeList from '../../components/practice/PracticeList';
import PracticeWorkspace from '../../components/practice/PracticeWorkspace';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import EmptyState from '../../components/common/EmptyState';
import { fetchPracticeProblems } from '../../data/practiceData';

export const PracticePage = () => {
  const [problems, setProblems] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [searchParams] = useSearchParams();

  const selectedId = searchParams.get('problem');

  useEffect(() => {
    let active = true;
    setStatus('loading');
    setError(null);

    fetchPracticeProblems()
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
  }, [reloadKey]);

  const retry = useCallback(() => setReloadKey((key) => key + 1), []);

  const selected = selectedId
    ? problems.find((problem) => problem.id === selectedId) || null
    : null;

  const meta =
    status === 'success'
      ? [
          { value: String(problems.length), label: problems.length === 1 ? 'problem' : 'problems' },
          { value: '3', label: 'languages' },
          { value: 'Free', label: 'to use' },
        ]
      : [];

  let content = null;
  if (status === 'loading') {
    content = <LoadingState tip="Loading practice problems..." />;
  } else if (status === 'error') {
    content = (
      <ErrorState
        title="Could not load practice problems"
        subTitle={error}
        onRetry={retry}
      />
    );
  } else if (problems.length === 0) {
    content = (
      <EmptyState
        description="No practice problems are available yet. Problems will appear here once they are published."
        actionText="Reload"
        onAction={retry}
      />
    );
  } else {
    content = (
      <>
        {selectedId && !selected && (
          <EmptyState description="That practice problem could not be found." />
        )}

        {selected && (
          <div className="space-y-5">
            <div className="section-head">
              <div className="space-y-3">
                <p className="eyebrow">Workspace</p>
                <h2 className="text-display-xl text-ink">Solving: {selected.title}</h2>
              </div>
              <Link to="/practice" className="eyebrow hover:text-ink">
                ← All problems
              </Link>
            </div>
            <PracticeWorkspace problem={selected} />
          </div>
        )}

        <div className="space-y-6">
          <div className="section-head">
            <div className="space-y-3">
              <p className="eyebrow">Problem set</p>
              <h2 className="text-display-xl text-ink">All practice problems</h2>
            </div>
            <p className="text-caption text-body">
              {problems.length} {problems.length === 1 ? 'problem' : 'problems'} available
            </p>
          </div>
          <PracticeList problems={problems} />
        </div>
      </>
    );
  }

  return (
    <div>
      <section className="band band-dark bleed -mt-6 md:-mt-10">
        <div className="container-app py-12 md:py-16">
          <PracticeHeader
            eyebrow="Coding practice"
            title="General coding practice"
            description="Sharpen your skills with short programming problems and solve them directly in the browser using the embedded OneCompiler editor."
            meta={meta}
          />
        </div>
      </section>

      <section className="band band-light bleed">
        <div className="container-app space-y-10 py-10 md:py-14">{content}</div>
      </section>
    </div>
  );
};

export default PracticePage;
