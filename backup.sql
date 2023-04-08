-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: idancedb
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Attendance`
--

DROP TABLE IF EXISTS `Attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Attendance` (
  `student_id` int DEFAULT NULL,
  `live_danceclass_id` int DEFAULT NULL,
  `time` text,
  KEY `student_id` (`student_id`),
  KEY `live_danceclass_id` (`live_danceclass_id`),
  CONSTRAINT `Attendance_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `Student` (`student_id`),
  CONSTRAINT `Attendance_ibfk_2` FOREIGN KEY (`live_danceclass_id`) REFERENCES `LiveDanceClass` (`live_danceclass_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Attendance`
--

LOCK TABLES `Attendance` WRITE;
/*!40000 ALTER TABLE `Attendance` DISABLE KEYS */;
/*!40000 ALTER TABLE `Attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DanceBooking`
--

DROP TABLE IF EXISTS `DanceBooking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DanceBooking` (
  `dance_booking_id` int NOT NULL AUTO_INCREMENT,
  `payment_id` int DEFAULT NULL,
  `student_id` int DEFAULT NULL,
  `dance_class_id` int DEFAULT NULL,
  `date_approved` text,
  PRIMARY KEY (`dance_booking_id`),
  KEY `payment_id` (`payment_id`),
  KEY `student_id` (`student_id`),
  KEY `dance_class_id` (`dance_class_id`),
  CONSTRAINT `DanceBooking_ibfk_1` FOREIGN KEY (`payment_id`) REFERENCES `Payment` (`payment_id`),
  CONSTRAINT `DanceBooking_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `Student` (`student_id`),
  CONSTRAINT `DanceBooking_ibfk_3` FOREIGN KEY (`dance_class_id`) REFERENCES `DanceClass` (`dance_class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DanceBooking`
--

LOCK TABLES `DanceBooking` WRITE;
/*!40000 ALTER TABLE `DanceBooking` DISABLE KEYS */;
/*!40000 ALTER TABLE `DanceBooking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DanceClass`
--

DROP TABLE IF EXISTS `DanceClass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DanceClass` (
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
  CONSTRAINT `DanceClass_ibfk_1` FOREIGN KEY (`instructor_id`) REFERENCES `Instructor` (`instructor_id`),
  CONSTRAINT `DanceClass_ibfk_2` FOREIGN KEY (`payment_details_id`) REFERENCES `PaymentDetails` (`payment_details_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DanceClass`
--

LOCK TABLES `DanceClass` WRITE;
/*!40000 ALTER TABLE `DanceClass` DISABLE KEYS */;
/*!40000 ALTER TABLE `DanceClass` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Instructor`
--

DROP TABLE IF EXISTS `Instructor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Instructor` (
  `instructor_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `description` text,
  `dance_specialty` text,
  PRIMARY KEY (`instructor_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Instructor_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Instructor`
--

LOCK TABLES `Instructor` WRITE;
/*!40000 ALTER TABLE `Instructor` DISABLE KEYS */;
/*!40000 ALTER TABLE `Instructor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Like`
--

DROP TABLE IF EXISTS `Like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Like` (
  `like_id` int NOT NULL AUTO_INCREMENT,
  `dance_class_id` int DEFAULT NULL,
  `student_id` int DEFAULT NULL,
  `date` text,
  PRIMARY KEY (`like_id`),
  KEY `dance_class_id` (`dance_class_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `Like_ibfk_1` FOREIGN KEY (`dance_class_id`) REFERENCES `DanceClass` (`dance_class_id`),
  CONSTRAINT `Like_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `Student` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Like`
--

LOCK TABLES `Like` WRITE;
/*!40000 ALTER TABLE `Like` DISABLE KEYS */;
/*!40000 ALTER TABLE `Like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LiveDanceClass`
--

DROP TABLE IF EXISTS `LiveDanceClass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LiveDanceClass` (
  `live_danceclass_id` int NOT NULL AUTO_INCREMENT,
  `dance_class_id` int DEFAULT NULL,
  `date` text,
  `location` text,
  `student_limit` int DEFAULT NULL,
  PRIMARY KEY (`live_danceclass_id`),
  KEY `dance_class_id` (`dance_class_id`),
  CONSTRAINT `LiveDanceClass_ibfk_1` FOREIGN KEY (`dance_class_id`) REFERENCES `DanceClass` (`dance_class_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LiveDanceClass`
--

LOCK TABLES `LiveDanceClass` WRITE;
/*!40000 ALTER TABLE `LiveDanceClass` DISABLE KEYS */;
/*!40000 ALTER TABLE `LiveDanceClass` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Payment`
--

DROP TABLE IF EXISTS `Payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Payment` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `amount` int DEFAULT NULL,
  `date` text,
  `sender_name` text,
  `reference_number` text,
  PRIMARY KEY (`payment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payment`
--

LOCK TABLES `Payment` WRITE;
/*!40000 ALTER TABLE `Payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `Payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PaymentDetails`
--

DROP TABLE IF EXISTS `PaymentDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PaymentDetails` (
  `payment_details_id` int NOT NULL AUTO_INCREMENT,
  `mode_of_payment` text,
  `account_name` text,
  `account_number` text,
  PRIMARY KEY (`payment_details_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PaymentDetails`
--

LOCK TABLES `PaymentDetails` WRITE;
/*!40000 ALTER TABLE `PaymentDetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `PaymentDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Rating`
--

DROP TABLE IF EXISTS `Rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Rating` (
  `rating_id` int NOT NULL AUTO_INCREMENT,
  `rating` int DEFAULT NULL,
  `instructor_id` int DEFAULT NULL,
  `student_id` int DEFAULT NULL,
  PRIMARY KEY (`rating_id`),
  KEY `instructor_id` (`instructor_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `Rating_ibfk_1` FOREIGN KEY (`instructor_id`) REFERENCES `Instructor` (`instructor_id`),
  CONSTRAINT `Rating_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `Student` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rating`
--

LOCK TABLES `Rating` WRITE;
/*!40000 ALTER TABLE `Rating` DISABLE KEYS */;
/*!40000 ALTER TABLE `Rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RecordedDanceClass`
--

DROP TABLE IF EXISTS `RecordedDanceClass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RecordedDanceClass` (
  `recorded_danceclass_id` int NOT NULL AUTO_INCREMENT,
  `dance_class_id` int DEFAULT NULL,
  `youtube_link` text,
  PRIMARY KEY (`recorded_danceclass_id`),
  KEY `dance_class_id` (`dance_class_id`),
  CONSTRAINT `RecordedDanceClass_ibfk_1` FOREIGN KEY (`dance_class_id`) REFERENCES `DanceClass` (`dance_class_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RecordedDanceClass`
--

LOCK TABLES `RecordedDanceClass` WRITE;
/*!40000 ALTER TABLE `RecordedDanceClass` DISABLE KEYS */;
/*!40000 ALTER TABLE `RecordedDanceClass` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Student`
--

DROP TABLE IF EXISTS `Student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Student` (
  `student_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `level` text,
  `isInstructor` tinyint DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Student_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Student`
--

LOCK TABLES `Student` WRITE;
/*!40000 ALTER TABLE `Student` DISABLE KEYS */;
/*!40000 ALTER TABLE `Student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `user_id` int NOT NULL,
  `first_name` text NOT NULL,
  `last_name` text,
  `gender` text,
  `contact_number` text,
  `email_address` text,
  `data_of_birth` text,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-08 16:38:27