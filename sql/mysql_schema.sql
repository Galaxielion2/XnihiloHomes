DROP DATABASE IF EXISTS xnihilo_homes;
CREATE DATABASE xnihilo_homes CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE xnihilo_homes;

-- Tabla de administradores. Para el proyecto se usa password simple.
CREATE TABLE admins (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) DEFAULT 'Administrador',
    active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB;

-- Tabla principal de listados: propiedades y servicios.
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
    bedrooms INT DEFAULT 0,
    bathrooms DECIMAL(3,1) DEFAULT 0,
    area_m2 DECIMAL(10,2) DEFAULT 0,
    parking_spaces INT DEFAULT 0,
    asset_condition VARCHAR(80) DEFAULT 'Excellent',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB;

-- Solicitudes creadas desde el carrito.
CREATE TABLE customer_requests (
    id INT NOT NULL AUTO_INCREMENT,
    customer_name VARCHAR(120) NOT NULL,
    customer_email VARCHAR(150) NOT NULL,
    total_reservation DECIMAL(12,2) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB;

-- Detalle de productos dentro de cada solicitud.
CREATE TABLE request_items (
    id INT NOT NULL AUTO_INCREMENT,
    request_id INT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(150) NOT NULL,
    reservation_amount DECIMAL(12,2) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (request_id) REFERENCES customer_requests(id) ON DELETE CASCADE
) ENGINE=InnoDB;

INSERT INTO admins (username, password, full_name)
VALUES ('admin', '1234', 'Administrador Principal');

INSERT INTO products
(name, type, category, price, location, description, image_url, status, reservation_amount, bedrooms, bathrooms, area_m2, parking_spaces, asset_condition)
VALUES
('Modern Family Home in Tegucigalpa', 'Property', 'Home Sale', 185000, 'Tegucigalpa, Honduras', 'Spacious family home with three bedrooms, private parking, natural lighting and excellent access to main roads.', 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1000&q=80', 'Active', 1500, 3, 2.5, 240, 2, 'Excellent'),
('Apartment Near Business District', 'Property', 'Rental', 950, 'San Pedro Sula, Honduras', 'Comfortable apartment designed for professionals. Includes security, parking and access to commercial areas.', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80', 'Active', 300, 2, 2, 95, 1, 'Very Good'),
('Home Makeover Package', 'Service', 'Renovation', 1200, 'Available in main cities', 'Service package for homeowners preparing a property for sale. Includes visual improvements and preparation recommendations.', 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1000&q=80', 'Active', 200, 0, 0, 0, 0, 'Service'),
('Luxury Beachfront Villa', 'Property', 'Home Sale', 450000, 'Roatán, Honduras', 'Exclusive beachfront villa with private pool, ocean view, luxury finishes and short-term rental potential.', 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1000&q=80', 'Active', 5000, 4, 4, 380, 3, 'Luxury'),
('Mountain View Cabin', 'Property', 'Vacation', 98000, 'Santa Lucía, Honduras', 'Modern wooden cabin surrounded by nature and panoramic mountain scenery. Ideal for weekend stays or eco-tourism.', 'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1000&q=80', 'Active', 1200, 2, 1, 110, 2, 'Good'),
('Commercial Office Space', 'Property', 'Commercial', 2200, 'Tegucigalpa, Honduras', 'Professional office space ideal for startups and corporate operations. Includes reception area and parking availability.', 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80', 'Active', 400, 0, 2, 180, 4, 'Ready to Use'),
('Luxury Apartment Tower', 'Property', 'Rental', 1850, 'San Pedro Sula, Honduras', 'Premium apartment with smart home features, city skyline views, gym access and 24/7 security.', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80', 'Active', 500, 3, 2.5, 160, 2, 'Excellent'),
('Interior Design Consultation', 'Service', 'Interior Design', 650, 'Nationwide', 'Professional interior design service for residential and commercial properties, including mood boards and furniture planning.', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80', 'Active', 100, 0, 0, 0, 0, 'Service'),
('Legal Property Assistance', 'Service', 'Legal', 900, 'Tegucigalpa, Honduras', 'Real estate legal verification, contract support, ownership review and purchase documentation assistance.', 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1000&q=80', 'Active', 150, 0, 0, 0, 0, 'Service'),
('Modern Smart House', 'Property', 'Home Sale', 320000, 'Valle de Ángeles, Honduras', 'High-tech smart home with integrated security, automation systems, open living areas and mountain weather.', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80', 'Active', 3500, 4, 3, 310, 3, 'Smart Home'),
('Property Photography Package', 'Service', 'Marketing', 350, 'Available Nationwide', 'Professional photography and drone footage for property listings, optimized for real estate advertising.', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80', 'Active', 75, 0, 0, 0, 0, 'Service'),
('Urban Loft Studio', 'Property', 'Rental', 1100, 'Tegucigalpa, Honduras', 'Minimalist loft apartment designed for young professionals and remote workers, close to cafes and office districts.', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80', 'Active', 250, 1, 1, 70, 1, 'Modern');

SHOW TABLES;
SELECT * FROM admins;
SELECT * FROM products;
