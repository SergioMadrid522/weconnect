CREATE DATABASE weconnect;
USE weconnect;

CREATE TABLE users(
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

INSERT INTO users(id, username, email, password)
	VALUES(1, "madrid", "correo@hotmail.com", "asijdas");

SELECT * FROM users;