-- Sample Seed Data for Learning Management System
-- Default Passwords are 'password123' (BCrypt hashed: $2a$10$eAccYoNOz2F5DO7mxgWTn.7WDzRzDkC7hX5aW8z1zM/0D/rY5693O or standard BCrypt)

USE lms;

-- Users (admin, instructor, learner)
INSERT IGNORE INTO users (id, name, email, password, role, bio) VALUES
(1, 'Admin User', 'admin@example.com', '$2a$10$Y100O/uL2b7z8BfGvTskIuBvyz6L4/oFvL1H3L5lTq8eIkmNn2yV.', 'ADMIN', 'Platform Administrator'),
(2, 'Sarah Instructor', 'instructor@example.com', '$2a$10$Y100O/uL2b7z8BfGvTskIuBvyz6L4/oFvL1H3L5lTq8eIkmNn2yV.', 'INSTRUCTOR', 'Senior Software Engineer and Educator'),
(3, 'Alex Learner', 'learner@example.com', '$2a$10$Y100O/uL2b7z8BfGvTskIuBvyz6L4/oFvL1H3L5lTq8eIkmNn2yV.', 'LEARNER', 'Computer Science Enthusiast');

-- Categories
INSERT IGNORE INTO categories (id, name, description) VALUES
(1, 'Web Development', 'Courses on frontend, backend, and full-stack web applications.'),
(2, 'Computer Science', 'Foundations of algorithms, data structures, and computer systems.'),
(3, 'Cloud Computing', 'Cloud architecture, containers, microservices, and DevOps.');

-- Courses
INSERT IGNORE INTO courses (id, title, description, category_id, instructor_id, status, thumbnail_url) VALUES
(1, 'Full-Stack Java with Spring Boot & React', 'Learn how to build production-grade enterprise web applications from scratch.', 1, 2, 'PUBLISHED', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97'),
(2, 'Data Structures and Algorithms in Java', 'Master essential algorithms and technical interview problems.', 2, 2, 'PUBLISHED', 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4');

-- Lessons
INSERT IGNORE INTO lessons (id, course_id, title, description, content_url, content_text, order_index, duration_minutes) VALUES
(1, 1, 'Introduction to Spring Boot 3', 'Overview of Spring Boot concepts, dependency injection, and project setup.', 'https://www.youtube.com/embed/9SGDpanrc8U', 'Welcome to Spring Boot 3! In this lesson we cover core annotations and application startup.', 1, 25),
(2, 1, 'Building RESTful APIs with Spring MVC', 'Learn controllers, request mapping, status codes, and validation.', 'https://www.youtube.com/embed/9SGDpanrc8U', 'In this lesson we implement RESTful endpoints following standard HTTP methods.', 2, 35),
(3, 1, 'Spring Data JPA and Database Persistence', 'Entities, repositories, relationships, and queries.', 'https://www.youtube.com/embed/9SGDpanrc8U', 'Dive into JPA, Hibernate, ORM mapping, and transaction management.', 3, 40);

-- Quizzes
INSERT IGNORE INTO quizzes (id, course_id, title, description, passing_score, time_limit_minutes) VALUES
(1, 1, 'Spring Boot Fundamentals Assessment', 'Test your understanding of core Spring Boot architecture and REST APIs.', 70, 20);

-- Questions
INSERT IGNORE INTO questions (id, quiz_id, question_text, option_a, option_b, option_c, option_d, correct_option, points, explanation) VALUES
(1, 1, 'Which annotation is used to create a REST controller in Spring Boot?', '@Controller', '@RestController', '@Service', '@Component', 'B', 10, '@RestController combines @Controller and @ResponseBody.'),
(2, 1, 'What is the default embedded servlet container in Spring Boot web starter?', 'Tomcat', 'Jetty', 'Undertow', 'Netty', 'A', 10, 'Apache Tomcat is the default web container.'),
(3, 1, 'Which annotation marks a method to handle HTTP POST requests?', '@GetMapping', '@PostMapping', '@PutMapping', '@PatchMapping', 'B', 10, '@PostMapping maps HTTP POST requests to specific handler methods.');
