-- ============================================
--  🚀 CREACIÓN DE BASE DE DATOS
-- ============================================
DROP DATABASE IF EXISTS reservas_db;
CREATE DATABASE reservas_db CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE reservas_db;

-- ============================================
--  👥 TABLA USUARIO GENERAL
-- ============================================


CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_uuid BINARY(16) default (UUID_TO_BIN(UUID())),
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(150),
    phone VARCHAR(20),
    role ENUM('admin', 'owner', 'client') NOT NULL DEFAULT 'client',
    active TINYINT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SHOW CREATE TABLE user;

-- ============================================
--  🏢 TABLA DUEÑOS (1:1 CON USER)
-- ============================================
CREATE TABLE owner (
    owner_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    business_name VARCHAR(150),
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

-- ============================================
--  🧍‍♂️ TABLA CLIENTES (1:1 CON USER)
-- ============================================
CREATE TABLE client (
    client_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

-- ============================================
--  ⚽ TABLA CANCHAS
-- ============================================
CREATE TABLE court (
    court_id INT AUTO_INCREMENT PRIMARY KEY,
    court_uuid BINARY(16) default (UUID_TO_BIN(UUID())),
    owner_id INT NOT NULL,
    name VARCHAR(150) NOT NULL,
    zone VARCHAR(120),
    address VARCHAR(255),
    description TEXT,
    active TINYINT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES owner(owner_id) ON DELETE CASCADE
);

-- ============================================
--  🗓️ DÍAS DE HORARIO POR CANCHA
-- ============================================
CREATE TABLE court_schedule_day (
    schedule_day_id INT AUTO_INCREMENT PRIMARY KEY,
    court_id INT NOT NULL,
    day_of_week TINYINT NOT NULL, -- 0=Domingo .. 6=Sábado
    available TINYINT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (court_id) REFERENCES court(court_id) ON DELETE CASCADE,
    UNIQUE KEY court_day_unique (court_id, day_of_week)
);


-- ============================================
--  ⏰ HORARIOS DE CADA DÍA
-- ============================================
CREATE TABLE court_schedule_time (
    schedule_time_id INT AUTO_INCREMENT PRIMARY KEY,
    schedule_day_id INT NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    FOREIGN KEY (schedule_day_id) REFERENCES court_schedule_day(schedule_day_id) ON DELETE CASCADE
);


-- ============================================
--  📅 TABLA RESERVAS
-- ============================================
CREATE TABLE booking (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_uuid BINARY(16) default (UUID_TO_BIN(UUID())),
    client_id INT NOT NULL,
    court_id INT NOT NULL,
    schedule_day_id INT NOT NULL,
    schedule_time_id INT NOT NULL,
    total_price DECIMAL(10,2) DEFAULT 0,
    status ENUM('pendiente', 'confirmado', 'cancelado') DEFAULT 'pendiente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES client(client_id) ON DELETE CASCADE,
    FOREIGN KEY (court_id) REFERENCES court(court_id) ON DELETE CASCADE,
    FOREIGN KEY (schedule_day_id) REFERENCES court_schedule_day(schedule_day_id) ON DELETE CASCADE,
    FOREIGN KEY (schedule_time_id) REFERENCES court_schedule_time(schedule_time_id) ON DELETE CASCADE
);

-- ============================================
--  🌱 DATOS DE EJEMPLO
-- ============================================
INSERT INTO user (username, password, email, role)
VALUES
('admin1', '12345', 'admin@example.com', 'admin'),
('duenio1', '12345', 'duenio@example.com', 'owner'),
('cliente1', '12345', 'cliente@example.com', 'client');

INSERT INTO owner (user_id, business_name)
VALUES (2, 'Losas Cusco Center');

INSERT INTO client (user_id)
VALUES (3);

INSERT INTO court (owner_id, name, zone, address, description)
VALUES (1, 'Losa Deportiva San Blas', 'Cusco Centro', 'Av. Garcilaso 123', 'Cancha techada con iluminación LED');

INSERT INTO court_schedule_day (court_id, day_of_week)
VALUES
(1, 1), -- Lunes
(1, 2); -- Martes

INSERT INTO court_schedule_time (schedule_day_id, start_time, end_time)
VALUES
(1, '08:00:00', '10:00:00'),
(1, '10:00:00', '12:00:00'),
(2, '08:00:00', '10:00:00');

INSERT INTO booking (client_id, court_id, schedule_day_id, schedule_time_id, total_price, status)
VALUES (1, 1, 1, 1, 100.00, 'pendiente');

-- ============================================
--  ✅ CONSULTA FINAL DE VERIFICACIÓN
-- ============================================
SELECT 
    u.username AS client_name,
    c.name AS court_name,
    csd.day_of_week AS day,
    cst.start_time,
    cst.end_time,
    b.status
FROM booking b
JOIN client cl ON b.client_id = cl.client_id
JOIN user u ON cl.user_id = u.user_id
JOIN court c ON b.court_id = c.court_id
JOIN court_schedule_day csd ON b.schedule_day_id = csd.schedule_day_id
JOIN court_schedule_time cst ON b.schedule_time_id = cst.schedule_time_id
ORDER BY u.username, csd.day_of_week, cst.start_time;

SELECT user, host FROM mysql.user;

SELECT * FROM USER;

select * from client;

select * from owner;

SELECT * FROM user WHERE username = "client1";

SELECT * FROM user WHERE user_id = 9 OR username = 'dueni';

DESCRIBE user;
