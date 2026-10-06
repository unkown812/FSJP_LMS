-- Learning Management System (LMS) Database Schema
-- Workstream B (Backend + Database)

CREATE DATABASE IF NOT EXISTS lms DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE lms;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(30) NOT NULL DEFAULT 'LEARNER',
    bio TEXT NULL,
    avatar_url VARCHAR(512) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_users_email (email),
    INDEX idx_users_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Courses Table
CREATE TABLE IF NOT EXISTS courses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    category_id BIGINT NULL,
    instructor_id BIGINT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'DRAFT',
    thumbnail_url VARCHAR(512) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_courses_category FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE SET NULL,
    CONSTRAINT fk_courses_instructor FOREIGN KEY (instructor_id) REFERENCES users (id) ON DELETE CASCADE,
    INDEX idx_courses_instructor (instructor_id),
    INDEX idx_courses_category (category_id),
    INDEX idx_courses_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Lessons Table
CREATE TABLE IF NOT EXISTS lessons (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    content_url VARCHAR(512) NULL,
    content_text LONGTEXT NULL,
    order_index INT NOT NULL DEFAULT 1,
    duration_minutes INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_lessons_course FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE CASCADE,
    INDEX idx_lessons_course (course_id),
    INDEX idx_lessons_order (course_id, order_index)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Enrollments Table
CREATE TABLE IF NOT EXISTS enrollments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'ENROLLED',
    enrolled_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    CONSTRAINT fk_enrollments_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_enrollments_course FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE CASCADE,
    UNIQUE KEY uk_user_course_enrollment (user_id, course_id),
    INDEX idx_enrollments_user (user_id),
    INDEX idx_enrollments_course (course_id),
    INDEX idx_enrollments_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Progress Table
CREATE TABLE IF NOT EXISTS progress (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    lesson_id BIGINT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    watch_time_seconds INT NOT NULL DEFAULT 0,
    completion_percentage DOUBLE NOT NULL DEFAULT 0.0,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_progress_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_progress_course FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE CASCADE,
    CONSTRAINT fk_progress_lesson FOREIGN KEY (lesson_id) REFERENCES lessons (id) ON DELETE CASCADE,
    UNIQUE KEY uk_user_lesson_progress (user_id, lesson_id),
    INDEX idx_progress_user_course (user_id, course_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Quizzes Table
CREATE TABLE IF NOT EXISTS quizzes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    passing_score INT NOT NULL DEFAULT 70,
    time_limit_minutes INT NOT NULL DEFAULT 30,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_quizzes_course FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE CASCADE,
    INDEX idx_quizzes_course (course_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Questions Table
CREATE TABLE IF NOT EXISTS questions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    quiz_id BIGINT NOT NULL,
    question_text TEXT NOT NULL,
    option_a VARCHAR(500) NOT NULL,
    option_b VARCHAR(500) NOT NULL,
    option_c VARCHAR(500) NOT NULL,
    option_d VARCHAR(500) NOT NULL,
    correct_option VARCHAR(10) NOT NULL,
    points INT NOT NULL DEFAULT 10,
    explanation TEXT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_questions_quiz FOREIGN KEY (quiz_id) REFERENCES quizzes (id) ON DELETE CASCADE,
    INDEX idx_questions_quiz (quiz_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Quiz Attempts Table
CREATE TABLE IF NOT EXISTS quiz_attempts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    quiz_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    score INT NOT NULL DEFAULT 0,
    total_points INT NOT NULL DEFAULT 0,
    passed BOOLEAN NOT NULL DEFAULT FALSE,
    started_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    submitted_at TIMESTAMP NULL,
    CONSTRAINT fk_quiz_attempts_quiz FOREIGN KEY (quiz_id) REFERENCES quizzes (id) ON DELETE CASCADE,
    CONSTRAINT fk_quiz_attempts_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    INDEX idx_quiz_attempts_user (user_id),
    INDEX idx_quiz_attempts_quiz (quiz_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. Quiz Attempt Answers Table
CREATE TABLE IF NOT EXISTS quiz_attempt_answers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    attempt_id BIGINT NOT NULL,
    question_id BIGINT NOT NULL,
    selected_option VARCHAR(10) NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    points_awarded INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_attempt_answers_attempt FOREIGN KEY (attempt_id) REFERENCES quiz_attempts (id) ON DELETE CASCADE,
    CONSTRAINT fk_attempt_answers_question FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE CASCADE,
    INDEX idx_attempt_answers_attempt (attempt_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. Discussions Table
CREATE TABLE IF NOT EXISTS discussions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    parent_id BIGINT NULL,
    title VARCHAR(255) NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_discussions_course FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE CASCADE,
    CONSTRAINT fk_discussions_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_discussions_parent FOREIGN KEY (parent_id) REFERENCES discussions (id) ON DELETE CASCADE,
    INDEX idx_discussions_course (course_id),
    INDEX idx_discussions_parent (parent_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. Feedback Table
CREATE TABLE IF NOT EXISTS feedback (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_feedback_course FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE CASCADE,
    CONSTRAINT fk_feedback_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    UNIQUE KEY uk_user_course_feedback (user_id, course_id),
    INDEX idx_feedback_course (course_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. Certificates Table
CREATE TABLE IF NOT EXISTS certificates (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    certificate_code VARCHAR(64) NOT NULL UNIQUE,
    user_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    issue_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    grade VARCHAR(50) DEFAULT 'PASS',
    certificate_url VARCHAR(512) NULL,
    CONSTRAINT fk_certificates_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_certificates_course FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE CASCADE,
    UNIQUE KEY uk_user_course_certificate (user_id, course_id),
    INDEX idx_certificates_code (certificate_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
