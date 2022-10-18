-- drop table IF EXISTS System_User_System_Group;
-- drop table IF EXISTS System_Group;
-- -- 
-- drop table IF EXISTS Search_Query_Vacancy;
-- drop table IF EXISTS Search_Query;
-- drop table IF EXISTS Vacancy;
-- --
-- drop table IF EXISTS Token;
-- drop table IF EXISTS System_User;
-- --
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- 
CREATE OR REPLACE FUNCTION upd_timestamp() RETURNS TRIGGER LANGUAGE plpgsql AS $$ BEGIN NEW.modified = CURRENT_TIMESTAMP;
RETURN NEW;
END;
$$;
-- 
CREATE TABLE IF NOT EXISTS System_User (
  id serial,
  uuid_ uuid NOT NULL DEFAULT uuid_generate_v4(),
  login varchar(64) UNIQUE NOT NULL,
  password varchar(64) NOT NULL,
  telegramId varchar(64),
  hhToken varchar(255),
  createdOn timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
CREATE TRIGGER modifiedUpd BEFORE
UPDATE ON System_User FOR EACH ROW EXECUTE PROCEDURE upd_timestamp();
-- 
CREATE TABLE IF NOT EXISTS System_Group (
  id serial,
  name varchar(64) UNIQUE NOT NULL,
  PRIMARY KEY (id)
);
-- 
CREATE TABLE IF NOT EXISTS System_User_System_Group (
  userId integer NOT NULL,
  groupId integer NOT NULL,
  PRIMARY KEY (userId, groupId),
  FOREIGN KEY (userId) REFERENCES System_User (id) ON DELETE CASCADE,
  FOREIGN KEY (groupId) REFERENCES System_Group (id) ON DELETE CASCADE
);
-- 
CREATE TABLE IF NOT EXISTS Token (
  id serial,
  userId integer NOT NULL,
  accessSignature varchar(255) UNIQUE NOT NULL,
  refreshSignature varchar(255) UNIQUE NOT NULL,
  modified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES System_User (id) ON DELETE CASCADE
);
CREATE TRIGGER modifiedUpd BEFORE
UPDATE ON Token FOR EACH ROW EXECUTE PROCEDURE upd_timestamp();
-- 
CREATE TABLE IF NOT EXISTS Search_Query (
  id serial,
  userId integer NOT NULL,
  searchText varchar(255) NOT NULL,
  searchParams varchar(255) NOT NULL,
  isAknowledged boolean NOT NULL DEFAULT false,
  lastAknowledged timestamp DEFAULT CURRENT_TIMESTAMP,
  notifyPostedHoursAgoMax int DEFAULT 96,
  uuid_ uuid NOT NULL DEFAULT uuid_generate_v4(),
  modified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES System_User (id) ON DELETE CASCADE
);
CREATE TRIGGER modifiedUpd BEFORE
UPDATE ON Search_Query FOR EACH ROW EXECUTE PROCEDURE upd_timestamp();
-- 
CREATE TABLE IF NOT EXISTS Vacancy (
  id serial,
  hash uuid UNIQUE NOT NULL,
  vacancyHHId integer NOT NULL,
  title varchar(64) NOT NULL,
  snippetRequirement varchar(64) DEFAULT '',
  snippetResponsibility varchar(64) DEFAULT '',
  hasTest boolean NOT NULL,
  responseLetterRequired boolean NOT NULL,
  publishedAt varchar(64) NOT NULL,
  createdAt varchar(64) NOT NULL,
  areaId integer NOT NULL,
  areaName varchar(64) NOT NULL,
  salaryCurrencyId integer NOT NULL,
  salaryFrom integer DEFAULT 0,
  salaryTo integer DEFAULT 0,
  addressRaw varchar(64) DEFAULT '',
  scheduleId varchar(64) NOT NULL,
  scheduleName varchar(64) NOT NULL,
  employerName varchar(64) NOT NULL,
  employerUrl varchar(64) NOT NULL,
  modified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
CREATE TRIGGER modifiedUpd BEFORE
UPDATE ON Vacancy FOR EACH ROW EXECUTE PROCEDURE upd_timestamp();
-- 
CREATE TABLE IF NOT EXISTS Search_Query_Vacancy (
  searchQueryId integer NOT NULL,
  vacancyId integer NOT NULL,
  PRIMARY KEY (searchQueryId, vacancyId),
  FOREIGN KEY (searchQueryId) REFERENCES Search_Query (id) ON DELETE CASCADE,
  FOREIGN KEY (vacancyId) REFERENCES Vacancy (id) ON DELETE CASCADE
);