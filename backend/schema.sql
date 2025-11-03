DROP DATABASE IF EXISTS complaints_db;
CREATE DATABASE complaints_db;
USE complaints_db;

CREATE TABLE complaints (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    email VARCHAR(255),
    name VARCHAR(255),
    priority ENUM('low', 'medium', 'high') NOT NULL,
    status ENUM('new', 'under-review', 'resolved') NOT NULL DEFAULT 'new',
    is_anonymous BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE anonymous_submissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    complaint_id INT NOT NULL,
    tracking_id VARCHAR(36) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (complaint_id) REFERENCES complaints(id)
);

CREATE TABLE escalation_history (
    id INT PRIMARY KEY AUTO_INCREMENT,
    complaint_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (complaint_id) REFERENCES complaints(id)
);

CREATE TABLE user_roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO user_roles (email, role) VALUES 
('admin@example.com', 'admin'),
('user@example.com', 'user');