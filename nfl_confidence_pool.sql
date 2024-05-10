-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 10, 2024 at 08:16 PM
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
-- Database: `nfl_confidence_pool`
--

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `game_id` int(11) NOT NULL,
  `espn_id` varchar(64) NOT NULL,
  `year` int(11) NOT NULL,
  `week` int(11) NOT NULL,
  `home_team` varchar(255) NOT NULL,
  `away_team` varchar(255) NOT NULL,
  `kickoff` date NOT NULL,
  `gamestate` varchar(16) NOT NULL,
  `home_score` int(11) NOT NULL,
  `away_score` int(11) NOT NULL,
  `possession` varchar(8) NOT NULL,
  `redzone` tinyint(1) NOT NULL,
  `yardline` int(11) NOT NULL,
  `down` int(11) NOT NULL,
  `yards_to_go` int(11) NOT NULL,
  `period` int(11) NOT NULL,
  `gameclock` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `matchups`
--

CREATE TABLE `matchups` (
  `matchup_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `picked_team` varchar(255) NOT NULL,
  `confidence_points` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pools`
--

CREATE TABLE `pools` (
  `pool_id` int(11) NOT NULL,
  `pool_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pools`
--

INSERT INTO `pools` (`pool_id`, `pool_name`, `description`, `active`) VALUES
(1, 'Next Level Win 2024', 'Primary Pool', 1),
(2, 'Cool New Pool', 'testing creation\\r\\n', 0);

-- --------------------------------------------------------

--
-- Table structure for table `pool_memberships`
--

CREATE TABLE `pool_memberships` (
  `membership_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `pool_id` int(11) NOT NULL,
  `role` enum('owner','admin','player') DEFAULT NULL,
  `cede_value` varchar(2) DEFAULT NULL,
  `dues_paid` decimal(10,2) DEFAULT 0.00,
  `total_dues` decimal(10,2) DEFAULT 0.00,
  `winnings` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pool_memberships`
--

INSERT INTO `pool_memberships` (`membership_id`, `user_id`, `pool_id`, `role`, `cede_value`, `dues_paid`, `total_dues`, `winnings`) VALUES
(1, 2, 1, 'owner', NULL, 170.00, 170.00, 0.00),
(2, 2, 2, 'owner', NULL, 0.00, 0.00, 0.00);

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `result_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `week` int(11) NOT NULL,
  `wins` int(11) NOT NULL,
  `losses` int(11) NOT NULL,
  `ties` int(11) NOT NULL,
  `total_points` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0,
  `canCreate` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `email`, `phone`, `isAdmin`, `canCreate`) VALUES
(2, 'Joepowles', '$2y$10$l1h9vJMxqP8i1lD2AfhFDOZbmM4W2Un7QN6HSvnnQr/.3.Nmnnn2e', 'Joepowles@gmail.com', '8154047178', 1, 1),
(3, 'bluemoon', '$2y$10$VSFt.b3HY.Xl/Gfn0ylytuuSOanZe3qCJw2jsk3k2.qpmBk322Rr6', 'bluemoon1.mc@gmail.com', '8152458895', 0, 0),
(4, 'KingDaddy', '$2y$10$tPd4HTM9gNpGK7zoOj5nlud02iPoC70xfsXwdtuTBpd8wC7MFwpte', 'testing@joepowles.com', '8154047178', 0, 0),
(6, 'KingDaddy2', '$2y$10$H7eTTvViT//EDb2ZTRMuKOzvNAWa2RgsXLKtwCSaVB9Tge7b1X9KO', 'another1@gmail.com', '8154047178', 0, 0),
(7, 'KingDaddy23', '$2y$10$wxHPocq6gALfFyvTuMJ/gOeslxf.YSQTUB3guaqlqx/FAq5gKwvw.', 'another21@gmail.com', '8154047178', 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`game_id`);

--
-- Indexes for table `matchups`
--
ALTER TABLE `matchups`
  ADD PRIMARY KEY (`matchup_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `game_id` (`game_id`);

--
-- Indexes for table `pools`
--
ALTER TABLE `pools`
  ADD PRIMARY KEY (`pool_id`);

--
-- Indexes for table `pool_memberships`
--
ALTER TABLE `pool_memberships`
  ADD PRIMARY KEY (`membership_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `pool_id` (`pool_id`);

--
-- Indexes for table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`result_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `game_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `matchups`
--
ALTER TABLE `matchups`
  MODIFY `matchup_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pools`
--
ALTER TABLE `pools`
  MODIFY `pool_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pool_memberships`
--
ALTER TABLE `pool_memberships`
  MODIFY `membership_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `results`
--
ALTER TABLE `results`
  MODIFY `result_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `matchups`
--
ALTER TABLE `matchups`
  ADD CONSTRAINT `matchups_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `matchups_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `games` (`game_id`);

--
-- Constraints for table `pool_memberships`
--
ALTER TABLE `pool_memberships`
  ADD CONSTRAINT `pool_memberships_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `pool_memberships_ibfk_2` FOREIGN KEY (`pool_id`) REFERENCES `pools` (`pool_id`);

--
-- Constraints for table `results`
--
ALTER TABLE `results`
  ADD CONSTRAINT `results_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
