-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 13, 2024 at 09:07 PM
-- Server version: 8.0.27
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `home_db`
--
CREATE DATABASE IF NOT EXISTS `home_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4;
USE `home_db`;

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
CREATE TABLE IF NOT EXISTS `admins` (
  `id` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `name`, `password`, `email`) VALUES
('shlCPgrZn2OJpsKKCx4K', 'enock', '570390dc968c8a8125b34135568ff45488935fe6', 'merverealestate@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `id` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `number` varchar(10) NOT NULL,
  `message` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `name`, `email`, `number`, `message`) VALUES
('WGBUcalmMV6RKTaJyUBQ', 'Christian Rusabika', 'crusabika@gmail.com', '0744578890', 'hello there\r\nI hope you are doing fine \r\nI just wanted to know how you can help me find a better house to rent.\r\n\r\nRegards \r\nChris Russance'),
('taO15LRD4CmSmwBwQsh9', 'Christian Rusabika', 'crusabika@gmail.com', '093482971', 'yoo man'),
('enEdkOtyzcgmne5CRf6P', 'Christian Rusabika', 'crusabika@gmail.com', '1893713243', 'yooh man ni vipi'),
('t8gpNNwHf6DBJ5hjLWWY', 'Christian Rusabika', 'crusabika@gmail.com', '3133564', 'je voulais vous demander un truc ');

-- --------------------------------------------------------

--
-- Table structure for table `property`
--

DROP TABLE IF EXISTS `property`;
CREATE TABLE IF NOT EXISTS `property` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `property_name` varchar(200) NOT NULL,
  `address` varchar(150) NOT NULL,
  `price` int NOT NULL,
  `type` varchar(150) NOT NULL,
  `offer` varchar(150) NOT NULL,
  `status` varchar(150) NOT NULL,
  `furnished` varchar(150) NOT NULL,
  `bhk` varchar(150) NOT NULL,
  `deposite` varchar(150) NOT NULL,
  `bedroom` varchar(150) NOT NULL,
  `bathroom` varchar(150) NOT NULL,
  `balcony` varchar(150) NOT NULL,
  `carpet` varchar(150) NOT NULL,
  `age` int NOT NULL,
  `total_floors` int NOT NULL,
  `room_floor` int NOT NULL,
  `loan` varchar(150) NOT NULL,
  `lift` varchar(50) NOT NULL,
  `security_guard` varchar(50) NOT NULL,
  `play_ground` varchar(50) NOT NULL,
  `garden` varchar(50) NOT NULL,
  `water_supply` varchar(50) NOT NULL,
  `power_backup` varchar(50) NOT NULL,
  `parking_area` varchar(50) NOT NULL,
  `gym` varchar(50) NOT NULL,
  `shopping_mall` varchar(50) NOT NULL,
  `hospital` varchar(50) NOT NULL,
  `school` varchar(50) NOT NULL,
  `market_area` varchar(50) NOT NULL,
  `image_01` varchar(200) NOT NULL,
  `image_02` varchar(200) NOT NULL,
  `image_03` varchar(200) NOT NULL,
  `image_04` varchar(200) NOT NULL,
  `image_05` varchar(200) NOT NULL,
  `description` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4 NOT NULL,
  `date` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4;

--
-- Dumping data for table `property`
--

INSERT INTO `property` (`id`, `user_id`, `property_name`, `address`, `price`, `type`, `offer`, `status`, `furnished`, `bhk`, `deposite`, `bedroom`, `bathroom`, `balcony`, `carpet`, `age`, `total_floors`, `room_floor`, `loan`, `lift`, `security_guard`, `play_ground`, `garden`, `water_supply`, `power_backup`, `parking_area`, `gym`, `shopping_mall`, `hospital`, `school`, `market_area`, `image_01`, `image_02`, `image_03`, `image_04`, `image_05`, `description`, `date`) VALUES
(1, 1, 'RUTECO APPARTMENT', 'NYOFU', 200, 'flat', 'rent', 'ready to move', 'furnished', '3', '1000', '3', '3', '2', '3', 2, 5, 2, 'available', 'no', 'yes', 'yes', 'no', 'yes', 'yes', 'yes', 'yes', 'no', 'no', 'no', 'no', 'MEii5YnaxoYF9wxxrlGe.jpeg', 'xDgOlyPiKch8bNbkvqpR.jpg', '0DAQQ9sy3Yq9VL9uvySw.jpg', 'WxrTevPSUQ7PzSwD5hvM.jpg', 'gk7iAEULvwuenMVFO48p.jpg', 'They are very nice and at a lower price hurry up &#39;cause time is limited, so hurry up. buy Good at cheep ..!!', '');

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS `requests`;
CREATE TABLE IF NOT EXISTS `requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `property_id` int NOT NULL,
  `sender` varchar(150) NOT NULL,
  `receiver` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `property_id` (`property_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`id`, `property_id`, `sender`, `receiver`) VALUES
(2, 1, '1', '1');

-- --------------------------------------------------------

--
-- Table structure for table `saved`
--

DROP TABLE IF EXISTS `saved`;
CREATE TABLE IF NOT EXISTS `saved` (
  `id` int NOT NULL AUTO_INCREMENT,
  `property_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `property_id` (`property_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4;

--
-- Dumping data for table `saved`
--

INSERT INTO `saved` (`id`, `property_id`, `user_id`) VALUES
(7, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `number` int NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `number`, `email`, `password`) VALUES
(1, 'Christian Rusabika', 744578890, 'crusabika@gmail.com', 'f29fb5e570e0151e3a79264e53ab3b5b98df4a84'),
(3, 'Obedi Nkasiime', 850111738, 'obed@gmail.com', 'cdccc5d83f60916904570e077dcc48707ce6cc94');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
