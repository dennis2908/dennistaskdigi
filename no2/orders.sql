-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.37 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.11.0.7065
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for digivo
CREATE DATABASE IF NOT EXISTS `digivo` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `digivo`;

-- Dumping structure for table digivo.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `nama_produk` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `produk_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `harga` bigint DEFAULT NULL,
  `kode_unik` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `kode_unik` (`kode_unik`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- Dumping data for table digivo.orders: ~0 rows (approximately)

INSERT INTO `orders` (`nama_produk`, `produk_id`, `harga`, `kode_unik`, `status`, `tanggal`) VALUES
	('mamam', '1', 299000, '582', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '583', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '584', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '585', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '586', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '587', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '588', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '589', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '590', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '500', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '522', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '521', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '523', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '511', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '512', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '513', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '519', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '520', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '591', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '502', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '578', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '524', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '525', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '526', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '527', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '528', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '529', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '530', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '531', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '532', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '533', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '534', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '535', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '536', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '537', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '538', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '539', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '540', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '541', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '542', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '543', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '544', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '545', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '546', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '547', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '548', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '549', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '550', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '551', 'ready', '2025-07-31'),
	('mamam', '1', 299000, '552', 'ready', '2025-07-31')
	;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
