-- MySQL dump 10.13  Distrib 8.0.33, for macos13 (arm64)
--
-- Host: localhost    Database: ahp
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `divisi`
--

DROP TABLE IF EXISTS `divisi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `divisi` (
  `divisi_id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(100) DEFAULT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`divisi_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `divisi`
--

LOCK TABLES `divisi` WRITE;
/*!40000 ALTER TABLE `divisi` DISABLE KEYS */;
INSERT INTO `divisi` VALUES (2,'123','Divisi Management',NULL,'2023-08-08 09:07:19'),(3,'12345','Divisi Accounting',NULL,'2023-08-08 09:08:36'),(4,'12444','Divisi Engineering',NULL,'2023-08-09 10:20:47');
/*!40000 ALTER TABLE `divisi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `karyawan`
--

DROP TABLE IF EXISTS `karyawan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `karyawan` (
  `karyawan_id` int NOT NULL AUTO_INCREMENT,
  `nik` varchar(100) DEFAULT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `jenis_kelamin` enum('Laki-laki','Perempuan') DEFAULT NULL,
  `tempat_lahir` varchar(100) DEFAULT NULL,
  `tanggal_lahir` varchar(100) DEFAULT NULL,
  `agama` varchar(100) DEFAULT NULL,
  `status_pernikahan` varchar(100) DEFAULT NULL,
  `alamat` text,
  `no_telpon` varchar(100) DEFAULT NULL,
  `pendidikan_terakhir` varchar(100) DEFAULT NULL,
  `status_karyawan` varchar(100) DEFAULT NULL,
  `projek_id` int DEFAULT NULL,
  `jabatan` varchar(100) DEFAULT NULL,
  `no_ktp` varchar(100) DEFAULT NULL,
  `npwp` varchar(100) DEFAULT NULL,
  `tanggal_masuk` varchar(100) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`karyawan_id`),
  KEY `karyawan_FK` (`projek_id`),
  CONSTRAINT `karyawan_FK` FOREIGN KEY (`projek_id`) REFERENCES `projek` (`projek_id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `karyawan`
--

LOCK TABLES `karyawan` WRITE;
/*!40000 ALTER TABLE `karyawan` DISABLE KEYS */;
INSERT INTO `karyawan` VALUES (1,'123456789','Hamdan IbraKoki','Laki-laki','Kuningan','29-12-1990','Islam','Belum Kawin','Jl Kost Edi 100d','08237999','Strata 1','Tetap',4,'Administrasi','1671829301','23456789','05-05-2021','/images/hamdan.jpeg'),(3,'145884778','Irfan','Laki-laki','Samarinda','02-05-1990','Islam','Kawin','Jl Kost Edi 100d','08237999','Strata 1','Tetap',4,'Software Engineer','1671829302',NULL,'12-08-2009','/images/IMAGE_(1).png'),(5,'127839201','Ari','Laki-laki','Samarinda','05-03-1998','Islam','Kawin','Jl Bekasi Cikarang','08237222111','Strata 1','Tetap',4,'Software Engineer','1671829301','1231231','05-05-2021','/images/Screenshot_2023-08-12_at_01.21.20.png'),(7,'77665533772','Kevin Lusianto','Laki-laki','Pontianak','30-12-1995','Katolik','Belum Kawin','Jl Tangerang Kota','08237222111','Strata 1','Tetap',4,'Software Engineer','1671829301','1231231','06-05-2020','/images/kepin.jpeg'),(8,'6655277188123','Narwanto','Laki-laki','Salatiga','02-06-1995','Islam','Kawin','Jl. Jateng Salatiga','082738990001','Strata 1','Tetap',11,'Software Engineer','6677766277881','188899123123123','06-05-2021','/images/cool.jpg');
/*!40000 ALTER TABLE `karyawan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kriteria`
--

DROP TABLE IF EXISTS `kriteria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kriteria` (
  `kriteria_id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(100) DEFAULT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `eigen` float DEFAULT NULL,
  `bobot_prioritas` float DEFAULT NULL,
  PRIMARY KEY (`kriteria_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kriteria`
--

LOCK TABLES `kriteria` WRITE;
/*!40000 ALTER TABLE `kriteria` DISABLE KEYS */;
INSERT INTO `kriteria` VALUES (15,'K1','Prestasi Pekerjaan',0.929525,0.47668),(16,'K2','Kemampuan Teknis',1.12514,0.221338),(17,'K3','Kedisiplinan',1.26449,0.166746),(18,'K4','Komunikasi',1.02435,0.0819482),(19,'K5','Kerjasama',0.905899,0.0532882);
/*!40000 ALTER TABLE `kriteria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matriks_perbandingan`
--

DROP TABLE IF EXISTS `matriks_perbandingan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `matriks_perbandingan` (
  `matriks_id` int NOT NULL AUTO_INCREMENT,
  `xIndex` int DEFAULT NULL,
  `yIndex` int DEFAULT NULL,
  `value` float DEFAULT '0',
  `kriteria_id` int DEFAULT NULL,
  `subkriteria_id` int DEFAULT NULL,
  PRIMARY KEY (`matriks_id`),
  KEY `matriks_perbandingan_FK_1` (`subkriteria_id`),
  KEY `matriks_perbandingan_FK` (`kriteria_id`),
  CONSTRAINT `matriks_perbandingan_FK` FOREIGN KEY (`kriteria_id`) REFERENCES `kriteria` (`kriteria_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `matriks_perbandingan_FK_1` FOREIGN KEY (`subkriteria_id`) REFERENCES `subkriteria` (`subkriteria_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=840 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matriks_perbandingan`
--

LOCK TABLES `matriks_perbandingan` WRITE;
/*!40000 ALTER TABLE `matriks_perbandingan` DISABLE KEYS */;
INSERT INTO `matriks_perbandingan` VALUES (770,0,0,1,15,NULL),(771,1,0,3,15,NULL),(772,2,0,4,15,NULL),(773,3,0,5,15,NULL),(774,4,0,6,15,NULL),(775,0,1,0.333333,16,NULL),(776,1,1,1,16,NULL),(777,2,1,2,16,NULL),(778,3,1,3,16,NULL),(779,4,1,4,16,NULL),(780,0,2,0.25,17,NULL),(781,1,2,0.5,17,NULL),(782,2,2,1,17,NULL),(783,3,2,3,17,NULL),(784,4,2,4,17,NULL),(785,0,3,0.2,18,NULL),(786,1,3,0.333333,18,NULL),(787,2,3,0.333333,18,NULL),(788,3,3,1,18,NULL),(789,4,3,2,18,NULL),(790,0,4,0.166667,19,NULL),(791,1,4,0.25,19,NULL),(792,2,4,0.25,19,NULL),(793,3,4,0.5,19,NULL),(794,4,4,1,19,NULL),(795,0,0,1,NULL,145),(796,1,0,3,NULL,145),(797,2,0,9,NULL,145),(798,0,1,0.333333,NULL,146),(799,1,1,1,NULL,146),(800,2,1,5,NULL,146),(801,0,2,0.111111,NULL,147),(802,1,2,0.2,NULL,147),(803,2,2,1,NULL,147),(804,0,0,1,NULL,148),(805,1,0,3,NULL,148),(806,2,0,6,NULL,148),(807,0,1,0.333333,NULL,149),(808,1,1,1,NULL,149),(809,2,1,4,NULL,149),(810,0,2,0.166667,NULL,150),(811,1,2,0.25,NULL,150),(812,2,2,1,NULL,150),(813,0,0,1,NULL,151),(814,1,0,3,NULL,151),(815,2,0,5,NULL,151),(816,0,1,0.333333,NULL,152),(817,1,1,1,NULL,152),(818,2,1,3,NULL,152),(819,0,2,0.2,NULL,153),(820,1,2,0.333333,NULL,153),(821,2,2,1,NULL,153),(822,0,0,1,NULL,154),(823,1,0,2,NULL,154),(824,2,0,7,NULL,154),(825,0,1,0.5,NULL,155),(826,1,1,1,NULL,155),(827,2,1,5,NULL,155),(828,0,2,0.142857,NULL,156),(829,1,2,0.2,NULL,156),(830,2,2,1,NULL,156),(831,0,0,1,NULL,157),(832,1,0,2,NULL,157),(833,2,0,5,NULL,157),(834,0,1,0.5,NULL,158),(835,1,1,1,NULL,158),(836,2,1,3,NULL,158),(837,0,2,0.2,NULL,159),(838,1,2,0.333333,NULL,159),(839,2,2,1,NULL,159);
/*!40000 ALTER TABLE `matriks_perbandingan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nilai_karyawan`
--

DROP TABLE IF EXISTS `nilai_karyawan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nilai_karyawan` (
  `nilai_id` int NOT NULL AUTO_INCREMENT,
  `karyawan_id` int DEFAULT NULL,
  `nilai_hasil` float DEFAULT NULL,
  `persentase` float DEFAULT NULL,
  `lama_kerja` varchar(100) DEFAULT NULL,
  `periode` varchar(100) DEFAULT NULL,
  `no_penilaian` varchar(100) NOT NULL,
  `tanggal_penilaian` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`nilai_id`),
  KEY `nilai_karyawan_FK` (`karyawan_id`),
  CONSTRAINT `nilai_karyawan_FK` FOREIGN KEY (`karyawan_id`) REFERENCES `karyawan` (`karyawan_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nilai_karyawan`
--

LOCK TABLES `nilai_karyawan` WRITE;
/*!40000 ALTER TABLE `nilai_karyawan` DISABLE KEYS */;
INSERT INTO `nilai_karyawan` VALUES (14,1,0.0899856,9,'0','2023','PK003','11-08-2023'),(18,3,0.331747,33,'1','2023','PK-17','11-08-2023'),(19,5,0.522184,52,'2','2023','PK-19','11-08-2023'),(20,8,0.645334,65,'2','2023','PK-20','11-08-2023'),(21,7,0.446398,45,'3','2023','PK-21','11-08-2023');
/*!40000 ALTER TABLE `nilai_karyawan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `penilaian`
--

DROP TABLE IF EXISTS `penilaian`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `penilaian` (
  `penilaian_id` int NOT NULL AUTO_INCREMENT,
  `nilai_id` int DEFAULT NULL,
  `subkriteria_id` int DEFAULT NULL,
  PRIMARY KEY (`penilaian_id`),
  KEY `penilaian_FK_1` (`subkriteria_id`),
  KEY `penilaian_FK` (`nilai_id`),
  CONSTRAINT `penilaian_FK` FOREIGN KEY (`nilai_id`) REFERENCES `nilai_karyawan` (`nilai_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `penilaian_FK_1` FOREIGN KEY (`subkriteria_id`) REFERENCES `subkriteria` (`subkriteria_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `penilaian`
--

LOCK TABLES `penilaian` WRITE;
/*!40000 ALTER TABLE `penilaian` DISABLE KEYS */;
INSERT INTO `penilaian` VALUES (57,14,147),(58,14,150),(59,14,153),(60,14,156),(61,14,158),(77,18,147),(78,18,148),(79,18,151),(80,18,154),(81,18,159),(82,19,145),(83,19,149),(84,19,151),(85,19,156),(86,19,157),(87,20,145),(88,20,148),(89,20,151),(90,20,154),(91,20,157),(92,21,145),(93,21,150),(94,21,152),(95,21,154),(96,21,158);
/*!40000 ALTER TABLE `penilaian` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projek`
--

DROP TABLE IF EXISTS `projek`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projek` (
  `projek_id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(100) DEFAULT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `divisi_id` int DEFAULT NULL,
  PRIMARY KEY (`projek_id`),
  KEY `projek_FK` (`divisi_id`),
  CONSTRAINT `projek_FK` FOREIGN KEY (`divisi_id`) REFERENCES `divisi` (`divisi_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projek`
--

LOCK TABLES `projek` WRITE;
/*!40000 ALTER TABLE `projek` DISABLE KEYS */;
INSERT INTO `projek` VALUES (4,'P3','FGC',4),(6,'P00001','FMC',4),(7,'P0003','AstraPays',4),(9,'P0009','BCAFinance',4),(11,'P0010','Staff',2);
/*!40000 ALTER TABLE `projek` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subkriteria`
--

DROP TABLE IF EXISTS `subkriteria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subkriteria` (
  `subkriteria_id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(100) DEFAULT NULL,
  `keterangan` varchar(100) DEFAULT NULL,
  `nilai` int DEFAULT NULL,
  `kriteria_id` int DEFAULT NULL,
  `bobot_prioritas` float DEFAULT NULL,
  `eigen` float DEFAULT NULL,
  PRIMARY KEY (`subkriteria_id`),
  KEY `subkriteria_FK` (`kriteria_id`),
  CONSTRAINT `subkriteria_FK` FOREIGN KEY (`kriteria_id`) REFERENCES `kriteria` (`kriteria_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=160 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subkriteria`
--

LOCK TABLES `subkriteria` WRITE;
/*!40000 ALTER TABLE `subkriteria` DISABLE KEYS */;
INSERT INTO `subkriteria` VALUES (145,'Sangat Baik','Sangat Baik',90,15,0.668864,0.966138),(146,'Baik','Baik',75,15,0.267399,1.12308),(147,'Kurang','Kurang',60,15,0.0637363,0.956044),(148,'Sangat Baik','Sangat Baik',90,16,0.639334,0.959002),(149,'Baik','Baik',75,16,0.273718,1.1633),(150,'Kurang','Kurang',60,16,0.0869479,0.956427),(151,'Sangat Baik','Sangat Baik',90,17,0.633346,0.97113),(152,'Baik','Baik',75,17,0.260498,1.12882),(153,'Kurang','Kurang',60,17,0.106156,0.955407),(154,'Sangat Baik','Sangat Baik',90,18,0.590719,0.970467),(155,'Baik','Baik',75,18,0.333821,1.06823),(156,'Kurang','Kurang',60,18,0.0754599,0.980978),(157,'Sangat Baik','Sangat Baik',90,19,0.581264,0.988148),(158,'Baik','Baik',75,19,0.30915,1.0305),(159,'Kurang','Kurang',60,19,0.109586,0.986274);
/*!40000 ALTER TABLE `subkriteria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `nama_lengkap` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','admin@altx.id','password','2023-08-08 07:32:22','2023-08-08 07:32:22','Deni Manusia Ikan'),(7,'windah4','ageng@gmail.com','passw2','2023-08-08 08:31:42','2023-08-08 08:31:42','Ageng Setyo Nugroho'),(8,'jangkric','jangkric@gmail.com','password',NULL,'2023-08-09 15:52:44','Ahmad Luthfi'),(9,'Dafa','dafa@gmail.com','passowrd',NULL,'2023-08-09 15:54:05','Dafa Nurdiansah'),(11,'windah4','ageng@gmail.com','passw2','2023-08-08 08:31:42','2023-08-08 08:31:42','Windah Setyo Nugroho');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'ahp'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-12 20:58:25
