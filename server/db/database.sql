CREATE DATABASE database: 'workanda',;

CREATE TABLE users(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(60) NOT NULL,
    about_me TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)