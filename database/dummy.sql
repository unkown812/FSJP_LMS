-- ============================================================
-- LMS EXTENDED SAMPLE SEED DATA
-- Default password: password123
-- BCrypt hash:
-- $2a$10$Y100O/uL2b7z8BfGvTskIuBvyz6L4/oFvL1H3L5lTq8eIkmNn2yV.
-- ============================================================

USE lms;

-- ============================================================
-- USERS
-- ============================================================

INSERT IGNORE INTO
    users (
        id,
        name,
        email,
        password,
        role,
        bio
    )
VALUES (
        4,
        'Michael Chen',
        'michael.chen@example.com',
        '$2a$10$Y100O/uL2b7z8BfGvTskIuBvyz6L4/oFvL1H3L5lTq8eIkmNn2yV.',
        'INSTRUCTOR',
        'Cloud Architect and DevOps instructor'
    ),
    (
        5,
        'Priya Sharma',
        'priya.sharma@example.com',
        '$2a$10$Y100O/uL2b7z8BfGvTskIuBvyz6L4/oFvL1H3L5lTq8eIkmNn2yV.',
        'INSTRUCTOR',
        'Computer Science professor and competitive programming mentor'
    ),
    (
        6,
        'Emma Wilson',
        'emma.wilson@example.com',
        '$2a$10$Y100O/uL2b7z8BfGvTskIuBvyz6L4/oFvL1H3L5lTq8eIkmNn2yV.',
        'LEARNER',
        'Aspiring full-stack developer'
    ),
    (
        7,
        'Rahul Mehta',
        'rahul.mehta@example.com',
        '$2a$10$Y100O/uL2b7z8BfGvTskIuBvyz6L4/oFvL1H3L5lTq8eIkmNn2yV.',
        'LEARNER',
        'Software engineering student'
    ),
    (
        8,
        'Sophia Brown',
        'sophia.brown@example.com',
        '$2a$10$Y100O/uL2b7z8BfGvTskIuBvyz6L4/oFvL1H3L5lTq8eIkmNn2yV.',
        'LEARNER',
        'Frontend development enthusiast'
    ),
    (
        9,
        'Arjun Patel',
        'arjun.patel@example.com',
        '$2a$10$Y100O/uL2b7z8BfGvTskIuBvyz6L4/oFvL1H3L5lTq8eIkmNn2yV.',
        'LEARNER',
        'Computer science student interested in algorithms'
    ),
    (
        10,
        'Olivia Martin',
        'olivia.martin@example.com',
        '$2a$10$Y100O/uL2b7z8BfGvTskIuBvyz6L4/oFvL1H3L5lTq8eIkmNn2yV.',
        'LEARNER',
        'Junior software developer'
    ),
    (
        11,
        'Daniel Lee',
        'daniel.lee@example.com',
        '$2a$10$Y100O/uL2b7z8BfGvTskIuBvyz6L4/oFvL1H3L5lTq8eIkmNn2yV.',
        'LEARNER',
        'Backend development learner'
    ),
    (
        12,
        'Ananya Desai',
        'ananya.desai@example.com',
        '$2a$10$Y100O/uL2b7z8BfGvTskIuBvyz6L4/oFvL1H3L5lTq8eIkmNn2yV.',
        'LEARNER',
        'Technology enthusiast learning cloud computing'
    );

-- ============================================================
-- CATEGORIES
-- ============================================================

INSERT IGNORE INTO
    categories (id, name, description)
VALUES (
        4,
        'Mobile Development',
        'Build Android and iOS applications using modern frameworks.'
    ),
    (
        5,
        'Database Management',
        'Relational databases, SQL, NoSQL, database design, and optimization.'
    ),
    (
        6,
        'Programming Languages',
        'Learn popular programming languages and programming fundamentals.'
    ),
    (
        7,
        'Artificial Intelligence',
        'Machine learning, generative AI, neural networks, and AI applications.'
    ),
    (
        8,
        'Software Engineering',
        'Software architecture, testing, design patterns, and engineering practices.'
    );

-- ============================================================
-- COURSES
-- ============================================================

INSERT IGNORE INTO
    courses (
        id,
        title,
        description,
        category_id,
        instructor_id,
        status,
        thumbnail_url
    )
VALUES (
        3,
        'Complete DevOps & Cloud Engineering',
        'Learn Linux, Docker, Kubernetes, CI/CD, AWS fundamentals, monitoring, and production deployment.',
        3,
        4,
        'PUBLISHED',
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa'
    ),
    (
        4,
        'Advanced Data Structures & Algorithms',
        'Master advanced data structures, graph algorithms, dynamic programming, and technical interview patterns.',
        2,
        5,
        'PUBLISHED',
        'https://images.unsplash.com/photo-1516116216624-53e697fedbea'
    ),
    (
        5,
        'React Frontend Development',
        'Build modern responsive web applications using React, reusable components, hooks, routing, and APIs.',
        1,
        2,
        'PUBLISHED',
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee'
    ),
    (
        6,
        'Spring Boot Microservices',
        'Design scalable microservices using Spring Boot, REST APIs, service discovery, security, and messaging.',
        8,
        2,
        'PUBLISHED',
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31'
    ),
    (
        7,
        'SQL & Database Design Masterclass',
        'Learn relational database design, SQL queries, normalization, indexes, joins, transactions, and optimization.',
        5,
        5,
        'PUBLISHED',
        'https://images.unsplash.com/photo-1544383835-bda2bc66a55d'
    ),
    (
        8,
        'Python Programming from Beginner to Advanced',
        'Learn Python fundamentals, object-oriented programming, modules, APIs, automation, and advanced concepts.',
        6,
        5,
        'PUBLISHED',
        'https://images.unsplash.com/photo-1526379095098-d400fd0bf935'
    ),
    (
        9,
        'Introduction to Generative AI',
        'Understand generative AI, large language models, prompt engineering, embeddings, and AI application development.',
        7,
        4,
        'PUBLISHED',
        'https://images.unsplash.com/photo-1677442136019-21780ecad995'
    ),
    (
        10,
        'React Native Mobile App Development',
        'Build cross-platform mobile applications using React Native, navigation, APIs, authentication, and deployment.',
        4,
        2,
        'DRAFT',
        'https://images.unsplash.com/photo-1551650975-87deedd944c3'
    );

-- ============================================================
-- LESSONS
-- ============================================================

INSERT IGNORE INTO
    lessons (
        id,
        course_id,
        title,
        description,
        content_url,
        content_text,
        order_index,
        duration_minutes
    )
VALUES

(
    4,
    3,
    'Introduction to DevOps',
    'Understand DevOps culture, lifecycle, automation, and continuous delivery.',
    'https://www.youtube.com/embed/0yWAtQ6wYNM',
    'Introduction to DevOps principles and modern software delivery practices.',
    1,
    30
),
(
    5,
    3,
    'Linux Fundamentals',
    'Learn essential Linux commands, permissions, processes, and shell scripting.',
    'https://www.youtube.com/embed/sWbUDq4S6Y8',
    'Learn the Linux command line and essential administration concepts.',
    2,
    45
),
(
    6,
    3,
    'Docker Fundamentals',
    'Understand containers, Docker images, Dockerfiles, and container networking.',
    'https://www.youtube.com/embed/3c-iBn73dDE',
    'Build and run applications using Docker containers.',
    3,
    50
),
(
    7,
    3,
    'CI/CD with GitHub Actions',
    'Automate testing and deployment pipelines using GitHub Actions.',
    'https://www.youtube.com/embed/R8_veQiYBjI',
    'Create your first automated CI/CD pipeline.',
    4,
    45
),


(
    8,
    4,
    'Arrays and Strings',
    'Master array manipulation and common string algorithms.',
    'https://www.youtube.com/embed/n60Dn0UsbEk',
    'Learn array traversal, searching, sorting, and string manipulation.',
    1,
    40
),
(
    9,
    4,
    'Linked Lists',
    'Understand singly linked lists, doubly linked lists, and common operations.',
    'https://www.youtube.com/embed/5Y2EiZST97Y',
    'Implement and analyze linked list operations.',
    2,
    45
),
(
    10,
    4,
    'Stacks and Queues',
    'Learn stack and queue implementations and their applications.',
    'https://www.youtube.com/embed/wjI1WNcIntg',
    'Explore LIFO and FIFO data structures.',
    3,
    35
),
(
    11,
    4,
    'Trees and Binary Search Trees',
    'Learn tree traversal, binary search trees, and tree-based algorithms.',
    'https://www.youtube.com/embed/fAAZixBzIA4',
    'Implement tree structures and traversal algorithms.',
    4,
    50
),


(
    12,
    5,
    'React Fundamentals',
    'Learn components, JSX, props, and the React rendering model.',
    'https://www.youtube.com/embed/SqcY0GlETPk',
    'Build your first React components.',
    1,
    35
),
(
    13,
    5,
    'React Hooks',
    'Understand useState, useEffect, useMemo, and custom hooks.',
    'https://www.youtube.com/embed/LlvBzyy-558',
    'Learn how React hooks simplify application development.',
    2,
    45
),
(
    14,
    5,
    'React Router',
    'Implement client-side routing and navigation.',
    'https://www.youtube.com/embed/Ul3y1LXxzdU',
    'Build multi-page experiences using React Router.',
    3,
    35
),
(
    15,
    5,
    'Working with REST APIs',
    'Fetch and display data from backend APIs.',
    'https://www.youtube.com/embed/-MTSQjw5DrM',
    'Connect React applications with REST APIs.',
    4,
    40
),

(
    16,
    7,
    'Introduction to Relational Databases',
    'Learn tables, rows, columns, keys, and relationships.',
    'https://www.youtube.com/embed/HXV3zeQKqGY',
    'Understand relational database fundamentals.',
    1,
    30
),
(
    17,
    7,
    'SQL SELECT Queries',
    'Learn filtering, sorting, grouping, and aggregate functions.',
    'https://www.youtube.com/embed/7S_tz1z_5bA',
    'Write effective SQL queries.',
    2,
    45
),
(
    18,
    7,
    'SQL Joins',
    'Master INNER, LEFT, RIGHT, and FULL joins.',
    'https://www.youtube.com/embed/9yeOJ0ZMUYw',
    'Combine data from multiple relational tables.',
    3,
    40
),


(
    19,
    8,
    'Python Fundamentals',
    'Variables, data types, operators, conditions, and loops.',
    'https://www.youtube.com/embed/_uQrJ0TkZlc',
    'Learn Python programming fundamentals.',
    1,
    50
),
(
    20,
    8,
    'Functions and Modules',
    'Create reusable functions and organize Python applications.',
    'https://www.youtube.com/embed/NSbOtYzIQI0',
    'Learn modular Python programming.',
    2,
    40
),
(
    21,
    8,
    'Object-Oriented Programming',
    'Classes, objects, inheritance, encapsulation, and polymorphism.',
    'https://www.youtube.com/embed/JeznW_7DlB0',
    'Implement object-oriented applications in Python.',
    3,
    55
),


(
    22,
    9,
    'What is Generative AI?',
    'Understand generative models and how modern AI systems work.',
    'https://www.youtube.com/embed/2IK3DFHRFfw',
    'Introduction to generative artificial intelligence.',
    1,
    35
),
(
    23,
    9,
    'Prompt Engineering',
    'Learn techniques for writing effective prompts.',
    'https://www.youtube.com/embed/_ZvnD73m40o',
    'Develop structured prompts for AI applications.',
    2,
    40
),
(
    24,
    9,
    'Building AI Applications',
    'Learn the fundamentals of integrating AI APIs into applications.',
    'https://www.youtube.com/embed/5q5fH9J6b7Y',
    'Build practical AI-powered applications.',
    3,
    50
);

-- ============================================================
-- QUIZZES
-- ============================================================

INSERT IGNORE INTO
    quizzes (
        id,
        course_id,
        title,
        description,
        passing_score,
        time_limit_minutes
    )
VALUES (
        2,
        3,
        'DevOps Fundamentals Assessment',
        'Test your understanding of DevOps, Docker, Linux, and CI/CD.',
        70,
        20
    ),
    (
        3,
        4,
        'Data Structures Assessment',
        'Evaluate your understanding of fundamental data structures.',
        70,
        25
    ),
    (
        4,
        5,
        'React Development Assessment',
        'Test your knowledge of React fundamentals and hooks.',
        70,
        20
    ),
    (
        5,
        7,
        'SQL Fundamentals Assessment',
        'Test your SQL and relational database knowledge.',
        70,
        20
    ),
    (
        6,
        8,
        'Python Programming Assessment',
        'Evaluate your Python programming fundamentals.',
        70,
        25
    ),
    (
        7,
        9,
        'Generative AI Fundamentals',
        'Test your understanding of generative AI and prompt engineering.',
        70,
        20
    );

-- ============================================================
-- QUESTIONS
-- ============================================================

INSERT IGNORE INTO
    questions (
        id,
        quiz_id,
        question_text,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_option,
        points,
        explanation
    )
VALUES


(
    4,
    2,
    'What does CI stand for in CI/CD?',
    'Continuous Integration',
    'Code Integration',
    'Continuous Installation',
    'Central Integration',
    'A',
    10,
    'CI stands for Continuous Integration.'
),
(
    5,
    2,
    'Which technology is primarily used for containerization?',
    'Git',
    'Docker',
    'Jenkins',
    'Maven',
    'B',
    10,
    'Docker is a popular containerization platform.'
),
(
    6,
    2,
    'Which tool is commonly used to automate CI/CD pipelines?',
    'GitHub Actions',
    'Photoshop',
    'Figma',
    'MySQL',
    'A',
    10,
    'GitHub Actions can automate build, test, and deployment workflows.'
),

(
    7,
    3,
    'Which data structure follows LIFO?',
    'Queue',
    'Stack',
    'Array',
    'Graph',
    'B',
    10,
    'A stack follows Last In, First Out.'
),
(
    8,
    3,
    'Which data structure follows FIFO?',
    'Stack',
    'Tree',
    'Queue',
    'Graph',
    'C',
    10,
    'A queue follows First In, First Out.'
),
(
    9,
    3,
    'What is the average time complexity of binary search?',
    'O(n)',
    'O(log n)',
    'O(n²)',
    'O(1)',
    'B',
    10,
    'Binary search eliminates half of the search space at each step.'
),


(
    10,
    4,
    'Which library is used to build user interfaces in React?',
    'React',
    'Spring',
    'Django',
    'Express',
    'A',
    10,
    'React is a JavaScript library for building user interfaces.'
),
(
    11,
    4,
    'Which hook is commonly used to manage component state?',
    'useState',
    'useRoute',
    'useComponent',
    'useData',
    'A',
    10,
    'useState allows functional components to manage state.'
),
(
    12,
    4,
    'What syntax does React commonly use to describe UI structure?',
    'XML',
    'JSX',
    'YAML',
    'SQL',
    'B',
    10,
    'JSX is a syntax extension commonly used with React.'
),


(
    13,
    5,
    'Which SQL statement is used to retrieve data?',
    'INSERT',
    'UPDATE',
    'SELECT',
    'DELETE',
    'C',
    10,
    'SELECT retrieves data from database tables.'
),
(
    14,
    5,
    'Which clause filters rows?',
    'ORDER BY',
    'WHERE',
    'GROUP BY',
    'HAVING',
    'B',
    10,
    'WHERE filters rows before grouping.'
),
(
    15,
    5,
    'Which key uniquely identifies a row?',
    'Foreign Key',
    'Primary Key',
    'Composite Index',
    'Candidate Table',
    'B',
    10,
    'A primary key uniquely identifies each row.'
),


(
    16,
    6,
    'Which keyword defines a function in Python?',
    'function',
    'func',
    'def',
    'define',
    'C',
    10,
    'Python uses the def keyword to define functions.'
),
(
    17,
    6,
    'Which data type stores key-value pairs?',
    'List',
    'Tuple',
    'Dictionary',
    'Set',
    'C',
    10,
    'Python dictionaries store key-value pairs.'
),
(
    18,
    6,
    'Which symbol is used for comments in Python?',
    '//',
    '#',
    '<!--',
    '--',
    'B',
    10,
    'Python uses # for single-line comments.'
),


(
    19,
    7,
    'What does LLM stand for?',
    'Large Language Model',
    'Long Learning Machine',
    'Language Logic Module',
    'Large Learning Machine',
    'A',
    10,
    'LLM stands for Large Language Model.'
),
(
    20,
    7,
    'What is prompt engineering?',
    'Designing computer hardware',
    'Writing effective instructions for AI models',
    'Creating databases',
    'Training operating systems',
    'B',
    10,
    'Prompt engineering focuses on designing effective instructions for AI models.'
),
(
    21,
    7,
    'What is an embedding?',
    'A database table',
    'A numerical representation of information',
    'A programming language',
    'A web server',
    'B',
    10,
    'Embeddings represent information as numerical vectors.'
);

-- ============================================================
-- ENROLLMENTS
-- Assumes an enrollments table:
-- id, user_id, course_id
-- ============================================================

INSERT IGNORE INTO
    enrollments (id, user_id, course_id)
VALUES (1, 3, 1),
    (2, 3, 2),
    (3, 3, 5),
    (4, 6, 1),
    (5, 6, 5),
    (6, 6, 9),
    (7, 7, 1),
    (8, 7, 2),
    (9, 7, 7),
    (10, 8, 5),
    (11, 8, 9),
    (12, 9, 2),
    (13, 9, 4),
    (14, 9, 8),
    (15, 10, 1),
    (16, 10, 5),
    (17, 10, 8),
    (18, 11, 1),
    (19, 11, 6),
    (20, 11, 7),
    (21, 12, 3),
    (22, 12, 7),
    (23, 12, 9);

-- ============================================================
-- LESSON PROGRESS
-- Assumes:
-- lesson_progress(id, user_id, lesson_id, completed, progress_percentage)
-- ============================================================

INSERT IGNORE INTO
    lesson_progress (
        id,
        user_id,
        lesson_id,
        completed,
        progress_percentage
    )
VALUES (1, 3, 1, TRUE, 100),
    (2, 3, 2, TRUE, 100),
    (3, 3, 3, FALSE, 65),
    (4, 6, 1, TRUE, 100),
    (5, 6, 2, TRUE, 100),
    (6, 6, 3, FALSE, 30),
    (7, 6, 12, TRUE, 100),
    (8, 6, 13, FALSE, 70),
    (9, 7, 1, TRUE, 100),
    (10, 7, 2, FALSE, 50),
    (11, 8, 12, TRUE, 100),
    (12, 8, 13, TRUE, 100),
    (13, 8, 14, FALSE, 40),
    (14, 9, 8, TRUE, 100),
    (15, 9, 9, TRUE, 100),
    (16, 9, 10, FALSE, 75),
    (17, 10, 12, TRUE, 100),
    (18, 10, 13, TRUE, 100),
    (19, 10, 14, TRUE, 100),
    (20, 10, 15, FALSE, 80),
    (21, 11, 1, TRUE, 100),
    (22, 11, 2, TRUE, 100),
    (23, 11, 3, TRUE, 100);



INSERT IGNORE INTO
    quiz_attempts (
        id,
        user_id,
        quiz_id,
        score,
        passed
    )
VALUES (1, 3, 1, 90, TRUE),
    (2, 7, 1, 70, TRUE),
    (3, 11, 1, 100, TRUE),
    (4, 9, 3, 80, TRUE),
    (5, 10, 4, 90, TRUE),
    (6, 8, 4, 70, TRUE),
    (7, 9, 5, 90, TRUE),
    (8, 12, 5, 80, TRUE),
    (9, 10, 6, 100, TRUE),
    (10, 6, 7, 90, TRUE);

-- ============================================================
-- COURSE COMPLETION / CERTIFICATES
-- Uncomment if your schema contains certificates.
-- ============================================================

-- INSERT IGNORE INTO certificates
-- (id, user_id, course_id, certificate_code)
-- VALUES
-- (1, 3, 1, 'LMS-SPRING-0001'),
-- (2, 11, 1, 'LMS-SPRING-0002'),
-- (3, 10, 5, 'LMS-REACT-0001'),
-- (4, 9, 7, 'LMS-SQL-0001');

-- ============================================================
-- OPTIONAL: ADDITIONAL COURSE
-- ============================================================

INSERT IGNORE INTO
    courses (
        id,
        title,
        description,
        category_id,
        instructor_id,
        status,
        thumbnail_url
    )
VALUES (
        11,
        'Software Testing & Quality Assurance',
        'Learn unit testing, integration testing, test automation, debugging, and software quality practices.',
        8,
        4,
        'PUBLISHED',
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3'
    );

INSERT IGNORE INTO
    lessons (
        id,
        course_id,
        title,
        description,
        content_url,
        content_text,
        order_index,
        duration_minutes
    )
VALUES (
        25,
        11,
        'Introduction to Software Testing',
        'Understand testing principles and the software testing lifecycle.',
        'https://www.youtube.com/embed/u6QfIXgjwGQ',
        'Introduction to software testing and quality assurance.',
        1,
        35
    ),
    (
        26,
        11,
        'Unit Testing',
        'Learn how to write and organize unit tests.',
        'https://www.youtube.com/embed/3kzHmaeozDI',
        'Learn the fundamentals of unit testing.',
        2,
        40
    ),
    (
        27,
        11,
        'Integration Testing',
        'Test interactions between application components.',
        'https://www.youtube.com/embed/1A3gK4k8j7Q',
        'Understand integration testing strategies.',
        3,
        40
    );

-- ============================================================
-- END OF SEED DATA
-- ============================================================