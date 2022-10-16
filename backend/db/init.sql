-- REPLACE WITH NEW TABLES

-- 
-- 
-- 
-- 
-- 
-- 

-- DROP DATABASE IF EXISTS ts_backend_db;
-- CREATE DATABASE ts_backend_db OWNER ts_backend_admin;

CREATE TABLE IF NOT EXISTS SystemUser (
  Id        serial,
  Login     varchar(64) NOT NULL,
  Password  varchar(64) NOT NULL,
  FullName  varchar(255)
);

ALTER TABLE SystemUser ADD CONSTRAINT pkSystemUser PRIMARY KEY (Id);

CREATE UNIQUE INDEX IF NOT EXISTS akSystemUserLogin ON SystemUser (Login);

-- 

CREATE TABLE IF NOT EXISTS SystemGroup (
  Id    serial,
  Name  varchar(64) NOT NULL
);

ALTER TABLE SystemGroup ADD CONSTRAINT pkSystemGroup PRIMARY KEY (Id);

CREATE UNIQUE INDEX IF NOT EXISTS akSystemGroupName ON SystemGroup (Name);

-- 

CREATE TABLE IF NOT EXISTS GroupUser (
  GroupId  integer NOT NULL,
  UserId   integer NOT NULL
);

ALTER TABLE GroupUser ADD CONSTRAINT pkGroupUser PRIMARY KEY (GroupId, UserId);
ALTER TABLE GroupUser ADD CONSTRAINT fkGroupUserGroupId FOREIGN KEY (GroupId) REFERENCES SystemGroup (Id) ON DELETE CASCADE;
ALTER TABLE GroupUser ADD CONSTRAINT fkGroupUserUserId FOREIGN KEY (UserId) REFERENCES SystemUser (Id) ON DELETE CASCADE;

-- 

CREATE TABLE IF NOT EXISTS Token (
    Id serial,
    UserId integer NOT NULL,
    accessSignature varchar(255) NOT NULL,
    refreshSignature varchar(255) NOT NULL
);

ALTER TABLE Token ADD CONSTRAINT pkToken PRIMARY KEY (Id);
ALTER TABLE Token ADD CONSTRAINT fkTokensUserId FOREIGN KEY (UserId) REFERENCES SystemUser (Id) ON DELETE CASCADE;

CREATE UNIQUE INDEX IF NOT EXISTS akAccessSignature ON Token (accessSignature);
CREATE UNIQUE INDEX IF NOT EXISTS akRefreshSignature ON Token (refreshSignature);