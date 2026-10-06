import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import {
  BookOutlined,
  CheckCircleFilled,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import CourseList from '../components/CourseList';
import { SectionHeader, GradientRibbon } from '../components/ui';
import { courseApi, categoryApi } from '../api';
import { useAuth } from '../hooks/useAuth';
import { ROLES } from '../utils/constants';

const FEATURES = [
  {
    eyebrow: 'Curriculum',
    title: 'Structured Curriculum',
    body: 'Step-by-step modular lessons with rich multimedia, code notes, and sequential learning paths.',
    icon: <BookOutlined />,
  },
  {
    eyebrow: 'Assessment',
    title: 'Authoritative Assessments',
    body: 'Server-evaluated quizzes with immediate feedback, detailed rationales, and objective grading.',
    icon: <CheckCircleFilled />,
  },
  {
    eyebrow: 'Credential',
    title: 'Verified Certificates',
    body: 'Official completion certificates with unique codes verifying course requirements were completed.',
    icon: <SafetyCertificateOutlined />,
  },
];

const STEPS = [
  {
    index: '01',
    title: 'Learn',
    body: 'Work through ordered modules at your own pace, with every lesson tracked automatically.',
    tone: 'mint',
  },
  {
    index: '02',
    title: 'Assess',
    body: 'Sit proctored-style quizzes graded by the server, with rationales published on release.',
    tone: 'periwinkle',
  },
  {
    index: '03',
    title: 'Certify',
    body: 'Earn a verifiable certificate the moment every requirement in the syllabus is met.',
    tone: 'mint',
  },
];

const TILE_TONES = {
  mint: 'bg-accent-mint',
  periwinkle: 'bg-accent-periwinkle',
};

export const HomePage = () => {
  const { isAuthenticated, user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const dashboardPath =
    user?.role === ROLES.ADMIN
      ? '/admin'
      : user?.role === ROLES.INSTRUCTOR
        ? '/instructor'
        : '/learner';

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        setLoading(true);
        const [courseList] = await Promise.all([
          courseApi.getAllCourses(),
          categoryApi.getAllCategories(),
        ]);
        setCourses(courseList || []);
      } catch (err) {
        console.error('Failed to load featured data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadFeatured();
  }, []);

  return (
    <div className="space-y-0">
      {/* ================================================== Hero (dark band) */}
      <section className="band band-dark bleed  -mt-6 md:-mt-10">
        <div className="container-app py-14 md:py-section">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="max-w-2xl space-y-6">
              <p className="eyebrow">Modern learning management platform</p>

              <h1 className="text-display-xxl text-on-dark">
                Empower your future with structured learning and verified credentials.
              </h1>

              <p className="lead max-w-xl">
                Explore industry-aligned courses, progress through structured lessons, test your
                skills with rigorous assessments, and earn verifiable certificates.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link to="/courses">
                  <Button type="primary" size="large" className="btn-mint">
                    Browse all courses
                  </Button>
                </Link>

                {!isAuthenticated ? (
                  <Link to="/register">
                    <Button size="large" className="btn-white">
                      Join for free
                    </Button>
                  </Link>
                ) : (
                  <Link to={dashboardPath}>
                    <Button size="large" className="btn-ghost-dark">
                      Go to dashboard
                    </Button>
                  </Link>
                )}
              </div>

              <dl className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-hairline-dark pt-6">
                {['Server-graded quizzes', 'Verified certificates', 'Role-based workspaces'].map(
                  (item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircleFilled className="text-xs text-accent-mint" />
                      <span className="text-caption text-on-dark">{item}</span>
                    </div>
                  ),
                )}
              </dl>
            </div>

            {/* Signature three-stop gradient ribbon — hero scale only */}
            <div className="relative mx-auto w-full max-w-800 max-h-800 lg:max-w-700">
              <GradientRibbon />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================= Features (white) */}
      <section className="band band-light bleed">
        <div className="container-app section">
          <SectionHeader
            eyebrow="What the platform does"
            title="Everything a course needs, in one rigorous workspace."
            description="No bolt-on tools: curriculum, assessment, discussion and certification are one system with one gradebook."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {FEATURES.map((feature) => (
              <article key={feature.title} className="card card-interactive">
                <div className="card-pad">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary text-on-primary">
                    {feature.icon}
                  </div>
                  <p className="eyebrow mt-6">{feature.eyebrow}</p>
                  <h3 className="mt-3 text-display-md text-ink">{feature.title}</h3>
                  <p className="mt-3 text-body-md text-body">{feature.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =============================================== Steps (tinted tiles) */}
      <section className="band bleed border-y border-hairline bg-canvas">
        <div className="container-app section">
          <SectionHeader
            eyebrow="How it works"
            title="Three moves from first lesson to verified certificate."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {STEPS.map((step) => (
              <div
                key={step.index}
                className={`card-pad-lg rounded-sm flex min-h-[220px] flex-col justify-between ${
                  TILE_TONES[step.tone]
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-display-xl text-ink">{step.title}</span>
                  <span className="eyebrow text-ink/70">{step.index}</span>
                </div>
                <p className="mt-8 text-body-md text-ink/80">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ Featured courses (white) */}
      <section className="band band-light bleed">
        <div className="container-app section">
          <SectionHeader
            eyebrow="Catalogue"
            title="Featured courses"
            description="Explore courses taught by experienced instructors across every track on the platform."
            action={
              <Link to="/courses" className="text-body-md text-ink underline underline-offset-4 hover:text-body">
                View all courses
              </Link>
            }
          />

          <div className="mt-10">
            <CourseList courses={courses.slice(0, 8)} loading={loading} />
          </div>
        </div>
      </section>

      {/* ================================================== Closing (dark band) */}
      <section className="band band-dark bleed">
        <div className="container-app py-14 md:py-section">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl space-y-5">
              <p className="eyebrow">Start today</p>
              <h2 className="text-display-xl text-on-dark">
                Pick a course. Prove the skill. Hold the certificate.
              </h2>
              <p className="lead">
                Create a free account to enrol, track progress and publish results the moment you
                pass.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link to="/register">
                <Button type="primary" size="large" className="btn-mint">
                  Create your account
                </Button>
              </Link>
              <Link to="/courses">
                <Button size="large" className="btn-ghost-dark">
                  Browse all courses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
