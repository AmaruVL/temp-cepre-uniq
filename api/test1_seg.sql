-- MySQL dump 10.13  Distrib 5.7.38, for Linux (x86_64)
--
-- Host: localhost    Database: test1
-- ------------------------------------------------------
-- Server version	5.7.38

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `app_administrador`
--

DROP TABLE IF EXISTS `app_administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_administrador` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `codigo_administrador` varchar(15) DEFAULT NULL,
  `estado` tinyint(1) NOT NULL,
  `user_type_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_type_id` (`user_type_id`),
  CONSTRAINT `app_administrador_user_type_id_11cd669f_fk_app_customuser_id` FOREIGN KEY (`user_type_id`) REFERENCES `app_customuser` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_administrador`
--

LOCK TABLES `app_administrador` WRITE;
/*!40000 ALTER TABLE `app_administrador` DISABLE KEYS */;
INSERT INTO `app_administrador` VALUES (1,'2022-06-15 11:45:27.758846','2022-06-15 11:45:27.758892','98765',1,1);
/*!40000 ALTER TABLE `app_administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_alternativas_balotario`
--

DROP TABLE IF EXISTS `app_alternativas_balotario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_alternativas_balotario` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `texto_alternativa` longtext NOT NULL,
  `es_respuesta` tinyint(1) NOT NULL,
  `id_balota_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `app_alternativas_bal_id_balota_id_29f5b3ce_fk_app_balot` (`id_balota_id`),
  CONSTRAINT `app_alternativas_bal_id_balota_id_29f5b3ce_fk_app_balot` FOREIGN KEY (`id_balota_id`) REFERENCES `app_balota_preguntas_curso` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_alternativas_balotario`
--

LOCK TABLES `app_alternativas_balotario` WRITE;
/*!40000 ALTER TABLE `app_alternativas_balotario` DISABLE KEYS */;
INSERT INTO `app_alternativas_balotario` VALUES (1,'2022-06-15 18:16:15.750700','2022-06-15 18:16:15.750728','<p>2</p>',1,1),(2,'2022-06-15 18:16:37.169283','2022-06-15 18:16:37.169316','<p>3</p>',0,1),(3,'2022-06-21 22:52:55.231862','2022-06-21 22:52:55.231918','<p>respuesta 1&nbsp;</p>',1,2),(4,'2022-06-21 22:53:17.550410','2022-06-21 22:53:17.550460','<p>respuesta 2&nbsp;</p>',0,2),(5,'2022-06-21 22:54:38.380511','2022-06-21 22:54:38.380563','<p>respuesta 1&nbsp;</p>',1,3),(6,'2022-06-21 22:55:32.649057','2022-06-21 22:55:32.649107','<p>respuesta 1&nbsp;</p>',0,4),(7,'2022-06-21 22:55:41.716519','2022-06-21 22:55:41.716570','<p>respuesta 2&nbsp;</p>',1,4),(8,'2022-10-05 08:40:51.647180','2022-10-05 08:40:51.647225','<p>es tiempo al cuadrado</p>',0,5);
/*!40000 ALTER TABLE `app_alternativas_balotario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_asistencia_docente`
--

DROP TABLE IF EXISTS `app_asistencia_docente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_asistencia_docente` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `fecha_sesion` datetime(6) NOT NULL,
  `estado_asistencia` tinyint(1) NOT NULL,
  `id_horario_id` bigint(20) NOT NULL,
  `observaciones` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `app_asistencia_docente_id_horario_id_abbfa780_fk_app_horario_id` (`id_horario_id`),
  CONSTRAINT `app_asistencia_docente_id_horario_id_abbfa780_fk_app_horario_id` FOREIGN KEY (`id_horario_id`) REFERENCES `app_horario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_asistencia_docente`
--

LOCK TABLES `app_asistencia_docente` WRITE;
/*!40000 ALTER TABLE `app_asistencia_docente` DISABLE KEYS */;
INSERT INTO `app_asistencia_docente` VALUES (41,'2022-09-05 12:23:35.316566','2022-09-05 12:23:35.316584','2022-06-17 07:00:00.000000',0,1,NULL),(42,'2022-09-05 12:23:35.393095','2022-09-05 12:23:35.393136','2022-06-20 07:00:00.000000',0,1,NULL),(43,'2022-09-05 12:23:35.459191','2022-09-05 12:23:35.459234','2022-06-24 07:00:00.000000',0,1,NULL),(44,'2022-09-05 12:23:35.526539','2022-09-05 12:23:35.526581','2022-06-27 07:00:00.000000',0,1,NULL),(45,'2022-09-05 12:23:35.626511','2022-09-05 12:23:35.626556','2022-07-01 07:00:00.000000',0,1,NULL),(46,'2022-09-05 12:23:35.693179','2022-09-05 12:23:35.693226','2022-07-04 07:00:00.000000',0,1,NULL),(47,'2022-09-05 12:23:35.760096','2022-09-05 12:23:35.760142','2022-07-08 07:00:00.000000',0,1,NULL),(48,'2022-09-30 08:29:36.415754','2022-09-30 08:29:36.415788','2022-10-03 11:00:00.000000',0,4,NULL),(49,'2022-09-30 08:29:36.471309','2022-09-30 08:29:36.471347','2022-10-05 11:00:00.000000',0,4,NULL),(50,'2022-09-30 08:29:36.527807','2022-09-30 08:29:36.527825','2022-10-10 11:00:00.000000',0,4,NULL),(51,'2022-09-30 08:29:36.700984','2022-09-30 08:29:36.701022','2022-10-12 11:00:00.000000',0,4,NULL),(52,'2022-09-30 08:29:36.753563','2022-09-30 08:29:36.753584','2022-10-17 11:00:00.000000',0,4,NULL),(53,'2022-09-30 08:29:36.809579','2022-09-30 08:29:36.809618','2022-10-19 11:00:00.000000',0,4,NULL),(54,'2022-09-30 08:29:36.859461','2022-09-30 08:29:36.859501','2022-10-24 11:00:00.000000',0,4,NULL),(55,'2022-09-30 08:29:36.909183','2022-09-30 08:29:36.909221','2022-10-26 11:00:00.000000',0,4,NULL),(56,'2022-09-30 08:29:36.959145','2022-09-30 08:29:36.959182','2022-10-31 11:00:00.000000',0,4,NULL),(57,'2022-09-30 08:29:37.009106','2022-09-30 08:29:37.009142','2022-11-02 11:00:00.000000',0,4,NULL),(58,'2022-09-30 08:29:37.059437','2022-09-30 08:29:37.059474','2022-11-07 11:00:00.000000',0,4,NULL),(59,'2022-09-30 08:29:37.109463','2022-09-30 08:29:37.109500','2022-11-09 11:00:00.000000',0,4,NULL),(60,'2022-09-30 08:29:37.159198','2022-09-30 08:29:37.159233','2022-11-14 11:00:00.000000',0,4,NULL),(61,'2022-09-30 08:29:37.209651','2022-09-30 08:29:37.209690','2022-11-16 11:00:00.000000',0,4,NULL),(62,'2022-09-30 08:29:37.259728','2022-09-30 08:29:37.259768','2022-11-21 11:00:00.000000',0,4,NULL),(63,'2022-09-30 08:29:37.309402','2022-09-30 08:29:37.309439','2022-11-23 11:00:00.000000',0,4,NULL),(64,'2022-09-30 08:29:37.359494','2022-09-30 08:29:37.359531','2022-11-28 11:00:00.000000',0,4,NULL),(65,'2022-09-30 08:29:37.409794','2022-09-30 08:29:37.409833','2022-11-30 11:00:00.000000',0,4,NULL),(66,'2022-09-30 08:29:37.459885','2022-09-30 08:29:37.459923','2022-12-05 11:00:00.000000',0,4,NULL),(67,'2022-09-30 08:29:37.509706','2022-09-30 08:29:37.509744','2022-12-07 11:00:00.000000',0,4,NULL),(68,'2022-09-30 08:29:37.559543','2022-09-30 08:29:37.559580','2022-12-12 11:00:00.000000',0,4,NULL),(69,'2022-09-30 08:29:37.618210','2022-09-30 08:29:37.618250','2022-12-14 11:00:00.000000',0,4,NULL),(70,'2022-09-30 08:29:37.668552','2022-09-30 08:29:37.668592','2022-12-19 11:00:00.000000',0,4,NULL),(71,'2022-09-30 08:29:37.718684','2022-09-30 08:29:37.718723','2022-12-21 11:00:00.000000',0,4,NULL),(72,'2022-09-30 08:29:37.775010','2022-09-30 08:29:37.775032','2022-12-26 11:00:00.000000',0,4,NULL),(73,'2022-09-30 08:29:37.825916','2022-09-30 08:29:37.825948','2022-12-28 11:00:00.000000',0,4,NULL),(74,'2022-10-09 23:15:47.891270','2022-10-09 23:15:47.891292','2022-10-03 09:00:00.000000',0,5,NULL),(75,'2022-10-09 23:15:47.950043','2022-10-09 23:15:47.950087','2022-10-10 09:00:00.000000',0,5,NULL),(76,'2022-10-09 23:15:48.006887','2022-10-09 23:15:48.006934','2022-10-17 09:00:00.000000',0,5,NULL),(77,'2022-10-09 23:15:48.067471','2022-10-09 23:15:48.067517','2022-10-24 09:00:00.000000',0,5,NULL),(78,'2022-10-09 23:15:48.131522','2022-10-09 23:15:48.131544','2022-10-31 09:00:00.000000',0,5,NULL),(79,'2022-10-09 23:15:48.182778','2022-10-09 23:15:48.182798','2022-11-07 09:00:00.000000',0,5,NULL),(80,'2022-10-09 23:15:48.350308','2022-10-09 23:15:48.350348','2022-11-14 09:00:00.000000',0,5,NULL),(81,'2022-10-09 23:15:48.407936','2022-10-09 23:15:48.407966','2022-11-21 09:00:00.000000',0,5,NULL),(82,'2022-10-09 23:15:48.459108','2022-10-09 23:15:48.459150','2022-11-28 09:00:00.000000',0,5,NULL),(83,'2022-10-09 23:15:48.518250','2022-10-09 23:15:48.518293','2022-12-05 09:00:00.000000',0,5,NULL),(84,'2022-10-09 23:15:48.576191','2022-10-09 23:15:48.576237','2022-12-12 09:00:00.000000',0,5,NULL),(85,'2022-10-09 23:15:48.634793','2022-10-09 23:15:48.634840','2022-12-19 09:00:00.000000',0,5,NULL),(86,'2022-10-09 23:15:48.693405','2022-10-09 23:15:48.693451','2022-12-26 09:00:00.000000',0,5,NULL),(87,'2022-10-09 23:20:49.548986','2022-10-09 23:20:49.549070','2022-10-04 11:00:00.000000',0,6,NULL),(88,'2022-10-09 23:20:49.607360','2022-10-09 23:20:49.607407','2022-10-06 11:00:00.000000',0,6,NULL),(89,'2022-10-09 23:20:49.656994','2022-10-09 23:20:49.657094','2022-10-11 11:00:00.000000',0,6,NULL),(90,'2022-10-09 23:20:49.706849','2022-10-09 23:20:49.706894','2022-10-13 11:00:00.000000',0,6,NULL),(91,'2022-10-09 23:20:49.756846','2022-10-09 23:20:49.756892','2022-10-18 11:00:00.000000',0,6,NULL),(92,'2022-10-09 23:20:49.807231','2022-10-09 23:20:49.807274','2022-10-20 11:00:00.000000',0,6,NULL),(93,'2022-10-09 23:20:49.862542','2022-10-09 23:20:49.862593','2022-10-25 11:00:00.000000',0,6,NULL),(94,'2022-10-09 23:20:49.904840','2022-10-09 23:20:49.904864','2022-10-27 11:00:00.000000',0,6,NULL),(95,'2022-10-09 23:20:50.065345','2022-10-09 23:20:50.065385','2022-11-01 11:00:00.000000',0,6,NULL),(96,'2022-10-09 23:20:50.165823','2022-10-09 23:20:50.165863','2022-11-03 11:00:00.000000',0,6,NULL),(97,'2022-10-09 23:20:50.240965','2022-10-09 23:20:50.241011','2022-11-08 11:00:00.000000',0,6,NULL),(98,'2022-10-09 23:20:50.289758','2022-10-09 23:20:50.289790','2022-11-10 11:00:00.000000',0,6,NULL),(99,'2022-10-09 23:20:50.331160','2022-10-09 23:20:50.331191','2022-11-15 11:00:00.000000',0,6,NULL),(100,'2022-10-09 23:20:50.376359','2022-10-09 23:20:50.376401','2022-11-17 11:00:00.000000',0,6,NULL),(101,'2022-10-09 23:20:50.425169','2022-10-09 23:20:50.425216','2022-11-22 11:00:00.000000',0,6,NULL),(102,'2022-10-09 23:20:50.474981','2022-10-09 23:20:50.475023','2022-11-24 11:00:00.000000',0,6,NULL),(103,'2022-10-09 23:20:50.584410','2022-10-09 23:20:50.584460','2022-11-29 11:00:00.000000',0,6,NULL),(104,'2022-10-09 23:20:50.633623','2022-10-09 23:20:50.633669','2022-12-01 11:00:00.000000',0,6,NULL),(105,'2022-10-09 23:20:50.683579','2022-10-09 23:20:50.683624','2022-12-06 11:00:00.000000',0,6,NULL),(106,'2022-10-09 23:20:50.741447','2022-10-09 23:20:50.741492','2022-12-08 11:00:00.000000',0,6,NULL),(107,'2022-10-09 23:20:50.791609','2022-10-09 23:20:50.791653','2022-12-13 11:00:00.000000',0,6,NULL),(108,'2022-10-09 23:20:50.841949','2022-10-09 23:20:50.841994','2022-12-15 11:00:00.000000',0,6,NULL),(109,'2022-10-09 23:20:50.900214','2022-10-09 23:20:50.900261','2022-12-20 11:00:00.000000',0,6,NULL),(110,'2022-10-09 23:20:50.958198','2022-10-09 23:20:50.958247','2022-12-22 11:00:00.000000',0,6,NULL),(111,'2022-10-09 23:20:51.009237','2022-10-09 23:20:51.009288','2022-12-27 11:00:00.000000',0,6,NULL),(112,'2022-10-09 23:20:51.067335','2022-10-09 23:20:51.067382','2022-12-29 11:00:00.000000',0,6,NULL),(113,'2022-10-09 23:24:01.719441','2022-10-09 23:24:01.719480','2022-10-03 14:00:00.000000',0,7,NULL),(114,'2022-10-09 23:24:01.869701','2022-10-09 23:24:01.869743','2022-10-05 14:00:00.000000',0,7,NULL),(115,'2022-10-09 23:24:01.994808','2022-10-09 23:24:01.994852','2022-10-10 14:00:00.000000',0,7,NULL),(116,'2022-10-09 23:24:02.120953','2022-10-09 23:24:02.121002','2022-10-12 14:00:00.000000',0,7,NULL),(117,'2022-10-09 23:24:02.244995','2022-10-09 23:24:02.245083','2022-10-17 14:00:00.000000',0,7,NULL),(118,'2022-10-09 23:24:02.369021','2022-10-09 23:24:02.369091','2022-10-19 14:00:00.000000',0,7,NULL),(119,'2022-10-09 23:24:02.495872','2022-10-09 23:24:02.495920','2022-10-24 14:00:00.000000',0,7,NULL),(120,'2022-10-09 23:24:02.621843','2022-10-09 23:24:02.621890','2022-10-26 14:00:00.000000',0,7,NULL),(121,'2022-10-09 23:24:02.746122','2022-10-09 23:24:02.746171','2022-10-31 14:00:00.000000',0,7,NULL),(122,'2022-10-09 23:24:02.871763','2022-10-09 23:24:02.871812','2022-11-02 14:00:00.000000',0,7,NULL),(123,'2022-10-09 23:24:02.993455','2022-10-09 23:24:02.993476','2022-11-07 14:00:00.000000',0,7,NULL),(124,'2022-10-09 23:24:03.588538','2022-10-09 23:24:03.588579','2022-11-09 14:00:00.000000',0,7,NULL),(125,'2022-10-09 23:24:03.714841','2022-10-09 23:24:03.714890','2022-11-14 14:00:00.000000',0,7,NULL),(126,'2022-10-09 23:24:03.830824','2022-10-09 23:24:03.830873','2022-11-16 14:00:00.000000',0,7,NULL),(127,'2022-10-09 23:24:03.947635','2022-10-09 23:24:03.947680','2022-11-21 14:00:00.000000',0,7,NULL),(128,'2022-10-09 23:24:04.065196','2022-10-09 23:24:04.065245','2022-11-23 14:00:00.000000',0,7,NULL),(129,'2022-10-09 23:24:04.432895','2022-10-09 23:24:04.432924','2022-11-28 14:00:00.000000',0,7,NULL),(130,'2022-10-09 23:24:04.543272','2022-10-09 23:24:04.543319','2022-11-30 14:00:00.000000',0,7,NULL),(131,'2022-10-09 23:24:04.684664','2022-10-09 23:24:04.684711','2022-12-05 14:00:00.000000',0,7,NULL),(132,'2022-10-09 23:24:04.824272','2022-10-09 23:24:04.824322','2022-12-07 14:00:00.000000',0,7,NULL),(133,'2022-10-09 23:24:04.982767','2022-10-09 23:24:04.982818','2022-12-12 14:00:00.000000',0,7,NULL),(134,'2022-10-09 23:24:05.108990','2022-10-09 23:24:05.109115','2022-12-14 14:00:00.000000',0,7,NULL),(135,'2022-10-09 23:24:05.491488','2022-10-09 23:24:05.491531','2022-12-19 14:00:00.000000',0,7,NULL),(136,'2022-10-09 23:24:05.710495','2022-10-09 23:24:05.710542','2022-12-21 14:00:00.000000',0,7,NULL),(137,'2022-10-09 23:24:05.854049','2022-10-09 23:24:05.854097','2022-12-26 14:00:00.000000',0,7,NULL),(138,'2022-10-09 23:24:06.009674','2022-10-09 23:24:06.009723','2022-12-28 14:00:00.000000',0,7,NULL);
/*!40000 ALTER TABLE `app_asistencia_docente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_asistencia_estudiante`
--

DROP TABLE IF EXISTS `app_asistencia_estudiante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_asistencia_estudiante` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `fecha_sesion` datetime(6) NOT NULL,
  `estado_asistencia` tinyint(1) NOT NULL,
  `observacion` varchar(500) DEFAULT NULL,
  `id_estudiante_horario_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `app_asistencia_estud_id_estudiante_horari_4ea24758_fk_app_estud` (`id_estudiante_horario_id`),
  CONSTRAINT `app_asistencia_estud_id_estudiante_horari_4ea24758_fk_app_estud` FOREIGN KEY (`id_estudiante_horario_id`) REFERENCES `app_estudiante_horario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_asistencia_estudiante`
--

LOCK TABLES `app_asistencia_estudiante` WRITE;
/*!40000 ALTER TABLE `app_asistencia_estudiante` DISABLE KEYS */;
INSERT INTO `app_asistencia_estudiante` VALUES (1,'2022-06-15 18:17:06.341101','2022-06-15 18:18:45.738478','2022-06-15 18:17:06.341163',1,'error del error',1),(2,'2022-06-21 22:57:54.108823','2022-06-21 22:57:58.596529','2022-06-21 22:57:54.108887',1,NULL,1),(3,'2022-10-05 08:37:21.390054','2022-10-05 08:37:21.390096','2022-10-05 08:37:21.390113',0,NULL,4);
/*!40000 ALTER TABLE `app_asistencia_estudiante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_aula`
--

DROP TABLE IF EXISTS `app_aula`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_aula` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `codigo_aula` varchar(10) DEFAULT NULL,
  `sillas_fijas` int(10) unsigned NOT NULL,
  `sillas_moviles` int(10) unsigned NOT NULL,
  `nro_salon` varchar(10) DEFAULT NULL,
  `tipo_aula` varchar(20) DEFAULT NULL,
  `capacidad` int(10) unsigned DEFAULT NULL,
  `piso` int(10) unsigned DEFAULT NULL,
  `id_pabellon_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `app_aula_id_pabellon_id_b2a555f9_fk_app_pabellon_id` (`id_pabellon_id`),
  CONSTRAINT `app_aula_id_pabellon_id_b2a555f9_fk_app_pabellon_id` FOREIGN KEY (`id_pabellon_id`) REFERENCES `app_pabellon` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_aula`
--

LOCK TABLES `app_aula` WRITE;
/*!40000 ALTER TABLE `app_aula` DISABLE KEYS */;
INSERT INTO `app_aula` VALUES (1,'2022-06-15 00:16:57.439460','2022-09-30 08:21:07.005738','A-01',0,31,NULL,NULL,31,NULL,1),(2,'2022-06-15 00:16:57.671287','2022-09-30 08:21:07.145183','A-02',0,40,NULL,NULL,40,NULL,1),(3,'2022-06-15 00:16:57.824250','2022-09-30 08:21:07.296002','A-03',0,40,NULL,NULL,40,NULL,1),(4,'2022-06-15 00:16:58.145075','2022-09-30 08:21:07.419640','A-04',0,40,NULL,NULL,40,NULL,1),(5,'2022-06-15 00:16:58.270253','2022-09-30 08:21:07.544573','A-05',0,31,NULL,NULL,31,NULL,1),(6,'2022-06-15 00:16:58.441097','2022-09-30 08:21:07.661408','A-06',0,40,NULL,NULL,40,NULL,1),(7,'2022-06-15 00:16:58.538167','2022-09-30 08:21:07.777789','A-07',0,40,NULL,NULL,40,NULL,1),(8,'2022-06-15 00:16:58.637958','2022-09-30 08:21:07.895445','A-08',0,40,NULL,NULL,40,NULL,1),(9,'2022-06-15 00:16:58.737740','2022-09-30 08:21:08.029458','A-09',0,40,NULL,NULL,40,NULL,2),(10,'2022-06-15 00:16:58.838564','2022-09-30 08:21:08.140808','A-10',0,40,NULL,NULL,40,NULL,2),(11,'2022-06-15 00:16:58.938054','2022-09-30 08:21:08.265503','A-11',0,40,NULL,NULL,40,NULL,2),(12,'2022-06-15 00:16:59.038085','2022-09-30 08:21:08.461907','A-12',0,40,NULL,NULL,40,NULL,3),(13,'2022-06-15 00:16:59.138501','2022-09-30 08:21:08.594347','A-13',0,40,NULL,NULL,40,NULL,3),(14,'2022-06-15 00:16:59.238287','2022-09-30 08:21:08.661562','AUDI',0,0,NULL,NULL,0,NULL,3),(15,'2022-06-15 00:16:59.338236','2022-09-30 08:21:08.777300','L-AAB',0,26,NULL,NULL,26,NULL,1),(16,'2022-06-15 00:16:59.438399','2022-09-30 08:21:08.826443','LAB-BIO',0,20,NULL,NULL,20,NULL,1),(17,'2022-06-15 00:16:59.538934','2022-09-30 08:21:08.879028','LAB-BT',0,56,NULL,NULL,56,NULL,1),(18,'2022-06-15 00:16:59.638669','2022-09-30 08:21:08.985249','L-BFV',0,26,NULL,NULL,26,NULL,1),(19,'2022-06-15 00:16:59.747529','2022-09-30 08:21:09.036590','L-COM',0,39,NULL,NULL,39,NULL,1),(20,'2022-06-15 00:16:59.847944','2022-09-30 08:21:09.095175','L-FI',0,17,NULL,NULL,17,NULL,4),(21,'2022-06-15 00:16:59.982261','2022-09-30 08:21:09.153328','L-FM',0,26,NULL,NULL,26,NULL,1),(22,'2022-06-15 00:17:00.146255','2022-09-30 08:21:09.321506','L-IC',0,17,NULL,NULL,17,NULL,4),(23,'2022-06-15 00:17:00.248543','2022-09-30 08:21:09.520395','L-QM',0,26,NULL,NULL,26,NULL,1),(24,'2022-06-15 00:17:00.349050','2022-09-30 08:21:09.654024','L-SS',0,17,NULL,NULL,17,NULL,4),(25,'2022-06-15 00:17:00.449155','2022-09-30 08:21:09.965994','T-PA',0,56,NULL,NULL,56,NULL,5);
/*!40000 ALTER TABLE `app_aula` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_balota_preguntas_curso`
--

DROP TABLE IF EXISTS `app_balota_preguntas_curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_balota_preguntas_curso` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `texto_pregunta` longtext NOT NULL,
  `img_pregunta` varchar(100) DEFAULT NULL,
  `id_docente_id` bigint(20) NOT NULL,
  `id_padron_curso_grupo_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `app_balota_preguntas_id_docente_id_3787a1c3_fk_app_docen` (`id_docente_id`),
  KEY `app_balota_preguntas_id_padron_curso_grup_3f6e64e9_fk_app_padro` (`id_padron_curso_grupo_id`),
  CONSTRAINT `app_balota_preguntas_id_docente_id_3787a1c3_fk_app_docen` FOREIGN KEY (`id_docente_id`) REFERENCES `app_docente` (`id`),
  CONSTRAINT `app_balota_preguntas_id_padron_curso_grup_3f6e64e9_fk_app_padro` FOREIGN KEY (`id_padron_curso_grupo_id`) REFERENCES `app_padron_cursos_grupo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_balota_preguntas_curso`
--

LOCK TABLES `app_balota_preguntas_curso` WRITE;
/*!40000 ALTER TABLE `app_balota_preguntas_curso` DISABLE KEYS */;
INSERT INTO `app_balota_preguntas_curso` VALUES (1,'2022-06-15 18:16:03.645723','2022-06-15 18:16:03.645769','<p>cuanto es 1+1</p>','',1,1),(2,'2022-06-21 22:52:34.902273','2022-06-21 22:52:34.902311','<p>preguntas preguntas :3&nbsp;</p>','balota-curso/Fisica_A/5225.png',1,1),(3,'2022-06-21 22:54:24.356187','2022-06-21 22:54:24.356236','<p>preguntita 3&nbsp;</p>','balota-curso/Fisica_A/5225_FuYv0aH.png',1,1),(4,'2022-06-21 22:55:07.392288','2022-06-21 22:55:07.392336','<p>pregunta 4&nbsp;</p>','balota-curso/Fisica_A/5225_ax5u2Zp.png',1,1),(5,'2022-10-05 08:40:28.222657','2022-10-05 08:40:28.222681','<p>Cual es la formula de distancia?</p>','balota-curso/FISICA_B/GRUPO7-FODA.png',1,2);
/*!40000 ALTER TABLE `app_balota_preguntas_curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_ciclo`
--

DROP TABLE IF EXISTS `app_ciclo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_ciclo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `denominacion` varchar(100) NOT NULL,
  `anio` int(10) unsigned NOT NULL,
  `nro_ciclo_de_anio` smallint(5) unsigned NOT NULL,
  `requisitos` longtext,
  `caja_mensaje` longtext,
  `fecha_inicio_ciclo` date DEFAULT NULL,
  `fecha_fin_ciclo` date DEFAULT NULL,
  `fecha_inicio_preinscripcion` date DEFAULT NULL,
  `fecha_fin_preinscripcion` date DEFAULT NULL,
  `fecha_inicio_inscripcion` date DEFAULT NULL,
  `fecha_fin_inscripcion` date DEFAULT NULL,
  `org_unit_path` varchar(100) DEFAULT NULL,
  `estado_publicar` tinyint(1) NOT NULL,
  `portada_ciclo` varchar(100) DEFAULT NULL,
  `id_administrador_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `app_ciclo_id_administrador_id_a599ae4b_fk_app_administrador_id` (`id_administrador_id`),
  CONSTRAINT `app_ciclo_id_administrador_id_a599ae4b_fk_app_administrador_id` FOREIGN KEY (`id_administrador_id`) REFERENCES `app_administrador` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_ciclo`
--

LOCK TABLES `app_ciclo` WRITE;
/*!40000 ALTER TABLE `app_ciclo` DISABLE KEYS */;
INSERT INTO `app_ciclo` VALUES (1,'2022-06-15 11:53:30.202182','2022-09-12 18:27:51.239981',1,'Ciclo 2022 Ordinario  - Turno Mañana',2022,1,'<p>Ciclo 2022 CEPRE UNIQ</p>\r\n<ul>\r\n<li>Recuerda revisar los requisitos.&nbsp;</li>\r\n</ul>',NULL,'2022-06-15','2022-07-09','2022-06-15','2022-06-17','2022-06-18','2022-06-20','0001',0,'caratulas-ciclo/unigimg.jpg',1),(2,'2022-06-15 11:53:30.396280','2022-09-08 15:28:44.772496',1,'Ciclo 2022 Ordinario  - Turno Tarde',2022,1,'<p>Ciclo 2022 CEPRE UNIQ</p>\r\n<ul>\r\n<li>Recuerda revisar los requisitos.&nbsp;</li>\r\n</ul>',NULL,'2022-06-15','2022-07-09','2022-06-15','2022-06-17','2022-06-18','2022-06-20','0001',0,'',1),(3,'2022-06-15 11:53:30.805447','2022-09-08 15:28:41.833851',1,'Ciclo 2022 Ordinario  - Turno Noche',2022,1,'<p>Ciclo 2022 CEPRE UNIQ</p>\r\n<ul>\r\n<li>Recuerda revisar los requisitos.&nbsp;</li>\r\n</ul>',NULL,'2022-06-15','2022-07-09','2022-06-15','2022-06-17','2022-06-18','2022-06-20','0001',0,'',1),(4,'2022-09-08 15:25:11.718613','2022-09-12 18:19:10.652255',1,'Ciclo 2023 1ra Opcion Turno Mañana - Turno Mañana',2022,2,'<p>Cilco 1ra opcion 2023</p>',NULL,'2022-09-20','2022-12-30','2022-09-06','2022-09-16','2022-09-06','2022-09-15','Admision',0,'',1),(5,'2022-09-12 11:38:07.936869','2022-09-12 18:19:13.247778',1,'Centro de Idiomas - UNIQ - Turno Mañana',2022,3,'<p>Primer ciclo del centro de idiomas.</p>\r\n',NULL,'2022-09-12','2022-12-31','2022-09-12','2022-09-30','2022-09-12','2022-09-30','Centro de Idiomas',0,'caratulas-ciclo/estudiar_idiomas_en_el_extranjero.jpg',1),(6,'2022-09-12 15:44:30.210026','2022-09-12 18:19:18.298801',1,'Centro de Idiomas  Intercultural - Turno Noche',2022,4,'<p>Un texto de idiomas</p>\r\n',NULL,'2022-09-12','2022-12-30','2022-09-12','2022-09-30','2022-09-12','2022-09-30','Centro de Idiomas',0,'caratulas-ciclo/descarga1.jpg',1),(7,'2022-09-12 17:17:46.717247','2022-09-12 18:19:20.912205',1,'Centro de idiomas - Turno Tarde',2022,5,'<p>Prueba de centro de idiomas</p>\r\n<p><span style=\"color: rgb(238,134,0);background-color: rgb(255,255,255);font-size: 15px;font-family: Geogro;\">Examen de Suficiencia:</span> <span style=\"color: rgb(0,86,163);background-color: rgb(255,255,255);font-size: 15px;font-family: Geogro;\">Dirigido a los estudiantes que tienen estudios concluidos del idioma inglés, portugués o italiano en alguna otra institución de enseñanza de idiomas extranjeros y cuentan con certificado o constancia para acreditar</span> .</p>\r\n',NULL,'2022-09-12','2022-12-31','2022-09-12','2022-09-30','2022-09-12','2022-09-30','Centro de Idiomas turno Tarde',0,'',1),(8,'2022-09-12 18:18:43.704633','2022-09-28 08:15:22.957454',1,'CEPRE Ciclo de Fin de Año - Turno Mañana',2022,6,'<h2 style=\"text-align:left;\"><span style=\"color: rgb(213,0,0);background-color: rgb(255,255,255);font-size: 2rem;font-family: zizou-slab-bold;\">Campus</span></h2>\r\n<p style=\"text-align:left;\"><span style=\"color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 18px;font-family: zizou-slab-regular;\">La UNIQ se esfuerza cada año para brindar mayor comodidad a sus alumnos a través de la constante creación de nuevos espacios e instalaciones.</span>&nbsp;</p>',NULL,'2022-09-12','2022-12-30','2022-09-12','2022-09-30','2022-09-12','2022-09-30','CEPRE - UNIQ',0,'',1),(9,'2022-09-12 18:18:43.799649','2022-09-28 08:15:20.234672',1,'CEPRE Ciclo de Fin de Año - Turno Tarde',2022,6,'<p style=\"text-align:start;\"><span style=\"color: rgb(4,41,79);background-color: rgba(255,255,255,0);font-size: 28px;font-family: Montserrat;\">ACERCA DE LA CARRERA</span></p>\r\n<p style=\"text-align:center;\"><span style=\"color: rgb(0,0,0);background-color: rgba(255,255,255,0);font-size: 16px;font-family: Montserrat;\">Somos la única universidad y carrera en toda Latinoamérica que ha obtenido un Doble Grado en Maestría con una universidad TOP 1 USA (2019), TOP 3 USA (2020): Pace University de New York:</span> <a href=\"https://derecho.cientifica.edu.pe/clkn/https/www.pace.edu/\" target=\"_self\"><span style=\"color: inherit;background-color: rgba(255,255,255,0);font-size: 16px;font-family: Montserrat;\"><ins>pace.edu</ins></span></a><span style=\"color: rgb(0,0,0);background-color: rgba(255,255,255,0);font-size: 16px;font-family: Montserrat;\">, el cual potencia el perfil del egresado, mejorando su empleabilidad a nivel nacional e internacional. </span>&nbsp;</p>',NULL,'2022-09-12','2022-12-30','2022-09-12','2022-09-30','2022-09-12','2022-09-30','CEPRE - UNIQ',0,'',1),(10,'2022-09-12 18:18:43.991008','2022-09-28 08:15:17.357709',1,'CEPRE Ciclo de Fin de Año - Turno Noche',2022,6,'<p><span style=\"color: rgb(4,41,79);background-color: rgb(255,255,255);font-size: 20px;font-family: Montserrat;\">Proyecto de investigación Belatin</span>&nbsp;</p>\r\n<p><span style=\"color: rgb(0,0,0);background-color: rgb(238,238,238);font-size: 16px;font-family: Montserrat;\">Únicos con proyecto BeLatin junto a UC. Berkeley top USA:</span> <a href=\"https://derecho.cientifica.edu.pe/clkn/https/www.berkeley.edu/\" target=\"_self\"><span style=\"color: inherit;background-color: rgb(238,238,238);font-size: 16px;font-family: Montserrat;\"><ins>berkeley.edu</ins></span></a> <span style=\"color: rgb(0,0,0);background-color: rgb(238,238,238);font-size: 16px;font-family: Montserrat;\">y universidades de Latinoamérica</span>&nbsp;</p>',NULL,'2022-09-12','2022-12-30','2022-09-12','2022-09-30','2022-09-12','2022-09-30','CEPRE - UNIQ',0,'',1),(11,'2022-09-20 15:54:35.320078','2022-09-20 15:54:48.224920',1,'Prueba Tesoreria - Turno Mañana',2022,7,'<p style=\"text-align:center;\"><span style=\"font-size: 24px;font-family: Georgia;\"><strong>Ciclo de prueba para tesoreria</strong></span></p>',NULL,'2022-09-20','2022-09-30','2022-09-20','2022-09-25','2022-09-25','2022-09-27','123',1,'',1),(12,'2022-09-28 08:17:26.425457','2022-10-09 23:33:23.571689',1,'Ciclo de Fin de Año 2022 - Turno Mañana',2022,8,'<p>Esto es para las personas que<strong> no pudieron ingresar</strong> por estar en campañas politicas</p>',NULL,'2022-10-03','2022-12-30','2022-09-28','2022-10-10','2022-09-28','2022-10-06','Admision',1,'',NULL);
/*!40000 ALTER TABLE `app_ciclo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_colegio`
--

DROP TABLE IF EXISTS `app_colegio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_colegio` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `nombre_colegio` varchar(180) NOT NULL,
  `codigo_modular` varchar(10) DEFAULT NULL,
  `direccion_colegio` varchar(200) DEFAULT NULL,
  `ubigeo_nombre` varchar(200) DEFAULT NULL,
  `tipo_colegio` varchar(2) NOT NULL,
  `id_ubigeo_id` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo_modular` (`codigo_modular`),
  KEY `app_colegio_id_ubigeo_id_02e6649e_fk_app_ubigeo_codigo_ubigeo` (`id_ubigeo_id`),
  CONSTRAINT `app_colegio_id_ubigeo_id_02e6649e_fk_app_ubigeo_codigo_ubigeo` FOREIGN KEY (`id_ubigeo_id`) REFERENCES `app_ubigeo` (`codigo_ubigeo`)
) ENGINE=InnoDB AUTO_INCREMENT=704 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_colegio`
--

LOCK TABLES `app_colegio` WRITE;
/*!40000 ALTER TABLE `app_colegio` DISABLE KEYS */;
INSERT INTO `app_colegio` VALUES (1,'2022-06-15 16:51:00.144090','2022-06-15 16:51:00.144139','CEBA - HORACIO ZEVALLOS GAMEZ','1200807','ANTA','Anta','PU','080301'),(2,'2022-06-15 16:51:00.242654','2022-06-15 16:51:00.242702','CEBA - AMAUTA','1062041','JIRON AGUSTIN GAMARRA 302','Anta','PR','080301'),(3,'2022-06-15 16:51:00.344992','2022-06-15 16:51:00.345012','AGUSTIN GAMARRA','0236422','ANTA S/N','Anta','PU','080301'),(4,'2022-06-15 16:51:00.641656','2022-06-15 16:51:00.641698','CHACAN','0591222','CHACAN S/N','Anta','PU','080301'),(5,'2022-06-15 16:51:00.741598','2022-06-15 16:51:00.741642','JORGE BASADRE','0616110','COMPONE S/N','Anta','PU','080301'),(6,'2022-06-15 16:51:00.842441','2022-06-15 16:51:00.842492','JUAN VELASCO ALVARADO','0931055','CONCHACALLA S/N','Anta','PU','080301'),(7,'2022-06-15 16:51:00.942961','2022-06-15 16:51:00.943010','SAGRADO CORAZON DE JESUS','0931329','PLAZA DE ARMAS S/N','Anta','PU','080301'),(8,'2022-06-15 16:51:01.043231','2022-06-15 16:51:01.043279','ILLARY LA CATOLICA','0930966','JIRON BREÑA S/N','Anta','PR','080301'),(9,'2022-06-15 16:51:01.151310','2022-06-15 16:51:01.151359','FEDERICO VILLARREAL','1388479','JIRON JAQUIJAHUANA 334','Anta','PR','080301'),(10,'2022-06-15 16:51:01.296677','2022-06-15 16:51:01.296725','INMACULADA CONCEPCION','1388511','URB. MARIA CANDELARIA S/N','Anta','PR','080301'),(11,'2022-06-15 16:51:01.397137','2022-06-15 16:51:01.397186','VIRGEN DEL CARMEN','1388545','AVENIDA LOS ANDES S/N','Anta','PR','080301'),(12,'2022-06-15 16:51:01.530408','2022-06-15 16:51:01.530458','CRFA VIRGEN DE NATIVIDAD','1388610','PACCA','Anta','PU','080301'),(13,'2022-06-15 16:51:01.689362','2022-06-15 16:51:01.689412','50100 LA NAVAL','1321322','AVENIDA LOS ANDES S/N','Anta','PU','080301'),(14,'2022-06-15 16:51:01.789239','2022-06-15 16:51:01.789287','SANTA ROSA','1355361','JIRON AGUSTIN GAMARRA 407','Anta','PR','080301'),(15,'2022-06-15 16:51:01.894288','2022-06-15 16:51:01.894331','DIVINO AMOR','1414200','URBANIZACION NUEVA ANTA G 1 DEL DISTRITO DE ANTA','Anta','PR','080301'),(16,'2022-06-15 16:51:02.011440','2022-06-15 16:51:02.011487','MAXWELL','1435395','CALLE PROLONGACION FERROCARRIL S/N PICHOC','Anta','PR','080301'),(17,'2022-06-15 16:51:02.112681','2022-06-15 16:51:02.112725','50098','1739838','CALLE CONFRATERNIDAD S/N','Anta','PU','080301'),(18,'2022-06-15 16:51:02.294647','2022-06-15 16:51:02.294687','EDUCARE','1757426','CALLE INMACULADA CONCEPCION 12 MZ T','Anta','PR','080301'),(19,'2022-06-15 16:51:02.647146','2022-06-15 16:51:02.647193','CCORAHUA','1773027','MZ 5 LOTE C','Anta','PR','080301'),(20,'2022-06-15 16:51:02.827323','2022-06-15 16:51:02.827349','ILLARY','0932483','JIRON BREÑA S/N','Anta','PR','080301'),(21,'2022-08-30 11:22:57.175017','2022-10-09 23:35:19.378265','CEBA - COMERCIO 41','0207530','CALLE MARISCAL GAMARRA 03','Cusco','PU','080101'),(22,'2022-08-30 11:22:57.248553','2022-10-09 23:35:19.435493','CEBA - CLORINDA MATTO DE TURNER','0236810','AVENIDA DE LA CULTURA S/N','Cusco','PU','080101'),(23,'2022-08-30 11:22:57.326080','2022-10-09 23:35:19.485308','CEBA - CIENCIAS','0236828','PARQUE SAN FRANCISCO S/N','Cusco','PU','080101'),(24,'2022-08-30 11:22:57.408543','2022-10-09 23:35:19.548368','CEBA - HUMBERTO LUNA','0497628','AVENIDA CENTENARIO 700','Cusco','PU','080101'),(25,'2022-08-30 11:22:57.477269','2022-10-09 23:35:19.595799','CEBA - SAN FRANCISCO DE BORJA','0782649','PARQUE TRICENTENARIO S/N','Cusco','PU','080101'),(26,'2022-08-30 11:22:57.672287','2022-10-09 23:35:19.642127','CEBA - SAN AGUSTIN','1062488','CALLE SACSAYHUAMAN MZ L LOTE 6','Cusco','PR','080101'),(27,'2022-08-30 11:22:57.750015','2022-10-09 23:35:19.698204','CEBA - PERUANO AMERICANO','1385996','AVENIDA HUAYRUROPATA 803','Cusco','PR','080101'),(28,'2022-08-30 11:22:57.817250','2022-10-09 23:35:19.785198','CEBA - SAN ISIDRO LABRADOR','1062363','CALLE TRES CRUCES DE ORO 505','Cusco','PR','080101'),(29,'2022-08-30 11:22:57.883519','2022-10-09 23:35:19.844270','CEBA - SAN ISIDRO LABRADOR','1062330','CALLE TRES CRUCES DE ORO 505','Cusco','PR','080101'),(30,'2022-08-30 11:22:57.950281','2022-10-09 23:35:19.899371','CEBA - SANTO TOMAS DE AQUINO','1386267','CALLE UMANCHATA 140','Cusco','PR','080101'),(31,'2022-08-30 11:22:58.022752','2022-10-09 23:35:19.959793','CEBA - SANTO TOMAS DE AQUINO','1386275','CALLE UMANCHATA 140','Cusco','PR','080101'),(32,'2022-08-30 11:22:58.109142','2022-10-09 23:35:20.070529','CEBA - ABRAHAM VALDELOMAR','1200351','AVENIDA MANZANARES MZ C LOTE 1','Cusco','PR','080101'),(33,'2022-08-30 11:22:58.183556','2022-10-09 23:35:20.126700','CEBA - INCA GARCILASO DE LA VEGA','0236794','AVENIDA DE LA CULTURA S/N','Cusco','PU','080101'),(34,'2022-08-30 11:22:58.276000','2022-10-09 23:35:20.222745','CEBA - SAN JERONIMO','1767417','PROLONGACION AV. DE LA CULTURA S/N','Cusco','PU','080101'),(35,'2022-08-30 11:22:58.351235','2022-10-09 23:35:20.320849','CLORINDA MATTO DE TURNER','0236109','AVENIDA DE LA CULTURA S/N','Cusco','PU','080101'),(36,'2022-08-30 11:22:58.426481','2022-10-09 23:35:20.412946','CIENCIAS','0236117','PARQUE SAN FRANCISCO S/N','Cusco','PU','080101'),(37,'2022-08-30 11:22:58.500800','2022-10-09 23:35:20.476127','EDUCANDAS','0236224','CALLE TEATRO S/N','Cusco','PU','080101'),(38,'2022-08-30 11:22:58.575362','2022-10-09 23:35:20.544270','FORTUNATO L HERRERA','0236364','AVENIDA DE LA CULTURA 721','Cusco','PU','080101'),(39,'2022-08-30 11:22:58.767368','2022-10-09 23:35:20.700442','SALESIANO','0236687','AVENIDA DON BOSCO S/N','Cusco','PR','080101'),(40,'2022-08-30 11:22:58.874168','2022-10-09 23:35:20.760722','51015 SAN FRANCISCO DE BORJA','0579151','PARQUE TRICENTENARIO S/N','Cusco','PU','080101'),(41,'2022-08-30 11:22:59.018860','2022-10-09 23:35:20.827125','SAN MARTIN DE PORRES','0579227','JIRON AWAQPINTA 600','Cusco','PR','080101'),(42,'2022-08-30 11:22:59.097342','2022-10-09 23:35:20.893888','JOSE PARDO','0579235','AVENIDA PASEO DE LOS HEROES 928','Cusco','PR','080101'),(43,'2022-08-30 11:22:59.166600','2022-10-09 23:35:20.963993','SANTA ROSA DE LIMA','0579243','CALLE AWAQPINTA 676','Cusco','PR','080101'),(44,'2022-08-30 11:22:59.241771','2022-10-09 23:35:21.099695','COMERCIO 41','0207449','CALLE MARISCAL GAMARRA 03','Cusco','PU','080101'),(45,'2022-08-30 11:22:59.317162','2022-10-09 23:35:21.169306','INCA GARCILASO DE LA VEGA','0233056','AVENIDA DE LA CULTURA S/N','Cusco','PU','080101'),(46,'2022-08-30 11:22:59.400606','2022-10-09 23:35:21.305665','SANTA ROSA','0236232','CALLE SAN ANDRES 414','Cusco','PU','080101'),(47,'2022-08-30 11:22:59.475566','2022-10-09 23:35:21.405503','HUMBERTO LUNA','0236349','AVENIDA CENTENARIO 700','Cusco','PU','080101'),(48,'2022-08-30 11:22:59.576483','2022-10-09 23:35:21.463223','SAN ANTONIO ABAD','0236695','AVENIDA DE LA CULTURA 1900','Cusco','PR','080101'),(49,'2022-08-30 11:22:59.870663','2022-10-09 23:35:21.521984','SAN FRANCISCO DE ASIS','0236711','CALLE NUEVA BAJA 483','Cusco','PR','080101'),(50,'2022-08-30 11:22:59.942043','2022-10-09 23:35:21.579358','LA MERCED','0236729','CALLE ALMAGRO 122','Cusco','PR','080101'),(51,'2022-08-30 11:23:00.017471','2022-10-09 23:35:21.639446','MARIA AUXILIADORA','0236737','JIRON PUMACURCO 375','Cusco','PR','080101'),(52,'2022-08-30 11:23:00.089963','2022-10-09 23:35:21.696776','EL CARMELO','0236745','PARQUE SAN BLAS S/N','Cusco','PR','080101'),(53,'2022-08-30 11:23:00.167165','2022-10-09 23:35:21.754942','LAS MERCEDES','0236760','CALLE ARRAYAN 143','Cusco','PR','080101'),(54,'2022-08-30 11:23:00.243878','2022-10-09 23:35:21.821169','SIMON BOLIVAR','0489096','AVENIDA TUPAC AMARU S/N','Cusco','PU','080101'),(55,'2022-08-30 11:23:00.318268','2022-10-09 23:35:21.879375','ISAIAH BOWMAN','0699637','CALLE PERU MZ F LOTE 8-9','Cusco','PR','080101'),(56,'2022-08-30 11:23:00.394008','2022-10-09 23:35:21.938988','50048 LOS INCAS','0785097','CALLE SARA SARA S/N','Cusco','PU','080101'),(57,'2022-08-30 11:23:00.509783','2022-10-09 23:35:22.048259','50002 LUIS VALLEJOS SANTONI','0782664','CALLE AYACUCHO MZ J LOTE 5','Cusco','PU','080101'),(58,'2022-08-30 11:23:00.586025','2022-10-09 23:35:22.106428','ALEJANDRO VON HUMBOLDT','0785089','AVENIDA COLLASUYO 510','Cusco','PR','080101'),(59,'2022-08-30 11:23:00.760881','2022-10-09 23:35:22.177803','SANTA MARIA REYNA','0927939','CALLE YURACPUNCO 63','Cusco','PR','080101'),(60,'2022-08-30 11:23:00.897918','2022-10-09 23:35:22.376544','JUAN LANDAZURI RICKETTS','0928119','CALLE DAVID CHAPARRO 102 ETAPA I','Cusco','PR','080101'),(61,'2022-08-30 11:23:00.976408','2022-10-09 23:35:22.465367','SOR ANA DE LOS ANGELES','0928143','CALLE NUEVA 462','Cusco','PR','080101'),(62,'2022-08-30 11:23:01.051082','2022-10-09 23:35:22.565426','IMPERIO JOHN LOCKE','0928234','AVENIDA CENTENARIO 836','Cusco','PR','080101'),(63,'2022-08-30 11:23:01.143222','2022-10-09 23:35:22.623016','DIVINO MAESTRO','0928267','CALLE PUMAPACCHA 286','Cusco','PR','080101'),(64,'2022-08-30 11:23:01.220139','2022-10-09 23:35:22.701866','ROSA DE AMERICA','0927905','AVENIDA MANZANARES MZ C LOTE 1','Cusco','PR','080101'),(65,'2022-08-30 11:23:01.303953','2022-10-09 23:35:22.765137','INMACULADA CONCEPCION','1061837','CALLE CHAPARRO 231','Cusco','PR','080101'),(66,'2022-08-30 11:23:01.411794','2022-10-09 23:35:22.831704','SEÑOR DE LOS MILAGROS','1060920','CALLE SAN AGUSTIN 287','Cusco','PR','080101'),(67,'2022-08-30 11:23:01.486484','2022-10-09 23:35:22.890848','SANTA URSULA','1061332','CALLE PAVITOS 430','Cusco','PR','080101'),(68,'2022-08-30 11:23:01.560914','2022-10-09 23:35:22.948886','JORGE CHAVEZ CHAPARRO','1061449','AVENIDA MANUEL PRADO S/N','Cusco','PU','080101'),(69,'2022-08-30 11:23:01.652269','2022-10-09 23:35:23.013213','SAN AGUSTIN','0928028','CALLE SACSAYHUAMAN MZ L LOTE 6','Cusco','PR','080101'),(70,'2022-08-30 11:23:01.770287','2022-10-09 23:35:23.074033','PROYECTO INGENIERIA','1200443','AVENIDA REGIONAL 902-A','Cusco','PR','080101'),(71,'2022-08-30 11:23:01.913215','2022-10-09 23:35:23.132655','SUIZO PERUANO','0928416','PQUE. SANTIAGO 533','Cusco','PR','080101'),(72,'2022-08-30 11:23:02.020567','2022-10-09 23:35:23.219790','BLAISE PASCAL DE FRANCIA','0928473','CALLE HOSPITAL 482','Cusco','PR','080101'),(73,'2022-08-30 11:23:02.192238','2022-10-09 23:35:23.419861','DANIEL ALCIDES CARRION','0928564','FIDERANDA S/N','Cusco','PR','080101'),(74,'2022-08-30 11:23:02.315102','2022-10-09 23:35:23.577956','SAN PABLO','0928176','AVENIDA DE LA CULTURA 600','Cusco','PR','080101'),(75,'2022-08-30 11:23:02.475621','2022-10-09 23:35:23.646130','CESAR VALLEJO','0928531','AVENIDA VELASCO ASTETE S/N','Cusco','PR','080101'),(76,'2022-08-30 11:23:02.629513','2022-10-09 23:35:23.711385','FLORENCE NIGHTINGALE','1061126','AVENIDA MANCO CCAPAC 518','Cusco','PR','080101'),(77,'2022-08-30 11:23:02.772702','2022-10-09 23:35:23.778042','AMERICANA DEL CUSCO','1200260','CALLE TOCUYEROS 560','Cusco','PR','080101'),(78,'2022-08-30 11:23:02.870641','2022-10-09 23:35:23.845910','KONRAD ADENAHUER','1200542','CALLE CENTENARIO 810','Cusco','PR','080101'),(79,'2022-08-30 11:23:03.022053','2022-10-09 23:35:23.912335','SAN JUAN DE DIOS','1201623','CALLE SAN JUAN DE DIOS 285','Cusco','PR','080101'),(80,'2022-08-30 11:23:03.166551','2022-10-09 23:35:23.976970','CARRION-SAN JERONIMO','1386069','AVENIDA INFANCIA 508','Cusco','PR','080101'),(81,'2022-08-30 11:23:03.320903','2022-10-09 23:35:24.053625','JUAN BOSCO','1269182','CALLE UMANCHATA 140','Cusco','PR','080101'),(82,'2022-08-30 11:23:03.428821','2022-10-09 23:35:24.175999','BERNABE COBO','1269109','CALLE DESAMPARADOS 141','Cusco','PR','080101'),(83,'2022-08-30 11:23:03.583522','2022-10-09 23:35:24.301620','FRANCISCO Y JACINTA MARTO','1386101','CALLE SIETE CUARTONES 225','Cusco','PR','080101'),(84,'2022-08-30 11:23:03.720897','2022-10-09 23:35:24.396362','JAVIER PEREZ DE CUELLAR','0928382','LARAPA G-2','Cusco','PR','080101'),(85,'2022-08-30 11:23:03.854380','2022-10-09 23:35:24.466595','ARCO IRIS CUSCO','1061258','AVENIDA PROL DE LA CULTURA 95','Cusco','PR','080101'),(86,'2022-08-30 11:23:04.004493','2022-10-09 23:35:24.533322','JOSE ANDRES RAZURI ESTEVEZ','1386671','AVENIDA COLLASUYO 933','Cusco','PR','080101'),(87,'2022-08-30 11:23:04.138388','2022-10-09 23:35:24.618144','TRILCE CUSCO','1304310','AVENIDA DE LA CULTURA 1014','Cusco','PR','080101'),(88,'2022-08-30 11:23:04.289136','2022-10-09 23:35:24.683738','51004 SAN VICENTE DE PAUL','1322593','JIRON SAN VICENTE 331','Cusco','PU','080101'),(89,'2022-08-30 11:23:04.422010','2022-10-09 23:35:24.744892','51003 ROSARIO','1370345','AVENIDA GRAU 725','Cusco','PU','080101'),(90,'2022-08-30 11:23:04.556816','2022-10-09 23:35:24.803668','FORTUNATO L.HERRERA','0236836','AVENIDA DE LA CULTURA 227','Cusco','PU','080101'),(91,'2022-08-30 11:23:04.879264','2022-10-09 23:35:24.874411','INCA GARCILASO DE LA VEGA','1061696','AVENIDA DE LA CULTURA S/N','Cusco','PU','080101'),(92,'2022-08-30 11:23:04.987324','2022-10-09 23:35:24.937448','SAN AGUSTIN','1062249','AVENIDA COLLASUYO MZ C LOTE 7','Cusco','PR','080101'),(93,'2022-08-30 11:23:05.112969','2022-10-09 23:35:24.997995','DIVINO CORAZON','1269349','CALLE PUMAPACCHA 286','Cusco','PR','080101'),(94,'2022-08-30 11:23:05.246666','2022-10-09 23:35:25.062952','BLAISE PASCAL','1387414','CALLE MACHUPICCHU MZ D LOTE 6','Cusco','PR','080101'),(95,'2022-08-30 11:23:05.380388','2022-10-09 23:35:25.172938','DANIEL ALCIDES CARRION','1387463','CALLE SAN JUAN DE DIOS 250','Cusco','PU','080101'),(96,'2022-08-30 11:23:05.564711','2022-10-09 23:35:25.296299','VIRGEN DEL TRANSITO','1387489','CALLE PUMAPACCHA 0236','Cusco','PR','080101'),(97,'2022-08-30 11:23:05.714636','2022-10-09 23:35:25.366937','ABRAHAN VALDELOMAR','1200369','AVENIDA MANZANARES MZ C LOTE 1','Cusco','PR','080101'),(98,'2022-09-08 15:12:44.647559','2022-09-28 08:51:38.659799','CEBA - MARISCAL CASTILLA','1200195','PASAJE LIMA 137','Santa Ana','PR','080901'),(99,'2022-09-08 15:12:44.718769','2022-09-28 08:51:38.720742','CEBA - LA SALLE','1394105','AVENIDA FRANCISCO BOLOGNESI 322','Santa Ana','PR','080901'),(100,'2022-09-08 15:12:44.772332','2022-09-28 08:51:38.779042','CEBA - KONRAD ADENAHUER','1394204','AVENIDA FRANCISCO BOLOGNESI 249','Santa Ana','PR','080901'),(101,'2022-09-08 15:12:44.905778','2022-09-28 08:51:38.908549','CEBA - SANTA ANA','1323112','JIRON JORGE BASADRE 123','Santa Ana','PR','080901'),(102,'2022-09-08 15:12:44.959794','2022-09-28 08:51:39.040887','CEBA - MANCO II','1361021','AVENIDA MIGUEL GRAU 257','Santa Ana','PU','080901'),(103,'2022-09-08 15:12:45.013462','2022-09-28 08:51:39.112394','CEBA - ISAAC NEWTON','1773472','JIRON MARISCAL CACERES S/N MZ A LOTE 4','Santa Ana','PR','080901'),(104,'2022-09-08 15:12:45.074661','2022-09-28 08:51:39.309374','MANCO II','0233098','AVENIDA MIGUEL GRAU 257','Santa Ana','PU','080901'),(105,'2022-09-08 15:12:45.131425','2022-09-28 08:51:39.378131','LA CONVENCION','0233221','AVENIDA MARTIN PIO CONCHA S/N','Santa Ana','PU','080901'),(106,'2022-09-08 15:12:45.186186','2022-09-28 08:51:39.437271','MARISCAL CASTILLA','0235986','PASAJE LIMA 137','Santa Ana','PR','080901'),(107,'2022-09-08 15:12:45.299889','2022-09-28 08:51:39.496151','INA 67','0236919','AVENIDA BOLOGNESI S/N','Santa Ana','PU','080901'),(108,'2022-09-08 15:12:45.353960','2022-09-28 08:51:39.554946','TUPAC AMARU','0579193','HUAYANAY BAJA','Santa Ana','PU','080901'),(109,'2022-09-08 15:12:45.410672','2022-09-28 08:51:39.612695','CHRISTIAN BUES','0621243','ESMERALDA','Santa Ana','PU','080901'),(110,'2022-09-08 15:12:45.468293','2022-09-28 08:51:39.671452','SANTA ANA','0932673','JIRON VILCABAMBA S/N','Santa Ana','PU','080901'),(111,'2022-09-08 15:12:45.629737','2022-09-28 08:51:39.730237','LA INMACULADA','0932707','AVENIDA INDEPENDENCIA 550','Santa Ana','PU','080901'),(112,'2022-09-08 15:12:45.684907','2022-09-28 08:51:39.789277','BUEN MAESTRO','0932731','JIRON LA CONVENCION 155','Santa Ana','PR','080901'),(113,'2022-09-08 15:12:45.741742','2022-09-28 08:51:39.846938','LICEO MEGANTONI','0932764','JIRON ALFONSO UGARTE 212','Santa Ana','PR','080901'),(114,'2022-09-08 15:12:45.797957','2022-09-28 08:51:39.905899','MANCO II AREA TECNICA COMERCIAL','0932798','AVENIDA MIGUEL GRAU 257','Santa Ana','PU','080901'),(115,'2022-09-08 15:12:45.856241','2022-09-28 08:51:39.979434','NUESTRA SEÑORA DE FATIMA','1062520','AVENIDA BOLOGNESI 02','Santa Ana','PR','080901'),(116,'2022-09-08 15:12:45.914687','2022-09-28 08:51:40.070089','ABRAHAM LINCOLN','1062561','AVENIDA QUILLABAMBA','Santa Ana','PR','080901'),(117,'2022-09-08 15:12:45.973134','2022-09-28 08:51:40.190964','SAN AGUSTIN','1200732','PASAJE JORGE BASADRE 123','Santa Ana','PR','080901'),(118,'2022-09-08 15:12:46.057226','2022-09-28 08:51:40.245419','LA SALLE','1201938','AVENIDA FRANCISCO BOLOGNESI 322','Santa Ana','PR','080901'),(119,'2022-09-08 15:12:46.115640','2022-09-28 08:51:40.306678','MARIA MONTESSORI','1393925','JIRON QUILLABAMBA 150','Santa Ana','PR','080901'),(120,'2022-09-08 15:12:46.173493','2022-09-28 08:51:40.365159','CHRISTIAN BUEZ','1393941','JIRON CAHUIDE MZ C LOTE 8','Santa Ana','PR','080901'),(121,'2022-09-08 15:12:46.231812','2022-09-28 08:51:40.423597','QUILLABAMBA','1394022','PASAJE JORGE BASADRE 123','Santa Ana','PR','080901'),(122,'2022-09-08 15:12:46.289855','2022-09-28 08:51:40.498092','51027 JUAN DE LA CRUZ MONTES SALAS','1394121','JIRON INDEPENDENCIA S/N','Santa Ana','PU','080901'),(123,'2022-09-08 15:12:46.364635','2022-09-28 08:51:40.556717','SAN IGNACIO DE LOYOLA','1394303','JIRON CAHUIDE S/N','Santa Ana','PR','080901'),(124,'2022-09-08 15:12:46.425318','2022-09-28 08:51:40.622508','SAN DE LA SAL','1394337','JIRON JORGE BASADRE 123','Santa Ana','PR','080901'),(125,'2022-09-08 15:12:46.515171','2022-09-28 08:51:40.681349','VIRGEN DEL CARMEN','1323138','JIRON MARTIN PIO CONCHA S/N','Santa Ana','PR','080901'),(126,'2022-09-08 15:12:46.573251','2022-09-28 08:51:40.739387','FRAY MARTIN DE PORRES','1324581','BOLOGNESI 425','Santa Ana','PR','080901'),(127,'2022-09-08 15:12:46.682053','2022-09-28 08:51:40.797805','501156 SAGRADO CORAZON DE JESUS','1405232','JARAMILLUYOC','Santa Ana','PU','080901'),(128,'2022-09-08 15:12:46.743908','2022-09-28 08:51:40.856418','TALENTOS DE PITAGORAS','1639186','JIRON MARISCAL CACERES S/N MZ A LOTE 4','Santa Ana','PR','080901'),(129,'2022-09-08 15:12:46.838330','2022-09-28 08:51:40.915012','AURELIO BALDOR','1701044','PASAJE QUILLABAMBA 134','Santa Ana','PR','080901'),(130,'2022-09-08 15:12:46.898499','2022-09-28 08:51:41.033978','MANCO II','0236844','AVENIDA MIGUEL GRAU 257','Santa Ana','PU','080901'),(131,'2022-09-08 15:12:47.023749','2022-09-28 08:51:41.090134','LA SALLE','1201961','QUILLABAMBA','Santa Ana','PR','080901'),(132,'2022-09-08 15:12:47.082287','2022-09-28 08:51:41.199423','PRONESA CHRISTIAN BUEZ','1200757','JIRON CAHUIDE MZ C LOTE 8','Santa Ana','PR','080901'),(133,'2022-09-08 15:12:47.140811','2022-09-28 08:51:41.254524','SAN AGUSTIN','1394188','PASAJE JORGE BASADRE 123','Santa Ana','PR','080901'),(134,'2022-09-08 15:12:47.198939','2022-09-28 08:51:41.331842','KONRAD ADENAHUER','1394212','JIRON QUILLABAMBA S/N','Santa Ana','PR','080901'),(135,'2022-09-08 15:12:47.257431','2022-09-28 08:51:41.390142','SAN IGNACIO DE LOYOLA','1394311','JIRON CAHUIDE S/N','Santa Ana','PR','080901'),(136,'2022-09-08 15:12:47.370948','2022-09-28 08:51:41.489414','SAN DE LA SAL','1394345','JIRON JORGE BASADRE 123','Santa Ana','PR','080901'),(137,'2022-09-08 15:36:54.706087','2022-09-08 16:25:48.747252','CEBA - NUESTRA SEÑORA DE GUADALUPE','1443753','CALLE DEUSTUA 270','Tacna','PR','230101'),(138,'2022-09-08 15:36:54.762358','2022-09-08 16:25:48.911108','CEBA - CORONEL BOLOGNESI','0568675','CALLE MODESTO MOLINA S/N','Tacna','PU','230101'),(139,'2022-09-08 15:36:54.812137','2022-09-08 16:25:48.968608','CEBA - CARLOS ARMANDO LAURA','0615088','AVENIDA CORONEL MENDOZA 1120','Tacna','PU','230101'),(140,'2022-09-08 15:36:54.863871','2022-09-08 16:25:49.036606','CEBA - 42195 WILMA SOTILLO D. BACIGALUPO','0308510','AVENIDA EJERCITO 2105','Tacna','PU','230101'),(141,'2022-09-08 15:36:54.912227','2022-09-08 16:25:49.090412','CEBA - ARTURO JIMENEZ BORJA','1215342','CALLE ALTO DE LIMA 2131','Tacna','PU','230101'),(142,'2022-09-08 15:36:54.959967','2022-09-08 16:25:49.155309','CEBA - ANDRES BELLO','1215417','CALLE HIPOLITO UNANUE 363','Tacna','PR','230101'),(143,'2022-09-08 15:36:55.001700','2022-09-08 16:25:49.214257','CEBA - SAN PEDRO','1215177','CALLE PROGRESO 848','Tacna','PR','230101'),(144,'2022-09-08 15:36:55.047138','2022-09-08 16:25:49.272709','CEBA - JORGE BASADRE GROHMANN','0645838','AVENIDA BASADRE Y FORERO 1960','Tacna','PU','230101'),(145,'2022-09-08 15:36:55.098038','2022-09-08 16:25:49.338646','CEBA - SAN CARLOS','1216092','CALLE SAN CAMILO 955','Tacna','PR','230101'),(146,'2022-09-08 15:36:55.147236','2022-09-08 16:25:49.397153','CEBA - SAN AGUSTIN','1314582','CALLE HIPOLITO UNANUE 278','Tacna','PR','230101'),(147,'2022-09-08 15:36:55.198213','2022-09-08 16:25:49.456119','CEBA - ENRIQUE LOPEZ ALBUJAR','1360916','AVENIDA RESTAURACION 18','Tacna','PU','230101'),(148,'2022-09-08 15:36:55.248010','2022-09-08 16:25:49.514377','CEBA - CRISTO REY DEL NIÑO Y ADOLESCENTE','1415330','CALLE HIPOLITO UNANUE 1365','Tacna','PU','230101'),(149,'2022-09-08 15:36:55.297849','2022-09-08 16:25:49.571964','CEBA - APOSTOL SAN SANTIAGO','1748078','CALLE CORONEL VIDAL 235','Tacna','PR','230101'),(150,'2022-09-08 15:36:55.348059','2022-09-08 16:25:49.634316','SANTA MARIA','1126440','CALLE SIR JONES 47','Tacna','PR','230101'),(151,'2022-09-08 15:36:55.439363','2022-09-08 16:25:49.697212','SAN MARTIN DE PORRES','0216390','CALLE SAN CAMILO 1000','Tacna','PU','230101'),(152,'2022-09-08 15:36:55.491923','2022-09-08 16:25:49.771619','SAN JUAN BOSCO','1126283','CALLE ARICA 117','Tacna','PR','230101'),(153,'2022-09-08 15:36:55.539205','2022-09-08 16:25:49.830364','42019 LASTENIA REJAS DE CASTAÑON','0744888','CALLE MARIA FORERO S/N','Tacna','PU','230101'),(154,'2022-09-08 15:36:55.585129','2022-09-08 16:25:49.888310','SAN JOSE FE Y ALEGRIA 40','0876441','CALLE ARIAS ARAGUEZ 1310','Tacna','PU','230101'),(155,'2022-09-08 15:36:55.735135','2022-09-08 16:25:49.947013','SAN IGNACIO DE LOYOLA','0876490','CALLE SIR JONES 586','Tacna','PR','230101'),(156,'2022-09-08 15:36:55.813050','2022-09-08 16:25:50.006269','SAN AGUSTIN','0876474','CALLE SCORPIO 40','Tacna','PR','230101'),(157,'2022-09-08 15:36:55.865005','2022-09-08 16:25:50.075718','28 DE JULIO','0568311','CALLE MILLER 184','Tacna','PR','230101'),(158,'2022-09-08 15:36:55.915210','2022-09-08 16:25:50.130422','ANTONIO RAIMONDI','1127117','CALLE CORONEL VIDAL 233','Tacna','PR','230101'),(159,'2022-09-08 15:36:55.964853','2022-09-08 16:25:50.188879','NUESTRA SEÑORA DE FATIMA','1127034','CALLE VENEZUELA 320','Tacna','PR','230101'),(160,'2022-09-08 15:36:56.019688','2022-09-08 16:25:50.248044','42217 NUESTROS HEROES DE LA GUERRA DEL PACIFICO','0668764','AVENIDA SACUCINI S/N','Tacna','PU','230101'),(161,'2022-09-08 15:36:56.060901','2022-09-08 16:25:50.314333','43008 JORGE MARTORELL FLORES','1126994','CALLE RAMON COPAJA 118','Tacna','PU','230101'),(162,'2022-09-08 15:36:56.102332','2022-09-08 16:25:50.406882','42006 SAN FRANCISCO DE ASIS','0877308','CALLE MODESTO MOLINA 796','Tacna','PU','230101'),(163,'2022-09-08 15:36:56.186830','2022-09-08 16:25:50.581645','43006 MERCEDES INDACOCHEA','0614966','CALLE 2 DE MAYO 346','Tacna','PU','230101'),(164,'2022-09-08 15:36:56.231212','2022-09-08 16:25:50.798742','CORONEL BOLOGNESI','0309773','CALLE MODESTO MOLINA S/N','Tacna','PU','230101'),(165,'2022-09-08 15:36:56.281160','2022-09-08 16:25:50.931759','FRANCISCO ANTONIO DE ZELA','0309799','CALLE ALTO DE LIMA S/N','Tacna','PU','230101'),(166,'2022-09-08 15:36:56.381327','2022-09-08 16:25:50.989967','43003 CARLOS ARMANDO LAURA','0614933','AVENIDA CORONEL MENDOZA 1120','Tacna','PU','230101'),(167,'2022-09-08 15:36:56.515894','2022-09-08 16:25:51.047709','42010 SANTISIMA NIÑA MARIA','0614990','CALLE PIURA 136','Tacna','PU','230101'),(168,'2022-09-08 15:36:56.565135','2022-09-08 16:25:51.114375','42003 CORONEL GREGORIO ALBARRACIN','0568618','AVENIDA CUZCO 444','Tacna','PU','230101'),(169,'2022-09-08 15:36:56.614728','2022-09-08 16:25:51.172428','SANTA ANA','0472423','CALLE ARICA 338','Tacna','PR','230101'),(170,'2022-09-08 15:36:56.665522','2022-09-08 16:25:51.231961','CRISTO REY','0310227','AVENIDA CRISTO REY 450','Tacna','PR','230101'),(171,'2022-09-08 15:36:56.715166','2022-09-08 16:25:51.314314','43005 MODESTO MOLINA','1126952','AVENIDA PINTO 2162','Tacna','PU','230101'),(172,'2022-09-08 15:36:56.765877','2022-09-08 16:25:51.372777','42195 WILMA SOTILLO D. BACIGALUPO','0616938','AVENIDA EJERCITO 2105','Tacna','PU','230101'),(173,'2022-09-08 15:36:56.815710','2022-09-08 16:25:51.432025','42022 DR. MODESTO MONTESINOS ZAMALLOA','0876383','AVENIDA GREGORIO ALBARRACIN 729','Tacna','PU','230101'),(174,'2022-09-08 15:36:56.862095','2022-09-08 16:25:51.623634','JORGE BASADRE GROHMANN','0568592','AVENIDA BASADRE Y FORERO 1960','Tacna','PU','230101'),(175,'2022-09-08 15:36:56.907393','2022-09-08 16:25:51.682072','MODESTO BASADRE','0310516','AVENIDA HIPOLITO UNANUE 1035','Tacna','PU','230101'),(176,'2022-09-08 15:36:56.957486','2022-09-08 16:25:51.741241','43009 MARIA UGARTECHE DE MACLEAN','0876417','CALLE ZELA 954','Tacna','PU','230101'),(177,'2022-09-08 15:36:57.013645','2022-09-08 16:25:51.798533','IMAGINA SCHOOL','1127075','CALLE SYR JONES 43','Tacna','PR','230101'),(178,'2022-09-08 15:36:57.061931','2022-09-08 16:25:51.920889','EL BUEN PASTOR','0877183','CALLE ALTO DE LIMA 1783','Tacna','PR','230101'),(179,'2022-09-08 15:36:57.104856','2022-09-08 16:25:52.123617','DANIEL COMBONI','1126929','AVENIDA JORGE BASADRE SUR 1458','Tacna','PR','230101'),(180,'2022-09-08 15:36:57.166424','2022-09-08 16:25:52.178573','PARROQUIAL CORAZON DE MARIA','0309831','AVENIDA GREGORIO ALBARRACIN S/N','Tacna','PU','230101'),(181,'2022-09-08 15:36:57.216163','2022-09-08 16:25:52.240067','MIGUEL PRO','1126911','CIUDAD DE DIOS MZ G LOTE 33','Tacna','PU','230101'),(182,'2022-09-08 15:36:57.333816','2022-09-08 16:25:52.323103','CHAMPAGNAT','0309823','AVENIDA RESTAURACION 18','Tacna','PU','230101'),(183,'2022-09-08 15:36:57.383099','2022-09-08 16:25:52.393523','42241 HERMOGENES ARENAS YAÑEZ','1215532','AVENIDA 200 MILLAS S/N','Tacna','PU','230101'),(184,'2022-09-08 15:36:57.433205','2022-09-08 16:25:52.524636','42005 JOSE ROSA ARA','1215425','JOSE ROSA ARA 1840','Tacna','PU','230101'),(185,'2022-09-08 15:36:57.507876','2022-09-08 16:25:52.639662','HERMANAS BARCIA BONIFFATTI','1215813','AVENIDA PINTO 1846','Tacna','PR','230101'),(186,'2022-09-08 15:36:57.558438','2022-09-08 16:25:52.688627','EINSTEIN INNOVADOR S.A.C.','0614875','AVENIDA AUGUSTO B. LEGUIA 1660','Tacna','PR','230101'),(187,'2022-09-08 15:36:57.650427','2022-09-08 16:25:52.739154','ALEXANDER FLEMING','1595552','CALLE URUGUAY MZ B LOTE 10-12','Tacna','PR','230101'),(188,'2022-09-08 15:36:57.708695','2022-09-08 16:25:52.784079','WILLIAM PRESCOTT','1595602','AVENIDA SANTA CRUZ S/N','Tacna','PR','230101'),(189,'2022-09-08 15:36:57.833940','2022-09-08 16:25:52.906216','PEDRO RUIZ GALLO','1595669','CALLE RAMON COPAJA 3','Tacna','PR','230101'),(190,'2022-09-08 15:36:57.892388','2022-09-08 16:25:52.959385','MARISTA DE TACNA','1595883','PASAJE BASADRE Y FORERO 2135','Tacna','PR','230101'),(191,'2022-09-08 15:36:57.949963','2022-09-08 16:25:53.001243','CRISTO SALVADOR','1596022','CALLE SAN MARCOS 1045','Tacna','PR','230101'),(192,'2022-09-08 15:36:58.009289','2022-09-08 16:25:53.042930','FEDERICO VILLARREAL','1595958','CALLE CORONEL VIDAL 745','Tacna','PR','230101'),(193,'2022-09-08 15:36:58.077324','2022-09-08 16:25:53.152005','AMERICANO','1596279','LOS DAMASCOS II ETAPA L-18 M-L','Tacna','PR','230101'),(194,'2022-09-08 15:36:58.145523','2022-09-08 16:25:53.201050','CIMA','1596303','AVENIDA GREGORIO ALBARRACIN 500','Tacna','PR','230101'),(195,'2022-09-08 15:36:58.202062','2022-09-08 16:25:53.313715','SAINT GREGORY AMERICAN COLLEGE','1596378','CALLE VARELA 895','Tacna','PR','230101'),(196,'2022-09-08 15:36:58.276103','2022-09-08 16:25:53.363794','ISAAC NEWTON','0672659','CALLE GIL DE HERRERA 296','Tacna','PR','230101'),(197,'2022-09-08 15:36:58.334859','2022-09-08 16:25:53.498156','EVANGELICO ESPIRITU SANTO','0668798','CALLE VARELA 57 S/N','Tacna','PR','230101'),(198,'2022-09-08 15:36:58.392301','2022-09-08 16:25:53.641254','SAGRADOS CORAZONES','0716829','PESCASEROLI','Tacna','PR','230101'),(199,'2022-09-08 15:36:58.451098','2022-09-08 16:25:53.716436','INDEPENDENCIA AMERICANA','1308865','CALLE CORONEL BUSTIOS 155','Tacna','PR','230101'),(200,'2022-09-08 15:36:58.509427','2022-09-08 16:25:53.806799','ALIPIO PONCE VASQUEZ','1596436','AVENIDA JORGE BASADRE GROHMANN 835','Tacna','PR','230101'),(201,'2022-09-08 15:36:58.567600','2022-09-08 16:25:53.857032','CORONEL GREGORIO ALBARRACIN LANCHIPA','1369578','AVENIDA SAUCINI S/N','Tacna','PU','230101'),(202,'2022-09-08 15:36:58.627017','2022-09-08 16:25:53.924069','CRNL. JUAN VALER SANDOVAL','1377159','AVENIDA MIRAFLORES 355','Tacna','PR','230101'),(203,'2022-09-08 15:36:58.701045','2022-09-08 16:25:53.983073','SAN PABLO','1404987','CALLE GIL DE HERRERA 505','Tacna','PR','230101'),(204,'2022-09-08 15:36:58.845450','2022-09-08 16:25:54.033291','PROCER MARIANO MELGAR VALDIVIESO','1406909','CALLE SAN JOSÉ 315','Tacna','PR','230101'),(205,'2022-09-08 15:36:58.932142','2022-09-08 16:25:54.079270','PEDRO PAULET MOSTAJO','1458710','AVENIDA PINTO 1469','Tacna','PR','230101'),(206,'2022-09-08 15:36:59.153663','2022-09-08 16:25:54.130237','PARAISO DEL NIÑO','1525138','AVENIDA GRAU S/N LOTE F-2 SECTOR SILPAY','Tacna','PR','230101'),(207,'2022-09-08 15:36:59.210313','2022-09-08 16:25:54.181756','TRILCE - TACNA','1540863','AVENIDA VICENTE DAGNINO 271','Tacna','PR','230101'),(208,'2022-09-08 15:36:59.291246','2022-09-08 16:25:54.235338','INTERNACIONAL ELIM','1571959','CALLE ALTO DE LIMA 1307','Tacna','PR','230101'),(209,'2022-09-08 15:36:59.346075','2022-09-08 16:25:54.280073','JUAN PABLO II','1577568','AVENIDA JORGE BASADRE 835','Tacna','PR','230101'),(210,'2022-09-08 15:36:59.466160','2022-09-08 16:25:54.332602','PERUANO NORTEAMERICANO EDWARD KENNEDY','1629146','AVENIDA CUZCO 408','Tacna','PR','230101'),(211,'2022-09-08 15:36:59.524744','2022-09-08 16:25:54.383219','VERDAD Y VIDA - VERITAS ET VITA','1631746','CALLE RAMON COPAJA 397','Tacna','PR','230101'),(212,'2022-09-08 15:36:59.587749','2022-09-08 16:25:54.473469','COAR TACNA','1669548','CARRETERA PANAMERICANA SUR S/N','Tacna','PU','230101'),(213,'2022-09-08 15:36:59.641548','2022-09-08 16:25:54.609441','PERUANO BRITANICO','1694983','MZ L LOTE 16-19','Tacna','PR','230101'),(214,'2022-09-08 15:36:59.700102','2022-09-08 16:25:54.658998','INNOVA SCHOOLS','1698273','CALLE VENEZUELA S/N MZ A LOTE 1','Tacna','PR','230101'),(215,'2022-09-08 15:36:59.758340','2022-09-08 16:25:54.725751','INTERNATIONAL EDWARD SOCIEDAD ANONIMA','1722958','MZ C LOTE 7','Tacna','PR','230101'),(216,'2022-09-08 15:36:59.816583','2022-09-08 16:25:54.776218','SAN ANTONIO MARIA CLARET','1754811','MZ C LOTE 22','Tacna','PR','230101'),(217,'2022-09-08 15:36:59.875129','2022-09-08 16:25:54.828794','PAMER TACNA','1771195','CALLE SAN JOSE 315','Tacna','PR','230101'),(218,'2022-09-08 15:36:59.933407','2022-09-08 16:25:54.875006','42019 LASTENIA REJAS DE CASTAÑON','1127232','CALLE MARIA FORERO S/N','Tacna','PU','230101'),(219,'2022-09-08 15:36:59.991564','2022-09-08 16:25:54.934153','FRANCISCO ANTONIO DE ZELA','0499970','CALLE ALTO DE LIMA S/N','Tacna','PU','230101'),(220,'2022-09-08 15:37:00.048365','2022-09-08 16:25:54.993157','28 DE AGOSTO','1214865','CALLE ITALIA S/N','Tacna','PR','230101'),(221,'2022-09-08 15:37:00.108352','2022-09-08 16:25:55.050520','ENRIQUE LOPEZ ALBUJAR','0568642','AVENIDA RESTAURACION 18','Tacna','PU','230101'),(222,'2022-09-08 15:37:00.196582','2022-09-08 16:25:55.100519','RICARDO PALMA','1596147','CALLE ESCORPIO 70','Tacna','PR','230101'),(223,'2022-09-08 15:37:00.249663','2022-09-08 16:25:55.150322','COLIBRI - PNP','1596345','CALLE ZELA 185','Tacna','PU','230101'),(224,'2022-09-08 15:37:00.308187','2022-09-08 16:25:55.210021','COLIBRI - PNP','1596352','CALLE ZELA 185','Tacna','PU','230101'),(225,'2022-09-08 15:37:00.363245','2022-09-08 16:25:55.264820','28 DE AGOSTO','1127406','CALLE ITALIA S/N','Tacna','PR','230101'),(226,'2022-09-08 15:37:00.413744','2022-09-08 16:25:55.317245','SAN MARTIN DE PORRES','0568568','CALLE SAN CAMILO 1000','Tacna','PR','230101'),(227,'2022-09-08 15:37:00.474994','2022-09-08 16:25:55.367132','TACNA','1215623','CALLE ALTO DE LIMA 2131','Tacna','PU','230101'),(228,'2022-09-09 00:50:30.835724','2022-09-09 00:50:30.835771','JOSE FAUSTINO SANCHEZ CARRION','0641407','YANACANCHA','Chumuch','PU','060302'),(229,'2022-09-09 00:50:30.906895','2022-09-09 00:50:30.906945','MARISCAL RAMON CASTILLA','1109305','CHUMUCH','Chumuch','PU','060302'),(230,'2022-09-09 00:50:30.965594','2022-09-09 00:50:30.965645','MANUEL ASCENCIO SEGURA','1210723','NUEVA LAGUNA','Chumuch','PR','060302'),(231,'2022-09-09 00:50:31.024756','2022-09-09 00:50:31.024807','MANUEL ASCENCIO SEGURA','1360577','JIRON TOMAS CHAVEZ S/N','Chumuch','PU','060302'),(232,'2022-09-09 00:50:31.081803','2022-09-09 00:50:31.081849','ANDRES AVELINO CACERES','1368539','NUEVO BELLA AURORA','Chumuch','PR','060302'),(233,'2022-09-09 00:50:31.140284','2022-09-09 00:50:31.140330','JUAN VELASCO ALVARADO','1452622','AGUA SANTA','Chumuch','PU','060302'),(234,'2022-09-09 00:50:31.198622','2022-09-09 00:50:31.198669','SAGRADO CORAZON DE JESUS','1727718','TRES DE OCTUBRE','Chumuch','PR','060302'),(235,'2022-09-09 00:50:31.265211','2022-09-09 00:50:31.265257','NUEVO BELLA AURORA','1773720','NUEVO BELLA AURORA','Chumuch','PU','060302'),(236,'2022-09-09 01:06:57.795344','2022-09-09 01:15:08.080109','CEBA - JOSE GALVEZ','0390997','AVENIDA LEONCIO MARTINEZ 180','Cajabamba','PU','060201'),(237,'2022-09-09 01:06:57.860905','2022-09-09 01:15:08.239366','CEBA - CMDTE.LEONCIO MARTINEZ VEREAU','1228402','JIRON BALTA 420','Cajabamba','PU','060201'),(238,'2022-09-09 01:06:57.911927','2022-09-09 01:15:08.377304','CEBA - LUIS GERMAN OSORIO SABOGAL','1135532','JIRON JOSE SABOGAL 844','Cajabamba','PR','060201'),(239,'2022-09-09 01:06:57.969498','2022-09-09 01:15:08.568083','CEBA - CMDTE.LEONCIO MARTINEZ VEREAU','1358001','JIRON BALTA 420','Cajabamba','PU','060201'),(240,'2022-09-09 01:06:58.057027','2022-09-09 01:15:08.710746','JOSE A.SABOGAL DIEGUEZ','0544007','PARUBAMBA S/N','Cajabamba','PU','060201'),(241,'2022-09-09 01:06:58.112552','2022-09-09 01:15:08.860805','NUESTRA SEÑORA DEL ROSARIO','0390682','JIRON JOSE SABOGAL 541','Cajabamba','PU','060201'),(242,'2022-09-09 01:06:58.171178','2022-09-09 01:15:09.037094','JOSE GALVEZ','0390674','AVENIDA LEONCIO MARTINEZ 180','Cajabamba','PU','060201'),(243,'2022-09-09 01:06:58.229576','2022-09-09 01:15:09.202912','MICAELA BASTIDAS','0391102','JIRON CELSO BENIGNO CALDERON 203','Cajabamba','PU','060201'),(244,'2022-09-09 01:06:58.288755','2022-09-09 01:15:09.328816','MANUEL GONZALES PRADA','0771709','CHANSHAPAMBA','Cajabamba','PU','060201'),(245,'2022-09-09 01:06:58.362475','2022-09-09 01:15:09.453961','CMDTE.LEONCIO MARTINEZ VEREAU','0391110','JIRON BALTA 420','Cajabamba','PU','060201'),(246,'2022-09-09 01:06:58.421387','2022-09-09 01:15:09.579659','SAN IGNACIO DE LOYOLA','1211838','JIRON BLONDEL 278','Cajabamba','PR','060201'),(247,'2022-09-09 01:06:58.479308','2022-09-09 01:15:09.712023','SAN JOSE MARELLO VIALE','1359132','JIRON LEONCIO PRADO S/N','Cajabamba','PU','060201'),(248,'2022-09-09 01:06:58.539077','2022-09-09 01:15:09.870947','MUNICIPAL NUÑUMABAMBA','1359256','CARRETERA NUÑUMABAMBA','Cajabamba','PU','060201'),(249,'2022-09-09 01:06:58.596179','2022-09-09 01:15:09.996749','INTERNACIONAL ELIM','1359389','JIRON CELSO BENIGNO CALDERON 504','Cajabamba','PR','060201'),(250,'2022-09-09 01:06:58.654911','2022-09-09 01:15:10.132957','PITAGORAS','1344662','JIRON LA TORRE 867','Cajabamba','PR','060201'),(251,'2022-09-09 01:06:58.753813','2022-09-09 01:15:10.255480','COLCAS','1361591','COLCAS','Cajabamba','PU','060201'),(252,'2022-09-09 01:06:58.823190','2022-09-09 01:15:10.414894','COLCABAMBA','1663616','COLCABAMBA','Cajabamba','PU','060201'),(253,'2022-09-09 01:06:58.884854','2022-09-09 01:15:10.531175','82294','1760875','CUNGUNDAY S/N','Cajabamba','PU','060201'),(254,'2022-09-09 01:06:58.946515','2022-09-09 01:15:10.681281','LUIS GERMAN OSORIO SABOGAL','1359173','JIRON JOSE SABOGAL 844','Cajabamba','PR','060201'),(255,'2022-09-09 09:24:58.205429','2022-09-09 09:25:46.878876','CEBA - MARIANO MELGAR','0239657','AVENIDA PEDRO VILCAPAZA S/N','Ayaviri','PU','210801'),(256,'2022-09-09 09:24:58.275917','2022-09-09 09:25:46.944271','CEBA - NUESTRA SEÑORA DE ALTA GRACIA','0751636','JIRON 2 DE MAYO S/N','Ayaviri','PU','210801'),(257,'2022-09-09 09:24:58.321881','2022-09-09 09:25:46.996252','CEBA - ANDRES BELLO','1029701','JIRON LA MAR 183','Ayaviri','PU','210801'),(258,'2022-09-09 09:24:58.375128','2022-09-09 09:25:47.037834','CEBA - MARIANO MELGAR','1360817','AVENIDA PEDRO VILCAPAZA S/N','Ayaviri','PU','210801'),(259,'2022-09-09 09:24:58.426412','2022-09-09 09:25:47.079607','CEBA - MANCO CAPAC','1360825','JIRON AZANGARO S/N','Ayaviri','PU','210801'),(260,'2022-09-09 09:24:58.492509','2022-09-09 09:25:47.124836','72','0239707','JIRON 2 DE MAYO','Ayaviri','PU','210801'),(261,'2022-09-09 09:24:58.542034','2022-09-09 09:25:47.177037','MARIANO MELGAR','0478032','AVENIDA PEDRO VILCAPAZA S/N','Ayaviri','PU','210801'),(262,'2022-09-09 09:24:58.591729','2022-09-09 09:25:47.225141','NUESTRA SEÑORA DE ALTA GRACIA','0478040','JIRON 2 DE MAYO S/N','Ayaviri','PU','210801'),(263,'2022-09-09 09:24:58.643676','2022-09-09 09:25:47.275011','PEDRO KALBERMATER','0809848','JIRON MOQUEGUA 730','Ayaviri','PR','210801'),(264,'2022-09-09 09:24:58.700583','2022-09-09 09:25:47.325187','ROQUE SAENZ PEÑA','1028349','JIRON AREQUIPA 1110','Ayaviri','PU','210801'),(265,'2022-09-09 09:24:58.749596','2022-09-09 09:25:47.421397','CORAZON DE JESUS','1028422','JIRON GRAU 274','Ayaviri','PR','210801'),(266,'2022-09-09 09:24:58.800880','2022-09-09 09:25:47.473381','CESAR VALLEJO','1259522','JIRON 25 DE DICIEMBRE 530','Ayaviri','PR','210801'),(267,'2022-09-09 09:24:58.850749','2022-09-09 09:25:47.541348','ROSENDO HUIRSE','1580075','JIRON GRAU','Ayaviri','PR','210801'),(268,'2022-09-09 09:24:58.909827','2022-09-09 09:25:47.592057','CESGNE CORAZON DE JESUS','1580141','JIRON GRAU 325','Ayaviri','PR','210801'),(269,'2022-09-09 09:24:58.969129','2022-09-09 09:25:47.641901','SAN FRANCISCO DE ASIS','1413962','JIRON SAN MARTIN 154','Ayaviri','PU','210801'),(270,'2022-09-09 09:24:59.019180','2022-09-09 09:25:47.692528','MANCO CAPAC','0809855','AVENIDA MANCO CAPAC 359','Ayaviri','PU','210801'),(271,'2022-09-09 09:27:51.987790','2022-09-09 09:27:51.987825','INKA PACHAKUTEQ','0621698','PIRHUA','Ocobamba','PU','080905'),(272,'2022-09-09 09:27:52.046626','2022-09-09 09:27:52.046674','SAN JUAN BAUTISTA','0718551','VERSALLES','Ocobamba','PU','080905'),(273,'2022-09-09 09:27:52.099539','2022-09-09 09:27:52.099590','SAN LORENZO','0718569','SAN LORENZO S/N','Ocobamba','PU','080905'),(274,'2022-09-09 09:55:25.363715','2022-09-09 09:55:25.363777','CEBA - FRAY MARTIN DE PORRES','1358167','JIRON QUILLABAMBA S/N','Quellouno','PR','080906'),(275,'2022-09-09 09:55:25.434481','2022-09-09 09:55:25.434528','50817','1389378','YAVERO','Quellouno','PU','080906'),(276,'2022-09-09 09:55:25.493324','2022-09-09 09:55:25.493376','JAVIER HERAUD PEREZ','0621722','PUENTE SANTIAGO','Quellouno','PU','080906'),(277,'2022-09-09 09:55:25.561857','2022-09-09 09:55:25.561907','JOSE ANTONIO ENCINAS FRANCO','0718502','CANELON S/N','Quellouno','PU','080906'),(278,'2022-09-09 09:55:25.612042','2022-09-09 09:55:25.612090','JOSE OLAYA','0497552','CALLE TUPAC AMARU S/N','Quellouno','PU','080906'),(279,'2022-09-09 09:55:25.669059','2022-09-09 09:55:25.669104','INCA GARCILASO DE LA VEGA','0783118','PAMPA ESPERANZA S/N','Quellouno','PU','080906'),(280,'2022-09-09 09:55:25.719824','2022-09-09 09:55:25.719873','SAN LUIS GONZAGA','1201201','CHAPO CHICO','Quellouno','PR','080906'),(281,'2022-09-09 09:55:25.770457','2022-09-09 09:55:25.770505','NUEVA CONVENCION','1394030','LACCO YAVERO S/N','Quellouno','PU','080906'),(282,'2022-09-09 09:55:25.825768','2022-09-09 09:55:25.825819','SAGRADO CORAZON DE JESUS - ANCHIHUAY','1407105','ANCHIHUAY','Quellouno','PU','080906'),(283,'2022-09-09 09:55:25.875654','2022-09-09 09:55:25.875688','501419 ESTRELLA','1463827','ESTRELLA BOCA YABERO','Quellouno','PU','080906'),(284,'2022-09-09 09:55:25.928375','2022-09-09 09:55:25.928419','CRFA MOSOQ LLACTA','1530732','CHAPO CHICO SECTOR CHAPO CHICO','Quellouno','PU','080906'),(285,'2022-09-09 09:55:25.973706','2022-09-09 09:55:25.973729','CRFA WIÑAY QORIWAYNA','1766021','HILLCAPAMPA SECTOR HUILLCAPAMPA','Quellouno','PU','080906'),(286,'2022-09-09 09:55:26.234713','2022-09-09 09:55:26.234753','CRFA WIÑAY CONVENCION','1766039','MEDIA LUNA SECTOR MEDIA LUNA','Quellouno','PU','080906'),(287,'2022-09-09 09:55:26.309986','2022-09-09 09:55:26.310029','LA SALLE','1394287','JIRON QUILLABAMBA S/N','Quellouno','PR','080906'),(288,'2022-09-09 10:22:44.080658','2022-09-09 10:22:44.080700','CEBA - NIÑOS DE LA VIRGEN DE COPACABANA','1692086','CALLE 05 Y 07','Mariano Nicolás Valcárcel','PR','040203'),(289,'2022-09-09 10:22:44.172086','2022-09-09 10:22:44.172130','40194','1527001','CALLE PRINCIPAL S/N','Mariano Nicolás Valcárcel','PU','040203'),(290,'2022-09-09 10:22:44.225334','2022-09-09 10:22:44.225441','GRAN SABIO ALBERT EINSTEIN','1654573','CALLE 8 S/N','Mariano Nicolás Valcárcel','PR','040203'),(291,'2022-09-09 10:22:44.275415','2022-09-09 10:22:44.275463','CRISTO REY DE REYES','1686823','MZ C LOTE 3','Mariano Nicolás Valcárcel','PR','040203'),(292,'2022-09-09 10:22:44.325043','2022-09-09 10:22:44.325093','NIÑOS DE LA VIRGEN DE COPACABANA','1692078','CALLE 05 Y 07','Mariano Nicolás Valcárcel','PR','040203'),(293,'2022-09-09 10:22:44.376308','2022-09-09 10:22:44.376362','40667 CRISTO MORADO','1749373','SAN JOSE','Mariano Nicolás Valcárcel','PU','040203'),(294,'2022-09-09 10:22:44.426582','2022-09-09 10:22:44.426636','40234 JUAN PABLO II','1773258','CALLE NICOLAS DE PIEROLA S/N','Mariano Nicolás Valcárcel','PU','040203'),(295,'2022-09-09 10:23:23.537851','2022-09-09 10:23:23.537880','URIEL GARCIA','0489161','CALIXTO SANCHEZ S/N','Santa Teresa','PU','080908'),(296,'2022-09-09 10:23:23.601109','2022-09-09 10:23:23.601155','VIRGEN DEL CARMEN','0750406','SULLUCUYOC','Santa Teresa','PU','080908'),(297,'2022-09-09 10:23:23.651607','2022-09-09 10:23:23.651655','ALTO SALKANTAY','0783050','SAHUAYACO','Santa Teresa','PU','080908'),(298,'2022-09-09 10:23:23.701478','2022-09-09 10:23:23.701526','50258 SAN FRANCISCO DE ASIS','1394048','CCOCHAPAMPA','Santa Teresa','PU','080908'),(299,'2022-09-09 10:23:23.753315','2022-09-09 10:23:23.753366','JOSE CARLOS MARIATEGUI','1394436','CALLE SANTA TERESA S/N','Santa Teresa','PR','080908'),(300,'2022-09-09 11:35:34.710691','2022-09-09 11:35:34.710729','CEBA - VENCEDORES DEL CENEPA','1574730','PASAJE ALIAGA S/N','El Tambo','PR','120114'),(301,'2022-09-09 11:35:34.773797','2022-09-09 11:35:34.773849','CEBA - MARISCAL CASTILLA','0736538','CALLE AREQUIPA CDRA 9','El Tambo','PU','120114'),(302,'2022-09-09 11:35:34.839520','2022-09-09 11:35:34.839566','CEBA - POLITECNICO REGIONAL DEL CENTRO','0921817','CALLE AREQUIPA 501','El Tambo','PU','120114'),(303,'2022-09-09 11:35:34.922369','2022-09-09 11:35:34.922415','CEBA - LUIS AGUILAR ROMANI','1216647','EVITAMIENTO S/N','El Tambo','PU','120114'),(304,'2022-09-09 11:35:34.980940','2022-09-09 11:35:34.980990','CEBA - VIRGEN DEL PILAR','1429851','PASAJE MONTEVIDEO 170','El Tambo','PR','120114'),(305,'2022-09-09 11:35:35.031114','2022-09-09 11:35:35.031162','CEBA - LINUS HIGH SCHOOL','1636802','JIRON LOS MINERALES 325','El Tambo','PR','120114'),(306,'2022-09-09 11:35:35.106020','2022-09-09 11:35:35.106064','CEBA - SAN PEDRO','1636976','PASAJE LOS ALAMOS 102','El Tambo','PR','120114'),(307,'2022-09-09 11:35:35.155516','2022-09-09 11:35:35.155560','CEBA - RICARDO MENENDEZ MENENDEZ','1724319','JIRON ANTONIO LOBATO 1049','El Tambo','PU','120114'),(308,'2022-09-09 11:35:35.215004','2022-09-09 11:35:35.215055','SAN PIO X','0368068','AVENIDA PROGRESO 821','El Tambo','PR','120114'),(309,'2022-09-09 11:35:35.264380','2022-09-09 11:35:35.264896','MARISCAL CASTILLA','0372599','CALLE AREQUIPA CDRA 9','El Tambo','PU','120114'),(310,'2022-09-09 11:35:35.340520','2022-09-09 11:35:35.340571','SALESIANO SANTA ROSA','0373324','CALLE AREQUIPA 299','El Tambo','PR','120114'),(311,'2022-09-09 11:35:35.389768','2022-09-09 11:35:35.389819','LATINO','0373332','JIRON ALEJANDRO O DEUSTUA 383','El Tambo','PR','120114'),(312,'2022-09-09 11:35:35.479343','2022-09-09 11:35:35.479379','SOLARYX','0373340','PASAJE MONTEVIDEO 170','El Tambo','PR','120114'),(313,'2022-09-09 11:35:35.526762','2022-09-09 11:35:35.526785','GELICICH','0373720','CALLE REAL 290','El Tambo','PR','120114'),(314,'2022-09-09 11:35:35.572710','2022-09-09 11:35:35.572757','POLITECNICO REGIONAL DEL CENTRO','0373761','CALLE AREQUIPA 501','El Tambo','PU','120114'),(315,'2022-09-09 11:35:35.623284','2022-09-09 11:35:35.623338','SAGRADO CORAZON DE JESUS','0566927','JIRON MANCO CAPAC 475','El Tambo','PU','120114'),(316,'2022-09-09 11:35:35.676499','2022-09-09 11:35:35.676547','JUAN PARRA DEL RIEGO','0566950','JIRON LOS OLIVOS 101','El Tambo','PU','120114'),(317,'2022-09-09 11:35:35.723252','2022-09-09 11:35:35.723302','COSMOS','0667014','CALLE PROLONGACION TRUJILLO 131','El Tambo','PR','120114'),(318,'2022-09-09 11:35:35.787403','2022-09-09 11:35:35.787427','PAMER','0696963','CALLE MELCHOR GONZALES 251','El Tambo','PR','120114'),(319,'2022-09-09 11:35:35.951264','2022-09-09 11:35:35.951306','HEROES DEL CENEPA','0697029','CARRETERA SANTA ANA S/N','El Tambo','PU','120114'),(320,'2022-09-09 11:35:35.999957','2022-09-09 11:35:35.999996','JOSE FAUSTINO SANCHEZ CARRION','0697045','AVENIDA UNIVERSIT S/N','El Tambo','PU','120114'),(321,'2022-09-09 11:35:36.051469','2022-09-09 11:35:36.051510','HARVARD','0785832','JIRON HUAYNA CAPAC 240','El Tambo','PR','120114'),(322,'2022-09-09 11:35:36.101444','2022-09-09 11:35:36.101484','LA VICTORIA','0785956','AVENIDA SIMON BOLIVAR S/N','El Tambo','PU','120114'),(323,'2022-09-09 11:35:36.151457','2022-09-09 11:35:36.151499','MARTIRES 27 DE FEBRERO','0785964','PARQUE PLAZA PRINCIPAL S/N','El Tambo','PU','120114'),(324,'2022-09-09 11:35:36.227169','2022-09-09 11:35:36.227215','CONVENIO ANDRES BELLO','0919001','AVENIDA MARISCAL CASTILLA 2732','El Tambo','PR','120114'),(325,'2022-09-09 11:35:36.277198','2022-09-09 11:35:36.277247','SANTO TOMAS DE AQUINO','0919092','CALLE LOS ACANTILADOS 180','El Tambo','PR','120114'),(326,'2022-09-09 11:35:36.390783','2022-09-09 11:35:36.390833','FRANCISCO DE ZELA','0919308','CALLE ROSARIO 632','El Tambo','PU','120114'),(327,'2022-09-09 11:35:36.441305','2022-09-09 11:35:36.441356','MICAELA BASTIDAS','0919332','JIRON LAS VIOLETAS 127','El Tambo','PU','120114'),(328,'2022-09-09 11:35:36.510574','2022-09-09 11:35:36.510598','NUESTRA SEÑORA DE FATIMA','0919480','PASAJE LOS BOSQUES 101','El Tambo','PU','120114'),(329,'2022-09-09 11:35:36.555836','2022-09-09 11:35:36.555882','LUIS AGUILAR ROMANI','0919514','EVITAMIENTO S/N','El Tambo','PU','120114'),(330,'2022-09-09 11:35:36.606669','2022-09-09 11:35:36.606719','HIPOLITO UNANUE','0919605','CALLE JUNIN 2750','El Tambo','PR','120114'),(331,'2022-09-09 11:35:36.695607','2022-09-09 11:35:36.695657','CHRISTIAN BARNARD','0919720','JIRON GRAU 1848','El Tambo','PR','120114'),(332,'2022-09-09 11:35:36.753345','2022-09-09 11:35:36.753398','INGENIERIA','0919753','CALLE REAL 233','El Tambo','PR','120114'),(333,'2022-09-09 11:35:36.819630','2022-09-09 11:35:36.819675','ISABEL LA CATOLICA','0919787','JIRON LA MERCED 659','El Tambo','PR','120114'),(334,'2022-09-09 11:35:36.886243','2022-09-09 11:35:36.886289','KDTE CAPITAN ALIPIO PONCE VASQUEZ','0919811','JIRON ALEJANDRO O. DEUSTUA 383','El Tambo','PR','120114'),(335,'2022-09-09 11:35:36.936741','2022-09-09 11:35:36.936790','UNION LATINO INNOVA','0919902','AVENIDA MARISCAL CASTILLA 2809','El Tambo','PR','120114'),(336,'2022-09-09 11:35:37.028152','2022-09-09 11:35:37.028201','VILLARREAL','0919969','JIRON JUAN VELASCO ALVARADO 160','El Tambo','PR','120114'),(337,'2022-09-09 11:35:37.079302','2022-09-09 11:35:37.079784','17 SETIEMBRE','0922054','CALLE LOS MANZANOS 309','El Tambo','PU','120114'),(338,'2022-09-09 11:35:37.144760','2022-09-09 11:35:37.144805','NUESTRA SEÑORA DE LA MEDALLA MILAGROSA','1035187','JIRON CATALINA HUANCA 145','El Tambo','PR','120114'),(339,'2022-09-09 11:35:37.203614','2022-09-09 11:35:37.203660','NUEVO HORIZONTE','1035427','JIRON TRUJILLO 262','El Tambo','PR','120114'),(340,'2022-09-09 11:35:37.262455','2022-09-09 11:35:37.262505','UNCP','1035708','CARR. UNCP','El Tambo','PR','120114'),(341,'2022-09-09 11:35:37.320565','2022-09-09 11:35:37.320615','MI PERU','1036391','JIRON NEMESIO RAEZ 1320','El Tambo','PR','120114'),(342,'2022-09-09 11:35:37.424638','2022-09-09 11:35:37.424693','NIKKEI','1099977','ANTONIO LOBATO 1049','El Tambo','PR','120114'),(343,'2022-09-09 11:35:37.471305','2022-09-09 11:35:37.471337','SAN ANTONIO MARIA CLARET','1100981','JIRON AUGUSTO B. LEGUIA -CHILCA S/N','El Tambo','PR','120114'),(344,'2022-09-09 11:35:37.524403','2022-09-09 11:35:37.524427','AMERICA SCHOOL','1101260','CALLE MANUEL FUENTES 202','El Tambo','PR','120114'),(345,'2022-09-09 11:35:37.595719','2022-09-09 11:35:37.595765','MAESTRO REDENTOR','1214386','CALLE REAL 374-382','El Tambo','PR','120114'),(346,'2022-09-09 11:35:37.649649','2022-09-09 11:35:37.649700','PRAXIS LA ESPERANZA','1255710','JIRON PACHACUTEC 550','El Tambo','PR','120114'),(347,'2022-09-09 11:35:37.716075','2022-09-09 11:35:37.716125','EDWATD ALEXANDER SUTHERLAND','1255918','AVENIDA MARIATEGUI 440','El Tambo','PR','120114'),(348,'2022-09-09 11:35:37.765744','2022-09-09 11:35:37.765794','FRANCOIS VIETTE','1257039','JIRON PANAMA 1770','El Tambo','PR','120114'),(349,'2022-09-09 11:35:37.857955','2022-09-09 11:35:37.858008','SAN MARTIN DE PORRES - PODER JUDICIAL','1427475','JIRON TRUJILLO S/N','El Tambo','PR','120114'),(350,'2022-09-09 11:35:37.907007','2022-09-09 11:35:37.907056','LOS ANDES','1427640','AVENIDA HUANCAVELICA 2220','El Tambo','PR','120114'),(351,'2022-09-09 11:35:38.020866','2022-09-09 11:35:38.020918','HEROES DEL CENEPA','1103910','AVENIDA J C MARIATEGUI 825','El Tambo','PR','120114'),(352,'2022-09-09 11:35:38.080754','2022-09-09 11:35:38.080806','DIVINO MAESTRO JESUS','1428267','JIRON AREQUIPA 916','El Tambo','PR','120114'),(353,'2022-09-09 11:35:38.139193','2022-09-09 11:35:38.139243','NEWTON SCHOOL DE HUANCAYO','1428275','CALLE REAL 199','El Tambo','PR','120114'),(354,'2022-09-09 11:35:38.196563','2022-09-09 11:35:38.196606','JESUS EL BUEN PASTOR','1428366','CALLE ALEJANDRO DEUSTUA 769','El Tambo','PR','120114'),(355,'2022-09-09 11:35:38.253367','2022-09-09 11:35:38.253406','PITAGORAS','1428390','CALLE MANUEL FUENTES 320','El Tambo','PR','120114'),(356,'2022-09-09 11:35:38.313655','2022-09-09 11:35:38.313700','INGENIERIA INTERNACIONAL','1428556','JIRON SANTA ISABEL 1370','El Tambo','PR','120114'),(357,'2022-09-09 11:35:38.372067','2022-09-09 11:35:38.372117','CCECNA - TALENTOS','1429208','JIRON MANUEL FUENTES 202','El Tambo','PR','120114'),(358,'2022-09-09 11:35:38.447454','2022-09-09 11:35:38.447505','CRISTO SALVADOR','1428713','JIRON LOS MINERALES 449','El Tambo','PR','120114'),(359,'2022-09-09 11:35:38.545217','2022-09-09 11:35:38.545251','DIVINO MAESTRO','1428788','AVENIDA SIMON BOLIVAR MZ 22 LOTE 12 ZONA A','El Tambo','PR','120114'),(360,'2022-09-09 11:35:38.638553','2022-09-09 11:35:38.638604','ANTON MAKARENKO','1428895','PASAJE MARIA ARGUEDAS','El Tambo','PR','120114'),(361,'2022-09-09 11:35:38.697310','2022-09-09 11:35:38.697360','GOOD SHEPHERD HIGH SCHOOL','1428929','JIRON LOS MINERALES 331','El Tambo','PR','120114'),(362,'2022-09-09 11:35:38.755852','2022-09-09 11:35:38.755904','A & P PREMIUM','1429133','JIRON PARRA DEL RIEGO 1100','El Tambo','PR','120114'),(363,'2022-09-09 11:35:38.815220','2022-09-09 11:35:38.815288','NOBEL','1429059','AVENIDA 13 DE NOVIEMBRE 504','El Tambo','PR','120114'),(364,'2022-09-09 11:35:38.873052','2022-09-09 11:35:38.873098','BADEN POWEL','1429430','JULIO SUMAR','El Tambo','PR','120114'),(365,'2022-09-09 11:35:39.015577','2022-09-09 11:35:39.015629','ACTIVA SCHOOL HUANCAYO','1429513','JIRON DOS DE MAYO 679','El Tambo','PR','120114'),(366,'2022-09-09 11:35:39.090124','2022-09-09 11:35:39.090170','TRILENIUM PRE UNI','1429588','AVENIDA MARISCAL CASTILLA 2386','El Tambo','PR','120114'),(367,'2022-09-09 11:35:39.141283','2022-09-09 11:35:39.141336','BRYCE','1429646','JIRON DOS DE MAYO 410','El Tambo','PR','120114'),(368,'2022-09-09 11:35:39.190894','2022-09-09 11:35:39.190944','SAN SEBASTIAN','1429984','JIRON MANZANOS 1397','El Tambo','PR','120114'),(369,'2022-09-09 11:35:39.316384','2022-09-09 11:35:39.316430','SALESIANO DON BOSCO','0667022','AVENIDA HUANCAVELICA 165','El Tambo','PU','120114'),(370,'2022-09-09 11:35:39.361964','2022-09-09 11:35:39.361992','SANTO DOMINGO DE GUZMAN','1612787','JIRON COLON 339','El Tambo','PR','120114'),(371,'2022-09-09 11:35:39.438182','2022-09-09 11:35:39.438227','MONS. EMILIO VALLEBUONA MEREA','1612795','CALLE REAL 564','El Tambo','PR','120114'),(372,'2022-09-09 11:35:39.596665','2022-09-09 11:35:39.596691','ARCANGEL MICAEL','1430305','PASAJE LOS GUINDALES 190','El Tambo','PR','120114'),(373,'2022-09-09 11:35:39.649081','2022-09-09 11:35:39.649129','NUESTRO SABIO CONSEJO','1430354','JIRON ALEJANDRO O DEUSTUA 771','El Tambo','PR','120114'),(374,'2022-09-09 11:35:39.700612','2022-09-09 11:35:39.700658','SIGMA','1430719','CALLE REAL 213','El Tambo','PR','120114'),(375,'2022-09-09 11:35:39.749137','2022-09-09 11:35:39.749186','TRILCE','1430966','JIRON ALEJANDRO O. DEUSTUA 1350','El Tambo','PR','120114'),(376,'2022-09-09 11:35:39.816241','2022-09-09 11:35:39.816285','ALEJANDRO VON HUMBOLDT','1312818','CALLE JULIO SUMAR 461','El Tambo','PR','120114'),(377,'2022-09-09 11:35:39.865588','2022-09-09 11:35:39.865633','FEDERICO FROEBEL','1342245','JIRON MANUEL FUENTES 202 - 204','El Tambo','PR','120114'),(378,'2022-09-09 11:35:39.915777','2022-09-09 11:35:39.915825','LA SAPIENZA','1342484','JIRON JOSE MARIA ARGUEDAS 354','El Tambo','PR','120114'),(379,'2022-09-09 11:35:39.967562','2022-09-09 11:35:39.967612','TRILENIUM INTERNACIONAL YUNIX','1345263','AVENIDA FERROCARRIL 3988','El Tambo','PR','120114'),(380,'2022-09-09 11:35:40.016786','2022-09-09 11:35:40.016838','UNION LATINO SCHOOL','1348739','AVENIDA FERROCARRIL 3672','El Tambo','PR','120114'),(381,'2022-09-09 11:35:40.065595','2022-09-09 11:35:40.065639','AL-AZHAR DE EL CAIRO','1352558','AVENIDA FERROCARRIL 3590','El Tambo','PR','120114'),(382,'2022-09-09 11:35:40.115671','2022-09-09 11:35:40.115718','ORION SACO OLIVEROS','1363530','JIRON PROLONGACION AREQUIPA 3008','El Tambo','PR','120114'),(383,'2022-09-09 11:35:40.187573','2022-09-09 11:35:40.187602','RANGERS','1531045','AVENIDA FERROCARRIL 165','El Tambo','PR','120114'),(384,'2022-09-09 11:35:40.237257','2022-09-09 11:35:40.237280','LATINO INNOVA E.I.R.L.','1542513','CALLE SAN LUIS 165','El Tambo','PR','120114'),(385,'2022-09-09 11:35:40.304298','2022-09-09 11:35:40.304329','WINNER BOYS','1543271','JIRON CARHUALLANQUI 104','El Tambo','PR','120114'),(386,'2022-09-09 11:35:40.347297','2022-09-09 11:35:40.347330','GENESIS INTERNACIONAL CHRISTIAN SCHOOL','1574698','AVENIDA PROLONGACION MIGUEL GRAU 1848','El Tambo','PR','120114'),(387,'2022-09-09 11:35:40.417533','2022-09-09 11:35:40.417575','VENCEDORES DEL CENEPA','1574722','PASAJE ALIAGA S/N','El Tambo','PR','120114'),(388,'2022-09-09 11:35:40.464067','2022-09-09 11:35:40.464099','PRAXIS LAS ESTRELLAS','1620145','JIRON FAUSTINO ORE 250','El Tambo','PR','120114'),(389,'2022-09-09 11:35:40.516443','2022-09-09 11:35:40.516542','INTEGRACION','1635465','JIRON WIRACOCHA 245','El Tambo','PR','120114'),(390,'2022-09-09 11:35:40.583474','2022-09-09 11:35:40.583522','VALLE DEL MANTARO','1669480','AVENIDA JULIO SUMAR 372','El Tambo','PR','120114'),(391,'2022-09-09 11:35:40.628996','2022-09-09 11:35:40.629022','DISCOVERY','1697705','JIRON NEMESIO RAEZ 1774','El Tambo','PR','120114'),(392,'2022-09-09 11:35:40.717330','2022-09-09 11:35:40.717382','SAN PABLO HIGH SCHOOL','1705185','PASAJE SANTA BARBARA 352','El Tambo','PR','120114'),(393,'2022-09-09 11:35:40.766480','2022-09-09 11:35:40.766532','30059 ROSA DE AMERICA','1722768','PROLONGACION TRUJILLO 936','El Tambo','PU','120114'),(394,'2022-09-09 11:35:40.816602','2022-09-09 11:35:40.816647','LAS CARMELITAS','1723329','CALLE DIAMANTE AZUL 379','El Tambo','PR','120114'),(395,'2022-09-09 11:35:40.866430','2022-09-09 11:35:40.866479','CARRUSEL','1763820','JIRON PANAMA 1770-1778','El Tambo','PR','120114'),(396,'2022-09-09 11:35:40.916582','2022-09-09 11:35:40.916637','DIVINO MAESTRO','1429232','AVENIDA SIMON BOLIVAR MZ 22 LOTE 12 ZONA A','El Tambo','PR','120114'),(397,'2022-09-09 11:35:41.034652','2022-09-09 11:35:41.034701','PERU ALEMANIA','1324383','JIRON TRUJILLO 871','El Tambo','PR','120114'),(398,'2022-09-09 11:41:41.790404','2022-09-12 11:40:16.789043','HUAMAN POMA DE AYALA','0372615','AVENIDA HUAMAN POMA S/N','Manzanares','PU','120208'),(399,'2022-09-10 21:32:17.051472','2022-09-10 21:32:17.051520','NOMBRE','PR_MOD','CALLE DE PRUEBA','NOMBRE_LUGAR','PU','080101'),(400,'2022-09-12 11:42:56.240384','2022-09-12 11:42:56.240409','MANUEL SCORSA','0609487','JIRON LA UNION S/N','Chuquis','PU','100307'),(401,'2022-09-12 11:42:56.329333','2022-09-12 11:42:56.329365','DANIEL ALOMIA ROBLES','1247451','HUANCAN','Chuquis','PU','100307'),(402,'2022-09-12 11:42:56.371542','2022-09-12 11:42:56.371564','TINGO CHICO','1324730','CARRETERA TINGO CHICO S/N','Chuquis','PU','100307'),(403,'2022-09-12 11:42:56.418401','2022-09-12 11:42:56.418445','UCRUMARCA','1664820','UCRUMARCA','Chuquis','PU','100307'),(404,'2022-09-12 12:27:34.584361','2022-09-20 18:18:46.984772','10068','0582973','HUACAPAMPA','Cañaris','PU','140202'),(405,'2022-09-12 12:27:34.646493','2022-09-20 18:18:47.034283','11144 RAMON ORELLANO BARRIOS','0843664','CARRETERA LA LAGUNA S/N','Cañaris','PU','140202'),(406,'2022-09-12 12:27:34.702821','2022-09-20 18:18:47.083774','10776 JUAN VELASCO ALVARADO','0753715','CARRETERA HUAYABAMBA','Cañaris','PU','140202'),(407,'2022-09-12 12:27:34.773342','2022-09-20 18:18:47.134410','10071','0672543','LA SUCCHA','Cañaris','PU','140202'),(408,'2022-09-12 12:27:34.822739','2022-09-20 18:18:47.184454','10078','0669598','CHIÑAMA','Cañaris','PU','140202'),(409,'2022-09-12 12:27:34.872108','2022-09-20 18:18:47.248416','10624','0753723','QUIRICHIMA','Cañaris','PU','140202'),(410,'2022-09-12 12:27:34.937444','2022-09-20 18:18:47.298058','10062 SAN JUAN DE KAÑARIS','0710061','KAÑARIS','Cañaris','PU','140202'),(411,'2022-09-12 12:27:34.997144','2022-09-20 18:18:47.347737','10064','0710095','PANDACHI','Cañaris','PU','140202'),(412,'2022-09-12 12:27:35.047664','2022-09-20 18:18:47.397543','10076','1197250','CANGREJERA','Cañaris','PU','140202'),(413,'2022-09-12 12:27:35.139388','2022-09-20 18:18:47.481595','10875','1183599','CHILASQUE','Cañaris','PU','140202'),(414,'2022-09-12 12:27:35.189353','2022-09-20 18:18:47.531619','10876','1183631','CARRETERA TOTORAS - PAMPAVERDE','Cañaris','PU','140202'),(415,'2022-09-12 12:27:35.240789','2022-09-20 18:18:47.623456','SANTA LUCIA 10786','0753731','STA LUCIA','Cañaris','PU','140202'),(416,'2022-09-12 12:27:35.289596','2022-09-20 18:18:47.673223','IEGECOM PAMACA','1418706','PAMACA','Cañaris','PR','140202'),(417,'2022-09-12 12:27:35.348299','2022-09-20 18:18:47.736235','IEGECOM MAMAGPAMPA','1466481','MAMAJPAMPA','Cañaris','PU','140202'),(418,'2022-09-12 12:27:35.406929','2022-09-20 18:18:47.779374','IEGECOM TUTE','1466499','TUTE','Cañaris','PR','140202'),(419,'2022-09-12 12:27:35.456219','2022-09-20 18:18:47.835169','VIRGEN DEL CARMEN','1520998','ATUMPAMPA','Cañaris','PU','140202'),(420,'2022-09-12 12:27:35.506685','2022-09-20 18:18:47.882060','10073','1539907','PAMACA','Cañaris','PU','140202'),(421,'2022-09-12 12:27:35.556737','2022-09-20 18:18:47.933119','CONGONA','1545896','CONGONA','Cañaris','PR','140202'),(422,'2022-09-12 12:27:35.604759','2022-09-20 18:18:48.040572','SIGUES','1636638','SIGUES','Cañaris','PU','140202'),(423,'2022-09-12 12:27:35.655640','2022-09-20 18:18:48.090386','IEGEMUN EL NARANJO','1663186','EL NARANJO','Cañaris','PU','140202'),(424,'2022-09-12 12:27:35.721479','2022-09-20 18:18:48.185038','IEGEMUN TAURIMARCA','1663194','TAURIMARCA','Cañaris','PU','140202'),(425,'2022-09-12 12:27:35.773237','2022-09-20 18:18:48.243474','IEGEMUN PALO BLANCO','1665645','CARRETERA PALO BLANCO','Cañaris','PU','140202'),(426,'2022-09-12 12:27:35.823304','2022-09-20 18:18:48.318713','CAPITAN FAP JOSE ABELARDO QUIÑONES GONZALES','1669118','HIERBA BUENA','Cañaris','PU','140202'),(427,'2022-09-12 12:27:35.872956','2022-09-20 18:18:48.396338','10895 MAXIMO LLAMO CONDOR','1717925','SHIN SHIN','Cañaris','PU','140202'),(428,'2022-09-12 12:27:35.923508','2022-09-20 18:18:48.508513','10067','1724467','CONGONA','Cañaris','PU','140202'),(429,'2022-09-12 12:27:35.994496','2022-09-20 18:18:48.558108','10070','1724475','TAURIMARCA','Cañaris','PU','140202'),(430,'2022-09-12 12:27:36.047539','2022-09-20 18:18:48.607748','11048','1724483','MAMAGPAMPA','Cañaris','PU','140202'),(431,'2022-09-12 12:27:36.098218','2022-09-20 18:18:48.658280','11049','1724491','SIGUES','Cañaris','PU','140202'),(432,'2022-09-12 12:27:36.147967','2022-09-20 18:18:48.708889','11076','1724509','CARRETERA PALO BLANCO','Cañaris','PU','140202'),(433,'2022-09-12 12:27:36.201406','2022-09-20 18:18:48.753818','11049','1767227','SIGUES','Cañaris','PU','140202'),(434,'2022-09-12 12:27:36.265118','2022-09-20 18:18:48.796782','10067','1767235','CONGONA','Cañaris','PU','140202'),(435,'2022-09-12 12:27:36.314280','2022-09-20 18:18:48.900718','10065','1770924','TUTE','Cañaris','PU','140202'),(436,'2022-09-12 12:27:36.364528','2022-09-20 18:18:48.958076','10623 JOSE CARLOS MARIATEGUI','1771146','SAUCEPAMPA','Cañaris','PU','140202'),(437,'2022-09-12 12:36:11.922854','2022-09-20 19:32:01.298167','ALMIRANTE MIGUEL GRAU','0207381','AVENIDA CHECACUPE','Checacupe','PU','080602'),(438,'2022-09-12 12:36:12.047855','2022-09-20 19:32:01.374228','MARTIRES DE LA INDEPENDENCIA','1377787','PALCCOYO','Checacupe','PU','080602'),(439,'2022-09-12 12:37:50.953616','2022-09-12 12:37:50.953670','LAS AMERICAS','0617829','TAKINA','Capacmarca','PU','080702'),(440,'2022-09-12 12:37:51.033338','2022-09-12 12:37:51.033387','CANCAHUANI','1392232','CANCAHUANI','Capacmarca','PU','080702'),(441,'2022-09-12 12:37:51.090677','2022-09-12 12:37:51.090720','56277 SAN ANTONIO DE PADUA','1540996','TAHUAY','Capacmarca','PU','080702'),(442,'2022-09-12 12:37:51.142414','2022-09-12 12:37:51.142464','56261','1540970','CARRETERA CCAPACMARCA - MARA','Capacmarca','PU','080702'),(443,'2022-09-12 15:47:10.248864','2022-09-12 15:47:10.248903','SAN PEDRO DE SICCHAL','0396473','SICCHAL','Calamarca','PU','130502'),(444,'2022-09-12 15:47:10.335665','2022-09-12 15:47:10.335686','80553 LUIS FELIPE DE LA PUENTE UCEDA','1167592','CALAMARCA S/N','Calamarca','PU','130502'),(445,'2022-09-12 15:47:10.712226','2022-09-12 15:47:10.712267','80749','1167634','PACHACHACA','Calamarca','PU','130502'),(446,'2022-09-12 15:47:10.852344','2022-09-12 15:47:10.852392','80605','1168038','BARRO NEGRO','Calamarca','PU','130502'),(447,'2022-09-12 15:47:11.094266','2022-09-12 15:47:11.094318','CHASCA','1167675','CHASCA','Calamarca','PU','130502'),(448,'2022-09-12 15:47:11.418547','2022-09-12 15:47:11.418584','80945 JAVIER HERAUD','1451731','HUAGALLL','Calamarca','PU','130502'),(449,'2022-09-12 15:47:11.537052','2022-09-12 15:47:11.537102','80677','1533587','CALAMARCA ALTA','Calamarca','PU','130502'),(450,'2022-09-12 15:49:12.503401','2022-09-12 15:49:12.503441','CEBA - JOSE ANDRES RAZURI','0394593','JIRON ANDRES RAZURI 609','San Pedro de Lloc','PU','130701'),(451,'2022-09-12 15:49:12.583892','2022-09-12 15:49:12.583938','LATINO','1155654','AVENIDA MANUEL HERNANDEZ AQUIJE 203','San Pedro de Lloc','PR','130701'),(452,'2022-09-12 15:49:12.641296','2022-09-12 15:49:12.641343','SANTA TERESA DE LA INMACULADA','0395301','JIRON ANDRES RAZURI 311','San Pedro de Lloc','PU','130701'),(453,'2022-09-12 15:49:12.708310','2022-09-12 15:49:12.708355','JOSE ANDRES RAZURI','0395293','AVENIDA CENTENARIO 220','San Pedro de Lloc','PU','130701'),(454,'2022-09-12 15:49:12.766542','2022-09-12 15:49:12.766593','80380 VICTOR RAUL HAYA DE LA TORRE','0690370','AVENIDA 28 DE JULIO 172','San Pedro de Lloc','PU','130701'),(455,'2022-09-12 15:49:12.825355','2022-09-12 15:49:12.825399','SANTA ANA','1454099','JIRON DOS DE MAYO 649','San Pedro de Lloc','PR','130701'),(456,'2022-09-12 15:49:12.878633','2022-09-12 15:49:12.878656','LATINO','1320282','AVENIDA MANUEL HERNANDEZ 203','San Pedro de Lloc','PR','130701'),(457,'2022-09-12 15:49:12.928091','2022-09-12 15:49:12.928112','BLAISE PASCAL','1435718','CALLE ANCASH 611','San Pedro de Lloc','PR','130701'),(458,'2022-09-12 15:49:12.981129','2022-09-12 15:49:12.981164','JOSE ANTONIO ENCINAS','1454388','JIRON ADOLFO KING 71','San Pedro de Lloc','PR','130701'),(459,'2022-09-12 16:20:01.073427','2022-09-12 16:20:01.073470','CESAR VALLEJO SANTOS','0771097','CALLE COPA S/N','Copa','PU','150302'),(460,'2022-09-12 16:20:01.143862','2022-09-12 16:20:01.143907','HORACIO ZEVALLOS GAMEZ','0685941','TUPIOC','Copa','PU','150302'),(461,'2022-09-12 17:20:56.413824','2022-09-20 18:14:26.506319','JOSE ANTONIO ENCINAS FRANCO','0536011','JIRON JAHUAPAMPA S/N','Vilcabamba','PU','030712'),(462,'2022-09-12 17:39:54.829747','2022-09-12 17:39:54.829785','CEBA - SAN SALVADOR','1155753','JIRON BOLIVAR 512','Bolívar','PU','130301'),(463,'2022-09-12 17:39:54.901509','2022-09-12 17:39:55.230649','ANEXO-SAN SALVADOR','0395392','NUEVO CONDORMARCA','Bolívar','PU','130301'),(464,'2022-09-12 17:39:54.963339','2022-09-12 17:39:54.963389','RICARDO PALMA','0525931','UNAMEN','Bolívar','PU','130301'),(465,'2022-09-12 17:39:55.021312','2022-09-12 17:39:55.021356','80733 JOSE MARIA ARGUEDAS','1450410','SUNDIA','Bolívar','PU','130301'),(466,'2022-09-12 17:39:55.096542','2022-09-12 17:39:55.096594','80112 LEONCIO PRADO','1380294','YALEN','Bolívar','PU','130301'),(467,'2022-09-12 17:39:55.155107','2022-09-12 17:39:55.155158','81696','1380302','NUEVO PUSAC','Bolívar','PU','130301'),(468,'2022-09-12 17:39:55.288869','2022-09-12 17:39:55.289005','82166 DIVINO MAESTRO','1418409','CUJIBAMBA','Bolívar','PU','130301'),(469,'2022-09-12 17:39:55.363790','2022-09-12 17:39:55.363841','82164 MARIO VARGAS LLOSA','1418417','CHUQUITEN','Bolívar','PU','130301'),(470,'2022-09-12 17:39:55.422329','2022-09-12 17:39:55.422379','82165 CESAR VALLEJO MENDOZA','1418425','CONDORAY','Bolívar','PU','130301'),(471,'2022-09-12 17:39:55.497619','2022-09-12 17:39:55.497667','82162 SAN LORENZO','1418441','EL TAMBO','Bolívar','PU','130301'),(472,'2022-09-12 17:39:55.551130','2022-09-12 17:39:55.551158','SAN FRANCISCO DE ASIS','1574417','JIRON CORDOVA 505','Bolívar','PU','130301'),(473,'2022-09-12 18:37:18.681762','2022-09-12 19:02:57.302197','CEBA - URIEL GARCIA','0622621','AVENIDA JORGE CHAVEZ S/N','Wanchaq','PU','080108'),(474,'2022-09-12 18:37:18.730697','2022-09-12 19:02:57.373913','CEBA - YACHAYWASI','1061969','CALLE VILLA EL PERIODISTA MZ D LOTE 7','Wanchaq','PR','080108'),(475,'2022-09-12 18:37:18.826758','2022-09-12 19:02:57.430506','CEBA - VIRGEN DEL CARMEN','1061779','CALLE BERNARDO TAMBOHUACSO MZ C LOTE 6','Wanchaq','PR','080108'),(476,'2022-09-12 18:37:18.918635','2022-09-12 19:02:57.489440','CEBA - DOMINGO SAVIO','1269422','AVENIDA MACO CCAPAC 906','Wanchaq','PR','080108'),(477,'2022-09-12 18:37:19.027856','2022-09-12 19:02:57.570178','CEBA - NUESTRA SEÑORA VIRGEN DEL CARMEN','1386648','CALLE BERNARDO TAMBOHUACSO MZ C LOTE 6','Wanchaq','PR','080108'),(478,'2022-09-12 18:37:19.115453','2022-09-12 19:02:57.630696','CEBA - YANAPANAKUSUN','1386986','AVENIDA TOMASA TITO CONDEMAYTA 500-A','Wanchaq','PR','080108'),(479,'2022-09-12 18:37:19.207680','2022-09-12 19:02:57.689248','CEBA - YANAPANAKUSUN','1386994','AVENIDA TOMASA TITO CONDEMAYTA 500-A','Wanchaq','PR','080108'),(480,'2022-09-12 18:37:19.291511','2022-09-12 19:02:57.747641','CEBA - SAN MARCOS','1387430','AVENIDA LOS INCAS 919','Wanchaq','PR','080108'),(481,'2022-09-12 18:37:19.421247','2022-09-12 19:02:57.873192','SANTA ANA','0236752','JIRON GORDON MAGNE 204','Wanchaq','PR','080108'),(482,'2022-09-12 18:37:19.702327','2022-09-12 19:02:57.955906','EL NAZARENO','0928085','JIRON ANTONIO RAYMONDI MZ B LOTE 12','Wanchaq','PR','080108'),(483,'2022-09-12 18:37:19.843785','2022-09-12 19:02:58.127240','URIEL GARCIA','0236174','AVENIDA JORGE CHAVEZ S/N','Wanchaq','PU','080108'),(484,'2022-09-12 18:37:20.005203','2022-09-12 19:02:58.189663','SAN JOSE LA SALLE','0236679','AVENIDA TULLUMAYO 135','Wanchaq','PR','080108'),(485,'2022-09-12 18:37:20.064115','2022-09-12 19:02:58.248540','MIGUEL GRAU SEMINARIO','0591131','AVENIDA TOMASA TTITO CONDEMAYTA S/N','Wanchaq','PU','080108'),(486,'2022-09-12 18:37:20.112416','2022-09-12 19:02:58.306046','ARTURO PALOMINO RODRIGUEZ','0591198','CALLE AGUA MARINA MZ A LOTE 10','Wanchaq','PU','080108'),(487,'2022-09-12 18:37:20.196877','2022-09-12 19:02:58.387343','51014 ROMERITOS','0735035','CALLE CUSCO S/N','Wanchaq','PU','080108'),(488,'2022-09-12 18:37:20.246780','2022-09-12 19:02:58.447918','MARIA DE LA MERCED','0579177','AVENIDA TOMASA TTITO CONDEMAYTA S/N','Wanchaq','PU','080108'),(489,'2022-09-12 18:37:20.347104','2022-09-12 19:02:58.506944','SAGRADO CORAZON DE JESUS','0933598','AVENIDA 28 DE JULIO S/N','Wanchaq','PU','080108'),(490,'2022-09-12 18:37:20.396162','2022-09-12 19:02:58.570643','EL PACIFICO','0933333','AVENIDA VELASCO ASTETE MZ B LOTE 5','Wanchaq','PR','080108'),(491,'2022-09-12 18:37:20.483080','2022-09-12 19:02:58.630639','OLIMPICO PERUANO','0928200','AVENIDA HIPOLITO UNANUE S/N','Wanchaq','PU','080108'),(492,'2022-09-12 18:37:20.642710','2022-09-12 19:02:58.690012','DOMINGO SAVIO','1200419','AVENIDA MACO CCAPAC 906','Wanchaq','PR','080108'),(493,'2022-09-12 18:37:20.781329','2022-09-12 19:02:58.748342','QOLLANA YACHAY WASI','0928598','AVENIDA MANCO CCAPAC 718','Wanchaq','PR','080108'),(494,'2022-09-12 18:37:20.894441','2022-09-12 19:02:58.806071','EL CLARETIANO','1201532','AVENIDA MANCO CAPAC 310','Wanchaq','PR','080108'),(495,'2022-09-12 18:37:20.950699','2022-09-12 19:02:58.864416','CENTRO JUVENIL MARCAVALLE','1201789','AVENIDA DE LA CULTURA 2400','Wanchaq','PU','080108'),(496,'2022-09-12 18:37:21.282409','2022-09-12 19:02:58.919043','SAN FRANCISCO JAVIER','1268820','AVENIDA HUASCAR 140','Wanchaq','PR','080108'),(497,'2022-09-12 18:37:21.358067','2022-09-12 19:02:59.016838','NUESTRA SEÑORA DE FATIMA','1386168','ZONA CIVICA S/N','Wanchaq','PU','080108'),(498,'2022-09-12 18:37:21.474953','2022-09-12 19:02:59.081259','50025','1386234','AVENIDA PEDRO VILCA APAZA S/N','Wanchaq','PU','080108'),(499,'2022-09-12 18:37:21.614056','2022-09-12 19:02:59.166109','MILLENNIUM','1386341','AVENIDA DE LA CULTURA 1008','Wanchaq','PR','080108'),(500,'2022-09-12 18:37:21.730386','2022-09-12 19:02:59.236133','ALFA INGENIEROS','1386366','AVENIDA PERU G-8','Wanchaq','PR','080108'),(501,'2022-09-12 18:37:21.784242','2022-09-12 19:02:59.318163','CAP. FAP. JOSE ABELARDO QUIÑONES','1386127','AVENIDA GASTON ZAPATA 447','Wanchaq','PU','080108'),(502,'2022-09-12 18:37:21.842155','2022-09-12 19:02:59.376943','PITAGORAS','1386614','AVENIDA HUASCAR 150','Wanchaq','PR','080108'),(503,'2022-09-12 18:37:21.906426','2022-09-12 19:02:59.448717','NUESTRA SEÑORA VIRGEN DEL CARMEN','1387315','CALLE BERNARDO TAMBOHUACSO MZ C LOTE 6','Wanchaq','PR','080108'),(504,'2022-09-12 18:37:21.962496','2022-09-12 19:02:59.509331','BERTRAND RUSSELL','1387380','JIRON LIBERTAD MZ E LOTE 6','Wanchaq','PR','080108'),(505,'2022-09-12 18:37:22.015299','2022-09-12 19:02:59.573885','UNIINGENIEROS CUSCO','1313519','AVENIDA TOMASA TITO CONDEMAYTA 164 SECTOR WANCHAQ','Wanchaq','PR','080108'),(506,'2022-09-12 18:37:22.097554','2022-09-12 19:02:59.635578','GALILEO','1323856','CONDOMINIO HUASCAR MZ A LOTE 21','Wanchaq','PR','080108'),(507,'2022-09-12 18:37:22.150022','2022-09-12 19:02:59.694569','RAIMONDI','1354729','CALLE MARISCAL GAMARRA 1003-3A','Wanchaq','PR','080108'),(508,'2022-09-12 18:37:22.201582','2022-09-12 19:02:59.753570','51045','1370360','SECTOR EDUCACION MZ A LOTE 9','Wanchaq','PU','080108'),(509,'2022-09-12 18:37:22.276316','2022-09-12 19:02:59.807562','50731 NUESTR SEÑORA DE LA NATIVIDAD DE PROGRESO','1522721','JIRON COYA S/N','Wanchaq','PU','080108'),(510,'2022-09-12 18:37:22.326135','2022-09-12 19:02:59.894989','BILINGUE MANUEL PARDO Y LAVALLE','1731546','AVENIDA HUAYRUROPATA 1209 ETAPA CERCADO SECTOR HUAYRUROPATA','Wanchaq','PR','080108'),(511,'2022-09-12 18:37:22.400343','2022-09-12 19:02:59.949153','TRENER','1753623','AVENIDA LOS INCAS 1606','Wanchaq','PR','080108'),(512,'2022-09-12 18:37:22.518783','2022-09-12 19:03:00.024218','INTERNATIONAL COLLEGE','1767177','AVENIDA DE LA CULTURA 413','Wanchaq','PR','080108'),(513,'2022-09-12 18:37:22.610366','2022-09-12 19:03:00.083087','EL NIÑO INVESTIGADOR KUSKIQ ERQE','1768076','AVENIDA TOMASA TITO CONDEMAYTA 164','Wanchaq','PR','080108'),(514,'2022-09-12 18:37:22.692599','2022-09-12 19:03:00.169312','TALENTOS','1772623','AVENIDA PERU S/N MZ G LOTE 8','Wanchaq','PR','080108'),(515,'2022-09-12 18:37:22.742436','2022-09-12 19:03:00.231196','THOMAS YOUNG','1201698','AVENIDA HUASCAR 150','Wanchaq','PR','080108'),(516,'2022-09-12 18:37:22.792264','2022-09-12 19:03:00.308170','ANDRES BELLO','1386135','AVENIDA MANCO CAPAC S/N','Wanchaq','PR','080108'),(517,'2022-09-12 18:37:22.842547','2022-09-12 19:03:00.362735','LATINOAMERICANO','1386879','AVENIDA GARCILASO 300','Wanchaq','PR','080108'),(518,'2022-09-13 08:55:02.454862','2022-09-13 08:55:02.454897','22316 IRMA MENDOZA DE CORDOVA','0886218','AVENIDA INDEPENDENCIA S/N','Los Aquijes','PU','110103'),(519,'2022-09-13 08:55:02.596549','2022-09-13 08:55:02.596590','22485','0886234','AVENIDA SAN MARTIN S/N','Los Aquijes','PU','110103'),(520,'2022-09-13 08:55:02.731801','2022-09-13 08:55:02.731846','22511','0886242','AVENIDA EL ROSARIO S/N','Los Aquijes','PU','110103'),(521,'2022-09-13 08:55:02.930033','2022-09-13 08:55:02.930079','GABRIEL RAMOS','0553420','AVENIDA ARENALES S/N','Los Aquijes','PU','110103'),(522,'2022-09-13 08:55:03.064576','2022-09-13 08:55:03.064624','JOSE GREGORIO HUAMAN GIRAO','0553529','AVENIDA SEBASTIAN BARRANCA MZ Z LOTE 8','Los Aquijes','PU','110103'),(523,'2022-09-20 16:25:50.328226','2022-09-20 16:25:50.328267','CEBA - RENE CAMACHO TARQUI','1607373','CARRETERA PANAMERICANA SUR S/N','La Joya','PU','040108'),(524,'2022-09-20 16:25:50.379968','2022-09-20 16:25:50.380014','CEBA - CARLOS W. SUTTON','0794487','JIRON 2 DE MAYO S/N','La Joya','PU','040108'),(525,'2022-09-20 16:25:50.432003','2022-09-20 16:25:50.432050','CEBA - INTERNACIONAL','1544071','AVENIDA PANAMERICA VIA LIMA','La Joya','PR','040108'),(526,'2022-09-20 16:25:50.479101','2022-09-20 16:25:50.479145','CEBA - THOMAS JEFFERSON','1639970','CALLE JOSE ANTONIO SUCRE MZ G LOTE 01 ZONA B','La Joya','PR','040108'),(527,'2022-09-20 16:25:50.529369','2022-09-20 16:25:50.529520','CEBA - SGTO.1 FAP RENE CAMACHO TARQUI','1760438','CARRETERA PANAMERICANA SUR S/N','La Joya','PU','040108'),(528,'2022-09-20 16:25:50.663814','2022-09-20 16:25:50.663863','CARLOS W. SUTTON','0309542','JIRON 2 DE MAYO S/N','La Joya','PU','040108'),(529,'2022-09-20 16:25:50.713649','2022-09-20 16:25:50.713698','40326 JUAN VELASCO ALVARADO','0501486','CENTRO DE SERVICIOS','La Joya','PU','040108'),(530,'2022-09-20 16:25:50.764031','2022-09-20 16:25:50.764079','40065 GLORIOSO HEROES DEL CENEPA','0517565','SAN ISIDRO','La Joya','PU','040108'),(531,'2022-09-20 16:25:50.813349','2022-09-20 16:25:50.813394','SGTO. 1 FAP. LAZARO ORREGO MORALES','0617464','BASE AEREA DE VITOR','La Joya','PU','040108'),(532,'2022-09-20 16:25:50.863400','2022-09-20 16:25:50.863446','EL CRUCE','0695320','JIRON JOSE CARLOS MARIATEGUI S/N','La Joya','PU','040108'),(533,'2022-09-20 16:25:50.912560','2022-09-20 16:25:50.912589','COR. FAP CESAR FAURA GOUBET','0695346','CALLE LOS CLAVELES MZ G LOTE 3','La Joya','PU','040108'),(534,'2022-09-20 16:25:50.965104','2022-09-20 16:25:50.965156','40096','0745976','SAN CAMILO MZ A LOTE 5','La Joya','PU','040108'),(535,'2022-09-20 16:25:51.164272','2022-09-20 16:25:51.164321','RENE CAMACHO TARQUI','0899278','CARRETERA PANAMERICANA SUR S/N','La Joya','PU','040108'),(536,'2022-09-20 16:25:51.213754','2022-09-20 16:25:51.213803','JESUS','0899302','AVENIDA PAZ SOLDAN S/N','La Joya','PU','040108'),(537,'2022-09-20 16:25:51.263885','2022-09-20 16:25:51.263933','CIENCIAS SEÑOR DE LA JOYA - JUAN ORELLANA GARCIA','1261429','AVENIDA CAPITAN ABELARDO QUIÑONES S/N','La Joya','PR','040108'),(538,'2022-09-20 16:25:51.321371','2022-09-20 16:25:51.321420','40353 SANTIAGO ANTUNEZ DE MAYOLO','1271659','SAN CAMILO','La Joya','PU','040108'),(539,'2022-09-20 16:25:51.371619','2022-09-20 16:25:51.371665','NUESTRO SEÑOR DE LOS MILAGROS','1607191','SAN CAMILO','La Joya','PR','040108'),(540,'2022-09-20 16:25:51.431150','2022-09-20 16:25:51.431199','SEÑOR DE LOS MILAGROS DE LA JOYA','1607258','MZ F LOTE 5','La Joya','PR','040108'),(541,'2022-09-20 16:25:51.480731','2022-09-20 16:25:51.480778','SANTISIMA VIRGEN DE CHAPI','1607340','EL TRIUNFO','La Joya','PR','040108'),(542,'2022-09-20 16:25:51.532216','2022-09-20 16:25:51.532263','DIVINO REDENTOR','1341510','AVENIDA PAZ SOLDAN 616','La Joya','PR','040108'),(543,'2022-09-20 16:25:51.580475','2022-09-20 16:25:51.580522','40068','1379304','EL RAMAL','La Joya','PU','040108'),(544,'2022-09-20 16:25:51.644313','2022-09-20 16:25:51.644357','SAN FERNANDO','1410935','AVENIDA DOS DE MAYO 205','La Joya','PR','040108'),(545,'2022-09-20 16:25:51.755452','2022-09-20 16:25:51.755500','EL TRIUNFO II','1653591','EL TRIUNFO II AA.HH.','La Joya','PU','040108'),(546,'2022-09-20 16:25:51.805485','2022-09-20 16:25:51.805537','40093','1658194','IRRIGACION-LA CANO','La Joya','PU','040108'),(547,'2022-09-20 16:25:51.915483','2022-09-20 16:25:51.915533','LA JOYA','1663459','AVENIDA PAZ SOLDAN MZ W LOTE 04 ZONA A','La Joya','PR','040108'),(548,'2022-09-20 16:25:51.959136','2022-09-20 16:25:51.959159','J.N. ANDREWS - VILLA ESPERANZA','1694116','CALLE SAMARA MZ C LOTE 4','La Joya','PR','040108'),(549,'2022-09-20 16:25:52.013541','2022-09-20 16:25:52.013586','BRYCE LA JOYA','1719772','AVENIDA PAZ SOLDAN 307','La Joya','PR','040108'),(550,'2022-09-20 16:25:52.072162','2022-09-20 16:25:52.072209','ANGELES DE LA PAZ','1719780','CALLE SAN MARTIN 103 - 107','La Joya','PR','040108'),(551,'2022-09-20 16:25:52.130357','2022-09-20 16:25:52.130402','40137 NUESTRA SEÑORA DE LA GLORIA','1747195','PANAMERICANA SUR MZ O LOTE 1 ZONA B','La Joya','PU','040108'),(552,'2022-09-20 16:25:52.180795','2022-09-20 16:25:52.180841','ADUNSA','1748722','CALLE JOSE OLAYA S/N','La Joya','PR','040108'),(553,'2022-09-20 16:25:52.239064','2022-09-20 16:25:52.239113','PRONOE VIRGEN DE GUADALUPE','1333350','CALLE MARISCAL SUCRE 103','La Joya','PR','040108'),(554,'2022-09-20 16:25:52.322801','2022-09-20 16:25:52.322848','SAN MARTIN DE PORRES','1333079','MZ F LOTE 5','La Joya','PR','040108'),(555,'2022-09-20 16:46:50.544123','2022-09-20 16:46:50.544158','CEBA - CONSTANTINO CARVALLO','1443910','YANAMA','Carmen Alto','PU','050104'),(556,'2022-09-20 16:46:50.610733','2022-09-20 16:46:50.610758','CEBA - SIGNOS DE FE DE LA SALLE','1540814','AVENIDA MARISCAL CACERES MZ U1 LOTE 04','Carmen Alto','PR','050104'),(557,'2022-09-20 16:46:50.668754','2022-09-20 16:46:50.668781','CEBA - MARI CARMEN SALAS','1724772','AVENIDA MARISCAL CACERES 104','Carmen Alto','PU','050104'),(558,'2022-09-20 16:46:50.710231','2022-09-20 16:46:50.710252','ABRAHAM VALDELOMAR','0616466','AVENIDA VISTA ALEGRE S/N','Carmen Alto','PU','050104'),(559,'2022-09-20 16:46:50.773974','2022-09-20 16:46:50.773992','CYBERNET','1140698','AVENIDA CARMEN ALTO 392','Carmen Alto','PR','050104'),(560,'2022-09-20 16:46:50.818289','2022-09-20 16:46:50.818308','JOSE GABRIEL CONDORCANQUI','1345974','PASAJE PASAJE MZ B LOTE 2','Carmen Alto','PU','050104'),(561,'2022-09-20 16:46:50.860601','2022-09-20 16:46:50.860622','DOMINGO SAVIO','1610070','JIRON HUARAZ 100','Carmen Alto','PR','050104'),(562,'2022-09-20 16:46:50.944336','2022-09-20 16:46:50.944373','COLEGIO MILITAR BASILIO AUQUI','1362789','CALLE LOS LIBERTADORES S/N','Carmen Alto','PU','050104'),(563,'2022-09-20 16:46:50.993617','2022-09-20 16:46:50.993636','JAVIER HERAUD PEREZ','1395391','MZ Y LOTE 1','Carmen Alto','PU','050104'),(564,'2022-09-20 16:46:51.063231','2022-09-20 16:46:51.063264','LOS ANGELES DE LA PAZ','1443928','YANAMA','Carmen Alto','PU','050104'),(565,'2022-09-20 16:46:51.126485','2022-09-20 16:46:51.126504','SIGNOS DE FE DE LA SALLE','1493725','AVENIDA MARISCAL CACERES MZ U1 LOTE 04','Carmen Alto','PR','050104'),(566,'2022-09-20 16:46:51.169184','2022-09-20 16:46:51.169205','13 DE ABRIL','1516996','PLAZA PRINCIPAL','Carmen Alto','PU','050104'),(567,'2022-09-20 16:46:51.227053','2022-09-20 16:46:51.227074','INTERNACIONAL PERUANO EUROPEO','1574375','CARRETERA AYACUHO - ANDAHUAYLAS KM. 7.5 SECTOR YANAMA','Carmen Alto','PR','050104'),(568,'2022-09-20 16:46:51.287657','2022-09-20 16:46:51.287688','OTTO VALLADARES RODRIGUEZ','1639756','CALLE CALLE S/N','Carmen Alto','PU','050104'),(569,'2022-09-20 18:20:27.556110','2022-09-20 18:20:27.556139','ACCHA','0495069','PAMPACUCHO S/N','Accha','PU','081002'),(570,'2022-09-20 18:20:27.602759','2022-09-20 18:20:27.602802','50378','1625557','MISANAPATA','Accha','PU','081002'),(571,'2022-09-20 18:33:28.057867','2022-09-20 18:33:28.057906','CEBA - JOSE CARLOS MARIATEGUI','1451590','CALLE PROGRESO S/N','Julcan','PR','130501'),(572,'2022-09-20 18:33:28.130599','2022-09-20 18:33:28.130647','CEBA - SAN ANTONIO','1528165','CALLE MIRAFLORES 039','Julcan','PR','130501'),(573,'2022-09-20 18:33:28.194682','2022-09-20 18:33:28.194735','CEBA - LUIS FELIPE DE LA PUENTE UCEDA','1755644','AVENIDA 28 DE JULIO 116','Julcan','PU','130501'),(574,'2022-09-20 18:33:28.247040','2022-09-20 18:33:28.247089','TECNICO SAN JUAN BAUTISTA','1167519','CALLE LA CULTURA 305','Julcan','PU','130501'),(575,'2022-09-20 18:33:28.299051','2022-09-20 18:33:28.299102','80319','1167477','PARUQUE ALTO','Julcan','PU','130501'),(576,'2022-09-20 18:33:28.346853','2022-09-20 18:33:28.346967','80315','1167394','SAN ANTONIO','Julcan','PU','130501'),(577,'2022-09-20 18:33:28.487063','2022-09-20 18:33:28.487114','80252 MIGUEL ANGEL OTINIANO ZAVALETA','1167352','CHUGURPAMPA','Julcan','PU','130501'),(578,'2022-09-20 18:33:28.538106','2022-09-20 18:33:28.538153','80249 LUIS FELIPE DE LA PUENTE','1167311','AVENIDA 28 DE JULIO 116','Julcan','PU','130501'),(579,'2022-09-20 18:33:28.634774','2022-09-20 18:33:28.634824','80316','1167436','AYANGAY','Julcan','PU','130501'),(580,'2022-09-20 18:33:28.700542','2022-09-20 18:33:28.700565','80720','1451566','SANTA APOLONIA','Julcan','PU','130501'),(581,'2022-09-20 18:33:28.983292','2022-09-20 18:33:28.983336','80318','1268218','CARRAPALDAY CHICO','Julcan','PU','130501'),(582,'2022-09-20 18:33:29.197905','2022-09-20 18:33:29.197960','80258','1363381','CHOPTALOMA','Julcan','PU','130501'),(583,'2022-09-20 18:33:29.338009','2022-09-20 18:33:29.338060','80723','1375047','PAMPAN','Julcan','PU','130501'),(584,'2022-09-20 18:33:29.522792','2022-09-20 18:33:29.522841','CPED - 80251','1379627','CANDUALL ALTO','Julcan','PU','130501'),(585,'2022-09-20 18:33:29.649702','2022-09-20 18:33:29.649753','80793','1416320','SAN JUAN ALTO','Julcan','PU','130501'),(586,'2022-09-20 18:33:29.816545','2022-09-20 18:33:29.816596','80321','1533579','PARUQUE BAJO','Julcan','PU','130501'),(587,'2022-09-20 18:33:29.881337','2022-09-20 18:33:29.881385','82106','1709955','ORIENTE HUAYCHACA','Julcan','PU','130501'),(588,'2022-09-20 19:17:31.815823','2022-09-20 19:17:31.815867','CEBA - HUMBERTO LUNA','0489302','CALLE ESPINAR 401','Calca','PU','080401'),(589,'2022-09-20 19:17:31.890291','2022-09-20 19:17:31.890340','CEBA - CESAR VALLEJO','1389238','AVENIDA CUSCO 250','Calca','PR','080401'),(590,'2022-09-20 19:17:32.083845','2022-09-20 19:17:32.083897','HUMBERTO LUNA','0233114','CALLE ESPINAR 401','Calca','PU','080401'),(591,'2022-09-20 19:17:32.133315','2022-09-20 19:17:32.133366','28','0236901','CALLE CCORICANCHA S/N','Calca','PU','080401'),(592,'2022-09-20 19:17:32.266749','2022-09-20 19:17:32.266800','NUESTRA SEÑORA DE BELEN','0932087','CALLE UCAYALI S/N','Calca','PU','080401'),(593,'2022-09-20 19:17:32.324888','2022-09-20 19:17:32.324941','SAGRADO CORAZON DE JESUS','0932178','AVENIDA VILCANOTA S/N','Calca','PU','080401'),(594,'2022-09-20 19:17:32.382247','2022-09-20 19:17:32.382297','JUAN VELASCO ALVARADO','0932202','HUARAN','Calca','PU','080401'),(595,'2022-09-20 19:17:32.440858','2022-09-20 19:17:32.440908','NUESTRA SEÑORA DE LA MERCED','0933291','CALLE LOS JARDINES 02','Calca','PR','080401'),(596,'2022-09-20 19:17:32.499254','2022-09-20 19:17:32.499301','THOMAS ALVA EDISON','1389352','CALLE GENERAL OLLANTA S/N','Calca','PR','080401'),(597,'2022-09-20 19:17:32.557575','2022-09-20 19:17:32.557622','50187 SAN JOSE','1721422','PAMPALLACTA PAMPALLACTA','Calca','PU','080401'),(598,'2022-09-20 19:17:32.616533','2022-09-20 19:17:32.616581','AGROECOLOGICA SAN JOSE OBRERO','1748375','CARRETERA CARRETERA CALCA -MACHACANCHA S/N','Calca','PU','080401'),(599,'2022-09-20 19:17:32.676321','2022-09-20 19:17:32.676360','SAN JOSE CRISTO SALVADOR','1756857','CRISTO SALVADOR','Calca','PU','080401'),(600,'2022-09-20 19:17:32.741144','2022-09-20 19:17:32.741193','50189','1769645','TTIO TTIO','Calca','PU','080401'),(601,'2022-09-20 19:17:32.790589','2022-09-20 19:17:32.790634','IMPERIO DEL SUR','1772649','CALLE OLLANTA MZ A1 LOTE 5','Calca','PR','080401'),(602,'2022-09-21 10:59:17.268550','2022-09-21 10:59:22.067837','AGROPECUARIO TECNICO INDUSTRIAL NUESTRO SEÑOR','0286344','PLAZA SAN MARTIN','Huamantanga','PU','150403'),(603,'2022-09-21 11:08:32.665972','2022-09-21 11:08:47.526763','CEBA - GENERAL OLLANTA','0236000','AVENIDA SR TORRECHAYOC 620','Urubamba','PU','081301'),(604,'2022-09-21 11:08:32.729311','2022-09-21 11:08:47.598543','CEBA - ROSA DE SANTA MARIA','1398809','JIRON GRAU 213','Urubamba','PR','081301'),(605,'2022-09-21 11:08:32.801782','2022-09-21 11:08:47.705037','CEBA - DIVINO MAESTRO','1398817','JIRON BOLIVAR 625','Urubamba','PR','081301'),(606,'2022-09-21 11:08:32.863080','2022-09-21 11:08:47.777744','CEBA - DIVINO MAESTRO','1398825','JIRON BOLIVAR 625','Urubamba','PR','081301'),(607,'2022-09-21 11:08:32.921178','2022-09-21 11:08:47.847643','CEBA - GENERAL OLLANTA','1361062','AVENIDA SR TORRECHAYOC 620','Urubamba','PU','081301'),(608,'2022-09-21 11:08:32.979060','2022-09-21 11:08:47.906887','GENERAL OLLANTA','0236158','AVENIDA SR TORRECHAYOC 620','Urubamba','PU','081301'),(609,'2022-09-21 11:08:33.038380','2022-09-21 11:08:47.965717','VALLE SAGRADO','0236281','JIRON NICOLAS BARRE S/N','Urubamba','PU','081301'),(610,'2022-09-21 11:08:33.096638','2022-09-21 11:08:48.023306','AGROPECUARIO','0236927','CHARCAHUAYLLA','Urubamba','PU','081301'),(611,'2022-09-21 11:08:33.154548','2022-09-21 11:08:48.081497','SEÑOR DE TORRECHAYOC','0591875','YANAHUARA','Urubamba','PU','081301'),(612,'2022-09-21 11:08:33.229793','2022-09-21 11:08:48.140453','INTEGRANDO','0931725','AVENIDA SAN ISIDRO P-9','Urubamba','PR','081301'),(613,'2022-09-21 11:08:33.288120','2022-09-21 11:08:48.201495','BOLIVARIANO','1398742','AVENIDA 9 DE NOVIEMBRE S/N','Urubamba','PR','081301'),(614,'2022-09-21 11:08:33.346097','2022-09-21 11:08:48.279607','INTERCULTURAL SOL Y LUNA','1398783','FUNDO HUINCHO','Urubamba','PR','081301'),(615,'2022-09-21 11:08:33.404666','2022-09-21 11:08:48.340170','SAGRADO CORAZON DE JESUS','1398791','AVENIDA 9 DE NOVIEMBRE','Urubamba','PR','081301'),(616,'2022-09-21 11:08:33.463946','2022-09-21 11:08:48.398395','50575 LA SALLE','1398916','CHARCAHUAYLLA','Urubamba','PU','081301'),(617,'2022-09-21 11:08:33.521751','2022-09-21 11:08:48.457139','DIVINO MAESTRO','1398932','JIRON BOLIVAR 625','Urubamba','PR','081301'),(618,'2022-09-21 11:08:33.579804','2022-09-21 11:08:48.514649','TUPAC AMARU','1463991','HUACAHUASI','Urubamba','PU','081301'),(619,'2022-09-21 11:08:33.743635','2022-09-21 11:08:48.574361','MISION AMERICA CRISTIANA BILINGUE','1531250','CALLE PROLONGACION COMERCIO 100','Urubamba','PR','081301'),(620,'2022-09-21 11:08:33.809068','2022-09-21 11:08:48.631949','APU TORRECHAYOC','1536655','JIRON BOLOGNESI 633','Urubamba','PR','081301'),(621,'2022-09-21 11:08:33.872603','2022-09-21 11:08:48.689735','UNION DE NUEVOS INTELIGENTES','1632868','AVENIDA LA CONVENCION 173','Urubamba','PR','081301'),(622,'2022-09-21 11:08:33.946662','2022-09-21 11:08:48.749117','LOS ANDES SCHOOL','1636687','COYARUMIYOC SECTOR II','Urubamba','PR','081301'),(623,'2022-09-21 11:08:34.005905','2022-09-21 11:08:48.806537','COTOHUINCHO','1773035','CALLE JUAN PEREZ MARIN S/N','Urubamba','PU','081301'),(624,'2022-09-21 12:23:03.862530','2022-09-21 12:23:10.013989','CEBA - 50052','0235531','JIRON LIMA 868','Acomayo','PU','080201'),(625,'2022-09-21 12:23:04.008324','2022-09-21 12:23:10.127599','TOMASA TTITO CONDEMAYTA','0236430','AVENIDA ESCALANTE S/N','Acomayo','PU','080201'),(626,'2022-09-21 12:23:04.157651','2022-09-21 12:23:10.326494','VIRGEN DEL CARMEN','1388107','JIRON RAMON CASTILLA S/N','Acomayo','PR','080201'),(627,'2022-09-21 12:23:04.326182','2022-09-21 12:23:10.484244','JORGE EFRAIN VILLAFUERTE MUJICA','1525047','PITUMARCA','Acomayo','PU','080201'),(628,'2022-09-21 12:23:04.476380','2022-09-21 12:23:10.677610','HUASCAR','1532530','HUASCAR','Acomayo','PU','080201'),(629,'2022-09-21 12:23:04.570501','2022-09-21 12:23:10.844006','DANIEL ALCIDES CARRION','1534965','AVENIDA ESCALANTE S/N','Acomayo','PU','080201'),(630,'2022-09-21 15:22:48.693698','2022-09-28 08:34:20.293858','CEBA - LA SALLE - KITENI','1394246','CALLE PRINCIPAL S/N','Echarate','PR','080902'),(631,'2022-09-21 15:22:48.753684','2022-09-28 08:34:20.360781','JOSE MARIA ARGUEDAS','0236398','AVENIDA JOSE MARIA ARGUEDAS S/N','Echarate','PU','080902'),(632,'2022-09-21 15:22:48.819578','2022-09-28 08:34:20.411826','JOSE CARLOS .MARIATEGUI','0495226','PALMA REAL S/N','Echarate','PU','080902'),(633,'2022-09-21 15:22:48.872898','2022-09-28 08:34:20.496721','50898 MIGUEL GRAU','0621540','KITENI','Echarate','PU','080902'),(634,'2022-09-21 15:22:48.930996','2022-09-28 08:34:20.553369','TUPAC AMARU','0672279','CIRIALO S/N','Echarate','PU','080902'),(635,'2022-09-21 15:22:48.989598','2022-09-28 08:34:20.674714','SAN ANTONIO DE PADUA','0699660','SAJIRUYOC','Echarate','PU','080902'),(636,'2022-09-21 15:22:49.048087','2022-09-28 08:34:20.736539','SANTO DOMINGO','0750364','PANGOA','Echarate','PU','080902'),(637,'2022-09-21 15:22:49.107078','2022-09-28 08:34:20.800524','MEDIO URUBAMBA','0750372','IVOCHOTE S/N','Echarate','PU','080902'),(638,'2022-09-21 15:22:49.164857','2022-09-28 08:34:20.858879','JAVIER PEREZ DE CUELLAR','0932822','KEPASHIATO','Echarate','PU','080902'),(639,'2022-09-21 15:22:49.227523','2022-09-28 08:34:20.916801','ALTO URUBAMBA','0933705','KITENI S/N','Echarate','PR','080902'),(640,'2022-09-21 15:22:49.282574','2022-09-28 08:34:21.043007','CHAUPIMAYO C','1062215','CHAUPIMAYO C','Echarate','PR','080902'),(641,'2022-09-21 15:22:49.340511','2022-09-28 08:34:21.100212','MANUEL GONZALES PRADA','0621516','ICHIQUIATO ALTO','Echarate','PU','080902'),(642,'2022-09-21 15:22:49.399126','2022-09-28 08:34:21.167583','NUEVA CALIFORNIA','0750356','NUEVA CALIFORNIA','Echarate','PU','080902'),(643,'2022-09-21 15:22:49.457890','2022-09-28 08:34:21.217098','SAN ANTONIO','0750398','SAN ANTONIO','Echarate','PU','080902'),(644,'2022-09-21 15:22:49.515660','2022-09-28 08:34:21.309615','ILLAPANI','0783092','ILLAPANI','Echarate','PR','080902'),(645,'2022-09-21 15:22:49.570520','2022-09-28 08:34:21.359066','VIRGEN DEL CARMEN','0932855','CHACO ROSARIO','Echarate','PR','080902'),(646,'2022-09-21 15:22:49.660915','2022-09-28 08:34:21.406020','SANTA ROSA DE LIMA','0932889','ALBASUYOC','Echarate','PR','080902'),(647,'2022-09-21 15:22:49.957402','2022-09-28 08:34:21.459924','MARTIN PIO CONCHA','0932913','DUCHISELA','Echarate','PR','080902'),(648,'2022-09-21 15:22:50.014642','2022-09-28 08:34:21.510671','SANTOATO','0932947','SANTOATO','Echarate','PR','080902'),(649,'2022-09-21 15:22:50.098256','2022-09-28 08:34:21.564747','DOS DE MAYO','0932970','KUVIRIARI','Echarate','PR','080902'),(650,'2022-09-21 15:22:50.157402','2022-09-28 08:34:21.627946','501108 MEDIO URUBAMBA','1394519','IVOCHOTE','Echarate','PU','080902'),(651,'2022-09-21 15:22:50.248893','2022-09-28 08:34:21.687387','YOMENTONI','1394527','YOMENTONI M I','Echarate','PR','080902'),(652,'2022-09-21 15:22:50.307862','2022-09-28 08:34:21.744452','CRFA MOSOQ ILLARY','1394550','CHAHUARES S/N','Echarate','PU','080902'),(653,'2022-09-21 15:22:50.383387','2022-09-28 08:34:21.802072','JOSE PIO AZA','0713826','KORIBENI','Echarate','PU','080902'),(654,'2022-09-21 15:22:50.459172','2022-09-28 08:34:21.861508','CRFA RIQCHARIY WAYNA','1323955','PROGRESO S/N','Echarate','PU','080902'),(655,'2022-09-21 15:22:50.507300','2022-09-28 08:34:21.919070','CRFA OTYARIRA ONEAKOTANA ENKANIRIRA-YOMENTONI','1423888','YOMENTONI','Echarate','PU','080902'),(656,'2022-09-21 15:22:50.564764','2022-09-28 08:34:22.036427','CRFA AGOIGANAERA MAGANIRO','1459734','SHIMAA','Echarate','PU','080902'),(657,'2022-09-21 15:22:50.615768','2022-09-28 08:34:22.094827','CRFA PONGO DE MAYNIQUE DE PACHIRI','1629369','PACHIRI SECTOR PACHIRI','Echarate','PU','080902'),(658,'2022-09-21 15:22:50.665226','2022-09-28 08:34:22.153145','50902','1722263','SANIRIATO','Echarate','PU','080902'),(659,'2022-09-21 15:22:50.715502','2022-09-28 08:34:22.211372','501109','1730241','KUVIRIARI S/N','Echarate','PU','080902'),(660,'2022-09-21 15:22:50.765629','2022-09-28 08:34:22.269690','CRFA MOSOQ ILLARY WAYNA','1747989','CHAHUARES SECTOR CHAHUARES','Echarate','PU','080902'),(661,'2022-09-21 15:22:50.816917','2022-09-28 08:34:22.329558','501212','1765106','PUGUIENTIMARI','Echarate','PU','080902'),(662,'2022-09-27 11:14:43.814232','2022-09-27 11:14:50.670615','CEBA - NUESTRA SEÑORA DE LORETO','0301556','CARRETERA NAUTA - IQUITOS KM. 1.5','Nauta','PU','160301'),(663,'2022-09-27 11:14:43.888662','2022-09-27 11:14:50.734953','CEBA - 61023 ROSA LICENIA VELA PINEDO DE COSTA','0602714','CALLE TACNA 750','Nauta','PU','160301'),(664,'2022-09-27 11:14:43.946848','2022-09-27 11:14:50.797193','NUESTRA SEÑORA DE LORETO','0302851','PASAJE AGUSTINOS 385','Nauta','PU','160301'),(665,'2022-09-27 11:14:44.005283','2022-09-27 11:14:50.858695','60526 LA PAZ DEL MARAÑON','0528307','RIO MARAÑON','Nauta','PU','160301'),(666,'2022-09-27 11:14:44.063183','2022-09-27 11:14:50.938069','60523','0528406','RIO MARAÑON','Nauta','PU','160301'),(667,'2022-09-27 11:14:44.121736','2022-09-27 11:14:50.999785','60872 ROSA MARIA SILVA DE NOGUEIRA','0566638','RIO MARAÑON','Nauta','PU','160301'),(668,'2022-09-27 11:14:44.179991','2022-09-27 11:14:51.057905','60544 ELIAS AGUIRRE ROMERO','0566661','RIO AMAZONAS','Nauta','PU','160301'),(669,'2022-09-27 11:14:44.264137','2022-09-27 11:14:51.116346','60695 NUESTRA SEÑORA DE AMAZONAS','0803940','RIO MARAÑON S/N','Nauta','PU','160301'),(670,'2022-09-27 11:14:44.322134','2022-09-27 11:14:51.175244','60520 MIGUEL GRAU SEMINARIO','0839670','CARRETERA NAUTA - IQUITOS KM 1.2','Nauta','PU','160301'),(671,'2022-09-27 11:14:44.492022','2022-09-27 11:14:51.233782','60524 DAVID DAVILA VASQUEZ','0839704','RIO AMAZONAS','Nauta','PU','160301'),(672,'2022-09-27 11:14:44.551829','2022-09-27 11:14:51.283163','60525 SGTO. JUAN MONTALVAN APAGUEÑO','0839738','RIO AMAZONAS','Nauta','PU','160301'),(673,'2022-09-27 11:14:44.610065','2022-09-27 11:14:51.333218','60535 JOSE SILVERIO NAVARRO GUERRA','0839761','SANTA FE','Nauta','PU','160301'),(674,'2022-09-27 11:14:44.669384','2022-09-27 11:14:51.432951','ANEXO-60540','0839795','RIO TIGRE','Nauta','PU','160301'),(675,'2022-09-27 11:14:44.788928','2022-09-27 11:14:51.482816','60547','0839829','RIO MARAÑON ZONA II','Nauta','PU','160301'),(676,'2022-09-27 11:14:44.852471','2022-09-27 11:14:51.533132','60835 RAFAEL SEGUNDO VASQUEZ GARCIA','0839852','RIO MARAÑON','Nauta','PU','160301'),(677,'2022-09-27 11:14:44.910992','2022-09-27 11:14:51.641912','ANEXO-60539','1149947','LAGO SAN PABLO DE TIPISHCA','Nauta','PU','160301'),(678,'2022-09-27 11:14:45.027605','2022-09-27 11:14:51.708717','60775 HECTOR ISUIZA HIDALGO','1149988','RIO AMAZONAS','Nauta','PU','160301'),(679,'2022-09-27 11:14:45.111161','2022-09-27 11:14:51.766797','60947','1150028','RIO MARAÑON QUEBRADA YANAYACU','Nauta','PU','160301'),(680,'2022-09-27 11:14:45.169244','2022-09-27 11:14:51.825733','61022 JORGE BARDALES RUIZ','1150069','CALLE MANUEL PACAYA 550','Nauta','PU','160301'),(681,'2022-09-27 11:14:45.227975','2022-09-27 11:14:51.883683','61023 ROSA LICENIA VELA PINEDO DE COSTA','1150101','CALLE TACNA 750','Nauta','PU','160301'),(682,'2022-09-27 11:14:45.286558','2022-09-27 11:14:52.008971','60564','1152750','RIO MARAÑON','Nauta','PU','160301'),(683,'2022-09-27 11:14:45.344520','2022-09-27 11:14:52.067307','6010248 JOSE FRANCISCO DA CRUZ','1152792','QUEBRADA CHIRIYACU','Nauta','PU','160301'),(684,'2022-09-27 11:14:45.403143','2022-09-27 11:14:52.125595','60536','1537224','RIO MARAÑON','Nauta','PU','160301'),(685,'2022-09-27 11:14:45.461424','2022-09-27 11:14:52.192461','60522 FELIPE RAMON DOCUMET SILVA','1537240','TARAPACA CON DIEGO RODRIGUEZ','Nauta','PU','160301'),(686,'2022-09-27 11:14:45.520110','2022-09-27 11:14:52.241766','60570 PROF. MIGUEL AREVALO QUIROZ','1537372','LAGO SAN PABLO DE TIPISHCA','Nauta','PU','160301'),(687,'2022-09-27 11:14:45.578350','2022-09-27 11:14:52.291990','60558','1537380','RIO TIGRE','Nauta','PU','160301'),(688,'2022-09-27 11:14:45.636914','2022-09-27 11:14:52.367439','60567','1340652','LAGO TIPISHCA RIO MARAÑON','Nauta','PU','160301'),(689,'2022-09-27 11:14:45.703840','2022-09-27 11:14:52.426106','60555','1405828','RIO MARAÑON','Nauta','PU','160301'),(690,'2022-09-27 11:14:45.838412','2022-09-27 11:14:52.524740','601594','1548189','JIRON TRUJILLO S/N','Nauta','PU','160301'),(691,'2022-09-27 11:14:45.897583','2022-09-27 11:14:52.588022','60548','1625714','RIO MARAÑON','Nauta','PU','160301'),(692,'2022-09-27 11:14:45.957632','2022-09-27 11:14:52.642828','60543','1671031','QUEBRADA NAHUAPA - RIO TIGRE','Nauta','PU','160301'),(693,'2022-09-27 11:14:46.013896','2022-09-27 11:14:52.725236','601748','1745298','BUEN RETIRO - RIO MARAÑON','Nauta','PU','160301'),(694,'2022-09-27 11:14:46.080239','2022-09-27 11:14:52.809801','60542','1751262','RIO AMAZONAS','Nauta','PU','160301'),(695,'2022-09-27 11:14:46.138702','2022-09-27 11:14:52.868542','6010321 VIRGEN ROSA MISTICA','1751270','CALLE PROLONGACION 28 DE JULIO','Nauta','PU','160301'),(696,'2022-09-27 11:14:46.197061','2022-09-27 11:14:52.927412','60557','1752567','RIO MARAÑON','Nauta','PU','160301'),(697,'2022-09-27 11:14:46.364512','2022-09-27 11:14:52.985023','AGUILA CONDOR','1773159','CALLE VICTOR ALVAN CABALLERO','Nauta','PU','160301'),(698,'2022-09-27 11:14:46.481721','2022-09-27 11:14:53.051978','61023 ROSA LICENIA VELA PINEDO DE COSTA','1155399','CALLE TACNA 750','Nauta','PU','160301'),(699,'2022-09-29 11:04:06.446571','2022-09-29 11:04:20.890275','CEBA - JOSE CARLOS MARIATEGUI','1361047','AVENIDA JOSE CARLOS MARIATEGUI S/N','Huayopata','PU','080903'),(700,'2022-09-29 11:04:06.893646','2022-09-29 11:04:20.948601','JOSE CARLOS MARIATEGUI','0236380','AVENIDA JOSE CARLOS MARIATEGUI S/N','Huayopata','PU','080903'),(701,'2022-09-29 11:04:07.118334','2022-09-29 11:04:21.006989','LEONCIO PRADO','0621367','HUAYOPATA','Huayopata','PU','080903'),(702,'2022-09-29 11:04:07.235734','2022-09-29 11:04:21.095355','CORONEL FRANCISCO BOLOGNESI','0699678','CARRETERA AMAYBAMBA S/N','Huayopata','PU','080903'),(703,'2022-09-29 11:04:07.360439','2022-09-29 11:04:21.168913','JOSE CARLOS MARIATEGUI','0934257','AVENIDA JOSE CARLOS MARIATEGUI S/N','Huayopata','PU','080903');
/*!40000 ALTER TABLE `app_colegio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_comentarios_clase`
--

DROP TABLE IF EXISTS `app_comentarios_clase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_comentarios_clase` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `texto_comentario` longtext NOT NULL,
  `archivo_adjunto` varchar(100) DEFAULT NULL,
  `id_docente_id` bigint(20) DEFAULT NULL,
  `id_estudiante_id` bigint(20) DEFAULT NULL,
  `id_horario_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `app_comentarios_clase_id_docente_id_bd3b82b7_fk_app_docente_id` (`id_docente_id`),
  KEY `app_comentarios_clas_id_estudiante_id_258f4e3e_fk_app_estud` (`id_estudiante_id`),
  KEY `app_comentarios_clase_id_horario_id_830d5f53_fk_app_horario_id` (`id_horario_id`),
  CONSTRAINT `app_comentarios_clas_id_estudiante_id_258f4e3e_fk_app_estud` FOREIGN KEY (`id_estudiante_id`) REFERENCES `app_estudiante` (`id`),
  CONSTRAINT `app_comentarios_clase_id_docente_id_bd3b82b7_fk_app_docente_id` FOREIGN KEY (`id_docente_id`) REFERENCES `app_docente` (`id`),
  CONSTRAINT `app_comentarios_clase_id_horario_id_830d5f53_fk_app_horario_id` FOREIGN KEY (`id_horario_id`) REFERENCES `app_horario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_comentarios_clase`
--

LOCK TABLES `app_comentarios_clase` WRITE;
/*!40000 ALTER TABLE `app_comentarios_clase` DISABLE KEYS */;
INSERT INTO `app_comentarios_clase` VALUES (1,'2022-06-15 18:15:28.434849','2022-06-15 18:15:28.434870','<p>Hoalasdasdasd</p>','',1,NULL,1),(2,'2022-06-15 18:19:08.754735','2022-06-15 18:19:08.754764','<p>Hola</p>','',NULL,1,1);
/*!40000 ALTER TABLE `app_comentarios_clase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_compromiso_pago`
--

DROP TABLE IF EXISTS `app_compromiso_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_compromiso_pago` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `fecha_vencimiento` date DEFAULT NULL,
  `id_pago_id` bigint(20) NOT NULL,
  `id_preinscripcion_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_preinscripcion_id` (`id_preinscripcion_id`),
  KEY `app_compromiso_pago_id_pago_id_231018d9_fk_app_pago_id` (`id_pago_id`),
  CONSTRAINT `app_compromiso_pago_id_pago_id_231018d9_fk_app_pago_id` FOREIGN KEY (`id_pago_id`) REFERENCES `app_pago` (`id`),
  CONSTRAINT `app_compromiso_pago_id_preinscripcion_id_356b3acb_fk_app_prein` FOREIGN KEY (`id_preinscripcion_id`) REFERENCES `app_preinscripcion` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_compromiso_pago`
--

LOCK TABLES `app_compromiso_pago` WRITE;
/*!40000 ALTER TABLE `app_compromiso_pago` DISABLE KEYS */;
INSERT INTO `app_compromiso_pago` VALUES (1,'2022-06-15 16:51:29.158271','2022-06-15 16:51:29.158307',NULL,4,1),(2,'2022-08-30 11:49:18.941734','2022-08-30 11:49:18.941784',NULL,4,4),(3,'2022-08-30 11:53:41.572005','2022-08-30 11:53:41.572030',NULL,4,5),(4,'2022-08-30 12:02:14.546471','2022-08-30 12:02:14.546517',NULL,2,6),(5,'2022-08-30 12:06:44.995753','2022-08-30 12:06:44.995799',NULL,2,7),(6,'2022-08-30 12:21:02.378517','2022-08-30 12:21:02.378553',NULL,2,8),(7,'2022-08-30 12:23:44.668417','2022-08-30 12:23:44.668501',NULL,2,9),(8,'2022-08-30 12:28:06.209528','2022-08-30 12:28:06.209559',NULL,2,10),(10,'2022-09-05 21:32:50.468005','2022-09-05 21:32:50.468055',NULL,12,12),(11,'2022-09-05 21:42:10.583758','2022-09-05 21:42:10.583808',NULL,10,13),(12,'2022-09-08 15:13:37.210820','2022-09-08 15:13:37.210864',NULL,2,14),(13,'2022-09-08 15:37:36.151071','2022-09-08 15:37:36.151102',NULL,8,15),(14,'2022-09-09 01:02:00.603736','2022-09-09 01:02:00.603771',NULL,4,18),(15,'2022-09-09 01:07:17.011266','2022-09-09 01:07:17.011288',NULL,3,19),(16,'2022-09-09 01:15:30.499817','2022-09-09 01:15:30.499842',NULL,4,20),(17,'2022-09-09 09:27:35.414062','2022-09-09 09:27:35.414108',NULL,4,24),(18,'2022-09-09 09:28:12.827212','2022-09-09 09:28:12.827250',NULL,2,25),(19,'2022-09-09 09:57:05.811446','2022-09-09 09:57:05.811474',NULL,4,27),(20,'2022-09-09 10:23:01.236337','2022-09-09 10:23:01.236383',NULL,4,28),(21,'2022-09-09 10:24:03.177295','2022-09-09 10:24:03.177335',NULL,4,29),(22,'2022-09-12 12:38:39.839218','2022-09-12 12:38:39.839264',NULL,26,31),(23,'2022-09-12 15:49:33.437565','2022-09-12 15:49:33.437599',NULL,28,32),(24,'2022-09-12 16:20:36.268117','2022-09-12 16:20:36.268168',NULL,24,34),(25,'2022-09-12 17:21:19.049319','2022-09-12 17:21:19.049366',NULL,30,35),(26,'2022-09-12 17:30:09.724642','2022-09-12 17:30:09.724666',NULL,29,36),(27,'2022-09-12 17:40:16.731826','2022-09-12 17:40:16.731871',NULL,4,37),(28,'2022-09-12 18:00:47.034586','2022-09-12 18:00:47.034629',NULL,30,38),(29,'2022-09-12 19:00:31.498703','2022-09-12 19:00:31.498747',NULL,34,40),(30,'2022-09-12 19:01:30.675331','2022-09-12 19:01:30.675378',NULL,36,44),(31,'2022-09-12 19:03:16.126262','2022-09-12 19:03:16.126285',NULL,52,46),(32,'2022-09-12 19:38:12.565682','2022-09-12 19:38:12.565714',NULL,46,39),(33,'2022-09-13 08:57:25.828745','2022-09-13 08:57:25.828787',NULL,32,47),(34,'2022-09-20 16:21:35.687056','2022-09-20 16:21:35.687103',NULL,113,51),(35,'2022-09-20 16:26:21.425227','2022-09-20 16:26:21.425274',NULL,114,52),(43,'2022-09-20 19:33:24.576277','2022-09-20 19:33:24.576383',NULL,114,60),(44,'2022-09-21 09:10:14.925937','2022-09-21 09:10:14.925987',NULL,113,66),(46,'2022-09-21 11:09:08.365037','2022-09-21 11:09:08.365088',NULL,114,68),(47,'2022-09-21 11:34:14.739112','2022-09-21 11:34:14.739159',NULL,114,69),(48,'2022-09-21 12:25:16.549350','2022-09-21 12:25:16.549399',NULL,113,70),(49,'2022-09-21 15:23:20.330135','2022-09-21 15:23:20.330182',NULL,114,71),(50,'2022-09-27 11:30:42.560432','2022-09-27 11:30:42.560475',NULL,114,72),(51,'2022-09-28 08:35:03.686473','2022-09-28 08:35:03.686524',NULL,121,73),(52,'2022-09-28 08:51:53.206260','2022-09-28 08:51:53.206308',NULL,120,75),(53,'2022-09-29 11:04:36.745231','2022-09-29 11:04:36.745280',NULL,121,76),(54,'2022-10-09 23:35:37.610375','2022-10-09 23:35:37.610398',NULL,121,77);
/*!40000 ALTER TABLE `app_compromiso_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_customuser`
--

DROP TABLE IF EXISTS `app_customuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_customuser` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `user_type` varchar(20) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `sur_name` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_customuser`
--

LOCK TABLES `app_customuser` WRITE;
/*!40000 ALTER TABLE `app_customuser` DISABLE KEYS */;
INSERT INTO `app_customuser` VALUES (1,'pbkdf2_sha256$260000$zZH6vs5Kij46j7IeTS3wfB$efKPNrQ/qKuFiZwtKDgZuXsdLKw0wcbGObEZuQ1Zc20=','2022-06-15 11:44:52.000000',1,'pruebajunuy01',1,1,'2022-06-15 11:44:27.000000','1','ADMINISTRADOR','ADMIN','ADMIN','admin@admin.com'),(2,'pbkdf2_sha256$260000$CyTp8pi4oE5caf1p67hnbk$xen8R3RHLdUsWDmV073z0w1isCl3h61xKqwcegQ0ygg=',NULL,0,'72712946',0,1,'2022-06-15 12:04:50.341389','2','FERNANDO RAFAEL','CALLA','YARIHUAMAN','03docentecepre@uniq.edu.pe'),(3,'pbkdf2_sha256$260000$tEtUAorZ6aeHx2BsCNE8o7$JUjQfOGe8LPe2AZGGoZVi5DPrLsHLwH0uejJ3bcXmzk=',NULL,0,'74565490',0,1,'2022-06-15 17:00:45.000000','3','RENAN FERDINAND','LEVA','SALAS','02alumnocepre@uniq.edu.pe'),(4,'pbkdf2_sha256$260000$F3VKKlxX8TTvCbklb8IZR8$h/QQFrA+S5xQj1dgLQg5WZhZ0DxbivDSV0a+fAbHKpA=','2022-10-07 15:47:10.603717',1,'admin',1,1,'2022-06-30 18:18:11.524900','1','','','','admin@admin.net'),(5,'pbkdf2_sha256$260000$mHKBz5C9yZtlPMCS0QrBUU$Q/CNs9xsSGz+DXMnUgKO8gPGLNP6W8Q9wHvMUHtzRl4=',NULL,0,'73468901',0,1,'2022-09-05 21:11:29.615284','2','KATHERINE','REMAICUNA','CALLE','01docentecepre@uniq.edu.pe'),(6,'pbkdf2_sha256$260000$DzX9vKNrQO6wz71OeeuZwK$lCPSsz6vgGtQ9Oug9gJuHeNOfKHM1s/yEbLQPUSSygw=',NULL,0,'71098893',0,1,'2022-09-05 21:12:04.921449','2','YAZMIN DEL ROSARIO','RIMAICUNA','DOMINGUEZ','02docentecepre@uniq.edu.pe'),(7,'pbkdf2_sha256$260000$aeEoUQeV3f6g9g4YnGKBju$OzhJXHvBGGbEfHMLqR0vBQsDsjmZ0sao5Lx0D8pLODU=',NULL,0,'70214206',0,1,'2022-09-05 23:00:27.000000','3','CARMEN MARIA ELENA','RELAIZA','SALCEDO','01alumnocepre@uniq.edu.pe'),(8,'pbkdf2_sha256$260000$03BTgvP8UXrgajqjMcnuLm$4oRJGrCwmSpocj2t3ZNDG+MecVofxgpRi/qABk/IEXY=',NULL,0,'47667807',0,1,'2022-09-05 23:07:46.000000','3','EDWIN','RAMON','HUAMAN','03alumnocepre@uniq.edu.pe'),(9,'pbkdf2_sha256$260000$PtB3Uz4bVW5nvnYdTuQNzQ$BkJXaJGc02G0iNm8SQS8N2yq36zOv/9FIj306Ba29To=',NULL,1,'admin02',1,1,'2022-09-08 11:32:35.274966','1','','','','jessi.bustamante@gmail.com'),(10,'pbkdf2_sha256$260000$toKCTN0mmKyJVLahcQ7vHU$E4iZ9GWOWbf7v6IOZB3vdquQpDWtlnra9dkYvD4vhbo=',NULL,0,'25303702',0,1,'2022-09-09 08:38:42.755129','2','ELIAS JESI','BUSTAMANTE','JARA','00docentecepre@uniq.edu.pe'),(11,'pbkdf2_sha256$260000$vdVe8enLBYgCvKKtd8is5J$rJrGX3w5bAQPETot60RtvQ1B8xshOcWqfj+EXYI8uaY=',NULL,0,'23975001',0,1,'2022-09-12 12:42:24.910563','2','ROGER','NUÑEZ','VALDEZ','proyectotic@uniq.edu.pe'),(12,'pbkdf2_sha256$260000$ZAlEdQo9ySukxSAnKNr0xz$+TtRVLSHHisnTHmox8hFNe1kbIj2AVq2q3b1d/u+Yws=',NULL,0,'40525871',0,1,'2022-09-12 19:32:38.621615','3','JOSE LUIS','SEQUEIROS','MEDINA','40525871C622@uniq.edu.pe'),(13,'pbkdf2_sha256$260000$Mt62BuGhlC3BXISKZ1cCjX$OanoOGYVpkbotFP/3lQYoecn92hwBWFQPUpm/6R7WR4=',NULL,0,'42334595',0,1,'2022-09-19 09:44:43.007952','3','CLAUDIA DIONE','AIVAR','DEL PINO','42334595C122@uniq.edu.pe'),(14,'pbkdf2_sha256$260000$Tj6lOuQsrjzBUQ4IfXVip8$vhd/ifDvcXCZ1EbFv/N0kUn2stGI2Pk1CNRC+qJWPW8=',NULL,0,'76265366',0,1,'2022-09-28 09:03:01.460788','3','ALEXA MARIA FERNANDA','VILCHEZ','MEDINA','76265366C822@uniq.edu.pe'),(15,'pbkdf2_sha256$260000$jHyUhg6F802DCVpaO7DI17$CwIKzBrdZ9MAEAmAnKvc1JdIDLGC3l8aGa2Z7jynvAA=',NULL,0,'72712949',0,1,'2022-10-07 19:33:20.416315','2','ADDELI ALEJANDRA','TRUJILLO','SANCHEZ','team@gmail.com'),(16,'pbkdf2_sha256$260000$rGgv8TCYH8LqhsLYLbiWQP$XXjGiwvtMu04TnWiBH01AokZi0gBMZdk/LuIBKdV9uc=',NULL,0,'72712948',0,1,'2022-10-07 19:52:45.010834','2','JAIV','SANCHEZ','TACO','teacher@gmail.com'),(17,'pbkdf2_sha256$260000$vigOHwDealIK9PWzIJ8BBK$3lQOCzQ9ZtCIVn0wZqsF9z6lHDbb94KemA2p9YASmsY=',NULL,0,'72712947',0,1,'2022-10-07 19:54:10.357525','2','FRANCO JHAMITH','HURTADO','ARCOS','ocbc123@gmail.com'),(18,'pbkdf2_sha256$260000$NMAk4vOagA8yJhNtTgQUoO$ui9R7cvWsh944M65hWvWH5+i1Xxy1nm7iJCjbM4CRA0=',NULL,0,'72712950',0,1,'2022-10-07 19:55:43.641625','2','LUANA FRANCHESCA','SALAZAR','INFANTAS','teacher975@gmail.com'),(19,'pbkdf2_sha256$260000$mumiXgDawSky6oVO1nmWK5$b5sIqGr6q/E1pYAmo7foIH37/3TDrCkCeA9tsHqg6qg=',NULL,0,'77244692',0,1,'2022-10-09 22:29:19.348239','2','LUISA FERNANDA','DIAZ','MAGALLANES','teache9997r@gmail.com'),(20,'pbkdf2_sha256$260000$NDGfJkdrrILtThBjiCKmcN$JMxIHPTcQV7rhcNs6NaLmaZXdLbnIwep07jicgZZ5OQ=',NULL,0,'72713456',0,1,'2022-10-09 22:44:49.024850','2','LEONARDO EDU','DIAZ','LOAYZA','ing_info123@gmail.com'),(21,'pbkdf2_sha256$260000$mGGhDxZYoaZTv9MbNk0g9b$r1W086FQWny+XycM53igR8UtwAofoobVLyj63mfZ84U=',NULL,0,'40273254',0,1,'2022-10-10 00:06:48.718132','2','ADELMA BIENVENIDA','CRUZ','CORNEJO','ing123_info@gmail.com');
/*!40000 ALTER TABLE `app_customuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_customuser_groups`
--

DROP TABLE IF EXISTS `app_customuser_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_customuser_groups` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `customuser_id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `app_customuser_groups_customuser_id_group_id_a5a0ca22_uniq` (`customuser_id`,`group_id`),
  KEY `app_customuser_groups_group_id_47e49ebd_fk_auth_group_id` (`group_id`),
  CONSTRAINT `app_customuser_group_customuser_id_164d073f_fk_app_custo` FOREIGN KEY (`customuser_id`) REFERENCES `app_customuser` (`id`),
  CONSTRAINT `app_customuser_groups_group_id_47e49ebd_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_customuser_groups`
--

LOCK TABLES `app_customuser_groups` WRITE;
/*!40000 ALTER TABLE `app_customuser_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `app_customuser_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_customuser_user_permissions`
--

DROP TABLE IF EXISTS `app_customuser_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_customuser_user_permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `customuser_id` bigint(20) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `app_customuser_user_perm_customuser_id_permission_22e31019_uniq` (`customuser_id`,`permission_id`),
  KEY `app_customuser_user__permission_id_c5920c75_fk_auth_perm` (`permission_id`),
  CONSTRAINT `app_customuser_user__customuser_id_4bcbaafb_fk_app_custo` FOREIGN KEY (`customuser_id`) REFERENCES `app_customuser` (`id`),
  CONSTRAINT `app_customuser_user__permission_id_c5920c75_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_customuser_user_permissions`
--

LOCK TABLES `app_customuser_user_permissions` WRITE;
/*!40000 ALTER TABLE `app_customuser_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `app_customuser_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_detalle_compromiso_de_pago`
--

DROP TABLE IF EXISTS `app_detalle_compromiso_de_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_detalle_compromiso_de_pago` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `codigo_compromiso_pago` varchar(50) NOT NULL,
  `numero_cuota` int(10) unsigned NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `esta_pagado` tinyint(1) NOT NULL,
  `monto_mora` decimal(10,2) DEFAULT NULL,
  `fecha_pagado` date DEFAULT NULL,
  `modalidad_pago` varchar(40) DEFAULT NULL,
  `id_compromiso_pago_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `app_detalle_compromiso_d_id_compromiso_pago_id_nu_a301bf41_uniq` (`id_compromiso_pago_id`,`numero_cuota`),
  CONSTRAINT `app_detalle_compromi_id_compromiso_pago_i_88df1716_fk_app_compr` FOREIGN KEY (`id_compromiso_pago_id`) REFERENCES `app_compromiso_pago` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_detalle_compromiso_de_pago`
--

LOCK TABLES `app_detalle_compromiso_de_pago` WRITE;
/*!40000 ALTER TABLE `app_detalle_compromiso_de_pago` DISABLE KEYS */;
INSERT INTO `app_detalle_compromiso_de_pago` VALUES (1,'2022-06-15 16:51:29.330306','2022-06-15 16:55:24.440539','UCEPR74565490C1-PUC1CU1',1,400.00,'2022-06-14','2022-06-14',1,0.00,NULL,'',1),(2,'2022-06-15 16:51:29.593753','2022-08-29 16:56:37.606937','UCEPR74565490C1-PUC1CU2',2,200.00,'2022-06-14','2022-06-14',1,0.00,NULL,'',1),(3,'2022-08-30 12:23:44.902814','2022-08-30 12:23:44.902834','829',1,500.00,'2022-06-15','2022-06-15',0,0.00,NULL,'',7),(4,'2022-08-30 12:28:06.529685','2022-08-30 12:28:06.529713','830',1,500.00,'2022-06-15','2022-06-15',0,0.00,NULL,'',8),(6,'2022-09-05 21:32:56.026856','2022-09-05 22:51:53.555100','841',1,400.00,'2022-06-15','2022-06-15',1,0.00,NULL,'',10),(7,'2022-09-05 21:32:56.194407','2022-09-05 21:32:56.194429','842',2,200.00,'2022-06-15','2022-06-15',0,0.00,NULL,'',10),(8,'2022-09-05 21:42:10.840279','2022-09-05 22:51:57.527179','843',1,500.00,'2022-06-15','2022-06-15',1,0.00,NULL,'',11),(9,'2022-09-08 15:13:37.748865','2022-09-08 15:13:37.748896','844',1,500.00,'2022-06-15','2022-06-15',0,0.00,NULL,'',12),(10,'2022-09-08 15:37:36.331855','2022-09-08 15:37:36.331904','845',1,300.00,'2022-06-15','2022-06-15',0,0.00,NULL,'',13),(11,'2022-09-08 15:37:36.443347','2022-09-08 15:37:36.443370','846',2,300.00,'2022-06-15','2022-06-15',0,0.00,NULL,'',13),(12,'2022-09-09 01:02:00.664692','2022-09-09 01:02:00.664721','UCEPR66334124C1-PUC1CU1',1,400.00,'2022-06-14','2022-06-14',0,0.00,NULL,'',14),(13,'2022-09-09 01:02:00.877675','2022-09-09 01:02:00.877719','UCEPR66334124C1-PUC1CU2',2,200.00,'2022-06-14','2022-06-14',0,0.00,NULL,'',14),(14,'2022-09-09 01:07:17.105429','2022-09-09 01:07:17.105464','UCEPR66234341C1-C1CU1PR',1,350.00,'2022-06-14','2022-06-14',0,0.00,NULL,'',15),(15,'2022-09-09 01:07:17.220843','2022-09-09 01:07:17.220866','UCEPR66234341C1-C1CU2PR',2,350.00,'2022-06-14','2022-06-14',0,0.00,NULL,'',15),(16,'2022-09-09 01:15:30.550123','2022-09-09 01:15:30.550144','UCEPR41083122C1-PUC1CU1',1,400.00,'2022-06-14','2022-06-14',0,0.00,NULL,'',16),(17,'2022-09-09 01:15:30.800755','2022-09-09 01:15:30.800785','UCEPR41083122C1-PUC1CU2',2,200.00,'2022-06-14','2022-06-14',0,0.00,NULL,'',16),(18,'2022-09-09 09:27:35.469644','2022-09-09 10:44:49.073016','UCEPR41443959C1-PUC1CU1',1,400.00,'2022-06-14','2022-06-14',1,0.00,NULL,'',17),(19,'2022-09-09 09:27:35.667912','2022-09-09 09:27:35.667934','UCEPR41443959C1-PUC1CU2',2,200.00,'2022-06-14','2022-06-14',0,0.00,NULL,'',17),(20,'2022-09-09 09:28:12.980208','2022-09-09 09:28:12.980256','UCEPR48317359C1-PUC1CU1',1,500.00,'2022-06-15','2022-06-15',0,0.00,NULL,'',18),(21,'2022-09-09 09:57:06.777858','2022-09-09 09:57:06.777909','847',1,400.00,'2022-06-14','2022-06-14',0,0.00,NULL,'',19),(22,'2022-09-09 09:57:07.039495','2022-09-09 09:57:07.039515','848',2,200.00,'2022-06-14','2022-06-14',0,0.00,NULL,'',19),(23,'2022-09-09 10:23:01.407009','2022-09-09 10:36:29.514582','849',1,400.00,'2022-06-14','2022-06-14',1,0.00,NULL,'',20),(24,'2022-09-09 10:23:01.716894','2022-09-09 10:23:01.716922','850',2,200.00,'2022-06-14','2022-06-14',0,0.00,NULL,'',20),(25,'2022-09-09 10:24:03.448805','2022-09-09 11:38:20.114210','851',1,400.00,'2022-06-14','2022-06-14',1,0.00,NULL,'',21),(26,'2022-09-09 10:24:03.818084','2022-09-09 10:44:37.584588','852',2,200.00,'2022-06-14','2022-06-14',1,0.00,NULL,'',21),(27,'2022-09-12 12:38:40.148742','2022-09-12 12:38:40.148790','853',1,100.00,'2022-09-12','2022-09-12',0,0.00,NULL,'',22),(28,'2022-09-12 12:38:40.291550','2022-09-12 12:38:40.291579','854',2,50.00,'2022-09-12','2022-09-12',0,0.00,NULL,'',22),(29,'2022-09-12 12:38:40.410058','2022-09-12 12:38:40.410097','855',3,150.00,'2022-09-12','2022-09-12',0,0.00,NULL,'',22),(30,'2022-09-12 15:49:33.640848','2022-09-12 15:49:33.640871','856',1,100.00,'2022-09-12','2022-09-12',0,0.00,NULL,'',23),(31,'2022-09-12 16:20:36.473586','2022-09-12 16:20:36.473608','857',1,300.00,'2022-09-12','2022-09-12',0,0.00,NULL,'',24),(32,'2022-09-12 16:20:36.605646','2022-09-12 16:20:36.605692','858',2,350.00,'2022-09-12','2022-09-12',0,0.00,NULL,'',24),(33,'2022-09-12 17:21:19.191031','2022-09-12 17:21:19.191074','859',1,2.00,'2022-09-12','2022-09-12',0,0.00,NULL,'',25),(34,'2022-09-12 17:30:10.024005','2022-09-12 17:30:10.024032','860',1,2.00,'2022-09-12','2022-09-12',0,0.00,NULL,'',26),(35,'2022-09-12 17:40:16.884657','2022-09-12 17:40:16.884682','861',1,400.00,'2022-06-14','2022-06-14',0,0.00,NULL,'',27),(36,'2022-09-12 17:40:17.409067','2022-09-12 17:40:17.409115','862',2,200.00,'2022-06-14','2022-06-14',0,0.00,NULL,'',27),(37,'2022-09-12 18:00:47.321564','2022-09-12 18:00:47.328056','863',1,2.00,'2022-09-12','2022-09-12',0,0.00,NULL,'',28),(38,'2022-09-12 19:00:31.718883','2022-09-12 19:00:31.718923','868',1,200.00,'2022-09-12','2022-09-12',0,0.00,NULL,'',29),(39,'2022-09-12 19:00:32.241125','2022-09-12 19:00:32.241157','869',2,120.00,'2022-09-12','2022-09-12',0,0.00,NULL,'',29),(40,'2022-09-12 19:01:30.869917','2022-09-12 19:22:54.869637','870',1,150.00,'2022-09-01','2022-09-02',1,0.00,NULL,'',30),(41,'2022-09-12 19:01:31.164309','2022-09-12 19:01:31.164351','871',2,100.00,'2022-09-01','2022-09-05',0,0.00,NULL,'',30),(42,'2022-09-12 19:01:31.448516','2022-09-12 19:01:31.448561','872',3,100.00,'2022-09-01','2022-09-10',0,0.00,NULL,'',30),(43,'2022-09-12 19:03:16.308266','2022-09-12 19:03:16.308306','873',1,400.00,'2022-09-12','2022-09-12',0,0.00,NULL,'',31),(44,'2022-09-12 19:03:16.412235','2022-09-12 19:03:16.412276','874',2,300.00,'2022-09-12','2022-09-12',0,0.00,NULL,'',31),(45,'2022-09-13 08:57:26.160884','2022-09-13 08:57:26.160928','875',1,300.00,'2022-09-12','2022-09-12',0,0.00,NULL,'',33),(46,'2022-09-20 16:21:35.923149','2022-09-20 16:21:35.923191','924',1,500.00,'2022-09-20','2022-09-28',0,0.00,NULL,'',34),(51,'2022-09-20 19:33:24.725225','2022-09-20 19:33:24.725266','3514-933',1,200.00,'2022-09-20','2022-09-30',0,0.00,NULL,'',43),(52,'2022-09-20 19:33:25.017184','2022-09-20 19:33:25.017205','3514-934',2,50.00,'2022-09-20','2022-09-30',0,0.00,NULL,'',43),(53,'2022-09-21 09:10:15.070641','2022-09-21 09:10:15.070660','3515-935',1,500.00,'2022-09-20','2022-09-28',0,0.00,NULL,'',44),(54,'2022-09-21 11:09:08.507787','2022-09-21 11:09:08.508656','3516-936',1,200.00,'2022-09-20','2022-09-30',0,0.00,NULL,'',46),(55,'2022-09-21 11:09:08.520261','2022-09-21 11:09:08.520287','3516-937',2,200.00,'2022-09-20','2022-09-30',0,0.00,NULL,'',46),(56,'2022-09-21 11:34:14.870736','2022-09-21 14:12:01.933317','R001 00000347',1,200.00,'2022-09-20','2022-09-30',1,0.00,'2022-09-21','',47),(57,'2022-09-21 11:34:14.886165','2022-09-21 11:34:14.886192','3517-939',2,200.00,'2022-09-30','2022-10-12',0,0.00,NULL,'',47),(58,'2022-09-21 12:25:16.694519','2022-09-21 12:25:16.694555','3518-940',1,500.00,'2022-09-20','2022-09-28',0,0.00,NULL,'',48),(59,'2022-09-21 15:23:20.472267','2022-09-21 15:32:10.746232','R001 00000348',1,200.00,'2022-09-20','2022-09-30',1,0.00,'2022-09-21','',49),(60,'2022-09-21 15:23:20.494477','2022-09-21 15:23:20.494503','3519-942',2,200.00,'2022-09-30','2022-10-12',0,0.00,NULL,'',49),(61,'2022-09-27 11:30:43.222184','2022-09-27 11:30:43.222234','3520-943',1,200.00,'2022-09-20','2022-09-30',0,0.00,NULL,'',50),(62,'2022-09-27 11:30:43.236405','2022-09-27 11:30:43.236436','3520-944',2,200.00,'2022-09-30','2022-10-12',0,0.00,NULL,'',50),(63,'2022-09-28 08:35:03.821973','2022-09-29 11:24:44.550371','R001 00000349',1,200.00,'2022-09-28','2022-10-07',1,0.00,'2022-09-28','',51),(64,'2022-09-28 08:35:03.836065','2022-09-28 08:35:03.836087','3521-946',2,200.00,'2022-10-26','2022-11-04',0,0.00,NULL,'',51),(65,'2022-09-28 08:51:53.321094','2022-09-28 08:53:29.843790','R001 00000350',1,500.00,'2022-09-28','2022-10-05',1,0.00,'2022-09-28','',52),(66,'2022-09-29 11:04:37.928974','2022-09-29 11:17:10.920761','R001 00000351',1,200.00,'2022-09-28','2022-10-07',1,0.00,'2022-09-29','',53),(67,'2022-09-29 11:04:37.938650','2022-09-29 11:04:37.938669','3523-949',2,200.00,'2022-10-26','2022-11-04',0,0.00,NULL,'',53),(68,'2022-10-09 23:35:38.390835','2022-10-09 23:35:38.390868','3524-950',1,200.00,'2022-09-28','2022-10-07',0,0.00,NULL,'',54),(69,'2022-10-09 23:35:38.406587','2022-10-09 23:35:38.406608','3524-951',2,200.00,'2022-10-26','2022-11-04',0,0.00,NULL,'',54);
/*!40000 ALTER TABLE `app_detalle_compromiso_de_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_detalle_pago`
--

DROP TABLE IF EXISTS `app_detalle_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_detalle_pago` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `nro_cuota` int(10) unsigned NOT NULL,
  `monto_parcial` decimal(10,2) NOT NULL,
  `especie_mora` varchar(50) DEFAULT NULL,
  `monto_mora` decimal(10,2) DEFAULT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `id_pago_id` bigint(20) NOT NULL,
  `concepto` varchar(200) DEFAULT NULL,
  `ide_esp` int(10) unsigned DEFAULT NULL,
  `ide_itm` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `app_detalle_pago_id_pago_id_6560ddd8_fk_app_pago_id` (`id_pago_id`),
  CONSTRAINT `app_detalle_pago_id_pago_id_6560ddd8_fk_app_pago_id` FOREIGN KEY (`id_pago_id`) REFERENCES `app_pago` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_detalle_pago`
--

LOCK TABLES `app_detalle_pago` WRITE;
/*!40000 ALTER TABLE `app_detalle_pago` DISABLE KEYS */;
INSERT INTO `app_detalle_pago` VALUES (1,'2022-06-15 11:59:57.552257','2022-06-15 11:59:57.552307',1,600.00,'FIJO',10.00,'2022-06-15','2022-06-15',1,NULL,NULL,NULL),(2,'2022-06-15 12:00:19.594149','2022-06-15 12:00:19.594199',1,500.00,'FIJO',10.00,'2022-06-15','2022-06-15',2,NULL,NULL,NULL),(3,'2022-06-15 12:00:50.715821','2022-09-19 10:58:28.600793',2,300.00,'PORC',0.00,'2022-06-13','2022-10-31',3,NULL,NULL,NULL),(4,'2022-06-15 12:00:50.726369','2022-09-19 10:58:28.596374',1,200.00,'PORC',0.00,'2022-06-13','2022-09-23',3,NULL,NULL,NULL),(5,'2022-06-15 12:01:04.634885','2022-06-15 12:01:21.992921',1,400.00,'PORC',0.00,'2022-06-14','2022-06-14',4,NULL,NULL,NULL),(6,'2022-06-15 12:01:04.644936','2022-06-15 12:01:21.997959',2,200.00,'PORC',0.00,'2022-06-14','2022-06-14',4,NULL,NULL,NULL),(8,'2022-06-15 12:02:08.588946','2022-06-15 12:02:08.588997',1,500.00,'PORC',0.00,'2022-06-15','2022-06-15',6,NULL,NULL,NULL),(11,'2022-06-15 12:02:22.408530','2022-06-15 12:02:22.408576',1,300.00,'PORC',0.00,'2022-06-15','2022-06-15',8,NULL,NULL,NULL),(12,'2022-06-15 12:02:22.419623','2022-06-15 12:02:22.419649',2,300.00,'PORC',0.00,'2022-06-15','2022-06-15',8,NULL,NULL,NULL),(14,'2022-06-15 12:03:02.760489','2022-06-15 12:03:02.760540',1,500.00,'PORC',0.00,'2022-06-15','2022-06-15',10,NULL,NULL,NULL),(15,'2022-06-15 12:03:10.513105','2022-06-15 12:03:10.513155',1,400.00,'PORC',0.00,'2022-06-15','2022-06-15',11,NULL,NULL,NULL),(16,'2022-06-15 12:03:10.516255','2022-06-15 12:03:10.516291',2,300.00,'PORC',0.00,'2022-06-15','2022-06-15',11,NULL,NULL,NULL),(19,'2022-09-12 12:26:04.183282','2022-09-12 12:26:04.183336',1,100.00,'PORC',100.00,'2022-09-12','2022-09-12',13,NULL,NULL,NULL),(20,'2022-09-12 12:26:19.962668','2022-09-12 12:26:19.962719',1,120.00,'PORC',NULL,'2022-09-12','2022-09-12',14,NULL,NULL,NULL),(21,'2022-09-12 12:34:36.895932','2022-09-12 12:36:56.548174',1,140.00,'PORC',0.00,'2022-09-11','2022-09-11',23,NULL,NULL,NULL),(22,'2022-09-12 12:34:36.898057','2022-09-12 12:36:56.576231',2,100.00,'PORC',0.00,'2022-09-11','2022-09-11',23,NULL,NULL,NULL),(23,'2022-09-12 12:37:08.826709','2022-09-12 12:37:08.826761',1,300.00,'PORC',0.00,'2022-09-12','2022-09-12',24,NULL,NULL,NULL),(24,'2022-09-12 12:37:08.837327','2022-09-12 12:37:08.837375',2,350.00,'PORC',0.00,'2022-09-12','2022-09-12',24,NULL,NULL,NULL),(25,'2022-09-12 12:37:23.468147','2022-09-12 12:37:23.468198',1,100.00,'PORC',0.00,'2022-09-12','2022-09-12',25,NULL,NULL,NULL),(26,'2022-09-12 12:37:23.484968','2022-09-12 12:37:23.485011',3,50.00,'PORC',0.00,'2022-09-12','2022-09-12',25,NULL,NULL,NULL),(27,'2022-09-12 12:37:23.490219','2022-09-12 12:37:23.490255',2,100.00,'PORC',0.00,'2022-09-12','2022-09-12',25,NULL,NULL,NULL),(33,'2022-09-12 17:18:24.000617','2022-09-12 17:18:24.000685',1,2.00,'PORC',0.00,'2022-09-12','2022-09-12',29,NULL,NULL,NULL),(34,'2022-09-12 17:18:28.506914','2022-09-12 17:18:28.506964',1,2.00,'PORC',0.00,'2022-09-12','2022-09-12',30,NULL,NULL,NULL),(35,'2022-09-12 18:23:33.649377','2022-09-12 18:29:04.621731',1,400.00,'PORC',0.00,'2022-09-11','2022-09-11',31,NULL,NULL,NULL),(36,'2022-09-12 18:25:18.238869','2022-09-12 18:25:18.238897',1,210.00,'PORC',0.00,'2022-09-12','2022-09-15',33,NULL,NULL,NULL),(37,'2022-09-12 18:25:18.264145','2022-09-12 18:25:18.264166',2,210.00,'PORC',0.00,'2022-09-12','2022-09-30',33,NULL,NULL,NULL),(38,'2022-09-12 18:26:13.712195','2022-09-12 18:54:56.592077',1,200.00,'PORC',0.00,'2022-09-01','2022-09-08',35,NULL,NULL,NULL),(39,'2022-09-12 18:26:13.715796','2022-09-12 18:54:56.595822',2,150.00,'PORC',0.00,'2022-09-01','2022-09-09',35,NULL,NULL,NULL),(40,'2022-09-12 18:26:13.724590','2022-09-12 18:54:56.648354',3,100.00,'PORC',0.00,'2022-09-01','2022-09-10',35,NULL,NULL,NULL),(44,'2022-09-12 18:29:11.701126','2022-09-12 18:29:11.701179',1,300.00,'PORC',0.00,'2022-09-12','2022-09-12',32,NULL,NULL,NULL),(45,'2022-09-12 18:40:33.342351','2022-09-12 18:40:33.342404',2,120.00,'PORC',0.00,'2022-09-12','2022-09-12',34,NULL,NULL,NULL),(46,'2022-09-12 18:40:33.346759','2022-09-12 18:40:33.346847',1,200.00,'PORC',0.00,'2022-09-12','2022-09-12',34,NULL,NULL,NULL),(88,'2022-09-20 14:25:30.557334','2022-09-20 14:25:58.802629',1,200.00,NULL,NULL,'2022-09-20','2022-09-20',109,'MATRICULA MAS PRIMER PAGO',32104,3308),(89,'2022-09-20 14:25:30.560373','2022-09-20 14:26:11.003717',2,500.00,NULL,NULL,'2022-09-20','2022-09-20',109,'CEPRE COMPLETO',32104,3301),(90,'2022-09-20 14:25:32.783603','2022-09-20 14:27:41.837373',1,15.00,NULL,NULL,'2021-01-01','2022-01-01',110,'DUPLICADO DE CARNET UNIVERSITARIO',29844,3260),(91,'2022-09-20 14:25:32.787730','2022-09-20 14:26:33.685679',3,500.00,NULL,NULL,'2022-09-20','2022-09-20',110,'CEPRE COMPLETO',32104,3301),(92,'2022-09-20 14:25:32.788688','2022-09-20 14:26:29.754847',2,200.00,NULL,NULL,'2022-09-20','2022-09-20',110,'CEPRE 2022 PRIMER PAGO',32104,3307),(95,'2022-09-20 15:55:04.270262','2022-09-20 15:55:37.931947',1,500.00,NULL,NULL,'2022-09-20','2022-09-28',113,'CEPRE COMPLETO',32104,3301),(96,'2022-09-20 15:55:09.330615','2022-09-20 15:55:50.274605',1,200.00,NULL,NULL,'2022-09-20','2022-09-30',114,'MATRICULA MAS PRIMER PAGO',32104,3308),(97,'2022-09-20 15:55:09.332321','2022-09-21 11:26:22.934666',2,200.00,NULL,NULL,'2022-09-30','2022-10-12',114,'CEPRE 2022 PRIMER PAGO',32104,3307),(98,'2022-09-21 00:18:32.268649','2022-09-21 00:18:32.268673',1,0.00,NULL,NULL,'2022-09-21','2022-09-21',115,NULL,NULL,NULL),(101,'2022-09-21 00:19:25.679100','2022-09-21 00:19:25.679131',1,0.00,NULL,NULL,'2022-09-21','2022-09-21',117,NULL,NULL,NULL),(102,'2022-09-21 08:11:27.693012','2022-09-21 08:11:44.976187',1,500.00,NULL,NULL,'2022-09-01','2022-09-23',118,'CEPRE COMPLETO',32104,3301),(103,'2022-09-21 08:11:53.754352','2022-09-21 08:12:04.648681',1,200.00,NULL,NULL,'2022-09-21','2022-09-21',119,'CEPRE 2022 PRIMER PAGO',32104,3307),(104,'2022-09-21 08:11:53.940027','2022-09-21 08:12:21.284329',2,200.00,NULL,NULL,'2022-09-21','2022-09-21',119,'CEPRE 2022 PRIMER PAGO',32104,3307),(105,'2022-09-21 08:11:54.032210','2022-09-21 08:12:28.221702',3,200.00,NULL,NULL,'2022-09-21','2022-09-21',119,'CEPRE 2022 PRIMER PAGO',32104,3307),(106,'2022-09-28 08:18:06.856486','2022-09-28 08:21:29.574831',1,500.00,NULL,NULL,'2022-09-28','2022-10-05',120,'CENTRO UNIVERSITARIO (CEPRE)',32104,3258),(107,'2022-09-28 08:18:34.195496','2022-09-28 08:20:44.539573',1,200.00,NULL,NULL,'2022-09-28','2022-10-07',121,'CEPRE 2022 PRIMER PAGO',32104,3307),(108,'2022-09-28 08:18:34.399945','2022-09-28 08:21:07.983408',2,200.00,NULL,NULL,'2022-10-26','2022-11-04',121,'MATRICULA MAS PRIMER PAGO',32104,3308);
/*!40000 ALTER TABLE `app_detalle_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_docente`
--

DROP TABLE IF EXISTS `app_docente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_docente` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `estado_Activo` tinyint(1) NOT NULL,
  `codigo_docente` varchar(20) DEFAULT NULL,
  `regimen_docente` varchar(3) DEFAULT NULL,
  `user_type_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_type_id` (`user_type_id`),
  CONSTRAINT `app_docente_user_type_id_443e8612_fk_app_customuser_id` FOREIGN KEY (`user_type_id`) REFERENCES `app_customuser` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_docente`
--

LOCK TABLES `app_docente` WRITE;
/*!40000 ALTER TABLE `app_docente` DISABLE KEYS */;
INSERT INTO `app_docente` VALUES (1,'2022-06-15 12:04:50.762875','2022-09-02 17:05:49.502464',1,'001','P',2),(2,'2022-09-05 21:11:29.928092','2022-10-09 23:18:53.633130',1,'DOC-001','P',5),(3,'2022-09-05 21:12:05.509271','2022-10-09 22:30:01.880443',1,'DOC_002','P',6),(4,'2022-09-09 08:38:43.028237','2022-10-09 23:23:02.530047',1,'DOC-00','P',10),(5,'2022-09-12 12:42:25.237065','2022-10-09 23:19:18.495272',1,'123456','P',11),(6,'2022-10-07 19:52:45.294795','2022-10-09 23:19:25.298346',1,'123456789','C',16),(7,'2022-10-07 19:54:10.666826','2022-10-09 23:19:32.076405',1,'98765','C',17),(8,'2022-10-07 19:55:43.899243','2022-10-09 23:19:41.764395',1,'975','C',18),(9,'2022-10-09 22:29:19.594608','2022-10-09 23:19:49.615504',1,'9753124','P',19),(10,'2022-10-09 22:44:49.298093','2022-10-09 23:19:55.690772',1,'128934','C',20),(11,'2022-10-10 00:06:48.958936','2022-10-10 00:07:19.187440',1,'44444444','C',21);
/*!40000 ALTER TABLE `app_docente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_docente_curso`
--

DROP TABLE IF EXISTS `app_docente_curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_docente_curso` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `id_curso_id` bigint(20) NOT NULL,
  `id_docente_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `app_docente_curso_id_curso_id_af58960a_fk_app_padron_curso_id` (`id_curso_id`),
  KEY `app_docente_curso_id_docente_id_59ac8caf_fk_app_docente_id` (`id_docente_id`),
  CONSTRAINT `app_docente_curso_id_curso_id_af58960a_fk_app_padron_curso_id` FOREIGN KEY (`id_curso_id`) REFERENCES `app_padron_curso` (`id`),
  CONSTRAINT `app_docente_curso_id_docente_id_59ac8caf_fk_app_docente_id` FOREIGN KEY (`id_docente_id`) REFERENCES `app_docente` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_docente_curso`
--

LOCK TABLES `app_docente_curso` WRITE;
/*!40000 ALTER TABLE `app_docente_curso` DISABLE KEYS */;
INSERT INTO `app_docente_curso` VALUES (11,'2022-10-07 19:16:58.381232','2022-10-07 19:16:58.381280',1,1),(12,'2022-10-07 19:16:58.386733','2022-10-07 19:16:58.386775',3,1),(38,'2022-10-09 22:30:02.073866','2022-10-09 22:30:02.073886',6,3),(39,'2022-10-09 22:30:02.080312','2022-10-09 22:30:02.080328',5,3),(45,'2022-10-09 23:18:54.054747','2022-10-09 23:18:54.054792',3,2),(48,'2022-10-09 23:19:18.926808','2022-10-09 23:19:18.926847',4,5),(49,'2022-10-09 23:19:25.597651','2022-10-09 23:19:25.597702',3,6),(50,'2022-10-09 23:19:32.412323','2022-10-09 23:19:32.412362',3,7),(51,'2022-10-09 23:19:32.516955','2022-10-09 23:19:32.516975',4,7),(52,'2022-10-09 23:19:32.518648','2022-10-09 23:19:32.518662',5,7),(53,'2022-10-09 23:19:42.186081','2022-10-09 23:19:42.186128',3,8),(54,'2022-10-09 23:19:42.271339','2022-10-09 23:19:42.271361',4,8),(55,'2022-10-09 23:19:42.273273','2022-10-09 23:19:42.273308',5,8),(56,'2022-10-09 23:19:42.275260','2022-10-09 23:19:42.275273',6,8),(57,'2022-10-09 23:19:42.276936','2022-10-09 23:19:42.276948',7,8),(58,'2022-10-09 23:19:42.278453','2022-10-09 23:19:42.278464',8,8),(59,'2022-10-09 23:19:50.065928','2022-10-09 23:19:50.065979',3,9),(60,'2022-10-09 23:19:50.070440','2022-10-09 23:19:50.070470',4,9),(61,'2022-10-09 23:19:50.074625','2022-10-09 23:19:50.074655',6,9),(62,'2022-10-09 23:19:50.078624','2022-10-09 23:19:50.078644',7,9),(63,'2022-10-09 23:19:56.010913','2022-10-09 23:19:56.010969',1,10),(64,'2022-10-09 23:23:02.884076','2022-10-09 23:23:02.885483',3,4),(65,'2022-10-09 23:23:03.165980','2022-10-09 23:23:03.166000',4,4),(66,'2022-10-09 23:23:03.167625','2022-10-09 23:23:03.167641',1,4),(74,'2022-10-10 00:07:19.382485','2022-10-10 00:07:19.382523',1,11),(75,'2022-10-10 00:07:19.470700','2022-10-10 00:07:19.470722',8,11);
/*!40000 ALTER TABLE `app_docente_curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_documento_publicacion`
--

DROP TABLE IF EXISTS `app_documento_publicacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_documento_publicacion` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `descripcion` longtext NOT NULL,
  `nombre_documento` varchar(100) DEFAULT NULL,
  `archivo` varchar(100) DEFAULT NULL,
  `estado` tinyint(1) NOT NULL,
  `id_ciclo_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `app_documento_publicacion_id_ciclo_id_950ed660_fk_app_ciclo_id` (`id_ciclo_id`),
  CONSTRAINT `app_documento_publicacion_id_ciclo_id_950ed660_fk_app_ciclo_id` FOREIGN KEY (`id_ciclo_id`) REFERENCES `app_ciclo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_documento_publicacion`
--

LOCK TABLES `app_documento_publicacion` WRITE;
/*!40000 ALTER TABLE `app_documento_publicacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `app_documento_publicacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_documento_solicitado_ciclo`
--

DROP TABLE IF EXISTS `app_documento_solicitado_ciclo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_documento_solicitado_ciclo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `id_ciclo_id` bigint(20) NOT NULL,
  `id_padron_documento_requisito_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `app_documento_solicitado_id_padron_documento_requ_68a6b536_uniq` (`id_padron_documento_requisito_id`,`id_ciclo_id`),
  KEY `app_documento_solici_id_ciclo_id_0fa235d4_fk_app_ciclo` (`id_ciclo_id`),
  CONSTRAINT `app_documento_solici_id_ciclo_id_0fa235d4_fk_app_ciclo` FOREIGN KEY (`id_ciclo_id`) REFERENCES `app_ciclo` (`id`),
  CONSTRAINT `app_documento_solici_id_padron_documento__58656819_fk_app_padro` FOREIGN KEY (`id_padron_documento_requisito_id`) REFERENCES `app_padron_documento_requisito` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_documento_solicitado_ciclo`
--

LOCK TABLES `app_documento_solicitado_ciclo` WRITE;
/*!40000 ALTER TABLE `app_documento_solicitado_ciclo` DISABLE KEYS */;
INSERT INTO `app_documento_solicitado_ciclo` VALUES (1,'2022-06-15 11:54:15.060340','2022-06-15 11:54:15.060367',1,3),(2,'2022-06-15 11:54:15.167278','2022-06-15 11:54:15.167327',1,4),(3,'2022-06-15 11:54:20.769853','2022-06-15 11:54:20.769896',2,3),(4,'2022-06-15 11:54:20.861618','2022-06-15 11:54:20.861668',2,4),(5,'2022-06-15 11:54:29.062760','2022-06-15 11:54:29.062807',3,3),(6,'2022-09-08 15:25:45.883839','2022-09-08 15:25:45.883859',4,3),(7,'2022-09-08 15:25:45.947297','2022-09-08 15:25:45.947343',4,4),(8,'2022-09-12 18:31:40.205395','2022-09-12 18:31:40.205447',10,3),(9,'2022-09-12 18:31:40.295206','2022-09-12 18:31:40.295258',10,4),(10,'2022-09-12 18:31:44.726602','2022-09-12 18:31:44.726647',9,3),(11,'2022-09-12 18:31:44.792067','2022-09-12 18:31:44.792119',9,4),(12,'2022-09-12 18:33:27.818846','2022-09-12 18:33:27.818867',8,3),(13,'2022-09-12 18:33:27.862059','2022-09-12 18:33:27.862079',8,4),(14,'2022-09-12 18:33:27.995192','2022-09-12 18:33:27.995211',8,5),(15,'2022-09-12 19:07:49.163307','2022-09-12 19:07:49.163328',10,5),(16,'2022-09-20 15:54:43.467129','2022-09-20 15:54:43.467170',11,3),(17,'2022-09-20 15:54:43.525053','2022-09-20 15:54:43.525101',11,4),(18,'2022-09-20 15:54:43.586159','2022-09-20 15:54:43.586206',11,5),(19,'2022-09-28 08:30:22.171804','2022-09-28 08:30:22.171853',12,3),(20,'2022-09-28 08:30:22.372640','2022-09-28 08:30:22.372692',12,5),(21,'2022-09-28 08:30:22.440798','2022-09-28 08:30:22.440848',12,6);
/*!40000 ALTER TABLE `app_documento_solicitado_ciclo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_documentos_inscripcion`
--

DROP TABLE IF EXISTS `app_documentos_inscripcion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_documentos_inscripcion` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `nombre_documento` varchar(100) DEFAULT NULL,
  `documento` varchar(100) DEFAULT NULL,
  `esta_aprobado` smallint(6) DEFAULT NULL,
  `observaciones` varchar(200) DEFAULT NULL,
  `id_administrador_id` bigint(20) DEFAULT NULL,
  `id_inscripcion_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `app_documentos_inscr_id_inscripcion_id_a9b0f8e0_fk_app_inscr` (`id_inscripcion_id`),
  KEY `app_documentos_inscr_id_administrador_id_09b65e5e_fk_app_admin` (`id_administrador_id`),
  CONSTRAINT `app_documentos_inscr_id_administrador_id_09b65e5e_fk_app_admin` FOREIGN KEY (`id_administrador_id`) REFERENCES `app_administrador` (`id`),
  CONSTRAINT `app_documentos_inscr_id_inscripcion_id_a9b0f8e0_fk_app_inscr` FOREIGN KEY (`id_inscripcion_id`) REFERENCES `app_inscripcion` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_documentos_inscripcion`
--

LOCK TABLES `app_documentos_inscripcion` WRITE;
/*!40000 ALTER TABLE `app_documentos_inscripcion` DISABLE KEYS */;
INSERT INTO `app_documentos_inscripcion` VALUES (1,'2022-06-15 16:55:24.766273','2022-06-15 16:59:18.845894','DNI','docs_inscripcion/74565490_LEVARENAN/VZ7ZJMZOSNGFPAC6453I7TWQ2M.jpg',1,'',1,1),(2,'2022-06-15 16:55:24.891088','2022-06-15 17:00:44.146669','Constancia de Estudios','docs_inscripcion/74565490_LEVARENAN/descarga_7pMAPOe.jpg',1,'',1,1),(3,'2022-09-05 22:51:53.824055','2022-09-05 23:00:23.812547','DNI','docs_inscripcion/70214206_RELAIZACARMEN/WhatsApp_Image_2022-03-25_at_9.02.36_PM.jpeg',1,'',1,2),(4,'2022-09-05 22:51:57.948309','2022-09-05 23:07:43.721951','DNI','',1,'',1,3),(5,'2022-09-09 10:44:32.088900','2022-09-09 10:51:08.208796','DNI','docs_inscripcion/42334595_AIVARCLAUDIA/modelo.pdf',1,'',1,4),(6,'2022-09-09 10:44:32.139948','2022-09-19 09:44:40.998701','Constancia de Estudios','docs_inscripcion/42334595_AIVARCLAUDIA/HFHT_-_Database_Documentation.pdf',1,'',1,4),(7,'2022-09-09 10:44:49.373955','2022-09-19 09:37:01.849025','DNI','',1,'',1,5),(8,'2022-09-09 10:44:49.496994','2022-09-09 10:44:49.497029','Constancia de Estudios','',0,NULL,NULL,5),(9,'2022-09-12 19:13:56.269567','2022-09-12 19:28:33.670926','DNI','docs_inscripcion/40525871_SEQUEIROSJOSE/CUADERNOref.jpg',1,'',1,6),(10,'2022-09-12 19:13:56.325759','2022-09-12 19:31:39.187907','Constancia de Estudios','docs_inscripcion/40525871_SEQUEIROSJOSE/cuaderno.jpg',1,'',1,6),(11,'2022-09-12 19:13:56.377535','2022-09-12 19:32:36.513296','Recibo de Caja','docs_inscripcion/40525871_SEQUEIROSJOSE/hoja.jpg',1,'',1,6),(12,'2022-09-21 14:12:01.956366','2022-09-21 14:12:01.956381','DNI','',0,NULL,NULL,7),(13,'2022-09-21 14:12:01.965701','2022-09-21 14:12:01.965720','Constancia de Estudios','',0,NULL,NULL,7),(14,'2022-09-21 14:12:01.974163','2022-09-21 14:12:01.974183','Recibo de Caja','',0,NULL,NULL,7),(15,'2022-09-21 15:32:10.776153','2022-09-21 15:32:42.222995','DNI','docs_inscripcion/61994755_GOMEZLUZ/PagoOnline_Junuy.png',0,NULL,NULL,8),(16,'2022-09-21 15:32:11.148469','2022-09-21 15:32:50.691558','Constancia de Estudios','docs_inscripcion/61994755_GOMEZLUZ/Junuy_Fondo_word.png',0,NULL,NULL,8),(17,'2022-09-21 15:32:11.282762','2022-09-21 15:33:22.606153','Recibo de Caja','docs_inscripcion/61994755_GOMEZLUZ/cuadro_metricas.PNG',0,NULL,NULL,8),(18,'2022-09-28 08:45:38.087947','2022-09-29 11:20:01.481895','DNI','',2,'no hay archivo',1,9),(19,'2022-09-28 08:45:38.090281','2022-09-29 23:58:01.919218','Recibo de Caja','docs_inscripcion/73392290_CABALLEROMARIA/vinocanchon.png',2,'asdasd',1,9),(20,'2022-09-28 08:45:38.092225','2022-09-29 23:59:00.859947','foto','docs_inscripcion/73392290_CABALLEROMARIA/wp2732760.jpg',1,'',1,9),(21,'2022-09-28 08:53:29.990754','2022-09-28 09:00:31.532974','DNI','docs_inscripcion/76265366_VILCHEZALEXA/scrum_srpint.PNG',1,'',1,10),(22,'2022-09-28 08:53:29.996438','2022-09-28 09:00:34.924567','Recibo de Caja','docs_inscripcion/76265366_VILCHEZALEXA/firma_digital_2.PNG',1,'',1,10),(23,'2022-09-28 08:53:30.124856','2022-09-28 09:00:03.461501','foto','docs_inscripcion/76265366_VILCHEZALEXA/foto_carne.png',1,'',1,10),(24,'2022-09-29 11:10:28.594968','2022-09-29 13:32:11.480146','DNI','docs_inscripcion/47436764_LUNAABEL/16644681739505206540911821143336.jpg',2,'No es dni, y el billete es falso.',1,11),(25,'2022-09-29 11:10:28.600109','2022-09-29 11:16:13.459121','Recibo de Caja','docs_inscripcion/47436764_LUNAABEL/IMG-20220929-WA0021_Ppb8mEZ.jpg',0,NULL,NULL,11),(26,'2022-09-29 11:10:28.602232','2022-09-29 13:36:08.876084','foto','docs_inscripcion/47436764_LUNAABEL/IMG-20220929-WA0021.jpg',2,'no es una foto',1,11);
/*!40000 ALTER TABLE `app_documentos_inscripcion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_documentos_inscripcion_revision`
--

DROP TABLE IF EXISTS `app_documentos_inscripcion_revision`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_documentos_inscripcion_revision` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `esta_aprobado` tinyint(1) NOT NULL,
  `id_administrador_id` bigint(20) DEFAULT NULL,
  `id_documento_inscripcion_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `app_documentos_inscr_id_administrador_id_0b5b222b_fk_app_admin` (`id_administrador_id`),
  KEY `app_documentos_inscr_id_documento_inscrip_d0d34482_fk_app_docum` (`id_documento_inscripcion_id`),
  CONSTRAINT `app_documentos_inscr_id_administrador_id_0b5b222b_fk_app_admin` FOREIGN KEY (`id_administrador_id`) REFERENCES `app_administrador` (`id`),
  CONSTRAINT `app_documentos_inscr_id_documento_inscrip_d0d34482_fk_app_docum` FOREIGN KEY (`id_documento_inscripcion_id`) REFERENCES `app_documentos_inscripcion` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_documentos_inscripcion_revision`
--

LOCK TABLES `app_documentos_inscripcion_revision` WRITE;
/*!40000 ALTER TABLE `app_documentos_inscripcion_revision` DISABLE KEYS */;
/*!40000 ALTER TABLE `app_documentos_inscripcion_revision` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_escuela_profesional`
--

DROP TABLE IF EXISTS `app_escuela_profesional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_escuela_profesional` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `codigo_escuela` varchar(10) DEFAULT NULL,
  `nombre_escuela_profesional` varchar(40) NOT NULL,
  `abreviacion` varchar(10) DEFAULT NULL,
  `descripcion` longtext,
  `id_grupo_academico_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo_escuela` (`codigo_escuela`),
  KEY `app_escuela_profesio_id_grupo_academico_i_00aa1c6a_fk_app_grupo` (`id_grupo_academico_id`),
  CONSTRAINT `app_escuela_profesio_id_grupo_academico_i_00aa1c6a_fk_app_grupo` FOREIGN KEY (`id_grupo_academico_id`) REFERENCES `app_grupo_academico` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_escuela_profesional`
--

LOCK TABLES `app_escuela_profesional` WRITE;
/*!40000 ALTER TABLE `app_escuela_profesional` DISABLE KEYS */;
INSERT INTO `app_escuela_profesional` VALUES (1,'2022-06-15 00:16:54.308907','2022-09-30 08:21:57.645551','ET','ECOTURISMO','ET',NULL,2),(2,'2022-06-15 00:16:54.402146','2022-09-30 08:21:57.722201','IA','INGENIERIA DE ALIMENTOS','IA',NULL,1),(3,'2022-06-15 00:16:54.502140','2022-09-30 08:21:57.802201','IC','INGENIERIA CIVIL','IC',NULL,1),(4,'2022-06-15 00:16:54.602558','2022-09-30 08:21:57.861818','IT','INGENIERIA AGRONOMICA TROPICAL','IT',NULL,1);
/*!40000 ALTER TABLE `app_escuela_profesional` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_estudiante`
--

DROP TABLE IF EXISTS `app_estudiante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_estudiante` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `tema_personalizado` int(10) unsigned NOT NULL,
  `id_aula_id` bigint(20) DEFAULT NULL,
  `id_inscripcion_id` bigint(20) NOT NULL,
  `user_type_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_inscripcion_id` (`id_inscripcion_id`),
  UNIQUE KEY `user_type_id` (`user_type_id`),
  KEY `app_estudiante_id_aula_id_f83f8a93_fk_app_aula_id` (`id_aula_id`),
  CONSTRAINT `app_estudiante_id_aula_id_f83f8a93_fk_app_aula_id` FOREIGN KEY (`id_aula_id`) REFERENCES `app_aula` (`id`),
  CONSTRAINT `app_estudiante_id_inscripcion_id_d91a7062_fk_app_inscripcion_id` FOREIGN KEY (`id_inscripcion_id`) REFERENCES `app_inscripcion` (`id`),
  CONSTRAINT `app_estudiante_user_type_id_9fed874a_fk_app_customuser_id` FOREIGN KEY (`user_type_id`) REFERENCES `app_customuser` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_estudiante`
--

LOCK TABLES `app_estudiante` WRITE;
/*!40000 ALTER TABLE `app_estudiante` DISABLE KEYS */;
INSERT INTO `app_estudiante` VALUES (1,'2022-06-15 17:00:45.882020','2022-06-15 18:13:20.123641',1,1,1,3),(2,'2022-09-05 23:00:27.752317','2022-09-05 23:00:27.752362',1,NULL,2,7),(3,'2022-09-05 23:07:46.855049','2022-09-05 23:07:46.855095',1,NULL,3,8),(4,'2022-09-12 19:32:38.887880','2022-09-12 19:32:38.887905',1,NULL,6,12),(5,'2022-09-19 09:44:43.347667','2022-09-19 09:44:43.347698',1,NULL,4,13),(6,'2022-09-28 09:03:01.898386','2022-10-05 08:26:02.421268',1,1,10,14);
/*!40000 ALTER TABLE `app_estudiante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_estudiante_horario`
--

DROP TABLE IF EXISTS `app_estudiante_horario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_estudiante_horario` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `id_estudiante_id` bigint(20) NOT NULL,
  `id_horario_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `app_estudiante_horar_id_estudiante_id_359332ff_fk_app_estud` (`id_estudiante_id`),
  KEY `app_estudiante_horario_id_horario_id_73f9b5e8_fk_app_horario_id` (`id_horario_id`),
  CONSTRAINT `app_estudiante_horar_id_estudiante_id_359332ff_fk_app_estud` FOREIGN KEY (`id_estudiante_id`) REFERENCES `app_estudiante` (`id`),
  CONSTRAINT `app_estudiante_horario_id_horario_id_73f9b5e8_fk_app_horario_id` FOREIGN KEY (`id_horario_id`) REFERENCES `app_horario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_estudiante_horario`
--

LOCK TABLES `app_estudiante_horario` WRITE;
/*!40000 ALTER TABLE `app_estudiante_horario` DISABLE KEYS */;
INSERT INTO `app_estudiante_horario` VALUES (1,'2022-06-15 18:13:36.639091','2022-06-15 18:13:36.639134',1,1),(2,'2022-09-02 19:56:25.078416','2022-09-02 19:56:25.078469',1,2),(3,'2022-09-02 20:11:12.766081','2022-09-02 20:11:12.766132',1,3),(4,'2022-09-30 08:28:32.532657','2022-09-30 08:28:32.532697',6,4),(5,'2022-10-09 23:14:59.259104','2022-10-09 23:14:59.259151',6,5),(6,'2022-10-09 23:20:12.531883','2022-10-09 23:20:12.531931',6,6),(7,'2022-10-09 23:23:19.104030','2022-10-09 23:23:19.104052',6,7);
/*!40000 ALTER TABLE `app_estudiante_horario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_estudiante_notas_por_curso`
--

DROP TABLE IF EXISTS `app_estudiante_notas_por_curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_estudiante_notas_por_curso` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `notas_curso` decimal(5,3) NOT NULL,
  `id_examen_estudiante_id` bigint(20) NOT NULL,
  `id_padron_curso_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `app_estudiante_notas_id_examen_estudiante_2b4e575f_fk_app_exame` (`id_examen_estudiante_id`),
  KEY `app_estudiante_notas_id_padron_curso_id_3cc3a6fb_fk_app_padro` (`id_padron_curso_id`),
  CONSTRAINT `app_estudiante_notas_id_examen_estudiante_2b4e575f_fk_app_exame` FOREIGN KEY (`id_examen_estudiante_id`) REFERENCES `app_examen_estudiante` (`id`),
  CONSTRAINT `app_estudiante_notas_id_padron_curso_id_3cc3a6fb_fk_app_padro` FOREIGN KEY (`id_padron_curso_id`) REFERENCES `app_padron_cursos_grupo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_estudiante_notas_por_curso`
--

LOCK TABLES `app_estudiante_notas_por_curso` WRITE;
/*!40000 ALTER TABLE `app_estudiante_notas_por_curso` DISABLE KEYS */;
/*!40000 ALTER TABLE `app_estudiante_notas_por_curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_examen`
--

DROP TABLE IF EXISTS `app_examen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_examen` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `fecha_examen` date NOT NULL,
  `denominacion_examen` varchar(50) NOT NULL,
  `tipo_examen` varchar(20) NOT NULL,
  `nro_examen` int(10) unsigned NOT NULL,
  `hora_inicio` time(6) NOT NULL,
  `hora_fin` time(6) NOT NULL,
  `examen_rendido` tinyint(1) NOT NULL,
  `lanzar_examen` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_examen`
--

LOCK TABLES `app_examen` WRITE;
/*!40000 ALTER TABLE `app_examen` DISABLE KEYS */;
INSERT INTO `app_examen` VALUES (1,'2022-06-15 18:21:03.084159','2022-06-30 23:06:20.579755','2022-06-22','Primer Examen Simulacro','SIMULACRO',1,'09:00:00.000000','11:00:00.000000',1,1),(3,'2022-06-21 23:04:37.893862','2022-07-01 20:25:20.208725','2022-06-21','Simulacro 2','SIMULACRO',2,'23:04:00.000000','23:55:00.000000',1,1),(4,'2022-06-22 14:36:47.193562','2022-06-22 14:36:47.193606','2022-06-22','Examen Simulacro 2022','SIMULACRO',3,'14:36:00.000000','23:59:00.000000',0,0),(5,'2022-07-11 21:36:57.934491','2022-07-11 21:44:42.910008','2022-07-11','Examen prueba final','SIMULACRO',4,'21:36:00.000000','23:42:00.000000',0,1),(6,'2022-07-11 22:30:37.080849','2022-07-11 22:31:58.512500','2022-07-11','Simulacro 2022 123','SIMULACRO',5,'22:30:00.000000','23:59:00.000000',0,1),(7,'2022-07-11 22:38:18.008020','2022-07-11 22:38:52.945893','2022-07-11','ES','SIMULACRO',6,'22:38:00.000000','23:59:00.000000',0,1),(8,'2022-07-11 22:58:30.740791','2022-07-11 22:59:23.890267','2022-07-11','ES2','SIMULACRO',7,'22:58:00.000000','23:59:00.000000',0,1),(9,'2022-07-11 23:17:44.255410','2022-07-11 23:18:23.312970','2022-07-11','ES3','SIMULACRO',8,'23:17:00.000000','23:59:00.000000',0,1),(10,'2022-07-11 23:26:02.097560','2022-07-11 23:26:02.097601','2022-07-11','ES1','SIMULACRO',9,'23:25:00.000000','23:50:00.000000',0,0),(11,'2022-07-12 00:04:32.835877','2022-07-12 00:17:13.868369','2022-07-12','ES5','SIMULACRO',10,'00:04:00.000000','00:54:00.000000',0,1),(12,'2022-07-12 00:22:29.537642','2022-07-12 00:23:49.940596','2022-07-12','es8','SIMULACRO',11,'00:22:00.000000','00:52:00.000000',0,1),(13,'2022-07-12 00:25:16.696963','2022-07-12 00:26:10.764822','2022-07-12','es34','SIMULACRO',12,'00:25:00.000000','00:59:00.000000',0,1),(14,'2022-07-12 00:29:46.802809','2022-07-12 00:29:46.802864','2022-07-12','ESES','SIMULACRO',13,'00:29:00.000000','00:59:00.000000',0,0),(15,'2022-07-12 00:38:18.541649','2022-07-12 00:38:58.264623','2022-07-12','qwerty','SIMULACRO',14,'00:38:00.000000','01:38:00.000000',0,1);
/*!40000 ALTER TABLE `app_examen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_examen_estudiante`
--

DROP TABLE IF EXISTS `app_examen_estudiante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_examen_estudiante` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `nota_promedio` varchar(10) NOT NULL,
  `id_estudiante_id` bigint(20) NOT NULL,
  `id_examen_id` bigint(20) NOT NULL,
  `esta_finalizado` tinyint(1) NOT NULL,
  `esta_iniciado` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `app_examen_estudiant_id_estudiante_id_05c02f3d_fk_app_estud` (`id_estudiante_id`),
  KEY `app_examen_estudiante_id_examen_id_59b892f9` (`id_examen_id`),
  CONSTRAINT `app_examen_estudiant_id_estudiante_id_05c02f3d_fk_app_estud` FOREIGN KEY (`id_estudiante_id`) REFERENCES `app_estudiante` (`id`),
  CONSTRAINT `app_examen_estudiante_id_examen_id_59b892f9_fk_app_examen_id` FOREIGN KEY (`id_examen_id`) REFERENCES `app_examen` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_examen_estudiante`
--

LOCK TABLES `app_examen_estudiante` WRITE;
/*!40000 ALTER TABLE `app_examen_estudiante` DISABLE KEYS */;
INSERT INTO `app_examen_estudiante` VALUES (1,'2022-06-15 18:35:05.864879','2022-06-15 18:50:11.038299','NSP',1,1,0,1),(2,'2022-06-21 23:06:13.728108','2022-06-21 23:07:20.461331','8.000',1,3,1,1),(3,'2022-07-11 21:44:43.029307','2022-07-11 22:24:52.509998','20.010',1,5,1,1),(4,'2022-07-11 22:31:58.636458','2022-07-11 22:33:09.665101','16.000',1,6,1,1),(5,'2022-07-11 22:38:53.053455','2022-07-11 22:39:48.403123','11.000',1,7,1,1),(6,'2022-07-11 22:59:24.048898','2022-07-11 22:59:53.664173','20',1,8,1,1),(7,'2022-07-11 23:18:23.422913','2022-07-11 23:22:21.179514','15.250',1,9,1,1),(8,'2022-07-12 00:17:13.994134','2022-07-12 00:17:13.994159','NSP',1,11,0,0),(9,'2022-07-12 00:23:50.056168','2022-07-12 00:23:50.056197','NSP',1,12,0,0),(10,'2022-07-12 00:26:10.888155','2022-07-12 00:26:10.888183','NSP',1,13,0,0),(11,'2022-07-12 00:38:58.395670','2022-07-12 00:39:23.694163','16.000',1,15,1,1);
/*!40000 ALTER TABLE `app_examen_estudiante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_examen_grupo`
--

DROP TABLE IF EXISTS `app_examen_grupo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_examen_grupo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `finalizado` tinyint(1) DEFAULT NULL,
  `id_examen_id` bigint(20) NOT NULL,
  `id_grupo_academico_id` bigint(20) NOT NULL,
  `permitir_blancos` tinyint(1) NOT NULL,
  `puntaje_blanco` decimal(5,2) NOT NULL,
  `puntaje_correcto` decimal(5,2) NOT NULL,
  `puntaje_errado` decimal(5,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `app_examen_grupo_id_grupo_academico_i_f2883cf8_fk_app_grupo` (`id_grupo_academico_id`),
  KEY `app_examen_grupo_id_examen_id_25a53a31_fk_app_examen_id` (`id_examen_id`),
  CONSTRAINT `app_examen_grupo_id_examen_id_25a53a31_fk_app_examen_id` FOREIGN KEY (`id_examen_id`) REFERENCES `app_examen` (`id`),
  CONSTRAINT `app_examen_grupo_id_grupo_academico_i_f2883cf8_fk_app_grupo` FOREIGN KEY (`id_grupo_academico_id`) REFERENCES `app_grupo_academico` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_examen_grupo`
--

LOCK TABLES `app_examen_grupo` WRITE;
/*!40000 ALTER TABLE `app_examen_grupo` DISABLE KEYS */;
INSERT INTO `app_examen_grupo` VALUES (1,'2022-06-15 18:21:10.135271','2022-06-15 18:22:40.116525',1,1,1,0,0.00,4.00,0.00),(2,'2022-06-15 18:21:11.014742','2022-06-15 18:21:11.014789',0,1,2,0,0.00,4.00,0.00),(5,'2022-06-21 23:04:38.642256','2022-06-30 18:31:05.559025',1,3,1,0,0.00,5.00,0.00),(6,'2022-06-21 23:04:38.716261','2022-06-21 23:04:38.716311',0,3,2,0,0.00,4.00,0.00),(7,'2022-06-22 14:36:47.807282','2022-06-22 15:02:14.215978',1,4,1,0,0.00,4.00,0.00),(8,'2022-06-22 14:36:47.896766','2022-06-22 14:36:47.896815',0,4,2,0,0.00,4.00,0.00),(9,'2022-07-11 21:36:58.312532','2022-07-11 21:43:35.786585',1,5,1,0,0.67,6.67,1.33),(10,'2022-07-11 21:36:58.515655','2022-07-11 21:36:58.515708',0,5,2,0,0.00,4.00,0.00),(11,'2022-07-11 22:30:37.512435','2022-07-11 22:31:42.962317',1,6,1,0,1.00,5.00,1.00),(12,'2022-07-11 22:30:37.740370','2022-07-11 22:30:37.740413',0,6,2,0,0.00,4.00,0.00),(13,'2022-07-11 22:38:18.336785','2022-07-11 22:38:40.129301',1,7,1,0,1.00,5.00,0.50),(14,'2022-07-11 22:38:18.531360','2022-07-11 22:38:18.531387',0,7,2,0,0.00,4.00,0.00),(15,'2022-07-11 22:58:31.166914','2022-07-11 22:59:15.111464',1,8,1,0,2.00,5.00,1.00),(16,'2022-07-11 22:58:31.244300','2022-07-11 22:58:31.244343',0,8,2,0,0.00,4.00,0.00),(17,'2022-07-11 23:17:44.856664','2022-07-11 23:18:14.327372',1,9,1,1,0.00,5.00,0.25),(18,'2022-07-11 23:17:44.931676','2022-07-11 23:17:44.931816',0,9,2,0,0.00,4.00,0.00),(19,'2022-07-11 23:26:03.327544','2022-07-11 23:26:16.108891',1,10,1,0,0.00,4.00,0.00),(20,'2022-07-11 23:26:03.448005','2022-07-11 23:26:03.448026',0,10,2,0,0.00,4.00,0.00),(21,'2022-07-12 00:04:33.331131','2022-07-12 00:16:51.463051',1,11,1,0,0.00,4.00,0.00),(22,'2022-07-12 00:04:33.417107','2022-07-12 00:04:33.417159',0,11,2,0,0.00,4.00,0.00),(23,'2022-07-12 00:22:30.002460','2022-07-12 00:23:00.809798',1,12,1,0,0.00,4.00,0.00),(24,'2022-07-12 00:22:30.071154','2022-07-12 00:22:30.071176',0,12,2,0,0.00,4.00,0.00),(25,'2022-07-12 00:25:17.159505','2022-07-12 00:25:38.433551',1,13,1,0,0.00,4.00,0.00),(26,'2022-07-12 00:25:17.394454','2022-07-12 00:25:17.394507',0,13,2,0,0.00,4.00,0.00),(27,'2022-07-12 00:29:47.138265','2022-07-12 00:30:16.802232',1,14,1,0,0.00,4.00,0.00),(28,'2022-07-12 00:29:47.211702','2022-07-12 00:29:47.211754',0,14,2,0,0.00,4.00,0.00),(29,'2022-07-12 00:38:18.849171','2022-07-12 00:38:41.294636',1,15,1,1,1.00,5.00,1.00),(30,'2022-07-12 00:38:19.086648','2022-07-12 00:38:19.086693',0,15,2,0,0.00,4.00,0.00);
/*!40000 ALTER TABLE `app_examen_grupo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_examen_grupo_estudiante`
--

DROP TABLE IF EXISTS `app_examen_grupo_estudiante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_examen_grupo_estudiante` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `ultima_pregunta` int(11) NOT NULL,
  `id_estudiante_id` bigint(20) NOT NULL,
  `id_examen_grupo_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `app_examen_grupo_est_id_estudiante_id_dd995cfc_fk_app_estud` (`id_estudiante_id`),
  KEY `app_examen_grupo_est_id_examen_grupo_id_2727f446_fk_app_exame` (`id_examen_grupo_id`),
  CONSTRAINT `app_examen_grupo_est_id_estudiante_id_dd995cfc_fk_app_estud` FOREIGN KEY (`id_estudiante_id`) REFERENCES `app_estudiante` (`id`),
  CONSTRAINT `app_examen_grupo_est_id_examen_grupo_id_2727f446_fk_app_exame` FOREIGN KEY (`id_examen_grupo_id`) REFERENCES `app_examen_grupo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_examen_grupo_estudiante`
--

LOCK TABLES `app_examen_grupo_estudiante` WRITE;
/*!40000 ALTER TABLE `app_examen_grupo_estudiante` DISABLE KEYS */;
/*!40000 ALTER TABLE `app_examen_grupo_estudiante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_examenciclo`
--

DROP TABLE IF EXISTS `app_examenciclo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_examenciclo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `id_ciclo_id` bigint(20) NOT NULL,
  `id_examen_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `app_examenciclo_id_ciclo_id_83459aab_fk_app_ciclo_id` (`id_ciclo_id`),
  KEY `app_examenciclo_id_examen_id_6f6c3578_fk_app_examen_id` (`id_examen_id`),
  CONSTRAINT `app_examenciclo_id_ciclo_id_83459aab_fk_app_ciclo_id` FOREIGN KEY (`id_ciclo_id`) REFERENCES `app_ciclo` (`id`),
  CONSTRAINT `app_examenciclo_id_examen_id_6f6c3578_fk_app_examen_id` FOREIGN KEY (`id_examen_id`) REFERENCES `app_examen` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_examenciclo`
--

LOCK TABLES `app_examenciclo` WRITE;
/*!40000 ALTER TABLE `app_examenciclo` DISABLE KEYS */;
INSERT INTO `app_examenciclo` VALUES (1,'2022-06-15 18:21:07.567049','2022-06-15 18:21:07.567098',1,1),(2,'2022-06-15 18:21:09.255380','2022-06-15 18:21:09.255430',2,1),(3,'2022-06-15 18:21:09.798763','2022-06-15 18:21:09.798807',3,1),(7,'2022-06-21 23:04:37.980942','2022-06-21 23:04:37.980991',1,3),(8,'2022-06-21 23:04:38.307849','2022-06-21 23:04:38.307900',2,3),(9,'2022-06-21 23:04:38.531598','2022-06-21 23:04:38.531646',3,3),(10,'2022-06-22 14:36:47.381759','2022-06-22 14:36:47.381803',1,4),(11,'2022-06-22 14:36:47.496236','2022-06-22 14:36:47.496284',2,4),(12,'2022-06-22 14:36:47.587788','2022-06-22 14:36:47.587836',3,4),(13,'2022-07-11 21:36:58.018901','2022-07-11 21:36:58.018946',1,5),(14,'2022-07-11 21:36:58.091648','2022-07-11 21:36:58.091695',2,5),(15,'2022-07-11 21:36:58.167414','2022-07-11 21:36:58.167464',3,5),(16,'2022-07-11 22:30:37.168282','2022-07-11 22:30:37.168328',1,6),(17,'2022-07-11 22:30:37.365946','2022-07-11 22:30:37.365996',2,6),(18,'2022-07-11 22:30:37.440476','2022-07-11 22:30:37.440526',3,6),(19,'2022-07-11 22:38:18.106246','2022-07-11 22:38:18.106292',1,7),(20,'2022-07-11 22:38:18.184511','2022-07-11 22:38:18.184562',2,7),(21,'2022-07-11 22:38:18.258928','2022-07-11 22:38:18.258978',3,7),(22,'2022-07-11 22:58:30.816773','2022-07-11 22:58:30.816812',1,8),(23,'2022-07-11 22:58:31.014604','2022-07-11 22:58:31.014657',2,8),(24,'2022-07-11 22:58:31.089606','2022-07-11 22:58:31.089657',3,8),(25,'2022-07-11 23:17:44.338543','2022-07-11 23:17:44.338595',1,9),(26,'2022-07-11 23:17:44.418554','2022-07-11 23:17:44.418607',2,9),(27,'2022-07-11 23:17:44.782007','2022-07-11 23:17:44.782060',3,9),(28,'2022-07-11 23:26:02.205513','2022-07-11 23:26:02.205531',1,10),(29,'2022-07-11 23:26:02.676460','2022-07-11 23:26:02.676511',2,10),(30,'2022-07-11 23:26:02.823802','2022-07-11 23:26:02.823823',3,10),(31,'2022-07-12 00:04:32.957589','2022-07-12 00:04:32.957637',1,11),(32,'2022-07-12 00:04:33.066254','2022-07-12 00:04:33.066576',2,11),(33,'2022-07-12 00:04:33.183771','2022-07-12 00:04:33.183824',3,11),(34,'2022-07-12 00:22:29.620156','2022-07-12 00:22:29.620203',1,12),(35,'2022-07-12 00:22:29.691653','2022-07-12 00:22:29.691703',2,12),(36,'2022-07-12 00:22:29.925327','2022-07-12 00:22:29.925375',3,12),(37,'2022-07-12 00:25:16.777405','2022-07-12 00:25:16.777452',1,13),(38,'2022-07-12 00:25:16.973858','2022-07-12 00:25:16.973970',2,13),(39,'2022-07-12 00:25:17.079863','2022-07-12 00:25:17.079903',3,13),(40,'2022-07-12 00:29:46.882651','2022-07-12 00:29:46.882701',1,14),(41,'2022-07-12 00:29:46.972612','2022-07-12 00:29:46.972665',2,14),(42,'2022-07-12 00:29:47.044236','2022-07-12 00:29:47.044287',3,14),(43,'2022-07-12 00:38:18.615723','2022-07-12 00:38:18.615776',1,15),(44,'2022-07-12 00:38:18.702862','2022-07-12 00:38:18.702912',2,15),(45,'2022-07-12 00:38:18.777438','2022-07-12 00:38:18.777488',3,15);
/*!40000 ALTER TABLE `app_examenciclo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_grupo_academico`
--

DROP TABLE IF EXISTS `app_grupo_academico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_grupo_academico` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `denominacion` varchar(40) NOT NULL,
  `abreviacion` varchar(10) NOT NULL,
  `descripcion` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_grupo_academico`
--

LOCK TABLES `app_grupo_academico` WRITE;
/*!40000 ALTER TABLE `app_grupo_academico` DISABLE KEYS */;
INSERT INTO `app_grupo_academico` VALUES (1,'2022-06-15 11:56:24.718270','2022-09-30 08:16:35.876856','Grupo A','A','Grupo academico A con cursos especializados para las carreras.'),(2,'2022-06-15 11:56:57.890405','2022-06-15 11:56:57.890458','Grupo B','B','Grupo B con cursos especializados para las carreras asociadas.');
/*!40000 ALTER TABLE `app_grupo_academico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_horario`
--

DROP TABLE IF EXISTS `app_horario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_horario` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `enlace_meet` varchar(200) DEFAULT NULL,
  `id_aula_id` bigint(20) NOT NULL,
  `id_ciclo_id` bigint(20) NOT NULL,
  `id_docente_id` bigint(20) NOT NULL,
  `id_padron_cursos_grupo_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `app_horario_id_padron_cursos_gru_f8655325_fk_app_padro` (`id_padron_cursos_grupo_id`),
  KEY `app_horario_id_aula_id_58ac3ebe_fk_app_aula_id` (`id_aula_id`),
  KEY `app_horario_id_ciclo_id_22140a66_fk_app_ciclo_id` (`id_ciclo_id`),
  KEY `app_horario_id_docente_id_d5eb5261_fk_app_docente_id` (`id_docente_id`),
  CONSTRAINT `app_horario_id_aula_id_58ac3ebe_fk_app_aula_id` FOREIGN KEY (`id_aula_id`) REFERENCES `app_aula` (`id`),
  CONSTRAINT `app_horario_id_ciclo_id_22140a66_fk_app_ciclo_id` FOREIGN KEY (`id_ciclo_id`) REFERENCES `app_ciclo` (`id`),
  CONSTRAINT `app_horario_id_docente_id_d5eb5261_fk_app_docente_id` FOREIGN KEY (`id_docente_id`) REFERENCES `app_docente` (`id`),
  CONSTRAINT `app_horario_id_padron_cursos_gru_f8655325_fk_app_padro` FOREIGN KEY (`id_padron_cursos_grupo_id`) REFERENCES `app_padron_cursos_grupo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_horario`
--

LOCK TABLES `app_horario` WRITE;
/*!40000 ALTER TABLE `app_horario` DISABLE KEYS */;
INSERT INTO `app_horario` VALUES (1,'2022-06-15 18:13:36.531769','2022-09-02 19:56:09.149364','https://meet.google.com/nrg-ytjj-oah',1,1,1,1),(2,'2022-09-02 19:56:24.955342','2022-09-02 19:56:24.955394','',1,1,1,1),(3,'2022-09-02 20:11:12.700178','2022-09-02 20:11:12.700229','',1,1,1,1),(4,'2022-09-30 08:28:32.445881','2022-09-30 08:28:32.445902','https://meet.google.com/ewh-dyhw-fmc',1,12,2,2),(5,'2022-10-09 23:14:59.206914','2022-10-09 23:14:59.206960',NULL,1,12,6,2),(6,'2022-10-09 23:20:12.350888','2022-10-09 23:20:12.350934',NULL,1,12,10,2),(7,'2022-10-09 23:23:19.040911','2022-10-09 23:23:19.040957',NULL,1,12,4,2);
/*!40000 ALTER TABLE `app_horario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_horario_curso`
--

DROP TABLE IF EXISTS `app_horario_curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_horario_curso` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `dia_dictado` varchar(15) NOT NULL,
  `hora_inicio` time(6) NOT NULL,
  `hora_fin` time(6) NOT NULL,
  `id_horario_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `app_horario_curso_id_horario_id_57f51cea_fk_app_horario_id` (`id_horario_id`),
  CONSTRAINT `app_horario_curso_id_horario_id_57f51cea_fk_app_horario_id` FOREIGN KEY (`id_horario_id`) REFERENCES `app_horario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_horario_curso`
--

LOCK TABLES `app_horario_curso` WRITE;
/*!40000 ALTER TABLE `app_horario_curso` DISABLE KEYS */;
INSERT INTO `app_horario_curso` VALUES (1,'2022-06-15 18:13:53.343868','2022-06-15 18:13:53.343897','LUN','07:00:00.000000','09:00:00.000000',1),(3,'2022-07-14 15:53:32.196822','2022-07-14 15:53:32.196877','VIE','07:00:00.000000','09:00:00.000000',1),(7,'2022-09-02 20:11:34.435187','2022-09-02 20:11:34.435239','LUN','12:00:00.000000','14:00:00.000000',3),(8,'2022-09-02 20:11:45.503810','2022-09-02 20:11:45.503862','MIE','12:00:00.000000','14:00:00.000000',3),(9,'2022-09-02 20:11:58.248869','2022-09-02 20:11:58.248922','VIE','12:00:00.000000','13:00:00.000000',3),(10,'2022-09-30 08:29:13.677495','2022-09-30 08:29:13.677535','LUN','11:00:00.000000','13:00:00.000000',4),(11,'2022-09-30 08:29:26.571490','2022-09-30 08:29:26.571542','MIE','11:00:00.000000','13:00:00.000000',4),(12,'2022-10-09 23:15:29.811462','2022-10-09 23:15:29.811511','LUN','09:00:00.000000','10:00:00.000000',5),(13,'2022-10-09 23:20:31.925120','2022-10-09 23:20:31.925162','JUE','11:00:00.000000','14:00:00.000000',6),(14,'2022-10-09 23:20:45.893415','2022-10-09 23:20:45.893451','MAR','11:00:00.000000','14:00:00.000000',6),(15,'2022-10-09 23:23:35.120866','2022-10-09 23:23:35.120919','LUN','14:00:00.000000','16:00:00.000000',7),(16,'2022-10-09 23:23:47.529912','2022-10-09 23:23:47.529957','MIE','14:00:00.000000','16:00:00.000000',7);
/*!40000 ALTER TABLE `app_horario_curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_inscripcion`
--

DROP TABLE IF EXISTS `app_inscripcion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_inscripcion` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `estado_finalizado` tinyint(1) NOT NULL,
  `id_compromiso_pago_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_compromiso_pago_id` (`id_compromiso_pago_id`),
  CONSTRAINT `app_inscripcion_id_compromiso_pago_i_87a598f3_fk_app_compr` FOREIGN KEY (`id_compromiso_pago_id`) REFERENCES `app_compromiso_pago` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_inscripcion`
--

LOCK TABLES `app_inscripcion` WRITE;
/*!40000 ALTER TABLE `app_inscripcion` DISABLE KEYS */;
INSERT INTO `app_inscripcion` VALUES (1,'2022-06-15 16:55:24.655614','2022-06-15 17:00:45.992470',1,1),(2,'2022-09-05 22:51:53.734762','2022-09-05 23:00:27.827333',1,10),(3,'2022-09-05 22:51:57.720441','2022-09-05 23:07:46.913702',1,11),(4,'2022-09-09 10:44:32.030855','2022-09-19 09:44:43.405537',1,21),(5,'2022-09-09 10:44:49.196074','2022-09-09 10:44:49.196119',0,17),(6,'2022-09-12 19:13:56.190275','2022-09-12 19:32:38.929035',1,30),(7,'2022-09-21 14:12:01.948497','2022-09-21 14:12:01.948524',0,47),(8,'2022-09-21 15:32:10.764424','2022-09-21 15:32:10.764451',0,49),(9,'2022-09-28 08:45:38.075652','2022-09-28 08:45:38.075677',0,51),(10,'2022-09-28 08:53:29.860453','2022-09-28 09:03:02.050614',1,52),(11,'2022-09-29 11:10:28.578892','2022-09-29 11:10:28.578918',0,53);
/*!40000 ALTER TABLE `app_inscripcion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_material_curso`
--

DROP TABLE IF EXISTS `app_material_curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_material_curso` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `descripcion_material` longtext NOT NULL,
  `enlace_recurso` varchar(200) DEFAULT NULL,
  `archivo_adjunto` varchar(100) DEFAULT NULL,
  `tipo_recurso` varchar(10) NOT NULL,
  `id_horario_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `app_material_curso_id_horario_id_ea57875c_fk_app_horario_id` (`id_horario_id`),
  CONSTRAINT `app_material_curso_id_horario_id_ea57875c_fk_app_horario_id` FOREIGN KEY (`id_horario_id`) REFERENCES `app_horario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_material_curso`
--

LOCK TABLES `app_material_curso` WRITE;
/*!40000 ALTER TABLE `app_material_curso` DISABLE KEYS */;
INSERT INTO `app_material_curso` VALUES (1,'2022-06-15 18:15:44.646106','2022-06-15 18:15:44.646154','Ficha','','materiales-curso/Fisica_A/descarga.jpg','RECURSO',1),(2,'2022-10-05 08:38:45.743983','2022-10-05 08:38:45.744034','Introducción a Física I, leer por favor para examen de ingreso a clases','','materiales-curso/FISICA_B/elevator_spesch_marketing.pptx','RECURSO',4);
/*!40000 ALTER TABLE `app_material_curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_pabellon`
--

DROP TABLE IF EXISTS `app_pabellon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_pabellon` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `codigo_pabellon` varchar(10) DEFAULT NULL,
  `nombre_pabellon` varchar(50) NOT NULL,
  `numero_pisos` int(10) unsigned DEFAULT NULL,
  `id_sede_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `app_pabellon_id_sede_id_63a167f2_fk_app_sede_id` (`id_sede_id`),
  CONSTRAINT `app_pabellon_id_sede_id_63a167f2_fk_app_sede_id` FOREIGN KEY (`id_sede_id`) REFERENCES `app_sede` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_pabellon`
--

LOCK TABLES `app_pabellon` WRITE;
/*!40000 ALTER TABLE `app_pabellon` DISABLE KEYS */;
INSERT INTO `app_pabellon` VALUES (1,'2022-06-15 00:16:51.154018','2022-09-30 08:21:46.424833','P-02','PABELLON 02',NULL,NULL),(2,'2022-06-15 00:16:51.295035','2022-09-30 08:21:46.478681','P-03','PABELLON 03',NULL,NULL),(3,'2022-06-15 00:16:51.378538','2022-09-30 08:21:46.545558','P-04','PABELLON 04',NULL,NULL),(4,'2022-06-15 00:16:51.648481','2022-09-30 08:21:46.603911','P-05','PABELLON 05',NULL,NULL),(5,'2022-06-15 00:16:51.731474','2022-09-30 08:21:46.671044','P-08','TALLER PROCESOS ALIMENTICIOS',NULL,NULL);
/*!40000 ALTER TABLE `app_pabellon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_padron_curso`
--

DROP TABLE IF EXISTS `app_padron_curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_padron_curso` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `nombre_curso` varchar(50) NOT NULL,
  `abreviacion` varchar(10) NOT NULL,
  `descripcion` longtext NOT NULL,
  `estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_padron_curso`
--

LOCK TABLES `app_padron_curso` WRITE;
/*!40000 ALTER TABLE `app_padron_curso` DISABLE KEYS */;
INSERT INTO `app_padron_curso` VALUES (1,'2022-06-15 11:15:51.026885','2022-09-05 22:00:42.097777','FISICA','FI','Curso de Fisica',1),(3,'2022-09-05 21:17:03.594758','2022-09-05 21:17:03.594796','QUIMICA','QM','',1),(4,'2022-09-05 21:17:17.876233','2022-09-05 21:17:17.876283','GEOMETRIA Y TRIGONOMETRIA','GTR','',1),(5,'2022-09-05 21:17:29.879439','2022-09-05 21:17:29.879490','ALGEBRA','AL','',1),(6,'2022-09-05 21:17:41.005827','2022-09-05 21:17:41.005883','ARITMETICA','AR','',1),(7,'2022-09-05 21:17:57.037833','2022-09-05 21:17:57.037866','COMPETENCIA COMUNICATIVA','CCM','',1),(8,'2022-09-05 21:18:49.681194','2022-09-05 21:18:49.681248','BIOLOGÍA','BIO','',1);
/*!40000 ALTER TABLE `app_padron_curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_padron_cursos_grupo`
--

DROP TABLE IF EXISTS `app_padron_cursos_grupo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_padron_cursos_grupo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `hora_semana` int(10) unsigned NOT NULL,
  `estado` tinyint(1) NOT NULL,
  `nro_preguntas_examen` int(10) unsigned DEFAULT NULL,
  `id_grupo_academico_id` bigint(20) NOT NULL,
  `id_padron_curso_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `app_padron_cursos_grupo_id_padron_curso_id_id_gr_a75b2c4c_uniq` (`id_padron_curso_id`,`id_grupo_academico_id`),
  KEY `app_padron_cursos_gr_id_grupo_academico_i_fe00326a_fk_app_grupo` (`id_grupo_academico_id`),
  CONSTRAINT `app_padron_cursos_gr_id_grupo_academico_i_fe00326a_fk_app_grupo` FOREIGN KEY (`id_grupo_academico_id`) REFERENCES `app_grupo_academico` (`id`),
  CONSTRAINT `app_padron_cursos_gr_id_padron_curso_id_950c3cb7_fk_app_padro` FOREIGN KEY (`id_padron_curso_id`) REFERENCES `app_padron_curso` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_padron_cursos_grupo`
--

LOCK TABLES `app_padron_cursos_grupo` WRITE;
/*!40000 ALTER TABLE `app_padron_cursos_grupo` DISABLE KEYS */;
INSERT INTO `app_padron_cursos_grupo` VALUES (1,'2022-06-15 11:57:11.421255','2022-07-12 00:38:40.645098',5,1,4,1,1),(2,'2022-06-15 11:57:32.150257','2022-07-11 23:26:37.438387',5,1,3,2,1),(3,'2022-09-05 21:23:50.548836','2022-09-05 21:23:50.548888',5,1,NULL,1,3),(4,'2022-09-05 21:24:14.494526','2022-09-05 21:24:14.494573',5,1,NULL,1,4),(5,'2022-09-05 21:24:33.502621','2022-09-05 21:24:33.502672',5,1,NULL,1,6),(6,'2022-09-05 21:24:43.561947','2022-09-05 21:24:43.561996',4,1,NULL,1,7);
/*!40000 ALTER TABLE `app_padron_cursos_grupo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_padron_documento_requisito`
--

DROP TABLE IF EXISTS `app_padron_documento_requisito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_padron_documento_requisito` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `estado` tinyint(1) NOT NULL,
  `nombre_documento` varchar(150) DEFAULT NULL,
  `descripcion` longtext,
  `documento` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_padron_documento_requisito`
--

LOCK TABLES `app_padron_documento_requisito` WRITE;
/*!40000 ALTER TABLE `app_padron_documento_requisito` DISABLE KEYS */;
INSERT INTO `app_padron_documento_requisito` VALUES (3,'2022-06-15 11:25:19.547074','2022-06-15 11:35:11.012808',1,'DNI','Copia de DNI fedatada','docrequisitos/VZ7ZJMZOSNGFPAC6453I7TWQ2M_0N52U2f.jpg'),(4,'2022-06-15 11:36:14.511903','2022-06-15 11:36:18.057594',1,'Constancia de Estudios','Copia fedateada de constancia de estudios.','docrequisitos/descarga_i3Glsia.jpg'),(5,'2022-09-12 18:32:30.982693','2022-09-12 18:33:14.185359',1,'Recibo de Caja','Recibo de Caja','docrequisitos/estudiar_idiomas_en_el_extranjero.jpg'),(6,'2022-09-28 08:29:42.120647','2022-09-28 08:29:57.872783',1,'foto','Fotografia de Alumno','');
/*!40000 ALTER TABLE `app_padron_documento_requisito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_pago`
--

DROP TABLE IF EXISTS `app_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_pago` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `nro_cuotas` int(10) unsigned NOT NULL,
  `tipo_colegio` varchar(10) NOT NULL,
  `monto_total` decimal(10,2) DEFAULT NULL,
  `id_ciclo_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `app_pago_id_id_ciclo_id_2253621d_uniq` (`id`,`id_ciclo_id`),
  KEY `app_pago_id_ciclo_id_ec4de195_fk_app_ciclo_id` (`id_ciclo_id`),
  CONSTRAINT `app_pago_id_ciclo_id_ec4de195_fk_app_ciclo_id` FOREIGN KEY (`id_ciclo_id`) REFERENCES `app_ciclo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_pago`
--

LOCK TABLES `app_pago` WRITE;
/*!40000 ALTER TABLE `app_pago` DISABLE KEYS */;
INSERT INTO `app_pago` VALUES (1,'2022-06-15 11:58:28.646499','2022-06-15 11:58:42.869692',1,'PR',600.00,1),(2,'2022-06-15 11:58:28.739027','2022-09-15 12:04:06.728302',1,'PU',500.00,1),(3,'2022-06-15 11:59:07.319530','2022-09-19 10:57:44.459471',2,'PR',500.00,1),(4,'2022-06-15 11:59:07.580864','2022-06-15 11:59:23.297205',2,'PU',600.00,1),(6,'2022-06-15 12:01:32.597113','2022-06-15 12:01:48.614330',1,'PU',500.00,2),(8,'2022-06-15 12:01:34.172417','2022-06-15 12:01:57.549481',2,'PU',600.00,2),(10,'2022-06-15 12:02:31.913224','2022-06-15 12:02:42.141894',1,'PU',500.00,3),(11,'2022-06-15 12:02:32.968502','2022-06-15 12:02:45.842500',2,'PR',700.00,3),(12,'2022-06-15 12:02:33.091079','2022-06-15 12:02:50.341423',2,'PU',600.00,3),(13,'2022-09-12 11:41:17.855941','2022-09-12 12:32:46.544681',1,'PR',100.00,5),(14,'2022-09-12 11:41:17.901927','2022-09-12 12:34:13.441425',1,'PU',120.00,5),(23,'2022-09-12 12:33:49.227493','2022-09-12 12:34:19.593339',2,'PR',240.00,5),(24,'2022-09-12 12:33:49.276780','2022-09-12 12:34:46.897239',2,'PU',650.00,5),(25,'2022-09-12 12:35:20.742507','2022-09-12 12:35:48.903795',3,'PR',250.00,5),(26,'2022-09-12 12:35:20.810413','2022-09-12 12:37:30.858115',3,'PU',300.00,5),(28,'2022-09-12 15:47:54.298855','2022-09-12 15:48:14.837353',1,'PU',100.00,6),(29,'2022-09-12 17:18:04.298918','2022-09-12 17:18:13.678809',1,'PR',2.00,7),(30,'2022-09-12 17:18:04.416058','2022-09-12 17:18:18.682477',1,'PU',2.00,7),(31,'2022-09-12 18:19:46.546367','2022-09-12 18:22:08.497566',1,'PR',400.00,8),(32,'2022-09-12 18:19:46.601390','2022-09-12 18:22:15.677850',1,'PU',300.00,8),(33,'2022-09-12 18:20:32.190797','2022-09-12 18:24:03.103508',2,'PR',420.00,8),(34,'2022-09-12 18:20:32.280332','2022-09-12 18:24:08.035544',2,'PU',320.00,8),(35,'2022-09-12 18:20:38.395208','2022-09-12 18:25:28.366778',3,'PR',450.00,8),(36,'2022-09-12 18:20:38.447427','2022-09-12 18:25:33.693747',3,'PU',350.00,8),(46,'2022-09-12 18:51:43.339772','2022-09-20 14:29:50.082230',1,'---',500.00,10),(52,'2022-09-12 18:52:30.461117','2022-09-12 18:52:41.550523',2,'PU',700.00,9),(67,'2022-09-19 12:01:54.852113','2022-09-19 12:01:54.852152',3,'PR',0.00,3),(83,'2022-09-19 23:46:59.544777','2022-09-19 23:46:59.544825',2,'PR',0.00,6),(109,'2022-09-20 14:25:30.114020','2022-09-20 14:26:11.308445',2,'---',700.00,10),(110,'2022-09-20 14:25:32.584049','2022-09-20 14:27:42.206760',1,'---',715.00,10),(113,'2022-09-20 15:55:04.018539','2022-09-20 15:55:38.424320',1,'---',500.00,11),(114,'2022-09-20 15:55:08.943042','2022-09-21 11:26:23.422347',2,'---',400.00,11),(115,'2022-09-21 00:18:31.785644','2022-09-21 00:18:31.785695',1,'---',0.00,8),(117,'2022-09-21 00:19:25.468235','2022-09-21 00:19:25.468286',1,'---',0.00,7),(118,'2022-09-21 08:11:27.233334','2022-09-21 08:11:45.442650',1,'---',500.00,4),(119,'2022-09-21 08:11:53.545227','2022-09-21 08:12:28.553098',3,'---',600.00,4),(120,'2022-09-28 08:18:06.313929','2022-09-28 08:21:29.918300',1,'---',500.00,12),(121,'2022-09-28 08:18:33.977050','2022-09-28 08:21:08.445799',2,'---',400.00,12);
/*!40000 ALTER TABLE `app_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_persona`
--

DROP TABLE IF EXISTS `app_persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_persona` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `dni` varchar(8) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellido_paterno` varchar(50) NOT NULL,
  `apellido_materno` varchar(50) NOT NULL,
  `sexo` varchar(5) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `lugar_nacimiento_id` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dni` (`dni`),
  KEY `app_persona_lugar_nacimiento_id_05bfd1bb_fk_app_ubige` (`lugar_nacimiento_id`),
  CONSTRAINT `app_persona_lugar_nacimiento_id_05bfd1bb_fk_app_ubige` FOREIGN KEY (`lugar_nacimiento_id`) REFERENCES `app_ubigeo` (`codigo_ubigeo`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_persona`
--

LOCK TABLES `app_persona` WRITE;
/*!40000 ALTER TABLE `app_persona` DISABLE KEYS */;
INSERT INTO `app_persona` VALUES (1,'2022-06-15 16:22:14.461875','2022-09-02 17:52:04.931428','40065708','RENAN FERDINAND','LEVA','SALAS','M','1998-08-14','080301'),(2,'2022-08-29 16:49:30.751641','2022-10-09 23:35:35.757072','72712946','FERNANDO RAFAEL','CALLA','YARIHUAMAN','M','1999-07-27','080101'),(3,'2022-08-30 11:35:48.207292','2022-08-30 11:37:56.981492','46222007','ELIZABETH CRISTINA','ABANTO','CARMEN','F','1999-01-01','080106'),(4,'2022-08-30 11:48:07.808302','2022-08-30 11:49:16.438502','42413796','LLANETH','ACOSTA','MONTOYA DE GUTIERREZ','F','1999-01-01','080101'),(5,'2022-08-30 11:52:20.366159','2022-08-30 11:53:40.672708','47478285','JOSÉ EDGARDO','ACUÑA','MARRUFO','M','1999-01-01','080101'),(6,'2022-08-30 12:01:03.897656','2022-08-30 12:02:12.491769','43346228','CECY LUCY','AGUILAR','CORONADO','F','1999-01-01','080101'),(7,'2022-08-30 12:05:28.899371','2022-08-30 12:06:43.314033','77341568','AYDEE','AGUINAGA','ARRASCUE','F','1999-01-01','080101'),(8,'2022-08-30 12:20:04.364058','2022-08-30 12:21:01.500153','44729740','LUPITA KRISTAL','ALCANTARA','HEREDIA','F','1999-01-01','080101'),(9,'2022-08-30 12:22:25.151840','2022-08-30 12:23:42.684991','77144690','JOSE WALTER','ALTAMIRANO','CORONEL','M','1999-01-01','080101'),(10,'2022-08-30 12:27:02.076953','2022-08-30 12:34:13.307025','72278655','MIRELY SULMARITA','ALVARADO','RISCO','F','1999-01-01','080101'),(12,'2022-09-05 21:31:13.802655','2022-09-05 21:32:48.766339','70214206','CARMEN MARIA ELENA','RELAIZA','SALCEDO','F','2001-01-01','080401'),(13,'2022-09-05 21:39:20.174265','2022-09-05 21:41:58.504839','47667807','EDWIN','RAMON','HUAMAN','M','2001-01-01','080101'),(14,'2022-09-08 15:09:01.582004','2022-09-08 15:13:35.177915','80180301','CAROLINA','CAYO','BUSTINZA','F','2003-05-28','081301'),(15,'2022-09-08 15:36:03.250312','2022-09-08 16:26:07.491907','41844870','EDITH ELIZABETH','ALFARO','GONZALES','F','1983-01-19','230101'),(16,'2022-09-08 15:59:06.370903','2022-09-08 16:01:50.240041','80402533','ADRIANA PATRICIA','CHAPARRO','BUSTINZA','F','2000-04-20','080902'),(17,'2022-09-09 00:50:04.039046','2022-09-09 01:04:02.753820','66334124','ALLISON','HUANCA','PALERMO','F','2001-01-01','080102'),(18,'2022-09-09 01:06:39.513788','2022-09-09 01:07:16.751173','66234341','Carla','AYMA','ROJAS','F','2001-01-01','110303'),(19,'2022-09-09 01:14:49.901226','2022-09-09 01:15:30.320389','41083122','GIULIANA KAREN','GUEVARA','SALVATIERRA','M','2001-01-01','060304'),(20,'2022-09-09 09:23:17.523775','2022-09-13 08:57:24.163416','41443959','Paco Wilson','MARCONI','Quispe','M','1981-12-19','210201'),(21,'2022-09-09 09:26:41.258015','2022-09-09 09:28:12.300649','48317359','IHELIN DIONE','PIMENTEL','LUQUE','F','1994-05-25','080104'),(22,'2022-09-09 09:54:54.337187','2022-09-09 09:57:02.209664','45806372','DIONE','CANAYO','MACUYAMA','F','2000-01-01','080901'),(23,'2022-09-09 10:22:26.976778','2022-09-09 10:22:59.529433','74119320','MIRELI','HERNANDEZ','VASQUEZ','F','2001-01-01','040201'),(24,'2022-09-09 10:22:54.059710','2022-09-09 10:24:00.824098','42334595','CLAUDIA DIONE','AIVAR','DEL PINO','F','2000-01-01','080908'),(25,'2022-09-09 11:34:36.266218','2022-09-09 11:38:15.807451','88423122','JUAN','Mariscal','Acuña','M','2001-01-01','150114'),(26,'2022-09-12 11:39:41.769737','2022-09-12 19:00:31.117946','23975001','ROGER','NUÑEZ','VALDEZ','M','2000-01-01','081002'),(27,'2022-09-12 15:46:33.489130','2022-09-12 15:49:31.914894','41385381','JOSE MARIA','ESPINOZA','BUENO','M','2000-02-01','090202'),(28,'2022-09-12 15:54:45.847036','2022-09-12 15:55:37.700736','40521248','RUDMERY','SALAS','DAVILA','F','2000-01-01','100307'),(29,'2022-09-12 16:19:16.028026','2022-09-12 16:20:34.655391','40521240','WELFINA','RAMOS','DE LA CRUZ','F','2001-01-01','080602'),(30,'2022-09-12 17:20:18.383716','2022-09-20 18:16:36.041958','09956256','ARTURO','MIRANDA','VERA','M','1990-01-01','030712'),(31,'2022-09-12 17:24:22.508742','2022-09-12 19:01:30.168716','40525871','JOSE LUIS','SEQUEIROS','MEDINA','M','1979-12-12','050101'),(32,'2022-09-12 17:39:36.366334','2022-09-12 17:40:16.438572','23992236','DENNYS','ORDOÑEZ','PALOMINO','M','1990-01-01','130402'),(33,'2022-09-12 17:58:25.358993','2022-09-12 18:00:44.775242','44650559','ROSA ELENA','TORRES','HUAMAN','F','1986-09-25','030712'),(34,'2022-09-12 18:35:08.461152','2022-09-21 11:15:58.806277','40402927','JESSI CELEDONIO','BUSTAMANTE','RODRIGUEZ','M','1979-12-28','050101'),(35,'2022-09-13 19:24:57.821197','2022-09-20 19:05:57.919396','71497535','FIORELA KATHERINE','NUÑEZ','PEREZ','F','2001-01-01','090202'),(36,'2022-09-13 21:39:06.128427','2022-09-13 21:39:06.128463','33589102','JANETTE ALBINA','QUISPE','PEREZ','M','2001-01-01',NULL),(37,'2022-09-20 16:46:30.283523','2022-09-20 17:30:53.470562','32138720','SANDRA FLORENCIA','CHANG','RONDAN','F','2000-01-01','100202'),(38,'2022-09-20 17:38:28.733578','2022-09-20 17:39:03.930921','40521255','ELIZABETH','LUCERO','TRILLO','F','2000-01-01','100202'),(39,'2022-09-20 18:18:25.361539','2022-09-20 18:20:31.041996','25062750','VICENTE','NUÑEZ','GUZMAN','M','1990-09-07','081002'),(40,'2022-09-20 18:32:55.808959','2022-09-20 18:34:05.996464','45503974','NANCY MAGALY','EURIBE','BLAS','F','2001-01-01','100203'),(41,'2022-09-20 19:07:12.902495','2022-09-20 19:17:47.166599','46290130','VIRGINIA SELENE','MIRANDA','CABRERA','F','2000-01-01',NULL),(42,'2022-09-20 19:31:00.533007','2022-09-20 19:33:23.263940','73182345','MAYRA ALEJANDRA','PISFIL','SALINAS','M','2000-01-01','100313'),(43,'2022-09-21 08:36:15.886942','2022-09-21 08:36:15.886975','44556677','JOSEFA','VASQUEZ','DOMINGUEZ','F','0001-01-01',NULL),(44,'2022-09-21 08:43:41.239873','2022-09-21 09:02:17.181854','72712947','FRANCO JHAMITH','HURTADO','ARCOS','M','2001-01-01','080101'),(45,'2022-09-21 09:08:56.262502','2022-09-21 09:10:12.805875','72712948','JAIV','SANCHEZ','TACO','M','2001-01-01','080101'),(46,'2022-09-21 10:58:52.731017','2022-09-21 10:59:30.852656','44556688','KARINA','ATUNGA','DIAZ','F','2000-11-09','120206'),(47,'2022-09-21 11:07:34.548646','2022-09-21 11:09:06.190776','47619990','LEIDY YULIANA','ARIAS','RIVERA','F','1988-11-04','080101'),(48,'2022-09-21 11:32:49.503499','2022-09-21 11:34:13.248976','76327834','ARACELI','MITMA','CARRION','F','2000-01-01','080914'),(49,'2022-09-21 12:22:37.512029','2022-09-21 12:25:15.035943','23970152','CELIA','CRUZ','COLLANTES DE BERNALDEZ','M','1980-01-01','080201'),(50,'2022-09-21 15:21:50.297894','2022-09-21 15:23:18.855601','61994755','LUZ CLARITA','GOMEZ','ROJAS','F','2000-01-01','080101'),(51,'2022-09-27 11:14:23.350463','2022-09-27 11:30:39.473350','42501258','JOSE ALBERTO','AVILES','GUTIERREZ','M','0001-01-01','130402'),(52,'2022-09-28 08:33:22.064693','2022-09-28 08:49:29.309275','73392290','MARIA FERNANDA','CABALLERO','ZEGARRA','F','2000-01-01','080101'),(53,'2022-09-28 08:50:48.073412','2022-09-28 08:51:51.420621','76265366','ALEXA MARIA FERNANDA','VILCHEZ','MEDINA','M','2001-01-01','080910'),(54,'2022-09-29 11:02:02.730783','2022-09-29 11:04:33.569324','47436764','ABEL FERNANDO','LUNA','PUMA','M','2000-01-01','080901');
/*!40000 ALTER TABLE `app_persona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_preguntas_examen_grupo`
--

DROP TABLE IF EXISTS `app_preguntas_examen_grupo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_preguntas_examen_grupo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `id_balota_curso_id` bigint(20) NOT NULL,
  `id_examen_grupo_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `app_preguntas_examen_gru_id_examen_grupo_id_id_ba_e58f6cf2_uniq` (`id_examen_grupo_id`,`id_balota_curso_id`),
  KEY `app_preguntas_examen_id_balota_curso_id_94d1c793_fk_app_balot` (`id_balota_curso_id`),
  CONSTRAINT `app_preguntas_examen_id_balota_curso_id_94d1c793_fk_app_balot` FOREIGN KEY (`id_balota_curso_id`) REFERENCES `app_balota_preguntas_curso` (`id`),
  CONSTRAINT `app_preguntas_examen_id_examen_grupo_id_b23428aa_fk_app_exame` FOREIGN KEY (`id_examen_grupo_id`) REFERENCES `app_examen_grupo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_preguntas_examen_grupo`
--

LOCK TABLES `app_preguntas_examen_grupo` WRITE;
/*!40000 ALTER TABLE `app_preguntas_examen_grupo` DISABLE KEYS */;
INSERT INTO `app_preguntas_examen_grupo` VALUES (1,'2022-06-15 18:22:34.443842','2022-06-15 18:22:34.443889',1,1),(2,'2022-06-21 23:05:02.360629','2022-06-21 23:05:02.360659',1,5),(3,'2022-06-21 23:05:02.476279','2022-06-21 23:05:02.476313',2,5),(4,'2022-06-21 23:05:02.886876','2022-06-21 23:05:02.886921',3,5),(5,'2022-06-21 23:05:03.039165','2022-06-21 23:05:03.039216',4,5),(6,'2022-06-22 15:00:21.872698','2022-06-22 15:00:21.872717',1,7),(7,'2022-06-22 15:00:21.992477','2022-06-22 15:00:21.992519',2,7),(8,'2022-06-22 15:00:22.117570','2022-06-22 15:00:22.117619',3,7),(9,'2022-07-11 21:42:35.948453','2022-07-11 21:42:35.948500',1,9),(10,'2022-07-11 21:42:36.022848','2022-07-11 21:42:36.022900',2,9),(11,'2022-07-11 21:42:42.223299','2022-07-11 21:42:42.223343',3,9),(12,'2022-07-11 22:31:33.039663','2022-07-11 22:31:33.039712',1,11),(13,'2022-07-11 22:31:33.129336','2022-07-11 22:31:33.129386',2,11),(14,'2022-07-11 22:31:33.196560','2022-07-11 22:31:33.196583',3,11),(15,'2022-07-11 22:31:33.402534','2022-07-11 22:31:33.402613',4,11),(16,'2022-07-11 22:38:33.224926','2022-07-11 22:38:33.224973',1,13),(17,'2022-07-11 22:38:33.315670','2022-07-11 22:38:33.315691',2,13),(18,'2022-07-11 22:38:33.563633','2022-07-11 22:38:33.563677',3,13),(19,'2022-07-11 22:38:33.661537','2022-07-11 22:38:33.661590',4,13),(20,'2022-07-11 22:59:13.240212','2022-07-11 22:59:13.240259',1,15),(21,'2022-07-11 22:59:13.322110','2022-07-11 22:59:13.322162',2,15),(22,'2022-07-11 22:59:13.404884','2022-07-11 22:59:13.404937',3,15),(23,'2022-07-11 22:59:13.480268','2022-07-11 22:59:13.480322',4,15),(24,'2022-07-11 23:17:56.325876','2022-07-11 23:17:56.325926',1,17),(25,'2022-07-11 23:17:56.412174','2022-07-11 23:17:56.412224',2,17),(26,'2022-07-11 23:17:56.487646','2022-07-11 23:17:56.487699',3,17),(27,'2022-07-11 23:17:56.563072','2022-07-11 23:17:56.563128',4,17),(28,'2022-07-11 23:26:15.738114','2022-07-11 23:26:15.738146',1,19),(29,'2022-07-11 23:26:15.843698','2022-07-11 23:26:15.843744',2,19),(30,'2022-07-11 23:26:15.918957','2022-07-11 23:26:15.919007',3,19),(31,'2022-07-11 23:26:16.041568','2022-07-11 23:26:16.041621',4,19),(32,'2022-07-12 00:16:51.021468','2022-07-12 00:16:51.021512',1,21),(33,'2022-07-12 00:16:51.088670','2022-07-12 00:16:51.088694',4,21),(34,'2022-07-12 00:16:51.316770','2022-07-12 00:16:51.316798',2,21),(35,'2022-07-12 00:16:51.394167','2022-07-12 00:16:51.394218',3,21),(36,'2022-07-12 00:23:00.360425','2022-07-12 00:23:00.360463',3,23),(37,'2022-07-12 00:23:00.433421','2022-07-12 00:23:00.433465',2,23),(38,'2022-07-12 00:23:00.528490','2022-07-12 00:23:00.528510',4,23),(39,'2022-07-12 00:23:00.741904','2022-07-12 00:23:00.741947',1,23),(40,'2022-07-12 00:25:38.034178','2022-07-12 00:25:38.034198',1,25),(41,'2022-07-12 00:25:38.133639','2022-07-12 00:25:38.133682',4,25),(42,'2022-07-12 00:25:38.213010','2022-07-12 00:25:38.213032',3,25),(43,'2022-07-12 00:25:38.287860','2022-07-12 00:25:38.287884',2,25),(44,'2022-07-12 00:30:16.101085','2022-07-12 00:30:16.101113',3,27),(45,'2022-07-12 00:30:16.334519','2022-07-12 00:30:16.334573',2,27),(46,'2022-07-12 00:30:16.493381','2022-07-12 00:30:16.493434',1,27),(47,'2022-07-12 00:30:16.626276','2022-07-12 00:30:16.626331',4,27),(48,'2022-07-12 00:38:40.874866','2022-07-12 00:38:40.874900',4,29),(49,'2022-07-12 00:38:40.949531','2022-07-12 00:38:40.949581',2,29),(50,'2022-07-12 00:38:41.018975','2022-07-12 00:38:41.018999',3,29),(51,'2022-07-12 00:38:41.227073','2022-07-12 00:38:41.227116',1,29);
/*!40000 ALTER TABLE `app_preguntas_examen_grupo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_preinscripcion`
--

DROP TABLE IF EXISTS `app_preinscripcion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_preinscripcion` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `estado` tinyint(1) NOT NULL,
  `idioma` varchar(30) DEFAULT NULL,
  `progreso_preinscripcion` smallint(6) DEFAULT NULL,
  `direccion` varchar(120) DEFAULT NULL,
  `esta_enviado` tinyint(1) DEFAULT NULL,
  `telefono_personal` varchar(15) DEFAULT NULL,
  `email_respaldo` varchar(254) DEFAULT NULL,
  `nombres_apoderado` varchar(200) DEFAULT NULL,
  `telefono_apoderado` varchar(12) DEFAULT NULL,
  `condicion_discapacidad` tinyint(1) NOT NULL,
  `detalle_discapacidad` varchar(100) DEFAULT NULL,
  `es_extranjero` tinyint(1) NOT NULL,
  `anio_egreso` int(10) unsigned DEFAULT NULL,
  `dni_persona_id` bigint(20) NOT NULL,
  `id_ciclo_id` bigint(20) NOT NULL,
  `id_colegio_id` bigint(20) DEFAULT NULL,
  `id_escuela_profesional_id` bigint(20) DEFAULT NULL,
  `id_pago_id` bigint(20) DEFAULT NULL,
  `id_ubigeo_id` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `app_preinscripcion_dni_persona_id_0278662f_fk_app_persona_id` (`dni_persona_id`),
  KEY `app_preinscripcion_id_ciclo_id_ed3ed86e_fk_app_ciclo_id` (`id_ciclo_id`),
  KEY `app_preinscripcion_id_colegio_id_920da244_fk_app_colegio_id` (`id_colegio_id`),
  KEY `app_preinscripcion_id_escuela_profesion_3e1cf7d1_fk_app_escue` (`id_escuela_profesional_id`),
  KEY `app_preinscripcion_id_pago_id_e2a65557_fk_app_pago_id` (`id_pago_id`),
  KEY `app_preinscripcion_id_ubigeo_id_93b10489_fk_app_ubige` (`id_ubigeo_id`),
  CONSTRAINT `app_preinscripcion_dni_persona_id_0278662f_fk_app_persona_id` FOREIGN KEY (`dni_persona_id`) REFERENCES `app_persona` (`id`),
  CONSTRAINT `app_preinscripcion_id_ciclo_id_ed3ed86e_fk_app_ciclo_id` FOREIGN KEY (`id_ciclo_id`) REFERENCES `app_ciclo` (`id`),
  CONSTRAINT `app_preinscripcion_id_colegio_id_920da244_fk_app_colegio_id` FOREIGN KEY (`id_colegio_id`) REFERENCES `app_colegio` (`id`),
  CONSTRAINT `app_preinscripcion_id_escuela_profesion_3e1cf7d1_fk_app_escue` FOREIGN KEY (`id_escuela_profesional_id`) REFERENCES `app_escuela_profesional` (`id`),
  CONSTRAINT `app_preinscripcion_id_pago_id_e2a65557_fk_app_pago_id` FOREIGN KEY (`id_pago_id`) REFERENCES `app_pago` (`id`),
  CONSTRAINT `app_preinscripcion_id_ubigeo_id_93b10489_fk_app_ubige` FOREIGN KEY (`id_ubigeo_id`) REFERENCES `app_ubigeo` (`codigo_ubigeo`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_preinscripcion`
--

LOCK TABLES `app_preinscripcion` WRITE;
/*!40000 ALTER TABLE `app_preinscripcion` DISABLE KEYS */;
INSERT INTO `app_preinscripcion` VALUES (1,'2022-06-15 16:22:14.688571','2022-06-15 16:51:28.631985',1,'ES',4,'Cusco',1,'999999999','renanfer14.ls@gmail.com','Fiorella Choque','921921921',1,'no veo',0,2014,1,1,3,3,4,'080101'),(2,'2022-08-29 16:49:30.947061','2022-08-30 11:33:18.473956',1,'ES',4,'Cusco',1,'920011083','fernandorafaelcallayarihuaman@gmail.com','','',0,'',0,2015,2,1,36,3,4,'080106'),(3,'2022-08-30 11:35:48.298387','2022-08-30 11:37:56.899116',1,'ES',4,'Cusco',1,'920011083','fernandorafaelcallayarihuaman@gmail.com','','',0,'',0,2015,3,1,22,1,4,'080106'),(4,'2022-08-30 11:48:08.002285','2022-08-30 11:49:16.368012',1,'ES',4,'Cusco',1,'920011083','fernandorafaelcallayarihuaman@gmail.com','','',0,'',0,2015,4,1,37,1,4,'080101'),(5,'2022-08-30 11:52:20.451403','2022-08-30 11:53:40.583139',1,'ES',4,'Cusco',1,'920011083','fernandorafaelcallayarihuaman@gmail.com','','',0,'',0,2015,5,1,36,4,4,'080101'),(6,'2022-08-30 12:01:04.053990','2022-08-30 12:02:12.415797',1,'ES',4,'Cusco',1,'920011083','fernandorafaelcallayarihuaman@gmail.com','','',0,'',0,2015,6,1,37,1,2,'080101'),(7,'2022-08-30 12:05:29.003457','2022-08-30 12:06:43.242193',1,'ES',4,'Cusco',1,'920011083','fernandorafaelcallayarihuaman@gmail.com','','',0,'',0,2015,7,1,44,2,2,'080101'),(8,'2022-08-30 12:20:04.566863','2022-08-30 12:21:01.415505',1,'ES',4,'Cusco',1,'999999999','fernandorafaelcallayarihuaman@gmail.com','','',0,'',0,2015,8,1,35,1,2,'080106'),(9,'2022-08-30 12:22:25.246756','2022-08-30 12:23:42.601272',1,'ES',4,'Cusco',1,'920011083','fernandorafaelcallayarihuaman@gmail.com','','',0,'',0,2015,9,1,40,1,2,'080101'),(10,'2022-08-30 12:27:02.354440','2022-08-30 12:34:13.247875',1,'ES',4,'Cusco',1,'920011083','fernandorafaelcallayarihuaman@gmail.com','','',0,'',0,2015,10,1,37,1,2,'080101'),(12,'2022-09-05 21:31:13.895098','2022-09-05 21:32:48.653386',1,'ES',4,'Cusco',1,'920011083','fernandorafaelcallayarihuaman@gmail.com','','',0,'',0,2016,12,3,37,4,12,'080601'),(13,'2022-09-05 21:39:20.242614','2022-09-05 21:41:58.434578',1,'ES',4,'Cusco',1,'920011083','fernandorafaelcallayarihuaman@gmail.com','','',0,'',0,2016,13,3,37,1,10,'080101'),(14,'2022-09-08 15:09:01.710508','2022-09-08 15:13:35.122256',1,'ES',4,'jr independencia 516',1,'923616628','aliqoraperusac@gmail.com','Jessi Bustamante','923616628',0,'',0,2020,14,1,102,1,2,'080901'),(15,'2022-09-08 15:36:03.396098','2022-09-08 15:37:35.777796',1,'ES',4,'Jr dos de mayo 407',1,'952013723','edithalg@gmail.com','Maria','952013723',0,'',0,1999,15,2,219,3,8,'080901'),(16,'2022-09-08 15:59:06.462929','2022-09-08 16:01:50.191107',1,'ES',4,'Papel pata sn',1,'923616628','aliqoraperusac@gmail.com','Jessi Bustamante','923616628',0,'',0,2016,16,1,102,1,2,'080902'),(17,'2022-09-08 16:25:20.131071','2022-09-08 16:26:07.169699',1,'ES',4,'Jr dos de mayo 407',1,'952013723','edithalg@gmail.com','dfsdf','952013723',0,'',0,1999,15,1,219,3,4,'080901'),(18,'2022-09-09 00:50:04.149660','2022-09-09 01:04:02.671836',1,'ES',4,'Av. San Juan de Dios',1,'900000000','admin@admin.com','','',0,'',0,2014,17,1,229,2,4,'100205'),(19,'2022-09-09 01:06:39.584167','2022-09-09 01:07:16.696682',1,'IN',4,'test street',1,'900000000','admin@admin.com','','',0,'',0,2014,18,1,238,1,3,'110301'),(20,'2022-09-09 01:14:49.951532','2022-09-09 01:15:30.252083',1,'ES',4,'test street',1,'978787803','renanfer14.ls@gmail.com','','',0,'',0,2014,19,1,244,4,4,'110206'),(21,'2022-09-09 09:23:17.593946','2022-09-09 09:23:17.593972',1,'ES',1,NULL,0,'989481513','paco.marconi@uniq.edu.pe','paco','989481513',0,'',0,NULL,20,1,NULL,NULL,NULL,NULL),(22,'2022-09-09 09:23:25.749910','2022-09-09 09:23:25.749960',1,'ES',1,NULL,0,'989481513','paco.marconi@uniq.edu.pe','paco','989481513',0,'',0,NULL,20,1,NULL,NULL,NULL,NULL),(23,'2022-09-09 09:23:28.108433','2022-09-09 09:23:28.108491',1,'ES',1,NULL,0,'989481513','paco.marconi@uniq.edu.pe','paco','989481513',0,'',0,NULL,20,1,NULL,NULL,NULL,NULL),(24,'2022-09-09 09:23:28.914392','2022-09-09 09:27:35.224190',1,'ES',4,'Edgar de la Torre 334 - Quillabamba',1,'989481513','paco.marconi@uniq.edu.pe','paco','989481513',0,'',0,1997,20,1,260,2,4,'080901'),(25,'2022-09-09 09:26:41.327270','2022-09-09 09:28:12.222578',1,'ES',4,'jr independencia 516',1,'923616628','aliqoraperusac@gmail.com','DIONE LUQUE','923616628',0,'',0,2018,21,1,271,1,2,'080905'),(26,'2022-09-09 09:54:54.398095','2022-09-09 09:54:54.398134',1,'ES',1,NULL,0,'987654321','aliqoraperusac@gmail.com','Dione Macayuma','987654321',0,'',0,NULL,22,1,NULL,NULL,NULL,NULL),(27,'2022-09-09 09:55:10.828874','2022-09-09 09:57:02.088865',1,'ES',4,'Jr Independencia Nº 116',1,'987654321','aliqoraperusac@gmail.com','Dione Macayuma','987654321',0,'',0,2016,22,1,279,1,4,'080901'),(28,'2022-09-09 10:22:27.047049','2022-09-09 10:22:59.480243',1,'IN',4,'Av. el sol 432',1,'978787803','renanfer14.ls@gmail.com','','',0,'',0,2014,23,1,289,1,4,'090302'),(29,'2022-09-09 10:22:54.127991','2022-09-09 10:24:00.776595',1,'ES',4,'Jr Independencia Nº 116',1,'987654321','aliqoraperusac@gmail.com','Claudia Del pino','987654321',0,'',0,2016,24,1,296,1,4,'080901'),(30,'2022-09-09 11:34:36.336231','2022-09-09 11:38:15.751623',1,'ES',3,'Av los Incas',0,'900000000','renanfer14.ls@gmail.com','','',0,'',0,2014,25,4,326,NULL,NULL,'140113'),(31,'2022-09-12 11:39:41.839290','2022-09-12 12:38:38.882643',1,'ES',4,'Jr Quillabamba',1,'984766303','rogernu@gmail.com','Renzo Nuñez Salas','984766303',0,'',0,2010,26,5,439,2,26,'080901'),(32,'2022-09-12 15:46:33.557088','2022-09-12 15:49:31.866391',1,'ES',4,'Jr Quillabamba',1,'987455632','soporte.investigacion@uniq.edu.pe','Padre','987455632',0,'',0,2010,27,6,452,2,28,'140202'),(33,'2022-09-12 15:54:45.905976','2022-09-12 15:55:37.651346',1,'IN',3,'Jr Quillabamba',0,'984766303','rogernu@gmail.com','','',0,'',0,2010,28,6,422,NULL,NULL,'130702'),(34,'2022-09-12 16:19:16.094911','2022-09-12 16:20:34.595177',1,'IN',4,'Jr Quillabamba',1,'984766303','rogernu@hotmail.com','Padre','984765023',0,'',0,2010,29,5,459,2,24,'080902'),(35,'2022-09-12 17:20:18.452394','2022-09-12 17:21:18.573249',1,'ES',4,'Jr Quillabamba',1,'949082712','amirandavera@gmail.com','Padre','949082712',0,'',0,2010,30,7,461,2,30,'080901'),(36,'2022-09-12 17:24:22.574755','2022-09-12 17:30:09.236255',1,'ES',4,'Jr. Pangoa n21',1,'922681458','jsequeirosmedina@gmail.com','','',0,'',0,1995,31,7,106,3,29,'080901'),(37,'2022-09-12 17:39:36.433996','2022-09-12 17:40:16.373534',1,'ES',4,'av ok 999',1,'967000998','user.89793238@gmail.com','Myself','999888777',0,'',0,1999,32,1,464,2,4,'170102'),(38,'2022-09-12 17:58:25.439979','2022-09-12 18:00:44.675750',1,'ES',4,'Jr. Huascar N° 231',1,'983715320','amirandavera@gmail.com','','',0,'',0,2002,33,7,461,3,30,'030101'),(39,'2022-09-12 18:34:57.188632','2022-09-12 19:41:06.723116',1,'ES',4,'Jr. Martín Pio Concha G-14',1,'949082712','amirandavera@gmail.com','','',0,'',0,1992,30,10,461,1,46,'080901'),(40,'2022-09-12 18:34:57.264146','2022-09-12 19:00:31.026217',1,'MA',4,'Jr Quillabamba',1,'984766303','rogernu@gmail.com','Renzo Nuñez Salas','984766303',0,'',0,2010,26,8,36,2,34,'080901'),(41,'2022-09-12 18:35:08.742432','2022-09-12 18:42:01.126434',1,'ES',3,'Jr Independencia Nº 116',0,'984709096','jessi.bustamante@hotmail.com','Elias Bustamante','984709096',0,'',0,1998,34,1,485,NULL,NULL,'080901'),(42,'2022-09-12 18:38:46.263893','2022-09-12 18:41:39.326859',1,'ES',3,'Jr. Pangoa n21',0,'922681458','jsequeirosmedina@gmail.com','','',0,'',0,1995,31,10,106,NULL,NULL,'080901'),(43,'2022-09-12 18:51:00.847491','2022-09-12 18:51:43.502131',1,'ES',3,'Jr. Pangoa n21',0,'922680458','jsequeirosmedina@gmail.com','','',0,'',0,1995,31,9,106,NULL,NULL,'080901'),(44,'2022-09-12 18:54:29.007915','2022-09-12 19:01:30.077485',1,'ES',4,'Jr. pangoa n21',1,'922681458','jsequeirosmedina@gmail.com','','',0,'',0,1995,31,8,106,1,36,'080901'),(45,'2022-09-12 18:54:32.167441','2022-09-12 18:55:26.665943',1,'ES',3,'Jr. Martín Pio Concha G-14',0,'949082712','amirandavera@gmail.com','','',0,'',0,1992,30,9,461,NULL,NULL,'080901'),(46,'2022-09-12 19:02:16.370959','2022-09-12 19:03:14.697075',1,'ES',4,'Jr Independencia Nº 116',1,'984709096','jessi.bustamante@hotmail.com','Elias Bustamante','984709096',0,'',0,1998,34,9,485,2,52,'080901'),(47,'2022-09-13 08:54:26.217981','2022-09-13 08:57:24.099742',1,'ES',4,'Edgar de la Torre 334 - Quillabamba',1,'989481513','paco.marconi@uniq.edu.pe','paco','989481513',0,'',0,1997,20,8,518,1,32,'010201'),(48,'2022-09-13 19:24:57.886848','2022-09-20 19:05:57.848228',1,'ES',3,'Cusco',0,'999999999','fernandorafaelcallayarihuaman@gmail.com','asd','999999999',1,'asd',0,2016,35,8,36,NULL,NULL,'080101'),(49,'2022-09-13 21:39:06.264646','2022-09-13 21:39:06.264698',1,'ES',1,NULL,0,'900000000','renanfer14.ls@gmail.com','','',0,'',0,NULL,36,9,NULL,NULL,NULL,NULL),(50,'2022-09-19 10:44:08.000773','2022-09-20 18:11:40.722782',1,'ES',3,'Jr. Martín Pio Concha G-14',0,'949082712','amirandavera@gmail.com','','',0,'',0,1992,30,8,461,NULL,NULL,'080901'),(51,'2022-09-20 16:00:06.883766','2022-09-20 16:21:32.431355',1,'ES',4,'Cusco',1,'920011083','fernandorafaelcallayarihuaman@gmail.com','','',0,'',0,2015,2,11,36,3,113,'080101'),(52,'2022-09-20 16:25:25.230864','2022-09-20 16:44:53.081008',1,'ES',4,'Av. el sol 432',1,'978787803','renanfer14.ls@gmail.com','','',0,'',0,2016,35,11,533,2,114,'080401'),(53,'2022-09-20 16:46:30.372040','2022-09-20 17:30:53.415905',1,'ES',4,'Av. el sol 432',1,'978787803','renanfer14.ls@gmail.com','','',0,'',0,2014,37,11,558,3,114,'120301'),(54,'2022-09-20 17:38:28.811459','2022-09-20 17:39:03.758308',1,'ES',3,'Jr Quillabamba',0,'984766303','rogernu@gmail.com','','',0,'',0,2010,38,8,422,NULL,NULL,'130501'),(55,'2022-09-20 18:13:42.391758','2022-09-20 18:16:35.984284',1,'ES',4,'Martin Pio Concha G-14',1,'949082712','amirandavera@gmail.com','','',0,'',0,1992,30,11,461,1,114,'080901'),(56,'2022-09-20 18:18:25.424419','2022-09-20 18:18:52.258470',1,'IN',3,'Jr Quillabamba',0,'984766303','rogernu@gmail.com','','',0,'',0,2010,39,8,423,NULL,NULL,'140113'),(57,'2022-09-20 18:20:01.381373','2022-09-20 18:20:30.975820',1,'IN',3,'Jr Quillabamba',0,'984766303','rogernu@gmail.com','','',0,'',0,2010,39,11,569,NULL,NULL,'081002'),(58,'2022-09-20 18:32:55.874480','2022-09-20 18:34:05.857530',1,'ES',4,'Av. el sol 432',1,'900000000','renanfer14.ls@gmail.com','','',0,'',0,2014,40,11,582,1,114,'130501'),(59,'2022-09-20 19:07:12.990514','2022-09-20 19:17:47.093452',1,'ES',4,'Av. el sol 432',1,'978787803','renanfer14.ls@gmail.com','','',0,'',0,2014,41,11,592,2,114,'080401'),(60,'2022-09-20 19:31:00.598629','2022-09-20 19:33:23.207737',1,'BO',4,'Av. el sol 432',1,'978787803','renanfer14.ls@gmail.com','','',0,'',0,2016,42,11,438,2,114,'150805'),(61,'2022-09-21 08:15:34.517614','2022-09-21 11:15:58.745803',1,'ES',1,NULL,0,'984709096','jessi.bustamante@gmail.com','Elias Bustamante','984709096',0,'',0,NULL,34,11,NULL,NULL,NULL,NULL),(62,'2022-09-21 08:33:16.523283','2022-09-21 08:33:16.523325',1,'ES',1,NULL,0,'984709096','jessi.bustamante@gmail.com','Elias Bustamante','',0,'',0,NULL,34,8,NULL,NULL,NULL,NULL),(63,'2022-09-21 08:36:15.957803','2022-09-21 08:36:15.957844',1,'IN',1,NULL,0,'999555888','aaaabbbb44556677@gmail.com','aaa bbb ccc','999888555',0,'',0,NULL,43,11,NULL,NULL,NULL,NULL),(64,'2022-09-21 08:43:41.316333','2022-09-21 09:02:16.944051',1,'ES',3,'URB. SANTA CATALINA AV. NICOLAS ARRIOLA 480',0,'920010204','fernandorafaelcallayarihuaman@gmail.com','Pedro Pablo','920011011',1,'problema en la vista',0,2016,44,11,36,NULL,NULL,'080101'),(65,'2022-09-21 08:49:35.177331','2022-09-21 08:49:35.177379',1,'ES',1,NULL,0,'999888777','aaaaaaaaaa@gmail.com','aaa bbb','999888555',0,'',0,NULL,43,8,NULL,NULL,NULL,NULL),(66,'2022-09-21 09:08:56.333158','2022-09-21 09:10:12.675475',1,'ES',4,'KIMBIRI',1,'920011010','laburro10@gmail.com','','',0,'',0,2016,45,11,39,1,113,'080101'),(67,'2022-09-21 10:58:52.805512','2022-09-21 10:59:30.790799',1,'IN',4,'aaaa',1,'999888777','aaaabbb@gmail.com','aaa','999888777',0,'',0,2020,46,8,602,1,115,'150509'),(68,'2022-09-21 11:07:34.626298','2022-09-21 11:09:05.872011',1,'ES',4,'jr mainique 405',1,'987654321','aliqoraperusac@gmail.com','Claudia Del pino','987654321',0,'',0,2002,47,11,609,2,114,'081301'),(69,'2022-09-21 11:32:49.630620','2022-09-21 11:34:13.173866',1,'ES',4,'Jr Independencia Nº 116',1,'987654321','aliqoraperusac@gmail.com','Claudia Del pino','987654321',0,'',0,2018,48,11,108,1,114,'080901'),(70,'2022-09-21 12:22:37.574629','2022-09-21 12:25:14.960282',1,'IN',4,'Jr Quillabamba',1,'984766303','rogernu@gmail.com','','',0,'',0,2010,49,11,625,1,113,'080201'),(71,'2022-09-21 15:21:50.369387','2022-09-21 15:23:18.793502',1,'ES',4,'jr mainique 405',1,'987654321','aliqoraperusac@gmail.com','Claudia Del pino','987654321',0,'',0,2019,50,11,637,1,114,'080908'),(72,'2022-09-27 11:14:23.463615','2022-09-27 11:30:39.413508',1,'IN',4,'Jr Quillabamba',1,'984766303','proyectotic@uniq.edu.pe','','',0,'',0,2010,51,11,678,2,114,'140113'),(73,'2022-09-28 08:33:22.123731','2022-09-28 08:35:01.627472',1,'ES',4,'Jr Independencia Nº 116',1,'987654321','jessi.bustamante@gmail.com','Claudia Del pino','987654321',0,'',0,2018,52,12,643,1,121,'080901'),(74,'2022-09-28 08:49:14.474060','2022-09-28 08:49:29.251367',1,'ES',2,'Jr Independencia Nº 116',0,'987654321','aliqoraperusac@gmail.com','Claudia Del pino','987654321',0,'',0,NULL,52,11,NULL,NULL,NULL,'180101'),(75,'2022-09-28 08:50:48.138147','2022-09-28 08:51:51.348554',1,'ES',4,'Jr Independencia Nº 116',1,'987654321','aliqoraperusac@gmail.com','Claudia Del pino','987654321',0,'',0,2019,53,12,105,1,120,'170101'),(76,'2022-09-29 11:02:02.891668','2022-09-29 11:04:33.508904',1,'ES',4,'Jr Independencia Nº 116',1,'987654321','jessi.bustamante@gmail.com','Claudia Del pino','987654321',0,'',1,2019,54,12,700,1,121,'080901'),(77,'2022-10-09 23:34:10.386279','2022-10-09 23:35:35.702407',1,'ES',4,'Calle Coquimbo 298 Santiago Cusco Cusco',1,'920011083','fernandoaelcallayarihuaman@gmail.com','','',0,'',0,2016,2,12,36,2,121,'080101');
/*!40000 ALTER TABLE `app_preinscripcion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_registro_tesoreria`
--

DROP TABLE IF EXISTS `app_registro_tesoreria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_registro_tesoreria` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `esta_pagado` tinyint(1) NOT NULL,
  `modalidad_pago` varchar(40) DEFAULT NULL,
  `fecha_pago` date DEFAULT NULL,
  `admin_id` bigint(20) DEFAULT NULL,
  `id_detalle_compromiso_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `app_registro_tesoreria_admin_id_e6d77f86_fk_app_administrador_id` (`admin_id`),
  KEY `app_registro_tesorer_id_detalle_compromis_668a208f_fk_app_detal` (`id_detalle_compromiso_id`),
  CONSTRAINT `app_registro_tesorer_id_detalle_compromis_668a208f_fk_app_detal` FOREIGN KEY (`id_detalle_compromiso_id`) REFERENCES `app_detalle_compromiso_de_pago` (`id`),
  CONSTRAINT `app_registro_tesoreria_admin_id_e6d77f86_fk_app_administrador_id` FOREIGN KEY (`admin_id`) REFERENCES `app_administrador` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_registro_tesoreria`
--

LOCK TABLES `app_registro_tesoreria` WRITE;
/*!40000 ALTER TABLE `app_registro_tesoreria` DISABLE KEYS */;
INSERT INTO `app_registro_tesoreria` VALUES (1,'2022-06-15 16:51:29.432602','2022-06-15 16:55:24.543977',1,'','2022-06-15',1,1),(2,'2022-06-15 16:51:29.694086','2022-08-29 16:56:37.686850',1,'','2022-08-29',1,2),(4,'2022-09-05 21:32:56.124935','2022-09-05 22:51:53.644623',1,'','2022-09-05',1,6),(5,'2022-09-05 21:32:56.433822','2022-09-05 21:32:56.433864',0,'',NULL,NULL,7),(6,'2022-09-05 21:42:10.906357','2022-09-05 22:51:57.608156',1,'','2022-09-05',1,8),(7,'2022-09-08 15:13:37.798342','2022-09-08 15:13:37.798365',0,'',NULL,NULL,9),(8,'2022-09-08 15:37:36.383853','2022-09-08 15:37:36.383878',0,'',NULL,NULL,10),(9,'2022-09-08 15:37:36.602831','2022-09-08 15:37:36.602859',0,'',NULL,NULL,11),(10,'2022-09-09 01:02:00.717452','2022-09-09 01:02:00.717472',0,'',NULL,NULL,12),(11,'2022-09-09 01:02:01.050894','2022-09-09 01:02:01.050937',0,'',NULL,NULL,13),(12,'2022-09-09 01:07:17.155888','2022-09-09 01:07:17.155929',0,'',NULL,NULL,14),(13,'2022-09-09 01:07:17.267991','2022-09-09 01:07:17.268011',0,'',NULL,NULL,15),(14,'2022-09-09 01:15:30.717874','2022-09-09 01:15:30.717918',0,'',NULL,NULL,16),(15,'2022-09-09 01:15:30.842807','2022-09-09 01:15:30.842846',0,'',NULL,NULL,17),(16,'2022-09-09 09:27:35.525059','2022-09-09 10:44:49.134631',1,'','2022-09-09',1,18),(17,'2022-09-09 09:27:35.803883','2022-09-09 09:27:35.803925',0,'',NULL,NULL,19),(18,'2022-09-09 09:28:13.148548','2022-09-09 09:28:13.148575',0,'',NULL,NULL,20),(19,'2022-09-09 09:57:06.913062','2022-09-09 09:57:06.913084',0,'',NULL,NULL,21),(20,'2022-09-09 09:57:07.634002','2022-09-09 09:57:07.634045',0,'',NULL,NULL,22),(21,'2022-09-09 10:23:01.607800','2022-09-09 10:23:01.607830',0,'',NULL,NULL,23),(22,'2022-09-09 10:23:01.798869','2022-09-09 10:23:01.798914',0,'',NULL,NULL,24),(23,'2022-09-09 10:24:03.583492','2022-09-09 10:44:39.783237',1,'','2022-09-09',1,25),(24,'2022-09-09 10:24:04.320190','2022-09-09 10:44:37.630929',1,'','2022-09-09',1,26),(25,'2022-09-12 12:38:40.237042','2022-09-12 12:38:40.237090',0,'',NULL,NULL,27),(26,'2022-09-12 12:38:40.353867','2022-09-12 12:38:40.353915',0,'',NULL,NULL,28),(27,'2022-09-12 12:38:40.468641','2022-09-12 12:38:40.468689',0,'',NULL,NULL,29),(28,'2022-09-12 15:49:33.728105','2022-09-12 15:49:33.728124',0,'',NULL,NULL,30),(29,'2022-09-12 16:20:36.546271','2022-09-12 16:20:36.546316',0,'',NULL,NULL,31),(30,'2022-09-12 16:20:36.654616','2022-09-12 16:20:36.654668',0,'',NULL,NULL,32),(31,'2022-09-12 17:21:19.255871','2022-09-12 17:21:19.255916',0,'',NULL,NULL,33),(32,'2022-09-12 17:30:10.332322','2022-09-12 17:30:10.332361',0,'',NULL,NULL,34),(33,'2022-09-12 17:40:17.194936','2022-09-12 17:40:17.194964',0,'',NULL,NULL,35),(34,'2022-09-12 17:40:17.591409','2022-09-12 17:40:17.591459',0,'',NULL,NULL,36),(35,'2022-09-12 18:00:47.479806','2022-09-12 18:00:47.479856',0,'',NULL,NULL,37),(36,'2022-09-12 19:00:31.799062','2022-09-12 19:00:31.799103',0,'',NULL,NULL,38),(37,'2022-09-12 19:00:32.323971','2022-09-12 19:00:32.324015',0,'',NULL,NULL,39),(38,'2022-09-12 19:01:30.949999','2022-09-12 19:22:54.928045',1,'','2022-09-12',1,40),(39,'2022-09-12 19:01:31.367882','2022-09-12 19:01:31.367909',0,'',NULL,NULL,41),(40,'2022-09-12 19:01:31.536005','2022-09-12 19:01:31.536052',0,'',NULL,NULL,42),(41,'2022-09-12 19:03:16.364674','2022-09-12 19:03:16.364695',0,'',NULL,NULL,43),(42,'2022-09-12 19:03:16.460424','2022-09-12 19:03:16.460583',0,'',NULL,NULL,44),(43,'2022-09-13 08:57:26.212154','2022-09-13 08:57:26.212194',0,'',NULL,NULL,45),(44,'2022-09-20 16:21:35.991592','2022-09-20 16:21:35.991613',0,'',NULL,NULL,46),(49,'2022-09-20 19:33:24.912491','2022-09-20 19:33:24.912542',0,'',NULL,NULL,51),(50,'2022-09-20 19:33:25.138816','2022-09-20 19:33:25.138863',0,'',NULL,NULL,52),(51,'2022-09-21 09:10:15.261876','2022-09-21 09:10:15.261896',0,'',NULL,NULL,53),(52,'2022-09-21 11:09:08.514809','2022-09-21 11:09:08.514835',0,'',NULL,NULL,54),(53,'2022-09-21 11:09:08.526599','2022-09-21 11:09:08.526616',0,'',NULL,NULL,55),(54,'2022-09-21 11:34:14.881124','2022-09-21 14:12:01.937108',1,'','2022-09-21',1,56),(55,'2022-09-21 11:34:14.892845','2022-09-21 11:34:14.892867',0,'',NULL,NULL,57),(56,'2022-09-21 12:25:16.768213','2022-09-21 12:25:16.768256',0,'',NULL,NULL,58),(57,'2022-09-21 15:23:20.485048','2022-09-21 15:32:10.751239',1,'','2022-09-21',1,59),(58,'2022-09-21 15:23:20.497672','2022-09-21 15:23:20.497689',0,'',NULL,NULL,60),(59,'2022-09-27 11:30:43.229442','2022-09-27 11:30:43.229481',0,'',NULL,NULL,61),(60,'2022-09-27 11:30:43.241324','2022-09-27 11:30:43.241345',0,'',NULL,NULL,62),(61,'2022-09-28 08:35:03.831121','2022-09-29 11:24:44.555816',1,'','2022-09-28',1,63),(62,'2022-09-28 08:35:03.843054','2022-09-28 08:35:03.843073',0,'',NULL,NULL,64),(63,'2022-09-28 08:51:53.330001','2022-09-28 08:53:29.849396',1,'','2022-09-28',1,65),(64,'2022-09-29 11:04:37.934068','2022-09-29 11:17:10.926091',1,'','2022-09-29',1,66),(65,'2022-09-29 11:04:37.945366','2022-09-29 11:04:37.945387',0,'',NULL,NULL,67),(66,'2022-10-09 23:35:38.402516','2022-10-09 23:35:38.402539',0,'',NULL,NULL,68),(67,'2022-10-09 23:35:38.409417','2022-10-09 23:35:38.409434',0,'',NULL,NULL,69);
/*!40000 ALTER TABLE `app_registro_tesoreria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_resultados_examen_estudiante`
--

DROP TABLE IF EXISTS `app_resultados_examen_estudiante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_resultados_examen_estudiante` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `letra_respuesta` varchar(1) DEFAULT NULL,
  `estado_respuesta` tinyint(1) DEFAULT NULL,
  `id_examen_estudiante_id` bigint(20) NOT NULL,
  `id_preguntas_examen_grupo_id` bigint(20) NOT NULL,
  `nota_respuesta` decimal(5,3) DEFAULT NULL,
  `nro_pregunta` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `app_resultados_exame_id_examen_estudiante_8424463f_fk_app_exame` (`id_examen_estudiante_id`),
  KEY `app_resultados_exame_id_preguntas_examen__f86da7a2_fk_app_pregu` (`id_preguntas_examen_grupo_id`),
  CONSTRAINT `app_resultados_exame_id_examen_estudiante_8424463f_fk_app_exame` FOREIGN KEY (`id_examen_estudiante_id`) REFERENCES `app_examen_estudiante` (`id`),
  CONSTRAINT `app_resultados_exame_id_preguntas_examen__f86da7a2_fk_app_pregu` FOREIGN KEY (`id_preguntas_examen_grupo_id`) REFERENCES `app_preguntas_examen_grupo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_resultados_examen_estudiante`
--

LOCK TABLES `app_resultados_examen_estudiante` WRITE;
/*!40000 ALTER TABLE `app_resultados_examen_estudiante` DISABLE KEYS */;
INSERT INTO `app_resultados_examen_estudiante` VALUES (1,'2022-06-15 18:39:41.985303','2022-06-15 18:39:41.985352',NULL,NULL,1,1,NULL,1),(2,'2022-06-15 18:39:49.038197','2022-06-15 18:39:49.038247',NULL,NULL,1,1,NULL,1),(3,'2022-06-15 18:41:01.231528','2022-06-15 18:41:01.231578',NULL,NULL,1,1,NULL,1),(4,'2022-06-15 18:49:18.109715','2022-06-15 18:49:18.109761',NULL,NULL,1,1,NULL,1),(5,'2022-06-15 18:50:11.166356','2022-06-15 18:50:11.166379',NULL,NULL,1,1,NULL,1),(6,'2022-06-21 23:06:56.863255','2022-06-21 23:07:02.479897','A',1,2,2,4.000,1),(7,'2022-06-21 23:06:56.938620','2022-06-21 23:07:13.980609','A',0,2,3,0.000,2),(8,'2022-06-21 23:06:57.167132','2022-06-21 23:07:17.934994','A',1,2,4,4.000,3),(9,'2022-06-21 23:06:57.327204','2022-06-21 23:07:20.379298','A',0,2,5,0.000,4),(10,'2022-07-11 21:44:55.899740','2022-07-11 21:45:00.194471','A',1,3,9,6.670,1),(11,'2022-07-11 21:44:56.022830','2022-07-11 21:45:05.467153','A',1,3,10,6.670,2),(12,'2022-07-11 21:44:56.094829','2022-07-11 22:24:52.436407','A',1,3,11,6.670,3),(13,'2022-07-11 22:32:57.877317','2022-07-11 22:33:00.985932','A',1,4,12,5.000,1),(14,'2022-07-11 22:32:57.963321','2022-07-11 22:33:04.601692','A',0,4,13,1.000,2),(15,'2022-07-11 22:32:58.038121','2022-07-11 22:33:07.161919','A',1,4,14,5.000,3),(16,'2022-07-11 22:32:58.109301','2022-07-11 22:33:09.533546','A',1,4,15,5.000,4),(17,'2022-07-11 22:39:38.174449','2022-07-11 22:39:40.771059','A',0,5,16,0.500,1),(18,'2022-07-11 22:39:38.250426','2022-07-11 22:39:43.143903','A',1,5,17,5.000,2),(19,'2022-07-11 22:39:38.321060','2022-07-11 22:39:45.113588','A',1,5,18,5.000,3),(20,'2022-07-11 22:39:38.532917','2022-07-11 22:39:48.323902','A',0,5,19,0.500,4),(21,'2022-07-11 22:59:41.666772','2022-07-11 22:59:45.228019','A',1,6,20,5.000,1),(22,'2022-07-11 22:59:41.739580','2022-07-11 22:59:48.570974','A',1,6,21,5.000,2),(23,'2022-07-11 22:59:41.796012','2022-07-11 22:59:50.602965','A',1,6,22,5.000,3),(24,'2022-07-11 22:59:41.974285','2022-07-11 22:59:53.581185','A',1,6,23,5.000,4),(25,'2022-07-11 23:22:05.153394','2022-07-11 23:22:09.408910','A',1,7,24,5.000,1),(26,'2022-07-11 23:22:05.339325','2022-07-11 23:22:13.442145','A',0,7,25,0.250,2),(27,'2022-07-11 23:22:05.429913','2022-07-11 23:22:17.548053','A',1,7,26,5.000,3),(28,'2022-07-11 23:22:05.767014','2022-07-11 23:22:21.094513','A',1,7,27,5.000,4),(29,'2022-07-12 00:39:14.953831','2022-07-12 00:39:17.934143','A',1,11,51,5.000,1),(30,'2022-07-12 00:39:15.043393','2022-07-12 00:39:19.907506','A',0,11,49,1.000,2),(31,'2022-07-12 00:39:15.119911','2022-07-12 00:39:21.841550','A',1,11,50,5.000,3),(32,'2022-07-12 00:39:15.188572','2022-07-12 00:39:23.465935','A',1,11,48,5.000,4);
/*!40000 ALTER TABLE `app_resultados_examen_estudiante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_sede`
--

DROP TABLE IF EXISTS `app_sede`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_sede` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `denominacion_sede` varchar(50) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `id_ubigeo_id` varchar(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `app_sede_id_ubigeo_id_50765033_fk_app_ubigeo_codigo_ubigeo` (`id_ubigeo_id`),
  CONSTRAINT `app_sede_id_ubigeo_id_50765033_fk_app_ubigeo_codigo_ubigeo` FOREIGN KEY (`id_ubigeo_id`) REFERENCES `app_ubigeo` (`codigo_ubigeo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_sede`
--

LOCK TABLES `app_sede` WRITE;
/*!40000 ALTER TABLE `app_sede` DISABLE KEYS */;
/*!40000 ALTER TABLE `app_sede` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_tabla_configuraciones`
--

DROP TABLE IF EXISTS `app_tabla_configuraciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_tabla_configuraciones` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `clave` varchar(100) DEFAULT NULL,
  `valor` varchar(100) DEFAULT NULL,
  `estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_tabla_configuraciones`
--

LOCK TABLES `app_tabla_configuraciones` WRITE;
/*!40000 ALTER TABLE `app_tabla_configuraciones` DISABLE KEYS */;
INSERT INTO `app_tabla_configuraciones` VALUES (8,'ruta_sistema','https://democepre.uniq.edu.pe/',1);
/*!40000 ALTER TABLE `app_tabla_configuraciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_ubigeo`
--

DROP TABLE IF EXISTS `app_ubigeo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_ubigeo` (
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `codigo_ubigeo` varchar(6) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `tipo_ubigeo` varchar(1) NOT NULL,
  PRIMARY KEY (`codigo_ubigeo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_ubigeo`
--

LOCK TABLES `app_ubigeo` WRITE;
/*!40000 ALTER TABLE `app_ubigeo` DISABLE KEYS */;
INSERT INTO `app_ubigeo` VALUES ('2022-06-15 13:43:09.991047','2022-06-15 13:43:09.991085','010000','Amazonas','D'),('2022-09-13 08:54:41.300763','2022-09-13 08:54:41.300789','010100','Chachapoyas','P'),('2022-09-13 08:54:41.360678','2022-09-13 08:54:41.360720','010200','Bagua','P'),('2022-09-13 08:54:44.453777','2022-09-13 08:54:44.453795','010201','Bagua','I'),('2022-09-13 08:54:44.503952','2022-09-13 08:54:44.503991','010202','Aramango','I'),('2022-09-13 08:54:44.561886','2022-09-13 08:54:44.561928','010203','Copallin','I'),('2022-09-13 08:54:44.620412','2022-09-13 08:54:44.620497','010204','El Parco','I'),('2022-09-13 08:54:44.671421','2022-09-13 08:54:44.671466','010205','Imaza','I'),('2022-09-13 08:54:44.728806','2022-09-13 08:54:44.728850','010206','La Peca','I'),('2022-09-13 08:54:41.401039','2022-09-13 08:54:41.401082','010300','Bongará','P'),('2022-09-13 08:54:41.443279','2022-09-13 08:54:41.443322','010400','Condorcanqui','P'),('2022-09-13 08:54:41.484295','2022-09-13 08:54:41.484339','010500','Luya','P'),('2022-09-13 08:54:41.526212','2022-09-13 08:54:41.526256','010600','Rodríguez de Mendoza','P'),('2022-09-13 08:54:41.567981','2022-09-13 08:54:41.568026','010700','Utcubamba','P'),('2022-06-15 13:43:10.221405','2022-06-15 13:43:10.221428','020000','Áncash','D'),('2022-06-22 14:23:18.357028','2022-06-22 14:23:18.357082','020100','Huaraz','P'),('2022-06-22 14:23:18.444505','2022-06-22 14:23:18.444555','020200','Aija','P'),('2022-06-22 14:23:40.036954','2022-06-22 14:23:40.037002','020201','Aija','I'),('2022-06-22 14:23:40.113620','2022-06-22 14:23:40.113648','020202','Coris','I'),('2022-06-22 14:23:40.181172','2022-06-22 14:23:40.181204','020203','Huacllan','I'),('2022-06-22 14:23:40.257987','2022-06-22 14:23:40.258032','020204','La Merced','I'),('2022-06-22 14:23:40.324240','2022-06-22 14:23:40.324280','020205','Succha','I'),('2022-06-22 14:23:18.519559','2022-06-22 14:23:18.519609','020300','Antonio Raymondi','P'),('2022-06-22 14:23:18.594862','2022-06-22 14:23:18.594912','020400','Asunción','P'),('2022-06-22 14:23:18.668263','2022-06-22 14:23:18.668294','020500','Bolognesi','P'),('2022-06-22 14:23:18.744273','2022-06-22 14:23:18.744316','020600','Carhuaz','P'),('2022-06-22 14:23:18.820202','2022-06-22 14:23:18.820252','020700','Carlos Fermín Fitzcarrald','P'),('2022-06-22 14:23:18.953662','2022-06-22 14:23:18.953710','020800','Casma','P'),('2022-06-22 14:23:19.028313','2022-06-22 14:23:19.028361','020900','Corongo','P'),('2022-06-22 14:23:19.128584','2022-06-22 14:23:19.128633','021000','Huari','P'),('2022-06-22 14:23:19.204054','2022-06-22 14:23:19.204104','021100','Huarmey','P'),('2022-06-22 14:23:19.278985','2022-06-22 14:23:19.279035','021200','Huaylas','P'),('2022-06-22 14:23:19.354655','2022-06-22 14:23:19.354704','021300','Mariscal Luzuriaga','P'),('2022-06-22 14:23:19.435048','2022-06-22 14:23:19.435091','021400','Ocros','P'),('2022-06-22 14:23:19.543878','2022-06-22 14:23:19.543927','021500','Pallasca','P'),('2022-06-22 14:23:19.619428','2022-06-22 14:23:19.619477','021600','Pomabamba','P'),('2022-06-22 14:23:19.727608','2022-06-22 14:23:19.727660','021700','Recuay','P'),('2022-06-22 14:23:19.802153','2022-06-22 14:23:19.802201','021800','Santa','P'),('2022-06-22 14:23:19.868913','2022-06-22 14:23:19.869009','021900','Sihuas','P'),('2022-06-22 14:23:19.936076','2022-06-22 14:23:19.936125','022000','Yungay','P'),('2022-06-15 13:43:10.423883','2022-06-15 13:43:10.423934','030000','Apurímac','D'),('2022-09-12 17:20:25.157125','2022-09-12 17:20:25.157179','030100','Abancay','P'),('2022-09-12 17:58:57.615646','2022-09-12 17:58:57.615687','030101','Abancay','I'),('2022-09-12 17:58:57.676715','2022-09-12 17:58:57.676767','030102','Chacoche','I'),('2022-09-12 17:58:57.735051','2022-09-12 17:58:57.735098','030103','Circa','I'),('2022-09-12 17:58:57.784336','2022-09-12 17:58:57.784361','030104','Curahuasi','I'),('2022-09-12 17:58:57.825777','2022-09-12 17:58:57.825798','030105','Huanipaca','I'),('2022-09-12 17:58:57.868864','2022-09-12 17:58:57.868893','030106','Lambrama','I'),('2022-09-12 17:58:57.927849','2022-09-12 17:58:57.927881','030107','Pichirhua','I'),('2022-09-12 17:58:57.979801','2022-09-12 17:58:57.979846','030108','San Pedro de Cachora','I'),('2022-09-12 17:58:58.030052','2022-09-12 17:58:58.030102','030109','Tamburco','I'),('2022-09-12 17:20:25.233337','2022-09-12 17:20:25.233384','030200','Andahuaylas','P'),('2022-09-12 17:20:25.290022','2022-09-12 17:20:25.290051','030300','Antabamba','P'),('2022-09-12 17:20:25.341551','2022-09-12 17:20:25.341595','030400','Aymaraes','P'),('2022-09-12 17:20:25.391667','2022-09-12 17:20:25.391714','030500','Cotabambas','P'),('2022-09-12 17:20:25.455925','2022-09-12 17:20:25.455964','030600','Chincheros','P'),('2022-09-12 17:20:25.507366','2022-09-12 17:20:25.507395','030700','Grau','P'),('2022-09-12 17:20:26.930681','2022-09-20 18:14:22.368750','030701','Chuquibambilla','I'),('2022-09-12 17:20:27.009491','2022-09-20 18:14:22.430667','030702','Curpahuasi','I'),('2022-09-12 17:20:27.067570','2022-09-20 18:14:22.478123','030703','Gamarra','I'),('2022-09-12 17:20:27.127807','2022-09-20 18:14:22.527977','030704','Huayllati','I'),('2022-09-12 17:20:27.227797','2022-09-20 18:14:22.578160','030705','Mamara','I'),('2022-09-12 17:20:27.286789','2022-09-20 18:14:22.636122','030706','Micaela Bastidas','I'),('2022-09-12 17:20:27.345105','2022-09-20 18:14:22.686736','030707','Pataypampa','I'),('2022-09-12 17:20:27.404082','2022-09-20 18:14:22.736149','030708','Progreso','I'),('2022-09-12 17:20:27.460710','2022-09-20 18:14:22.786473','030709','San Antonio','I'),('2022-09-12 17:20:27.525768','2022-09-20 18:14:22.836024','030710','Santa Rosa','I'),('2022-09-12 17:20:27.569634','2022-09-20 18:14:22.889826','030711','Turpay','I'),('2022-09-12 17:20:27.628399','2022-09-20 18:14:22.965036','030712','Vilcabamba','I'),('2022-09-12 17:20:27.687151','2022-09-20 18:14:23.011307','030713','Virundo','I'),('2022-09-12 17:20:27.745844','2022-09-20 18:14:23.061089','030714','Curasco','I'),('2022-06-15 13:43:10.632822','2022-06-15 13:43:10.632871','040000','Arequipa','D'),('2022-09-09 10:22:28.987991','2022-09-09 10:22:28.988014','040100','Arequipa','P'),('2022-09-20 16:25:44.702061','2022-09-20 16:25:44.702095','040101','Arequipa','I'),('2022-09-20 16:25:44.774667','2022-09-20 16:25:44.774709','040102','Alto Selva Alegre','I'),('2022-09-20 16:25:44.841115','2022-09-20 16:25:44.841160','040103','Cayma','I'),('2022-09-20 16:25:44.900390','2022-09-20 16:25:44.900438','040104','Cerro Colorado','I'),('2022-09-20 16:25:44.950763','2022-09-20 16:25:44.950811','040105','Characato','I'),('2022-09-20 16:25:45.000064','2022-09-20 16:25:45.000162','040106','Chiguata','I'),('2022-09-20 16:25:45.050389','2022-09-20 16:25:45.050435','040107','Jacobo Hunter','I'),('2022-09-20 16:25:45.100531','2022-09-20 16:25:45.100577','040108','La Joya','I'),('2022-09-20 16:25:45.150371','2022-09-20 16:25:45.150417','040109','Mariano Melgar','I'),('2022-09-20 16:25:45.200657','2022-09-20 16:25:45.200706','040110','Miraflores','I'),('2022-09-20 16:25:45.250464','2022-09-20 16:25:45.250510','040111','Mollebaya','I'),('2022-09-20 16:25:45.300241','2022-09-20 16:25:45.300364','040112','Paucarpata','I'),('2022-09-20 16:25:45.352169','2022-09-20 16:25:45.352217','040113','Pocsi','I'),('2022-09-20 16:25:45.408983','2022-09-20 16:25:45.409029','040114','Polobaya','I'),('2022-09-20 16:25:45.458993','2022-09-20 16:25:45.459041','040115','Quequeña','I'),('2022-09-20 16:25:45.508604','2022-09-20 16:25:45.508653','040116','Sabandia','I'),('2022-09-20 16:25:45.559239','2022-09-20 16:25:45.559284','040117','Sachaca','I'),('2022-09-20 16:25:45.609466','2022-09-20 16:25:45.609513','040118','San Juan de Siguas','I'),('2022-09-20 16:25:45.691284','2022-09-20 16:25:45.691331','040119','San Juan de Tarucani','I'),('2022-09-20 16:25:45.742469','2022-09-20 16:25:45.742515','040120','Santa Isabel de Siguas','I'),('2022-09-20 16:25:45.828520','2022-09-20 16:25:45.828569','040121','Santa Rita de Siguas','I'),('2022-09-20 16:25:45.875818','2022-09-20 16:25:45.875867','040122','Socabaya','I'),('2022-09-20 16:25:45.925764','2022-09-20 16:25:45.925813','040123','Tiabaya','I'),('2022-09-20 16:25:46.026452','2022-09-20 16:25:46.026500','040124','Uchumayo','I'),('2022-09-20 16:25:46.077672','2022-09-20 16:25:46.077721','040125','Vitor','I'),('2022-09-20 16:25:46.126281','2022-09-20 16:25:46.126325','040126','Yanahuara','I'),('2022-09-20 16:25:46.175905','2022-09-20 16:25:46.175955','040127','Yarabamba','I'),('2022-09-20 16:25:46.268116','2022-09-20 16:25:46.268166','040128','Yura','I'),('2022-09-20 16:25:46.318682','2022-09-20 16:25:46.318734','040129','José Luis Bustamante Y Rivero','I'),('2022-09-09 10:22:29.049912','2022-09-09 10:22:29.049959','040200','Camaná','P'),('2022-09-09 10:22:30.128569','2022-09-09 10:22:41.522892','040201','Camaná','I'),('2022-09-09 10:22:30.178496','2022-09-09 10:22:41.571946','040202','José María Quimper','I'),('2022-09-09 10:22:30.230964','2022-09-09 10:22:41.627636','040203','Mariano Nicolás Valcárcel','I'),('2022-09-09 10:22:30.288729','2022-09-09 10:22:41.671874','040204','Mariscal Cáceres','I'),('2022-09-09 10:22:30.398197','2022-09-09 10:22:41.731122','040205','Nicolás de Pierola','I'),('2022-09-09 10:22:30.456856','2022-09-09 10:22:41.805759','040206','Ocoña','I'),('2022-09-09 10:22:30.520433','2022-09-09 10:22:41.855678','040207','Quilca','I'),('2022-09-09 10:22:30.572896','2022-09-09 10:22:41.906140','040208','Samuel Pastor','I'),('2022-09-09 10:22:29.102582','2022-09-09 10:22:29.102627','040300','Caravelí','P'),('2022-09-09 10:22:29.161527','2022-09-09 10:22:29.161576','040400','Castilla','P'),('2022-09-09 10:22:29.219752','2022-09-09 10:22:29.219803','040500','Caylloma','P'),('2022-09-09 10:22:29.277867','2022-09-09 10:22:29.277914','040600','Condesuyos','P'),('2022-09-09 10:22:29.337035','2022-09-09 10:22:29.337086','040700','Islay','P'),('2022-09-09 10:22:29.395433','2022-09-09 10:22:29.395487','040800','La Uniòn','P'),('2022-06-15 13:43:10.740294','2022-06-15 13:43:10.740343','050000','Ayacucho','D'),('2022-09-12 17:24:28.929493','2022-09-12 17:24:28.929542','050100','Huamanga','P'),('2022-09-12 17:24:31.245897','2022-09-21 11:02:51.789457','050101','Ayacucho','I'),('2022-09-12 17:24:31.326519','2022-09-21 11:02:51.857837','050102','Acocro','I'),('2022-09-12 17:24:31.379258','2022-09-21 11:02:51.916028','050103','Acos Vinchos','I'),('2022-09-12 17:24:31.437975','2022-09-21 11:02:51.974484','050104','Carmen Alto','I'),('2022-09-12 17:24:31.533751','2022-09-21 11:02:52.057891','050105','Chiara','I'),('2022-09-12 17:24:31.588005','2022-09-21 11:02:52.133584','050106','Ocros','I'),('2022-09-12 17:24:31.646326','2022-09-21 11:02:52.247176','050107','Pacaycasa','I'),('2022-09-12 17:24:31.867082','2022-09-21 11:02:52.310002','050108','Quinua','I'),('2022-09-12 17:24:32.072224','2022-09-21 11:02:52.363522','050109','San José de Ticllas','I'),('2022-09-12 17:24:32.175623','2022-09-21 11:02:52.421892','050110','San Juan Bautista','I'),('2022-09-12 17:24:32.234109','2022-09-21 11:02:52.478277','050111','Santiago de Pischa','I'),('2022-09-12 17:24:32.351118','2022-09-21 11:02:52.538331','050112','Socos','I'),('2022-09-12 17:24:32.408940','2022-09-21 11:02:52.600168','050113','Tambillo','I'),('2022-09-12 17:24:32.491271','2022-09-21 11:02:52.659122','050114','Vinchos','I'),('2022-09-12 17:24:32.550641','2022-09-21 11:02:52.716951','050115','Jesús Nazareno','I'),('2022-09-12 17:24:32.609762','2022-09-21 11:02:52.775121','050116','Andrés Avelino Cáceres Dorregaray','I'),('2022-09-12 17:24:29.044405','2022-09-12 17:24:29.044502','050200','Cangallo','P'),('2022-09-12 17:24:29.104719','2022-09-12 17:24:29.104770','050300','Huanca Sancos','P'),('2022-09-12 17:24:29.163074','2022-09-12 17:24:29.163128','050400','Huanta','P'),('2022-09-12 17:24:29.221769','2022-09-12 17:24:29.221824','050500','La Mar','P'),('2022-09-12 17:24:29.280298','2022-09-12 17:24:29.280348','050600','Lucanas','P'),('2022-09-12 17:24:29.339143','2022-09-12 17:24:29.339198','050700','Parinacochas','P'),('2022-09-12 17:24:29.397529','2022-09-12 17:24:29.397583','050800','Pàucar del Sara Sara','P'),('2022-09-12 17:24:29.455467','2022-09-12 17:24:29.455559','050900','Sucre','P'),('2022-09-12 17:24:29.513868','2022-09-12 17:24:29.513921','051000','Víctor Fajardo','P'),('2022-09-12 17:24:29.580353','2022-09-12 17:24:29.580400','051100','Vilcas Huamán','P'),('2022-06-15 13:43:10.952743','2022-06-15 13:43:10.952792','060000','Cajamarca','D'),('2022-07-05 20:01:07.240444','2022-07-05 20:01:07.240497','060100','Cajamarca','P'),('2022-07-05 20:01:07.410399','2022-07-05 20:01:07.410454','060200','Cajabamba','P'),('2022-09-09 01:06:55.170556','2022-09-09 01:15:05.633298','060201','Cajabamba','I'),('2022-09-09 01:06:55.229356','2022-09-09 01:15:05.778151','060202','Cachachi','I'),('2022-09-09 01:06:55.320877','2022-09-09 01:15:05.942474','060203','Condebamba','I'),('2022-09-09 01:06:55.366066','2022-09-09 01:15:06.078900','060204','Sitacocha','I'),('2022-07-05 20:01:07.527086','2022-07-05 20:01:07.527113','060300','Celendín','P'),('2022-09-09 00:50:27.529435','2022-09-09 01:14:53.776681','060301','Celendín','I'),('2022-09-09 00:50:27.598756','2022-09-09 01:14:53.836395','060302','Chumuch','I'),('2022-09-09 00:50:27.656847','2022-09-09 01:14:53.886156','060303','Cortegana','I'),('2022-09-09 00:50:27.741293','2022-09-09 01:14:53.936652','060304','Huasmin','I'),('2022-09-09 00:50:27.895619','2022-09-09 01:14:53.986617','060305','Jorge Chávez','I'),('2022-09-09 00:50:27.957216','2022-09-09 01:14:54.036426','060306','José Gálvez','I'),('2022-09-09 00:50:28.036507','2022-09-09 01:14:54.086402','060307','Miguel Iglesias','I'),('2022-09-09 00:50:28.154251','2022-09-09 01:14:54.137470','060308','Oxamarca','I'),('2022-09-09 00:50:28.213908','2022-09-09 01:14:54.186516','060309','Sorochuco','I'),('2022-09-09 00:50:28.302657','2022-09-09 01:14:54.236806','060310','Sucre','I'),('2022-09-09 00:50:28.361334','2022-09-09 01:14:54.330323','060311','Utco','I'),('2022-09-09 00:50:28.425290','2022-09-09 01:14:54.393612','060312','La Libertad de Pallan','I'),('2022-07-05 20:01:07.662617','2022-07-05 20:01:07.662664','060400','Chota','P'),('2022-07-05 20:01:07.796092','2022-07-05 20:01:07.796140','060500','Contumazá','P'),('2022-07-05 20:01:07.930168','2022-07-05 20:01:07.930219','060600','Cutervo','P'),('2022-07-05 20:01:08.063383','2022-07-05 20:01:08.063479','060700','Hualgayoc','P'),('2022-07-05 20:01:08.196990','2022-07-05 20:01:08.197043','060800','Jaén','P'),('2022-07-05 20:01:08.330643','2022-07-05 20:01:08.330694','060900','San Ignacio','P'),('2022-07-05 20:01:08.463880','2022-07-05 20:01:08.463930','061000','San Marcos','P'),('2022-07-05 20:01:08.579232','2022-07-05 20:01:08.579433','061100','San Miguel','P'),('2022-07-05 20:01:08.721718','2022-07-05 20:01:08.721770','061200','San Pablo','P'),('2022-07-05 20:01:08.796294','2022-07-05 20:01:08.796342','061300','Santa Cruz','P'),('2022-06-15 13:43:11.081800','2022-06-15 13:43:11.081847','070000','Callao','D'),('2022-06-15 13:43:11.190239','2022-06-15 13:43:11.190288','080000','Cusco','D'),('2022-06-15 13:43:18.986200','2022-06-15 13:43:18.986250','080100','Cusco','P'),('2022-06-15 13:43:21.518622','2022-10-09 23:34:35.050969','080101','Cusco','I'),('2022-06-15 13:43:21.613531','2022-10-09 23:34:35.098712','080102','Ccorca','I'),('2022-06-15 13:43:21.721729','2022-10-09 23:34:35.148283','080103','Poroy','I'),('2022-06-15 13:43:21.830263','2022-10-09 23:34:35.209635','080104','San Jerónimo','I'),('2022-06-15 13:43:21.940131','2022-10-09 23:34:35.264830','080105','San Sebastian','I'),('2022-06-15 13:43:22.047578','2022-10-09 23:34:35.323659','080106','Santiago','I'),('2022-06-15 13:43:22.205804','2022-10-09 23:34:35.381845','080107','Saylla','I'),('2022-06-15 13:43:22.373109','2022-10-09 23:34:35.440305','080108','Wanchaq','I'),('2022-06-15 13:43:19.093855','2022-06-15 13:43:19.093905','080200','Acomayo','P'),('2022-09-21 12:22:44.277446','2022-09-21 12:23:00.568605','080201','Acomayo','I'),('2022-09-21 12:22:44.347905','2022-09-21 12:23:00.636574','080202','Acopia','I'),('2022-09-21 12:22:44.406095','2022-09-21 12:23:00.771708','080203','Acos','I'),('2022-09-21 12:22:44.464980','2022-09-21 12:23:00.898718','080204','Mosoc Llacta','I'),('2022-09-21 12:22:44.523253','2022-09-21 12:23:00.962447','080205','Pomacanchi','I'),('2022-09-21 12:22:44.581511','2022-09-21 12:23:01.040417','080206','Rondocan','I'),('2022-09-21 12:22:44.640167','2022-09-21 12:23:01.115050','080207','Sangarara','I'),('2022-06-15 13:43:19.224702','2022-06-15 13:43:19.224749','080300','Anta','P'),('2022-06-15 16:22:22.135188','2022-09-12 11:39:50.857258','080301','Anta','I'),('2022-06-15 16:22:22.440975','2022-09-12 11:39:50.936185','080302','Ancahuasi','I'),('2022-06-15 16:22:22.633538','2022-09-12 11:39:50.994415','080303','Cachimayo','I'),('2022-06-15 16:22:22.847674','2022-09-12 11:39:51.047461','080304','Chinchaypujio','I'),('2022-06-15 16:22:23.106839','2022-09-12 11:39:51.094997','080305','Huarocondo','I'),('2022-06-15 16:22:23.306380','2022-09-12 11:39:51.145442','080306','Limatambo','I'),('2022-06-15 16:22:23.514663','2022-09-12 11:39:51.195048','080307','Mollepata','I'),('2022-06-15 16:22:23.715109','2022-09-12 11:39:51.253448','080308','Pucyura','I'),('2022-06-15 16:22:24.057639','2022-09-12 11:39:51.303452','080309','Zurite','I'),('2022-06-15 13:43:19.368866','2022-06-15 13:43:19.368917','080400','Calca','P'),('2022-09-05 21:31:23.820732','2022-09-20 19:17:29.277484','080401','Calca','I'),('2022-09-05 21:31:23.894491','2022-09-20 19:17:29.336385','080402','Coya','I'),('2022-09-05 21:31:23.970167','2022-09-20 19:17:29.415268','080403','Lamay','I'),('2022-09-05 21:31:24.044815','2022-09-20 19:17:29.465809','080404','Lares','I'),('2022-09-05 21:31:24.119814','2022-09-20 19:17:29.515679','080405','Pisac','I'),('2022-09-05 21:31:24.194917','2022-09-20 19:17:29.582383','080406','San Salvador','I'),('2022-09-05 21:31:24.270667','2022-09-20 19:17:29.633487','080407','Taray','I'),('2022-09-05 21:31:24.345224','2022-09-20 19:17:29.688957','080408','Yanatile','I'),('2022-06-15 13:43:19.459271','2022-06-15 13:43:19.459311','080500','Canas','P'),('2022-06-15 13:43:19.543311','2022-06-15 13:43:19.543357','080600','Canchis','P'),('2022-09-05 21:31:28.682528','2022-09-20 19:31:57.987711','080601','Sicuani','I'),('2022-09-05 21:31:28.830912','2022-09-20 19:31:58.036792','080602','Checacupe','I'),('2022-09-05 21:31:28.930629','2022-09-20 19:31:58.086722','080603','Combapata','I'),('2022-09-05 21:31:29.006430','2022-09-20 19:31:58.137140','080604','Marangani','I'),('2022-09-05 21:31:29.081232','2022-09-20 19:31:58.186453','080605','Pitumarca','I'),('2022-09-05 21:31:29.222490','2022-09-20 19:31:58.235890','080606','San Pablo','I'),('2022-09-05 21:31:29.298180','2022-09-20 19:31:58.295282','080607','San Pedro','I'),('2022-09-05 21:31:29.373200','2022-09-20 19:31:58.344669','080608','Tinta','I'),('2022-06-15 13:43:19.634978','2022-06-15 13:43:19.635024','080700','Chumbivilcas','P'),('2022-09-12 12:37:48.350450','2022-09-12 12:37:48.350650','080701','Santo Tomas','I'),('2022-09-12 12:37:48.412336','2022-09-12 12:37:48.412378','080702','Capacmarca','I'),('2022-09-12 12:37:48.464068','2022-09-12 12:37:48.464136','080703','Chamaca','I'),('2022-09-12 12:37:48.511374','2022-09-12 12:37:48.511408','080704','Colquemarca','I'),('2022-09-12 12:37:48.554068','2022-09-12 12:37:48.554114','080705','Livitaca','I'),('2022-09-12 12:37:48.604663','2022-09-12 12:37:48.604714','080706','Llusco','I'),('2022-09-12 12:37:48.664158','2022-09-12 12:37:48.664209','080707','Quiñota','I'),('2022-09-12 12:37:48.714209','2022-09-12 12:37:48.714262','080708','Velille','I'),('2022-06-15 13:43:19.726917','2022-06-15 13:43:19.726962','080800','Espinar','P'),('2022-06-15 13:43:19.818597','2022-06-15 13:43:19.818642','080900','La Convención','P'),('2022-09-08 15:09:24.033145','2022-09-29 11:04:02.067807','080901','Santa Ana','I'),('2022-09-08 15:09:24.088956','2022-09-29 11:04:02.164500','080902','Echarate','I'),('2022-09-08 15:09:24.138194','2022-09-29 11:04:02.274975','080903','Huayopata','I'),('2022-09-08 15:09:24.238143','2022-09-29 11:04:02.409143','080904','Maranura','I'),('2022-09-08 15:09:24.290491','2022-09-29 11:04:02.533895','080905','Ocobamba','I'),('2022-09-08 15:09:24.350427','2022-09-29 11:04:02.683973','080906','Quellouno','I'),('2022-09-08 15:09:24.457199','2022-09-29 11:04:02.817739','080907','Kimbiri','I'),('2022-09-08 15:09:24.516375','2022-09-29 11:04:02.926835','080908','Santa Teresa','I'),('2022-09-08 15:09:24.575510','2022-09-29 11:04:03.075982','080909','Vilcabamba','I'),('2022-09-08 15:09:24.633619','2022-09-29 11:04:03.173882','080910','Pichari','I'),('2022-09-08 15:09:24.691657','2022-09-29 11:04:03.293895','080911','Inkawasi','I'),('2022-09-08 15:09:24.753998','2022-09-29 11:04:03.443453','080912','Villa Virgen','I'),('2022-09-08 15:09:24.864725','2022-09-29 11:04:03.576710','080913','Villa Kintiarina','I'),('2022-09-08 15:09:24.917003','2022-09-29 11:04:03.711184','080914','Megantoni','I'),('2022-06-15 13:43:19.985342','2022-06-15 13:43:19.985388','081000','Paruro','P'),('2022-09-12 18:36:48.780192','2022-09-20 18:20:24.553283','081001','Paruro','I'),('2022-09-12 18:36:48.841810','2022-09-20 18:20:24.624011','081002','Accha','I'),('2022-09-12 18:36:48.922787','2022-09-20 18:20:24.683707','081003','Ccapi','I'),('2022-09-12 18:36:48.968053','2022-09-20 18:20:24.741075','081004','Colcha','I'),('2022-09-12 18:36:49.016399','2022-09-20 18:20:24.799710','081005','Huanoquite','I'),('2022-09-12 18:36:49.066710','2022-09-20 18:20:24.858597','081006','Omacha','I'),('2022-09-12 18:36:49.117344','2022-09-20 18:20:24.916891','081007','Paccaritambo','I'),('2022-09-12 18:36:49.168359','2022-09-20 18:20:24.992016','081008','Pillpinto','I'),('2022-09-12 18:36:49.218904','2022-09-20 18:20:25.050013','081009','Yaurisque','I'),('2022-06-15 13:43:20.076926','2022-06-15 13:43:20.076972','081100','Paucartambo','P'),('2022-06-15 13:43:20.169731','2022-06-15 13:43:20.169783','081200','Quispicanchi','P'),('2022-06-15 13:43:20.294170','2022-06-15 13:43:20.294219','081300','Urubamba','P'),('2022-09-08 15:09:13.810314','2022-09-21 11:08:28.663411','081301','Urubamba','I'),('2022-09-08 15:09:13.872311','2022-09-21 11:08:28.732287','081302','Chinchero','I'),('2022-09-08 15:09:13.928986','2022-09-21 11:08:28.791316','081303','Huayllabamba','I'),('2022-09-08 15:09:14.021495','2022-09-21 11:08:28.849919','081304','Machupicchu','I'),('2022-09-08 15:09:14.079660','2022-09-21 11:08:28.908820','081305','Maras','I'),('2022-09-08 15:09:14.137925','2022-09-21 11:08:28.966214','081306','Ollantaytambo','I'),('2022-09-08 15:09:14.199594','2022-09-21 11:08:29.030493','081307','Yucay','I'),('2022-06-15 13:43:11.290551','2022-06-15 13:43:11.290602','090000','Huancavelica','D'),('2022-09-09 10:22:32.382232','2022-09-09 10:22:32.382259','090100','Huancavelica','P'),('2022-09-09 10:22:32.449739','2022-09-09 10:22:32.449785','090200','Acobamba','P'),('2022-09-12 15:46:42.658669','2022-09-20 19:05:47.679075','090201','Acobamba','I'),('2022-09-12 15:46:42.702550','2022-09-20 19:05:47.726783','090202','Andabamba','I'),('2022-09-12 15:46:42.747589','2022-09-20 19:05:47.825658','090203','Anta','I'),('2022-09-12 15:46:42.805491','2022-09-20 19:05:47.974728','090204','Caja','I'),('2022-09-12 15:46:42.855864','2022-09-20 19:05:48.085937','090205','Marcas','I'),('2022-09-12 15:46:42.905775','2022-09-20 19:05:48.218379','090206','Paucara','I'),('2022-09-12 15:46:42.957015','2022-09-20 19:05:48.428143','090207','Pomacocha','I'),('2022-09-12 15:46:43.006480','2022-09-20 19:05:48.538019','090208','Rosario','I'),('2022-09-09 10:22:32.666770','2022-09-09 10:22:32.666824','090300','Angaraes','P'),('2022-09-09 10:22:34.253333','2022-09-09 10:22:34.253360','090301','Lircay','I'),('2022-09-09 10:22:34.342751','2022-09-09 10:22:34.342800','090302','Anchonga','I'),('2022-09-09 10:22:34.393427','2022-09-09 10:22:34.393477','090303','Callanmarca','I'),('2022-09-09 10:22:34.443442','2022-09-09 10:22:34.443497','090304','Ccochaccasa','I'),('2022-09-09 10:22:34.492675','2022-09-09 10:22:34.492726','090305','Chincho','I'),('2022-09-09 10:22:34.543652','2022-09-09 10:22:34.543752','090306','Congalla','I'),('2022-09-09 10:22:34.593436','2022-09-09 10:22:34.593487','090307','Huanca-Huanca','I'),('2022-09-09 10:22:34.641968','2022-09-09 10:22:34.642012','090308','Huayllay Grande','I'),('2022-09-09 10:22:34.693619','2022-09-09 10:22:34.693661','090309','Julcamarca','I'),('2022-09-09 10:22:34.740697','2022-09-09 10:22:34.740730','090310','San Antonio de Antaparco','I'),('2022-09-09 10:22:34.810732','2022-09-09 10:22:34.810779','090311','Santo Tomas de Pata','I'),('2022-09-09 10:22:34.919362','2022-09-09 10:22:34.919417','090312','Secclla','I'),('2022-09-09 10:22:32.716773','2022-09-09 10:22:32.716826','090400','Castrovirreyna','P'),('2022-09-09 10:22:32.764738','2022-09-09 10:22:32.764790','090500','Churcampa','P'),('2022-09-09 10:22:32.814488','2022-09-09 10:22:32.814535','090600','Huaytará','P'),('2022-09-09 10:22:32.856898','2022-09-09 10:22:32.856949','090700','Tayacaja','P'),('2022-06-15 13:43:11.398561','2022-06-15 13:43:11.398610','100000','Huánuco','D'),('2022-09-09 00:50:16.968272','2022-09-09 00:50:16.968311','100100','Huánuco','P'),('2022-09-09 00:50:17.025088','2022-09-09 00:50:17.025133','100200','Ambo','P'),('2022-09-09 00:50:18.820871','2022-09-20 18:32:59.647869','100201','Ambo','I'),('2022-09-09 00:50:18.885817','2022-09-20 18:32:59.717334','100202','Cayna','I'),('2022-09-09 00:50:18.936063','2022-09-20 18:32:59.774522','100203','Colpas','I'),('2022-09-09 00:50:18.986482','2022-09-20 18:32:59.833843','100204','Conchamarca','I'),('2022-09-09 00:50:19.037006','2022-09-20 18:32:59.891882','100205','Huacar','I'),('2022-09-09 00:50:19.106572','2022-09-20 18:32:59.950000','100206','San Francisco','I'),('2022-09-09 00:50:19.159819','2022-09-20 18:33:00.107074','100207','San Rafael','I'),('2022-09-09 00:50:19.210181','2022-09-20 18:33:00.193323','100208','Tomay Kichwa','I'),('2022-09-09 00:50:17.097217','2022-09-09 00:50:17.097242','100300','Dos de Mayo','P'),('2022-09-12 11:42:53.507168','2022-09-20 19:31:04.130672','100301','La Unión','I'),('2022-09-12 11:42:53.564230','2022-09-20 19:31:04.240109','100307','Chuquis','I'),('2022-09-12 11:42:53.622695','2022-09-20 19:31:04.440943','100311','Marías','I'),('2022-09-12 11:42:53.680848','2022-09-20 19:31:04.565948','100313','Pachas','I'),('2022-09-12 11:42:53.739536','2022-09-20 19:31:04.712361','100316','Quivilla','I'),('2022-09-12 11:42:53.789132','2022-09-20 19:31:04.865795','100317','Ripan','I'),('2022-09-12 11:42:53.847842','2022-09-20 19:31:05.065523','100321','Shunqui','I'),('2022-09-12 11:42:53.897713','2022-09-20 19:31:05.191582','100322','Sillapata','I'),('2022-09-12 11:42:53.966399','2022-09-20 19:31:05.315492','100323','Yanas','I'),('2022-09-09 00:50:17.188358','2022-09-09 00:50:17.188379','100400','Huacaybamba','P'),('2022-09-09 00:50:17.230004','2022-09-09 00:50:17.230026','100500','Huamalíes','P'),('2022-09-09 00:50:17.330195','2022-09-09 00:50:17.330215','100600','Leoncio Prado','P'),('2022-09-09 00:50:17.399307','2022-09-09 00:50:17.399350','100700','Marañón','P'),('2022-09-09 00:50:17.470134','2022-09-09 00:50:17.470178','100800','Pachitea','P'),('2022-09-09 00:50:17.613053','2022-09-09 00:50:17.613102','100900','Puerto Inca','P'),('2022-09-09 00:50:17.709139','2022-09-09 00:50:17.709191','101000','Lauricocha','P'),('2022-09-09 00:50:17.758392','2022-09-09 00:50:17.758949','101100','Yarowilca','P'),('2022-06-15 13:43:11.540399','2022-06-15 13:43:11.540447','110000','Ica','D'),('2022-09-09 01:06:42.832626','2022-09-09 01:06:42.832678','110100','Ica','P'),('2022-09-13 08:54:59.142063','2022-09-20 19:07:16.913699','110101','Ica','I'),('2022-09-13 08:54:59.202265','2022-09-20 19:07:16.998454','110102','La Tinguiña','I'),('2022-09-13 08:54:59.259830','2022-09-20 19:07:17.063996','110103','Los Aquijes','I'),('2022-09-13 08:54:59.318520','2022-09-20 19:07:17.170776','110104','Ocucaje','I'),('2022-09-13 08:54:59.376210','2022-09-20 19:07:17.231596','110105','Pachacutec','I'),('2022-09-13 08:54:59.435700','2022-09-20 19:07:17.289775','110106','Parcona','I'),('2022-09-13 08:54:59.509919','2022-09-20 19:07:17.339026','110107','Pueblo Nuevo','I'),('2022-09-13 08:54:59.576904','2022-09-20 19:07:17.390061','110108','Salas','I'),('2022-09-13 08:54:59.635737','2022-09-20 19:07:17.524690','110109','San José de Los Molinos','I'),('2022-09-13 08:54:59.694380','2022-09-20 19:07:17.614283','110110','San Juan Bautista','I'),('2022-09-13 08:54:59.751955','2022-09-20 19:07:17.723835','110111','Santiago','I'),('2022-09-13 08:54:59.807094','2022-09-20 19:07:17.865939','110112','Subtanjalla','I'),('2022-09-13 08:54:59.857006','2022-09-20 19:07:17.914845','110113','Tate','I'),('2022-09-13 08:54:59.909693','2022-09-20 19:07:17.965432','110114','Yauca del Rosario','I'),('2022-09-09 01:06:42.890905','2022-09-09 01:06:42.890960','110200','Chincha','P'),('2022-09-09 01:14:58.047039','2022-09-09 01:14:58.047088','110201','Chincha Alta','I'),('2022-09-09 01:14:58.135605','2022-09-09 01:14:58.135655','110202','Alto Laran','I'),('2022-09-09 01:14:58.196988','2022-09-09 01:14:58.197109','110203','Chavin','I'),('2022-09-09 01:14:58.263973','2022-09-09 01:14:58.264026','110204','Chincha Baja','I'),('2022-09-09 01:14:58.322401','2022-09-09 01:14:58.322450','110205','El Carmen','I'),('2022-09-09 01:14:58.381732','2022-09-09 01:14:58.381781','110206','Grocio Prado','I'),('2022-09-09 01:14:58.439914','2022-09-09 01:14:58.439965','110207','Pueblo Nuevo','I'),('2022-09-09 01:14:58.531197','2022-09-09 01:14:58.531249','110208','San Juan de Yanac','I'),('2022-09-09 01:14:58.589694','2022-09-09 01:14:58.589741','110209','San Pedro de Huacarpana','I'),('2022-09-09 01:14:58.653094','2022-09-09 01:14:58.653128','110210','Sunampe','I'),('2022-09-09 01:14:58.706587','2022-09-09 01:14:58.706641','110211','Tambo de Mora','I'),('2022-09-09 01:06:42.940182','2022-09-09 01:06:42.940228','110300','Nasca','P'),('2022-09-09 01:06:44.226808','2022-09-09 01:06:48.506969','110301','Nasca','I'),('2022-09-09 01:06:44.275196','2022-09-09 01:06:48.569190','110302','Changuillo','I'),('2022-09-09 01:06:44.329835','2022-09-09 01:06:48.628317','110303','El Ingenio','I'),('2022-09-09 01:06:44.375768','2022-09-09 01:06:48.678733','110304','Marcona','I'),('2022-09-09 01:06:44.425951','2022-09-09 01:06:48.728873','110305','Vista Alegre','I'),('2022-09-09 01:06:42.990313','2022-09-09 01:06:42.990360','110400','Palpa','P'),('2022-09-09 01:06:43.041310','2022-09-09 01:06:43.041363','110500','Pisco','P'),('2022-06-15 13:43:11.640186','2022-06-15 13:43:11.640233','120000','Junín','D'),('2022-09-09 11:35:00.825739','2022-09-09 11:35:00.825780','120100','Huancayo','P'),('2022-09-09 11:35:21.631016','2022-09-20 18:18:29.043491','120101','Huancayo','I'),('2022-09-09 11:35:21.756005','2022-09-20 18:18:29.108952','120104','Carhuacallanga','I'),('2022-09-09 11:35:21.932429','2022-09-20 18:18:29.151944','120105','Chacapampa','I'),('2022-09-09 11:35:22.057560','2022-09-20 18:18:29.202478','120106','Chicche','I'),('2022-09-09 11:35:22.138297','2022-09-20 18:18:29.267072','120107','Chilca','I'),('2022-09-09 11:35:22.191134','2022-09-20 18:18:29.311711','120108','Chongos Alto','I'),('2022-09-09 11:35:22.241352','2022-09-20 18:18:29.369443','120111','Chupuro','I'),('2022-09-09 11:35:22.307081','2022-09-20 18:18:29.430231','120112','Colca','I'),('2022-09-09 11:35:22.394229','2022-09-20 18:18:29.486389','120113','Cullhuas','I'),('2022-09-09 11:35:22.544890','2022-09-20 18:18:29.545102','120114','El Tambo','I'),('2022-09-09 11:35:22.691401','2022-09-20 18:18:29.595356','120116','Huacrapuquio','I'),('2022-09-09 11:35:22.740778','2022-09-20 18:18:29.653711','120117','Hualhuas','I'),('2022-09-09 11:35:22.790987','2022-09-20 18:18:29.712002','120119','Huancan','I'),('2022-09-09 11:35:22.841061','2022-09-20 18:18:29.769961','120120','Huasicancha','I'),('2022-09-09 11:35:22.890754','2022-09-20 18:18:29.831573','120121','Huayucachi','I'),('2022-09-09 11:35:22.941205','2022-09-20 18:18:29.878560','120122','Ingenio','I'),('2022-09-09 11:35:22.994110','2022-09-20 18:18:29.937631','120124','Pariahuanca','I'),('2022-09-09 11:35:23.098625','2022-09-20 18:18:29.995346','120125','Pilcomayo','I'),('2022-09-09 11:35:23.175463','2022-09-20 18:18:30.054082','120126','Pucara','I'),('2022-09-09 11:35:23.224154','2022-09-20 18:18:30.112082','120127','Quichuay','I'),('2022-09-09 11:35:23.291094','2022-09-20 18:18:30.171073','120128','Quilcas','I'),('2022-09-09 11:35:23.346823','2022-09-20 18:18:30.228922','120129','San Agustín','I'),('2022-09-09 11:35:23.414812','2022-09-20 18:18:30.293937','120130','San Jerónimo de Tunan','I'),('2022-09-09 11:35:23.464633','2022-09-20 18:18:30.337498','120132','Saño','I'),('2022-09-09 11:35:23.538694','2022-09-20 18:18:30.433310','120133','Sapallanga','I'),('2022-09-09 11:35:23.590414','2022-09-20 18:18:30.492614','120134','Sicaya','I'),('2022-09-09 11:35:23.648271','2022-09-20 18:18:30.559135','120135','Santo Domingo de Acobamba','I'),('2022-09-09 11:35:23.766354','2022-09-20 18:18:30.617428','120136','Viques','I'),('2022-09-09 11:35:00.887940','2022-09-09 11:35:00.887987','120200','Concepción','P'),('2022-09-09 11:41:38.865266','2022-09-21 10:59:00.154633','120201','Concepción','I'),('2022-09-09 11:41:38.923437','2022-09-21 10:59:00.211470','120202','Aco','I'),('2022-09-09 11:41:38.971913','2022-09-21 10:59:00.269625','120203','Andamarca','I'),('2022-09-09 11:41:39.054789','2022-09-21 10:59:00.335629','120204','Chambara','I'),('2022-09-09 11:41:39.105885','2022-09-21 10:59:00.403759','120205','Cochas','I'),('2022-09-09 11:41:39.162670','2022-09-21 10:59:00.462276','120206','Comas','I'),('2022-09-09 11:41:39.211643','2022-09-21 10:59:00.509935','120207','Heroínas Toledo','I'),('2022-09-09 11:41:39.270397','2022-09-21 10:59:00.561857','120208','Manzanares','I'),('2022-09-09 11:41:39.329613','2022-09-21 10:59:00.615390','120209','Mariscal Castilla','I'),('2022-09-09 11:41:39.387939','2022-09-21 10:59:00.666229','120210','Matahuasi','I'),('2022-09-09 11:41:39.438061','2022-09-21 10:59:00.708954','120211','Mito','I'),('2022-09-09 11:41:39.487455','2022-09-21 10:59:00.818781','120212','Nueve de Julio','I'),('2022-09-09 11:41:39.537686','2022-09-21 10:59:00.935574','120213','Orcotuna','I'),('2022-09-09 11:41:39.585102','2022-09-21 10:59:01.061053','120214','San José de Quero','I'),('2022-09-09 11:41:39.629208','2022-09-21 10:59:01.177222','120215','Santa Rosa de Ocopa','I'),('2022-09-09 11:35:00.938728','2022-09-09 11:35:00.938782','120300','Chanchamayo','P'),('2022-09-20 16:46:38.253317','2022-09-20 16:46:38.253357','120301','Chanchamayo','I'),('2022-09-20 16:46:38.312854','2022-09-20 16:46:38.312903','120302','Perene','I'),('2022-09-20 16:46:38.361988','2022-09-20 16:46:38.362425','120303','Pichanaqui','I'),('2022-09-20 16:46:38.433049','2022-09-20 16:46:38.433099','120304','San Luis de Shuaro','I'),('2022-09-20 16:46:38.513185','2022-09-20 16:46:38.513232','120305','San Ramón','I'),('2022-09-20 16:46:38.562969','2022-09-20 16:46:38.563017','120306','Vitoc','I'),('2022-09-09 11:35:00.987920','2022-09-09 11:35:00.987969','120400','Jauja','P'),('2022-09-20 19:31:39.533095','2022-09-20 19:31:39.533145','120401','Jauja','I'),('2022-09-20 19:31:39.590999','2022-09-20 19:31:39.591022','120402','Acolla','I'),('2022-09-20 19:31:39.650975','2022-09-20 19:31:39.651004','120403','Apata','I'),('2022-09-20 19:31:39.695095','2022-09-20 19:31:39.695138','120404','Ataura','I'),('2022-09-20 19:31:39.747447','2022-09-20 19:31:39.747494','120405','Canchayllo','I'),('2022-09-20 19:31:39.794459','2022-09-20 19:31:39.794500','120406','Curicaca','I'),('2022-09-20 19:31:39.844738','2022-09-20 19:31:39.844779','120407','El Mantaro','I'),('2022-09-20 19:31:39.902435','2022-09-20 19:31:39.902481','120408','Huamali','I'),('2022-09-20 19:31:39.966869','2022-09-20 19:31:39.967553','120409','Huaripampa','I'),('2022-09-20 19:31:40.028787','2022-09-20 19:31:40.028834','120410','Huertas','I'),('2022-09-20 19:31:40.087471','2022-09-20 19:31:40.087522','120411','Janjaillo','I'),('2022-09-20 19:31:40.146062','2022-09-20 19:31:40.146115','120412','Julcán','I'),('2022-09-20 19:31:40.200481','2022-09-20 19:31:40.200505','120413','Leonor Ordóñez','I'),('2022-09-20 19:31:40.299893','2022-09-20 19:31:40.299913','120414','Llocllapampa','I'),('2022-09-20 19:31:40.352960','2022-09-20 19:31:40.353001','120415','Marco','I'),('2022-09-20 19:31:40.410979','2022-09-20 19:31:40.411021','120416','Masma','I'),('2022-09-20 19:31:40.466581','2022-09-20 19:31:40.466631','120417','Masma Chicche','I'),('2022-09-20 19:31:40.537236','2022-09-20 19:31:40.537282','120418','Molinos','I'),('2022-09-20 19:31:40.597023','2022-09-20 19:31:40.597074','120419','Monobamba','I'),('2022-09-20 19:31:40.653828','2022-09-20 19:31:40.653879','120420','Muqui','I'),('2022-09-20 19:31:40.747569','2022-09-20 19:31:40.747622','120421','Muquiyauyo','I'),('2022-09-20 19:31:40.803873','2022-09-20 19:31:40.803922','120422','Paca','I'),('2022-09-20 19:31:40.863062','2022-09-20 19:31:40.863111','120423','Paccha','I'),('2022-09-20 19:31:40.912500','2022-09-20 19:31:40.912548','120424','Pancan','I'),('2022-09-20 19:31:40.967993','2022-09-20 19:31:40.968046','120425','Parco','I'),('2022-09-20 19:31:41.038482','2022-09-20 19:31:41.038534','120426','Pomacancha','I'),('2022-09-20 19:31:41.087726','2022-09-20 19:31:41.087777','120427','Ricran','I'),('2022-09-20 19:31:41.137923','2022-09-20 19:31:41.137971','120428','San Lorenzo','I'),('2022-09-20 19:31:41.188550','2022-09-20 19:31:41.188602','120429','San Pedro de Chunan','I'),('2022-09-20 19:31:41.242972','2022-09-20 19:31:41.243033','120430','Sausa','I'),('2022-09-20 19:31:41.287632','2022-09-20 19:31:41.287682','120431','Sincos','I'),('2022-09-20 19:31:41.337691','2022-09-20 19:31:41.337735','120432','Tunan Marca','I'),('2022-09-20 19:31:41.388044','2022-09-20 19:31:41.388093','120433','Yauli','I'),('2022-09-20 19:31:41.437979','2022-09-20 19:31:41.438029','120434','Yauyos','I'),('2022-09-09 11:35:01.038033','2022-09-09 11:35:01.038083','120500','Junín','P'),('2022-09-09 11:35:01.088275','2022-09-09 11:35:01.088326','120600','Satipo','P'),('2022-09-09 11:35:01.145240','2022-09-09 11:35:01.145279','120700','Tarma','P'),('2022-09-09 11:35:01.195113','2022-09-09 11:35:01.195137','120800','Yauli','P'),('2022-09-09 11:35:01.237501','2022-09-09 11:35:01.237534','120900','Chupaca','P'),('2022-06-15 13:43:11.823726','2022-06-15 13:43:11.823775','130000','La Libertad','D'),('2022-09-12 15:47:03.775916','2022-09-12 15:47:03.775961','130100','Trujillo','P'),('2022-09-12 15:47:03.849026','2022-09-12 15:47:03.849056','130200','Ascope','P'),('2022-09-12 15:47:03.975770','2022-09-12 15:47:03.975821','130300','Bolívar','P'),('2022-09-12 17:39:52.536796','2022-09-12 17:39:52.536820','130301','Bolívar','I'),('2022-09-12 17:39:52.589146','2022-09-12 17:39:52.589190','130302','Bambamarca','I'),('2022-09-12 17:39:52.648095','2022-09-12 17:39:52.648143','130303','Condormarca','I'),('2022-09-12 17:39:52.711917','2022-09-12 17:39:52.711969','130304','Longotea','I'),('2022-09-12 17:39:52.764866','2022-09-12 17:39:52.764915','130305','Uchumarca','I'),('2022-09-12 17:39:52.828811','2022-09-12 17:39:52.828864','130306','Ucuncha','I'),('2022-09-12 15:47:04.117763','2022-09-12 15:47:04.117816','130400','Chepén','P'),('2022-09-12 17:39:40.913717','2022-09-27 11:14:28.117096','130401','Chepen','I'),('2022-09-12 17:39:40.977762','2022-09-27 11:14:28.189598','130402','Pacanga','I'),('2022-09-12 17:39:41.026983','2022-09-27 11:14:28.247962','130403','Pueblo Nuevo','I'),('2022-09-12 15:47:04.296892','2022-09-12 15:47:04.296944','130500','Julcán','P'),('2022-09-12 15:47:06.953067','2022-09-20 18:33:25.508250','130501','Julcan','I'),('2022-09-12 15:47:07.190213','2022-09-20 18:33:25.567883','130502','Calamarca','I'),('2022-09-12 15:47:07.558345','2022-09-20 18:33:25.619231','130503','Carabamba','I'),('2022-09-12 15:47:07.678841','2022-09-20 18:33:25.668943','130504','Huaso','I'),('2022-09-12 15:47:04.412022','2022-09-12 15:47:04.412058','130600','Otuzco','P'),('2022-09-12 15:47:04.555540','2022-09-12 15:47:04.555592','130700','Pacasmayo','P'),('2022-09-12 15:49:09.449456','2022-09-12 15:55:10.136503','130701','San Pedro de Lloc','I'),('2022-09-12 15:49:09.586456','2022-09-12 15:55:10.232005','130702','Guadalupe','I'),('2022-09-12 15:49:09.712111','2022-09-12 15:55:10.293290','130703','Jequetepeque','I'),('2022-09-12 15:49:09.873386','2022-09-12 15:55:10.338315','130704','Pacasmayo','I'),('2022-09-12 15:49:09.930842','2022-09-12 15:55:10.388596','130705','San José','I'),('2022-09-12 15:47:04.689288','2022-09-12 15:47:04.689342','130800','Pataz','P'),('2022-09-12 15:47:04.780404','2022-09-12 15:47:04.780499','130900','Sánchez Carrión','P'),('2022-09-12 15:47:05.114575','2022-09-12 15:47:05.114626','131000','Santiago de Chuco','P'),('2022-09-12 15:47:05.398414','2022-09-12 15:47:05.398468','131100','Gran Chimú','P'),('2022-09-12 15:47:05.514923','2022-09-12 15:47:05.514992','131200','Virú','P'),('2022-06-15 13:43:11.923817','2022-06-15 13:43:11.923865','140000','Lambayeque','D'),('2022-09-09 11:34:47.897877','2022-09-09 11:34:47.897929','140100','Chiclayo','P'),('2022-09-09 11:34:50.120945','2022-09-29 11:02:49.919631','140101','Chiclayo','I'),('2022-09-09 11:34:50.174483','2022-09-29 11:02:49.988191','140102','Chongoyape','I'),('2022-09-09 11:34:50.257417','2022-09-29 11:02:50.045179','140103','Eten','I'),('2022-09-09 11:34:50.316597','2022-09-29 11:02:50.103510','140104','Eten Puerto','I'),('2022-09-09 11:34:50.374835','2022-09-29 11:02:50.162080','140105','José Leonardo Ortiz','I'),('2022-09-09 11:34:50.431070','2022-09-29 11:02:50.221226','140106','La Victoria','I'),('2022-09-09 11:34:50.489919','2022-09-29 11:02:50.279237','140107','Lagunas','I'),('2022-09-09 11:34:50.549080','2022-09-29 11:02:50.337462','140108','Monsefu','I'),('2022-09-09 11:34:50.608287','2022-09-29 11:02:50.407574','140109','Nueva Arica','I'),('2022-09-09 11:34:50.666799','2022-09-29 11:02:50.462078','140110','Oyotun','I'),('2022-09-09 11:34:50.725253','2022-09-29 11:02:50.520498','140111','Picsi','I'),('2022-09-09 11:34:50.780790','2022-09-29 11:02:50.576752','140112','Pimentel','I'),('2022-09-09 11:34:50.833783','2022-09-29 11:02:50.638050','140113','Reque','I'),('2022-09-09 11:34:50.891714','2022-09-29 11:02:50.695710','140114','Santa Rosa','I'),('2022-09-09 11:34:50.950480','2022-09-29 11:02:50.754703','140115','Saña','I'),('2022-09-09 11:34:51.009188','2022-09-29 11:02:50.812814','140116','Cayalti','I'),('2022-09-09 11:34:51.066660','2022-09-29 11:02:50.874361','140117','Patapo','I'),('2022-09-09 11:34:51.125928','2022-09-29 11:02:50.933319','140118','Pomalca','I'),('2022-09-09 11:34:51.184392','2022-09-29 11:02:50.991614','140119','Pucala','I'),('2022-09-09 11:34:51.242395','2022-09-29 11:02:51.051620','140120','Tuman','I'),('2022-09-09 11:34:47.950311','2022-09-09 11:34:47.950360','140200','Ferreñafe','P'),('2022-09-12 12:27:31.939912','2022-09-20 18:18:44.425336','140201','Ferreñafe','I'),('2022-09-12 12:27:31.993861','2022-09-20 18:18:44.471477','140202','Cañaris','I'),('2022-09-12 12:27:32.044190','2022-09-20 18:18:44.522985','140203','Incahuasi','I'),('2022-09-12 12:27:32.094300','2022-09-20 18:18:44.573685','140204','Manuel Antonio Mesones Muro','I'),('2022-09-12 12:27:32.145339','2022-09-20 18:18:44.624632','140205','Pitipo','I'),('2022-09-12 12:27:32.194241','2022-09-20 18:18:44.670662','140206','Pueblo Nuevo','I'),('2022-09-09 11:34:47.999772','2022-09-09 11:34:47.999818','140300','Lambayeque','P'),('2022-06-15 13:43:12.040962','2022-06-15 13:43:12.041011','150000','Lima','D'),('2022-09-09 11:34:39.507450','2022-09-09 11:34:39.507480','150100','Lima','P'),('2022-09-09 11:34:40.736736','2022-09-09 11:34:40.736774','150101','Lima','I'),('2022-09-09 11:34:40.817932','2022-09-09 11:34:40.817982','150102','Ancón','I'),('2022-09-09 11:34:40.865741','2022-09-09 11:34:40.865790','150103','Ate','I'),('2022-09-09 11:34:40.916567','2022-09-09 11:34:40.916621','150104','Barranco','I'),('2022-09-09 11:34:40.965374','2022-09-09 11:34:40.965412','150105','Breña','I'),('2022-09-09 11:34:41.031314','2022-09-09 11:34:41.031360','150106','Carabayllo','I'),('2022-09-09 11:34:41.075651','2022-09-09 11:34:41.075698','150107','Chaclacayo','I'),('2022-09-09 11:34:41.122852','2022-09-09 11:34:41.122887','150108','Chorrillos','I'),('2022-09-09 11:34:41.191616','2022-09-09 11:34:41.191664','150109','Cieneguilla','I'),('2022-09-09 11:34:41.241145','2022-09-09 11:34:41.241194','150110','Comas','I'),('2022-09-09 11:34:41.333769','2022-09-09 11:34:41.333819','150111','El Agustino','I'),('2022-09-09 11:34:41.383710','2022-09-09 11:34:41.383762','150112','Independencia','I'),('2022-09-09 11:34:41.442799','2022-09-09 11:34:41.442826','150113','Jesús María','I'),('2022-09-09 11:34:41.499230','2022-09-09 11:34:41.499278','150114','La Molina','I'),('2022-09-09 11:34:41.558347','2022-09-09 11:34:41.558400','150115','La Victoria','I'),('2022-09-09 11:34:41.641483','2022-09-09 11:34:41.641535','150116','Lince','I'),('2022-09-09 11:34:41.699358','2022-09-09 11:34:41.699405','150117','Los Olivos','I'),('2022-09-09 11:34:41.771729','2022-09-09 11:34:41.771798','150118','Lurigancho','I'),('2022-09-09 11:34:41.817680','2022-09-09 11:34:41.817720','150119','Lurin','I'),('2022-09-09 11:34:41.899131','2022-09-09 11:34:41.899182','150120','Magdalena del Mar','I'),('2022-09-09 11:34:41.957974','2022-09-09 11:34:41.958016','150121','Pueblo Libre','I'),('2022-09-09 11:34:42.012880','2022-09-09 11:34:42.012902','150122','Miraflores','I'),('2022-09-09 11:34:42.064652','2022-09-09 11:34:42.064688','150123','Pachacamac','I'),('2022-09-09 11:34:42.193753','2022-09-09 11:34:42.193802','150124','Pucusana','I'),('2022-09-09 11:34:42.248945','2022-09-09 11:34:42.249364','150125','Puente Piedra','I'),('2022-09-09 11:34:42.299321','2022-09-09 11:34:42.299369','150126','Punta Hermosa','I'),('2022-09-09 11:34:42.352687','2022-09-09 11:34:42.352740','150127','Punta Negra','I'),('2022-09-09 11:34:42.430665','2022-09-09 11:34:42.430714','150128','Rímac','I'),('2022-09-09 11:34:42.475648','2022-09-09 11:34:42.475680','150129','San Bartolo','I'),('2022-09-09 11:34:42.517195','2022-09-09 11:34:42.517224','150130','San Borja','I'),('2022-09-09 11:34:42.637180','2022-09-09 11:34:42.637233','150131','San Isidro','I'),('2022-09-09 11:34:42.686084','2022-09-09 11:34:42.686132','150132','San Juan de Lurigancho','I'),('2022-09-09 11:34:42.766159','2022-09-09 11:34:42.766204','150133','San Juan de Miraflores','I'),('2022-09-09 11:34:42.819867','2022-09-09 11:34:42.819920','150134','San Luis','I'),('2022-09-09 11:34:42.927726','2022-09-09 11:34:42.927770','150135','San Martín de Porres','I'),('2022-09-09 11:34:42.977521','2022-09-09 11:34:42.977561','150136','San Miguel','I'),('2022-09-09 11:34:43.028860','2022-09-09 11:34:43.028909','150137','Santa Anita','I'),('2022-09-09 11:34:43.078583','2022-09-09 11:34:43.079102','150138','Santa María del Mar','I'),('2022-09-09 11:34:43.130621','2022-09-09 11:34:43.130676','150139','Santa Rosa','I'),('2022-09-09 11:34:43.178987','2022-09-09 11:34:43.179037','150140','Santiago de Surco','I'),('2022-09-09 11:34:43.225590','2022-09-09 11:34:43.225612','150141','Surquillo','I'),('2022-09-09 11:34:43.299707','2022-09-09 11:34:43.299752','150142','Villa El Salvador','I'),('2022-09-09 11:34:43.353133','2022-09-09 11:34:43.353179','150143','Villa María del Triunfo','I'),('2022-09-09 11:34:39.562868','2022-09-09 11:34:39.562911','150200','Barranca','P'),('2022-09-09 11:34:39.604446','2022-09-09 11:34:39.604531','150300','Cajatambo','P'),('2022-09-12 16:19:58.337257','2022-09-12 16:19:58.337289','150301','Cajatambo','I'),('2022-09-12 16:19:58.392778','2022-09-12 16:19:58.392828','150302','Copa','I'),('2022-09-12 16:19:58.448373','2022-09-12 16:19:58.448424','150303','Gorgor','I'),('2022-09-12 16:19:58.507025','2022-09-12 16:19:58.507076','150304','Huancapon','I'),('2022-09-12 16:19:58.564484','2022-09-12 16:19:58.564531','150305','Manas','I'),('2022-09-09 11:34:39.646542','2022-09-09 11:34:39.646589','150400','Canta','P'),('2022-09-21 10:59:14.458788','2022-09-21 10:59:14.458822','150401','Canta','I'),('2022-09-21 10:59:14.560462','2022-09-21 10:59:14.560495','150402','Arahuay','I'),('2022-09-21 10:59:14.722060','2022-09-21 10:59:14.722080','150403','Huamantanga','I'),('2022-09-21 10:59:14.846495','2022-09-21 10:59:14.846541','150404','Huaros','I'),('2022-09-21 10:59:14.907930','2022-09-21 10:59:14.907980','150405','Lachaqui','I'),('2022-09-21 10:59:15.017040','2022-09-21 10:59:15.017089','150406','San Buenaventura','I'),('2022-09-21 10:59:15.099362','2022-09-21 10:59:15.099411','150407','Santa Rosa de Quives','I'),('2022-09-09 11:34:39.689394','2022-09-09 11:34:39.689443','150500','Cañete','P'),('2022-09-21 10:59:04.263254','2022-09-21 10:59:04.263296','150501','San Vicente de Cañete','I'),('2022-09-21 10:59:04.591953','2022-09-21 10:59:04.592003','150502','Asia','I'),('2022-09-21 10:59:04.734129','2022-09-21 10:59:04.734181','150503','Calango','I'),('2022-09-21 10:59:04.866311','2022-09-21 10:59:04.866362','150504','Cerro Azul','I'),('2022-09-21 10:59:05.041429','2022-09-21 10:59:05.041486','150505','Chilca','I'),('2022-09-21 10:59:05.174145','2022-09-21 10:59:05.174198','150506','Coayllo','I'),('2022-09-21 10:59:05.341376','2022-09-21 10:59:05.341430','150507','Imperial','I'),('2022-09-21 10:59:05.475052','2022-09-21 10:59:05.475105','150508','Lunahuana','I'),('2022-09-21 10:59:05.671655','2022-09-21 10:59:05.671705','150509','Mala','I'),('2022-09-21 10:59:05.855034','2022-09-21 10:59:05.855087','150510','Nuevo Imperial','I'),('2022-09-21 10:59:06.274603','2022-09-21 10:59:06.274654','150511','Pacaran','I'),('2022-09-21 10:59:06.441472','2022-09-21 10:59:06.441520','150512','Quilmana','I'),('2022-09-21 10:59:06.542837','2022-09-21 10:59:06.542888','150513','San Antonio','I'),('2022-09-21 10:59:06.675642','2022-09-21 10:59:06.675692','150514','San Luis','I'),('2022-09-21 10:59:06.809293','2022-09-21 10:59:06.809343','150515','Santa Cruz de Flores','I'),('2022-09-21 10:59:06.992406','2022-09-21 10:59:06.992457','150516','Zúñiga','I'),('2022-09-09 11:34:39.772378','2022-09-09 11:34:39.772432','150600','Huaral','P'),('2022-09-09 11:34:39.822207','2022-09-09 11:34:39.822270','150700','Huarochirí','P'),('2022-09-09 11:34:39.872419','2022-09-09 11:34:39.872949','150800','Huaura','P'),('2022-09-20 19:31:09.624160','2022-09-20 19:31:09.624208','150801','Huacho','I'),('2022-09-20 19:31:09.868193','2022-09-20 19:31:09.868245','150802','Ambar','I'),('2022-09-20 19:31:10.051464','2022-09-20 19:31:10.051514','150803','Caleta de Carquin','I'),('2022-09-20 19:31:10.169624','2022-09-20 19:31:10.169676','150804','Checras','I'),('2022-09-20 19:31:10.303520','2022-09-20 19:31:10.303577','150805','Hualmay','I'),('2022-09-20 19:31:10.493414','2022-09-20 19:31:10.493458','150806','Huaura','I'),('2022-09-20 19:31:10.653136','2022-09-20 19:31:10.653187','150807','Leoncio Prado','I'),('2022-09-20 19:31:10.843419','2022-09-20 19:31:10.843472','150808','Paccho','I'),('2022-09-20 19:31:10.988311','2022-09-20 19:31:10.988363','150809','Santa Leonor','I'),('2022-09-20 19:31:11.160211','2022-09-20 19:31:11.160263','150810','Santa María','I'),('2022-09-20 19:31:11.294048','2022-09-20 19:31:11.294099','150811','Sayan','I'),('2022-09-20 19:31:11.483721','2022-09-20 19:31:11.483752','150812','Vegueta','I'),('2022-09-09 11:34:39.920182','2022-09-09 11:34:39.920209','150900','Oyón','P'),('2022-09-09 11:34:39.963877','2022-09-09 11:34:39.963922','151000','Yauyos','P'),('2022-06-15 13:43:12.224473','2022-06-15 13:43:12.224524','160000','Loreto','D'),('2022-09-27 11:14:39.566068','2022-09-27 11:14:39.566112','160100','Maynas','P'),('2022-09-27 11:14:39.620079','2022-09-27 11:14:39.620125','160200','Alto Amazonas','P'),('2022-09-27 11:14:39.678501','2022-09-27 11:14:39.678547','160300','Loreto','P'),('2022-09-27 11:14:40.943805','2022-09-27 11:14:40.943842','160301','Nauta','I'),('2022-09-27 11:14:41.013859','2022-09-27 11:14:41.013902','160302','Parinari','I'),('2022-09-27 11:14:41.072019','2022-09-27 11:14:41.072062','160303','Tigre','I'),('2022-09-27 11:14:41.130486','2022-09-27 11:14:41.130531','160304','Trompeteros','I'),('2022-09-27 11:14:41.190011','2022-09-27 11:14:41.190060','160305','Urarinas','I'),('2022-09-27 11:14:39.736876','2022-09-27 11:14:39.736925','160400','Mariscal Ramón Castilla','P'),('2022-09-27 11:14:39.794877','2022-09-27 11:14:39.794923','160500','Requena','P'),('2022-09-27 11:14:39.845126','2022-09-27 11:14:39.845171','160600','Ucayali','P'),('2022-09-27 11:14:39.895328','2022-09-27 11:14:39.895375','160700','Datem del Marañón','P'),('2022-09-27 11:14:39.953820','2022-09-27 11:14:39.953867','160800','Putumayo','P'),('2022-06-15 13:43:12.415210','2022-06-15 13:43:12.415262','170000','Madre de Dios','D'),('2022-09-12 17:39:42.965504','2022-09-12 17:39:42.965558','170100','Tambopata','P'),('2022-09-12 17:39:44.020495','2022-09-28 08:51:02.397696','170101','Tambopata','I'),('2022-09-12 17:39:44.079627','2022-09-28 08:51:02.513387','170102','Inambari','I'),('2022-09-12 17:39:44.128912','2022-09-28 08:51:02.654655','170103','Las Piedras','I'),('2022-09-12 17:39:44.181355','2022-09-28 08:51:02.784544','170104','Laberinto','I'),('2022-09-12 17:39:43.027388','2022-09-12 17:39:43.027441','170200','Manu','P'),('2022-09-12 17:39:43.077955','2022-09-12 17:39:43.078012','170300','Tahuamanu','P'),('2022-06-15 13:43:12.598454','2022-06-15 13:43:12.598505','180000','Moquegua','D'),('2022-09-28 08:49:24.136346','2022-09-28 08:49:24.136380','180100','Mariscal Nieto','P'),('2022-09-28 08:49:25.742828','2022-09-28 08:49:25.742864','180101','Moquegua','I'),('2022-09-28 08:49:25.839862','2022-09-28 08:49:25.839911','180102','Carumas','I'),('2022-09-28 08:49:25.888802','2022-09-28 08:49:25.888848','180103','Cuchumbaya','I'),('2022-09-28 08:49:25.948925','2022-09-28 08:49:25.948973','180104','Samegua','I'),('2022-09-28 08:49:25.999806','2022-09-28 08:49:25.999854','180105','San Cristóbal','I'),('2022-09-28 08:49:26.049890','2022-09-28 08:49:26.049940','180106','Torata','I'),('2022-09-28 08:49:24.195131','2022-09-28 08:49:24.195181','180200','General Sánchez Cerro','P'),('2022-09-28 08:49:24.245314','2022-09-28 08:49:24.245363','180300','Ilo','P'),('2022-06-15 13:43:12.748474','2022-06-15 13:43:12.748524','190000','Pasco','D'),('2022-06-15 13:43:12.857140','2022-06-15 13:43:12.857189','200000','Piura','D'),('2022-06-15 13:43:12.965318','2022-06-15 13:43:12.965367','210000','Puno','D'),('2022-09-09 09:23:38.530330','2022-09-09 09:23:38.530349','210100','Puno','P'),('2022-09-09 09:23:38.590973','2022-09-09 09:23:38.590989','210200','Azángaro','P'),('2022-09-13 08:54:36.417120','2022-09-13 08:54:36.417163','210201','Azángaro','I'),('2022-09-13 08:54:36.467991','2022-09-13 08:54:36.468035','210202','Achaya','I'),('2022-09-13 08:54:36.776684','2022-09-13 08:54:36.776731','210203','Arapa','I'),('2022-09-13 08:54:36.835042','2022-09-13 08:54:36.835095','210204','Asillo','I'),('2022-09-13 08:54:36.893387','2022-09-13 08:54:36.893437','210205','Caminaca','I'),('2022-09-13 08:54:36.952386','2022-09-13 08:54:36.952436','210206','Chupa','I'),('2022-09-13 08:54:37.016563','2022-09-13 08:54:37.016598','210207','José Domingo Choquehuanca','I'),('2022-09-13 08:54:37.068165','2022-09-13 08:54:37.068213','210208','Muñani','I'),('2022-09-13 08:54:37.126398','2022-09-13 08:54:37.126444','210209','Potoni','I'),('2022-09-13 08:54:37.184708','2022-09-13 08:54:37.184753','210210','Saman','I'),('2022-09-13 08:54:37.243698','2022-09-13 08:54:37.243745','210211','San Anton','I'),('2022-09-13 08:54:37.301795','2022-09-13 08:54:37.301841','210212','San José','I'),('2022-09-13 08:54:37.360380','2022-09-13 08:54:37.360427','210213','San Juan de Salinas','I'),('2022-09-13 08:54:37.409972','2022-09-13 08:54:37.410021','210214','Santiago de Pupuja','I'),('2022-09-13 08:54:37.476684','2022-09-13 08:54:37.476732','210215','Tirapata','I'),('2022-09-09 09:23:38.638005','2022-09-09 09:23:38.638049','210300','Carabaya','P'),('2022-09-09 09:23:38.679657','2022-09-09 09:23:38.679700','210400','Chucuito','P'),('2022-09-09 09:23:38.722152','2022-09-09 09:23:38.722196','210500','El Collao','P'),('2022-09-09 09:23:38.780029','2022-09-09 09:23:38.780076','210600','Huancané','P'),('2022-09-09 09:23:38.830250','2022-09-09 09:23:38.830298','210700','Lampa','P'),('2022-09-09 09:23:38.880546','2022-09-09 09:23:38.880596','210800','Melgar','P'),('2022-09-09 09:23:44.139888','2022-09-09 09:25:43.403607','210801','Ayaviri','I'),('2022-09-09 09:23:44.207238','2022-09-09 09:25:43.453058','210802','Antauta','I'),('2022-09-09 09:23:44.257079','2022-09-09 09:25:43.496684','210803','Cupi','I'),('2022-09-09 09:23:44.306884','2022-09-09 09:25:43.555594','210804','Llalli','I'),('2022-09-09 09:23:44.357043','2022-09-09 09:25:43.605102','210805','Macari','I'),('2022-09-09 09:23:44.407113','2022-09-09 09:25:43.655410','210806','Nuñoa','I'),('2022-09-09 09:23:44.457405','2022-09-09 09:25:43.705586','210807','Orurillo','I'),('2022-09-09 09:23:44.531018','2022-09-09 09:25:43.763360','210808','Santa Rosa','I'),('2022-09-09 09:23:44.639211','2022-09-09 09:25:43.823584','210809','Umachiri','I'),('2022-09-09 09:23:38.944857','2022-09-09 09:23:38.944881','210900','Moho','P'),('2022-09-09 09:23:39.027848','2022-09-09 09:23:39.027868','211000','San Antonio de Putina','P'),('2022-09-09 09:23:39.071381','2022-09-09 09:23:39.071423','211100','San Román','P'),('2022-09-09 09:23:39.113104','2022-09-09 09:23:39.113146','211200','Sandia','P'),('2022-09-09 09:23:39.163790','2022-09-09 09:23:39.163838','211300','Yunguyo','P'),('2022-06-15 13:43:13.124767','2022-06-15 13:43:13.124819','220000','San Martín','D'),('2022-06-15 13:43:13.232199','2022-06-15 13:43:13.232247','230000','Tacna','D'),('2022-09-08 15:36:09.176756','2022-09-08 15:36:09.176800','230100','Tacna','P'),('2022-09-08 15:36:10.935546','2022-09-08 16:25:45.656036','230101','Tacna','I'),('2022-09-08 15:36:11.022634','2022-09-08 16:25:45.704546','230102','Alto de la Alianza','I'),('2022-09-08 15:36:11.109175','2022-09-08 16:25:45.753583','230103','Calana','I'),('2022-09-08 15:36:11.239821','2022-09-08 16:25:45.802778','230104','Ciudad Nueva','I'),('2022-09-08 15:36:11.345673','2022-09-08 16:25:45.853214','230105','Inclan','I'),('2022-09-08 15:36:11.397628','2022-09-08 16:25:45.921045','230106','Pachia','I'),('2022-09-08 15:36:11.453226','2022-09-08 16:25:45.969125','230107','Palca','I'),('2022-09-08 15:36:11.523325','2022-09-08 16:25:46.069392','230108','Pocollay','I'),('2022-09-08 15:36:11.579089','2022-09-08 16:25:46.121035','230109','Sama','I'),('2022-09-08 15:36:11.632428','2022-09-08 16:25:46.177863','230110','Coronel Gregorio Albarracín Lanchipa','I'),('2022-09-08 15:36:11.690025','2022-09-08 16:25:46.230326','230111','La Yarada los Palos','I'),('2022-09-08 15:36:09.244762','2022-09-08 15:36:09.244803','230200','Candarave','P'),('2022-09-08 15:36:09.301674','2022-09-08 15:36:09.301696','230300','Jorge Basadre','P'),('2022-09-08 15:36:09.353669','2022-09-08 15:36:09.353714','230400','Tarata','P'),('2022-06-15 13:43:13.357758','2022-06-15 13:43:13.357823','240000','Tumbes','D'),('2022-06-15 13:43:13.466048','2022-06-15 13:43:13.466096','250000','Ucayali','D');
/*!40000 ALTER TABLE `app_ubigeo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=205 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add user',6,'add_customuser'),(22,'Can change user',6,'change_customuser'),(23,'Can delete user',6,'delete_customuser'),(24,'Can view user',6,'view_customuser'),(25,'Can add Administrador',7,'add_administrador'),(26,'Can change Administrador',7,'change_administrador'),(27,'Can delete Administrador',7,'delete_administrador'),(28,'Can view Administrador',7,'view_administrador'),(29,'Can add Aula',8,'add_aula'),(30,'Can change Aula',8,'change_aula'),(31,'Can delete Aula',8,'delete_aula'),(32,'Can view Aula',8,'view_aula'),(33,'Can add Preguntas de balotario',9,'add_balota_preguntas_curso'),(34,'Can change Preguntas de balotario',9,'change_balota_preguntas_curso'),(35,'Can delete Preguntas de balotario',9,'delete_balota_preguntas_curso'),(36,'Can view Preguntas de balotario',9,'view_balota_preguntas_curso'),(37,'Can add Ciclo',10,'add_ciclo'),(38,'Can change Ciclo',10,'change_ciclo'),(39,'Can delete Ciclo',10,'delete_ciclo'),(40,'Can view Ciclo',10,'view_ciclo'),(41,'Can add colegio',11,'add_colegio'),(42,'Can change colegio',11,'change_colegio'),(43,'Can delete colegio',11,'delete_colegio'),(44,'Can view colegio',11,'view_colegio'),(45,'Can add Compromiso de Pago',12,'add_compromiso_pago'),(46,'Can change Compromiso de Pago',12,'change_compromiso_pago'),(47,'Can delete Compromiso de Pago',12,'delete_compromiso_pago'),(48,'Can view Compromiso de Pago',12,'view_compromiso_pago'),(49,'Can add Detalle Compromiso Pago',13,'add_detalle_compromiso_de_pago'),(50,'Can change Detalle Compromiso Pago',13,'change_detalle_compromiso_de_pago'),(51,'Can delete Detalle Compromiso Pago',13,'delete_detalle_compromiso_de_pago'),(52,'Can view Detalle Compromiso Pago',13,'view_detalle_compromiso_de_pago'),(53,'Can add Docente',14,'add_docente'),(54,'Can change Docente',14,'change_docente'),(55,'Can delete Docente',14,'delete_docente'),(56,'Can view Docente',14,'view_docente'),(57,'Can add documentos_inscripcion',15,'add_documentos_inscripcion'),(58,'Can change documentos_inscripcion',15,'change_documentos_inscripcion'),(59,'Can delete documentos_inscripcion',15,'delete_documentos_inscripcion'),(60,'Can view documentos_inscripcion',15,'view_documentos_inscripcion'),(61,'Can add Escuela Profesional',16,'add_escuela_profesional'),(62,'Can change Escuela Profesional',16,'change_escuela_profesional'),(63,'Can delete Escuela Profesional',16,'delete_escuela_profesional'),(64,'Can view Escuela Profesional',16,'view_escuela_profesional'),(65,'Can add Estudiante',17,'add_estudiante'),(66,'Can change Estudiante',17,'change_estudiante'),(67,'Can delete Estudiante',17,'delete_estudiante'),(68,'Can view Estudiante',17,'view_estudiante'),(69,'Can add Examen',18,'add_examen'),(70,'Can change Examen',18,'change_examen'),(71,'Can delete Examen',18,'delete_examen'),(72,'Can view Examen',18,'view_examen'),(73,'Can add Notas Estudiante',19,'add_examen_estudiante'),(74,'Can change Notas Estudiante',19,'change_examen_estudiante'),(75,'Can delete Notas Estudiante',19,'delete_examen_estudiante'),(76,'Can view Notas Estudiante',19,'view_examen_estudiante'),(77,'Can add Examen por grupo',20,'add_examen_grupo'),(78,'Can change Examen por grupo',20,'change_examen_grupo'),(79,'Can delete Examen por grupo',20,'delete_examen_grupo'),(80,'Can view Examen por grupo',20,'view_examen_grupo'),(81,'Can add Grupo Academico',21,'add_grupo_academico'),(82,'Can change Grupo Academico',21,'change_grupo_academico'),(83,'Can delete Grupo Academico',21,'delete_grupo_academico'),(84,'Can view Grupo Academico',21,'view_grupo_academico'),(85,'Can add Horario',22,'add_horario'),(86,'Can change Horario',22,'change_horario'),(87,'Can delete Horario',22,'delete_horario'),(88,'Can view Horario',22,'view_horario'),(89,'Can add Padron de Cursos',23,'add_padron_curso'),(90,'Can change Padron de Cursos',23,'change_padron_curso'),(91,'Can delete Padron de Cursos',23,'delete_padron_curso'),(92,'Can view Padron de Cursos',23,'view_padron_curso'),(93,'Can add Padron de Requisito Inscripcion',24,'add_padron_documento_requisito'),(94,'Can change Padron de Requisito Inscripcion',24,'change_padron_documento_requisito'),(95,'Can delete Padron de Requisito Inscripcion',24,'delete_padron_documento_requisito'),(96,'Can view Padron de Requisito Inscripcion',24,'view_padron_documento_requisito'),(97,'Can add Pago',25,'add_pago'),(98,'Can change Pago',25,'change_pago'),(99,'Can delete Pago',25,'delete_pago'),(100,'Can view Pago',25,'view_pago'),(101,'Can add Persona',26,'add_persona'),(102,'Can change Persona',26,'change_persona'),(103,'Can delete Persona',26,'delete_persona'),(104,'Can view Persona',26,'view_persona'),(105,'Can add Pregunta examen',27,'add_preguntas_examen_grupo'),(106,'Can change Pregunta examen',27,'change_preguntas_examen_grupo'),(107,'Can delete Pregunta examen',27,'delete_preguntas_examen_grupo'),(108,'Can view Pregunta examen',27,'view_preguntas_examen_grupo'),(109,'Can add Configuracion',28,'add_tabla_configuraciones'),(110,'Can change Configuracion',28,'change_tabla_configuraciones'),(111,'Can delete Configuracion',28,'delete_tabla_configuraciones'),(112,'Can view Configuracion',28,'view_tabla_configuraciones'),(113,'Can add ubigeo',29,'add_ubigeo'),(114,'Can change ubigeo',29,'change_ubigeo'),(115,'Can delete ubigeo',29,'delete_ubigeo'),(116,'Can view ubigeo',29,'view_ubigeo'),(117,'Can add Sede',30,'add_sede'),(118,'Can change Sede',30,'change_sede'),(119,'Can delete Sede',30,'delete_sede'),(120,'Can view Sede',30,'view_sede'),(121,'Can add Resultado examen estudiante',31,'add_resultados_examen_estudiante'),(122,'Can change Resultado examen estudiante',31,'change_resultados_examen_estudiante'),(123,'Can delete Resultado examen estudiante',31,'delete_resultados_examen_estudiante'),(124,'Can view Resultado examen estudiante',31,'view_resultados_examen_estudiante'),(125,'Can add registro_tesoreria',32,'add_registro_tesoreria'),(126,'Can change registro_tesoreria',32,'change_registro_tesoreria'),(127,'Can delete registro_tesoreria',32,'delete_registro_tesoreria'),(128,'Can view registro_tesoreria',32,'view_registro_tesoreria'),(129,'Can add Preinscripcion',33,'add_preinscripcion'),(130,'Can change Preinscripcion',33,'change_preinscripcion'),(131,'Can delete Preinscripcion',33,'delete_preinscripcion'),(132,'Can view Preinscripcion',33,'view_preinscripcion'),(133,'Can add Padron cursos por grupo',34,'add_padron_cursos_grupo'),(134,'Can change Padron cursos por grupo',34,'change_padron_cursos_grupo'),(135,'Can delete Padron cursos por grupo',34,'delete_padron_cursos_grupo'),(136,'Can view Padron cursos por grupo',34,'view_padron_cursos_grupo'),(137,'Can add Pabellon',35,'add_pabellon'),(138,'Can change Pabellon',35,'change_pabellon'),(139,'Can delete Pabellon',35,'delete_pabellon'),(140,'Can view Pabellon',35,'view_pabellon'),(141,'Can add Material de clase',36,'add_material_curso'),(142,'Can change Material de clase',36,'change_material_curso'),(143,'Can delete Material de clase',36,'delete_material_curso'),(144,'Can view Material de clase',36,'view_material_curso'),(145,'Can add Inscripcion',37,'add_inscripcion'),(146,'Can change Inscripcion',37,'change_inscripcion'),(147,'Can delete Inscripcion',37,'delete_inscripcion'),(148,'Can view Inscripcion',37,'view_inscripcion'),(149,'Can add Detalle Horario Curso',38,'add_horario_curso'),(150,'Can change Detalle Horario Curso',38,'change_horario_curso'),(151,'Can delete Detalle Horario Curso',38,'delete_horario_curso'),(152,'Can view Detalle Horario Curso',38,'view_horario_curso'),(153,'Can add Examen ciclo',39,'add_examenciclo'),(154,'Can change Examen ciclo',39,'change_examenciclo'),(155,'Can delete Examen ciclo',39,'delete_examenciclo'),(156,'Can view Examen ciclo',39,'view_examenciclo'),(157,'Can add Notas Estudiante Por Curso',40,'add_estudiante_notas_por_curso'),(158,'Can change Notas Estudiante Por Curso',40,'change_estudiante_notas_por_curso'),(159,'Can delete Notas Estudiante Por Curso',40,'delete_estudiante_notas_por_curso'),(160,'Can view Notas Estudiante Por Curso',40,'view_estudiante_notas_por_curso'),(161,'Can add Horario de estudiante',41,'add_estudiante_horario'),(162,'Can change Horario de estudiante',41,'change_estudiante_horario'),(163,'Can delete Horario de estudiante',41,'delete_estudiante_horario'),(164,'Can view Horario de estudiante',41,'view_estudiante_horario'),(165,'Can add Documento de Inscripcion - Revision',42,'add_documentos_inscripcion_revision'),(166,'Can change Documento de Inscripcion - Revision',42,'change_documentos_inscripcion_revision'),(167,'Can delete Documento de Inscripcion - Revision',42,'delete_documentos_inscripcion_revision'),(168,'Can view Documento de Inscripcion - Revision',42,'view_documentos_inscripcion_revision'),(169,'Can add Documento de Publicacion',43,'add_documento_publicacion'),(170,'Can change Documento de Publicacion',43,'change_documento_publicacion'),(171,'Can delete Documento de Publicacion',43,'delete_documento_publicacion'),(172,'Can view Documento de Publicacion',43,'view_documento_publicacion'),(173,'Can add Detalle Pago',44,'add_detalle_pago'),(174,'Can change Detalle Pago',44,'change_detalle_pago'),(175,'Can delete Detalle Pago',44,'delete_detalle_pago'),(176,'Can view Detalle Pago',44,'view_detalle_pago'),(177,'Can add Comentario de clase',45,'add_comentarios_clase'),(178,'Can change Comentario de clase',45,'change_comentarios_clase'),(179,'Can delete Comentario de clase',45,'delete_comentarios_clase'),(180,'Can view Comentario de clase',45,'view_comentarios_clase'),(181,'Can add Asistencia Estudiante',46,'add_asistencia_estudiante'),(182,'Can change Asistencia Estudiante',46,'change_asistencia_estudiante'),(183,'Can delete Asistencia Estudiante',46,'delete_asistencia_estudiante'),(184,'Can view Asistencia Estudiante',46,'view_asistencia_estudiante'),(185,'Can add Asistencia Docente',47,'add_asistencia_docente'),(186,'Can change Asistencia Docente',47,'change_asistencia_docente'),(187,'Can delete Asistencia Docente',47,'delete_asistencia_docente'),(188,'Can view Asistencia Docente',47,'view_asistencia_docente'),(189,'Can add Alternativas',48,'add_alternativas_balotario'),(190,'Can change Alternativas',48,'change_alternativas_balotario'),(191,'Can delete Alternativas',48,'delete_alternativas_balotario'),(192,'Can view Alternativas',48,'view_alternativas_balotario'),(193,'Can add Documento Solicitado Inscripcion',49,'add_documento_solicitado_ciclo'),(194,'Can change Documento Solicitado Inscripcion',49,'change_documento_solicitado_ciclo'),(195,'Can delete Documento Solicitado Inscripcion',49,'delete_documento_solicitado_ciclo'),(196,'Can view Documento Solicitado Inscripcion',49,'view_documento_solicitado_ciclo'),(197,'Can add Examen grupo de estudiantes',50,'add_examen_grupo_estudiante'),(198,'Can change Examen grupo de estudiantes',50,'change_examen_grupo_estudiante'),(199,'Can delete Examen grupo de estudiantes',50,'delete_examen_grupo_estudiante'),(200,'Can view Examen grupo de estudiantes',50,'view_examen_grupo_estudiante'),(201,'Can add Docente Curso',51,'add_docente_curso'),(202,'Can change Docente Curso',51,'change_docente_curso'),(203,'Can delete Docente Curso',51,'delete_docente_curso'),(204,'Can view Docente Curso',51,'view_docente_curso');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_app_customuser_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_app_customuser_id` FOREIGN KEY (`user_id`) REFERENCES `app_customuser` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2022-06-15 11:45:27.760026','1','admin@admin.com',1,'[{\"added\": {}}]',7,1),(2,'2022-06-15 18:10:46.285600','3','02alumnocepre@uniq.edu.pe',2,'[{\"changed\": {\"fields\": [\"Email\"]}}]',6,1),(3,'2022-06-15 18:10:49.098921','1','LEVA SALAS RENAN FERDINAND',2,'[]',17,1),(4,'2022-06-21 22:10:53.414160','1','admin@admin.com',2,'[{\"changed\": {\"fields\": [\"Username\", \"Nombres\", \"Ap. Paterno\", \"Ap. Materno\"]}}]',6,1),(5,'2022-09-02 17:50:54.222667','3','ANGULO MENA DANA MARY 1',3,'',32,4),(6,'2022-09-02 17:51:28.551410','5','ANGULO MENA DANA MARY 1',3,'',13,4),(7,'2022-09-02 17:51:42.202676','9','ANGULO MENA DANA MARY',3,'',12,4),(8,'2022-09-02 17:51:52.720989','11','ANGULO MENA DANA MARY',3,'',33,4),(9,'2022-09-02 17:52:00.046490','11','ANGULO MENA DANA MARY',3,'',26,4),(10,'2022-09-02 17:52:04.935383','1','LEVA SALAS RENAN FERDINAND',2,'[{\"changed\": {\"fields\": [\"DNI\"]}}]',26,4),(11,'2022-09-05 23:09:03.988526','7','01alumnocepre@uniq.edu.pe',2,'[{\"changed\": {\"fields\": [\"Email\"]}}]',6,4),(12,'2022-09-05 23:09:21.154932','8','03alumnocepre@uniq.edu.pe',2,'[{\"changed\": {\"fields\": [\"Email\"]}}]',6,4),(13,'2022-09-20 13:18:09.221423','46','1 Cuota(s) PU',2,'[]',25,4),(14,'2022-09-20 13:18:25.524048','85','1 Cuota(s) PU Cuota 1',1,'[{\"added\": {}}]',44,4);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(7,'app','administrador'),(48,'app','alternativas_balotario'),(47,'app','asistencia_docente'),(46,'app','asistencia_estudiante'),(8,'app','aula'),(9,'app','balota_preguntas_curso'),(10,'app','ciclo'),(11,'app','colegio'),(45,'app','comentarios_clase'),(12,'app','compromiso_pago'),(6,'app','customuser'),(13,'app','detalle_compromiso_de_pago'),(44,'app','detalle_pago'),(14,'app','docente'),(51,'app','docente_curso'),(15,'app','documentos_inscripcion'),(42,'app','documentos_inscripcion_revision'),(43,'app','documento_publicacion'),(49,'app','documento_solicitado_ciclo'),(16,'app','escuela_profesional'),(17,'app','estudiante'),(41,'app','estudiante_horario'),(40,'app','estudiante_notas_por_curso'),(18,'app','examen'),(39,'app','examenciclo'),(19,'app','examen_estudiante'),(20,'app','examen_grupo'),(50,'app','examen_grupo_estudiante'),(21,'app','grupo_academico'),(22,'app','horario'),(38,'app','horario_curso'),(37,'app','inscripcion'),(36,'app','material_curso'),(35,'app','pabellon'),(23,'app','padron_curso'),(34,'app','padron_cursos_grupo'),(24,'app','padron_documento_requisito'),(25,'app','pago'),(26,'app','persona'),(27,'app','preguntas_examen_grupo'),(33,'app','preinscripcion'),(32,'app','registro_tesoreria'),(31,'app','resultados_examen_estudiante'),(30,'app','sede'),(28,'app','tabla_configuraciones'),(29,'app','ubigeo'),(3,'auth','group'),(2,'auth','permission'),(4,'contenttypes','contenttype'),(5,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2022-06-14 10:43:28.075218'),(2,'contenttypes','0002_remove_content_type_name','2022-06-14 10:43:30.372047'),(3,'auth','0001_initial','2022-06-14 10:43:40.352012'),(4,'auth','0002_alter_permission_name_max_length','2022-06-14 10:43:40.690252'),(5,'auth','0003_alter_user_email_max_length','2022-06-14 10:43:40.838655'),(6,'auth','0004_alter_user_username_opts','2022-06-14 10:43:40.962545'),(7,'auth','0005_alter_user_last_login_null','2022-06-14 10:43:41.065280'),(8,'auth','0006_require_contenttypes_0002','2022-06-14 10:43:41.135392'),(9,'auth','0007_alter_validators_add_error_messages','2022-06-14 10:43:41.210425'),(10,'auth','0008_alter_user_username_max_length','2022-06-14 10:43:41.286390'),(11,'auth','0009_alter_user_last_name_max_length','2022-06-14 10:43:41.362292'),(12,'auth','0010_alter_group_name_max_length','2022-06-14 10:43:41.677617'),(13,'auth','0011_update_proxy_permissions','2022-06-14 10:43:41.770168'),(14,'auth','0012_alter_user_first_name_max_length','2022-06-14 10:43:41.846574'),(15,'app','0001_initial','2022-06-14 10:49:43.077785'),(16,'admin','0001_initial','2022-06-14 10:49:52.265728'),(17,'admin','0002_logentry_remove_auto_add','2022-06-14 10:49:52.395660'),(18,'admin','0003_logentry_add_action_flag_choices','2022-06-14 10:49:52.538904'),(19,'app','0002_alter_asistencia_docente_fecha_sesion','2022-06-14 10:49:52.744398'),(20,'app','0003_alter_asistencia_docente_id_horario','2022-06-14 10:49:53.075188'),(21,'app','0004_auto_20220124_0939','2022-06-14 10:49:55.469100'),(22,'app','0005_auto_20220311_2003','2022-06-14 10:50:08.622382'),(23,'app','0006_examen_examen_rendido','2022-06-14 10:50:11.873562'),(24,'app','0007_auto_20220314_1828','2022-06-14 10:50:47.273551'),(25,'app','0008_alter_examen_estudiante_nota_promedio','2022-06-14 10:51:01.401404'),(26,'app','0009_resultados_examen_estudiante_nro_pregunta','2022-06-14 10:51:06.655066'),(27,'app','0010_alter_examen_estudiante_unique_together','2022-06-14 10:51:12.796960'),(28,'app','0011_auto_20220401_1857','2022-06-14 10:51:26.832049'),(29,'app','0012_alter_balota_preguntas_curso_img_pregunta','2022-06-14 10:51:27.224304'),(30,'sessions','0001_initial','2022-06-14 10:51:32.902839'),(31,'app','0013_alter_examen_estudiante_nota_promedio','2022-07-11 22:08:58.753196'),(32,'app','0014_auto_20220902_1326','2022-09-02 15:31:45.437109'),(33,'app','0015_tabla_configuraciones_estado','2022-09-02 16:26:47.452820'),(34,'app','0016_auto_20220919_1927','2022-09-19 20:53:43.365985'),(35,'app','0017_auto_20221007_1457','2022-10-07 15:42:46.959294');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('242510lkxqv8l80f9smuujvqtjfbx87e','.eJxVjEEOwiAQRe_C2hDqQAGX7nsGMsMMUjVtUtqV8e7apAvd_vfef6mE21rT1mRJI6uLsur0uxHmh0w74DtOt1nneVqXkfSu6IM2Pcwsz-vh_h1UbPVbe8Ig2Qj1dC6RrUiIPhPZzkMBg5G7ngnAGm8M5Qgcijiw2DM4h169PwpqOGM:1oYIEn:MmWe5EaEKDb8e3vwmM2fssDvLbRq6E-iFY2jWEZgYzQ','2022-09-27 21:34:53.115847'),('2qk5atgv7dwjl7ym1ceny6t5aycagsqq','.eJxVjDsOwjAQBe_iGln2epN4Kek5g7X-LA6gRIqTCnF3iJQC2jcz76UCb2sNWytLGLM6K6tOv1vk9CjTDvKdp9us0zytyxj1ruiDNn2dc3leDvfvoHKr3xoImb0DgizSSTEQmV1vs-mM9TY57wVhICJvHIoQCRYcvM0Igj2o9wfPCzb5:1o1W8S:Dw2d9jPiU8JR6CkxRINX29qbCZYauiSRxSStMJ0V8qc','2022-06-29 11:44:52.793738'),('8vk5wge0lgmo73bhfo3bzulgiz1jbign','.eJxVjEEOwiAQRe_C2hDqQAGX7nsGMsMMUjVtUtqV8e7apAvd_vfef6mE21rT1mRJI6uLsur0uxHmh0w74DtOt1nneVqXkfSu6IM2Pcwsz-vh_h1UbPVbe8Ig2Qj1dC6RrUiIPhPZzkMBg5G7ngnAGm8M5Qgcijiw2DM4h169PwpqOGM:1o73QQ:7s0SY9gDuHYrskh0M26VUheVyxC6rf0libCBBkJl5Ks','2022-07-14 18:18:18.971367'),('kie09xn2aztl8e9ffcz8k9zuc4ols8em','.eJxVjEEOwiAQRe_C2hDqQAGX7nsGMsMMUjVtUtqV8e7apAvd_vfef6mE21rT1mRJI6uLsur0uxHmh0w74DtOt1nneVqXkfSu6IM2Pcwsz-vh_h1UbPVbe8Ig2Qj1dC6RrUiIPhPZzkMBg5G7ngnAGm8M5Qgcijiw2DM4h169PwpqOGM:1oaUxq:-iuzIsLn19M6Mj34SfVfAn58BzO_ctgQ7eP011n32z8','2022-10-03 23:34:30.562778'),('km1k863ymv2m0hnip8pkg5rsywszpzh3','.eJxVjEEOwiAQRe_C2hDqQAGX7nsGMsMMUjVtUtqV8e7apAvd_vfef6mE21rT1mRJI6uLsur0uxHmh0w74DtOt1nneVqXkfSu6IM2Pcwsz-vh_h1UbPVbe8Ig2Qj1dC6RrUiIPhPZzkMBg5G7ngnAGm8M5Qgcijiw2DM4h169PwpqOGM:1oSmY8:cdPGJ31aDvkXyD8AQRI4I4OH5Zi05BR3qTo7Kjp02mI','2022-09-12 16:44:04.216141'),('odxn02e8lm3xppudxb8ti8x8kmadorwz','.eJxVjEEOwiAQRe_C2hDqQAGX7nsGMsMMUjVtUtqV8e7apAvd_vfef6mE21rT1mRJI6uLsur0uxHmh0w74DtOt1nneVqXkfSu6IM2Pcwsz-vh_h1UbPVbe8Ig2Qj1dC6RrUiIPhPZzkMBg5G7ngnAGm8M5Qgcijiw2DM4h169PwpqOGM:1oguFS:RUFwbv7oG5YPD16TIvosZUlgNCSxhjkqKKdXmGgqL0Y','2022-10-21 15:47:10.658694'),('puk6l8ykewnok22svhk0q7mzq5kxicwz','.eJxVjEEOwiAQRe_C2hDqQAGX7nsGMsMMUjVtUtqV8e7apAvd_vfef6mE21rT1mRJI6uLsur0uxHmh0w74DtOt1nneVqXkfSu6IM2Pcwsz-vh_h1UbPVbe8Ig2Qj1dC6RrUiIPhPZzkMBg5G7ngnAGm8M5Qgcijiw2DM4h169PwpqOGM:1oUBIW:hAKKTA4Qdp49I6A8BneoyVFLQ7y6QgPatOxz-mGdfq8','2022-09-16 13:21:44.480541');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-10  0:17:22
