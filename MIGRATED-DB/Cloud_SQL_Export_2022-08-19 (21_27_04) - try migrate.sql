-- MySQL dump 10.13  Distrib 8.0.18, for Linux (x86_64)
--
-- Host: localhost    Database: d-jahit-relational
-- ------------------------------------------------------
-- Server version	8.0.26-google

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
-- Current Database: `d-jahit-relational`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `d-jahit-migrate` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `d-jahit-migrate`;

--
-- Table structure for table `tbl_comment`
--

DROP TABLE IF EXISTS `tbl_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_comment` (
  `commentId` varchar(50) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `comment` text,
  `rating` int DEFAULT NULL,
  PRIMARY KEY (`commentId`),
  FOREIGN KEY (`userId`, `username`) REFERENCES `tbl_user` (`userId`, `username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_comment`
--

LOCK TABLES `tbl_comment` WRITE;
/*!40000 ALTER TABLE `tbl_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_image`
--

-- DROP TABLE IF EXISTS `tbl_image`;
-- /*!40101 SET @saved_cs_client     = @@character_set_client */;
-- /*!50503 SET character_set_client = utf8mb4 */;
-- CREATE TABLE `tbl_image` (
--   `imageId` varchar(50) NOT NULL,
--   `image_url` text,
--   PRIMARY KEY (`imageId`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- /*!40101 SET character_set_client = @saved_cs_client */;

-- --
-- -- Dumping data for table `tbl_image`
-- --

-- LOCK TABLES `tbl_image` WRITE;
-- /*!40000 ALTER TABLE `tbl_image` DISABLE KEYS */;
-- INSERT INTO `tbl_image` VALUES ('0be45152-2d23-4e4f-b96d-f9b200beac87','https://storage.googleapis.com/cogent-tempo-351103.appspot.com/11-Jun-20228411109131367017507.jpg'),('0db7ac4e-328e-461a-869d-6738c4a6c55c','https://storage.googleapis.com/cogent-tempo-351103.appspot.com/pngwing.com.png'),('324f23e9-d9ff-4526-81eb-725b63cc4d6d','https://storage.googleapis.com/cogent-tempo-351103.appspot.com/11-Jun-20225465682166292623905.jpg'),('55117ada-808f-476e-b83b-1053f0ebb328','https://storage.googleapis.com/cogent-tempo-351103.appspot.com/10-Jun-20228647833517113535619.jpg'),('6636acba-bb99-4bc7-9a87-3ba9e028ebf2','https://storage.googleapis.com/cogent-tempo-351103.appspot.com/11-Jun-20224537498840888240392.jpg'),('7317028e-3651-4d94-a3dd-4f977fe7326c','https://storage.googleapis.com/cogent-tempo-351103.appspot.com/6a9e2c0cab11c54b4ff98db6942b1855.jpg'),('7393e845-43a3-48b1-8324-578c0f772444','https://storage.googleapis.com/cogent-tempo-351103.appspot.com/11-Jun-20226723176841042686521.jpg'),('ab3e94bd-1506-4c2f-adac-b13cf9cb79bc','https://storage.googleapis.com/cogent-tempo-351103.appspot.com/11-Jun-20228853530696729491039.jpg'),('cb184256-d7f9-4433-9e88-40b1218175dd','https://storage.googleapis.com/cogent-tempo-351103.appspot.com/12-Jun-2022441255741235188362.jpg'),('db76e410-221a-47fc-86d4-36091b8e805c','https://storage.googleapis.com/cogent-tempo-351103.appspot.com/kebaya.png'),('df921011-594f-4c9c-9375-9c1d77564f55','https://storage.googleapis.com/cogent-tempo-351103.appspot.com/Drone-Dji-MG-1S-Agicultural.jpg'),('e502e60b-8e4c-4907-aa90-d90c8cf53289','https://storage.googleapis.com/cogent-tempo-351103.appspot.com/11-Jun-20226588163139987270594.jpg');
-- /*!40000 ALTER TABLE `tbl_image` ENABLE KEYS */;
-- UNLOCK TABLES;

--
-- Table structure for table `tbl_product`
--

DROP TABLE IF EXISTS `tbl_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_product` (
  `productId` varchar(50) NOT NULL,
  `sellerId` varchar(50) NOT NULL,
  `productPhoto` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `definition` text,
  `price_1` double DEFAULT NULL,
  `price_2` double DEFAULT NULL,
  `insertedAt` varchar(50) DEFAULT NULL,
  `updatedAt` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`productId`),
  FOREIGN KEY (`sellerId`) REFERENCES `tbl_seller` (`sellerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_product`
--

LOCK TABLES `tbl_product` WRITE;
/*!40000 ALTER TABLE `tbl_product` DISABLE KEYS */;
INSERT INTO `tbl_product` VALUES ('1ef6ea7d-9da8-48d3-accf-6e6f93375052','3fc447a4-7393-41cc-84d6-a4037c766819','https://storage.googleapis.com/cogent-tempo-351103.appspot.com/4.500.jpg','Wedding dress','Long + Wedding dress','Wedding dress woman',300000,400000,'2022-06-12T10:08:06.704Z',NULL),('2c48e097-93d7-4aa0-9506-008337e5e749','fbca22c5-0adf-4717-8a32-c80b03773bbb','https://storage.googleapis.com/cogent-tempo-351103.appspot.com/12-Jun-20222683750795411196286.jpg','kebaya ungu','kebaya','kebaya yg cantik',120000,13000,'2022-06-12T13:32:34.805Z',NULL),('3361997b-044c-4059-a0e9-beba09ab8535','3fc447a4-7393-41cc-84d6-a4037c766819','https://storage.googleapis.com/cogent-tempo-351103.appspot.com/10.500.jpg','Chill Sweater','Sweater','Sweater for chill',150000,250000,'2022-06-12T10:03:27.144Z',NULL),('4d372478-5d7a-40e9-8e05-c8f0f05304a5','f05a760b-818d-4f6d-8ddc-48480f9c45ec','https://storage.googleapis.com/cogent-tempo-351103.appspot.com/12-Jun-20221796475658397988142.jpg','wedi','long dress','wi',1200,12,'2022-06-12T14:25:34.522Z',NULL),('545c9c04-ee67-4451-90b7-af5cd49eb448','fbca22c5-0adf-4717-8a32-c80b03773bbb','https://storage.googleapis.com/cogent-tempo-351103.appspot.com/12-Jun-20226341028550688608032.jpg','Kebaya Merah','kebaya','kebaya dengan bahan berkualitas',100000,20000,'2022-06-12T13:22:16.593Z',NULL),('597b3f4f-b089-4e94-b788-08ee25ade0fa','fbca22c5-0adf-4717-8a32-c80b03773bbb','https://storage.googleapis.com/cogent-tempo-351103.appspot.com/12-Jun-20226562578422048416664.jpg','jaket gununh','jacket','Bahan anti air dan tidak panas',150000,250000,'2022-06-12T13:24:30.453Z',NULL),('62d53d0c-8c42-4b78-aa55-7e0c815903a1','3fc447a4-7393-41cc-84d6-a4037c766819','https://storage.googleapis.com/cogent-tempo-351103.appspot.com/13.508.jpg','Command uniform','Uniform','Ukraine command uniform',250000,300000,'2022-06-12T08:36:01.643Z',NULL),('a1a5def2-aeeb-4034-8a3a-9a5c45d09e7a','3fc447a4-7393-41cc-84d6-a4037c766819','https://storage.googleapis.com/cogent-tempo-351103.appspot.com/10.515.jpg','Woman Sweater','Sweater','Sweater for woman',150000,250000,'2022-06-12T10:05:14.743Z',NULL),('c382a00d-3c9e-4aa8-add2-28b347a32eb5','fbca22c5-0adf-4717-8a32-c80b03773bbb','https://storage.googleapis.com/cogent-tempo-351103.appspot.com/12-Jun-2022739567691513458023.jpg','kebaya hitam','coat','kebaya hitam',120000,130000,'2022-06-12T13:33:09.417Z',NULL),('d0b15987-14d4-4ce6-9621-6163364e3675','3fc447a4-7393-41cc-84d6-a4037c766819','https://storage.googleapis.com/cogent-tempo-351103.appspot.com/13.500.jpg','Army uniform','Uniform','South Korea army uniform',200000,300000,'2022-06-12T08:34:33.081Z',NULL),('e9696211-45e1-4ce7-a6b4-3807dd4497e1','fbca22c5-0adf-4717-8a32-c80b03773bbb','https://storage.googleapis.com/cogent-tempo-351103.appspot.com/12-Jun-20222185548764096276742.jpg','Blouse ','blouse','Bahan Nyaman dan desain menawan',75000,125000,'2022-06-12T13:23:38.011Z',NULL);
/*!40000 ALTER TABLE `tbl_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_seller`
--

DROP TABLE IF EXISTS `tbl_seller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_seller` (
  `sellerId` varchar(50) NOT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `shopName` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `streetName` text,
  `detailStreet` text,
  `skill` varchar(255) DEFAULT NULL,
  `sellerPhoto` varchar(255) DEFAULT NULL,
  `sellerName` varchar(255) DEFAULT NULL,
  `phoneNumber` int DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longtitude` double DEFAULT NULL,
  `insertedAt` varchar(50) DEFAULT NULL,
  `updatedAt` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`sellerId`),
  FOREIGN KEY (`userId`) REFERENCES `tbl_user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_seller`
--

LOCK TABLES `tbl_seller` WRITE;
/*!40000 ALTER TABLE `tbl_seller` DISABLE KEYS */;
-- INSERT INTO `tbl_seller` VALUES ('2de1cf9d-72f2-4fac-8462-673bb4cfa799','3fc447a4-7393-41cc-84d6-a4037c766819','Jedah Nulis','DKI Jakarta','DKI Jakarta','Jl. Jendral Soedirman','Kepurangan selatan','Menjahit','https://storage.googleapis.com/cogent-tempo-351103.appspot.com/orang_2.jpg','Desta Mahabrata',1228329123,'desta@gmail.com',1.321238123,1.321238123,'2022-06-12T08:26:22.116Z',NULL),('fbca22c5-0adf-4717-8a32-c80b03773bbb','8450fcce-d358-4f67-8228-e9985c411f00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2022-06-12T11:53:04.118Z','2022-06-12T13:57:14.564Z'),('b4f9458a-b961-42a5-88dd-e9d002bf8371','8450fcce-d358-4f67-8228-e9985c411f00','shanaz Tailor','Jakarta','Jakarta Timur','Jl cakung baratt','rumah nomer12 cat kuning',NULL,'https://storage.googleapis.com/cogent-tempo-351103.appspot.com/12-Jun-20223860495080738503344.jpg','Shanaz Natasya',NULL,NULL,-6.255166952800916,NULL,'2022-06-12T13:12:44.227Z',NULL),('9236fbe7-9572-4164-91ac-d25296902f77','85c46f1c-6ddd-432b-96e5-aeb831cba485','coba','Jawa Barat','Kab.Bekasi','Kp.kobak Rt.08/017 Mekarsari Tambun Selatan','rumah kunug',NULL,'https://storage.googleapis.com/cogent-tempo-351103.appspot.com/12-Jun-20225172425143857616534.jpg','Jundi Nasrullah',NULL,NULL,-6.2554045814339565,NULL,'2022-06-12T14:16:36.190Z',NULL),('6ce93b15-efb7-490e-9e7f-50b742ff0a7e','55e96fc2-55ae-44f8-9dd8-45bb21fa104d','lala','jawa','Kab.Bekasi','Kp.kobak Rt.08/017 Mekarsari Tambun Selatan','lalal',NULL,'https://storage.googleapis.com/cogent-tempo-351103.appspot.com/12-Jun-20227597528325482265938.jpg','Jundi Nasrullah',NULL,NULL,-6.254760684242624,NULL,'2022-06-12T14:21:31.634Z',NULL),('f05a760b-818d-4f6d-8ddc-48480f9c45ec','1686ca83-2a48-4b3d-9e69-27861b3711ca','kaka','akak','akka','kaka','akak',NULL,'https://storage.googleapis.com/cogent-tempo-351103.appspot.com/12-Jun-20223763655023993760086.jpg','akak',NULL,NULL,-6.255186949604499,NULL,'2022-06-12T14:25:12.079Z',NULL);
/*!40000 ALTER TABLE `tbl_seller` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_transaction`
--

DROP TABLE IF EXISTS `tbl_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_transaction` (
  `transactionId` varchar(50) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `productName` varchar(255) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price` double DEFAULT NULL,
  `insertedAt` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`transactionId`),
  FOREIGN KEY (`userId`, `username`) REFERENCES `tbl_user` (`userId`, `username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_transaction`
--

LOCK TABLES `tbl_transaction` WRITE;
/*!40000 ALTER TABLE `tbl_transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_user`
--

DROP TABLE IF EXISTS `tbl_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_user` (
  `userId` varchar(255) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `dateOfBirth` varchar(255) DEFAULT NULL,
  `phoneNumber` int DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `photoProfile` varchar(255) DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longtitude` double DEFAULT NULL,
  `insertedAt` varchar(50) DEFAULT NULL,
  `updatedAt` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`userId`,`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_user`
--

LOCK TABLES `tbl_user` WRITE;
/*!40000 ALTER TABLE `tbl_user` DISABLE KEYS */;
-- INSERT INTO `tbl_user` VALUES ('0df99ded-b0e5-479d-a273-28912d44ec46','bela','bela','bella1',NULL,NULL,NULL,'bela@gmail.com',NULL,NULL,NULL,'2022-06-12T14:19:44.980Z',NULL),('1686ca83-2a48-4b3d-9e69-27861b3711ca','kaka','kaka','kaka12',NULL,NULL,NULL,'kaka@gmail.com',NULL,NULL,NULL,'2022-06-12T14:24:26.555Z',NULL),('4117925e-b1ce-47ab-8795-cea77fa24c79','Desta Mahabrata','desta','desta123','Laki-laki','22/06/1980',12231342,'desta@gmail.com','https://storage.googleapis.com/cogent-tempo-351103.appspot.com/orang_3.jpg',1.2342342,1.2342342,'2022-06-12T09:11:58.555Z','2022-06-12T09:25:56.245Z'),('55e96fc2-55ae-44f8-9dd8-45bb21fa104d','lala','lala','lala12',NULL,NULL,NULL,'lala@gmail.com',NULL,NULL,NULL,'2022-06-12T14:20:43.153Z',NULL),('5a08f164-be54-4ebd-b034-819152762fb5','test','test1','test12',NULL,NULL,NULL,'test@gmail.com',NULL,NULL,NULL,'2022-06-12T14:14:21.444Z',NULL),('8450fcce-d358-4f67-8228-e9985c411f00','Shanaz Natasya','Shnts12','shanaz',NULL,NULL,NULL,'shanazns12@gmail.com',NULL,NULL,NULL,'2022-06-12T11:45:53.314Z',NULL),('85c46f1c-6ddd-432b-96e5-aeb831cba485','test2','test2','test21',NULL,NULL,NULL,'test2@gmail.com',NULL,NULL,NULL,'2022-06-12T14:15:33.870Z',NULL),('97e6d38b-16aa-4679-b02c-a3bf9026f69f','Andika Mahendra','andika','andika123','Laki-laki','24/07/1980',812324572,'andika@gmail.com','https://storage.googleapis.com/cogent-tempo-351103.appspot.com/orang_1.jpg',1.237162372,1.237162372,'2022-06-12T08:10:00.206Z',NULL),('c31a0930-8ad2-42ab-b0f4-f94f50fe0730','Nasrullah','nasrul12','nasrul1',NULL,NULL,NULL,'nasrullah@gmail.com',NULL,NULL,NULL,'2022-06-12T14:03:08.384Z',NULL),('d87fd8f0-9e7f-40bb-a362-288b01572508','coba','cobaq','coba12',NULL,NULL,NULL,'coba@gmail.com',NULL,NULL,NULL,'2022-06-12T14:10:51.824Z',NULL),('e820fe96-0b3e-4535-a796-0813077c423b','Jundi Nasrullah','jundi','jundi1',NULL,NULL,NULL,'jundinasrullah88@gmail.com','https://storage.googleapis.com/cogent-tempo-351103.appspot.com/d_jahit_logo.png',NULL,NULL,'2022-06-12T09:17:24.373Z','2022-06-12T11:34:10.745Z');
/*!40000 ALTER TABLE `tbl_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-19 14:27:49
