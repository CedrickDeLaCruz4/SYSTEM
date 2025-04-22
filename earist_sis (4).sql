-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 21, 2025 at 09:16 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `earist_sis`
--

-- --------------------------------------------------------

--
-- Table structure for table `active_school_year_table`
--

CREATE TABLE `active_school_year_table` (
  `id` int(11) NOT NULL,
  `year_id` int(11) DEFAULT NULL,
  `semester_id` int(11) DEFAULT NULL,
  `astatus` int(11) DEFAULT NULL,
  `active` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `active_school_year_table`
--

INSERT INTO `active_school_year_table` (`id`, `year_id`, `semester_id`, `astatus`, `active`) VALUES
(1, 1, 1, 0, 0),
(2, 1, 2, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `course_table`
--

CREATE TABLE `course_table` (
  `course_id` int(11) NOT NULL,
  `course_code` varchar(100) DEFAULT NULL,
  `course_description` varchar(255) DEFAULT NULL,
  `course_unit` int(11) DEFAULT NULL,
  `lab_unit` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course_table`
--

INSERT INTO `course_table` (`course_id`, `course_code`, `course_description`, `course_unit`, `lab_unit`) VALUES
(1, 'GEREADPH', 'Readings in Philippine History', 3, 0),
(2, 'GEUNDETS', 'Understanding the Self', 3, 0),
(3, 'GEARTAPP', 'Art Appreciation', 3, 0),
(4, 'GEPURPCO', 'Purposive Communication', 3, 0),
(5, 'GEKOMFIL', 'Kontekstwalisadong Komunikasyon sa Filipino', 3, 0),
(6, 'INTCOMLC', 'Introduction to Computing (Lecture)', 2, 0),
(7, 'INTCOMLB', 'Introduction to Computing (Laboratory)', 0, 1),
(8, 'FPROGLEC', 'Computer Programming 1 (Lecture)', 2, 0),
(9, 'FPROGLAB', 'Computer Programming 1 (Laboratory)', 0, 1),
(10, 'GEPEMOVE', 'Movement Enhancement', 2, 0),
(11, 'NSTPCTS1', 'National Service Training Program 1', 3, 0),
(12, 'GEMATHMW', 'Mathematics in the Modern World', 3, 0),
(13, 'GESCIETS', 'Science, Technology and Society', 3, 0),
(14, 'GEFILDIS', 'Filipino sa Iba’t-Ibang Disiplina', 3, 0),
(15, 'GEPANIPI', 'Panitikan sa Pilipinas', 3, 0),
(16, 'IPROGLEC', 'Computer Programming 2 (Lecture)', 2, 0),
(17, 'IPROGLAB', 'Computer Programming 2 (Laboratory)', 0, 1),
(18, 'DISCMATH', 'Discrete Mathematics', 3, 0),
(19, 'DBMSLEC1', 'Database Management System 1 (Lecture)', 2, 0),
(20, 'DBMSLAB1', 'Database Management System 1 (Laboratory)', 0, 1),
(21, 'GEPEFITE', 'Fitness Exercise', 2, 0),
(22, 'NSTPCTS2', 'National Service Training Program 2', 3, 0),
(23, 'GEETHICS', 'Ethics', 3, 0),
(24, 'DSALGLEC', 'Data Structures and Algorithm 1 (Lecture)', 2, 0),
(25, 'DSALGLAB', 'Data Structures and Algorithm 1 (Laboratory)', 0, 1),
(26, 'INFMGTLC', 'Information Management (Lecture)', 2, 0),
(27, 'INFMGTLB', 'Information Management (Laboratory)', 0, 1),
(28, 'PTECHLEC', 'Platform Technologies (Lecture)', 2, 0),
(29, 'PTECHLAB', 'Platform Technologies (Laboratory)', 0, 1),
(30, 'WEBDVLC1', 'Web Development 1 (Lecture)', 2, 0),
(31, 'WEBDVLB1', 'Web Development 1 (Laboratory)', 0, 1),
(32, 'BUSANALY', 'Business Analytics', 3, 0),
(33, 'GEPEHEF1', 'Physical Activity Towards Health and Fitness 1', 2, 0),
(34, 'GEELECCP', 'Communicative Proficiency in Business Writing', 3, 0),
(35, 'DBMSLEC2', 'Database Management System 2 (Lecture)', 2, 0),
(36, 'DBMSLAB2', 'Database Management System 2 (Laboratory)', 0, 1),
(37, 'INTHCILC', 'Introduction to Human-Computer Interaction (Lecture)', 2, 0),
(38, 'INTHCILB', 'Introduction to Human-Computer Interaction (Laboratory)', 0, 1),
(39, 'NETWKLC1', 'Networking 1 (Lecture)', 2, 0),
(40, 'NETWKLB1', 'Networking 1 (Laboratory)', 0, 1),
(41, 'WEBDVLC2', 'Web Development 2 (Lecture)', 2, 0),
(42, 'WEBDVLB2', 'Web Development 2 (Laboratory)', 0, 1),
(43, 'IPATLEC1', 'Integrative Programming and Technologies 1 (Lecture)', 2, 0),
(44, 'IPATLAB1', 'Integrative Programming and Technologies 1 (Laboratory)', 0, 1),
(45, 'GEPEHEF2', 'Physical Activity Towards Health and Fitness 2', 2, 0),
(46, 'GEELECDS', 'Practical Data Science', 3, 0),
(47, 'WEBDVLC3', 'Web Development 3 (Lecture)', 2, 0),
(48, 'WEBDVLB3', 'Web Development 3 (Laboratory)', 0, 1),
(49, 'MMDIALEC', 'Multimedia (Lecture)', 2, 0),
(50, 'MMDIALAB', 'Multimedia (Laboratory)', 0, 1),
(51, 'SYSARCH1', 'Systems Integration and Architecture 1 (Lecture)', 2, 0),
(52, 'SYSARLB1', 'Systems Integration and Architecture 1 (Laboratory)', 0, 1),
(53, 'APDEVLEC', 'Application Development and Emerging Tech (Lecture)', 2, 0),
(54, 'APDEVLAB', 'Application Development and Emerging Tech (Lab)', 0, 1),
(55, 'NETWKLC2', 'Networking 2 (Lecture)', 2, 0),
(56, 'NETWKLB2', 'Networking 2 (Laboratory)', 0, 1),
(57, 'GELIFEWR', 'Life and Works of Rizal', 3, 0),
(58, 'GEELECES', 'Environmental Science', 3, 0),
(59, 'QUANMETH', 'Quantitative Methods', 3, 0),
(60, 'ITTHESI1', 'Research 1', 3, 0),
(61, 'MOBAPLEC', 'Mobile App Development (Lecture)', 2, 0),
(62, 'MOBAPLAB', 'Mobile App Development (Laboratory)', 0, 1),
(63, 'OOPRGLEC', 'Object-Oriented Programming (Lecture)', 2, 0),
(64, 'OOPRGLAB', 'Object-Oriented Programming (Laboratory)', 0, 1),
(65, 'IAASLEC1', 'Information Assurance and Security 1 (Lecture)', 2, 0),
(66, 'IAASLAB1', 'Information Assurance and Security 1 (Laboratory)', 0, 1),
(67, 'GECONTWO', 'Contemporary World', 3, 0),
(68, 'SYSARCH2', 'Systems Integration and Architecture 2 (Lecture)', 2, 0),
(69, 'SYSARLB2', 'Systems Integration and Architecture 2 (Laboratory)', 0, 1),
(70, 'ITTHESI2', 'Research 2 (Lecture)', 2, 0),
(71, 'ITTHESL2', 'Research 2 (Laboratory)', 0, 1),
(72, 'IAASLEC2', 'Information Assurance and Security 2 (Lecture)', 2, 0),
(73, 'IAASLAB2', 'Information Assurance and Security 2 (Laboratory)', 0, 1),
(74, 'SYSADMLC', 'Systems Administration and Maintenance (Lecture)', 2, 0),
(75, 'SYSADMLB', 'Systems Administration and Maintenance (Laboratory)', 0, 1),
(76, 'SPISSUES', 'Social and Professional Issues', 3, 0),
(77, 'ITINTERN', 'Practicum / Internship', 10, 0);

-- --------------------------------------------------------

--
-- Table structure for table `curriculum_table`
--

CREATE TABLE `curriculum_table` (
  `curriculum_id` int(11) NOT NULL,
  `year_id` int(11) DEFAULT NULL,
  `program_id` int(11) DEFAULT NULL,
  `lock_status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `curriculum_table`
--

INSERT INTO `curriculum_table` (`curriculum_id`, `year_id`, `program_id`, `lock_status`) VALUES
(1, 1, 12, 0),
(2, 1, 11, 0);

-- --------------------------------------------------------

--
-- Table structure for table `dprtmnt_curriculum_table`
--

CREATE TABLE `dprtmnt_curriculum_table` (
  `dprtmnt_curriculum_id` int(11) NOT NULL,
  `dprtmnt_id` int(11) DEFAULT NULL,
  `curriculum_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dprtmnt_curriculum_table`
--

INSERT INTO `dprtmnt_curriculum_table` (`dprtmnt_curriculum_id`, `dprtmnt_id`, `curriculum_id`) VALUES
(1, 5, 1),
(2, 5, 2);

-- --------------------------------------------------------

--
-- Table structure for table `dprtmnt_profs_table`
--

CREATE TABLE `dprtmnt_profs_table` (
  `dprtmnt_profs_id` int(11) NOT NULL,
  `dprtmnt_id` int(11) DEFAULT NULL,
  `prof_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dprtmnt_profs_table`
--

INSERT INTO `dprtmnt_profs_table` (`dprtmnt_profs_id`, `dprtmnt_id`, `prof_id`) VALUES
(1, 5, 1),
(2, 5, 2),
(3, 2, 3),
(4, 1, 4),
(5, 3, 5);

-- --------------------------------------------------------

--
-- Table structure for table `dprtmnt_room_table`
--

CREATE TABLE `dprtmnt_room_table` (
  `dprtmnt_room_id` int(11) NOT NULL,
  `dprtmnt_id` int(11) DEFAULT NULL,
  `room_id` int(11) DEFAULT NULL,
  `lock_status` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dprtmnt_room_table`
--

INSERT INTO `dprtmnt_room_table` (`dprtmnt_room_id`, `dprtmnt_id`, `room_id`, `lock_status`) VALUES
(1, 5, 1, 1),
(2, 5, 2, 1),
(3, 5, 3, 1),
(4, 5, 4, 1),
(5, 5, 5, 1),
(6, 2, 6, 1),
(7, 2, 7, 1);

-- --------------------------------------------------------

--
-- Table structure for table `dprtmnt_section_table`
--

CREATE TABLE `dprtmnt_section_table` (
  `id` int(11) NOT NULL,
  `curriculum_id` int(11) DEFAULT NULL,
  `section_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dprtmnt_section_table`
--

INSERT INTO `dprtmnt_section_table` (`id`, `curriculum_id`, `section_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 1, 6),
(7, 1, 7);

-- --------------------------------------------------------

--
-- Table structure for table `dprtmnt_table`
--

CREATE TABLE `dprtmnt_table` (
  `dprtmnt_id` int(11) NOT NULL,
  `dprtmnt_name` varchar(255) DEFAULT NULL,
  `dprtmnt_code` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dprtmnt_table`
--

INSERT INTO `dprtmnt_table` (`dprtmnt_id`, `dprtmnt_name`, `dprtmnt_code`) VALUES
(1, 'College of Architecture and Fine Arts', 'CAFA'),
(2, 'College of Arts and Sciences', 'CAS'),
(3, 'College of Business and Public Administration', 'CBPA'),
(4, 'College of Criminal Justice Education', 'CCJE'),
(5, 'College of Computing Studies', 'CCS'),
(6, 'College of Education', 'CED'),
(7, 'College of Engineering', 'CEN'),
(8, 'College of Hospitality and Tourism Management', 'CHTM'),
(9, 'College of Industrial Technology', 'CIT');

-- --------------------------------------------------------

--
-- Table structure for table `enrolled_subject`
--

CREATE TABLE `enrolled_subject` (
  `id` int(11) NOT NULL,
  `curriculum_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `student_number` int(11) DEFAULT NULL,
  `active_school_year_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enrolled_subject`
--

INSERT INTO `enrolled_subject` (`id`, `curriculum_id`, `course_id`, `student_number`, `active_school_year_id`) VALUES
(13, 1, 6, 1, NULL),
(14, 1, 7, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `prof_table`
--

CREATE TABLE `prof_table` (
  `prof_id` int(11) NOT NULL,
  `fname` varchar(100) DEFAULT NULL,
  `mname` varchar(100) DEFAULT NULL,
  `lname` varchar(100) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 0 CHECK (`status` in (0,1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prof_table`
--

INSERT INTO `prof_table` (`prof_id`, `fname`, `mname`, `lname`, `email`, `password`, `status`) VALUES
(1, 'Anna', 'G.', 'Santos', 'anna.santos@example.com', 'pass123', 0),
(2, 'Mark', 'T.', 'Lopez', 'mark.lopez@example.com', 'secret', 0),
(3, 'Jenny', 'M.', 'Reyes', 'jenny.reyes@example.com', 'admin', 0),
(4, 'Carlos', 'D.', 'Martinez', 'carlos.martinez@example.com', 'pw2023', 0),
(5, 'Liza', 'A.', 'Cruz', 'liza.cruz@example.com', 'teachme', 0);

-- --------------------------------------------------------

--
-- Table structure for table `program_table`
--

CREATE TABLE `program_table` (
  `program_id` int(11) NOT NULL,
  `program_description` varchar(255) DEFAULT NULL,
  `program_code` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `program_table`
--

INSERT INTO `program_table` (`program_id`, `program_description`, `program_code`) VALUES
(1, 'Bachelor of Science in Architecture', 'BS ARCHI.'),
(2, 'Bachelor of Science in Interior Design', 'BSID'),
(3, 'Bachelor in Fine Arts Major in Painting', 'BFA-PAINT'),
(4, 'Bachelor in Fine Arts Major in Visual Communication', 'BFA-VISCOM'),
(5, 'Bachelor of Science in Applied Physics with Computer Science Emphasis', 'BSAP'),
(6, 'Bachelor of Science in Psychology', 'BSPSYCH'),
(7, 'Bachelor of Science in Mathematics', 'BSMATH'),
(8, 'Bachelor of Science in Business Administration Major in Marketing Management', 'BSBA-MM'),
(9, 'Bachelor of Science in Business Administration Major in HR Development Management', 'BSBA-HRDM'),
(10, 'Bachelor of Science in Entrepreneurship', 'BSEM'),
(11, 'Bachelor of Science in Office Administration', 'BSOA'),
(12, 'Bachelor of Science in Criminology', 'BSCRIM'),
(13, 'Bachelor of Science in Computer Science', 'BSCS'),
(14, 'Bachelor of Science in Information Technology', 'BS INFO. TECH.'),
(15, 'Bachelor in Secondary Education Major in Science', 'BSE-SCI'),
(16, 'Bachelor in Secondary Education Major in Mathematics', 'BSE-MATH'),
(17, 'Bachelor in Secondary Education Major in Filipino', 'BSE-FIL'),
(18, 'Bachelor in Special Needs Education', 'BSNEd'),
(19, 'Bachelor in Technology and Livelihood Education Major in Home Economics', 'BTLE-HE'),
(20, 'Bachelor in Technology and Livelihood Education Major in Industrial Arts', 'BTLE-IA'),
(21, 'Professional Education Subjects (TCP)', 'TCP'),
(22, 'Bachelor in Public Administration', 'BPA'),
(23, 'Bachelor of Science in Chemical Engineering', 'BSCHE'),
(24, 'Bachelor of Science in Civil Engineering', 'BSCE'),
(25, 'Bachelor of Science in Electrical Engineering', 'BSEE'),
(26, 'Bachelor of Science in Electronics and Communication Engineering', 'BSECE'),
(27, 'Bachelor of Science in Mechanical Engineering', 'BSME'),
(28, 'Bachelor of Science in Computer Engineering', 'BSCOE'),
(29, 'Bachelor of Science in Tourism Management', 'BST'),
(30, 'Bachelor of Science in Hospitality Management', 'BSHM'),
(31, 'Bachelor of Science in Industrial Technology Major in Automotive Technology', 'BSIT-AUTO'),
(32, 'Bachelor of Science in Industrial Technology Major in Electrical Technology', 'BSIT-ELEC'),
(33, 'Bachelor of Science in Industrial Technology Major in Electronics Technology', 'BSIT-ET'),
(34, 'Bachelor of Science in Industrial Technology Major in Food Technology', 'BSIT-FOOD'),
(35, 'Bachelor of Science in Industrial Technology Major in Fashion and Apparel Technology', 'BSIT-FASHION'),
(36, 'Bachelor of Science in Industrial Technology Major in Industrial Chemistry', 'BSIT-CHEM'),
(37, 'Bachelor of Science in Industrial Technology Major in Drafting Technology', 'BSIT-DRAFT'),
(38, 'Bachelor of Science in Industrial Technology Major in Machine Shop Technology', 'BSIT-MECH'),
(39, 'Bachelor of Science in Industrial Technology Major in Refrigeration and Air Conditioning', 'BSIT-RAC');

-- --------------------------------------------------------

--
-- Table structure for table `program_tagging_table`
--

CREATE TABLE `program_tagging_table` (
  `program_tagging_id` int(11) NOT NULL,
  `curriculum_id` int(11) DEFAULT NULL,
  `year_level_id` int(11) DEFAULT NULL,
  `semester_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `program_tagging_table`
--

INSERT INTO `program_tagging_table` (`program_tagging_id`, `curriculum_id`, `year_level_id`, `semester_id`, `course_id`) VALUES
(1, 1, 1, 1, 1),
(2, 1, 1, 1, 2),
(3, 1, 1, 1, 3),
(4, 1, 1, 1, 4),
(5, 1, 1, 1, 5),
(6, 1, 1, 1, 6),
(7, 1, 1, 1, 7),
(8, 1, 1, 1, 8),
(9, 1, 1, 1, 9),
(10, 1, 1, 1, 10),
(11, 1, 1, 1, 11),
(12, 1, 1, 2, 12),
(13, 1, 1, 2, 13),
(14, 1, 1, 2, 14),
(15, 1, 1, 2, 15),
(16, 1, 1, 2, 16),
(17, 1, 1, 2, 17),
(18, 1, 1, 2, 18),
(19, 1, 1, 2, 19),
(20, 1, 1, 2, 20);

-- --------------------------------------------------------

--
-- Table structure for table `room_table`
--

CREATE TABLE `room_table` (
  `room_id` int(11) NOT NULL,
  `room_description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `room_table`
--

INSERT INTO `room_table` (`room_id`, `room_description`) VALUES
(1, 'CCS Room 201'),
(2, 'CCS Room 202'),
(3, 'CCS Room 301'),
(4, 'CCS Room 302'),
(5, 'CCS Room 303'),
(6, 'CAS Room 404'),
(7, 'CAS Room 405');

-- --------------------------------------------------------

--
-- Table structure for table `section_table`
--

CREATE TABLE `section_table` (
  `id` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `section_table`
--

INSERT INTO `section_table` (`id`, `description`) VALUES
(1, '1A'),
(2, '1B'),
(3, '1C'),
(4, '2A'),
(5, '2B'),
(6, '2C'),
(7, '3A'),
(8, '3B'),
(9, '3C'),
(10, '4A'),
(11, '4B'),
(12, '4C');

-- --------------------------------------------------------

--
-- Table structure for table `semester_table`
--

CREATE TABLE `semester_table` (
  `semester_id` int(11) NOT NULL,
  `semester_description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `semester_table`
--

INSERT INTO `semester_table` (`semester_id`, `semester_description`) VALUES
(1, '1st Semester'),
(2, '2nd Semester'),
(3, 'Summer');

-- --------------------------------------------------------

--
-- Table structure for table `student_curriculum_table`
--

CREATE TABLE `student_curriculum_table` (
  `id` int(11) NOT NULL,
  `student_numbering_id` int(11) DEFAULT NULL,
  `curriculum_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_curriculum_table`
--

INSERT INTO `student_curriculum_table` (`id`, `student_numbering_id`, `curriculum_id`) VALUES
(5, 1, 1),
(6, 2, 1),
(7, 3, 2);

-- --------------------------------------------------------

--
-- Table structure for table `student_numbering_table`
--

CREATE TABLE `student_numbering_table` (
  `id` int(11) NOT NULL,
  `person_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_numbering_table`
--

INSERT INTO `student_numbering_table` (`id`, `person_id`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4);

-- --------------------------------------------------------

--
-- Table structure for table `year_level_table`
--

CREATE TABLE `year_level_table` (
  `year_level_id` int(11) NOT NULL,
  `year_level_description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `year_level_table`
--

INSERT INTO `year_level_table` (`year_level_id`, `year_level_description`) VALUES
(1, '1st Year'),
(2, '2nd Year'),
(3, '3rd Year'),
(4, '4th Year');

-- --------------------------------------------------------

--
-- Table structure for table `year_table`
--

CREATE TABLE `year_table` (
  `year_id` int(11) NOT NULL,
  `year_description` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `year_table`
--

INSERT INTO `year_table` (`year_id`, `year_description`, `status`) VALUES
(1, '2021', 0),
(2, '2022', 0),
(3, '2023', 0),
(4, '2024', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `active_school_year_table`
--
ALTER TABLE `active_school_year_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `year_id` (`year_id`),
  ADD KEY `semester_id` (`semester_id`);

--
-- Indexes for table `course_table`
--
ALTER TABLE `course_table`
  ADD PRIMARY KEY (`course_id`);

--
-- Indexes for table `curriculum_table`
--
ALTER TABLE `curriculum_table`
  ADD PRIMARY KEY (`curriculum_id`),
  ADD KEY `year_id` (`year_id`),
  ADD KEY `program_id` (`program_id`);

--
-- Indexes for table `dprtmnt_curriculum_table`
--
ALTER TABLE `dprtmnt_curriculum_table`
  ADD PRIMARY KEY (`dprtmnt_curriculum_id`),
  ADD KEY `dprtmnt_id` (`dprtmnt_id`),
  ADD KEY `curriculum_id` (`curriculum_id`);

--
-- Indexes for table `dprtmnt_profs_table`
--
ALTER TABLE `dprtmnt_profs_table`
  ADD PRIMARY KEY (`dprtmnt_profs_id`),
  ADD KEY `dprtmnt_id` (`dprtmnt_id`),
  ADD KEY `prof_id` (`prof_id`);

--
-- Indexes for table `dprtmnt_room_table`
--
ALTER TABLE `dprtmnt_room_table`
  ADD PRIMARY KEY (`dprtmnt_room_id`),
  ADD KEY `dprtmnt_id` (`dprtmnt_id`),
  ADD KEY `room_id` (`room_id`);

--
-- Indexes for table `dprtmnt_section_table`
--
ALTER TABLE `dprtmnt_section_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `curriculum_id` (`curriculum_id`),
  ADD KEY `section_id` (`section_id`);

--
-- Indexes for table `dprtmnt_table`
--
ALTER TABLE `dprtmnt_table`
  ADD PRIMARY KEY (`dprtmnt_id`);

--
-- Indexes for table `enrolled_subject`
--
ALTER TABLE `enrolled_subject`
  ADD PRIMARY KEY (`id`),
  ADD KEY `curriculum_id` (`curriculum_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `fk_enrolled_student_number` (`student_number`),
  ADD KEY `fk_enrolled_active_school_year` (`active_school_year_id`);

--
-- Indexes for table `prof_table`
--
ALTER TABLE `prof_table`
  ADD PRIMARY KEY (`prof_id`);

--
-- Indexes for table `program_table`
--
ALTER TABLE `program_table`
  ADD PRIMARY KEY (`program_id`);

--
-- Indexes for table `program_tagging_table`
--
ALTER TABLE `program_tagging_table`
  ADD PRIMARY KEY (`program_tagging_id`),
  ADD KEY `curriculum_id` (`curriculum_id`),
  ADD KEY `year_level_id` (`year_level_id`),
  ADD KEY `semester_id` (`semester_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `room_table`
--
ALTER TABLE `room_table`
  ADD PRIMARY KEY (`room_id`);

--
-- Indexes for table `section_table`
--
ALTER TABLE `section_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `semester_table`
--
ALTER TABLE `semester_table`
  ADD PRIMARY KEY (`semester_id`);

--
-- Indexes for table `student_curriculum_table`
--
ALTER TABLE `student_curriculum_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_numbering_id` (`student_numbering_id`),
  ADD KEY `curriculum_id` (`curriculum_id`);

--
-- Indexes for table `student_numbering_table`
--
ALTER TABLE `student_numbering_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `person_id` (`person_id`);

--
-- Indexes for table `year_level_table`
--
ALTER TABLE `year_level_table`
  ADD PRIMARY KEY (`year_level_id`);

--
-- Indexes for table `year_table`
--
ALTER TABLE `year_table`
  ADD PRIMARY KEY (`year_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `active_school_year_table`
--
ALTER TABLE `active_school_year_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `course_table`
--
ALTER TABLE `course_table`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `curriculum_table`
--
ALTER TABLE `curriculum_table`
  MODIFY `curriculum_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `dprtmnt_curriculum_table`
--
ALTER TABLE `dprtmnt_curriculum_table`
  MODIFY `dprtmnt_curriculum_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `dprtmnt_profs_table`
--
ALTER TABLE `dprtmnt_profs_table`
  MODIFY `dprtmnt_profs_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `dprtmnt_room_table`
--
ALTER TABLE `dprtmnt_room_table`
  MODIFY `dprtmnt_room_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `dprtmnt_section_table`
--
ALTER TABLE `dprtmnt_section_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `dprtmnt_table`
--
ALTER TABLE `dprtmnt_table`
  MODIFY `dprtmnt_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `enrolled_subject`
--
ALTER TABLE `enrolled_subject`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `prof_table`
--
ALTER TABLE `prof_table`
  MODIFY `prof_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `program_table`
--
ALTER TABLE `program_table`
  MODIFY `program_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `program_tagging_table`
--
ALTER TABLE `program_tagging_table`
  MODIFY `program_tagging_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `room_table`
--
ALTER TABLE `room_table`
  MODIFY `room_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `section_table`
--
ALTER TABLE `section_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `semester_table`
--
ALTER TABLE `semester_table`
  MODIFY `semester_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `student_curriculum_table`
--
ALTER TABLE `student_curriculum_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `student_numbering_table`
--
ALTER TABLE `student_numbering_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `year_level_table`
--
ALTER TABLE `year_level_table`
  MODIFY `year_level_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `year_table`
--
ALTER TABLE `year_table`
  MODIFY `year_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `active_school_year_table`
--
ALTER TABLE `active_school_year_table`
  ADD CONSTRAINT `active_school_year_table_ibfk_1` FOREIGN KEY (`year_id`) REFERENCES `year_table` (`year_id`),
  ADD CONSTRAINT `active_school_year_table_ibfk_2` FOREIGN KEY (`semester_id`) REFERENCES `semester_table` (`semester_id`);

--
-- Constraints for table `curriculum_table`
--
ALTER TABLE `curriculum_table`
  ADD CONSTRAINT `curriculum_table_ibfk_1` FOREIGN KEY (`year_id`) REFERENCES `year_table` (`year_id`),
  ADD CONSTRAINT `curriculum_table_ibfk_2` FOREIGN KEY (`program_id`) REFERENCES `program_table` (`program_id`);

--
-- Constraints for table `dprtmnt_curriculum_table`
--
ALTER TABLE `dprtmnt_curriculum_table`
  ADD CONSTRAINT `dprtmnt_curriculum_table_ibfk_1` FOREIGN KEY (`dprtmnt_id`) REFERENCES `dprtmnt_table` (`dprtmnt_id`),
  ADD CONSTRAINT `dprtmnt_curriculum_table_ibfk_2` FOREIGN KEY (`curriculum_id`) REFERENCES `curriculum_table` (`curriculum_id`);

--
-- Constraints for table `dprtmnt_profs_table`
--
ALTER TABLE `dprtmnt_profs_table`
  ADD CONSTRAINT `dprtmnt_profs_table_ibfk_1` FOREIGN KEY (`dprtmnt_id`) REFERENCES `dprtmnt_table` (`dprtmnt_id`),
  ADD CONSTRAINT `dprtmnt_profs_table_ibfk_2` FOREIGN KEY (`prof_id`) REFERENCES `prof_table` (`prof_id`);

--
-- Constraints for table `dprtmnt_room_table`
--
ALTER TABLE `dprtmnt_room_table`
  ADD CONSTRAINT `dprtmnt_room_table_ibfk_1` FOREIGN KEY (`dprtmnt_id`) REFERENCES `dprtmnt_table` (`dprtmnt_id`),
  ADD CONSTRAINT `dprtmnt_room_table_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `room_table` (`room_id`);

--
-- Constraints for table `dprtmnt_section_table`
--
ALTER TABLE `dprtmnt_section_table`
  ADD CONSTRAINT `dprtmnt_section_table_ibfk_1` FOREIGN KEY (`curriculum_id`) REFERENCES `curriculum_table` (`curriculum_id`),
  ADD CONSTRAINT `dprtmnt_section_table_ibfk_2` FOREIGN KEY (`section_id`) REFERENCES `section_table` (`id`);

--
-- Constraints for table `enrolled_subject`
--
ALTER TABLE `enrolled_subject`
  ADD CONSTRAINT `enrolled_subject_ibfk_1` FOREIGN KEY (`curriculum_id`) REFERENCES `curriculum_table` (`curriculum_id`),
  ADD CONSTRAINT `enrolled_subject_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course_table` (`course_id`),
  ADD CONSTRAINT `fk_enrolled_active_school_year` FOREIGN KEY (`active_school_year_id`) REFERENCES `active_school_year_table` (`id`),
  ADD CONSTRAINT `fk_enrolled_student_number` FOREIGN KEY (`student_number`) REFERENCES `student_numbering_table` (`id`);

--
-- Constraints for table `program_tagging_table`
--
ALTER TABLE `program_tagging_table`
  ADD CONSTRAINT `program_tagging_ibfk_1` FOREIGN KEY (`curriculum_id`) REFERENCES `curriculum_table` (`curriculum_id`),
  ADD CONSTRAINT `program_tagging_ibfk_2` FOREIGN KEY (`year_level_id`) REFERENCES `year_level_table` (`year_level_id`),
  ADD CONSTRAINT `program_tagging_ibfk_3` FOREIGN KEY (`semester_id`) REFERENCES `semester_table` (`semester_id`),
  ADD CONSTRAINT `program_tagging_ibfk_4` FOREIGN KEY (`course_id`) REFERENCES `course_table` (`course_id`);

--
-- Constraints for table `student_curriculum_table`
--
ALTER TABLE `student_curriculum_table`
  ADD CONSTRAINT `student_curriculum_table_ibfk_1` FOREIGN KEY (`student_numbering_id`) REFERENCES `student_numbering_table` (`id`),
  ADD CONSTRAINT `student_curriculum_table_ibfk_2` FOREIGN KEY (`curriculum_id`) REFERENCES `curriculum_table` (`curriculum_id`);

--
-- Constraints for table `student_numbering_table`
--
ALTER TABLE `student_numbering_table`
  ADD CONSTRAINT `student_numbering_table_ibfk_1` FOREIGN KEY (`person_id`) REFERENCES `enrollment`.`person_table` (`person_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
