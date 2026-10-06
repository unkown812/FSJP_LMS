import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import PracticeHeader from '../../components/practice/PracticeHeader';
import PracticeWorkspace from '../../components/practice/PracticeWorkspace';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import EmptyState from '../../components/common/EmptyState';
import { courseApi } from '../../api';
import { fetchPracticeProblems } from '../../data/practiceData';

export const CoursePracticePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [problems, setProblems] = useState([]);
  const [course, setCourse] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const selectedId = searchParams.get('problem');

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

  // Best-effort course title for the header — the practice problems themselves
  // come from the isolated local data source, so a failing course lookup must
  // not block the workspace.
  useEffect(() => {
    let active = true;
    setCourse(null);

    courseApi
      .getCourseById(courseId)
      .then((data) => {
        if (active) setCourse(data);
      })
      .catch(() => {
        if (active) setCourse(null);
      });

    return () => {
      active = false;
    };
  }, [courseId]);

  const retry = useCallback(() => setReloadKey((key) => key + 1), []);

  const selectProblem = useCallback(
    (problemId) => {
      setSearchParams(
        problemId ? { problem: problemId } : {},
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const selected =
    (selectedId && problems.find((problem) => problem.id === selectedId)) ||
    (!selectedId && problems[0]) ||
    null;

  const meta =
    status === 'success'
      ? [
          {
            value: String(problems.length),
            label: problems.length === 1 ? 'problem' : 'problems',
          },
          { value: course?.categoryName || 'Course', label: 'practice set' },
        ]
      : [];

  let content = null;
  if (status === 'loading') {
    content = <LoadingState tip="Loading course practice..." />;
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
        description="No practice problems are available for this course yet."
        actionText="Browse all practice problems"
        onAction={() => navigate('/practice')}
      />
    );
  } else {
    content = (
      <div className="space-y-6">
        {problems.length > 1 && (
          <nav aria-label="Practice problems">
            <p className="eyebrow mb-3">Choose a problem</p>
            <div className="toggle-group">
              {problems.map((problem) => {
                const isSelected = selected?.id === problem.id;
                return (
                  <button
                    key={problem.id}
                    type="button"
                    className={`toggle-pill ${isSelected ? 'border-ink text-ink' : ''}`}
                    aria-current={isSelected ? 'true' : undefined}
                    onClick={() => selectProblem(problem.id)}
                  >
                    {problem.title}
                  </button>
                );
              })}
            </div>
          </nav>
        )}

        <PracticeWorkspace problem={selected} editorHeight={520} />
      </div>
    );
  }

  return (
    <div>
      <section className="band band-dark bleed -mt-6 md:-mt-10">
        <div className="container-app py-12 md:py-16">
          <PracticeHeader
            backTo={`/courses/${courseId}`}
            backLabel="Course details"
            eyebrow="Course practice"
            title="Course practice"
            description={
              course?.title
                ? `Hands-on coding problems for ${course.title}. Solve each task in the embedded OneCompiler editor.`
                : 'Hands-on coding problems for this course. Solve each task in the embedded OneCompiler editor.'
            }
            meta={meta}
          />
        </div>
      </section>

      <section className="band band-light bleed">
        <div className="container-app space-y-8 py-10 md:py-14">
          <p className="text-caption text-body">
            Looking for something else?{' '}
            <Link to="/practice" className="text-ink underline underline-offset-4">
              Browse all coding practice problems
            </Link>
            .
          </p>
          {content}
        </div>
      </section>
    </div>
  );
};

export default CoursePracticePage;
