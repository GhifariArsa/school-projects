PRAGMA foreign_keys = OFF;
drop table if exists LGA;
drop table if exists HomelessGroup;
drop table if exists LGAStatistics;
drop table if exists Student;
drop table if exists Persona;
drop table if exists PersonaAttribute;
PRAGMA foreign_keys = ON;

CREATE TABLE LGA (
    lga_code          INTEGER NOT NULL,
    lga_name          TEXT NOT NULL,
    lga_type          CHAR (2),
    area_sqkm         DOUBLE,
    latitude          DOUBLE,
    longitude         DOUBLE,
    PRIMARY KEY (lga_code)
);

CREATE TABLE HomelessGroup (
    lga_code          INTEGER NOT NULL,
    year              INTEGER NOT NULL,
    status            CHAR (10) NOT NULL,
    sex               CHAR (2),
    age_group         CHAR (10),
    count             INTEGER,
    PRIMARY KEY (lga_code, status, year, sex, age_group)
    FOREIGN KEY (lga_code) REFERENCES LGA(lga_code)
);

CREATE TABLE LGAStatistics (
    lga_code                        INTEGER NOT NULL,
    year                            INTEGER NOT NULL,
    population                      LONG,
    median_household_weekly_income  DOUBLE,
    median_age                      INT,
    median_mortgage_repay_monthly   DOUBLE,
    median_rent_weekly              DOUBLE,
    PRIMARY KEY (lga_code, year)
    FOREIGN KEY (lga_code) REFERENCES LGA(lga_code)
);

CREATE TABLE Student (
    studentID                   VARCHAR(255) NOT NULL,
    name                        TEXT,
    email                       VARCHAR(255),
    PRIMARY KEY                 (studentID)
);

CREATE TABLE Persona (
    name                        TEXT NOT NULL,
    image_file_path             VARCHAR(255),
    PRIMARY KEY (name)
);

CREATE TABLE PersonaAttribute (
    ID                          INTEGER NOT NULL,
    name                        TEXT NOT NULL,
    attributeType               TEXT,
    description                 TEXT,
    PRIMARY KEY (ID, name)
    FOREIGN KEY (name) REFERENCES Persona (name)
);