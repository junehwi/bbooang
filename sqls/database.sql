SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema shop
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `shop` DEFAULT CHARACTER SET utf8 ;

USE `shop` ;

-- -----------------------------------------------------
-- Table `shop`.`member`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`member` (
  `memseq` INT(11) NOT NULL AUTO_INCREMENT ,
  `email` CHAR(32) NOT NULL,
  `password` CHAR(32) NOT NULL,
  `platform` CHAR(16) NOT NULL, 
  `name` CHAR(8) NOT NULL DEFAULT '',
  `sex` CHAR(8) NOT NULL DEFAULT '',
  `phone` CHAR(16) NOT NULL DEFAULT '',
  `uuid` CHAR(32) NOT NULL DEFAULT '',
  `creationTime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastLoginTime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`memseq`),
  INDEX `CREATIONTIME` (`creationTime` ASC))
ENGINE = InnoDB,
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `shop`.`reservation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shop`.`reservation` (
  `resseq` INT(11) NOT NULL AUTO_INCREMENT,
  `memseq` INT(11) NOT NULL,
  `designer` CHAR(32) NOT NULL,
  `type` CHAR(32) NOT NULL,
  `reservationTime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `contents` VARCHAR(256) NOT NULL DEFAULT '',
  `creationTime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`resseq`),
  INDEX `CREATIONTIME` (`memseq` ASC))
ENGINE = InnoDB,
DEFAULT CHARACTER SET = utf8;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
