CREATE DATABASE spbot_db;
USE spbot_db;

CREATE TABLE mutedusers (
    id INT NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(32) UNIQUE NOT NULL,
    lastupdated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    muted BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id)
);

CREATE TABLE serverlanguage (
    id INT NOT NULL AUTO_INCREMENT,
    server_id VARCHAR(32) UNIQUE NOT NULL,
    language VARCHAR(2) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE dmmutedusers (
    id INT NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(32) UNIQUE NOT NULL,
    lastupdated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    muted BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id)
);

CREATE TABLE dmtimes (
    user_id VARCHAR(32) UNIQUE NOT NULL,
    lastupdated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    lastdm BIGINT UNSIGNED NOT NULL DEFAULT 0,
    PRIMARY KEY (user_id)
);