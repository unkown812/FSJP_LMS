import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tabs, Avatar, Button } from 'antd';
import {
  UserOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  MessageOutlined,
  StarOutlined,
  CodeOutlined,
} from '@ant-design/icons';
import EnrollmentButton from './EnrollmentButton';
import ProgressBar from './ProgressBar';
import DiscussionList from './DiscussionList';
import FeedbackForm from './FeedbackForm';
import CoursePracticeTab from './practice/CoursePracticeTab';
import LoadingState from './common/LoadingState';
import ErrorState from './common/ErrorState';
import EmptyState from './common/EmptyState';
import { Badge } from './ui';
import { courseApi, lessonApi, progressApi, enrollmentApi, quizApi } from '../api';
import { useAuth } from '../hooks/useAuth';
import { formatDuration } from '../utils/formatters';

const pad = (n) => String(n).padStart(2, '0');

export const CourseDetails = ({ courseId: propCourseId }) => {
  const { id: routeCourseId } = useParams();
  const courseId = propCourseId || routeCourseId;
  const { user } = useAuth();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [progress, setProgress] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourseData = useCallback(async () => {
    if (!courseId) return;
    try {
      setLoading(true);
      setError(null);

      const courseData = await courseApi.getCourseById(courseId);
      setCourse(courseData);

      try {
        const lessonData = await lessonApi.getLessonsByCourse(courseId);
        setLessons(lessonData || []);
      } catch (e) {
        setLessons([]);
      }

      try {
        const quizData = await quizApi.getQuizzesByCourse(courseId);
        setQuizzes(quizData || []);
      } catch (e) {
        setQuizzes([]);
      }

      if (user?.id) {
        try {
          const userEnrollments = await enrollmentApi.getUserEnrollments(user.id);
          const enrolled = (userEnrollments || []).some(
            (e) => String(e.courseId) === String(courseId)
          );
          setIsEnrolled(enrolled);

          if (enrolled) {
            const progressData = await progressApi.getCourseProgress(courseId);
            setProgress(progressData);
          }
        } catch (e) {
          // Non-blocking
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to load course details');
    } finally {
      setLoading(false);
    }
  }, [courseId, user]);

  useEffect(() => {
    fetchCourseData();
  }, [fetchCourseData]);

  if (loading) {
    return <LoadingState tip="Loading course information..." fullPage />;
  }

  if (error || !course) {
    return (
      <ErrorState
        title="Could not load course"
        subTitle={error || 'The requested course does not exist.'}
        onRetry={fetchCourseData}
      />
    );
  }

  const defaultThumbnail =
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80';

  const syllabusTab = lessons.length === 0 ? (
    <EmptyState description="No lessons added yet for this course." />
  ) : (
    <ul className="border-t border-hairline">
      {lessons.map((item, index) => (
        <li key={item.id} className="flex flex-wrap items-start gap-4 border-b border-hairline py-5">
          <span className="eyebrow w-8 shrink-0 pt-1">{pad(index + 1)}</span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-body-md-strong text-ink">{item.title}</span>
              {item.completed && <Badge variant="success">Completed</Badge>}
            </div>
            <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-caption text-body">
              <span>{formatDuration(item.durationMinutes)}</span>
              {item.description && <span>{item.description}</span>}
            </div>
          </div>

          <div className="shrink-0">
            {isEnrolled ? (
              <Link to={`/courses/${course.id}/learn?lesson=${item.id}`}>
                <Button
                  type={item.completed ? 'default' : 'primary'}
                  size="small"
                  icon={item.completed ? <CheckCircleOutlined /> : <PlayCircleOutlined />}
                >
                  {item.completed ? 'Review' : 'Play'}
                </Button>
              </Link>
            ) : (
              <span className="text-caption text-body">Enroll to access</span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );

  const assessmentsTab = quizzes.length === 0 ? (
    <EmptyState description="No assessments attached to this course." />
  ) : (
    <div className="grid gap-5 md:grid-cols-2">
      {quizzes.map((quiz) => (
        <article key={quiz.id} className="card card-interactive">
          <div className="card-pad">
            <p className="eyebrow">Assessment</p>
            <h4 className="mt-3 text-display-md text-ink">{quiz.title}</h4>
            <p className="mt-2 text-caption text-body">
              {quiz.description || 'Test your knowledge on course topics'}
            </p>

            <dl className="mt-5">
              <div className="meta-row">
                <dt>Passing score</dt>
                <dd>{quiz.passingScore}%</dd>
              </div>
              {quiz.timeLimitMinutes ? (
                <div className="meta-row">
                  <dt>Time limit</dt>
                  <dd>{quiz.timeLimitMinutes} minutes</dd>
                </div>
              ) : null}
              <div className="meta-row">
                <dt>Questions</dt>
                <dd>{quiz.totalQuestions || (quiz.questions ? quiz.questions.length : 0)}</dd>
              </div>
            </dl>

            <div className="mt-5">
              {isEnrolled ? (
                <Link to={`/quizzes/${quiz.id}`}>
                  <Button type="primary">Take Assessment</Button>
                </Link>
              ) : (
                <span className="text-caption text-body">Enroll to participate</span>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );

  const tabItems = [
    {
      key: 'syllabus',
      label: <span>Syllabus ({lessons.length} lessons)</span>,
      children: syllabusTab,
    },
    {
      key: 'quizzes',
      label: <span>Assessments ({quizzes.length})</span>,
      children: assessmentsTab,
    },
    {
      key: 'practice',
      label: (
        <span>
          <CodeOutlined /> Practice
        </span>
      ),
      children: <CoursePracticeTab courseId={course.id} />,
    },
    {
      key: 'discussions',
      label: (
        <span>
          <MessageOutlined /> Discussions
        </span>
      ),
      children: <DiscussionList courseId={course.id} />,
    },
    {
      key: 'reviews',
      label: (
        <span>
          <StarOutlined /> Reviews &amp; Feedback
        </span>
      ),
      children: <FeedbackForm courseId={course.id} isEnrolled={isEnrolled} />,
    },
  ];

  return (
    <div>
      {/* ============================================ Course hero (dark band) */}
      <section className="band band-dark bleed -mt-6 md:-mt-10">
        <div className="container-app py-12 md:py-16">
          <Link
            to="/courses"
            className="eyebrow inline-flex items-center gap-2 hover:text-on-dark"
          >
            ← All courses
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_0.6fr]">
            <div className="max-w-3xl space-y-5">
              <div className="flex flex-wrap gap-2">
                {course.categoryName && <Badge variant="mint">{course.categoryName}</Badge>}
                {course.status && <Badge variant="dark">{course.status}</Badge>}
              </div>

              <h1 className="text-display-xxl text-on-dark">{course.title}</h1>

              <p className="lead max-w-2xl">{course.description}</p>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-hairline-dark pt-6">
                <div className="flex items-center gap-3">
                  <Avatar size={36} icon={<UserOutlined />} className="bg-surface-dark text-on-dark" />
                  <span className="text-caption text-body">
                    Instructor{' '}
                    <strong className="text-caption-strong text-on-dark">
                      {course.instructorName || 'Lead Faculty'}
                    </strong>
                  </span>
                </div>
                <div className="text-caption text-body">
                  <strong className="text-caption-strong text-on-dark">
                    {course.totalLessons || lessons.length}
                  </strong>{' '}
                  Lessons
                </div>
                <div className="text-caption text-body">
                  <strong className="text-caption-strong text-on-dark">
                    {course.totalEnrolled || 0}
                  </strong>{' '}
                  Students Enrolled
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <EnrollmentButton
                  courseId={course.id}
                  isEnrolled={isEnrolled}
                  onEnrollmentChanged={(enrolled) => {
                    setIsEnrolled(enrolled);
                    fetchCourseData();
                  }}
                  size="large"
                  showDropOption
                  onDark
                />
                {isEnrolled && (
                  <Link to={`/courses/${course.id}/learn`}>
                    <Button size="large" className="btn-ghost-dark" icon={<PlayCircleOutlined />}>
                      Go to Classroom
                    </Button>
                  </Link>
                )}
                <Link to={`/courses/${course.id}/practice`}>
                  <Button size="large" className="btn-ghost-dark" icon={<CodeOutlined />}>
                    Practice
                  </Button>
                </Link>
              </div>
            </div>

            {/* Cover + progress */}
            <div className="space-y-5">
              <div className="overflow-hidden rounded-sm border border-hairline-dark">
                <img
                  src={course.thumbnailUrl || defaultThumbnail}
                  alt={course.title}
                  className="h-48 w-full object-cover lg:h-56"
                />
              </div>

              {isEnrolled && progress && (
                <div className="card-dark">
                  <div className="card-pad">
                    <p className="eyebrow">Your learning progress</p>
                    <div className="mt-4">
                      <ProgressBar
                        percentage={progress.overallProgressPercentage || 0}
                        completedLessons={progress.completedLessons || 0}
                        totalLessons={progress.totalLessons || lessons.length}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================= Tabs (white band) */}
      <section className="band band-light bleed">
        <div className="container-app py-10 md:py-14">
          <Tabs defaultActiveKey="syllabus" items={tabItems} />
        </div>
      </section>
    </div>
  );
};

export default CourseDetails;
