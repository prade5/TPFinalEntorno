-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: tpfinalentorno
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `applicants`
--

DROP TABLE IF EXISTS `applicants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applicants` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `idUser` bigint NOT NULL,
  `idCompetition` bigint NOT NULL,
  `applicantDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `merit` int DEFAULT NULL,
  `state` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `aplicant_competition` (`idCompetition`),
  KEY `competition_users` (`idUser`),
  CONSTRAINT `aplicant_competition` FOREIGN KEY (`idCompetition`) REFERENCES `competitions` (`id`),
  CONSTRAINT `competition_users` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applicants`
--

LOCK TABLES `applicants` WRITE;
/*!40000 ALTER TABLE `applicants` DISABLE KEYS */;
INSERT INTO `applicants` VALUES (5,20,33,'2021-06-25 02:40:29',9,3),(7,20,35,'2021-08-29 15:12:07',8,1);
/*!40000 ALTER TABLE `applicants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `competitions`
--

DROP TABLE IF EXISTS `competitions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `competitions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `idSubject` bigint NOT NULL,
  `description` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `creationDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `finalDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `state` int NOT NULL,
  `idUser` bigint NOT NULL,
  `idPosition` bigint NOT NULL,
  `winner` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `competition_subject` (`idSubject`),
  KEY `competition_user` (`idUser`),
  KEY `competition_positions` (`idPosition`) USING BTREE,
  CONSTRAINT `competition_Position` FOREIGN KEY (`idPosition`) REFERENCES `positions` (`id`),
  CONSTRAINT `competition_subject` FOREIGN KEY (`idSubject`) REFERENCES `subjects` (`id`),
  CONSTRAINT `competition_user` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `competitions`
--

LOCK TABLES `competitions` WRITE;
/*!40000 ALTER TABLE `competitions` DISABLE KEYS */;
INSERT INTO `competitions` VALUES (33,6,'Prueba','2021-06-24 01:30:00','2021-11-30 01:30:00',1,21,2,0),(34,6,'pr','2021-06-25 00:32:00','2021-07-30 00:32:00',1,21,4,0),(35,5,'Puesto','2021-09-01 12:11:00','2021-10-01 12:11:00',1,21,4,0),(36,6,'Jefe de catedra creado por el adm','2021-10-26 22:54:00','2021-11-26 22:54:00',1,19,1,NULL),(37,5,'Con fecha modificada','2021-10-26 11:06:00','2022-01-06 11:06:00',1,21,5,NULL),(38,5,'ffffffffffff','2021-10-26 23:26:00','2021-12-26 23:26:00',1,21,4,NULL);
/*!40000 ALTER TABLE `competitions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `configurations`
--

DROP TABLE IF EXISTS `configurations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `configurations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(250) NOT NULL,
  `typeinfo` int NOT NULL,
  `state` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configurations`
--

LOCK TABLES `configurations` WRITE;
/*!40000 ALTER TABLE `configurations` DISABLE KEYS */;
/*!40000 ALTER TABLE `configurations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curriculum`
--

DROP TABLE IF EXISTS `curriculum`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `curriculum` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `idPostulant` bigint NOT NULL,
  `document` varchar(500) NOT NULL,
  `state` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `postulant_user` (`idPostulant`),
  CONSTRAINT `postulant_user` FOREIGN KEY (`idPostulant`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curriculum`
--

LOCK TABLES `curriculum` WRITE;
/*!40000 ALTER TABLE `curriculum` DISABLE KEYS */;
/*!40000 ALTER TABLE `curriculum` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documenttype`
--

DROP TABLE IF EXISTS `documenttype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documenttype` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(250) NOT NULL,
  `state` int NOT NULL,
  `creationDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documenttype`
--

LOCK TABLES `documenttype` WRITE;
/*!40000 ALTER TABLE `documenttype` DISABLE KEYS */;
INSERT INTO `documenttype` VALUES (1,'DNI','El DNI contiene información sobre su identidad. Pero, lo más importante es que este documento tiene un número personal. El número del DNI es necesario para cualquier contrato.',1,'2021-06-08 00:00:32'),(2,'PASAPORTE','PASAPORTE',1,'2021-06-08 00:00:32'),(3,'L.C','Libreta Cívica',1,'2021-06-08 00:00:32'),(4,'L.E.','Libreta de Enrolamiento',1,'2021-06-08 00:00:32');
/*!40000 ALTER TABLE `documenttype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jefedecatedra_materia`
--

DROP TABLE IF EXISTS `jefedecatedra_materia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jefedecatedra_materia` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `IdJefeDeCatedra` bigint NOT NULL,
  `IdSubject` bigint NOT NULL,
  `State` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `JefeDeCatedra_User` (`IdJefeDeCatedra`),
  KEY `Catedra_Subject` (`IdSubject`),
  CONSTRAINT `Catedra_Subject` FOREIGN KEY (`IdSubject`) REFERENCES `subjects` (`id`),
  CONSTRAINT `JefeDeCatedra_User` FOREIGN KEY (`IdJefeDeCatedra`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jefedecatedra_materia`
--

LOCK TABLES `jefedecatedra_materia` WRITE;
/*!40000 ALTER TABLE `jefedecatedra_materia` DISABLE KEYS */;
INSERT INTO `jefedecatedra_materia` VALUES (26,21,5,1);
/*!40000 ALTER TABLE `jefedecatedra_materia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knowlageusers`
--

DROP TABLE IF EXISTS `knowlageusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `knowlageusers` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(250) NOT NULL,
  `state` int NOT NULL,
  `idUser` bigint NOT NULL,
  `nivel` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_knowlageuse` (`idUser`),
  CONSTRAINT `user_knowlageuse` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knowlageusers`
--

LOCK TABLES `knowlageusers` WRITE;
/*!40000 ALTER TABLE `knowlageusers` DISABLE KEYS */;
/*!40000 ALTER TABLE `knowlageusers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `positions`
--

DROP TABLE IF EXISTS `positions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `positions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(250) NOT NULL,
  `state` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `positions`
--

LOCK TABLES `positions` WRITE;
/*!40000 ALTER TABLE `positions` DISABLE KEYS */;
INSERT INTO `positions` VALUES (1,'Jefe de Catedra','Se encarga se contralar el buen funccionamienta de la catefra',1),(2,'Titular de Teoria','Es el encargado de dictar la parte teorica',1),(3,'Titular de practica','Se encarga de la practica',1),(4,'Ayudante teorico','Se encargar a apoya el o la profe de la teoria',1),(5,'Ayudante de practica','Se encargar a apoya el o la profe de la practica',1);
/*!40000 ALTER TABLE `positions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profilusers`
--

DROP TABLE IF EXISTS `profilusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profilusers` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `idUser` bigint NOT NULL,
  `title` varchar(100) NOT NULL,
  `instagram` varchar(100) NOT NULL,
  `twitter` varchar(100) NOT NULL,
  `facebook` varchar(100) NOT NULL,
  `website` varchar(100) NOT NULL,
  `gitHub` varchar(100) NOT NULL,
  `workplace` varchar(100) NOT NULL,
  `state` int NOT NULL,
  `img` longtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_profiluser` (`idUser`),
  CONSTRAINT `user_profiluser` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profilusers`
--

LOCK TABLES `profilusers` WRITE;
/*!40000 ALTER TABLE `profilusers` DISABLE KEYS */;
/*!40000 ALTER TABLE `profilusers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `creationDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `state` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (25,'admin','Tiene todos los permisos','2021-04-12 02:15:55',1),(73,'Jefe de catedra','Tiene acceso su catedra','2021-06-06 22:39:02',1),(74,'postulante','Se puede ver los concoursos, su perfil y aplicar a los concursos','2021-06-06 22:39:02',1);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjects` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `state` int NOT NULL,
  `idUser` bigint NOT NULL,
  `creationDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `finalDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `img` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `subject_user` (`idUser`),
  CONSTRAINT `subject_user` FOREIGN KEY (`idUser`) REFERENCES `subjects` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES (4,'Quimica','Es una buena materia',1,4,'2021-05-27 22:52:24','2021-05-27 22:52:24','data:image/jpg;base64,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'),(5,'SO','Materia complicada',1,4,'2021-05-27 22:54:30','2021-05-27 22:54:30','data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSExIVFRUWFxUXFxUVFRcVFhcYFRYWFhUVFRUYHiggGBolHRUVITEhJSorLi4uFx80OTQtOCgtLisBCgoKDg0OGxAQGy0lICUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKYBMAMBIgACEQEDEQH/xAAcAAADAAMBAQEAAAAAAAAAAAADBAUAAgYBBwj/xABAEAACAQIEAwUFBQYEBwEAAAABAhEAAwQSITEFE0EiUWFxgQYykaGxFCNCwfAVUmKS0eEzQ3KCJCU0Y7LC8Rb/xAAbAQACAwEBAQAAAAAAAAAAAAACAwEEBQAGB//EADcRAAEDAwICCAUCBQUAAAAAAAEAAhEDITESQQRREyJhcaGx0fAygZHB4RRiBSMzQvEVUnKiwv/aAAwDAQACEQMRAD8A+I0eztQKPZ2q2lvwtbtEWh3aItchOAtAO1RLo0rRfeorjSiAUE3CNwvEcskxP9qdxPFVvMFcQs/GNhpUy0KC2/r+dTqIEbJZose/Uc819Qw/C8ObI5mGzCNCFk+lRMVwbh5Ygtfw4gklxA8hm0roMBcXkpGIcadTp50LC3MQT91iMNf0P3d3z7x8Nq1SxrgBA+gPkQvItrVaZe7W4XO7h5hzVzh9lbdz/psXZbtuALtxBIGTLGXvk6+FSMVwm8lx7WTOyAFuV94IYAgiNxBFdLhMKj38RzMEMVcjtpYNtbdsZjBtMCGLdNp0pXiWAw4FsjDYvDDmdp3XNI7EpaltIUs4MHXSTOlc0gRIHn+fNaNDj6jXaHvLpFrNJuNV4cHEbDqwbGVAtC+AcvPi3qQvM+73EkD3JGYT4miXOK3WC2rrsyJshIXURGbSW2HvTT72EQ83D4t2vCcoKPzXLSpyHecpHjr0iaafi+IzBLqYW/mQXCp1KkyGRy5hLg7cr0J9KVpjf7qy+uC4dRp3vLHAgSfiGMkGRkjYyn+2LL/42FtQEKjkLyt7gc9ez+Pad/w60HEXrOQC0b6Eukq7g2ysdsQD29QImNDHSnLiW7y27gwnLRX7fIBd3AIzqQoHLMRBIjt+dSccEBOVXSCALb5iSnb+8M7H3BFQSd11BlInS0OEG41S0EHGTy253KqWUN221sX8OiKVyrc+7cgCQbcn/aZPU9+uljhF4HsqLgGpNplcaFxJgzEo/TpUdKawV4ht46HpOmxqWkEiU40arNWhwg3gt7ANiM/dWgIsklTq41jSekHyBqnhLxXkEdLdr/0qTc4pcKG3m7BI7IAA0M6ADTWn7d0Ra0/y7X/pVqnErOrMd/cNz28l1uNxZNpjJ1Tr4gVyXEOJgXLildOZd1HmauXrg5I8k+grl8fZzXbmv+Zc/wDKmuENVLgKLNR1Dn/5XvORj0ptcOsbCpowcHenLVp161W3uFpVAP7XJnBcMS48HQASSPEhR82FKHDZWK9xI+Biq3C8QbbZigcERlJIGjKymR3Mq0FLJJJO51PrQlt0vpiBco1jDaKQu6deozEE0Kza7Q6CaZysYBJMCB4DuFGXD0IZCU/iRZJra1orrNOJh6ImHotKQ7ichICyaIqmrNvC6bVo+Eow1VjxIJU+1NO2LlHt4OvWw8UwApDqrXWTVi7Tttqk29KesvTcqlVYE3XtDRq3oFWIX5yFMWdqXFMWdqyAvq78Ly9W61perZa5AcBarvTPSll96iudKJpuhcFQ4TYRic3wq0/BLDHQga/3rlrJrXnvPvPvtJ79qYHtAgiVWqcPUe+Wvhd9a4+2YYdbAuRAzdNuvdTN7BHe9wzMIPbsAFvjoaNgbNoWVbkOCRqwGvxFKtj7RicVjMPAPvCBv/GDNaIsOsfL7j7ry77k9CwiM/FM8+q7wSuGtqGcu+Mw1kTkSwH5iEEybrFPc1HWNaf4nfE2wuKLstxf+oH+FD24f7xJlTr07Kn1SwWIvMLqDHImH7WS5iQoF43CcwzggjaZ+VNcRfEMmVhgrpul0DWlLFOaQOZnJ7Bz3B5ECa5hEW9+/kgqgCsNRBMY5W31szEz1s2cZU/jFwtacu2DuKAcxtlTdjMf8Mxpr3CIqWqLzLYFiAbFtoX37kqfviFzZS2+WNgD1rOJYC/bBc4cqEH+MjMpUgkSSGIncaAUGzibWUc6xcF4oSlwZwjqUHLd1LS0sGJYaeB6Vnu63v0WrRYGN6h1Al3wxuBs18WA742FiWMFl+7n7SkmQ1rMwdxfydhQTssCY1YdepOPlHy3OfzHgIVZTnA1OpPjP9tqNhb+GQrysXiLamQBdQOkZy0KMkHtjUD9/cwRSePxBe2VuXLYCvCRY+8uKEbluCp1QwQd8sr31E2hczV0/SEEXOQZgk/sPcQHW7rIVi1bNpiQJkR31pw3Co11QTAJ12jr30pclSyncGDG2mmlZaua1AcJFsLTLHaXQ7PonGsakA9T9aruhC2NtbVrb03qIlz61StXJ5fkn5U2nCq12uJB5Sugdjyf5PoKg4hvvXP8b/8AlVa+x5cH/t/QVIxKyznxerDriAqXCiCfn5BDOKIcd1URiBUbrTamqwJVupTaYV3CuCKctgVDwzkVRsXKILOq0oNlRVBTK2xSdtqattUhUagIR1tVsqa1iGtga6FXum7Q0rGGta22rZjUhVzlGsgV69sUsbsVi4iilAWOysa3FbLpQbl6tTeogUzSU3buUwHqWl6jLfokDqS+BimLO1LimLO1YoX052Fpdoi0O7RU2rkJwENfeol06UNfeol3auUHIRsFZZ9FE0V+EXgfd69NxXnCsXy50kVXX2n1jIZnw8qa0MI6xVWs/iGvPRtBC7LB3ItKPtIBjYkUDD3MST91icJd0PYuKe/rB/Kp+E9nHdxiHCNtCg+Gx76o4zDWSB/yvOYMm2LYI28Qa02l0XBH1/K8pVbSBhrg6c2ZY8rkE/IhTcBh2e/fIwljGXo7YzJyQJaOQSoObofLetOK2EQWi2ANmbqiLTo73SeX2BCyAyyBl0zERWtzEWctyyMJjkuKHIVC7JZBP3b5VfpB8NTS3FL+HCvcXEcRttNzlq5YWw/+IlvMxndbU6z16CklwaM+7805uo1BpYdhbVygHqvIg5ENxg4KUx3J1ypjLbR2eeByPfbW6HBkdIiJBpS+wF23GJeRZSX3CEgk2bZXQoJgRpr4Vn7XuNbIfFF8w7Vl1eHMzBdSJ75kUzY5d1RcOIt23S0U5NxE2tpMJLZSCXyie0dTrqarFwcbLUFN1G9ad7mSLgRlhMZ/bvJuB5wvEkIhW9hwyEoEvjRRnFxXR11WWc66RG9acXBAFtreFkw4u4fUkaiC/Xb9Gq2E4bcUoq3MBfVdFLO+nbNzmSJAJIyyfAec3FwUeLVqybVw22fmMMzorkhBlCmcvnqNpFHphsFV6dak7iTUGJnYZJgn4THeCZyTcqUtgxWyWmmiklZBEEGCO4iiWH7Q86ENC2HOdBK0RTG3WqGEPatzsMn5UO5AHrTFl/d8h+VOayCq1R2oYVfHXAQY/h9fGptx/fHi/wBBT5Mp6D8qAtoEnzb6CrIBGFRpQ0X92UZhr6n8qYQmfT8qfu4QUPla+n5UgsIVrpg4Ilg7VSw5pC2u1O4eoVOrBVK1TlqkbVN2zRhZlUJxBWtzStUNCvk1xSGtujJfoyX6is5FerijQ6k13DThVLt2gi7SBxNai9XalAoQFQa5WrXKTF2tzcopU9Gji7Wwv0lmrzPUSiNMFfJaNa2oIo1rasxe6dheXaKtCvUVa5CcBDX3q3u7VqvvVtd2rlByFtY2oXX1/Oi2Nq0J19alSMlfUMLyuSsi+NOk1Ot3cOp/6nGWND2jnA3/AIwajWvbTEIgXKkDYmda9w/tpilMxabwKeNaPT0zHp+QvL/6ZxQ1SM/uH3aR9VU4XiArXWTGrh0JlcS622uX2lpFztbDcaChcVxbnk/8ww99hdEFhaVLID2ofQzo0bfhzxImp1n2lys902LV27cAD89Q9rKCYCINt+/pQMbx9bgQHB2FVHD5bYKBjKSLgHvSqFT/AK6U57Yz5ojwPEGp/TBHMimf7Y3GrPaBvpA6qd4hcutbfO+BurBkWGQ345h0tnKY84iD31MxVpxctDk4czYQoo0DoQcty6cy5rpG/ltWYjidhhC4VLTHZ7bNmXUmVXsgnWN6UxGItO6nK7DIFaXId3BjmEnMB07Ph6lLnAn391b4fhKjDdpHxHAGRA+F8bd/cIKrcKwmZbX/AAqXREggw2l+OZdOWCv4cuugofFUi2v3GJWCgzO5axGUwB0HeB49OqeAxdlVGcXg8mXsuFJQ5CJncjt924rXiOJViBae+1uBpfcMQ8mYC9mIj512oaffomCjU/U4MaiZMxEk/wC8i82sB2IPMJkkyTuTqT5mjYVu2vmKHZtgia8svDA91SJBBV4wQQFSxR0HnW1p9vIUncxGaNOtM2Tt5U7VJsq5YQ26uI3Y9BWL183+godk9j0FGjRv9/0FW2LNdae9DuXPqa9Rfp+VBujX1P5U5ZXxG30E9agzKJ1gtVWm7Apcnb9dacwNvNPgJMd3rSiCUl56spq0KaSgWyvj8qZRl7j8f7VwKoVAirXpisxDAmVEAxA+R+YNLm5RaknRde3UFL8oVrfvGlftJoCQntpuhUEw4rdcGKRt4w0/hHuOGZULKmrEDQeddIQOZV2Xr4IUs9iKc+2ViHNU2S2dITESppWguapXrelTbh1oCQrbWu3C+VijWtqFR7O1Z69m7C1vURa0u0Vdq5AcIS+9W13atV96iXdq5cchUuA8KN+e1AmqmJ9jXGzj1FZ7CDVvPrtXZ4nliSxIq/RoMdTkrB43j61LiS1ht3Arnzwx0t9q0jKo1PlQ8Pw9rto3BgyyAFxsDr3eNV+fZYZS9zL6npr86UxxnKtnEX7a/iJORAmxySNTTujbt9iqIrVcRBmZh0R8jkqFawwdSwwF0pF3ti3sNNSSezl11oPEeFQ6qmExSxchzlLhgGAblkErImN413qzxm7bS2OTxHEa5+YLhfIw/HlhYz7Du8qXxeNssSDxW86nPqQeyebbIMZe0cudtI1Gh71PY2IP2T6dfiiQ9oIBm0VSReJNotM+UGygX8NbF+2i2MQBmytbYfeP94eykdcmmnd60DEfZsgNrmh4SQ+XJOWHIO+4n1+FO81kNzBjXZ1cXEOQQp5hzHIdJ919N6l4+1bUry3zg20djGWHaZWBsNiB41Vd7wtXhtRe3UXY/cASCSZ1AWuAPmMQUe6mEhsj3icpyhlUS/4ZI26fHw11wViwRNy8yGdhbJ0jeRI3j9a1PDCtww764HsVoUXBsand9p8lZsYeyZHOygFcrMpOYEHMYGogxQLmFtgoBdBnPmOUjKROXc7HTy691KW7oisVhTCcWSgxwJ6x/wCvKOXz7+yyoHBIHVRftlWJ7UkZR/GD1NPYfhwJH31g+Tz398aab+NRVcd4p22Rp6UbI5JNRlS0O8B+F09rh5CntIdOmtEOGgP5v9BSWDfs+lOk6P5v9BV6nCyH6wblIvb1iDOc6+ECB8jT1qwI9PypEjtetPW73SOn5UIyUyrMCFrdtgfrxNGttlGmhPnsJH9a1ZC0eP8AWsxOrwNhp5x1/XfS3IBcQj2rtNpcpa9w9lxHIG5ZQCY/EBqY86PxfCNh7mTNm0BBiNDI28waBIfTBwmc+nlr8dD+VLM9KW8SZ126+R0NAuswJHdUErmUE3dYUDKKXZmoJvkUJKaKRGFQVBXR8Btk20YTlS5fNw9ADZXKW8NGFcZ9qNbpjHAIDEBtwCQDHeOtCb2RMpuBlPtcp7g4Zy0GABUHOa9TEsuxIo3AkLqdPQ4FX8a4CsM34tPKozPrQuce+hl6WBCa4hxC+eUeztQKPZ2qmvSuwvLtbitLtEWuQHCGvvUS7tWi+9W13apXHK6D2OvlSe6f6V2N/H5wVgdd6+d8IDknIYpp8DipJzTPjFW6NZzWQAsfjODp1K5c5wBXb4TEMgJzW4UTtJ2/tW68RvOnMtXcOVg++uvfArmsPj0VcjW3LAa16tvMAy4XMpEj5VZZW2H39FmP4JpJLhvkhv3O+QqvHTiHMvcwLIhd1Hblfclwik6j5a0PEYi+rXHN3AFV5zHIpYnlsXkWiYlyO/UFdT2Kg4uwtxwowxTJDsAuragZCcwCzIHU617isAWyRgghWIHMX7z7xQARHakvGmuog6QV1HzMT4+nopHBMAaC4b5FMRPKXxfeOd7oGI4s1xmcDDHlZsspy2bO/vogbV+veN99apPxC61vmM2BDFLOhGipyruX7oKYftR/KAMu6N2zkBY4FAuojPJcm9pAGrQRk7PedxpQL+CuXLYy2Etq2Vlfs6xbdiAYzEECY6Ea+FbrD2fQK2+hRfFmgAxMsNrSLHMyYAvJEKvetXWVla9gMhL/AHdx2TKCUJyID2bbcsFGBEq6xEhQO+Mq8tbuDEI9sZFjmJkxABd8/wDAsEmZZf8AdOt8Pug3VOHshnXKFLA5TKJNuWOsuOu48IpP9jXM624QMyC57ywFzlJJ26TpOnrUmRsgpcLTI0mq2NrN3F7ajtI7dtoq8QW5dJtn7D25d71tSAnadu1fI7GbbyCjrrtk+zi6wXB3wdATZFxIRkUGyQeyTzJPfy3/AHZM1+CXACSbehIPb7u4RLaD8PlvpRsPwRifftCTAbMY2mScsgaepipAcdk/oKAaGioNMyQG5gg5F7wMRiwOVR/aFwllB4eAoTvVGBXVLeuy5dQI1inMM6rcF0jBB1UZVS2q2Z99i6DVyIADZhHdvXPjCxHWQh/nQP8AnTiWdqe2Rslu4KkQL2jlGRnO/lbAVzJndmJtiZci37g8BR1tjta9X+gqThxAqjhgTmidASY6T+h8ae1KfTLRAOETB4NWLFmywCRPU931+FN2MIv7427j3eVJ2gTCiZJ2AmegHj1+NUMMCsEgwQYMaGBBg9aIQlVS4bpnC4NTJziVUkCDqZ/R9KS+zSQZ691U8KsFT0jXxEwR9a1v2srR3GoLVWFQzZUsNhOfiszArkIOYR0AhSdQTOs90+Eae2mCAK3ZJzdkg+Goj51rjeNm1iWZYYRAHQSFmI8ql8e4+cQqrlAgzInuiq5ym02uJCnoBTwsBgDIGnUxtpPy+tTLEkgT9adZ9dDoNB6dfXf1qEx7SFvew4jdfiKew3sc121zOYoYglF3kDxmot9prv8AhyktgiPdFl57tlqDhKc5zAIK+d8V4aLLhQ4eVUyBpruN6FZwc9flVDGLmLkfhuN/KSSPnP8ANXlhDTWsEp/SnSFaPscRhhezgzGg8aY//Dfc583aiYq/wefsOs7rVO+TmA/Dl/Klue4SO0+CQKhzOw8SfRfGMVZNtip6V5h7Rc6U97Tj75o76DwMnMfKocIKutPV1L5tRrO1Bo1naqC9I7C8u0VaFdogrks4Wq70w2GcjRTQcOwDgnaa6jC422q6sKYxodkpPEVXU40iVP4BZZWMgj0rorq/xRSlrjFkdRSWO4/bYEKD1j6VYaWsblZdRtavUnQQvUt287l78SO8CjLi7KLkXFEAA9Z1GwFIJ7L3Cocugnv3+M0c+yB1m/bA6Tv0318a5oqDDUb3cNMOq/QWt8lp9qsFWL4q+bhnVCVSSR4RBgb0PGYnDBpF7FMesXOwdRoHPagide/uo9/2btBr6C/kaxJfnKERhoEyNO7E0PEcAsAtGPsZRzCuoZ4Qwg7LQSw/W8QekjA+o9VDa3B6hD3XvGk8hybgiCISwxGHgmb++gc6xnJ7BDRsLc5u4wZ2DicThssW/tCmAJZlOwMaT3kfl4+YnB2UdFGIDqSQ7pbbsAGAQCZaRr/WjDDYKIN9z7hzC2w1yXM6AEbZuXr/AKqTqceSt/y2Q7+Yd8O5xew74N9xbPn2vBa/8PdbuBuxGgHTfY/GhNi7Wg5bZY1TMEWS1wg6TmIBtjMf3DIry6uFBUKbxXmdtuxJtQsFBEB/f08t6KxwI91cSTGmc24Bh98pEicndsfKuknceCg6RB01D83GMi/WtztfHNePxC0RH2ZOoXtHsiXOkjX3x70+5Q/tOYsQiKGjQDRdpyRA18aLjL2GZGFuy6vPY10Cm4769o5iFyLr50d8ZZZSEwwRjHb5jGNRsh08KNsndSyBBFN4vFzjBm7sd0yQc7+G4WaQI20G2gA+cT60yLTab07g+J2swIw1oQI2JmXDyZ1JHTzqrjuJKVC8q1HlBG8QR5/IVcp0gWkkqm+vUDg0U/EKXYsmNjAqzwu0YuTpInXr2XEDv1YV7gOKNy+XCR7u2sAGiYPFzIjoY84NEA3CrValS8gfXbwReB2W+0WiDEXF1mNAddSe6a6vEYIthkG5XRRIMQgW4NP4h8qlcGZWWySo7LXTtvlWRNWGuot9GgKHthjA6lT3ULrut7iVVqVXQR729EPiFplsYdnBjI4BI6cwnT0I+NF9ocpw1o/h7AtmO9CbkHrqB60xxzD21w9sqIIcgnv7JIqbwOyt1ilwkpbVrmWSYjcAdJnp3V0y3VyJ8ylNcZMjIG/YOzw2gclyuKid6SZf1NdB7RcL5d5ggJQgMuhMAiYqJyjtHWgc4FW6RsFvhViW7hp5nQfmfSvLYO1Gu2jbhGEHcg6GTsD6a/7jWYcqs3G1CFYA0liSQJ6Dsmfh1qEWUa9w+Ae0pZfeUTI7+kGOsE/WncH7SXrNk2QAdCFY7qDvUbCu85kzSPxKDpM9Rt1ptcQLsK7HmbKx1mdlczO+x13102IhA5mzroGEOuux0Pr1+OvpTdtYPrSRvAU0bkw3fv5j9A0bTCB7SV22H9pLYs8vJ0+dCue1K8oiO1EVyguGlcS1T0LPukNBkX2j5KbxS9nct31vwfFKh1pbFGpzPSqpgrTps1NhcgKPZBOgFAFVeEW5BrPAkr0FV+lspO7aYbivBPca6B8JIoJ4d40fRlVRxbSLqIEMzBrYqe6rQwA761tYUE1Ggqf1TcqQqt3GvOU3ca6IcOHfUrF3ijFQBUlpGV1PiOkMNQ7+JvsACXgdBIoRtXGYA5iWMDOTv5mvWxr98elDbEOYOY6GR4HvFCe1Oa1wwAFWuezeJPabJqJkvJOoUfMisu+zd5dGNtZMAkvGrog/BsS+/g3dUp8VcJk3HJiPfO3d5UAijmnsPFJFPijE1AO5vqVUxPCsjIvOtdvNJmOXk1h5iGMxBjXTxra1w+0QS2IQaAgSJ1thzJBOWGIWNSYaBpUivKCRyRmlWIjpPo0c/Y/OLF/C4ZQct8schIEfi0hDp57GJ69anAL3vP8ApEdeuby6dT3ahr2a4lG2mWiC4nvj0TIKf9z4oPyNEtOvcfVvLuUePxpQVspogVxYPZKq4W+AR2R6k/1/U1Tv4waQBXOo9Ht3KeyqQ2FWqUA4yuiwmOImI18KoYa9r+u41zuFeq+Df9ehp1N6o16QAXU4DidtAgynRiT3EMIb5RT+Kxi3HBXRVUKJ7gK5iy0x8PUVXwp0PlTAADKzajF1fGMZZfCiLgzghsvXUQR+u6o/s/cGZ0LAc629tSdpidflUu/tSmMaDl/dEevX5mgIgQhDJVH2ixmXEEIQctlbJI8F1j1qEMZcH42/mP8AWsyk0M2zSnOMK3SptaMI3EsS1w8wkksNT4rp9IPrWmDcOrWywBJVlLGBK5hlJ6Tm3OmnjTSYWbbA6mJHh3/L6CpD6GgJTmAEQFWa29m17wE3Bqjq34T1Qmtsdw68bzsUZVLsS7KwQLmPaLbRGtAv33vWkjXKQpUDWTojaamRI8x40PjWIzEKApZZzsoAzOTLbbgbT11PWi1WQNa7V23nwS2Mxma47AaFmI8iSRVng1xGt3DcOWACvie6uZVCTVC8CgC92p8z/QQPjXNcUVSk0gNVdcQnf8qHeZT1qWjV5cNWBUKrdAAUZrAYxNSsfYymiG+ymaDjLpakvdIVykwgrjRVDh18LptU8VsKogrce0OEFdD+0FGhNeXOKJ31z1ZR6yq/6RitHiw7jSv7RaZFKJbY7An0rYW2/dPwNRqJRihTbgJxuJ3D1ik7jkmTvRLWGdtkc+hrd+H3R/lv8KK5UN6JhgQEsa8pg4S5IGR5JgadaZXgOJJgWHPkP71ABOAidWptu5wHeQphryq9z2exIKg2iMzhO+CY1aPdGo1pvE+yty3GfEYdQQCM7upgkDVcsjUwe6NYouifySX8fwzLF4+V/KVz1eVbXh2FCy2LEkSAts6aj3hvsTp66iiJgbLo3KTEXcpHbVCWP3NxmlQMiAPy9JLQGNCGkrqnG02CSHR/xIHLJgb9/YoFeinsPwu+7m2LTZ4BKkZSA0AEho/eHxpp+B3FXMzWlEE63IPZ5gYKB73+GdtDIioDTyTH8XQYYLx9fdovKkCthVPFcMtW0uN9qtXGE5EQklouZJJ2Ayy3wpjk4Fd7t5+zqVXIS/MSOWGGnYzzmP5VIalnjGaQ5gc68WaezmBz8+RUcUa2aafF2lAFm0AdZa8iXCRoRo0qDvsoml2uZmzaaxsioNABoqgAbdKlE1z3XIgdpv8ASI8Z7E/hjVfBn6f1qRhBJqvghvT6Zuq1dtlXwOXUMSNJGm5/RrosLgyUZgdoncR51zOAuEumbYEfCR/Suuv4thmX95VzR1if7VYkysmqIN0kcO2rRIUZtwdtvyqHd6kn8zXVYNkKAsNPvA2sZgFUgT4E1zb4dftHJLQObkzRJAzZQYoXEIKe8q1wa2yrbCyA5LOYEQNADPkx9azFgNadmRQc0KQoVoBEydz7w+dacPLMAEe4uUrbOX3Z2BMMCAY7qzj9woFtF8xBzFgIBBEodtZDH5UBwuAOvtQ7RAjy/wDorm+J2srkeNdCrCJqZjrIfKcwBIiDOsEgGQI8Ne6lkKxTMFSMNi3tklTBII9D+gZ6EA0fhiBjrWYjhrgldCRuAyn5TNMcLwbhtVYeYIoYIsrBc0iQUzgsCOZJGg1Pp09TA9aY4hgpGbrTbWimhEE6+nT8z8K9OqGaIKs55mVCweEzzrEVSwnBixpLBXylzzrtOGYcrDmIPdTmxCXVe5pXD8e4WbdQJr6F7aAETXzpjrSn5VvhXFzJK5YU/wAPwYfU7UgKpcOv5RVVsTdbVYu0dVXcPwm3G1GPCU6KKSHFwo0FVsFcLjXSrjQw2hYlXpmdYmyfwHDl2gRRXwCg7ClrQYHc1VWwpHU1ZaARELLquc10k5S1q9bVogTTd1J1AFaHh1sAtHxNc5isa7OUDnw6fA1LnFguFFOkKx6hxmU4A164VzW7QTWe+htxEK123dxJCLbORrZIz3NezPoNu+m+GYe6gzXLKPGxzTPnI0ph3vkEW7eGtkkmbhJA9IoWtObz3H8BFUe0SLRtdtjzmCf8rmsO+G5KtfXHXLtzMhBE28zaRamJaYo1vDsCP+WJ+JALzupBzhVDi6xjR7QAGszGhis/aJa7eW9i1UWhcdDbATNdJH3aFlYrqvvCYrneIcUuXWabl8qTIW5eNwjbc6AnQdO7uqrUc0Dt7hPbmd1oUaFaq8tEhuTJqQNRloaAWTY9oEZCp2beIsKbgOHPNKwidouVnLy7dkR+9rt5EURm5Sljjoe4RedLSgMrulwukaZHByqYgCfCuXy1lI18lofoC52pzhfkxvZHxaoiB/iAreIv4di55mKa4xK8y44ykTAe5AznQBo79OklPG30ICIgAAGdzDtcuCZuBmGZFMjsgxpNIxXoWhJlPp8KynFyYxJtiMWFtuS8FbCtgorcRUgKwXLxRRktmvFuCiC9RgN5pRLjsm8LVfAnWKj4ZqrcOPao2KtWFlcyRBqhYxB79YikSOzW9swae02WVVbKoftR0VQACASYI7xBFT+evOW6wJ1DkA7mZPzrW60iKAZII7j8jp+Q+Nc5QxgVDhHEhav8xT2C2qt1UmYNXPayyly0l9I0hDG2k7eUEVxq0wt5suWTHdOnwpc7I3U+sHBEtOxhe/Sl8ZdkkjyHgBpPn/embQyqzeg8zv8AKfiKVvoR3GQDp4jbzoSjBulHc09wnGZDoSPIxSbig0MpsSIXVY7ifMKuTJjKfTb6/I15iMUMulQcJckFT1Ejvkaj5SPWsuMRpPSf/tEkGmAYRbSZm0767jhiuQFOwrlOBxmkiT0muss8VgQQBTm4VavJMJL2us9ivmeIENXde0fE8wia4bE6mlVMq5wQLW3XK01h9qysqq3K3qmEZq7XgrgASJ0rKyrtD4lj/wAS/phO3rgkwO6n7OLJHdpWVlWmkyVhVGgtEqLxziUKd9jXGXOJsYy9kjrWVlUeIcdS3/4bSZ0cx7hMN7R4phl5kCpr4h295id9yeu9ZWUhziclaTKVOn8DQO4IUV7FZWVCYVkVgrKypUIipNDNZWVJCgFO8K4e99xbQqGOYgsSB2QxMwD0U1Wx3slfs2Hvvctwv4ULGfiBHWvayiaAQSsnjuLrUuJp02GAYmw3cQfBc8KIlZWUK1SnsOKq4I61lZTWqpVwrS3JAphTWVlOGFmPXlw7Vtw+4quHZcw1BU9en1g+lZWUQSzheMiTqCNjoZGo7j/WjpgZXOCMvjofhr9ayspbhdTqMBa8QTLCdw6dSRM/CB6Ulc/X0rKygKNmEtcFBIrysoU8IthoIYbggjz6UfEjtfA/ET+dZWUQwgdldb7FWUCXLrLmywAPOhe2FoIyumgYTFZWUYVEXrrjcVeJ3pO1bzNWVlLK02YX/9k='),(6,'Entorno Grafica','Muy buena electiva',1,4,'2021-05-27 22:55:00','2021-05-27 22:55:00','data:image/jpg;base64,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');
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `idRole` bigint NOT NULL,
  `firstName` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `lastName` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `mail` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `userName` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `userPass` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `creationDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `finalDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `state` int NOT NULL,
  `idDocumentType` bigint NOT NULL,
  `docNumber` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `isActivate` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userName` (`userName`),
  UNIQUE KEY `mail` (`mail`),
  KEY `idRole` (`idRole`),
  KEY `user_documentType` (`idDocumentType`),
  CONSTRAINT `user_documentType` FOREIGN KEY (`idDocumentType`) REFERENCES `documenttype` (`id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`idRole`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (19,25,'Admin','Admin','prade5_16@hotmail.com','Ovidio Lagos 127 piso 7 Depto 4','3415498000','admin516','aHV1b1ZzRzFLUDhoTnViT0c4OElqQT09','2021-06-22 23:19:00','2021-06-22 23:19:00',1,1,'19032740',1),(20,74,'Postulacion','Postulacion','xoked75601@bbsaili.com','d','34','postulacion','Q3hDMTRuRVU5bVlxSFV6eWpESDNBdz09','2021-06-23 15:13:50','2021-06-23 15:13:50',1,1,'934532',1),(21,73,'Jefe catedra','Jefe catedra','ximajof403@0ranges.com','d','34325','jefecatedra','VWQraUFCWGhiTnY4UUUxTWxBYm0vQT09','2021-06-23 15:16:38','2021-06-23 15:16:38',1,2,'934532',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'tpfinalentorno'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-27  0:34:30
