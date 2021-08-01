SET NAMES utf8;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `login` varchar(20) NOT NULL,
  `password` varchar(88) DEFAULT NULL,
  PRIMARY KEY (`login`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
INSERT INTO `admin` VALUES ('admin','Zj1emaO4N3nKL7zS8KQAuVNXCVzmF0yJzDS+0S1Z0qtImdLRNpUbrOYLswaeLRlo8RvVO/xSZqx1ro6KnFGang==');
UNLOCK TABLES;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
CREATE TABLE `applications` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` decimal(15,0) NOT NULL,
  `text` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `trainings`
--

DROP TABLE IF EXISTS `trainings`;
CREATE TABLE `trainings` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `descShort` varchar(200) DEFAULT NULL,
  `descFull` varchar(1000) DEFAULT NULL,
  `language` varchar(3) DEFAULT 'UKR' COMMENT '''UKR''/''ENG''',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `trainings`
--

LOCK TABLES `trainings` WRITE;
INSERT INTO `trainings` VALUES (7,'Techniques of personal growth','If you think a person does not need constant self-improvement at our center - we will prove to you that this is not the case.','During this course you will learn not only to better manage your time, but also how to become a better version of yourself. Come and learn the secret of success!','ENG'),(8,'The C++ language','This is best taught at the Faculty of Informatics of NaUKMA. But if it didn\'t work out - come to us!','From the basics of C to the intricacies of class hierarchy and metaprogramming. You will not regret it!','ENG'),(9,'Техніка особистісного зростання','Якщо ви вважаєте, що людина не потребує постійного самовдосконалення в нашому Центрі - ми доведемо Вам, що це не так.','Впродовж вивчення цього курсу ви навчитесь не тільки краще розподіляти свій час, а і як стати кращою версією самого себе! Секрет успішності - тільки у нас!','UKR'),(10,'Мова С++','Цьому краще навчать на факультеті інформатики НаУКМА. Але якщо вже не склалося - йдіть до нас!','Від бази мови C до тонкощів ієрархії класів та метапрограмування. Не пошкодуєте!','UKR');
UNLOCK TABLES;

--
-- Table structure for table `unconfirmed`
--

DROP TABLE IF EXISTS `unconfirmed`;
CREATE TABLE `unconfirmed` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` decimal(15,0) NOT NULL,
  `text` varchar(500) NOT NULL,
  `token` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token_UNIQUE` (`token`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;