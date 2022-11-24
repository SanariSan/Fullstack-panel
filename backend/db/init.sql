DROP TABLE IF EXISTS Proxy;
-- 
DROP TABLE IF EXISTS SystemUserSystemRole;
DROP TABLE IF EXISTS SystemRole;
-- 
DROP TABLE IF EXISTS SearchQueryVacancyHH;
DROP TABLE IF EXISTS SearchQuery;
DROP TABLE IF EXISTS VacancyHH;
--
DROP TABLE IF EXISTS Token;
DROP TABLE IF EXISTS SystemUser;
--
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- 
CREATE
OR REPLACE FUNCTION updTimestamp() RETURNS TRIGGER LANGUAGE plpgsql AS $$ BEGIN
  NEW .modified = CURRENT_TIMESTAMP;
RETURN NEW;
END;
$$;
-- 
CREATE
OR REPLACE FUNCTION rndStr(len INTEGER) RETURNS VARCHAR(64) LANGUAGE plpgsql AS $$
DECLARE
  str VARCHAR(64);
BEGIN
  str := (
    SELECT
      substr(md5(random() :: text), 0, len)
  );
RETURN str;
END;
$$;
-- 
CREATE
OR REPLACE FUNCTION rndIntInRange(MIN INTEGER, MAX INTEGER) RETURNS INT LANGUAGE plpgsql AS $$ BEGIN
  RETURN floor(random() * (MAX - MIN + 1) + MIN);
END;
$$;
-- 
CREATE
OR REPLACE FUNCTION epochHoursAgoInRange(hoursMin INTEGER, hoursMax INTEGER) RETURNS DECIMAL LANGUAGE plpgsql AS $$ BEGIN
  RETURN (
    EXTRACT(
      epoch
      FROM
        now()
    ) * 1000 - (
      rndIntInRange(hoursMin, hoursMax) * 1000 * 60 * 60
    )
  ) / 1000;
END;
$$;
-- 
CREATE TABLE IF NOT EXISTS SystemUser (
  id SERIAL,
  -- uuid_ UUID UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
  email VARCHAR(64) UNIQUE NOT NULL,
  username VARCHAR(64) NOT NULL,
  passwordHash VARCHAR(255) NOT NULL,
  telegramId VARCHAR(64),
  hhToken VARCHAR(255),
  isActivated BOOLEAN NOT NULL DEFAULT TRUE,
  otpToken VARCHAR(255),
  createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
CREATE
OR REPLACE TRIGGER modifiedUpd BEFORE
UPDATE
  ON SystemUser FOR EACH ROW EXECUTE PROCEDURE updTimestamp();
-- 
CREATE TABLE IF NOT EXISTS SystemRole (
  id SERIAL,
  roleName VARCHAR(64) UNIQUE NOT NULL,
  PRIMARY KEY (id)
);
-- 
CREATE TABLE IF NOT EXISTS SystemUserSystemRole (
  userId INTEGER NOT NULL,
  roleId INTEGER NOT NULL,
  PRIMARY KEY (userId, roleId),
  FOREIGN KEY (userId) REFERENCES SystemUser (id) ON
  DELETE
    CASCADE,
    FOREIGN KEY (roleId) REFERENCES SystemRole (id) ON
  DELETE
    CASCADE
);
-- 
CREATE TABLE IF NOT EXISTS SearchQuery (
  id SERIAL,
  uuid_ UUID NOT NULL DEFAULT uuid_generate_v4(),
  userId INTEGER NOT NULL,
  searchText VARCHAR(255) NOT NULL,
  searchParams VARCHAR(255) NOT NULL,
  isAknowledged BOOLEAN NOT NULL DEFAULT FALSE,
  lastAknowledged TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  notifyPostedSecAgoMax INTEGER DEFAULT (24 * 60 * 60),
  modified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES SystemUser (id) ON
  DELETE
    CASCADE
);
CREATE
OR REPLACE TRIGGER modifiedUpd BEFORE
UPDATE
  ON SearchQuery FOR EACH ROW EXECUTE PROCEDURE updTimestamp();
-- 
CREATE TABLE IF NOT EXISTS VacancyHH (
  id SERIAL,
  hhId INTEGER NOT NULL,
  -- md5 hash of all fields below
  hashMD5 VARCHAR(32) UNIQUE NOT NULL,
  title VARCHAR(64) NOT NULL,
  createdAt VARCHAR(64) NOT NULL,
  publishedAt VARCHAR(64) NOT NULL,
  hasTest BOOLEAN NOT NULL,
  responseLetterRequired BOOLEAN NOT NULL,
  areaId INTEGER NOT NULL,
  -- areaName VARCHAR(64) NOT NULL,
  scheduleId VARCHAR(64) NOT NULL,
  -- Schedule_Name VARCHAR(64) NOT NULL,
  employerUrl VARCHAR(64) NOT NULL,
  employerName VARCHAR(64) NOT NULL,
  descriptionFull VARCHAR(64),
  snippetRequirement VARCHAR(64),
  snippetResponsibility VARCHAR(64),
  salaryCurrencyId INTEGER,
  salaryFrom INTEGER,
  salaryTo INTEGER,
  addressRaw VARCHAR(64),
  modified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
CREATE
OR REPLACE TRIGGER modifiedUpd BEFORE
UPDATE
  ON VacancyHH FOR EACH ROW EXECUTE PROCEDURE updTimestamp();
-- 
CREATE TABLE IF NOT EXISTS SearchQueryVacancyHH (
  searchQueryId INTEGER NOT NULL,
  vacancyId INTEGER NOT NULL,
  PRIMARY KEY (searchQueryId, vacancyId),
  FOREIGN KEY (searchQueryId) REFERENCES SearchQuery (id) ON
  DELETE
    CASCADE,
    FOREIGN KEY (vacancyId) REFERENCES VacancyHH (id) ON
  DELETE
    CASCADE
);
-- 
-- 
-- 
--
-- 
BEGIN
;
-- pwd = pwd123456 | bcrypt secret = auto, 12 rounds
INSERT INTO
  SystemUser (email, username, passwordHash)
VALUES
  (
    CONCAT(rndStr(10), '@gmail.com'),
    'testadmin',
    '$2a$12$OfyJOnXVNp4yE1eGha4KJuh182nWC0NTL0I8/OeRbzubP2JIIMpf6'
  ),
  (
    CONCAT(rndStr(10), '@gmail.com'),
    'testuser',
    '$2a$12$LxcmMFGVW6u0qXPVP.fDBeteTBpy2mq7TvCYQYVdWjJ6QF4f2xfti'
  ),
  (
    CONCAT(rndStr(10), '@gmail.com'),
    rndStr(10),
    '$2a$12$OfyJOnXVNp4yE1eGha4KJuh182nWC0NTL0I8/OeRbzubP2JIIMpf6'
  ),
  (
    CONCAT(rndStr(10), '@gmail.com'),
    rndStr(10),
    '$2a$12$LxcmMFGVW6u0qXPVP.fDBeteTBpy2mq7TvCYQYVdWjJ6QF4f2xfti'
  ),
  (
    CONCAT(rndStr(8), '@gmail.com'),
    rndStr(10),
    '$2a$12$OfyJOnXVNp4yE1eGha4KJuh182nWC0NTL0I8/OeRbzubP2JIIMpf6'
  );
END;
-- 
BEGIN
;
INSERT INTO
  SystemRole (roleName)
VALUES
  ('admin'),
  ('user');
END;
--
BEGIN
;
INSERT INTO
  SystemUserSystemRole (userId, roleId)
VALUES
  (1, 1),
  (1, 2),
  (2, 2),
  (3, 2),
  (4, 2),
  (5, 2);
END;
-- 
BEGIN
;
INSERT INTO
  SearchQuery (userId, searchText, searchParams)
VALUES
  (
    1,
    CONCAT('Search - ', rndStr(8)),
    CONCAT('Options - ', rndStr(8))
  ),
  (
    1,
    CONCAT('Search - ', rndStr(8)),
    CONCAT('Options - ', rndStr(8))
  ),
  (
    2,
    CONCAT('Search - ', rndStr(8)),
    CONCAT('Options - ', rndStr(8))
  ),
  (
    3,
    CONCAT('Search - ', rndStr(8)),
    CONCAT('Options - ', rndStr(8))
  ),
  (
    3,
    CONCAT('Search - ', rndStr(8)),
    CONCAT('Options - ', rndStr(8))
  ),
  (
    3,
    CONCAT('Search - ', rndStr(8)),
    CONCAT('Options - ', rndStr(8))
  ),
  (
    4,
    CONCAT('Search - ', rndStr(8)),
    CONCAT('Options - ', rndStr(8))
  );
END;
-- 
BEGIN
;
INSERT INTO
  VacancyHH (
    hhId,
    hashMD5,
    title,
    createdAt,
    publishedAt,
    hasTest,
    responseLetterRequired,
    areaId,
    scheduleId,
    employerUrl,
    employerName,
    snippetRequirement
  )
VALUES
  (
    rndIntInRange(10000, 100000),
    rndStr(32),
    CONCAT('Some title - ', rndStr(12)),
    to_timestamp(epochHoursAgoInRange(1, 48)) AT TIME ZONE 'UTC',
    to_timestamp(epochHoursAgoInRange(1, 48)) AT TIME ZONE 'UTC',
    FALSE,
    FALSE,
    rndIntInRange(1, 500),
    rndstr(10),
    CONCAT(
      'https://hh.ru/employer/',
      rndIntInRange(4, 7) :: text
    ),
    rndstr(10),
    rndstr(100)
  ),
  (
    rndIntInRange(10000, 100000),
    rndStr(32),
    CONCAT('Some title - ', rndStr(12)),
    to_timestamp(epochHoursAgoInRange(1, 48)) AT TIME ZONE 'UTC',
    to_timestamp(epochHoursAgoInRange(1, 48)) AT TIME ZONE 'UTC',
    FALSE,
    FALSE,
    rndIntInRange(1, 500),
    rndstr(10),
    CONCAT(
      'https://hh.ru/employer/',
      rndIntInRange(4, 7) :: text
    ),
    rndstr(10),
    rndstr(100)
  ),
  (
    rndIntInRange(10000, 100000),
    rndStr(32),
    CONCAT('Some title - ', rndStr(12)),
    to_timestamp(epochHoursAgoInRange(1, 48)) AT TIME ZONE 'UTC',
    to_timestamp(epochHoursAgoInRange(1, 48)) AT TIME ZONE 'UTC',
    FALSE,
    FALSE,
    rndIntInRange(1, 500),
    rndstr(10),
    CONCAT(
      'https://hh.ru/employer/',
      rndIntInRange(4, 7) :: text
    ),
    rndstr(10),
    rndstr(100)
  ),
  (
    rndIntInRange(10000, 100000),
    rndStr(32),
    CONCAT('Some title - ', rndStr(12)),
    to_timestamp(epochHoursAgoInRange(1, 48)) AT TIME ZONE 'UTC',
    to_timestamp(epochHoursAgoInRange(1, 48)) AT TIME ZONE 'UTC',
    FALSE,
    FALSE,
    rndIntInRange(1, 500),
    rndstr(10),
    CONCAT(
      'https://hh.ru/employer/',
      rndIntInRange(4, 7) :: text
    ),
    rndstr(10),
    rndstr(100)
  ),
  (
    rndIntInRange(10000, 100000),
    rndStr(32),
    CONCAT('Some title - ', rndStr(12)),
    to_timestamp(epochHoursAgoInRange(1, 48)) AT TIME ZONE 'UTC',
    to_timestamp(epochHoursAgoInRange(1, 48)) AT TIME ZONE 'UTC',
    FALSE,
    FALSE,
    rndIntInRange(1, 500),
    rndstr(10),
    CONCAT(
      'https://hh.ru/employer/',
      rndIntInRange(4, 7) :: text
    ),
    rndstr(10),
    rndstr(100)
  ),
  (
    rndIntInRange(10000, 100000),
    rndStr(32),
    CONCAT('Some title - ', rndStr(12)),
    to_timestamp(epochHoursAgoInRange(1, 48)) AT TIME ZONE 'UTC',
    to_timestamp(epochHoursAgoInRange(1, 48)) AT TIME ZONE 'UTC',
    FALSE,
    FALSE,
    rndIntInRange(1, 500),
    rndstr(10),
    CONCAT(
      'https://hh.ru/employer/',
      rndIntInRange(4, 7) :: text
    ),
    rndstr(10),
    rndstr(100)
  ),
  (
    rndIntInRange(10000, 100000),
    rndStr(32),
    CONCAT('Some title - ', rndStr(12)),
    to_timestamp(epochHoursAgoInRange(1, 48)) AT TIME ZONE 'UTC',
    to_timestamp(epochHoursAgoInRange(1, 48)) AT TIME ZONE 'UTC',
    FALSE,
    FALSE,
    rndIntInRange(1, 500),
    rndstr(10),
    CONCAT(
      'https://hh.ru/employer/',
      rndIntInRange(4, 7) :: text
    ),
    rndstr(10),
    rndstr(100)
  );
END;
-- 
BEGIN
;
INSERT INTO
  SearchQueryVacancyHH (searchQueryId, vacancyId)
VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (2, 2),
  (2, 4),
  (2, 7),
  (3, 4),
  (4, 6),
  (4, 7),
  (5, 1),
  (5, 2);
END;
-- 
-- SELECT * FROM SystemUser;
-- SELECT * FROM SearchQuery;
-- SELECT * FROM SearchQueryVacancyHH;
-- SELECT * FROM VacancyHH;