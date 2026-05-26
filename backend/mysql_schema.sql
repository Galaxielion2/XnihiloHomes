CREATE DATABASE IF NOT EXISTS xnihilo_homes;
USE xnihilo_homes;

CREATE TABLE admins (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    type VARCHAR(50) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    location VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    status VARCHAR(20) NOT NULL,
    reservation_amount DECIMAL(12,2) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE customer_requests (
    id INT NOT NULL AUTO_INCREMENT,
    customer_name VARCHAR(120) NOT NULL,
    customer_email VARCHAR(150) NOT NULL,
    total_reservation DECIMAL(12,2) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE request_items (
    id INT NOT NULL AUTO_INCREMENT,
    request_id INT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(150) NOT NULL,
    reservation_amount DECIMAL(12,2) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (request_id) REFERENCES customer_requests(id)
);

INSERT INTO admins (username, password)
VALUES ('admin', '1234');
