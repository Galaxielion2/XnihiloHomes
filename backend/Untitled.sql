CREATE DATABASE IF NOT EXISTS empresa;

USE empresa;

DROP TABLE IF EXISTS cliente;

CREATE TABLE cliente (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    telefono VARCHAR(20),
    correo VARCHAR(100),
    PRIMARY KEY (id)
);

INSERT INTO cliente (nombre, apellido, telefono, correo)
VALUES
('Carlos', 'Lopez', '9999-1111', 'carlos@gmail.com'),
('Maria', 'Perez', '9999-2222', 'maria@gmail.com'),
('Juan', 'Martinez', '9999-3333', 'juan@gmail.com');

SELECT * FROM cliente;

