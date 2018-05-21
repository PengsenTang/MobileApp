/*
Navicat MySQL Data Transfer

Source Server         : 1
Source Server Version : 80011
Source Host           : localhost:3306
Source Database       : tinyworld

Target Server Type    : MYSQL
Target Server Version : 80011
File Encoding         : 65001

Date: 2018-05-21 18:25:48
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `authentication`
-- ----------------------------
DROP TABLE IF EXISTS `authentication`;
CREATE TABLE `authentication` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier for a user',
  `password` varchar(18) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of authentication
-- ----------------------------

-- ----------------------------
-- Table structure for `credit_ladder`
-- ----------------------------
DROP TABLE IF EXISTS `credit_ladder`;
CREATE TABLE `credit_ladder` (
  `level` int(11) NOT NULL AUTO_INCREMENT,
  `threshhold` int(11) NOT NULL,
  PRIMARY KEY (`level`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of credit_ladder
-- ----------------------------

-- ----------------------------
-- Table structure for `message`
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sender` int(11) NOT NULL,
  `receiver` int(11) NOT NULL,
  `content` varchar(20) NOT NULL,
  `time` datetime NOT NULL,
  `message_status` enum('deleted','unread','read') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'unread',
  `invitation_status` enum('pending','rejected','accepted') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `receiver` (`receiver`),
  KEY `sender` (`sender`),
  CONSTRAINT `receiver` FOREIGN KEY (`receiver`) REFERENCES `user_info` (`id`),
  CONSTRAINT `sender` FOREIGN KEY (`sender`) REFERENCES `user_info` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of message
-- ----------------------------

-- ----------------------------
-- Table structure for `relation`
-- ----------------------------
DROP TABLE IF EXISTS `relation`;
CREATE TABLE `relation` (
  `id1` int(11) NOT NULL,
  `id2` int(11) NOT NULL,
  `description` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`id1`,`id2`),
  KEY `id2` (`id2`),
  CONSTRAINT `relation_ibfk_1` FOREIGN KEY (`id1`) REFERENCES `user_info` (`id`),
  CONSTRAINT `relation_ibfk_2` FOREIGN KEY (`id2`) REFERENCES `user_info` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of relation
-- ----------------------------

-- ----------------------------
-- Table structure for `user_info`
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(20) DEFAULT '',
  `phone_number` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `mail_address` varchar(35) DEFAULT '',
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `gender` enum('male','female') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'male',
  `birthday` date DEFAULT NULL,
  `register_time` date NOT NULL DEFAULT '2017-05-26',
  `address` varchar(50) DEFAULT '',
  `job` varchar(20) DEFAULT '',
  `signature` varchar(50) DEFAULT '',
  `habit` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `profile_photo` varchar(50) DEFAULT '/profile_photo/default.bmp' COMMENT '存储的是头像路径，给出一个默认值',
  `credits` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniquenumber` (`phone_number`),
  UNIQUE KEY `uniqueemail` (`mail_address`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_info
-- ----------------------------
