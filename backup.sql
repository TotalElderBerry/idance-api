-- MariaDB dump 10.19  Distrib 10.4.25-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: idancedb
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attendance` (
  `student_id` int DEFAULT NULL,
  `live_danceclass_id` int DEFAULT NULL,
  `time` text,
  KEY `student_id` (`student_id`),
  KEY `live_danceclass_id` (`live_danceclass_id`),
  CONSTRAINT `Attendance_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  CONSTRAINT `Attendance_ibfk_2` FOREIGN KEY (`live_danceclass_id`) REFERENCES `livedanceclass` (`live_danceclass_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dancebooking`
--

DROP TABLE IF EXISTS `dancebooking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dancebooking` (
  `dance_booking_id` int NOT NULL AUTO_INCREMENT,
  `payment_id` int DEFAULT NULL,
  `student_id` int DEFAULT NULL,
  `dance_class_id` int DEFAULT NULL,
  `date_approved` text,
  PRIMARY KEY (`dance_booking_id`),
  KEY `payment_id` (`payment_id`),
  KEY `student_id` (`student_id`),
  KEY `dance_class_id` (`dance_class_id`),
  CONSTRAINT `DanceBooking_ibfk_1` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`payment_id`),
  CONSTRAINT `DanceBooking_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  CONSTRAINT `DanceBooking_ibfk_3` FOREIGN KEY (`dance_class_id`) REFERENCES `danceclass` (`dance_class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dancebooking`
--

LOCK TABLES `dancebooking` WRITE;
/*!40000 ALTER TABLE `dancebooking` DISABLE KEYS */;
/*!40000 ALTER TABLE `dancebooking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `danceclass`
--

DROP TABLE IF EXISTS `danceclass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `danceclass` (
  `dance_class_id` int NOT NULL AUTO_INCREMENT,
  `instructor_id` int DEFAULT NULL,
  `dance_name` text,
  `dance_genre` text,
  `dance_song` text,
  `dance_difficulty` text,
  `price` int DEFAULT NULL,
  `description` text,
  `payment_details_id` int DEFAULT NULL,
  `isAcceptingPayment` tinyint DEFAULT '1',
  PRIMARY KEY (`dance_class_id`),
  KEY `instructor_id` (`instructor_id`),
  KEY `payment_details_id` (`payment_details_id`),
  CONSTRAINT `DanceClass_ibfk_1` FOREIGN KEY (`instructor_id`) REFERENCES `instructor` (`instructor_id`),
  CONSTRAINT `DanceClass_ibfk_2` FOREIGN KEY (`payment_details_id`) REFERENCES `paymentdetails` (`payment_details_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danceclass`
--

LOCK TABLES `danceclass` WRITE;
/*!40000 ALTER TABLE `danceclass` DISABLE KEYS */;
/*!40000 ALTER TABLE `danceclass` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instructor`
--

DROP TABLE IF EXISTS `instructor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `instructor` (
  `instructor_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `description` text,
  `dance_specialty` text,
  PRIMARY KEY (`instructor_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Instructor_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instructor`
--

LOCK TABLES `instructor` WRITE;
/*!40000 ALTER TABLE `instructor` DISABLE KEYS */;
INSERT INTO `instructor` VALUES (23,'z6Z88m3EHZZs3BPAI9L4q98lRWD3',5,'tiktok','hiphip');
/*!40000 ALTER TABLE `instructor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like`
--

DROP TABLE IF EXISTS `like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `like` (
  `like_id` int NOT NULL AUTO_INCREMENT,
  `dance_class_id` int DEFAULT NULL,
  `student_id` int DEFAULT NULL,
  `date` text,
  PRIMARY KEY (`like_id`),
  KEY `dance_class_id` (`dance_class_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `Like_ibfk_1` FOREIGN KEY (`dance_class_id`) REFERENCES `danceclass` (`dance_class_id`),
  CONSTRAINT `Like_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like`
--

LOCK TABLES `like` WRITE;
/*!40000 ALTER TABLE `like` DISABLE KEYS */;
/*!40000 ALTER TABLE `like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `livedanceclass`
--

DROP TABLE IF EXISTS `livedanceclass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `livedanceclass` (
  `live_danceclass_id` int NOT NULL AUTO_INCREMENT,
  `dance_class_id` int DEFAULT NULL,
  `date` text,
  `location` text,
  `student_limit` int DEFAULT NULL,
  PRIMARY KEY (`live_danceclass_id`),
  KEY `dance_class_id` (`dance_class_id`),
  CONSTRAINT `LiveDanceClass_ibfk_1` FOREIGN KEY (`dance_class_id`) REFERENCES `danceclass` (`dance_class_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `livedanceclass`
--

LOCK TABLES `livedanceclass` WRITE;
/*!40000 ALTER TABLE `livedanceclass` DISABLE KEYS */;
/*!40000 ALTER TABLE `livedanceclass` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `amount` int DEFAULT NULL,
  `date` text,
  `sender_name` text,
  `reference_number` text,
  PRIMARY KEY (`payment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymentdetails`
--

DROP TABLE IF EXISTS `paymentdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paymentdetails` (
  `payment_details_id` int NOT NULL AUTO_INCREMENT,
  `mode_of_payment` text,
  `account_name` text,
  `account_number` text,
  PRIMARY KEY (`payment_details_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentdetails`
--

LOCK TABLES `paymentdetails` WRITE;
/*!40000 ALTER TABLE `paymentdetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `paymentdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rating` (
  `rating_id` int NOT NULL AUTO_INCREMENT,
  `rating` int DEFAULT NULL,
  `instructor_id` int DEFAULT NULL,
  `student_id` int DEFAULT NULL,
  PRIMARY KEY (`rating_id`),
  KEY `instructor_id` (`instructor_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `Rating_ibfk_1` FOREIGN KEY (`instructor_id`) REFERENCES `instructor` (`instructor_id`),
  CONSTRAINT `Rating_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating`
--

LOCK TABLES `rating` WRITE;
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recordeddanceclass`
--

DROP TABLE IF EXISTS `recordeddanceclass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recordeddanceclass` (
  `recorded_danceclass_id` int NOT NULL AUTO_INCREMENT,
  `dance_class_id` int DEFAULT NULL,
  `youtube_link` text,
  PRIMARY KEY (`recorded_danceclass_id`),
  KEY `dance_class_id` (`dance_class_id`),
  CONSTRAINT `RecordedDanceClass_ibfk_1` FOREIGN KEY (`dance_class_id`) REFERENCES `danceclass` (`dance_class_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recordeddanceclass`
--

LOCK TABLES `recordeddanceclass` WRITE;
/*!40000 ALTER TABLE `recordeddanceclass` DISABLE KEYS */;
/*!40000 ALTER TABLE `recordeddanceclass` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student` (
  `student_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) DEFAULT NULL,
  `level` text,
  `isInstructor` tinyint DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Student_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (18,'z6Z88m3EHZZs3BPAI9L4q98lRWD3','Intermediate',1);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` varchar(50) NOT NULL,
  `first_name` text NOT NULL,
  `last_name` text,
  `gender` text,
  `contact_number` text,
  `email_address` text,
  `data_of_birth` text,
  `profile_picture` text,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('z6Z88m3EHZZs3BPAI9L4q98lRWD3','brian','luisodra','C','C','lisondrabrian@gmail.com','2001-06-14 00:00:00.000Z','');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-13 12:00:52
