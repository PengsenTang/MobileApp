/*
Navicat MySQL Data Transfer

Source Server         : myh
Source Server Version : 50640
Source Host           : 47.93.19.169:3306
Source Database       : tinyworld

Target Server Type    : MYSQL
Target Server Version : 50640
File Encoding         : 65001

Date: 2018-06-17 19:33:12
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `authentication`
-- ----------------------------
DROP TABLE IF EXISTS `authentication`;
CREATE TABLE `authentication` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier for a user',
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of authentication
-- ----------------------------
INSERT INTO `authentication` VALUES ('22', '2');
INSERT INTO `authentication` VALUES ('23', '1');
INSERT INTO `authentication` VALUES ('24', '123');
INSERT INTO `authentication` VALUES ('27', '123');
INSERT INTO `authentication` VALUES ('33', '12345');
INSERT INTO `authentication` VALUES ('36', '123');
INSERT INTO `authentication` VALUES ('38', '123');
INSERT INTO `authentication` VALUES ('40', '1');
INSERT INTO `authentication` VALUES ('41', '3');
INSERT INTO `authentication` VALUES ('42', '1');
INSERT INTO `authentication` VALUES ('43', '17713');
INSERT INTO `authentication` VALUES ('44', '980528');
INSERT INTO `authentication` VALUES ('45', 'myh');
INSERT INTO `authentication` VALUES ('53', '202cb962ac59075b964b07152d234b70');

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
  `content` varchar(100) DEFAULT NULL,
  `time` datetime NOT NULL,
  `message_status` enum('deleted','unread','read') NOT NULL DEFAULT 'unread',
  `invitation_status` enum('pending','rejected','accepted') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `receiver` (`receiver`),
  KEY `sender` (`sender`),
  CONSTRAINT `receiver` FOREIGN KEY (`receiver`) REFERENCES `user_info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sender` FOREIGN KEY (`sender`) REFERENCES `user_info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of message
-- ----------------------------
INSERT INTO `message` VALUES ('1', '36', '27', 'this is a test', '2018-05-22 00:00:00', 'deleted', 'accepted');
INSERT INTO `message` VALUES ('2', '36', '27', 'this is a test', '2018-05-22 00:00:00', 'unread', null);
INSERT INTO `message` VALUES ('3', '36', '27', 'this is a test', '2018-05-22 14:22:39', 'unread', null);
INSERT INTO `message` VALUES ('4', '36', '36', 'test', '2018-05-22 14:56:35', 'unread', null);
INSERT INTO `message` VALUES ('5', '36', '36', 'abcd', '2018-05-22 15:13:50', 'unread', null);
INSERT INTO `message` VALUES ('6', '36', '36', 'abcd', '2018-05-22 15:16:51', 'unread', null);
INSERT INTO `message` VALUES ('7', '36', '36', '123', '2018-05-22 15:35:55', 'unread', null);
INSERT INTO `message` VALUES ('8', '36', '22', '123', '2018-05-22 16:30:39', 'unread', 'pending');

-- ----------------------------
-- Table structure for `relation`
-- ----------------------------
DROP TABLE IF EXISTS `relation`;
CREATE TABLE `relation` (
  `id1` int(11) NOT NULL,
  `id2` int(11) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`id1`,`id2`),
  KEY `id2` (`id2`),
  CONSTRAINT `relation_ibfk_1` FOREIGN KEY (`id1`) REFERENCES `user_info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `relation_ibfk_2` FOREIGN KEY (`id2`) REFERENCES `user_info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of relation
-- ----------------------------
INSERT INTO `relation` VALUES ('22', '23', 'test', '2018-05-22 20:08:20');
INSERT INTO `relation` VALUES ('22', '24', 'test', '2018-05-22 20:36:27');
INSERT INTO `relation` VALUES ('22', '27', 'test', '2018-05-22 20:36:30');
INSERT INTO `relation` VALUES ('22', '33', null, '2018-05-22 20:50:54');
INSERT INTO `relation` VALUES ('36', '27', null, '2018-05-22 21:21:28');
INSERT INTO `relation` VALUES ('42', '41', 'asd', '2018-05-22 21:05:21');
INSERT INTO `relation` VALUES ('43', '41', '', '2018-05-22 21:05:51');

-- ----------------------------
-- Table structure for `user_info`
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(20) DEFAULT '',
  `phone_number` varchar(16) DEFAULT NULL,
  `mail_address` varchar(35) DEFAULT NULL,
  `name` varchar(20) NOT NULL DEFAULT '',
  `gender` enum('male','female') NOT NULL DEFAULT 'male',
  `birthday` date DEFAULT NULL,
  `register_time` date NOT NULL DEFAULT '2017-05-26',
  `address` varchar(50) DEFAULT '',
  `job` varchar(20) DEFAULT '',
  `signature` varchar(50) DEFAULT '',
  `habit` varchar(50) DEFAULT '',
  `profile_photo` varchar(50) DEFAULT '/profile_photo/default.bmp' COMMENT '存储的是头像路径，给出一个默认值',
  `credits` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniquenumber` (`phone_number`),
  UNIQUE KEY `uniqueemail` (`mail_address`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('22', '', null, '2', '2', 'male', null, '2018-05-21', '', '', '', '', '/profile_photo/default.bmp', '0');
INSERT INTO `user_info` VALUES ('23', '', null, '1', '1', 'male', null, '2018-05-21', '', '', '', '', '/profile_photo/default.bmp', '0');
INSERT INTO `user_info` VALUES ('24', '', null, '123', '123', 'male', null, '2018-05-21', '', '', '', '', '/profile_photo/default.bmp', '0');
INSERT INTO `user_info` VALUES ('27', '', '123', null, '123', 'male', null, '2018-05-21', '', '', '', '', '/profile_photo/default.bmp', '0');
INSERT INTO `user_info` VALUES ('33', '', null, '12345', '12345', 'male', null, '2018-05-21', '', '', '', '', '/profile_photo/default.bmp', '0');
INSERT INTO `user_info` VALUES ('36', '', '12312312', '123454', 'huahua', 'male', null, '2018-05-21', '', '', '', '', '/profile_photo/default.bmp', '0');
INSERT INTO `user_info` VALUES ('38', '', null, '123455', '123455', 'male', null, '2018-05-21', '', '', '', '', '/profile_photo/default.bmp', '0');
INSERT INTO `user_info` VALUES ('40', '', '1', null, '1', 'male', null, '2018-05-22', '', '', '', '', '/profile_photo/default.bmp', '0');
INSERT INTO `user_info` VALUES ('41', '', '3', null, '3', 'male', null, '2018-05-22', '', '', '', '', '/profile_photo/default.bmp', '0');
INSERT INTO `user_info` VALUES ('42', '', '13882856958', null, 'sen', 'male', null, '2018-05-22', '', '', '', '', '/profile_photo/default.bmp', '0');
INSERT INTO `user_info` VALUES ('43', '', '17713', null, '17713', 'male', null, '2018-05-22', '', '', '', '', '/profile_photo/default.bmp', '0');
INSERT INTO `user_info` VALUES ('44', '', '980528', null, 'tps', 'male', null, '2018-06-15', '', '', '', '', '/profile_photo/default.bmp', '0');
INSERT INTO `user_info` VALUES ('45', '', 'myh', null, 'myh', 'male', null, '2018-06-17', '', '', '', '', '/profile_photo/default.bmp', '0');
INSERT INTO `user_info` VALUES ('53', '', '17713582805', null, 'sen', 'male', null, '2018-06-17', '', '', '', '', '/profile_photo/default.bmp', '0');
