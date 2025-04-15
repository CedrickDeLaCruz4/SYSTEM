-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 02, 2025 at 12:41 PM
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
-- Database: `admission`
--

-- --------------------------------------------------------

--
-- Table structure for table `admission_requirement`
--

CREATE TABLE `admission_requirement` (
  `requirements_id` int(11) NOT NULL,
  `requirements_description` varchar(500) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `admission_requirement`
--

INSERT INTO `admission_requirement` (`requirements_id`, `requirements_description`, `image_path`) VALUES
(1, 'Original and Photocopy of high school report card (form 138) duly signed by the school Principal and/or Registrar', '/uploads/1742451253156-396258677_1054941569018505_3459809278394292113_n.png'),
(2, 'Original and Photocopy of Certificate of Good Moral Character', NULL),
(3, 'Original and Photocopy of NSO Birth Certificate', '/uploads/1742451275906-826785b8445e64de2be00c01f40cc12e.jpg'),
(4, 'Recent One (1) piece 1x1 picture(white background)', '/uploads/1742451480560-826785b8445e64de2be00c01f40cc12e.jpg'),
(5, 'Certification from School Principal and/or Registrar with School\'s dry seal that no copy of applicant\'s form 137 has been sent to other College or University', NULL),
(6, 'Notarized Affidavit that the applicant did not enroll in any College or University within and/or outside the country with (waiver) that if there is concealment of previous enrollment, the City of Malabon University enrollment shall be null and void', '/uploads/1742451510115-b0c6d84cd8cb71ee4cca35dfd27d24f0.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `applicant_requirements`
--

CREATE TABLE `applicant_requirements` (
  `id` int(11) NOT NULL,
  `person_id` int(11) NOT NULL,
  `student_requirement_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `applicant_table`
--

CREATE TABLE `applicant_table` (
  `id` int(11) NOT NULL,
  `campus` varchar(255) DEFAULT NULL,
  `academicProgram` varchar(255) DEFAULT NULL,
  `classifiedAs` varchar(255) DEFAULT NULL,
  `program` varchar(255) DEFAULT NULL,
  `yearLevel` varchar(50) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `middleName` varchar(255) DEFAULT NULL,
  `extension` varchar(50) DEFAULT NULL,
  `nickname` varchar(100) DEFAULT NULL,
  `height` decimal(5,2) DEFAULT NULL,
  `weight` decimal(5,2) DEFAULT NULL,
  `lrnNumber` varchar(50) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `birthOfDate` varchar(50) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `birthPlace` varchar(255) DEFAULT NULL,
  `languageDialectSpoken` varchar(255) DEFAULT NULL,
  `citizenship` varchar(100) DEFAULT NULL,
  `religion` varchar(100) DEFAULT NULL,
  `civilStatus` varchar(50) DEFAULT NULL,
  `tribeEthnicGroup` varchar(100) DEFAULT NULL,
  `cellphoneNumber` varchar(20) DEFAULT NULL,
  `emailAddress` varchar(255) DEFAULT NULL,
  `telephoneNumber` varchar(20) DEFAULT NULL,
  `facebookAccount` varchar(255) DEFAULT NULL,
  `presentAddress` text DEFAULT NULL,
  `permanentAddress` text DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `barangay` varchar(255) DEFAULT NULL,
  `zipCode` varchar(20) DEFAULT NULL,
  `region` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `municipality` varchar(255) DEFAULT NULL,
  `dswdHouseholdNumber` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `educational_attainment_table`
--

CREATE TABLE `educational_attainment_table` (
  `id` int(11) NOT NULL,
  `schoolLevel` varchar(50) DEFAULT NULL,
  `schoolLastAttended` varchar(255) DEFAULT NULL,
  `schoolAddress` varchar(255) DEFAULT NULL,
  `courseProgram` varchar(255) DEFAULT NULL,
  `honor` varchar(255) DEFAULT NULL,
  `generalAverage` varchar(10) DEFAULT NULL,
  `yearGraduated` varchar(4) DEFAULT NULL,
  `strand` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `family_background_table`
--

CREATE TABLE `family_background_table` (
  `id` int(11) NOT NULL,
  `solo_parent` tinyint(1) DEFAULT NULL,
  `father_deceased` tinyint(1) DEFAULT NULL,
  `father_family_name` varchar(100) DEFAULT NULL,
  `father_given_name` varchar(100) DEFAULT NULL,
  `father_middle_name` varchar(100) DEFAULT NULL,
  `father_ext` varchar(50) DEFAULT NULL,
  `father_nickname` varchar(100) DEFAULT NULL,
  `father_education_level` varchar(100) DEFAULT NULL,
  `father_last_school` varchar(255) DEFAULT NULL,
  `father_course` varchar(255) DEFAULT NULL,
  `father_year_graduated` varchar(10) DEFAULT NULL,
  `father_contact` varchar(20) DEFAULT NULL,
  `father_occupation` varchar(255) DEFAULT NULL,
  `father_employer` varchar(255) DEFAULT NULL,
  `father_income` decimal(10,2) DEFAULT NULL,
  `father_email` varchar(255) DEFAULT NULL,
  `mother_deceased` tinyint(1) DEFAULT NULL,
  `mother_family_name` varchar(100) DEFAULT NULL,
  `mother_given_name` varchar(100) DEFAULT NULL,
  `mother_middle_name` varchar(100) DEFAULT NULL,
  `mother_nickname` varchar(100) DEFAULT NULL,
  `mother_education_level` varchar(100) DEFAULT NULL,
  `mother_school_address` varchar(255) DEFAULT NULL,
  `mother_course` varchar(255) DEFAULT NULL,
  `mother_year_graduated` varchar(10) DEFAULT NULL,
  `mother_contact` varchar(20) DEFAULT NULL,
  `mother_occupation` varchar(255) DEFAULT NULL,
  `mother_employer` varchar(255) DEFAULT NULL,
  `mother_income` decimal(10,2) DEFAULT NULL,
  `mother_email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `person_table`
--

CREATE TABLE `person_table` (
  `person_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `person_table`
--

INSERT INTO `person_table` (`person_id`, `first_name`, `middle_name`, `last_name`) VALUES
(8, '', '', ''),
(9, '', '', ''),
(10, '', '', ''),
(11, '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `requirements`
--

CREATE TABLE `requirements` (
  `requirements_id` int(11) NOT NULL,
  `requirements_description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_profile_table`
--

CREATE TABLE `student_profile_table` (
  `id` bigint(20) NOT NULL,
  `branch` varchar(100) DEFAULT NULL,
  `student_number` varchar(50) DEFAULT NULL,
  `LRN` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `middle_initial` char(5) DEFAULT NULL,
  `extension` varchar(10) DEFAULT NULL,
  `mobile_number` varchar(20) DEFAULT NULL,
  `residential_address` varchar(255) DEFAULT NULL,
  `residential_region` varchar(100) DEFAULT NULL,
  `residential_province` varchar(100) DEFAULT NULL,
  `residential_municipality` varchar(100) DEFAULT NULL,
  `residential_telephone` varchar(20) DEFAULT NULL,
  `permanent_address` varchar(255) DEFAULT NULL,
  `permanent_region` varchar(100) DEFAULT NULL,
  `permanent_province` varchar(100) DEFAULT NULL,
  `permanent_municipality` varchar(100) DEFAULT NULL,
  `permanent_telephone` varchar(20) DEFAULT NULL,
  `monthly_income` decimal(10,2) DEFAULT NULL,
  `ethnic_group` varchar(100) DEFAULT NULL,
  `pwd_type` varchar(100) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `place_of_birth` varchar(255) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `religion` varchar(100) DEFAULT NULL,
  `citizenship` varchar(50) DEFAULT NULL,
  `civil_status` varchar(50) DEFAULT NULL,
  `blood_type` varchar(5) DEFAULT NULL,
  `nstp_serial_number` varchar(50) DEFAULT NULL,
  `transfer_status` varchar(50) DEFAULT NULL,
  `previous_school` varchar(255) DEFAULT NULL,
  `transfer_date` date DEFAULT NULL,
  `school_year` varchar(20) DEFAULT NULL,
  `term` varchar(20) DEFAULT NULL,
  `transfer_reason` varchar(255) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `program` varchar(100) DEFAULT NULL,
  `year_level` varchar(10) DEFAULT NULL,
  `section` varchar(50) DEFAULT NULL,
  `curriculum_type` varchar(100) DEFAULT NULL,
  `curriculum_year` varchar(20) DEFAULT NULL,
  `admission_year` varchar(10) DEFAULT NULL,
  `assessment_type` varchar(50) DEFAULT NULL,
  `admission_status` varchar(50) DEFAULT NULL,
  `enrollment_status` varchar(50) DEFAULT NULL,
  `academic_status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users_account`
--

CREATE TABLE `users_account` (
  `user_id` int(11) NOT NULL,
  `person_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users_account`
--

INSERT INTO `users_account` (`user_id`, `person_id`, `email`, `password`) VALUES
(1, 8, 'ardenhello@gmail.com', '$2b$10$dxs3rjyLGQtPIeDpyeAUTOsViqjJWC6ZYb1uhlWSZLePjvPOj/qZ.'),
(2, 9, 'helloworld@gmail.com', '$2b$10$nFy87sT3nxNm86U2h68Q3u4kWEQaKX2RoNAvTE4hbr65833rNq8Qq'),
(3, 10, 'cedrick.delacruz@gmail.com', '$2b$10$iS690ZkAbnEK1d35JhonwO6RxEVsK9M.R4PkgHWiJHtvktwCAT642'),
(4, 11, 'cedrick.delacruz', '$2b$10$hiAlk6x24spR8Syk7jGOyOlsFnH3ztSyKij1hCn6laNYVE/E/rQGa');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admission_requirement`
--
ALTER TABLE `admission_requirement`
  ADD PRIMARY KEY (`requirements_id`);

--
-- Indexes for table `applicant_requirements`
--
ALTER TABLE `applicant_requirements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `person_id` (`person_id`),
  ADD KEY `student_requirement_id` (`student_requirement_id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `applicant_table`
--
ALTER TABLE `applicant_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `educational_attainment_table`
--
ALTER TABLE `educational_attainment_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `family_background_table`
--
ALTER TABLE `family_background_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `person_table`
--
ALTER TABLE `person_table`
  ADD PRIMARY KEY (`person_id`);

--
-- Indexes for table `requirements`
--
ALTER TABLE `requirements`
  ADD PRIMARY KEY (`requirements_id`);

--
-- Indexes for table `student_profile_table`
--
ALTER TABLE `student_profile_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_account`
--
ALTER TABLE `users_account`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `person_id` (`person_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admission_requirement`
--
ALTER TABLE `admission_requirement`
  MODIFY `requirements_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `applicant_requirements`
--
ALTER TABLE `applicant_requirements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `applicant_table`
--
ALTER TABLE `applicant_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `educational_attainment_table`
--
ALTER TABLE `educational_attainment_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `family_background_table`
--
ALTER TABLE `family_background_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `person_table`
--
ALTER TABLE `person_table`
  MODIFY `person_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `requirements`
--
ALTER TABLE `requirements`
  MODIFY `requirements_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `student_profile_table`
--
ALTER TABLE `student_profile_table`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users_account`
--
ALTER TABLE `users_account`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
