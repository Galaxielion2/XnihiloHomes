DROP TABLE IF EXISTS request_items;
DROP TABLE IF EXISTS customer_requests;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS admins;

CREATE TABLE admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    category TEXT NOT NULL,
    price REAL NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    status TEXT NOT NULL,
    reservation_amount REAL NOT NULL
);

CREATE TABLE customer_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    total_reservation REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE request_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    request_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    product_name TEXT NOT NULL,
    reservation_amount REAL NOT NULL,
    FOREIGN KEY (request_id) REFERENCES customer_requests(id)
);

INSERT INTO admins (username, password)
VALUES ('admin', '1234');

INSERT INTO products
(name, type, category, price, location, description, image_url, status, reservation_amount)
VALUES
('Modern Family Home in Tegucigalpa', 'Property', 'Home Sale', 185000, 'Tegucigalpa, Honduras',
 'Spacious family home with three bedrooms, private parking, natural lighting and excellent access to main roads.',
 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1000&q=80',
 'Active', 1500),

('Apartment Near Business District', 'Property', 'Rental', 950, 'San Pedro Sula, Honduras',
 'Comfortable apartment designed for professionals. Includes security, parking and access to commercial areas.',
 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
 'Active', 300),

('Home Makeover Package', 'Service', 'Renovation', 1200, 'Available in main cities',
 'Service package for homeowners preparing a property for sale. Includes visual improvements and preparation recommendations.',
 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1000&q=80',
 'Active', 200),

('Real Estate Legal Review', 'Service', 'Legal', 350, 'Remote / Honduras',
 'Legal document review for buyers, sellers and renters before committing to a property transaction.',
 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80',
 'Active', 100);
