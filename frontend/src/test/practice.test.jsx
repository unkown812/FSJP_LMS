import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ROLES } from '../utils/constants';
import { courseApi, lessonApi, progressApi, enrollmentApi, quizApi, discussionApi, feedbackApi } from '../api';
import Footer from '../components/Footer';
import CourseDetails from '../components/CourseDetails';
import OneCompilerEditor, { buildEmbedUrl } from '../components/practice/OneCompilerEditor';
import PracticePage from '../pages/practice/PracticePage';
import CoursePracticePage from '../pages/practice/CoursePracticePage';
import { fetchPracticeProblems } from '../data/practiceData';

vi.mock('../data/practiceData', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    fetchPracticeProblems: vi.fn(actual.fetchPracticeProblems),
  };
});

vi.mock('../api', () => ({
  courseApi: { getCourseById: vi.fn(), getAllCourses: vi.fn() },
  lessonApi: { getLessonsByCourse: vi.fn() },
  progressApi: { getCourseProgress: vi.fn() },
  enrollmentApi: { getUserEnrollments: vi.fn(), enroll: vi.fn(), unenroll: vi.fn() },
  quizApi: { getQuizzesByCourse: vi.fn() },
  discussionApi: { getDiscussionsByCourse: vi.fn(), getDiscussions: vi.fn() },
  feedbackApi: { getFeedbackByCourse: vi.fn() },
}));

const mockAuth = {
  user: { id: 1, name: 'Learner User', role: ROLES.LEARNER },
  role: ROLES.LEARNER,
  isAuthenticated: false,
};

const renderPracticePage = (initialEntries = ['/practice']) =>
  render(
    <AuthContext.Provider value={mockAuth}>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/courses/:courseId/practice" element={<CoursePracticePage />} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );

describe('Practice module — footer entry point', () => {
  it('adds a Practice column linking to /practice without changing existing links', () => {
    render(
      <AuthContext.Provider value={{ ...mockAuth, isAuthenticated: false }}>
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const nav = screen.getByRole('navigation', { name: 'Practice' });
    const link = within(nav).getByRole('link', { name: 'Coding practice' });
    expect(link).toHaveAttribute('href', '/practice');

    expect(screen.getByRole('link', { name: 'Explore courses' })).toHaveAttribute('href', '/courses');
    expect(screen.getByRole('link', { name: 'Sign in' })).toHaveAttribute('href', '/login');
  });
});

describe('OneCompilerEditor', () => {
  it('builds embed urls per the OneCompiler embed API', () => {
    expect(buildEmbedUrl({})).toBe('https://onecompiler.com/embed/');
    expect(buildEmbedUrl({ language: 'python' })).toBe('https://onecompiler.com/embed/python');
    expect(buildEmbedUrl({ language: 'JAVA', listenToEvents: true })).toBe(
      'https://onecompiler.com/embed/java?listenToEvents=true'
    );
  });

  it('renders a contained, accessible iframe with configurable language, height and file name', () => {
    const { container } = render(
      <OneCompilerEditor
        language="python"
        fileName="solution.py"
        starterCode="print('hi')"
        height={520}
        title="Two Sum editor"
      />
    );

    const iframe = container.querySelector('iframe');
    expect(iframe).toHaveAttribute('src', 'https://onecompiler.com/embed/python?listenToEvents=true');
    expect(iframe).toHaveAttribute('title', 'Two Sum editor');
    expect(iframe).toHaveAttribute('width', '100%');
    expect(iframe.style.height).toBe('520px');

    expect(screen.getByText('solution.py')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Load starter code' })).toBeInTheDocument();
  });

  it('falls back to a derived title and file name', () => {
    const { container } = render(<OneCompilerEditor language="java" />);
    const iframe = container.querySelector('iframe');
    expect(iframe).toHaveAttribute('title', 'Java code editor');
    expect(iframe).toHaveAttribute('src', 'https://onecompiler.com/embed/java');
    expect(screen.getByText('Main.java')).toBeInTheDocument();
  });
});

describe('PracticePage (general coding practice)', () => {
  beforeEach(() => {
    fetchPracticeProblems.mockClear();
  });

  it('shows a loading state and then lists problems with course association, difficulty and language', async () => {
    renderPracticePage();

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText(/loading practice problems/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: 'General coding practice' })).toBeInTheDocument();
    });

    expect(screen.getByText(/7 problems available/)).toBeInTheDocument();

    // General problem card
    expect(screen.getByRole('heading', { level: 3, name: 'Two Sum' })).toBeInTheDocument();
    expect(screen.getAllByText('General practice')).toHaveLength(3);

    // Course-associated problem card
    expect(screen.getByRole('heading', { level: 3, name: 'Binary Search' })).toBeInTheDocument();
    expect(
      screen.getAllByText('Data Structures and Algorithms in Java')
    ).toHaveLength(2);

    expect(screen.getAllByText('Easy').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Java').length).toBeGreaterThan(0);

    const openLinks = screen.getAllByRole('link', { name: /open problem/i });
    expect(openLinks).toHaveLength(7);
    expect(openLinks[0]).toHaveAttribute('href', '/practice?problem=practice-two-sum');
    expect(openLinks.map((link) => link.getAttribute('href'))).toContain(
      '/courses/2/practice?problem=practice-binary-search'
    );
  });

  it('opens the selected problem in an embedded workspace', async () => {
    renderPracticePage(['/practice?problem=practice-two-sum']);

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 2, name: 'Two Sum' })).toBeInTheDocument();
    });

    expect(screen.getByText('Problem statement')).toBeInTheDocument();
    expect(screen.getByText(/Find two distinct entries whose sum equals the target/)).toBeInTheDocument();
    expect(screen.getByText('Input / output examples')).toBeInTheDocument();

    const iframe = document.querySelector('iframe');
    expect(iframe).toHaveAttribute('src', 'https://onecompiler.com/embed/python?listenToEvents=true');
    expect(iframe).toHaveAttribute('title', 'Two Sum — Python editor');

    expect(screen.getByRole('link', { name: /all problems/i })).toHaveAttribute('href', '/practice');
  });

  it('shows an empty state when no practice problems exist', async () => {
    fetchPracticeProblems.mockResolvedValueOnce([]);

    renderPracticePage();

    await waitFor(() => {
      expect(screen.getByText(/no practice problems are available yet/i)).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: 'Reload' })).toBeInTheDocument();
  });

  it('shows an error state with retry when the problem source fails', async () => {
    fetchPracticeProblems.mockRejectedValueOnce(new Error('practice source unavailable'));

    renderPracticePage();

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    expect(screen.getByText('Could not load practice problems')).toBeInTheDocument();
    expect(screen.getByText('practice source unavailable')).toBeInTheDocument();

    fetchPracticeProblems.mockResolvedValueOnce([]);
    fireEvent.click(screen.getByRole('button', { name: /retry/i }));

    await waitFor(() => {
      expect(screen.getByText(/no practice problems are available yet/i)).toBeInTheDocument();
    });
    expect(fetchPracticeProblems).toHaveBeenCalledTimes(2);
  });

  it('shows a not-found state for an unknown problem id', async () => {
    renderPracticePage(['/practice?problem=does-not-exist']);

    await waitFor(() => {
      expect(screen.getByText(/practice problem could not be found/i)).toBeInTheDocument();
    });
  });
});

describe('CoursePracticePage (course-specific practice)', () => {
  beforeEach(() => {
    fetchPracticeProblems.mockClear();
    courseApi.getCourseById.mockResolvedValue({
      id: '1',
      title: 'Full-Stack Java with Spring Boot & React',
      categoryName: 'Web Development',
    });
  });

  it('renders the problem statement next to the OneCompiler editor', async () => {
    renderPracticePage(['/courses/1/practice']);

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: 'Course practice' })).toBeInTheDocument();
    });

    expect(screen.getByRole('link', { name: /course details/i })).toHaveAttribute('href', '/courses/1');

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { level: 2, name: 'Expose a Course Lookup Endpoint' })
      ).toBeInTheDocument();
    });

    expect(
      screen.getByText(/hands-on coding problems for full-stack java with spring boot & react/i)
    ).toBeInTheDocument();
    expect(screen.getByText('Problem statement')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText(/search the sample course list for a matching id/i)).toBeInTheDocument();
    expect(screen.getByText(/found: full-stack java/i)).toBeInTheDocument();

    const iframe = document.querySelector('iframe');
    expect(iframe).toHaveAttribute('src', 'https://onecompiler.com/embed/java?listenToEvents=true');
    expect(iframe).toHaveAttribute('title', 'Expose a Course Lookup Endpoint — Java editor');
    expect(iframe).toHaveAttribute('width', '100%');
  });

  it('lets learners switch between course problems', async () => {
    renderPracticePage(['/courses/1/practice']);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Implement a Debounce Function' })).toBeInTheDocument();
    });

    expect(screen.getByRole('navigation', { name: 'Practice problems' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Implement a Debounce Function' }));

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { level: 2, name: 'Implement a Debounce Function' })
      ).toBeInTheDocument();
    });

    expect(document.querySelector('iframe')).toHaveAttribute(
      'title',
      'Implement a Debounce Function — JavaScript editor'
    );
  });

  it('shows an empty state when the course has no problems', async () => {
    fetchPracticeProblems.mockResolvedValueOnce([]);

    renderPracticePage(['/courses/99/practice']);

    await waitFor(() => {
      expect(
        screen.getByText(/no practice problems are available for this course yet/i)
      ).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /browse all practice problems/i })).toBeInTheDocument();
  });
});

describe('Course details integration', () => {
  beforeEach(() => {
    fetchPracticeProblems.mockClear();
    courseApi.getCourseById.mockResolvedValue({
      id: '1',
      title: 'Full-Stack Java with Spring Boot & React',
      description: 'Build production-grade applications.',
      categoryName: 'Web Development',
      instructorName: 'Sarah Instructor',
      status: 'PUBLISHED',
      totalLessons: 3,
      totalEnrolled: 12,
    });
    lessonApi.getLessonsByCourse.mockResolvedValue([]);
    quizApi.getQuizzesByCourse.mockResolvedValue([]);
    enrollmentApi.getUserEnrollments.mockResolvedValue([]);
  });

  it('links the hero Practice action and exposes a Practice tab', async () => {
    render(
      <AuthContext.Provider value={mockAuth}>
        <MemoryRouter>
          <CourseDetails courseId="1" />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: 'Full-Stack Java with Spring Boot & React' })).toBeInTheDocument();
    });

    const practiceLink = screen.getByRole('link', { name: /practice/i });
    expect(practiceLink).toHaveAttribute('href', '/courses/1/practice');

    fireEvent.click(screen.getByRole('tab', { name: /practice/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /open practice workspace/i })).toBeInTheDocument();
    });

    expect(screen.getByText(/embedded onecompiler editor/i)).toBeInTheDocument();
    expect(screen.getByText('Implement a Debounce Function')).toBeInTheDocument();
    expect(screen.getByText('Expose a Course Lookup Endpoint')).toBeInTheDocument();

    const openLinks = screen
      .getAllByRole('link')
      .filter((link) => (link.getAttribute('href') || '').includes('/courses/1/practice?problem='));
    expect(openLinks).toHaveLength(2);
    expect(openLinks[0]).toHaveAttribute(
      'href',
      '/courses/1/practice?problem=practice-rest-get-endpoint'
    );
  });
});
