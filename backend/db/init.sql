DROP TABLE IF EXISTS Proxy;
-- 
DROP TABLE IF EXISTS System_User_System_Group;
DROP TABLE IF EXISTS System_Group;
-- 
DROP TABLE IF EXISTS Search_Query_Vacancy_HH;
DROP TABLE IF EXISTS Search_Query;
DROP TABLE IF EXISTS Vacancy_HH;
--
DROP TABLE IF EXISTS Token;
DROP TABLE IF EXISTS System_User;
--
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- 
CREATE
OR REPLACE FUNCTION Upd_Timestamp() RETURNS TRIGGER LANGUAGE plpgsql AS $$ BEGIN
  NEW .Modified = CURRENT_TIMESTAMP;
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
OR REPLACE FUNCTION epochSecsHoursAgoInRange(hoursMin INTEGER, hoursMax INTEGER) RETURNS DECIMAL LANGUAGE plpgsql AS $$ BEGIN
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
CREATE TABLE IF NOT EXISTS System_User (
  Id SERIAL,
  -- Uuid_ UUID UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
  Login VARCHAR(64) UNIQUE NOT NULL,
  Password VARCHAR(64) NOT NULL,
  TelegramId VARCHAR(64),
  HHToken VARCHAR(255),
  CreatedOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  Modified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (Id)
);
CREATE
OR REPLACE TRIGGER Modified_Upd BEFORE
UPDATE
  ON System_User FOR EACH ROW EXECUTE PROCEDURE Upd_Timestamp();
-- 
CREATE TABLE IF NOT EXISTS System_Group (
  Id SERIAL,
  NAME VARCHAR(64) UNIQUE NOT NULL,
  Mask VARCHAR(4) UNIQUE NOT NULL,
  PRIMARY KEY (Id)
);
-- 
CREATE TABLE IF NOT EXISTS System_User_System_Group (
  User_Id INTEGER NOT NULL,
  Group_Id INTEGER NOT NULL,
  PRIMARY KEY (User_Id, Group_Id),
  FOREIGN KEY (User_Id) REFERENCES System_User (Id) ON
  DELETE
    CASCADE,
    FOREIGN KEY (Group_Id) REFERENCES System_Group (Id) ON
  DELETE
    CASCADE
);
-- 
CREATE TABLE IF NOT EXISTS Token (
  Id SERIAL,
  User_Id INTEGER NOT NULL,
  Access_Signature VARCHAR(255) UNIQUE NOT NULL,
  Refresh_Signature VARCHAR(255) UNIQUE NOT NULL,
  Modified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (Id),
  FOREIGN KEY (User_Id) REFERENCES System_User (Id) ON
  DELETE
    CASCADE
);
CREATE
OR REPLACE TRIGGER Modified_Upd BEFORE
UPDATE
  ON Token FOR EACH ROW EXECUTE PROCEDURE Upd_Timestamp();
-- 
CREATE TABLE IF NOT EXISTS Search_Query (
  Id SERIAL,
  Uuid_ UUID NOT NULL DEFAULT uuid_generate_v4(),
  User_Id INTEGER NOT NULL,
  Search_Text VARCHAR(255) NOT NULL,
  Search_Params VARCHAR(255) NOT NULL,
  Is_Aknowledged BOOLEAN NOT NULL DEFAULT FALSE,
  Last_Aknowledged TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  Notify_Posted_Sec_Ago_Max INTEGER DEFAULT (24 * 60 * 60 * 1000),
  Modified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (Id),
  FOREIGN KEY (User_Id) REFERENCES System_User (Id) ON
  DELETE
    CASCADE
);
CREATE
OR REPLACE TRIGGER Modified_Upd BEFORE
UPDATE
  ON Search_Query FOR EACH ROW EXECUTE PROCEDURE Upd_Timestamp();
-- 
CREATE TABLE IF NOT EXISTS Vacancy_HH (
  Id SERIAL,
  Vacancy_HH_Id INTEGER NOT NULL,
  -- md5 hash of all fields below
  Hash_MD5 VARCHAR(32) UNIQUE NOT NULL,
  Title VARCHAR(64) NOT NULL,
  Created_At VARCHAR(64) NOT NULL,
  --   Published_At VARCHAR(64) NOT NULL,
  Has_Test BOOLEAN NOT NULL,
  Response_Letter_Required BOOLEAN NOT NULL,
  Area_Id INTEGER NOT NULL,
  Area_Name VARCHAR(64) NOT NULL,
  Schedule_Id VARCHAR(64) NOT NULL,
  Schedule_Name VARCHAR(64) NOT NULL,
  Employer_Url VARCHAR(64) NOT NULL,
  Employer_Name VARCHAR(64) NOT NULL,
  Description_Full VARCHAR(64),
  Snippet_Requirement VARCHAR(64),
  Snippet_Responsibility VARCHAR(64),
  Salary_Currency_Id INTEGER,
  Salary_From INTEGER,
  Salary_To INTEGER,
  Address_Raw VARCHAR(64),
  Modified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (Id)
);
CREATE
OR REPLACE TRIGGER Modified_Upd BEFORE
UPDATE
  ON Vacancy_HH FOR EACH ROW EXECUTE PROCEDURE Upd_Timestamp();
-- 
CREATE TABLE IF NOT EXISTS Search_Query_Vacancy_HH (
  Search_Query_Id INTEGER NOT NULL,
  Vacancy_Id INTEGER NOT NULL,
  PRIMARY KEY (Search_Query_Id, Vacancy_Id),
  FOREIGN KEY (Search_Query_Id) REFERENCES Search_Query (Id) ON
  DELETE
    CASCADE,
    FOREIGN KEY (Vacancy_Id) REFERENCES Vacancy_HH (Id) ON
  DELETE
    CASCADE
);
-- 
CREATE TABLE IF NOT EXISTS Proxy (
  Ip VARCHAR(64) NOT NULL,
  Port VARCHAR(64) NOT NULL,
  Uuid_ UUID UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
  Last_Successful_Req TIMESTAMP,
  Added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (Ip, Port)
);
-- 
-- 
-- 
--
-- 
BEGIN
;
INSERT INTO
  System_User (Login, Password)
VALUES
  (rndStr(10), CONCAT('pwd-', rndStr(20)));
INSERT INTO
  System_User (Login, Password)
VALUES
  (rndStr(10), CONCAT('pwd-', rndStr(20)));
INSERT INTO
  System_User (Login, Password)
VALUES
  (rndStr(10), CONCAT('pwd-', rndStr(20)));
INSERT INTO
  System_User (Login, Password)
VALUES
  (rndStr(10), CONCAT('pwd-', rndStr(20)));
INSERT INTO
  System_User (Login, Password)
VALUES
  (rndStr(10), CONCAT('pwd-', rndStr(20)));
END;
-- 
BEGIN
;
INSERT INTO
  System_Group (NAME, Mask)
VALUES
  ('admin', '1111');
INSERT INTO
  System_Group (NAME, Mask)
VALUES
  ('user', '0001');
END;
-- 
BEGIN
;
INSERT INTO
  Search_Query (User_Id, Search_Text, Search_Params)
VALUES
  (
    1,
    CONCAT('Search - ', rndStr(8)),
    CONCAT('Options - ', rndStr(8))
  );
INSERT INTO
  Search_Query (User_Id, Search_Text, Search_Params)
VALUES
  (
    1,
    CONCAT('Search - ', rndStr(8)),
    CONCAT('Options - ', rndStr(8))
  );
INSERT INTO
  Search_Query (User_Id, Search_Text, Search_Params)
VALUES
  (
    2,
    CONCAT('Search - ', rndStr(8)),
    CONCAT('Options - ', rndStr(8))
  );
INSERT INTO
  Search_Query (User_Id, Search_Text, Search_Params)
VALUES
  (
    3,
    CONCAT('Search - ', rndStr(8)),
    CONCAT('Options - ', rndStr(8))
  );
INSERT INTO
  Search_Query (User_Id, Search_Text, Search_Params)
VALUES
  (
    3,
    CONCAT('Search - ', rndStr(8)),
    CONCAT('Options - ', rndStr(8))
  );
INSERT INTO
  Search_Query (User_Id, Search_Text, Search_Params)
VALUES
  (
    3,
    CONCAT('Search - ', rndStr(8)),
    CONCAT('Options - ', rndStr(8))
  );
INSERT INTO
  Search_Query (User_Id, Search_Text, Search_Params)
VALUES
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
  Vacancy_HH (
    Vacancy_HH_Id,
    Hash_MD5,
    Title,
    Created_At,
    Has_Test,
    Response_Letter_Required,
    Area_Id,
    Area_Name,
    Schedule_Id,
    Schedule_Name,
    Employer_Url,
    Employer_Name,
    Snippet_Requirement
  )
VALUES
  (
    rndIntInRange(10000, 100000),
    rndStr(32),
    CONCAT('Some title - ', rndStr(12)),
    to_timestamp(epochSecsHoursAgoInRange(1, 48)) AT TIME ZONE 'UTC',
    FALSE,
    FALSE,
    rndIntInRange(1, 500),
    rndstr(10),
    rndstr(10),
    rndstr(10),
    CONCAT(
      'https://hh.ru/employer/',
      rndIntInRange(4, 7) :: text
    ),
    rndstr(10),
    rndstr(100)
  );
INSERT INTO
  Vacancy_HH (
    Vacancy_HH_Id,
    Hash_MD5,
    Title,
    Created_At,
    Has_Test,
    Response_Letter_Required,
    Area_Id,
    Area_Name,
    Schedule_Id,
    Schedule_Name,
    Employer_Url,
    Employer_Name,
    Snippet_Requirement
  )
VALUES
  (
    rndIntInRange(10000, 100000),
    rndStr(32),
    CONCAT('Some title - ', rndStr(12)),
    to_timestamp(epochSecsHoursAgoInRange(1, 48)) AT TIME ZONE 'UTC',
    FALSE,
    FALSE,
    rndIntInRange(1, 500),
    rndstr(10),
    rndstr(10),
    rndstr(10),
    CONCAT(
      'https://hh.ru/employer/',
      rndIntInRange(4, 7) :: text
    ),
    rndstr(10),
    rndstr(100)
  );
INSERT INTO
  Vacancy_HH (
    Vacancy_HH_Id,
    Hash_MD5,
    Title,
    Created_At,
    Has_Test,
    Response_Letter_Required,
    Area_Id,
    Area_Name,
    Schedule_Id,
    Schedule_Name,
    Employer_Url,
    Employer_Name,
    Snippet_Requirement
  )
VALUES
  (
    rndIntInRange(10000, 100000),
    rndStr(32),
    CONCAT('Some title - ', rndStr(12)),
    to_timestamp(epochSecsHoursAgoInRange(1, 48)) AT TIME ZONE 'UTC',
    FALSE,
    FALSE,
    rndIntInRange(1, 500),
    rndstr(10),
    rndstr(10),
    rndstr(10),
    CONCAT(
      'https://hh.ru/employer/',
      rndIntInRange(4, 7) :: text
    ),
    rndstr(10),
    rndstr(100)
  );
INSERT INTO
  Vacancy_HH (
    Vacancy_HH_Id,
    Hash_MD5,
    Title,
    Created_At,
    Has_Test,
    Response_Letter_Required,
    Area_Id,
    Area_Name,
    Schedule_Id,
    Schedule_Name,
    Employer_Url,
    Employer_Name,
    Snippet_Requirement
  )
VALUES
  (
    rndIntInRange(10000, 100000),
    rndStr(32),
    CONCAT('Some title - ', rndStr(12)),
    to_timestamp(epochSecsHoursAgoInRange(1, 48)) AT TIME ZONE 'UTC',
    FALSE,
    FALSE,
    rndIntInRange(1, 500),
    rndstr(10),
    rndstr(10),
    rndstr(10),
    CONCAT(
      'https://hh.ru/employer/',
      rndIntInRange(4, 7) :: text
    ),
    rndstr(10),
    rndstr(100)
  );
INSERT INTO
  Vacancy_HH (
    Vacancy_HH_Id,
    Hash_MD5,
    Title,
    Created_At,
    Has_Test,
    Response_Letter_Required,
    Area_Id,
    Area_Name,
    Schedule_Id,
    Schedule_Name,
    Employer_Url,
    Employer_Name,
    Snippet_Requirement
  )
VALUES
  (
    rndIntInRange(10000, 100000),
    rndStr(32),
    CONCAT('Some title - ', rndStr(12)),
    to_timestamp(epochSecsHoursAgoInRange(1, 48)) AT TIME ZONE 'UTC',
    FALSE,
    FALSE,
    rndIntInRange(1, 500),
    rndstr(10),
    rndstr(10),
    rndstr(10),
    CONCAT(
      'https://hh.ru/employer/',
      rndIntInRange(4, 7) :: text
    ),
    rndstr(10),
    rndstr(100)
  );
INSERT INTO
  Vacancy_HH (
    Vacancy_HH_Id,
    Hash_MD5,
    Title,
    Created_At,
    Has_Test,
    Response_Letter_Required,
    Area_Id,
    Area_Name,
    Schedule_Id,
    Schedule_Name,
    Employer_Url,
    Employer_Name,
    Snippet_Requirement
  )
VALUES
  (
    rndIntInRange(10000, 100000),
    rndStr(32),
    CONCAT('Some title - ', rndStr(12)),
    to_timestamp(epochSecsHoursAgoInRange(1, 48)) AT TIME ZONE 'UTC',
    FALSE,
    FALSE,
    rndIntInRange(1, 500),
    rndstr(10),
    rndstr(10),
    rndstr(10),
    CONCAT(
      'https://hh.ru/employer/',
      rndIntInRange(4, 7) :: text
    ),
    rndstr(10),
    rndstr(100)
  );
INSERT INTO
  Vacancy_HH (
    Vacancy_HH_Id,
    Hash_MD5,
    Title,
    Created_At,
    Has_Test,
    Response_Letter_Required,
    Area_Id,
    Area_Name,
    Schedule_Id,
    Schedule_Name,
    Employer_Url,
    Employer_Name,
    Snippet_Requirement
  )
VALUES
  (
    rndIntInRange(10000, 100000),
    rndStr(32),
    CONCAT('Some title - ', rndStr(12)),
    to_timestamp(epochSecsHoursAgoInRange(1, 48)) AT TIME ZONE 'UTC',
    FALSE,
    FALSE,
    rndIntInRange(1, 500),
    rndstr(10),
    rndstr(10),
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
  Search_Query_Vacancy_HH (Search_Query_Id, Vacancy_Id)
VALUES
  (1, 1);
INSERT INTO
  Search_Query_Vacancy_HH (Search_Query_Id, Vacancy_Id)
VALUES
  (1, 2);
INSERT INTO
  Search_Query_Vacancy_HH (Search_Query_Id, Vacancy_Id)
VALUES
  (1, 3);
INSERT INTO
  Search_Query_Vacancy_HH (Search_Query_Id, Vacancy_Id)
VALUES
  (2, 2);
INSERT INTO
  Search_Query_Vacancy_HH (Search_Query_Id, Vacancy_Id)
VALUES
  (2, 4);
INSERT INTO
  Search_Query_Vacancy_HH (Search_Query_Id, Vacancy_Id)
VALUES
  (2, 7);
INSERT INTO
  Search_Query_Vacancy_HH (Search_Query_Id, Vacancy_Id)
VALUES
  (3, 4);
INSERT INTO
  Search_Query_Vacancy_HH (Search_Query_Id, Vacancy_Id)
VALUES
  (4, 6);
INSERT INTO
  Search_Query_Vacancy_HH (Search_Query_Id, Vacancy_Id)
VALUES
  (4, 7);
INSERT INTO
  Search_Query_Vacancy_HH (Search_Query_Id, Vacancy_Id)
VALUES
  (5, 1);
INSERT INTO
  Search_Query_Vacancy_HH (Search_Query_Id, Vacancy_Id)
VALUES
  (5, 2);
END;
-- 
BEGIN
;
INSERT INTO
  Proxy (Ip, Port)
VALUES
  ('192.168.1.123', '80');
END;
-- 
-- SELECT * FROM System_User;
-- SELECT * FROM Search_Query;
-- SELECT * FROM Search_Query_Vacancy_HH;
-- SELECT * FROM Vacancy_HH;