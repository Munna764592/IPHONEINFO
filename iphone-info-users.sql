-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 22, 2023 at 06:30 PM
-- Server version: 8.0.32
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `iphone-info-users`
--

-- --------------------------------------------------------

--
-- Table structure for table `iphonedata`
--

DROP TABLE IF EXISTS `iphonedata`;
CREATE TABLE IF NOT EXISTS `iphonedata` (
  `sno` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `available` int NOT NULL,
  `price` int NOT NULL,
  `value` int NOT NULL,
  PRIMARY KEY (`sno`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `iphonedata`
--

INSERT INTO `iphonedata` (`sno`, `name`, `available`, `price`, `value`) VALUES
(1, 'APPLE IPHONE 14', 1979, 72999, 79900),
(2, 'APPLE IPHONE 13(128GB)', 6340, 62992, 69900),
(3, 'APPLE IPHONE 12(256GB)', 6340, 66990, 74900),
(4, 'APPLE IPHONE 14 PRO MAX(128GB)', 34, 127999, 139900),
(5, 'APPLE IPHONE 11(64GB)', 1, 40999, 43900),
(6, 'APPLE IPHONE 14 PRO(1TB)', 6340, 62992, 179900),
(7, 'APPLE IPHONE 12 PRO(512GB)', 984, 106699, 134999),
(8, 'APPLE IPHONE 13 MINI(256GB)', 9848, 71999, 74900),
(9, 'APPLE IPHONE XR(64GB)', 845, 36999, 47900),
(10, 'APPLE IPHONE 6S PLUS(32GB)', 984, 34900, 39900),
(11, 'APPLE IPHONE 12 PRO(128GB)', 874, 78899, 109900),
(12, 'APPLE IPHONE 8 PLUS(64GB)', 9383, 49900, 80730),
(13, 'APPLE IPHONE 7', 3874, 13999, 19900),
(14, 'APPLE IPHONE 6S', 734, 9989, 15999),
(15, 'APPLE IPHONE 5', 0, 4999, 9999);

-- --------------------------------------------------------

--
-- Table structure for table `registrations`
--

DROP TABLE IF EXISTS `registrations`;
CREATE TABLE IF NOT EXISTS `registrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `names` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(100) NOT NULL,
  `person_id` varchar(50) NOT NULL,
  `otp` int NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `registrations`
--

INSERT INTO `registrations` (`id`, `names`, `email`, `person_id`, `otp`, `create_at`) VALUES
(4, 'muna', 'mhj@gmail.com', '75858', 18532, '2023-03-21 15:47:45'),
(6, 'nikhil', 'mk@gmail.com', '546464', 63297, '2023-03-21 16:21:10'),
(7, 'kumar', 'm@gmail.com', '75574', 91365, '2023-03-21 16:40:18');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
