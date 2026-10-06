import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { ROLES } from '../utils/constants';

// Pages
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import CourseCatalogPage from '../pages/CourseCatalogPage';
import CourseDetailPage from '../pages/CourseDetailPage';
import LearningPage from '../pages/LearningPage';
import QuizTakingPage from '../pages/QuizTakingPage';
import ProfilePage from '../pages/ProfilePage';
import NotFoundPage from '../pages/NotFoundPage';
import PracticePage from '../pages/practice/PracticePage';
import CoursePracticePage from '../pages/practice/CoursePracticePage';

// Dashboards
import LearnerDashboard from '../components/LearnerDashboard';
import InstructorDashboard from '../components/InstructorDashboard';
import AdminDashboard from '../components/AdminDashboard';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/courses" element={<CourseCatalogPage />} />
      <Route path="/courses/:id" element={<CourseDetailPage />} />
      <Route path="/practice" element={<PracticePage />} />
      <Route path="/courses/:courseId/practice" element={<CoursePracticePage />} />

      {/* Authenticated Learning Routes */}
      <Route
        path="/courses/:courseId/learn"
        element={
          <ProtectedRoute>
            <LearningPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/quizzes/:id"
        element={
          <ProtectedRoute>
            <QuizTakingPage />
          </ProtectedRoute>
        }
      />

      {/* Role-Protected Dashboards */}
      <Route
        path="/learner"
        element={
          <ProtectedRoute allowedRoles={[ROLES.LEARNER, ROLES.ADMIN]}>
            <LearnerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/learner/certificates"
        element={
          <ProtectedRoute allowedRoles={[ROLES.LEARNER, ROLES.ADMIN]}>
            <LearnerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/instructor"
        element={
          <ProtectedRoute allowedRoles={[ROLES.INSTRUCTOR, ROLES.ADMIN]}>
            <InstructorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/instructor/courses/new"
        element={
          <ProtectedRoute allowedRoles={[ROLES.INSTRUCTOR, ROLES.ADMIN]}>
            <InstructorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/categories"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Common Authenticated Profile */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
