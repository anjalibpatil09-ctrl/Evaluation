DROP DATABASE IF EXISTS quiz_arena;
CREATE DATABASE quiz_arena;
USE quiz_arena;

-- USERS
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  username VARCHAR(100) UNIQUE,
  password VARCHAR(100),
  role VARCHAR(20)
);

-- SUBJECTS
CREATE TABLE subjects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100)
);

-- TOPICS
CREATE TABLE topics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subject_id INT,
  name VARCHAR(100)
);

-- QUESTIONS
CREATE TABLE questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subject_id INT,
  topic_id INT,
  question TEXT,
  option1 TEXT,
  option2 TEXT,
  option3 TEXT,
  option4 TEXT,
  correct_option INT
);

-- QUIZZES
CREATE TABLE quizzes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subject_id INT,
  topic_id INT,
  duration INT,
  quiz_date DATE
);

-- QUIZ QUESTIONS
CREATE TABLE quiz_questions (
  quiz_id INT,
  question_id INT
);



CREATE TABLE results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  quiz_id INT,
  score INT,
  total INT,
  percentage FLOAT,
  status VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- DEFAULT USERS
INSERT INTO users (name,username,password,role) VALUES
('Admin','admin','123','admin'),
('Student','student','123','student');


-- QUIZ + LINK
INSERT INTO quizzes (subject_id,topic_id,duration,quiz_date)
VALUES (1,1,30,CURDATE());

INSERT INTO quiz_questions VALUES
(1,1),(1,2),(1,3),(1,4);

INSERT INTO subjects (name) VALUES 
('Java'),
('Python'),
('Database'),
('Computer Networks'),
('Operating System');

INSERT INTO topics (subject_id, name) VALUES
-- Java
(1, 'OOP'),
(1, 'Exception Handling'),

-- Python
(2, 'Basics'),
(2, 'Functions'),

-- Database
(3, 'SQL'),
(3, 'Normalization'),

-- Computer Networks
(4, 'OSI Model'),
(4, 'Protocols'),

-- Operating System
(5, 'Process Management'),
(5, 'Memory Management');


INSERT INTO questions 
(subject_id, topic_id, question, option1, option2, option3, option4, correct_option)
VALUES

-- Java OOP (5 Questions)
(1,1,'Java supports which paradigm?','Procedural','OOP','Functional','All',4),
(1,1,'Which keyword creates object?','new','class','void','this',1),
(1,1,'What is inheritance?','Reuse','Memory','Loop','None',1),
(1,1,'Encapsulation means?','Binding','Loop','Class','None',1),
(1,1,'Polymorphism means?','Many forms','Single form','Loop','None',1),

-- Java Exception Handling (5 Questions)
(1,2,'Which block handles exception?','try','catch','finally','throw',2),
(1,2,'Which keyword throws exception?','throw','throws','final','static',1),
(1,2,'Finally block executes?','Always','Never','Sometimes','Error',1),
(1,2,'Checked exceptions are checked at?','Compile time','Run time','Link time','None',1),
(1,2,'Which class is parent of all exceptions?','Exception','Error','Object','Throwable',4),

-- Python Basics (5 Questions)
(2,3,'Python is which type language?','Compiled','Interpreted','Assembly','Machine',2),
(2,3,'Which symbol is used for comments?','#','//','--','/* */',1),
(2,3,'Python is developed by?','James Gosling','Guido van Rossum','Dennis Ritchie','Bjarne Stroustrup',2),
(2,3,'File extension of Python?','.py','.java','.cpp','.txt',1),
(2,3,'Python is case sensitive?','Yes','No','Maybe','None',1),

-- Python Functions (5 Questions)
(2,4,'Which keyword defines function?','func','def','function','lambda',2),
(2,4,'Lambda is?','Loop','Function','Variable','Class',2),
(2,4,'Function returns value using?','return','break','pass','exit',1),
(2,4,'Default arguments are?','Fixed','Optional','Error','Loop',2),
(2,4,'Recursive function means?','Self calling','Loop','Class','None',1),

-- Database SQL (5 Questions)
(3,5,'Which command retrieves data?','SELECT','INSERT','DELETE','UPDATE',1),
(3,5,'Which clause filters records?','WHERE','GROUP','ORDER','SORT',1),
(3,5,'Primary key is?','Unique','Duplicate','Null','None',1),
(3,5,'Which command deletes table?','DROP','DELETE','REMOVE','CLEAR',1),
(3,5,'Which clause sorts data?','ORDER BY','GROUP BY','WHERE','SORT',1),

-- Database Normalization (5 Questions)
(3,6,'1NF removes?','Redundancy','Duplicates','Nulls','None',2),
(3,6,'BCNF is higher than?','1NF','2NF','3NF','None',3),
(3,6,'2NF removes?','Partial dependency','Full dependency','Transitive','None',1),
(3,6,'3NF removes?','Transitive dependency','Partial','Full','None',1),
(3,6,'Normalization improves?','Data integrity','Speed','UI','None',1),

-- Computer Networks OSI (5 Questions)
(4,7,'OSI has how many layers?','5','6','7','8',3),
(4,7,'Which layer is physical?','1','2','3','4',1),
(4,7,'Transport layer number?','4','3','2','5',1),
(4,7,'Network layer is?','3','4','5','2',1),
(4,7,'Application layer is?','7','6','5','4',1),

-- Computer Networks Protocols (5 Questions)
(4,8,'HTTP stands for?','HyperText Transfer Protocol','High Transfer Text Protocol','Hyper Transfer Text Process','None',1),
(4,8,'FTP is used for?','Mail','File Transfer','Streaming','Gaming',2),
(4,8,'SMTP is used for?','Mail sending','File','Web','Game',1),
(4,8,'DNS resolves?','IP address','URL','File','Mail',1),
(4,8,'TCP is?','Connection oriented','Connectionless','Fast','None',1),

-- Operating System Process (5 Questions)
(5,9,'Process is?','Program in execution','File','Thread','Memory',1),
(5,9,'Scheduler selects?','Process','File','Disk','Memory',1),
(5,9,'PCB stands for?','Process Control Block','Program Control Block','Process Core Block','None',1),
(5,9,'Context switch is?','Process change','Memory change','Disk change','None',1),
(5,9,'Thread is?','Lightweight process','Heavy process','File','None',1),

-- Operating System Memory (5 Questions)
(5,10,'RAM is?','Volatile','Non-volatile','Permanent','None',1),
(5,10,'Paging avoids?','Fragmentation','Crash','Deadlock','Loop',1),
(5,10,'Virtual memory is?','Extension of RAM','Disk','Cache','None',1),
(5,10,'Cache memory is?','Fast','Slow','Large','None',1),
(5,10,'ROM is?','Non-volatile','Volatile','Temporary','None',1);