-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 08, 2025 at 05:17 AM
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
-- Table structure for table `course_table`
--

CREATE TABLE `course_table` (
  `course_id` int(11) NOT NULL,
  `course_code` varchar(100) DEFAULT NULL,
  `course_description` varchar(255) DEFAULT NULL,
  `course_unit` int(11) DEFAULT NULL,
  `lab_unit` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `curriculum_table`
--

CREATE TABLE `curriculum_table` (
  `curriculum_id` int(11) NOT NULL,
  `year_id` int(11) DEFAULT NULL,
  `program_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dprtmnt_curriculum_table`
--

CREATE TABLE `dprtmnt_curriculum_table` (
  `dprtmnt_curriculum_id` int(11) NOT NULL,
  `dprtmnt_id` int(11) DEFAULT NULL,
  `curriculum_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dprtmnt_profs_table`
--

CREATE TABLE `dprtmnt_profs_table` (
  `dprtmnt_profs_id` int(11) NOT NULL,
  `dprtmnt_id` int(11) DEFAULT NULL,
  `prof_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Table structure for table `dprtmnt_table`
--

CREATE TABLE `dprtmnt_table` (
  `dprtmnt_id` int(11) NOT NULL,
  `dprtmnt_name` varchar(255) DEFAULT NULL,
  `dprtmnt_code` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `prof_table`
--

CREATE TABLE `prof_table` (
  `prof_id` int(11) NOT NULL,
  `fname` varchar(100) DEFAULT NULL,
  `mname` varchar(100) DEFAULT NULL,
  `lname` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 0 CHECK (`status` in (0,1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `program_table`
--

CREATE TABLE `program_table` (
  `program_id` int(11) NOT NULL,
  `program_description` varchar(255) DEFAULT NULL,
  `program_code` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Table structure for table `room_table`
--

CREATE TABLE `room_table` (
  `room_id` int(11) NOT NULL,
  `room_description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `semester_table`
--

CREATE TABLE `semester_table` (
  `semester_id` int(11) NOT NULL,
  `semester_description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `year_level_table`
--

CREATE TABLE `year_level_table` (
  `year_level_id` int(11) NOT NULL,
  `year_level_description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Indexes for dumped tables
--

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
-- Indexes for table `dprtmnt_table`
--
ALTER TABLE `dprtmnt_table`
  ADD PRIMARY KEY (`dprtmnt_id`);

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
-- Indexes for table `semester_table`
--
ALTER TABLE `semester_table`
  ADD PRIMARY KEY (`semester_id`);

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
-- AUTO_INCREMENT for table `course_table`
--
ALTER TABLE `course_table`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `curriculum_table`
--
ALTER TABLE `curriculum_table`
  MODIFY `curriculum_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dprtmnt_curriculum_table`
--
ALTER TABLE `dprtmnt_curriculum_table`
  MODIFY `dprtmnt_curriculum_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dprtmnt_profs_table`
--
ALTER TABLE `dprtmnt_profs_table`
  MODIFY `dprtmnt_profs_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dprtmnt_room_table`
--
ALTER TABLE `dprtmnt_room_table`
  MODIFY `dprtmnt_room_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dprtmnt_table`
--
ALTER TABLE `dprtmnt_table`
  MODIFY `dprtmnt_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `prof_table`
--
ALTER TABLE `prof_table`
  MODIFY `prof_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `program_table`
--
ALTER TABLE `program_table`
  MODIFY `program_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `program_tagging_table`
--
ALTER TABLE `program_tagging_table`
  MODIFY `program_tagging_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `room_table`
--
ALTER TABLE `room_table`
  MODIFY `room_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `semester_table`
--
ALTER TABLE `semester_table`
  MODIFY `semester_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `year_level_table`
--
ALTER TABLE `year_level_table`
  MODIFY `year_level_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `year_table`
--
ALTER TABLE `year_table`
  MODIFY `year_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

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
-- Constraints for table `program_tagging_table`
--
ALTER TABLE `program_tagging_table`
  ADD CONSTRAINT `program_tagging_ibfk_1` FOREIGN KEY (`curriculum_id`)
REFERENCES `curriculum_table` (`curriculum_id`),
  ADD CONSTRAINT `program_tagging_ibfk_2` FOREIGN KEY (`year_level_id`) REFERENCES `year_level_table` (`year_level_id`),
  ADD CONSTRAINT `program_tagging_ibfk_3` FOREIGN KEY (`semester_id`) REFERENCES `semester_table` (`semester_id`),
  ADD CONSTRAINT `program_tagging_ibfk_4` FOREIGN KEY (`course_id`) REFERENCES `course_table` (`course_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
