-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 02, 2023 at 11:06 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `d-jahit-migrate-test`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_comment`
--

CREATE TABLE `tbl_comment` (
  `commentId` varchar(50) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `comment` text DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `insertedAt` varchar(50) DEFAULT NULL,
  `updatedAt` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_product`
--

CREATE TABLE `tbl_product` (
  `productId` varchar(50) NOT NULL,
  `sellerId` varchar(50) NOT NULL,
  `productPhoto` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `definition` text DEFAULT NULL,
  `price` double DEFAULT NULL,
  `insertedAt` varchar(50) DEFAULT NULL,
  `updatedAt` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_product`
--

INSERT INTO `tbl_product` (`productId`, `sellerId`, `productPhoto`, `name`, `category`, `definition`, `price`, `insertedAt`, `updatedAt`) VALUES
('95855c37-0b4f-426a-bf2a-60d4152fddf5', 'a437fa9c-e411-48cf-8b74-5f6c201464b8', 'http:lorem-ipsum-link', 'Baju NIkah', 'Wdding dress', 'lorem ipsum dolor sit amet', 230000, '2023-11-02T10:03:06.541Z', '2023-11-02T10:03:06.541Z');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_seller`
--

CREATE TABLE `tbl_seller` (
  `sellerId` varchar(50) NOT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `shopName` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `detailStreet` text DEFAULT NULL,
  `skill` varchar(255) DEFAULT NULL,
  `sellerPhoto` varchar(255) DEFAULT NULL,
  `sellerName` varchar(255) DEFAULT NULL,
  `phoneNumber` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longtitude` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_seller`
--

INSERT INTO `tbl_seller` (`sellerId`, `userId`, `shopName`, `province`, `city`, `detailStreet`, `skill`, `sellerPhoto`, `sellerName`, `phoneNumber`, `email`, `latitude`, `longtitude`) VALUES
('a437fa9c-e411-48cf-8b74-5f6c201464b8', '3ad0532e-fa9c-478a-8f6c-37ec293db8e7', 'Prilly Nulis', 'DKI Jakarta', 'Jakarta Selatan', 'Jl. Kapurangan', 'Menjahit', 'http:lorem-link', 'Desta Mahabrata', 8173102, 'desta@gmail.com', 1.321238123, 1.321238123),
('a96b4845-1711-4baf-a98a-49006d12f7a4', '25e643c2-39c3-4800-90f3-83e9261b1f25', 'Diego\'s adventure', 'DKI Jakarta', NULL, 'Jl. Lorem', 'Cooking', 'http:lorem-link', 'Desta Mahabrata', 8173102, 'desta@gmail.com', 1.321238123, 1.321238123),
('ab39c6da-42d2-45a0-901f-0be1989609db', '2dcb666b-4bd7-465f-9535-6675e43327f1', 'Jhon\'s house steak', 'Yogyakarta', 'Jakarta Utara', 'Concat', 'Cooking', 'http:lorem-link', 'Desta Mahabrata', 8173102, 'desta@gmail.com', 1.321238123, 1.321238123);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_transaction`
--

CREATE TABLE `tbl_transaction` (
  `transactionId` varchar(50) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `productId` varchar(50) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `productName` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `totalAmount` double DEFAULT NULL,
  `transactionDate` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `userId` varchar(255) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `dateOfBirth` varchar(255) DEFAULT NULL,
  `phoneNumber` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `photoProfile` varchar(255) DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longtitude` double DEFAULT NULL,
  `insertedAt` varchar(50) DEFAULT NULL,
  `updatedAt` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`userId`, `fullName`, `username`, `password`, `gender`, `dateOfBirth`, `phoneNumber`, `email`, `photoProfile`, `latitude`, `longtitude`, `insertedAt`, `updatedAt`) VALUES
('25e643c2-39c3-4800-90f3-83e9261b1f25', 'San Diego', 'Diego', 'lorem ipsum', 'PR', NULL, 61237123, 'diego@gmail.com', NULL, 1.28123123, 2.1238173, '2023-10-31T14:01:09.603Z', '2023-10-31T14:01:09.603Z'),
('2dcb666b-4bd7-465f-9535-6675e43327f1', 'John Wick', 'John', 'lorem ipsum', 'PR', NULL, 8572345, 'john@gmail.com', NULL, 1.28123123, 2.1238173, '2023-10-31T14:12:12.878Z', '2023-10-31T14:12:12.878Z'),
('3ad0532e-fa9c-478a-8f6c-37ec293db8e7', 'Prilly Latu Consina', 'Prilly', 'lorem ipsum', 'PR', NULL, 8572345, 'john@gmail.com', NULL, 1.28123123, 2.1238173, '2023-10-31T14:00:07.682Z', '2023-10-31T14:00:07.682Z');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_comment`
--
ALTER TABLE `tbl_comment`
  ADD PRIMARY KEY (`commentId`),
  ADD KEY `userId` (`userId`,`username`);

--
-- Indexes for table `tbl_product`
--
ALTER TABLE `tbl_product`
  ADD PRIMARY KEY (`productId`),
  ADD KEY `sellerId` (`sellerId`);

--
-- Indexes for table `tbl_seller`
--
ALTER TABLE `tbl_seller`
  ADD PRIMARY KEY (`sellerId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `tbl_transaction`
--
ALTER TABLE `tbl_transaction`
  ADD PRIMARY KEY (`transactionId`),
  ADD KEY `userId` (`userId`,`username`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`userId`,`username`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_comment`
--
ALTER TABLE `tbl_comment`
  ADD CONSTRAINT `tbl_comment_ibfk_1` FOREIGN KEY (`userId`,`username`) REFERENCES `tbl_user` (`userId`, `username`);

--
-- Constraints for table `tbl_product`
--
ALTER TABLE `tbl_product`
  ADD CONSTRAINT `tbl_product_ibfk_1` FOREIGN KEY (`sellerId`) REFERENCES `tbl_seller` (`sellerId`);

--
-- Constraints for table `tbl_seller`
--
ALTER TABLE `tbl_seller`
  ADD CONSTRAINT `tbl_seller_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `tbl_user` (`userId`);

--
-- Constraints for table `tbl_transaction`
--
ALTER TABLE `tbl_transaction`
  ADD CONSTRAINT `tbl_transaction_ibfk_1` FOREIGN KEY (`userId`,`username`) REFERENCES `tbl_user` (`userId`, `username`),
  ADD CONSTRAINT `tbl_transaction_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `tbl_product` (`productId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
