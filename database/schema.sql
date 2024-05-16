CREATE DATABASE user;

USE user;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255)
);

CREATE TABLE dogs (
    dog_id INT AUTO_INCREMENT PRIMARY KEY,
    dog_name VARCHAR(255),
    handler_id INT, -- Esta columna será la clave para que se relaciona con el id del usuario
    FOREIGN KEY (handler_id) REFERENCES users(id),
    UNIQUE (dog_name) -- Asegura que cada perro tenga un nombre único
);

CREATE TABLE reports (
    location VARCHAR(255),
    date DATE,
    name VARCHAR(255),
    dog_name VARCHAR(255),
    corporate VARCHAR(255),
    plant VARCHAR(255),
    shift VARCHAR(255),
    inspection_area VARCHAR(255),
    inspection_description VARCHAR(255),
    shipment_type ENUM('Importacion', 'Exportacion', 'Consolidado'),
    carrier_company VARCHAR(255),
    operator_name VARCHAR(255),
    tractor_brand VARCHAR(255),
    tractor_color VARCHAR(255),
    tractor_model VARCHAR(255),
    tractor_plate VARCHAR(255),
    tractor_number VARCHAR(255),
    trailer_number VARCHAR(255),
    shipment_number VARCHAR(255),
    total_skids VARCHAR(255),
    stamps_number VARCHAR(255),
    security_company VARCHAR(255),
    guard_names VARCHAR(255),
    custody_company VARCHAR(255),
    custodian_names VARCHAR(255),
    custody_unit_number VARCHAR(255),
    departure_time TIME,
);

CREATE TABLE reportsInspect (
    location VARCHAR(255),
    date DATE,
    name VARCHAR(255),
    dog_name VARCHAR(255),
    corporate VARCHAR(255),
    plant VARCHAR(255),
    shift VARCHAR(255),
    inspection_area VARCHAR(255),
    inspection_description VARCHAR(255),
    shipment_type ENUM('InspeccionCan'),
    start_time TIME,
    inspected_areas VARCHAR(255),
    end_time TIME,
    security_items VARCHAR(255)
);

-- Insertar Usuarios
INSERT INTO users (name, email, password) VALUES ('Jonathan', 'user1@example.com', 'password1');
INSERT INTO users (name, email, password) VALUES ('Alberto', 'user2@example.com', 'password2');