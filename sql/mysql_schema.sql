-- Xnihilo Homes - Script MySQL
-- Proyecto Programación Web - Avance II
-- Este script crea la base de datos, tablas y datos iniciales.

CREATE DATABASE IF NOT EXISTS xnihilo_homes;
USE xnihilo_homes;

DROP TABLE IF EXISTS request_items;
DROP TABLE IF EXISTS customer_requests;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS admins;

CREATE TABLE admins (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
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
    status VARCHAR(20) NOT NULL DEFAULT 'Active',
    reservation_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE customer_requests (
    id INT NOT NULL AUTO_INCREMENT,
    customer_name VARCHAR(120) NOT NULL,
    customer_email VARCHAR(150) NOT NULL,
    total_reservation DECIMAL(12,2) NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE request_items (
    id INT NOT NULL AUTO_INCREMENT,
    request_id INT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(150) NOT NULL,
    reservation_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    FOREIGN KEY (request_id) REFERENCES customer_requests(id)
);

-- Usuario simple para la defensa del proyecto.
-- En producción esto debería estar hasheado, pero para la clase se mantiene legible.
INSERT INTO admins (username, password)
VALUES ('admin', '1234');

INSERT INTO products 
(name, type, category, price, location, description, image_url, status, reservation_amount)
VALUES
('Modern Family Home in Tegucigalpa', 'Property', 'Home Sale', 185000, 'Tegucigalpa, Honduras', 'Spacious family home with three bedrooms, private parking and excellent access to main roads.', 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1000&q=80', 'Active', 1500),
('Apartment Near Business District', 'Property', 'Rental', 950, 'San Pedro Sula, Honduras', 'Comfortable apartment designed for professionals with parking and security.', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80', 'Active', 300),
('Home Makeover Package', 'Service', 'Renovation', 1200, 'Available in main cities', 'Service package for homeowners preparing a property for sale.', 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1000&q=80', 'Active', 200),
('Luxury Beachfront Villa', 'Property', 'Home Sale', 450000, 'Roatan, Honduras', 'Exclusive beachfront villa with private pool, ocean view and luxury finishes.', 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1000&q=80', 'Active', 5000),
('Mountain View Cabin', 'Property', 'Vacation', 98000, 'Santa Lucia, Honduras', 'Modern wooden cabin surrounded by nature and panoramic mountain scenery.', 'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1000&q=80', 'Active', 1200),
('Interior Design Consultation', 'Service', 'Interior Design', 650, 'Nationwide', 'Professional interior design service for residential and commercial properties.', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80', 'Active', 100),
('Legal Property Assistance', 'Service', 'Legal', 900, 'Tegucigalpa, Honduras', 'Real estate legal verification, contracts and ownership assistance.', 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1000&q=80', 'Active', 150),
('Modern Smart House', 'Property', 'Home Sale', 320000, 'Valle de Angeles, Honduras', 'High-tech smart home with integrated security and automation systems.', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80', 'Active', 3500),
('Property Photography Package', 'Service', 'Marketing', 350, 'Available Nationwide', 'Professional photography and drone footage for property listings.', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80', 'Active', 75),
('Urban Loft Studio', 'Property', 'Rental', 1100, 'Tegucigalpa, Honduras', 'Minimalist loft apartment designed for young professionals and remote workers.', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80', 'Active', 250);

SHOW TABLES;
SELECT * FROM products;
