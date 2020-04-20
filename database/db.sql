--Database
CREATE DATABASE classroom;
USE classroom;

--Tables
CREATE TABLE `teacher` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `mail` varchar(60) NOT NULL,
  `pass` varchar(60) NOT NULL
);

CREATE TABLE `class` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `class_name` int(11) NOT NULL,
  `id_teacher` int(11) NOT NULL,
  CONSTRAINT `class_ifbk_1` FOREIGN KEY(`id_teacher`) REFERENCES teacher(id)
);

CREATE TABLE `students` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `id_class` int(11) NOT NULL,
  CONSTRAINT `students_ifbk_1` FOREIGN KEY(`id_class`) REFERENCES class(id)
);

